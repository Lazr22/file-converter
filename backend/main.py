from fastapi import FastAPI, UploadFile, File, BackgroundTasks, HTTPException, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import shutil
import uuid
import os
import zipfile

from converters.pdf_to_word import convert_pdf_to_docx
from converters.image_to_pdf import convert_image_to_pdf
from converters.office_to_pdf import convert_office_to_pdf
from converters.pdf_to_image import convert_pdf_to_images
from converters.image_convert import convert_image_format
from converters.pdf_tools import merge_pdfs, split_pdf
from converters.csv_to_pdf import convert_csv_to_pdf

app = FastAPI(title="File Converter API")

# Allow the frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows any website to call this API (Works for local & web)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TEMP_DIR = "temp_files"
os.makedirs(TEMP_DIR, exist_ok=True)


def delete_files(*paths):
    """Deletes temporary files and directories securely after user downloads them."""
    for path in paths:
        if os.path.isdir(path):
            shutil.rmtree(path, ignore_errors=True)
        elif os.path.exists(path):
            os.remove(path)


def new_job_dir() -> str:
    job_dir = os.path.join(TEMP_DIR, str(uuid.uuid4()))
    os.makedirs(job_dir, exist_ok=True)
    return job_dir


def zip_files(paths: List[str], zip_path: str):
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in paths:
            zf.write(path, arcname=os.path.basename(path))


# ---------------------------------------------------------------------------
# PDF <-> Word
# ---------------------------------------------------------------------------

