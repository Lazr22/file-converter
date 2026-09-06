import Link from 'next/link';
import { FileText, Image } from 'lucide-react';

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4">File Conversion Made Easy</h1>
      <p className="text-xl text-center text-gray-500 mb-12">100% Free. Secure. Delete automatically.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/pdf-to-word" className="bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-lg transition flex flex-col items-center text-center cursor-pointer">
          <FileText className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="font-bold text-xl mb-2">PDF to Word</h3>
          <p className="text-gray-500">Easily convert your PDF files into easy to edit DOCX documents.</p>
        </Link>
        
        <div className="bg-white border border-gray-200 p-6 rounded-2xl opacity-50 flex flex-col items-center text-center">
          <Image className="h-12 w-12 text-green-600 mb-4" />
          <h3 className="font-bold text-xl mb-2">Image to PDF (Coming Soon)</h3>
          <p className="text-gray-500">Convert JPG and PNG images into a PDF document.</p>
        </div>
      </div>
    </main>
  );
}