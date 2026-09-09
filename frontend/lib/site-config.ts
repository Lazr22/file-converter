// Central site configuration.
// Everything here is env-driven so you can set real values in Vercel's
// Project Settings -> Environment Variables without touching code.

export const siteConfig = {
  name: 'ConvertHub',
  // Fallback is a placeholder — set NEXT_PUBLIC_SITE_URL in Vercel once you
  // have a custom domain (or your *.vercel.app URL) so metadata, the
  // sitemap and canonical links are correct.
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://converthub.vercel.app',
  // Shown on the Contact page and in the Privacy Policy / Terms.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@converthub.app',
  description:
    'Free online file converter. Convert PDF, Word, Excel, CSV and image files in seconds — no signup, files deleted automatically after conversion.',
  // Google AdSense publisher ID, e.g. "ca-pub-1234567890123456".
  // Ads will not render anywhere until this is set.
  adsensePublisherId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
};
