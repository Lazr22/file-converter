"use client";
import { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import AdSlot from '@/components/AdSlot';

const ACCENT = '#14B8A6';

export default function PdfToImagePage() {
    const [format, setFormat] = useState<'png' | 'jpg'>('png');

    return (
        <main className="max-w-4xl mx-auto py-16 sm:py-20 px-6">
            <div className="text-center">
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: `${ACCENT}14`, color: ACCENT }}>
                    Images
                </span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-3">Convert PDF to Image</h1>
                <p className="text-foreground/55 max-w-xl mx-auto leading-relaxed">
                    Export every page of a PDF as an image. Multi-page PDFs come back as a zip.
                </p>
            </div>

            <div className="flex items-center justify-center gap-2 mt-8">
                {(['png', 'jpg'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFormat(f)}
                        className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors"
                        style={
                            format === f
                                ? { backgroundColor: ACCENT, borderColor: ACCENT, color: 'white' }
                                : { borderColor: '#E7E7F0', color: 'var(--foreground)', backgroundColor: 'transparent' }
                        }
                    >
                        {f.toUpperCase()}
                    </button>
                ))}
            </div>

            <FileDropzone
                key={format}
                endpoint="pdf-to-image"
                accept={{ 'application/pdf': ['.pdf'] }}
                title="a PDF"
                accent={ACCENT}
                extraFields={{ format }}
                defaultDownloadExt={format}
            />

            <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONVERTER || ''} className="mt-10 min-h-[100px] max-w-2xl mx-auto" />
        </main>
    );
}
