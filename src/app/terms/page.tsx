import React from 'react';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

const commitments = [
  {
    title: 'Using Our Services',
    details: [
      'You agree to provide accurate information when requesting quotes, submitting content, or creating project accounts.',
      'You will not misuse BytesFlux platforms, interfere with service availability, or attempt to access other customer data.',
      'All creative assets, copy, and software we deliver remain our property until invoices are paid in full.'
    ]
  },
  {
    title: 'Project Engagements & Payments',
    details: [
      'A formal statement of work or proposal outlines scope, timelines, deliverables, and payment milestones.',
      'Invoices are due according to the agreed schedule; late payments may pause active work until balance is cleared.',
      'Any scope changes require a written change request and may adjust delivery dates or project fees.'
    ]
  },
  {
    title: 'Intellectual Property & Licensing',
    details: [
      'You retain ownership of content and data you supply to us. We grant you a perpetual license to the bespoke deliverables created for your project once all dues are settled.',
      'Open-source or third-party libraries stay subject to their respective licenses.',
      'BytesFlux may showcase non-confidential work samples in our portfolio unless you opt out in writing.'
    ]
  },
  {
    title: 'Warranties & Liability',
    details: [
      'We warrant that all custom work will materially conform to the approved specifications at the time of delivery.',
      'To the maximum extent allowed by law, BytesFlux is not liable for indirect, incidental, or consequential damages resulting from service use.',
      'If an issue occurs, our total liability is limited to the amount you paid for the specific service giving rise to the claim.'
    ]
  },
  {
    title: 'Cancellation & Termination',
    details: [
      'Either party may terminate a project by providing written notice if the other party materially breaches this agreement and fails to cure the breach within 14 days.',
      'Upon cancellation, you are responsible for work completed to date, and BytesFlux will deliver any in-progress assets that have been paid for.',
      'Monthly retainers require 30 days notice before cancellation to ensure a smooth handover.'
    ]
  },
  {
    title: 'Compliance & Advertising Partners',
    details: [
      'We comply with all applicable laws, including GDPR, CAN-SPAM, and Google AdSense policies. You agree not to use our deliverables for unlawful purposes.',
      'Ad placements must follow Google’s content guidelines. BytesFlux reserves the right to refuse or remove ads that violate policies.'
    ]
  },
  {
    title: 'Governing Law & Contact',
    details: [
      'These terms are governed by the laws of Pakistan. Any disputes will be handled in the courts of Lahore, Pakistan, unless both parties agree to arbitration.',
      'Questions? Email us at legal@bytesflux.com or +92 3275734699.'
    ]
  }
];

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHead
        title="Terms of Service - BytesFlux"
        description="Understand the service terms, payment policies, intellectual property rights, and responsibilities when working with BytesFlux."
        keywords="bytesflux terms of service, tos, contracts"
        canonical="/terms"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          'name': 'BytesFlux Terms of Service',
          'url': 'https://bytesflux.com/terms'
        }}
      />

      <Header />

      <main className="max-w-5xl mx-auto px-4 py-16 space-y-12">
        <header className="text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-500">Terms of Service</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Agreement for working with BytesFlux</h1>
          <p className="text-gray-600 dark:text-gray-300">
            These Terms of Service (\"Terms\") govern how you access and use the BytesFlux website, digital products, and
            professional services. By engaging with us you agree to the responsibilities outlined below.
          </p>
        </header>

        <section className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/80 p-8 shadow-xl backdrop-blur">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Commitment to Compliance</h2>
          <p className="text-gray-600 dark:text-gray-300">
            BytesFlux collaborates with reputable software vendors, payment providers, and advertising networks. Maintaining
            trust requires that all clients follow ethical usage, respect intellectual property, and refrain from
            submitting harmful or illegal content. Violations may result in immediate suspension of services.
          </p>
        </section>

        {commitments.map((section) => (
          <section key={section.title} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{section.title}</h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              {section.details.map((paragraph) => (
                <li key={paragraph} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" aria-hidden />
                  <p>{paragraph}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="rounded-xl bg-blue-50 dark:bg-blue-900/30 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Updates to These Terms</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We may revise these Terms when we release new products, adjust our pricing, or update policies. Changes take
            effect upon posting to bytesflux.com/terms. If a change materially impacts an active project, we will provide
            notice and request acceptance before work continues.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
