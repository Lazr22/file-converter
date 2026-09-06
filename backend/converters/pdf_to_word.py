import os
from pdf2docx import Converter

def convert_pdf_to_docx(pdf_path: str, docx_path: str):
    """Converts a PDF file to a Word document."""
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"Source file not found: {pdf_path}")
        
    cv = Converter(pdf_path)
    cv.convert(docx_path)
    cv.close()