import type { Metadata } from 'next';
import FileDropzone from '@/components/FileDropzone';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
    title: 'PDF to Word Converter',
    description: 'Convert PDF files to editable Word (.docx) documents online, free and instantly.',
    alternates: { canonical: '/pdf-to-word' },
};

const ACCENT = '#6366F1';

export default function PdfToWordPage() {
    return (
        <main className="max-w-4xl mx-auto py-16 sm:py-20 px-6">
            <div className="text-center">
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: `${ACCENT}14`, color: ACCENT }}>
                    Documents
                </span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-3">Convert PDF to Word</h1>
                <p className="text-foreground/55 max-w-xl mx-auto leading-relaxed">
                    Turn your PDF files into easy-to-edit Word documents, safely and securely.
                </p>
            </div>

            <FileDropzone
                endpoint="pdf-to-word"
                accept={{ 'application/pdf': ['.pdf'] }}
                title="a PDF"
                accent={ACCENT}
                defaultDownloadExt="docx"
            />

            <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONVERTER || ''} className="mt-10 min-h-[100px] max-w-2xl mx-auto" />
        </main>
    );
}
