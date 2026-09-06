import os
from pypdf import PdfReader, PdfWriter


def merge_pdfs(pdf_paths: list[str], out_path: str):
    """Merges multiple PDFs, in the given order, into a single PDF."""
    if len(pdf_paths) < 2:
        raise ValueError("Need at least two PDFs to merge.")

    writer = PdfWriter()
    for path in pdf_paths:
        if not os.path.exists(path):
            raise FileNotFoundError(f"Source file not found: {path}")
        reader = PdfReader(path)
        for page in reader.pages:
            writer.add_page(page)

    with open(out_path, "wb") as f:
        writer.write(f)


def split_pdf(pdf_path: str, out_dir: str) -> list[str]:
    """Splits a PDF into one single-page PDF per page. Returns output paths."""
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"Source file not found: {pdf_path}")

    os.makedirs(out_dir, exist_ok=True)
    reader = PdfReader(pdf_path)

    output_paths = []
    for i, page in enumerate(reader.pages):
        writer = PdfWriter()
        writer.add_page(page)
        out_path = os.path.join(out_dir, f"page_{i + 1}.pdf")
        with open(out_path, "wb") as f:
            writer.write(f)
        output_paths.append(out_path)

    return output_paths
