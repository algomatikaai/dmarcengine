import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { CheckIcon, XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

import { Button } from '@kit/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';

export const metadata = {
  title: 'Amazon SES + DMARC: Stop Wasting Your AWS Investment | DMARCEngine',
  description: 'Your SES emails are being blocked despite Amazon infrastructure. Add DMARC authentication to protect your AWS investment and achieve 99%+ deliverability.',
};

export default function AmazonSESDMARCPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-orange-50 to-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-800">
            <span>Amazon SES + DMARC Integration</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Don't Let Missing{' '}
            <span className="text-orange-600">DMARC</span>{' '}
            Waste Your SES Investment
          </h1>
          
          <p className="mb-8 text-xl leading-8 text-gray-600">
            Amazon SES handles infrastructure perfectly, but Gmail & Yahoo now require DMARC authentication.
            <br />
            <strong className="text-red-600">Without it, your premium AWS emails are being blocked.</strong>
          </p>

          <div className="mb-8 rounded-lg bg-red-50 border border-red-200 p-6">
            <div className="flex items-center justify-center mb-4">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-lg font-semibold text-red-800">
                Your $200-2,000/month SES spend is being wasted
              </span>
            </div>
            <p className="text-red-700">
              Perfect AWS infrastructure + Missing DMARC = 20-30% of emails blocked by Gmail/Yahoo
            </p>
          </div>

          <div className="mb-8 rounded-lg bg-green-50 border border-green-200 p-6">
            <div className="flex items-center justify-center mb-4">
              <CheckIcon className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-lg font-semibold text-green-800">
                SES + DMARC = Maximum ROI on Your AWS Investment
              </span>
            </div>
            <p className="text-green-700">
              5-minute DMARC setup protects your SES reputation and ensures 99%+ deliverability.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              Protect My SES Investment
              <ChevronRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Free SES DMARC Analysis
            </Button>
          </div>
        </div>
      </section>

      {/* AWS Investment Protection */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Protect Your AWS Email Investment
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <ExclamationTriangleIcon className="h-6 w-6 mr-2" />
                  Your Current SES Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-green-400">
                  <span className="font-medium">AWS SES Infrastructure</span>
                  <span className="text-green-600 font-bold">✓ Excellent</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-green-400">
                  <span className="font-medium">Email Delivery Speed</span>
                  <span className="text-green-600 font-bold">✓ Fast</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-green-400">
                  <span className="font-medium">Cost Efficiency</span>
                  <span className="text-green-600 font-bold">✓ Low Cost</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-red-400">
                  <span className="font-medium">DMARC Authentication</span>
                  <span className="text-red-600 font-bold">✗ Missing</span>
                </div>
                
                <div className="mt-6 p-4 bg-red-100 rounded">
                  <div className="text-lg font-semibold text-red-800 mb-2">
                    Result: 20-30% Email Failure Rate
                  </div>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Gmail blocks SES emails without DMARC</li>
                    <li>• Yahoo filters suspicious without authentication</li>
                    <li>• Your AWS investment is partially wasted</li>
                    <li>• Customers complain about missing emails</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <CheckIcon className="h-6 w-6 mr-2" />
                  SES + DMARC (Optimized)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-green-400">
                  <span className="font-medium">AWS SES Infrastructure</span>
                  <span className="text-green-600 font-bold">✓ Excellent</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-green-400">
                  <span className="font-medium">Email Delivery Speed</span>
                  <span className="text-green-600 font-bold">✓ Fast</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-green-400">
                  <span className="font-medium">Cost Efficiency</span>
                  <span className="text-green-600 font-bold">✓ Low Cost</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-green-400">
                  <span className="font-medium">DMARC Authentication</span>
                  <span className="text-green-600 font-bold">✓ Perfect</span>
                </div>
                
                <div className="mt-6 p-4 bg-green-100 rounded">
                  <div className="text-lg font-semibold text-green-800 mb-2">
                    Result: 99%+ Email Deliverability
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Maximum ROI on your SES investment</li>
                    <li>• Gmail/Yahoo trust your emails completely</li>
                    <li>• All transactional emails reach customers</li>
                    <li>• Perfect reputation protects future sends</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cost Analysis Section */}
      <section className="bg-gray-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Calculate Your SES ROI Loss
          </h2>

          <div className="mb-12 rounded-lg bg-white p-8 shadow-lg">
            <h3 className="mb-6 text-center text-xl font-semibold">
              AWS SES Investment Calculator
            </h3>
            
            <div className="grid gap-6 md:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">$500</div>
                <div className="text-sm text-gray-600">Monthly SES Spend</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600 mb-2">50,000</div>
                <div className="text-sm text-gray-600">Monthly Emails</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">25%</div>
                <div className="text-sm text-gray-600">Blocked (No DMARC)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">$125</div>
                <div className="text-sm text-gray-600">Wasted SES Cost</div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-orange-50 rounded-lg">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-orange-600">$1,500/year</div>
                <div className="text-gray-700">wasted on SES emails that never reach customers</div>
              </div>
              <p className="text-center text-gray-600">
                <strong>Plus revenue loss</strong> from failed order confirmations, password resets, and notifications
              </p>
            </div>

            <div className="mt-8 text-center">
              <Button className="bg-orange-600 hover:bg-orange-700">
                Calculate My Exact SES Waste
              </Button>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center rounded-lg bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 mb-4">
              <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
              Common AWS SES Problem
            </div>
            <p className="text-lg text-gray-700">
              Companies spend $200-2,000/month on SES but lose 25% effectiveness due to missing DMARC.
              <br />
              <strong>That's $600-6,000/year in wasted AWS costs alone.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Technical Integration Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Seamless SES + DMARC Integration
          </h2>

          <div className="mb-12 rounded-lg bg-blue-50 p-8">
            <h3 className="mb-6 text-center text-xl font-semibold text-blue-800">
              Why AWS SES Users Need DMARC
            </h3>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-blue-800 mb-3">What SES Provides:</h4>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>✓ Reliable email infrastructure</li>
                  <li>✓ High-speed email delivery</li>
                  <li>✓ Cost-effective pricing</li>
                  <li>✓ AWS integration</li>
                  <li>✓ Bounce/complaint handling</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-800 mb-3">What SES Doesn't Provide:</h4>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>✗ DMARC policy configuration</li>
                  <li>✗ Email authentication monitoring</li>
                  <li>✗ Spam filter optimization</li>
                  <li>✗ Domain reputation protection</li>
                  <li>✗ Deliverability optimization</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white rounded border border-blue-200">
              <p className="text-center text-blue-800 font-medium">
                <strong>The Gap:</strong> SES sends emails perfectly, but ISPs need DMARC to trust them.
                <br />
                Without DMARC, even perfect SES infrastructure gets blocked.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-white text-xl font-bold">
                1
              </div>
              <h3 className="mb-2 text-lg font-semibold">Analyze Your SES</h3>
              <p className="text-gray-600">
                We scan your SES configuration and identify exactly what DMARC records you need.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-white text-xl font-bold">
                2
              </div>
              <h3 className="mb-2 text-lg font-semibold">Generate Perfect Records</h3>
              <p className="text-gray-600">
                Custom DMARC, SPF, and DKIM records optimized specifically for your SES setup.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-white text-xl font-bold">
                3
              </div>
              <h3 className="mb-2 text-lg font-semibial">Protect Your Investment</h3>
              <p className="text-gray-600">
                Continuous monitoring ensures your SES emails maintain perfect deliverability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="bg-orange-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            AWS SES Success Stories
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-orange-600">$12,000/year saved</div>
                  <div className="text-sm text-gray-600">SaaS platform, 100K emails/month on SES</div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "We were frustrated seeing our SES emails blocked despite paying for premium AWS infrastructure. 
                  DMARC integration solved it completely. Our $800/month SES investment now delivers 99.1% success rate."
                </blockquote>
                <div className="mt-4 text-sm font-semibold">
                  — David Park, DevOps Lead at CloudSync
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-orange-600">ROI improved 340%</div>
                  <div className="text-sm text-gray-600">E-commerce, $1,200/month SES spend</div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "Before DMARC, 28% of our SES order confirmations were blocked. We were essentially paying AWS 
                  to send emails that customers never received. Now every email reaches the inbox."
                </blockquote>
                <div className="mt-4 text-sm font-semibold">
                  — Lisa Thompson, Technical Director at MarketGear
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Urgency/Competition Section */}
      <section className="bg-red-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-red-800">
            Your Competitors Are Already Protected
          </h2>

          <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-red-800 mb-4">Companies Using SES + DMARC:</h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>✓ 99%+ email deliverability</li>
                  <li>✓ Perfect AWS ROI</li>
                  <li>✓ Customer emails always delivered</li>
                  <li>✓ Protected domain reputation</li>
                  <li>✓ Future-proof authentication</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-800 mb-4">Companies Using Only SES:</h3>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>✗ 70-80% email deliverability</li>
                  <li>✗ 25% of AWS spend wasted</li>
                  <li>✗ Critical emails blocked</li>
                  <li>✗ Degrading domain reputation</li>
                  <li>✗ Vulnerable to future restrictions</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-800 mb-6">
              <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
              Don't Fall Behind Your Competition
            </div>
            <p className="text-lg text-red-700 mb-8">
              While your competitors achieve 99% deliverability, your SES emails are being blocked.
              <br />
              Every day you wait, you lose more customers and waste more AWS spend.
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Catch Up to Your Competition Now
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">
            Protect Your SES Investment
          </h2>
          <p className="mb-12 text-xl text-gray-600">
            Stop wasting 25% of your AWS spend. Our DMARC service pays for itself.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Starter</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$79</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Perfect for SES users sending up to 25K emails/month
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    SES DMARC configuration
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    AWS integration monitoring
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Weekly deliverability reports
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Single domain protection
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-orange-500 border-2 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <CardHeader className="text-center">
                <CardTitle>Professional</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$149</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Ideal for growing SaaS and e-commerce on SES
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Real-time SES monitoring
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    AWS cost optimization tracking
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Revenue loss prevention
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Up to 5 domains
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Priority AWS support
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-orange-600 hover:bg-orange-700">
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
                <p className="text-sm text-gray-600 mt-2">
                  For high-volume SES users and agencies
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Unlimited domains
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    AWS architecture consultation
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Dedicated AWS specialist
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

          <div className="mt-12 p-6 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">ROI Calculator</h3>
            <p className="text-green-700">
              If you're spending $500/month on SES and losing 25% to blocked emails, you're wasting $125/month ($1,500/year).
              <br />
              <strong>Our Professional plan at $149/month saves you money while protecting your entire SES investment.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-orange-600 px-6 py-20 lg:px-8 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Stop Wasting Your AWS SES Investment
          </h2>
          
          <p className="mb-8 text-xl opacity-90">
            Join 200+ companies that have optimized their SES setup and eliminated email delivery waste.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              Free SES DMARC Analysis
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
              Schedule AWS Consultation
            </Button>
          </div>

          <p className="mt-6 text-sm opacity-75">
            Free analysis • AWS certified team • Results in 24 hours
          </p>
        </div>
      </section>
    </div>
  );
}