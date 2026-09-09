import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${siteConfig.name} handles your files, cookies and personal data.`,
  alternates: { canonical: '/privacy' },
};

const updated = 'September 8, 2026';

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto py-16 sm:py-20 px-6">
      <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-2">Privacy Policy</h1>
      <p className="text-sm text-foreground/45 mb-10">Last updated: {updated}</p>

      <div className="flex flex-col gap-8 text-foreground/75 leading-relaxed">
        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">1. Files you upload</h2>
          <p>
            When you convert a file, it is uploaded to our servers, processed, and made available for you to
            download. Uploaded files and the files we generate from them are stored only temporarily and are
            automatically and permanently deleted from our servers shortly after conversion — whether or not
            you download the result. We do not review, scan, or share the contents of your files, and we do
            not use them to train any model.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">2. Information we collect automatically</h2>
          <p>
            Like most websites, our servers and analytics tools automatically log standard technical
            information such as your IP address, browser type, device type, pages visited, and timestamps.
            We use this only to operate, secure, and improve {siteConfig.name}.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">3. Cookies and advertising</h2>
          <p>
            We use cookies for basic site functionality and, if you accept them, for analytics and advertising.
            We display ads served by Google AdSense. Google and its partners may use cookies (including the
            DoubleClick cookie) to serve ads based on your prior visits to this or other websites. You can opt
            out of personalized advertising by visiting{' '}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              Google Ads Settings
            </a>{' '}
            or by rejecting cookies in the banner shown on this site, in which case only non-personalized ads
            will be requested. Learn more about how Google uses data in{' '}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              Google&apos;s Partner Sites policy
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">4. How we use information</h2>
          <p>
            We use the information above to provide and maintain the conversion service, to keep it secure and
            reliable, to understand aggregate usage patterns, and to support the site through advertising.
            We do not sell your personal information.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">5. Your rights</h2>
          <p>
            Depending on where you live, you may have the right to access, correct, or delete personal data we
            hold about you, and to object to or restrict certain processing. Since we don&apos;t require an
            account and delete files automatically, we generally hold very little personal data beyond
            technical logs. To make a request, contact us at{' '}
            <a href={`mailto:${siteConfig.contactEmail}`} className="underline hover:text-foreground">{siteConfig.contactEmail}</a>.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">6. Children&apos;s privacy</h2>
          <p>
            {siteConfig.name} is not directed at children under 13, and we do not knowingly collect personal
            information from them.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">7. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. Material changes will be reflected by updating the
            &quot;Last updated&quot; date above.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">8. Contact</h2>
          <p>
            Questions about this policy? Email us at{' '}
            <a href={`mailto:${siteConfig.contactEmail}`} className="underline hover:text-foreground">{siteConfig.contactEmail}</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
