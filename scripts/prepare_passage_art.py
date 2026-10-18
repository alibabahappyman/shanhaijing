"""Build compact transition art from the source atlas paintings."""

from pathlib import Path

from PIL import Image


ATLAS = Path(__file__).resolve().parents[1] / "public" / "assets" / "atlas"

for source in [*ATLAS.glob("passage-*.png"), ATLAS / "shanhai-ink-map.png"]:
    name = "passage-nanshan.webp" if source.name == "shanhai-ink-map.png" else f"{source.stem}.webp"
    with Image.open(source) as image:
        image.convert("RGB").save(ATLAS / name, "WEBP", quality=85, method=6)
    print(name)
