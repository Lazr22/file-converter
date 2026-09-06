import os
import pymupdf as fitz  # PyMuPDF


def convert_pdf_to_images(pdf_path: str, out_dir: str, fmt: str = "png", dpi: int = 200) -> list[str]:
    """
    Renders every page of a PDF to an image file.
    Returns a list of output image paths, one per page, in order.
    """
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"Source file not found: {pdf_path}")

    fmt = fmt.lower()
    if fmt not in ("png", "jpg", "jpeg"):
        raise ValueError("fmt must be 'png' or 'jpg'")

    os.makedirs(out_dir, exist_ok=True)
    zoom = dpi / 72
    matrix = fitz.Matrix(zoom, zoom)

    output_paths = []
    doc = fitz.open(pdf_path)
    try:
        for page_index in range(len(doc)):
            page = doc.load_page(page_index)
            pix = page.get_pixmap(matrix=matrix)
            ext = "jpg" if fmt in ("jpg", "jpeg") else "png"
            out_path = os.path.join(out_dir, f"page_{page_index + 1}.{ext}")
            pix.save(out_path)
            output_paths.append(out_path)
    finally:
        doc.close()

    return output_paths
