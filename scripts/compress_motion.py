# 动图压缩管线：抽帧到 ~60 帧 + 降质量重编码（纯 Pillow）
import os
from PIL import Image, ImageSequence

SRC = r"D:\code\front-end-practice\public\assets\motion"
MAX_FRAMES = 60   # ≈12fps × 5s 循环
QUALITY = 75

for name in ["yuer"]:
    src = os.path.join(SRC, f"{name}.webp")
    tmp = os.path.join(SRC, f"{name}_tmp.webp")
    if not os.path.exists(src):
        print(f"skip {name}: not found"); continue
    im = Image.open(src)
    frames = [f.convert("RGB") for f in ImageSequence.Iterator(im)]
    # 均匀抽帧到 MAX_FRAMES 以内
    if len(frames) > MAX_FRAMES:
        step = len(frames) / MAX_FRAMES
        frames = [frames[round(i * step)] for i in range(MAX_FRAMES)]
    frames[0].save(
        tmp, save_all=True, append_images=frames[1:], loop=0,
        duration=round(1000 / 12), method=6, quality=QUALITY,
    )
    old = os.path.getsize(src) / 1024
    new = os.path.getsize(tmp) / 1024
    os.replace(tmp, src)
    print(f"{name}: {len(frames)} frames, {old:.0f}KB -> {new:.0f}KB")
