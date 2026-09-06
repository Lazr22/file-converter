"use client";
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { UploadCloud, FileType, Loader2, Download } from 'lucide-react';

export default function FileDropzone({ endpoint, accept, title }: { endpoint: string, accept: any, title: string }) {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'converting' | 'success' | 'error'>('idle');
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [downloadFilename, setDownloadFilename] = useState<string>('');

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            setStatus('idle');
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, maxFiles: 1 });

    const handleConvert = async () => {
        if (!file) return;
        setStatus('converting');

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Connects to local Python server OR live web server
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

            const response = await axios.post(`${API_URL}/api/convert/${endpoint}`, formData, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));

            let filename = `${file.name.replace(/\.[^/.]+$/, "")}_converted.docx`;
            const contentDisposition = response.headers['content-disposition'];
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
                if (filenameMatch && filenameMatch.length === 2) filename = filenameMatch[1];
            }

            setDownloadUrl(url);
            setDownloadFilename(filename);
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {status === 'idle' || status === 'error' ? (
                <div
                    {...getRootProps()}
                    className={`border-4 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
                        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                    }`}
                >
                    <input {...getInputProps()} />
                    <UploadCloud className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <p className="text-xl font-semibold text-gray-700">
                        {file ? file.name : `Drag & drop ${title} here, or click to select`}
                    </p>
                    {status === 'error' && <p className="text-red-500 mt-4">Conversion failed. Please try again.</p>}
                </div>
            ) : status === 'success' ? (
                <div className="border border-green-200 bg-green-50 rounded-xl p-12 text-center">
                    <FileType className="mx-auto h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Success! Your file is ready.</h3>
                    <a
                        href={downloadUrl!}
                        download={downloadFilename}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                    >
                        <Download className="mr-2 h-5 w-5" /> Download File
                    </a>
                </div>
            ) : (
                <div className="border-4 border-gray-100 rounded-xl p-12 flex flex-col items-center justify-center min-h-[300px]">
                    <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700">Converting your file...</h3>
                </div>
            )}

            {file && status === 'idle' && (
                <button
                    onClick={handleConvert}
                    className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-blue-700 shadow-lg"
                >
                    Convert File
                </button>
            )}
        </div>
    );
}