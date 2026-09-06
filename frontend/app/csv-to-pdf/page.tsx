import FileDropzone from '@/components/FileDropzone';

const ACCENT = '#F59E0B';

export default function CsvToPdfPage() {
    return (
        <main className="max-w-4xl mx-auto py-16 sm:py-20 px-6">
            <div className="text-center">
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: `${ACCENT}14`, color: ACCENT }}>
                    Data
                </span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-3">Convert CSV to PDF</h1>
                <p className="text-foreground/55 max-w-xl mx-auto leading-relaxed">
                    Render a CSV file as a clean, formatted PDF table.
                </p>
            </div>

            <FileDropzone
                endpoint="csv-to-pdf"
                accept={{ 'text/csv': ['.csv'] }}
                title="a CSV file"
                accent={ACCENT}
                defaultDownloadExt="pdf"
            />
        </main>
    );
}
