import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Image Format Converter',
    description: 'Convert images between PNG, JPG and WebP online, free and instantly.',
    alternates: { canonical: '/image-convert' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
