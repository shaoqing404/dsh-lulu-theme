#!/usr/bin/env python
"""BlueAI Doubao Seedream 5.0 图生图（image2image）。

用法:
  uv run --with requests python scripts/gen_i2i.py \
    --prompt "..." --refs URL1 URL2 [--size 2K] [--out name] [--aspect-ratio ...]

密钥从 BLUEAI_MIDDLEWARE_KEY 环境变量或
/Users/mac/Company/blueFoucs/BlueAI_Skills_Hub/.env 读取。
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.request
from pathlib import Path

import requests

BASE = "https://bmc-model-openapi.bluemediagroup.cn/api"
DEFAULT_KEY_FILE = Path.home() / "Company" / "blueFoucs" / "BlueAI_Skills_Hub" / ".env"


def load_key() -> str:
    key = os.environ.get("BLUEAI_MIDDLEWARE_KEY")
    if key:
        return key
    if DEFAULT_KEY_FILE.exists():
        for line in DEFAULT_KEY_FILE.read_text().splitlines():
            if line.startswith("BLUEAI_MIDDLEWARE_KEY="):
                return line.split("=", 1)[1].strip()
    print("no BLUEAI_MIDDLEWARE_KEY found", file=sys.stderr)
    raise SystemExit(1)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompt", required=True)
    ap.add_argument("--refs", nargs="+", required=True)
    ap.add_argument("--model", default="doubao-seedream-5-0-260128")
    ap.add_argument("--size", default="2K")
    ap.add_argument("--out", default="lulu-i2i")
    args = ap.parse_args()

    key = load_key()
    headers = {"Authorization": f"Bearer {key}", "Content-Type": "application/json"}

    body = {
        "model_id": args.model,
        "prompt": args.prompt,
        "image_urls": args.refs,
        "size": args.size,
        "watermark": False,
        "output_format": "jpeg",
        "sequential_image_generation": "disabled",
    }
    r = requests.post(f"{BASE}/doubao/image2image_v5_0", json=body, headers=headers, timeout=60)
    r.raise_for_status()
    created = r.json()
    task_id = created.get("task_id") or created.get("id")
    if not task_id:
        print("no task_id in response:", created, file=sys.stderr)
        return 1
    print(f"task_id={task_id}")

    for attempt in range(40):
        time.sleep(8)
        st = requests.post(f"{BASE}/doubao/task_status", json={"task_id": task_id}, headers=headers, timeout=60)
        st.raise_for_status()
        data = st.json()
        status = data.get("status")
        print(f"poll {attempt + 1}: {status}")
        if status == "succeeded":
            urls = (
                data.get("image_urls")
                or data.get("images")
                or [data.get("image_url")]
            )
            # doubao 网关信封：图片结果落在 video_url / result
            if not urls and data.get("video_url"):
                urls = [data["video_url"]]
            if not urls and isinstance(data.get("result"), dict):
                urls = data["result"].get("image_urls") or [data["result"].get("image_url")]
            if not urls and isinstance(data.get("result"), list):
                urls = [item.get("image_url") for item in data["result"] if item.get("image_url")]
            urls = [u for u in urls if u]
            print("RESULT_JSON=" + json.dumps(data, ensure_ascii=False)[:4000])
            if not urls:
                print("succeeded but no image urls found; full response saved", file=sys.stderr)
                Path(f"/tmp/{args.out}-result.json").write_text(json.dumps(data, ensure_ascii=False, indent=2))
                return 2
            for i, u in enumerate(urls):
                name = f"{args.out}.jpg" if len(urls) == 1 else f"{args.out}-{i + 1}.jpg"
                target = Path(__file__).resolve().parents[1] / "assets" / "hd" / name
                urllib.request.urlretrieve(u, target)
                print(f"saved {target} ({target.stat().st_size // 1024} KiB) from {u[:120]}")
            return 0
        if status == "failed":
            print("task failed:", json.dumps(data, ensure_ascii=False)[:2000], file=sys.stderr)
            return 3
    print("timeout polling task", file=sys.stderr)
    return 4


if __name__ == "__main__":
    raise SystemExit(main())
