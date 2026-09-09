import type { Metadata } from 'next';
import FileDropzone from '@/components/FileDropzone';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
    title: 'Image to PDF Converter',
    description: 'Convert JPG and PNG images to PDF online, free and instantly.',
    alternates: { canonical: '/image-to-pdf' },
};

const ACCENT = '#14B8A6';

export default function ImageToPdfPage() {
    return (
        <main className="max-w-4xl mx-auto py-16 sm:py-20 px-6">
            <div className="text-center">
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: `${ACCENT}14`, color: ACCENT }}>
                    Images
                </span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-3">Convert Image to PDF</h1>
                <p className="text-foreground/55 max-w-xl mx-auto leading-relaxed">
                    Turn your JPG and PNG images into a PDF document instantly.
                </p>
            </div>

            <FileDropzone
                endpoint="image-to-pdf"
                accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
                title="an image"
                accent={ACCENT}
                defaultDownloadExt="pdf"
            />

            <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONVERTER || ''} className="mt-10 min-h-[100px] max-w-2xl mx-auto" />
        </main>
    );
}
