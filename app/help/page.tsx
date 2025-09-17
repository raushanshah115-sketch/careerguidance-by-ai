import Link from "next/link"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, HelpCircle, Book, MessageCircle, Mail } from "lucide-react"

export default function HelpPage() {
  const faqData = [
    {
      question: "How accurate are the career recommendations?",
      answer:
        "Our AI-powered career recommendations are based on comprehensive personality assessments, skills analysis, and market data. While we strive for high accuracy, we recommend using our suggestions as guidance alongside your own research and professional consultation.",
    },
    {
      question: "How long does the career assessment take?",
      answer:
        "The comprehensive career assessment typically takes 15-25 minutes to complete. It includes 100-150 questions across multiple domains including personality, interests, skills, and career preferences.",
    },
    {
      question: "Is my personal data secure?",
      answer:
        "Yes, we take data security very seriously. All personal information is encrypted and stored securely. We never share your personal data with third parties without your explicit consent. You can review our full privacy policy for more details.",
    },
    {
      question: "Can I retake the career assessment?",
      answer:
        "Yes, you can retake the assessment at any time. We recommend waiting at least 3-6 months between assessments to allow for personal growth and changing circumstances. Your previous results will be saved for comparison.",
    },
    {
      question: "How does the AI mentor work?",
      answer:
        "Our AI mentor uses advanced natural language processing to provide personalized career guidance. It's trained on thousands of career counseling sessions and industry insights to offer relevant advice based on your specific situation and goals.",
    },
    {
      question: "What is document verification and why do I need it?",
      answer:
        "Document verification uses blockchain technology to create tamper-proof records of your credentials. This helps employers and institutions verify your qualifications quickly and securely, giving you a competitive advantage in the job market.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Currently, our platform is web-based and optimized for mobile browsers. We're working on dedicated mobile apps for iOS and Android, which will be available in the coming months.",
    },
    {
      question: "How much does the service cost?",
      answer:
        "We offer a free tier that includes basic career assessment and limited AI mentor interactions. Premium plans with advanced features, unlimited mentor access, and priority support start at $9.99/month.",
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer:
        "Yes, we offer a 30-day money-back guarantee for all premium subscriptions. If you're not satisfied with our service, contact our support team for a full refund within 30 days of purchase.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our support team through multiple channels: email at support@aicareer.com, live chat on our platform, or phone at +1 (555) 123-4567. We typically respond within 24 hours.",
    },
  ]

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
          <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions and get the most out of your AI Career Guidance experience.
          </p>
        </div>

        {/* Quick Help Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Book className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-lg mb-2">Getting Started</CardTitle>
              <CardDescription className="mb-4">Learn how to use our platform effectively</CardDescription>
              <Button variant="outline" size="sm">
                View Guide
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <MessageCircle className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-lg mb-2">Live Chat</CardTitle>
              <CardDescription className="mb-4">Get instant help from our support team</CardDescription>
              <Button variant="outline" size="sm">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Mail className="w-10 h-10 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-lg mb-2">Contact Us</CardTitle>
              <CardDescription className="mb-4">Send us a detailed message</CardDescription>
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  Contact Form
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Still Need Help */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h3>
          <p className="text-gray-600 mb-8">Can't find what you're looking for? Our support team is here to help.</p>
          <div className="space-x-4">
            <Link href="/contact">
              <Button>Contact Support</Button>
            </Link>
            <Button variant="outline">Schedule a Call</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
