FROM python:3.12-slim

# LibreOffice is required for Word -> PDF and Excel -> PDF conversion.
# --no-install-recommends keeps the image reasonably small; the "writer" and
# "calc" components are enough (no need for the full LibreOffice suite).
RUN apt-get update && apt-get install -y --no-install-recommends \
    libreoffice-writer \
    libreoffice-calc \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT=8000
EXPOSE 8000

CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT}"]
