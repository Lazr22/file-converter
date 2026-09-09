import Link from 'next/link';
import {
  FileText, Image as ImageIcon, FileSpreadsheet, FileStack,
  Scissors, Images, FileType2, Table2, ArrowRight,
} from 'lucide-react';
import AdSlot from '@/components/AdSlot';

type Converter = {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

const documents: Converter[] = [
  { href: '/pdf-to-word', title: 'PDF to Word', description: 'Turn a PDF into an editable DOCX document.', icon: FileText },
  { href: '/word-to-pdf', title: 'Word to PDF', description: 'Convert DOC or DOCX files into a shareable PDF.', icon: FileType2 },
  { href: '/pdf-merge', title: 'Merge PDFs', description: 'Combine multiple PDFs into a single file, in order.', icon: FileStack },
  { href: '/pdf-split', title: 'Split PDF', description: 'Break a PDF into individual single-page files.', icon: Scissors },
];

const images: Converter[] = [
  { href: '/image-to-pdf', title: 'Image to PDF', description: 'Turn a JPG or PNG into a PDF document.', icon: ImageIcon },
  { href: '/pdf-to-image', title: 'PDF to Image', description: 'Export every page of a PDF as PNG or JPG.', icon: Images },
  { href: '/image-convert', title: 'Convert Image Format', description: 'Switch between PNG, JPG and WebP.', icon: ImageIcon },
];

const data: Converter[] = [
  { href: '/csv-to-pdf', title: 'CSV to PDF', description: 'Render a CSV as a clean, formatted PDF table.', icon: Table2 },
  { href: '/excel-to-pdf', title: 'Excel to PDF', description: 'Convert XLS or XLSX spreadsheets into a PDF.', icon: FileSpreadsheet },
];

function ConverterCard({ href, title, description, icon: Icon, accent }: Converter & { accent: string }) {
  return (
    <Link
      href={href}
      className="group relative bg-surface border border-border-soft rounded-2xl p-6 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(15,15,40,0.18)]"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${accent}18` }}
      >
        <Icon className="h-5 w-5" style={{ color: accent }} />
      </div>
      <div className="flex-1">
        <h3 className="font-display font-bold text-base text-foreground mb-1">{title}</h3>
        <p className="text-sm text-foreground/55 leading-relaxed">{description}</p>
      </div>
      <span
        className="inline-flex items-center gap-1 text-sm font-semibold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
        style={{ color: accent }}
      >
        Open <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

function Section({ id, eyebrow, title, items, accent }: { id: string; eyebrow: string; title: string; items: Converter[]; accent: string }) {
  return (
    <section id={id} className="scroll-mt-24 mb-16">
      <div className="flex items-baseline gap-3 mb-5">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
        <h2 className="font-display font-bold text-xl text-foreground">{title}</h2>
        <span className="text-sm text-foreground/40">{eyebrow}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ConverterCard key={item.href} {...item} accent={accent} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6">
      {/* Hero */}
      <section className="py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div className="hero-rise">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.08] text-foreground mb-5">
            Convert any file,
            <br />
            without the wait.
          </h1>
          <p className="text-lg text-foreground/55 max-w-md mb-8 leading-relaxed">
            Documents, images and spreadsheets — converted in seconds and
            deleted from our servers the moment you download.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#documents"
              className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-shadow"
            >
              Browse converters <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="hero-rise hero-rise-delay-2 relative hidden lg:block h-72">
          <svg viewBox="0 0 400 320" className="w-full h-full">
            <defs>
              <linearGradient id="meshA" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--accent-start)" />
                <stop offset="100%" stopColor="var(--accent-end)" />
              </linearGradient>
              <linearGradient id="meshB" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--accent-cyan)" />
                <stop offset="100%" stopColor="var(--accent-start)" />
              </linearGradient>
            </defs>
            <circle cx="150" cy="130" r="110" fill="url(#meshA)" opacity="0.16" />
            <circle cx="260" cy="200" r="90" fill="url(#meshB)" opacity="0.16" />
            <rect x="90" y="60" width="150" height="190" rx="18" fill="white" stroke="var(--border-soft)" strokeWidth="1.5" />
            <rect x="110" y="90" width="90" height="8" rx="4" fill="#E7E7F0" />
            <rect x="110" y="110" width="110" height="8" rx="4" fill="#E7E7F0" />
            <rect x="110" y="130" width="70" height="8" rx="4" fill="#E7E7F0" />
            <rect x="160" y="150" width="120" height="150" rx="18" fill="url(#meshA)" opacity="0.9" />
            <path d="M195 220L215 240L245 205" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
      </section>

      <Section id="documents" eyebrow="4 tools" title="Documents" items={documents} accent="#6366F1" />
      <Section id="images" eyebrow="3 tools" title="Images" items={images} accent="#14B8A6" />

      <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME || ''} className="my-14 min-h-[100px]" />

      <Section id="data" eyebrow="2 tools" title="Data" items={data} accent="#F59E0B" />
    </main>
  );
}
