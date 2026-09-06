import os
from PIL import Image

FORMAT_MAP = {
    "png": "PNG",
    "jpg": "JPEG",
    "jpeg": "JPEG",
    "webp": "WEBP",
}


def convert_image_format(source_path: str, target_path: str, target_format: str):
    """Converts an image between PNG, JPG and WebP."""
    if not os.path.exists(source_path):
        raise FileNotFoundError(f"Source file not found: {source_path}")

    target_format = target_format.lower()
    if target_format not in FORMAT_MAP:
        raise ValueError(f"Unsupported target format: {target_format}")

    pillow_format = FORMAT_MAP[target_format]
    image = Image.open(source_path)

    # JPEG has no alpha channel — flatten transparency onto white first.
    if pillow_format == "JPEG" and image.mode in ("RGBA", "LA", "P"):
        background = Image.new("RGB", image.size, (255, 255, 255))
        rgba = image.convert("RGBA")
        background.paste(rgba, mask=rgba.split()[-1])
        image = background
    elif pillow_format != "JPEG" and image.mode == "CMYK":
        image = image.convert("RGB")

    save_kwargs = {}
    if pillow_format in ("JPEG", "WEBP"):
        save_kwargs["quality"] = 90

    image.save(target_path, pillow_format, **save_kwargs)
