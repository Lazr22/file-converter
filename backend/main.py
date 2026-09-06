from fastapi import FastAPI, UploadFile, File, BackgroundTasks, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from converters.pdf_to_word import convert_pdf_to_docx
import shutil
import uuid
import os

app = FastAPI(title="File Converter API")

# Allow the frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows any website to call this API (Works for local & web)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TEMP_DIR = "temp_files"
os.makedirs(TEMP_DIR, exist_ok=True)

def delete_files(*file_paths):
    """Deletes temporary files securely after user downloads them."""
    for path in file_paths:
        if os.path.exists(path):
            os.remove(path)

@app.post("/api/convert/pdf-to-word")
async def pdf_to_word(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Must be PDF.")

    file_id = str(uuid.uuid4())
    pdf_path = os.path.join(TEMP_DIR, f"{file_id}.pdf")
    docx_path = os.path.join(TEMP_DIR, f"{file_id}.docx")

    with open(pdf_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        convert_pdf_to_docx(pdf_path, docx_path)
    except Exception as e:
        delete_files(pdf_path, docx_path)
        raise HTTPException(status_code=500, detail="Conversion failed.")

    background_tasks.add_task(delete_files, pdf_path, docx_path)

    return FileResponse(
        path=docx_path, 
        filename=f"{file.filename.replace('.pdf', '')}_converted.docx",
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
from converters.image_to_pdf import convert_image_to_pdf

@app.post("/api/convert/image-to-pdf")
async def image_to_pdf(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Must be JPG or PNG.")

    file_id = str(uuid.uuid4())
    # Keep the original extension
    ext = ".png" if file.content_type == "image/png" else ".jpg"
    image_path = os.path.join(TEMP_DIR, f"{file_id}{ext}")
    pdf_path = os.path.join(TEMP_DIR, f"{file_id}.pdf")

    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        convert_image_to_pdf(image_path, pdf_path)
    except Exception as e:
        delete_files(image_path, pdf_path)
        raise HTTPException(status_code=500, detail="Conversion failed.")

    background_tasks.add_task(delete_files, image_path, pdf_path)

    return FileResponse(
        path=pdf_path, 
        filename=f"{file.filename.rsplit('.', 1)[0]}_converted.pdf",
        media_type="application/pdf"
    )