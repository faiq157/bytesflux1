import React from 'react';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

const sections = [
  {
    title: 'Information We Collect',
    content: [
      'Personal details you share with us such as your name, company name, email address, and phone number when requesting a quote or contacting our team.',
      'Project requirements, budget expectations, and any assets you provide to help us scope or deliver a service.',
      'Usage data generated when you browse bytesflux.com, including IP address, browser/device information, referring sites, and the pages you visit.'
    ]
  },
  {
    title: 'How We Use Your Information',
    content: [
      'Deliver and maintain the services you request, including project proposals, development, and ongoing support.',
      'Improve our website experience, monitor performance, and personalize content based on aggregated analytics.',
      'Send updates related to your project or marketing communication you have opted in to receive. You can unsubscribe at any time.',
      'Protect our platform against fraud, abuse, or security threats.'
    ]
  },
  {
    title: 'Cookies & Tracking Technologies',
    content: [
      'We use essential cookies to make our site function, analytics cookies to understand engagement, and advertising cookies (including Google AdSense) to show relevant offers.',
      'You may control cookies through your browser settings. Rejecting cookies might limit some site functionality.'
    ]
  },
  {
    title: 'Data Sharing & Retention',
    content: [
      'We only share information with trusted partners that help us operate our business (for example hosting, analytics, payment, or advertising providers).',
      'These partners must follow strict confidentiality and data protection agreements in line with GDPR and local regulations.',
      'Project records are kept for as long as necessary to provide services and comply with legal obligations. Marketing information is removed upon request.'
    ]
  },
  {
    title: 'Your Rights',
    content: [
      'Request access to, correction of, or deletion of your personal data by emailing privacy@bytesflux.com.',
      'Opt out of marketing communications by clicking the unsubscribe link within any message or contacting us directly.',
      'Residents of the EU/UK may exercise GDPR rights, including data portability and objection to processing.'
    ]
  },
  {
    title: 'Contact Us',
    content: [
      'If you have questions about this Privacy Policy or how we handle your data, please contact BytesFlux Privacy Team at privacy@bytesflux.com or call +923275734699.'
    ]
  }
];

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHead
        title="Privacy Policy - BytesFlux"
        description="Learn how BytesFlux collects, uses, and protects your personal information. We are committed to transparent data practices aligned with GDPR and global privacy laws."
        keywords="bytesflux privacy policy, gdpr, how data is used"
        canonical="/privacy-policy"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'PrivacyPolicy',
          'name': 'BytesFlux Privacy Policy',
          'description': 'Details about how BytesFlux collects and protects customer information.',
          'url': 'https://bytesflux.com/privacy-policy',
          'publisher': {
            '@type': 'Organization',
            'name': 'BytesFlux',
            'url': 'https://bytesflux.com'
          }
        }}
      />

      <Header />

      <main className="max-w-4xl mx-auto px-4 py-16 space-y-10">
        <header className="text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-500">Privacy Policy</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Your privacy matters to us</h1>
          <p className="text-gray-600 dark:text-gray-300">
            This policy describes how BytesFlux collects, uses, and protects information when you visit our website,
            engage our services, or interact with our marketing content. Last updated: {new Date().toLocaleDateString()}.
          </p>
        </header>

        <section className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/80 p-8 shadow-xl backdrop-blur">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Ad Networks & Google AdSense</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We partner with Google AdSense and similar advertising platforms to display relevant ads. These partners may
            use cookies or device identifiers to deliver interest-based advertising and measure campaign performance. You
            can adjust ad personalization settings anytime at <a href="https://adssettings.google.com" className="text-blue-600">Google Ad Settings</a> or opt out via
            <a href="https://www.aboutads.info/choices" className="text-blue-600"> YourAdChoices</a>.
          </p>
        </section>

        {sections.map((section) => (
          <section key={section.title} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{section.title}</h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              {section.content.map((paragraph) => (
                <li key={paragraph} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" aria-hidden />
                  <p>{paragraph}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="rounded-xl bg-blue-50 dark:bg-blue-900/30 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Updates to This Policy</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We may update this Privacy Policy to reflect new regulatory requirements or changes to our services. When
            we do, we will revise the \"Last updated\" date and notify clients via email or a site-wide notice.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
