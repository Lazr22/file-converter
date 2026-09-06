import FileDropzone from '@/components/FileDropzone';

export default function PdfToWordPage() {
    return (
        <main className="min-h-screen py-16 px-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Convert PDF to Word</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Turn your PDF files into easy-to-edit Word documents safely and securely.
                </p>
            </div>

            <FileDropzone
                endpoint="pdf-to-word"
                accept={{ 'application/pdf': ['.pdf'] }}
                title="a PDF"
            />
        </main>
    );
}