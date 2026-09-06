import FileDropzone from '@/components/FileDropzone';

export default function ImageToPdfPage() {
    return (
        <main className="min-h-screen py-16 px-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Convert Image to PDF</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Turn your JPG and PNG images into a PDF document instantly.
                </p>
            </div>

            <FileDropzone
                endpoint="image-to-pdf"
                accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
                title="an Image"
            />
        </main>
    );
}