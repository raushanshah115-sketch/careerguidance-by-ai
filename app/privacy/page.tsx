import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-600">Last updated: January 1, 2024</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p>
              At AI Career Guidance ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the
              security of your personal information. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our platform and services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
            <p className="mb-4">We may collect the following personal information:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Name, email address, and contact information</li>
              <li>Profile information including bio, location, and professional links</li>
              <li>Career assessment responses and quiz results</li>
              <li>Chat conversations with our AI mentor</li>
              <li>Uploaded documents for verification purposes</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
            <p className="mb-4">We automatically collect certain information when you use our platform:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, features used)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide personalized career recommendations and guidance</li>
              <li>Improve our AI algorithms and platform functionality</li>
              <li>Communicate with you about your account and our services</li>
              <li>Verify documents using blockchain technology</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Comply with legal obligations and protect our rights</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
            <p className="mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information
              in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>
                <strong>Service Providers:</strong> With trusted third-party service providers who assist in operating
                our platform
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to protect our rights and safety
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets
              </li>
              <li>
                <strong>Consent:</strong> With your explicit consent for specific purposes
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Secure data storage and backup procedures</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
            <p className="mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>
                <strong>Access:</strong> Request access to your personal information
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal information
              </li>
              <li>
                <strong>Portability:</strong> Request a copy of your data in a portable format
              </li>
              <li>
                <strong>Opt-out:</strong> Unsubscribe from marketing communications
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar technologies to enhance your experience on our platform. You can control cookie
              settings through your browser preferences. However, disabling cookies may affect the functionality of our
              services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal
              information from children under 13. If we become aware that we have collected such information, we will
              take steps to delete it promptly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure that such
              transfers comply with applicable data protection laws and implement appropriate safeguards to protect your
              information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting
              the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our
              services after such changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <ul className="list-none mb-6">
              <li className="mb-2">
                <strong>Email:</strong> privacy@aicareer.com
              </li>
              <li className="mb-2">
                <strong>Phone:</strong> +1 (555) 123-4567
              </li>
              <li className="mb-2">
                <strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
