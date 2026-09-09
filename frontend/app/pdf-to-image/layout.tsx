import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PDF to Image Converter',
    description: 'Export PDF pages as PNG or JPG images online, free and instantly.',
    alternates: { canonical: '/pdf-to-image' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
