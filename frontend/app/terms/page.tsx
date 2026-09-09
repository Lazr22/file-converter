import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `The terms that govern your use of ${siteConfig.name}.`,
  alternates: { canonical: '/terms' },
};

const updated = 'September 8, 2026';

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto py-16 sm:py-20 px-6">
      <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-2">Terms of Service</h1>
      <p className="text-sm text-foreground/45 mb-10">Last updated: {updated}</p>

      <div className="flex flex-col gap-8 text-foreground/75 leading-relaxed">
        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">1. Acceptance of terms</h2>
          <p>
            By accessing or using {siteConfig.name} (&quot;the Service&quot;), you agree to these Terms of
            Service. If you do not agree, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">2. The service</h2>
          <p>
            {siteConfig.name} converts files you upload (documents, images, and spreadsheets) into a different
            format and returns the result for download. The Service is provided free of charge and does not
            require an account.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">3. Your content</h2>
          <p>
            You retain all ownership rights to files you upload. You are solely responsible for the files you
            submit and confirm that you have the right to upload and convert them. You agree not to upload
            content that is illegal, infringes on the rights of others, or that you do not have permission to
            process.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">4. Acceptable use</h2>
          <p>
            You agree not to misuse the Service — including attempting to disrupt it, probe it for
            vulnerabilities, use it to distribute malware, or automate excessive requests in a way that
            degrades the experience for other users.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">5. No warranty</h2>
          <p>
            The Service is provided &quot;as is&quot; and &quot;as available,&quot; without warranties of any
            kind, express or implied. We do not guarantee that conversions will always be perfectly accurate,
            uninterrupted, or error-free.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">6. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, {siteConfig.name} and its operators are not liable for any
            indirect, incidental, or consequential damages arising from your use of, or inability to use, the
            Service, including loss of data.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">7. Advertising</h2>
          <p>
            The Service may display third-party advertisements, including through Google AdSense, to help keep
            it free to use. We are not responsible for the content of third-party ads.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">8. Changes</h2>
          <p>
            We may update these Terms from time to time. Continued use of the Service after changes take
            effect constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">9. Contact</h2>
          <p>
            Questions about these Terms? Email us at{' '}
            <a href={`mailto:${siteConfig.contactEmail}`} className="underline hover:text-foreground">{siteConfig.contactEmail}</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
