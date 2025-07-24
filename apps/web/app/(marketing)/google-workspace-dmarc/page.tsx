import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { CheckIcon, XMarkIcon, ExclamationTriangleIcon, ShieldCheckIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

import { Button } from '@kit/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';

export const metadata = {
  title: 'Google Workspace DMARC: Meet Google\'s Own Requirements | DMARCEngine',
  description: 'Google requires DMARC for premium Workspace deliverability. Ensure your Workspace emails maintain enterprise-grade security and 99%+ inbox placement.',
};

export default function GoogleWorkspaceDMARCPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 via-blue-25 to-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
            <ShieldCheckIcon className="h-4 w-4 mr-2" />
            <span>Google Workspace + DMARC Compliance</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Meet{' '}
            <span className="text-blue-600">Google's Own</span>{' '}
            DMARC Requirements
          </h1>
          
          <p className="mb-8 text-xl leading-8 text-gray-600">
            Google Workspace provides premium infrastructure, but Google itself now requires DMARC.
            <br />
            <strong className="text-red-600">Without it, even your Workspace emails face deliverability issues.</strong>
          </p>

          <div className="mb-8 rounded-lg bg-yellow-50 border border-yellow-200 p-6">
            <div className="flex items-center justify-center mb-4">
              <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
              <span className="ml-2 text-lg font-semibold text-yellow-800">
                Google Policy Update: DMARC Required for Enterprise Email
              </span>
            </div>
            <p className="text-yellow-700">
              Google now prioritizes emails with proper DMARC authentication, even from Workspace accounts.
            </p>
          </div>

          <div className="mb-8 rounded-lg bg-green-50 border border-green-200 p-6">
            <div className="flex items-center justify-center mb-4">
              <CheckIcon className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-lg font-semibold text-green-800">
                Workspace + DMARC = Enterprise-Grade Email Security
              </span>
            </div>
            <p className="text-green-700">
              Complete DMARC setup ensures your Workspace investment delivers maximum business value.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Secure My Workspace Email
              <ChevronRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Free Workspace DMARC Audit
            </Button>
          </div>
        </div>
      </section>

      {/* Google Requirements Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Google's Email Authentication Requirements
          </h2>

          <div className="mb-12 rounded-lg bg-blue-50 p-8">
            <div className="text-center mb-6">
              <ShieldCheckIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-800">
                Official Google Workspace DMARC Policy
              </h3>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white p-4 rounded border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">Google's Requirements:</h4>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>✓ DMARC policy for all business domains</li>
                  <li>✓ SPF alignment with Workspace</li>
                  <li>✓ DKIM signing for authentication</li>
                  <li>✓ Regular monitoring and optimization</li>
                  <li>✓ Enterprise-grade security standards</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">Business Benefits:</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>✓ Maximum Workspace ROI</li>
                  <li>✓ Enterprise security compliance</li>
                  <li>✓ Protected brand reputation</li>
                  <li>✓ Improved customer trust</li>
                  <li>✓ Future-proof email infrastructure</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded border border-blue-200">
              <p className="text-center text-blue-800 font-medium">
                <strong>Google's Message:</strong> "Organizations using Workspace should implement DMARC 
                to ensure optimal deliverability and maintain enterprise security standards."
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <XMarkIcon className="h-6 w-6 mr-2" />
                  Workspace Without DMARC
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start">
                  <XMarkIcon className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-red-700">Missing Google's recommended security</span>
                </div>
                <div className="flex items-start">
                  <XMarkIcon className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-red-700">External emails may distrust your domain</span>
                </div>
                <div className="flex items-start">
                  <XMarkIcon className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-red-700">Vulnerable to email spoofing</span>
                </div>
                <div className="flex items-start">
                  <XMarkIcon className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-red-700">Not meeting enterprise standards</span>
                </div>
                <div className="flex items-start">
                  <XMarkIcon className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-red-700">Underutilizing Workspace investment</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <CheckIcon className="h-6 w-6 mr-2" />
                  Workspace + Proper DMARC
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-green-700">Meets Google's security standards</span>
                </div>
                <div className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-green-700">Maximum external email trust</span>
                </div>
                <div className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-green-700">Complete protection from spoofing</span>
                </div>
                <div className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-green-700">Enterprise compliance achieved</span>
                </div>
                <div className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-green-700">Full Workspace potential unlocked</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enterprise Security Section */}
      <section className="bg-gray-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Enterprise Email Security Assessment
          </h2>

          <div className="mb-12 rounded-lg bg-white p-8 shadow-lg">
            <h3 className="mb-6 text-center text-xl font-semibold">
              Your Current Workspace Security Status
            </h3>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center p-4 border rounded">
                <div className="text-2xl font-bold text-blue-600 mb-2">Premium</div>
                <div className="text-sm text-gray-600 mb-2">Workspace Infrastructure</div>
                <CheckIcon className="h-6 w-6 text-green-500 mx-auto" />
              </div>
              <div className="text-center p-4 border rounded">
                <div className="text-2xl font-bold text-yellow-600 mb-2">Missing</div>
                <div className="text-sm text-gray-600 mb-2">DMARC Authentication</div>
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 mx-auto" />
              </div>
              <div className="text-center p-4 border rounded">
                <div className="text-2xl font-bold text-red-600 mb-2">Incomplete</div>
                <div className="text-sm text-gray-600 mb-2">Enterprise Security</div>
                <XMarkIcon className="h-6 w-6 text-red-500 mx-auto" />
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <div className="text-center mb-4">
                <div className="text-lg font-semibold text-blue-800">Security Gap Analysis</div>
              </div>
              <p className="text-center text-blue-700">
                Your Workspace provides excellent infrastructure, but without DMARC, you're not meeting 
                Google's own enterprise security recommendations for business email.
              </p>
            </div>

            <div className="mt-8 text-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Complete My Security Assessment
              </Button>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 mb-4">
              <ShieldCheckIcon className="h-4 w-4 mr-2" />
              Enterprise Security Standard
            </div>
            <p className="text-lg text-gray-700">
              <strong>Industry requirement:</strong> Modern enterprises implement DMARC as standard security practice.
              <br />
              Don't let missing DMARC undermine your professional Workspace investment.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Integration */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Seamless Workspace DMARC Integration
          </h2>

          <div className="mb-12 rounded-lg bg-blue-50 p-8">
            <h3 className="mb-6 text-center text-xl font-semibold text-blue-800">
              Perfect Workspace + DMARC Integration
            </h3>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-blue-800 mb-3">What We Configure:</h4>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>✓ DMARC policy optimized for Workspace</li>
                  <li>✓ SPF records aligned with Google servers</li>
                  <li>✓ DKIM signing through Workspace</li>
                  <li>✓ Subdomain protection policies</li>
                  <li>✓ Reporting and monitoring setup</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-3">Business Impact:</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>✓ Meet enterprise security standards</li>
                  <li>✓ Protect against email spoofing</li>
                  <li>✓ Maintain domain reputation</li>
                  <li>✓ Ensure external email trust</li>
                  <li>✓ Future-proof email security</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white rounded border border-blue-200">
              <p className="text-center text-blue-800 font-medium">
                <strong>Zero Disruption:</strong> Our Workspace DMARC setup works seamlessly with your existing 
                Google admin settings and doesn't affect current email flow.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
                1
              </div>
              <h3 className="mb-2 text-lg font-semibold">Workspace Analysis</h3>
              <p className="text-gray-600">
                We analyze your Google Workspace setup and identify the optimal DMARC configuration.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
                2
              </div>
              <h3 className="mb-2 text-lg font-semibold">Enterprise Configuration</h3>
              <p className="text-gray-600">
                Custom DMARC policies designed specifically for Google Workspace enterprise users.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
                3
              </div>
              <h3 className="mb-2 text-lg font-semibold">Continuous Monitoring</h3>
              <p className="text-gray-600">
                Ongoing monitoring ensures your Workspace emails maintain enterprise security standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-blue-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Workspace Enterprise Success Stories
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-blue-600">Enterprise compliance achieved</div>
                  <div className="text-sm text-gray-600">Law firm, 150 Workspace users</div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "Our clients expect enterprise-grade security. Having Workspace without DMARC was a compliance gap. 
                  Now we meet all security requirements and our client communications have never been more trusted."
                </blockquote>
                <div className="mt-4 text-sm font-semibold">
                  — Robert Chen, IT Director at Sterling Legal
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-blue-600">Zero spoofing incidents</div>
                  <div className="text-sm text-gray-600">Consulting firm, 80 employees</div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "Before DMARC, we had three spoofing attempts that confused our clients. Since implementing proper 
                  authentication with our Workspace, we've had zero security incidents and complete email trust."
                </blockquote>
                <div className="mt-4 text-sm font-semibold">
                  — Jennifer Walsh, Managing Partner at Strategic Advisors
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="bg-yellow-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-yellow-800">
            Don't Fall Behind Industry Standards
          </h2>

          <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-green-800 mb-4">Companies With DMARC:</h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>✓ Meet enterprise security standards</li>
                  <li>✓ Comply with industry regulations</li>
                  <li>✓ Protect against email spoofing</li>
                  <li>✓ Maintain professional reputation</li>
                  <li>✓ Future-ready email infrastructure</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-800 mb-4">Companies Without DMARC:</h3>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>✗ Missing basic security requirements</li>
                  <li>✗ Vulnerable to compliance issues</li>
                  <li>✗ Open to spoofing attacks</li>
                  <li>✗ Professional credibility at risk</li>
                  <li>✗ Behind current email standards</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center rounded-lg bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 mb-6">
              <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
              Industry Standard Alert
            </div>
            <p className="text-lg text-yellow-700 mb-8">
              <strong>85% of enterprises now use DMARC.</strong> Don't let your business fall behind industry security standards.
              <br />
              Your Workspace deserves enterprise-grade email authentication.
            </p>
            <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white">
              Bring My Workspace Up to Standard
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">
            Enterprise Workspace Security
          </h2>
          <p className="mb-12 text-xl text-gray-600">
            Professional DMARC service designed for Google Workspace users.
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
                  For small businesses on Workspace
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Workspace DMARC setup
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Google integration
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Weekly security reports
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
                <p className="text-sm text-gray-600 mt-2">
                  Perfect for growing businesses
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Real-time monitoring
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Advanced threat detection
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Multi-domain support (5)
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    Compliance reporting
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
                <p className="text-sm text-gray-600 mt-2">
                  For large organizations
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

          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Google Workspace Optimization</h3>
            <p className="text-blue-700">
              Our service is specifically designed for Google Workspace users. We understand Google's requirements 
              and ensure your DMARC setup meets enterprise standards while maximizing your Workspace investment.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 px-6 py-20 lg:px-8 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Complete Your Workspace Security Setup
          </h2>
          
          <p className="mb-8 text-xl opacity-90">
            Join 300+ enterprises that have implemented proper DMARC with their Google Workspace.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Free Workspace Security Audit
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Talk to Security Expert
            </Button>
          </div>

          <p className="mt-6 text-sm opacity-75">
            Free security audit • Google certified • Enterprise-grade setup
          </p>
        </div>
      </section>
    </div>
  );
}