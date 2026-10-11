import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { AuroraBackground } from '@/components/AuroraBackground';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and data handling practices for ElevaOps.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#fdfdfd] dark:bg-[#020617] text-[#1d1d1f] dark:text-white selection:bg-[#007AFF] selection:text-white min-h-screen relative overflow-clip">
      
      {/* Global AI Aurora Background */}
      <AuroraBackground noiseClassName="opacity-[0.25] dark:opacity-[0.15] mix-blend-overlay" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-40 pb-32 px-6 md:px-12 max-w-4xl mx-auto w-full">
           <div className="mb-16">
             <Link href="/" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-[#007AFF] hover:text-[#005bb5] transition-colors mb-8">
               &larr; Back to Home
             </Link>
             <h1 className="font-sans text-[clamp(2.5rem,5vw,4.5rem)] font-semibold tracking-tighter text-[#1d1d1f] dark:text-white leading-[1.05] mb-4">Privacy Policy</h1>
             <p className="text-sm md:text-base text-black/50 dark:text-white/50 font-medium">Effective Date: August 2026</p>
           </div>
           
           <div className="prose prose-lg dark:prose-invert max-w-none text-black/70 dark:text-white/70 
                           prose-headings:text-[#1d1d1f] dark:prose-headings:text-white prose-headings:font-semibold prose-headings:tracking-tight 
                           prose-a:text-[#007AFF] hover:prose-a:text-[#005bb5] prose-a:transition-colors
                           prose-p:leading-relaxed prose-li:leading-relaxed">
              
              <p>
                At <strong>ElevaOps</strong>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website (elevaops.com) or engage with our digital services. By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>

              <h2>1. Information We Collect</h2>
              <p>We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services. The types of personal information we collect may include:</p>
              <ul>
                <li><strong>Contact Data:</strong> Name, email address, phone number, and company name.</li>
                <li><strong>Communication Data:</strong> Any information you share with us through contact forms, emails, or direct messages.</li>
                <li><strong>Usage and Technical Data:</strong> We automatically collect certain information when you visit, use, or navigate the site. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, and information about how and when you use our site.</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent. Specifically, we use the information we collect or receive to:</p>
              <ul>
                <li><strong>Provide and facilitate delivery of services.</strong></li>
                <li><strong>Respond to user inquiries and offer support.</strong></li>
                <li><strong>Send administrative information</strong> such as details about our products, services, and changes to our terms, conditions, and policies.</li>
                <li><strong>Improve our website and services</strong> through data analysis, identifying usage trends, and determining the effectiveness of our promotional campaigns.</li>
                <li><strong>Send marketing and promotional communications</strong> (if you have opted in). You can opt out of our marketing emails at any time.</li>
              </ul>

              <h2>3. How We Share Your Information</h2>
              <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data with trusted third-party service providers (such as hosting, analytics, or email delivery services like Vercel and Resend) strictly to facilitate our own operations. We do not sell your personal data to third parties.</p>
              
              <h2>4. Data Retention and Security</h2>
              <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law. We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>

              <h2>5. Your Privacy Rights</h2>
              <p>Depending on your location (such as the GDPR in Europe), you may have specific rights regarding your personal data. These rights may include the ability to:</p>
              <ul>
                 <li>Request access and obtain a copy of your personal information.</li>
                 <li>Request rectification or erasure of your personal data.</li>
                 <li>Restrict the processing of your personal information.</li>
                 <li>Object to the processing of your data for specific purposes.</li>
              </ul>
              <p>If you would like to exercise any of these rights, please contact us using the details provided below. We will consider and act upon any request in accordance with applicable data protection laws.</p>

              <h2>6. Changes to This Notice</h2>
              <p>We may update this privacy notice from time to time. The updated version will be indicated by an updated &ldquo;Effective Date&rdquo; and will be effective as soon as it is accessible. We encourage you to review this notice frequently to be informed of how we are protecting your information.</p>

              <h2>7. Contact Us</h2>
              <p>If you have questions or comments about this notice, or if you wish to exercise your data privacy rights, you may email us at <a href="mailto:contact@elevaops.com">contact@elevaops.com</a>.</p>
              
           </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
