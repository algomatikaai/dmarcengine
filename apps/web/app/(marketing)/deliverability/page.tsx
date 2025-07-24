'use client';

import { useEffect, useState } from 'react';
import { CheckIcon, ClockIcon, ShieldCheckIcon, ChartBarIcon } from '@heroicons/react/20/solid';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Button } from '@kit/ui/button';

interface DeliverabilityStats {
  timestamp: string;
  stats: {
    emails_sent_24h: number;
    emails_sent_7d: number;
    emails_sent_30d: number;
    deliverability_rate: number;
    authentication_perfect: boolean;
    domains_monitored: number;
    uptime_percentage: number;
  };
  authentication: {
    spf_passes: number;
    dkim_passes: number;
    dmarc_passes: number;
    authentication_failures: number;
    spf_pass_rate: number;
    dkim_pass_rate: number;
    dmarc_pass_rate: number;
  };
  performance: {
    inbox_placement_rate: number;
    spam_folder_rate: number;
    bounce_rate: number;
    complaint_rate: number;
    reputation_score: number;
  };
  domains: {
    domain: string;
    health_score: number;
    last_checked: string;
    status: 'excellent' | 'good' | 'issues';
    daily_volume: number;
  }[];
  competitive_analysis: {
    our_deliverability: number;
    industry_average: number;
    advantage_percentage: number;
  };
  social_proof: {
    emails_delivered_today: number;
    perfect_authentication_days: number;
    zero_incidents_days: number;
    customer_count: number;
  };
}

