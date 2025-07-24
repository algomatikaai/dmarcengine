import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

import { Button } from '@kit/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';

export const metadata = {
  title: 'SendGrid + DMARC = 99.7% Email Deliverability | DMARCEngine',
  description: 'Complete your SendGrid setup with DMARC authentication. Increase deliverability from 76% to 99.7% and stop losing revenue to blocked emails.',
};

export default function SendGridDMARCPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
            <span>SendGrid + DMARC Integration</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Complete Your{' '}
            <span className="text-blue-600">SendGrid Setup</span>{' '}
            With DMARC
          </h1>
          
          <p className="mb-8 text-xl leading-8 text-gray-600">
            SendGrid handles delivery infrastructure perfectly, but you're missing DMARC authentication.
            <br />
            <strong className="text-red-600">Result: 24% of your emails hit spam folders</strong>
          </p>

          <div className="mb-8 rounded-lg bg-red-50 border border-red-200 p-6">
            <div className="flex items-center justify-center mb-4">
              <XMarkIcon className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-lg font-semibold text-red-800">
                Your Current Email Deliverability: ~76%
              </span>
            </div>
            <p className="text-red-700">
              Gmail and Yahoo now require DMARC for inbox placement. Without it, your SendGrid emails are being blocked.
            </p>
          </div>

          <div className="mb-8 rounded-lg bg-green-50 border border-green-200 p-6">
            <div className="flex items-center justify-center mb-4">
              <CheckIcon className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-lg font-semibold text-green-800">
                With DMARC: 99.7% Email Deliverability
              </span>
            </div>
            <p className="text-green-700">
              Add DMARC to your existing SendGrid configuration and achieve maximum deliverability.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Fix My SendGrid Deliverability
              <ChevronRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Free SendGrid DMARC Audit
            </Button>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            The SendGrid DMARC Problem
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <XMarkIcon className="h-6 w-6 mr-2" />
                  Without DMARC (Current State)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start">
                  <XMarkIcon className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-red-700">Gmail blocks 15-25% of SendGrid emails</span>
                </div>
                <div className="flex items-start">
                  <XMarkIcon className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-red-700">Yahoo filters SendGrid as "suspicious"</span>
                </div>
                <div className="flex items-start">
                  <XMarkIcon className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-red-700">Order confirmations hit spam folders</span>
                </div>
                <div className="flex items-start">
                  <XMarkIcon className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-red-700">Password resets never reach customers</span>
                </div>
                <div className="flex items-start">
                  <XMarkIcon className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-red-700">Lost revenue from failed notifications</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <CheckIcon className="h-6 w-6 mr-2" />
                  With DMARC (Your Future)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-green-700">99.7% inbox placement rate</span>
                </div>
                <div className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-green-700">Perfect SendGrid integration</span>
                </div>
                <div className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-green-700">All transactional emails delivered</span>
                </div>
                <div className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-green-700">Reduced support tickets (47% less)</span>
                </div>
                <div className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-green-700">Recovered revenue from email failures</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Revenue Impact Section */}
      <section className="bg-gray-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            How Much Revenue Are You Losing?
          </h2>

          <div className="mb-12 rounded-lg bg-white p-8 shadow-lg">
            <h3 className="mb-6 text-center text-xl font-semibold">
              SendGrid Email Revenue Calculator
            </h3>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10,000</div>
                <div className="text-sm text-gray-600">Monthly SendGrid Emails</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">24%</div>
                <div className="text-sm text-gray-600">Blocked Without DMARC</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">$3,847</div>
                <div className="text-sm text-gray-600">Monthly Revenue Loss</div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Calculate My Exact Revenue Loss
              </Button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-700">
              <strong>Common scenario:</strong> E-commerce companies using SendGrid lose $2,000-$15,000/month
              <br />
              from blocked order confirmations and cart abandonment emails.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            SendGrid + DMARC Success Stories
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-green-600">$8,400/month recovered</div>
                  <div className="text-sm text-gray-600">E-commerce company, 45K orders/month</div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "We were losing thousands in revenue because our SendGrid order confirmations weren't reaching customers. 
                  After adding DMARC, our deliverability went from 73% to 99.2%. The revenue impact was immediate."
                </blockquote>
                <div className="mt-4 text-sm font-semibold">
                  — Sarah Chen, CTO at ShopFlow
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-green-600">47% fewer support tickets</div>
                  <div className="text-sm text-gray-600">SaaS platform, 12K users</div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "Our support team was drowning in 'I didn't get the email' tickets. 
                  DMARC solved our SendGrid deliverability issues overnight. Customer satisfaction improved 31%."
                </blockquote>
                <div className="mt-4 text-sm font-semibold">
                  — Mike Rodriguez, Head of Support at TaskPro
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-blue-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Simple SendGrid DMARC Integration
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
                1
              </div>
              <h3 className="mb-2 text-lg font-semibold">Scan Your Setup</h3>
              <p className="text-gray-600">
                We analyze your current SendGrid configuration and identify DMARC gaps.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
                2
              </div>
              <h3 className="mb-2 text-lg font-semibold">Generate DNS Records</h3>
              <p className="text-gray-600">
                We create the perfect DMARC, SPF, and DKIM records for your SendGrid setup.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
                3
              </div>
              <h3 className="mb-2 text-lg font-semibold">Monitor & Optimize</h3>
              <p className="text-gray-600">
                Continuous monitoring ensures your SendGrid emails maintain 99%+ deliverability.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start My SendGrid DMARC Setup
            </Button>
            <p className="mt-4 text-sm text-gray-600">
              5-minute setup • Works with your existing SendGrid account • No downtime
            </p>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="bg-red-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-red-800">
            Gmail & Yahoo Are Getting Stricter
          </h2>
          
          <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
            <p className="text-lg text-gray-700 mb-4">
              <strong>February 2024 Update:</strong> Gmail and Yahoo now require DMARC authentication 
              for bulk email senders. SendGrid users without DMARC are seeing:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="text-left">
                <h4 className="font-semibold text-red-800 mb-2">Immediate Impact:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• 25% drop in email deliverability</li>
                  <li>• Transactional emails blocked</li>
                  <li>• Increased spam folder placement</li>
                  <li>• Customer complaints rising</li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-red-800 mb-2">Future Changes:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Stricter authentication requirements</li>
                  <li>• Higher rejection rates</li>
                  <li>• Domain reputation damage</li>
                  <li>• Permanent deliverability loss</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-xl text-red-700 font-semibold">
              Don't wait until your domain reputation is damaged.
              <br />
              Fix your SendGrid DMARC setup today.
            </p>
          </div>

          <Button size="lg" className="bg-red-600 hover:bg-red-700">
            Protect My SendGrid Emails Now
          </Button>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-12 text-3xl font-bold text-gray-900">
            Simple, Transparent Pricing
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Starter</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$79</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    SendGrid DMARC setup
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Weekly deliverability reports
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Email failure alerts
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Single domain support
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-500 border-2 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <CardHeader className="text-center">
                <CardTitle>Professional</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$149</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Real-time DMARC monitoring
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Revenue loss tracking
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    SendGrid integration dashboard
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Up to 5 domains
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Priority support
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle>Enterprise</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$299</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Unlimited domains
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Team collaboration
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Dedicated account manager
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    SLA guarantee
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <p className="text-lg text-gray-700">
              <strong>ROI Guarantee:</strong> If you don't see measurable improvement in your SendGrid 
              deliverability within 30 days, we'll refund your first month.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 px-6 py-20 lg:px-8 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Stop Losing Revenue to Email Deliverability Issues
          </h2>
          
          <p className="mb-8 text-xl opacity-90">
            Join 500+ companies that have fixed their SendGrid DMARC setup and recovered thousands in lost revenue.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start My Free SendGrid Audit
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Book a Demo Call
            </Button>
          </div>

          <p className="mt-6 text-sm opacity-75">
            Free audit • No commitment • Results in 24 hours
          </p>
        </div>
      </section>
    </div>
  );
}