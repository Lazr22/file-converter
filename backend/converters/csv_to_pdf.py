import os
import csv
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle


def convert_csv_to_pdf(csv_path: str, pdf_path: str):
    """Renders a CSV file as a formatted table in a PDF."""
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"Source file not found: {csv_path}")

    with open(csv_path, newline="", encoding="utf-8-sig") as f:
        reader = csv.reader(f)
        rows = [row for row in reader if row]

    if not rows:
        raise ValueError("CSV file is empty.")

    # Wide tables read better in landscape.
    page_size = landscape(letter) if len(rows[0]) > 6 else letter

    doc = SimpleDocTemplate(pdf_path, pagesize=page_size, leftMargin=0.5 * inch,
                             rightMargin=0.5 * inch, topMargin=0.5 * inch, bottomMargin=0.5 * inch)

    table = Table(rows, repeatRows=1)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#6366F1")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#E5E7EB")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F7F8FC")]),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))

    doc.build([table])
