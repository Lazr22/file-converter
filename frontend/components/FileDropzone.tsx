"use client";
import { useCallback, useState } from 'react';
import { useDropzone, Accept } from 'react-dropzone';
import axios from 'axios';
import { UploadCloud, FileCheck2, Loader2, Download, RotateCcw, X } from 'lucide-react';

type Status = 'idle' | 'converting' | 'success' | 'error';

type Props = {
  endpoint: string;
  accept: Accept;
  title: string;
  accent?: string;
  multiple?: boolean;
  fieldName?: string;
  extraFields?: Record<string, string>;
  defaultDownloadExt?: string;
};

export default function FileDropzone({
  endpoint,
  accept,
  title,
  accent = '#6366F1',
  multiple = false,
  fieldName = 'file',
  extraFields,
  defaultDownloadExt = 'pdf',
}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadFilename, setDownloadFilename] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    setFiles(multiple ? acceptedFiles : [acceptedFiles[0]]);
    setStatus('idle');
    setErrorMessage('');
  }, [multiple]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: multiple ? 20 : 1,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const reset = () => {
    setFiles([]);
    setStatus('idle');
    setDownloadUrl(null);
    setErrorMessage('');
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setStatus('converting');
    setErrorMessage('');

    const formData = new FormData();
    if (multiple) {
      files.forEach((f) => formData.append(fieldName, f));
    } else {
      formData.append(fieldName, files[0]);
    }
    if (extraFields) {
      Object.entries(extraFields).forEach(([key, value]) => formData.append(key, value));
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

      const response = await axios.post(`${API_URL}/api/convert/${endpoint}`, formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      let filename = `${files[0].name.replace(/\.[^/.]+$/, '')}_converted.${defaultDownloadExt}`;
      const contentDisposition = response.headers['content-disposition'];
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch && filenameMatch.length === 2) filename = filenameMatch[1];
      }

      setDownloadUrl(url);
      setDownloadFilename(filename);
      setStatus('success');
    } catch (error) {
      console.error(error);
      let message = 'Something went wrong. Please try again.';
      if (axios.isAxiosError(error) && error.response?.data instanceof Blob) {
        try {
          const text = await error.response.data.text();
          const parsed = JSON.parse(text);
          if (parsed.detail) message = parsed.detail;
        } catch {
          // keep default message
        }
      }
      setErrorMessage(message);
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-surface p-6 sm:p-8 rounded-2xl border border-border-soft shadow-[0_1px_2px_rgba(15,15,40,0.04)]">
      {status === 'success' ? (
        <div className="rounded-xl p-10 text-center" style={{ backgroundColor: `${accent}0D`, borderColor: `${accent}33`, borderWidth: 1 }}>
          <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accent}22` }}>
            <FileCheck2 className="h-7 w-7" style={{ color: accent }} />
          </div>
          <h3 className="font-display font-bold text-xl text-foreground mb-1">Your file is ready</h3>
          <p className="text-sm text-foreground/50 mb-6">{downloadFilename}</p>
          <div className="flex items-center justify-center gap-3">
            <a
              href={downloadUrl!}
              download={downloadFilename}
              className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: accent }}
            >
              <Download className="h-4 w-4" /> Download
            </a>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 text-foreground/60 font-medium px-4 py-3 rounded-xl border border-border-soft hover:bg-black/[0.02] transition-colors"
            >
              <RotateCcw className="h-4 w-4" /> Convert another
            </button>
          </div>
        </div>
      ) : status === 'converting' ? (
        <div className="rounded-xl p-12 flex flex-col items-center justify-center min-h-[280px] border border-border-soft bg-black/[0.015]">
          <Loader2 className="h-10 w-10 animate-spin mb-4" style={{ color: accent }} />
          <h3 className="font-display font-semibold text-lg text-foreground">Converting…</h3>
          <p className="text-sm text-foreground/45 mt-1">This usually takes a few seconds.</p>
        </div>
      ) : (
        <>
          <div
            {...getRootProps()}
            className={`rounded-xl p-10 sm:p-12 text-center cursor-pointer transition-colors border-2 border-dashed ${
              isDragActive ? 'bg-black/[0.02]' : 'bg-black/[0.01] hover:bg-black/[0.02]'
            }`}
            style={{ borderColor: isDragActive ? accent : '#E7E7F0' }}
          >
            <input {...getInputProps()} />
            <UploadCloud className="mx-auto h-12 w-12 mb-4" style={{ color: accent, opacity: 0.85 }} />
            <p className="text-lg font-semibold text-foreground">
              Drag & drop {title} here, or click to select
            </p>
            {multiple && <p className="text-sm text-foreground/45 mt-1">You can select multiple files.</p>}
          </div>

          {status === 'error' && (
            <p className="text-sm text-red-500 mt-4 text-center">{errorMessage}</p>
          )}

          {files.length > 0 && (
            <ul className="mt-5 flex flex-col gap-2">
              {files.map((f, i) => (
                <li
                  key={`${f.name}-${i}`}
                  className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg bg-black/[0.02] text-sm"
                >
                  <span className="truncate text-foreground/80">{f.name}</span>
                  <button onClick={() => removeFile(i)} className="text-foreground/40 hover:text-foreground/70 shrink-0">
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {files.length > 0 && (multiple ? files.length >= 1 : true) && (
            <button
              onClick={handleConvert}
              disabled={multiple && files.length < 2}
              className="w-full mt-6 text-white py-3.5 rounded-xl font-semibold text-base transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
              style={{ backgroundColor: accent }}
            >
              {multiple && files.length < 2 ? 'Add at least 2 files' : 'Convert'}
            </button>
          )}
        </>
      )}
    </div>
  );
}
