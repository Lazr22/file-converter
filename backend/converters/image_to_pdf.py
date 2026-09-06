from PIL import Image
import os

def convert_image_to_pdf(image_path: str, pdf_path: str):
    """Converts a JPG or PNG to a PDF."""
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Source file not found: {image_path}")
        
    image = Image.open(image_path)
    # Convert to RGB to ensure compatibility (removes transparency alpha layer for PDF)
    pdf_bytes = image.convert('RGB')
    pdf_bytes.save(pdf_path)