@app.post("/api/convert/pdf-to-word")
async def pdf_to_word(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Must be PDF.")

    job_dir = new_job_dir()
    pdf_path = os.path.join(job_dir, "source.pdf")
    docx_path = os.path.join(job_dir, "output.docx")

    with open(pdf_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        convert_pdf_to_docx(pdf_path, docx_path)
    except Exception:
        delete_files(job_dir)
        raise HTTPException(status_code=500, detail="Conversion failed.")

    background_tasks.add_task(delete_files, job_dir)

    return FileResponse(
        path=docx_path,
        filename=f"{file.filename.rsplit('.', 1)[0]}_converted.docx",
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    )


@app.post("/api/convert/word-to-pdf")
async def word_to_pdf(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    allowed = [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
    ]
    if file.content_type not in allowed and not file.filename.lower().endswith((".doc", ".docx")):
        raise HTTPException(status_code=400, detail="Invalid file type. Must be a Word document.")

    job_dir = new_job_dir()
    ext = ".docx" if file.filename.lower().endswith(".docx") else ".doc"
    source_path = os.path.join(job_dir, f"source{ext}")
    pdf_path = os.path.join(job_dir, "output.pdf")

    with open(source_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        convert_office_to_pdf(source_path, pdf_path)
    except Exception as e:
        delete_files(job_dir)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {e}")

    background_tasks.add_task(delete_files, job_dir)

    return FileResponse(
        path=pdf_path,
        filename=f"{file.filename.rsplit('.', 1)[0]}_converted.pdf",
        media_type="application/pdf",
    )


# ---------------------------------------------------------------------------
# Excel -> PDF
# ---------------------------------------------------------------------------

@app.post("/api/convert/excel-to-pdf")
async def excel_to_pdf(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    if not file.filename.lower().endswith((".xls", ".xlsx")):
        raise HTTPException(status_code=400, detail="Invalid file type. Must be an Excel file.")

    job_dir = new_job_dir()
    ext = ".xlsx" if file.filename.lower().endswith(".xlsx") else ".xls"
    source_path = os.path.join(job_dir, f"source{ext}")
    pdf_path = os.path.join(job_dir, "output.pdf")

    with open(source_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        convert_office_to_pdf(source_path, pdf_path)
    except Exception as e:
        delete_files(job_dir)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {e}")

    background_tasks.add_task(delete_files, job_dir)

    return FileResponse(
        path=pdf_path,
        filename=f"{file.filename.rsplit('.', 1)[0]}_converted.pdf",
        media_type="application/pdf",
    )


# ---------------------------------------------------------------------------
# CSV -> PDF
# ---------------------------------------------------------------------------

@app.post("/api/convert/csv-to-pdf")
async def csv_to_pdf(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Invalid file type. Must be a CSV file.")

    job_dir = new_job_dir()
    csv_path = os.path.join(job_dir, "source.csv")
    pdf_path = os.path.join(job_dir, "output.pdf")

    with open(csv_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        convert_csv_to_pdf(csv_path, pdf_path)
    except Exception as e:
        delete_files(job_dir)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {e}")

    background_tasks.add_task(delete_files, job_dir)

    return FileResponse(
        path=pdf_path,
        filename=f"{file.filename.rsplit('.', 1)[0]}_converted.pdf",
        media_type="application/pdf",
    )


# ---------------------------------------------------------------------------
# Image -> PDF
# ---------------------------------------------------------------------------

@app.post("/api/convert/image-to-pdf")
async def image_to_pdf(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Must be JPG or PNG.")

    job_dir = new_job_dir()
    ext = ".png" if file.content_type == "image/png" else ".jpg"
    image_path = os.path.join(job_dir, f"source{ext}")
    pdf_path = os.path.join(job_dir, "output.pdf")

    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        convert_image_to_pdf(image_path, pdf_path)
    except Exception:
        delete_files(job_dir)
        raise HTTPException(status_code=500, detail="Conversion failed.")

    background_tasks.add_task(delete_files, job_dir)

    return FileResponse(
        path=pdf_path,
        filename=f"{file.filename.rsplit('.', 1)[0]}_converted.pdf",
        media_type="application/pdf",
    )


# ---------------------------------------------------------------------------
# PDF -> Images (zip if multi-page)
# ---------------------------------------------------------------------------

@app.post("/api/convert/pdf-to-image")
async def pdf_to_image(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    format: str = Form("png"),
):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Must be PDF.")

    fmt = format.lower()
    if fmt not in ("png", "jpg", "jpeg"):
        raise HTTPException(status_code=400, detail="format must be 'png' or 'jpg'.")

    job_dir = new_job_dir()
    pdf_path = os.path.join(job_dir, "source.pdf")
    images_dir = os.path.join(job_dir, "images")

    with open(pdf_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        image_paths = convert_pdf_to_images(pdf_path, images_dir, fmt=fmt)
    except Exception as e:
        delete_files(job_dir)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {e}")

    base_name = file.filename.rsplit(".", 1)[0]

    if len(image_paths) == 1:
        background_tasks.add_task(delete_files, job_dir)
        ext = "jpg" if fmt in ("jpg", "jpeg") else "png"
        media_type = "image/jpeg" if ext == "jpg" else "image/png"
        return FileResponse(
            path=image_paths[0],
            filename=f"{base_name}.{ext}",
            media_type=media_type,
        )

    zip_path = os.path.join(job_dir, "output.zip")
    zip_files(image_paths, zip_path)
    background_tasks.add_task(delete_files, job_dir)

    return FileResponse(
        path=zip_path,
        filename=f"{base_name}_pages.zip",
        media_type="application/zip",
    )


# ---------------------------------------------------------------------------
# Image <-> Image
# ---------------------------------------------------------------------------

@app.post("/api/convert/image-convert")
async def image_convert(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    target_format: str = Form(...),
):
    if file.content_type not in ["image/jpeg", "image/png", "image/webp"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Must be JPG, PNG or WebP.")

    fmt = target_format.lower()
    if fmt not in ("png", "jpg", "jpeg", "webp"):
        raise HTTPException(status_code=400, detail="target_format must be png, jpg or webp.")

    job_dir = new_job_dir()
    source_ext = os.path.splitext(file.filename)[1] or ".img"
    source_path = os.path.join(job_dir, f"source{source_ext}")
    out_ext = "jpg" if fmt == "jpeg" else fmt
    target_path = os.path.join(job_dir, f"output.{out_ext}")

    with open(source_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        convert_image_format(source_path, target_path, fmt)
    except Exception as e:
        delete_files(job_dir)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {e}")

    background_tasks.add_task(delete_files, job_dir)

    media_types = {"png": "image/png", "jpg": "image/jpeg", "webp": "image/webp"}

    return FileResponse(
        path=target_path,
        filename=f"{file.filename.rsplit('.', 1)[0]}_converted.{out_ext}",
        media_type=media_types[out_ext],
    )


# ---------------------------------------------------------------------------
# PDF Merge / Split
# ---------------------------------------------------------------------------

@app.post("/api/convert/pdf-merge")
async def pdf_merge(background_tasks: BackgroundTasks, files: List[UploadFile] = File(...)):
    if len(files) < 2:
        raise HTTPException(status_code=400, detail="Upload at least two PDFs to merge.")
    for f in files:
        if f.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail="All files must be PDFs.")

    job_dir = new_job_dir()
    source_paths = []
    for i, f in enumerate(files):
        path = os.path.join(job_dir, f"source_{i}.pdf")
        with open(path, "wb") as buffer:
            shutil.copyfileobj(f.file, buffer)
        source_paths.append(path)

    merged_path = os.path.join(job_dir, "merged.pdf")

    try:
        merge_pdfs(source_paths, merged_path)
    except Exception as e:
        delete_files(job_dir)
        raise HTTPException(status_code=500, detail=f"Merge failed: {e}")

    background_tasks.add_task(delete_files, job_dir)

    return FileResponse(
        path=merged_path,
        filename="merged.pdf",
        media_type="application/pdf",
    )


@app.post("/api/convert/pdf-split")
async def pdf_split(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Must be PDF.")

    job_dir = new_job_dir()
    pdf_path = os.path.join(job_dir, "source.pdf")
    split_dir = os.path.join(job_dir, "pages")

    with open(pdf_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        page_paths = split_pdf(pdf_path, split_dir)
    except Exception as e:
        delete_files(job_dir)
        raise HTTPException(status_code=500, detail=f"Split failed: {e}")

    if len(page_paths) == 1:
        background_tasks.add_task(delete_files, job_dir)
        return FileResponse(path=page_paths[0], filename="page_1.pdf", media_type="application/pdf")

    zip_path = os.path.join(job_dir, "output.zip")
    zip_files(page_paths, zip_path)
    background_tasks.add_task(delete_files, job_dir)

    base_name = file.filename.rsplit(".", 1)[0]
    return FileResponse(
        path=zip_path,
        filename=f"{base_name}_pages.zip",
        media_type="application/zip",
    )
