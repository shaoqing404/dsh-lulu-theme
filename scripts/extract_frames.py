#!/usr/bin/env python
"""Extract lulu-wiggle frames from the Codex pet spritesheet (8x9 atlas, 192x208 cells).

Rows per Codex v1 contract:
  0 idle | 3 waving | 5 failed | 6 waiting | 7 running | 8 review
Outputs trimmed PNGs into assets/frames/, small embeds into assets/frames/small/,
a QA contact sheet, and prints a dominant-color report for palette grounding.
"""
from __future__ import annotations

import json
import sys
from collections import Counter
from pathlib import Path

from PIL import Image

CELL_W, CELL_H = 192, 208
COLS = 8

SPRITESHEET = Path.home() / ".codex" / "pets" / "lulu-wiggle" / "spritesheet.webp"
OUT = Path(__file__).resolve().parents[1] / "assets" / "frames"
SMALL = OUT / "small"

# rows we ship: (row, state, used_cols, display)
ROWS = {
    0: ("idle", 6),
    3: ("wave", 4),
    6: ("waiting", 6),
    7: ("running", 6),
    8: ("review", 6),
}

SMALL_H = 96  # px height for embeds (width auto, proportional)


def trim_bbox(img: Image.Image):
    bbox = img.getbbox()
    if bbox is None:
        return None
    l, t, r, b = bbox
    # small breathing margin so the tangerine/ears are never clipped
    pad = 4
    l = max(0, l - pad)
    t = max(0, t - pad)
    r = min(img.width, r + pad)
    b = min(img.height, b + pad)
    return img.crop((l, t, r, b))


def dominant_colors(img: Image.Image, k: int = 6):
    img = img.convert("RGBA")
    px = [p for p in img.getdata() if p[3] > 200]
    if not px:
        return []
    small = img.quantize(colors=k, method=Image.Quantize.FASTOCTREE).convert("RGB")
    counts: Counter = Counter(small.getdata())
    # remap: quantized colors include transparent-region artifacts; filter by alpha
    total = 0
    c: Counter = Counter()
    for p, n in counts.items():
        total += n
        c["#%02x%02x%02x" % p] += n
    if total == 0:
        return []
    return [(hexv, round(n / total * 100, 1)) for hexv, n in c.most_common(k)]


def main() -> int:
    if not SPRITESHEET.exists():
        print(f"spritesheet not found: {SPRITESHEET}", file=sys.stderr)
        return 1
    OUT.mkdir(parents=True, exist_ok=True)
    SMALL.mkdir(parents=True, exist_ok=True)

    atlas = Image.open(SPRITESHEET).convert("RGBA")
    print(f"atlas {atlas.size}")

    report: dict = {"palette": {}}
    cells: dict = {}
    manifest: list[dict] = []

    for row, (state, used) in ROWS.items():
        row_frames = []
        for col in range(used):
            cell = atlas.crop((col * CELL_W, row * CELL_H, (col + 1) * CELL_W, (row + 1) * CELL_H))
            trimmed = trim_bbox(cell)
            if trimmed is None:
                print(f"  [{state} {col}] empty, skipping")
                continue
            name = f"{state}-{col}.png"
            trimmed.save(OUT / name)
            small = trimmed.resize(
                (max(1, round(trimmed.width * SMALL_H / trimmed.height)), SMALL_H),
                Image.LANCZOS,
            )
            small.save(SMALL / name, optimize=True)
            cells[(state, col)] = trimmed
            row_frames.append(trimmed)
            manifest.append({"file": name, "state": state, "col": col, "w": trimmed.width, "h": trimmed.height})
        if state in ("idle",):
            merged = Image.new("RGBA", (sum(f.width for f in row_frames), max(f.height for f in row_frames)))
            x = 0
            for f in row_frames:
                merged.paste(f, (x, 0), f)
                x += f.width
            report["palette"][state] = dominant_colors(merged)

    # QA contact sheet: rows idle/wave/waiting/running/review
    states = ["idle", "wave", "waiting", "running", "review"]
    per_row = 6
    pad = 8
    rows_imgs = []
    for s in states:
        frames = [cells[(s, c)] for c in range(per_row) if (s, c) in cells]
        if not frames:
            continue
        h = max(f.height for f in frames)
        row_img = Image.new("RGBA", (sum(f.width for f in frames) + pad * (len(frames) - 1), h), (0, 0, 0, 0))
        x = 0
        for f in frames:
            row_img.paste(f, (x, 0), f)
            x += f.width + pad
        rows_imgs.append(row_img)
    sheet = Image.new("RGBA", (max(r.width for r in rows_imgs), sum(r.height for r in rows_imgs) + pad * (len(rows_imgs) - 1)), (20, 16, 12, 255))
    y = 0
    for r in rows_imgs:
        sheet.paste(r, (0, y), r)
        y += r.height + pad
    sheet_path = OUT.parent / "lulu-contact-sheet.png"
    sheet.save(sheet_path)
    print(f"contact sheet: {sheet_path}")

    (OUT.parent / "frames-manifest.json").write_text(json.dumps(manifest, indent=2))
    print("palette report:")
    print(json.dumps(report["palette"], indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
