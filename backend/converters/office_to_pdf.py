import os
import subprocess
import shutil


def convert_office_to_pdf(source_path: str, pdf_path: str):
    """
    Converts an Office document (.docx, .xlsx, .pptx, etc.) to PDF using
    a headless LibreOffice install. Works for Word -> PDF and Excel -> PDF.

    Requires the `soffice` binary to be available on the system PATH.
    On Render, install it via a Dockerfile (see backend/Dockerfile).
    """
    if not os.path.exists(source_path):
        raise FileNotFoundError(f"Source file not found: {source_path}")

    soffice_bin = shutil.which("soffice") or shutil.which("libreoffice")
    if not soffice_bin:
        raise RuntimeError(
            "LibreOffice ('soffice') is not installed on this server. "
            "Word/Excel to PDF conversion requires it."
        )

    out_dir = os.path.dirname(pdf_path)
    os.makedirs(out_dir, exist_ok=True)

    # LibreOffice writes <original_basename>.pdf into --outdir, so we
    # convert into a scratch dir named after the desired output, then move it.
    result = subprocess.run(
        [
            soffice_bin,
            "--headless",
            "--norestore",
            "--convert-to", "pdf",
            "--outdir", out_dir,
            source_path,
        ],
        capture_output=True,
        text=True,
        timeout=120,
    )

    if result.returncode != 0:
        raise RuntimeError(f"LibreOffice conversion failed: {result.stderr}")

    produced_name = os.path.splitext(os.path.basename(source_path))[0] + ".pdf"
    produced_path = os.path.join(out_dir, produced_name)

    if not os.path.exists(produced_path):
        raise RuntimeError("LibreOffice did not produce an output PDF.")

    if produced_path != pdf_path:
        shutil.move(produced_path, pdf_path)