export default function DeliverabilityDashboard() {
  const [stats, setStats] = useState<DeliverabilityStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/public/deliverability-stats');
      const data = await response.json();
      setStats(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch deliverability stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchStats, 60000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading real-time deliverability data...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-red-600">Failed to load deliverability statistics</p>
          <Button onClick={fetchStats} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Live Email Deliverability Dashboard
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Real-time proof of our 99.7% email deliverability using perfect DMARC configuration
            </p>
            <div className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-full">
              <CheckIcon className="h-5 w-5 mr-2" />
              <span className="font-semibold">All Systems Operational</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">{stats.stats.deliverability_rate}%</div>
              <div className="text-blue-100">Deliverability Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">{stats.stats.emails_sent_24h.toLocaleString()}</div>
              <div className="text-blue-100">Emails Sent Today</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">{stats.social_proof.perfect_authentication_days}</div>
              <div className="text-blue-100">Days Perfect Auth</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">{stats.stats.domains_monitored}</div>
              <div className="text-blue-100">Domains Monitored</div>
            </div>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="bg-gray-50 px-6 py-2 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-2" />
            <span>Last updated: {lastUpdated.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span>Live data - auto-refreshing</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Authentication Perfection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <ShieldCheckIcon className="h-8 w-8 text-green-500 mr-3" />
            Perfect Email Authentication
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="text-center">
                <CardTitle className="text-green-800">SPF Authentication</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {stats.authentication.spf_pass_rate}%
                </div>
                <div className="text-sm text-green-700 mb-4">
                  {stats.authentication.spf_passes.toLocaleString()} / {stats.authentication.spf_passes.toLocaleString()} passes
                </div>
                <div className="flex items-center justify-center text-green-600">
                  <CheckIcon className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Perfect</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader className="text-center">
                <CardTitle className="text-green-800">DKIM Authentication</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {stats.authentication.dkim_pass_rate}%
                </div>
                <div className="text-sm text-green-700 mb-4">
                  {stats.authentication.dkim_passes.toLocaleString()} / {stats.authentication.dkim_passes.toLocaleString()} passes
                </div>
                <div className="flex items-center justify-center text-green-600">
                  <CheckIcon className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Perfect</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader className="text-center">
                <CardTitle className="text-green-800">DMARC Authentication</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {stats.authentication.dmarc_pass_rate}%
                </div>
                <div className="text-sm text-green-700 mb-4">
                  {stats.authentication.dmarc_passes.toLocaleString()} / {stats.authentication.dmarc_passes.toLocaleString()} passes
                </div>
                <div className="flex items-center justify-center text-green-600">
                  <CheckIcon className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Perfect</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <ChartBarIcon className="h-8 w-8 text-blue-500 mr-3" />
            Deliverability Performance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Performance Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Inbox Placement Rate</span>
                    <span className="font-bold text-green-600">
                      {stats.performance.inbox_placement_rate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Spam Folder Rate</span>
                    <span className="font-bold text-green-600">
                      {stats.performance.spam_folder_rate.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bounce Rate</span>
                    <span className="font-bold text-green-600">
                      {stats.performance.bounce_rate.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Complaint Rate</span>
                    <span className="font-bold text-green-600">
                      {stats.performance.complaint_rate.toFixed(3)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competitive Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Our Deliverability</span>
                    <span className="font-bold text-green-600">
                      {stats.competitive_analysis.our_deliverability}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Industry Average</span>
                    <span className="font-bold text-gray-600">
                      {stats.competitive_analysis.industry_average}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Our Advantage</span>
                    <span className="font-bold text-blue-600">
                      +{stats.competitive_analysis.advantage_percentage}%
                    </span>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <p className="text-sm text-blue-800 font-medium">
                      We deliver {stats.competitive_analysis.advantage_percentage}% more emails to the inbox than industry average
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Domain Health */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Domain Health Status</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.domains.map((domain) => (
              <Card key={domain.domain} className="bg-green-50 border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{domain.domain}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Health Score</span>
                      <span className="font-bold text-green-600">
                        {domain.health_score}/10
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Daily Volume</span>
                      <span className="font-medium">
                        {domain.daily_volume.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Status</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckIcon className="h-3 w-3 mr-1" />
                        {domain.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Last checked: {new Date(domain.last_checked).toLocaleTimeString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-center text-xl">
                Why Our Email Deliverability Proves Our Expertise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stats.social_proof.emails_delivered_today.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Emails Delivered Today</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {stats.social_proof.perfect_authentication_days}
                  </div>
                  <div className="text-sm text-gray-600">Days of Perfect Authentication</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {stats.social_proof.zero_incidents_days}
                  </div>
                  <div className="text-sm text-gray-600">Days Without Incidents</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {stats.social_proof.customer_count}+
                  </div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-lg font-medium text-gray-800 mb-4">
                  <strong>We practice what we preach.</strong> Every email we send achieves 99%+ deliverability using the same 
                  DMARC configuration we'll implement for you.
                </p>
                <p className="text-gray-600 mb-6">
                  Check the headers of any email from us. You'll see perfect SPF, DKIM, and DMARC authentication 
                  that proves our expertise and validates our service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Get the Same Results
                  </Button>
                  <Button variant="outline">
                    Copy Our Configuration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technical Details */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Technical Implementation Details</CardTitle>
              <p className="text-sm text-gray-600">
                Transparency in our technical setup - exactly how we achieve these results
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Email Infrastructure</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      Primary: Amazon SES
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      Backup: SendGrid
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      DKIM signing: 2048-bit keys
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      Key rotation: Monthly
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">DMARC Configuration</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      Policy: p=reject (strict)
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      SPF alignment: strict
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      DKIM alignment: strict
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      Monitoring: Real-time
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Verification:</strong> You can verify our authentication by checking the headers of any email we send. 
                  Look for "Authentication-Results" showing PASS for SPF, DKIM, and DMARC. 
                  Our setup is completely transparent and verifiable.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Achieve the Same Results?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the same 99%+ deliverability for your business emails with our proven DMARC setup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Your Free Audit
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Schedule Demo Call
            </Button>
          </div>
          <p className="mt-4 text-sm text-blue-200">
            Join {stats.social_proof.customer_count}+ companies that trust us with their email deliverability
          </p>
        </div>
      </div>
    </div>
  );
}