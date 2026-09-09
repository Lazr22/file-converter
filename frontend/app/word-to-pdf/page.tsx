import type { Metadata } from 'next';
import FileDropzone from '@/components/FileDropzone';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
    title: 'Word to PDF Converter',
    description: 'Convert DOC and DOCX Word documents to PDF online, free and instantly.',
    alternates: { canonical: '/word-to-pdf' },
};

const ACCENT = '#6366F1';

export default function WordToPdfPage() {
    return (
        <main className="max-w-4xl mx-auto py-16 sm:py-20 px-6">
            <div className="text-center">
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: `${ACCENT}14`, color: ACCENT }}>
                    Documents
                </span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-3">Convert Word to PDF</h1>
                <p className="text-foreground/55 max-w-xl mx-auto leading-relaxed">
                    Turn a DOC or DOCX file into a clean, shareable PDF.
                </p>
            </div>

            <FileDropzone
                endpoint="word-to-pdf"
                accept={{
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                    'application/msword': ['.doc'],
                }}
                title="a Word document"
                accent={ACCENT}
                defaultDownloadExt="pdf"
            />

            <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONVERTER || ''} className="mt-10 min-h-[100px] max-w-2xl mx-auto" />
        </main>
    );
}
