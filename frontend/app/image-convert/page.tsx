"use client";
import { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';

const ACCENT = '#14B8A6';
const FORMATS = ['png', 'jpg', 'webp'] as const;

export default function ImageConvertPage() {
    const [format, setFormat] = useState<(typeof FORMATS)[number]>('webp');

    return (
        <main className="max-w-4xl mx-auto py-16 sm:py-20 px-6">
            <div className="text-center">
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: `${ACCENT}14`, color: ACCENT }}>
                    Images
                </span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-3">Convert Image Format</h1>
                <p className="text-foreground/55 max-w-xl mx-auto leading-relaxed">
                    Switch an image between PNG, JPG and WebP. Pick the format you want below.
                </p>
            </div>

            <div className="flex items-center justify-center gap-2 mt-8">
                {FORMATS.map((f) => (
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
                endpoint="image-convert"
                accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] }}
                title="an image"
                accent={ACCENT}
                extraFields={{ target_format: format }}
                defaultDownloadExt={format}
            />
        </main>
    );
}
