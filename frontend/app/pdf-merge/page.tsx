import FileDropzone from '@/components/FileDropzone';

const ACCENT = '#6366F1';

export default function PdfMergePage() {
    return (
        <main className="max-w-4xl mx-auto py-16 sm:py-20 px-6">
            <div className="text-center">
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: `${ACCENT}14`, color: ACCENT }}>
                    Documents
                </span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-3">Merge PDFs</h1>
                <p className="text-foreground/55 max-w-xl mx-auto leading-relaxed">
                    Combine two or more PDFs into a single file, in the order you add them.
                </p>
            </div>

            <FileDropzone
                endpoint="pdf-merge"
                accept={{ 'application/pdf': ['.pdf'] }}
                title="PDFs"
                accent={ACCENT}
                multiple
                fieldName="files"
                defaultDownloadExt="pdf"
            />
        </main>
    );
}
