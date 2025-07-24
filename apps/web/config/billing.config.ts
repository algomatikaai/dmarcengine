/**
 * DMARCEngine Billing Configuration
 * 3-tier pricing focused on email revenue recovery and DMARC protection
 */
import { BillingProviderSchema, createBillingSchema } from '@kit/billing';

// The billing provider to use - Stripe for DMARCEngine
const provider = BillingProviderSchema.parse(
  process.env.NEXT_PUBLIC_BILLING_PROVIDER,
);

export default createBillingSchema({
  provider,
  products: [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Essential DMARC protection for growing businesses',
      currency: 'USD',
      badge: 'Essential',
      plans: [
        {
          name: 'Starter Monthly',
          id: 'starter-monthly',
          paymentType: 'recurring',
          interval: 'month',
          lineItems: [
            {
              id: 'price_starter_monthly',
              name: 'Starter Plan',
              cost: 79,
              type: 'flat' as const,
            },
          ],
        },
        {
          name: 'Starter Yearly',
          id: 'starter-yearly',
          paymentType: 'recurring',
          interval: 'year',
          lineItems: [
            {
              id: 'price_starter_yearly',
              name: 'Starter Plan',
              cost: 790, // 2 months free (10x monthly)
              type: 'flat' as const,
            },
          ],
        },
      ],
      features: [
        'Basic DMARC monitoring',
        'Weekly email reports',
        'Email failure alerts',
        'Self-service setup wizard',
        'Single domain support',
        'Email support'
      ],
    },
    {
      id: 'professional',
      name: 'Professional',
      badge: 'Most Popular',
      highlighted: true,
      description: 'Complete email security with revenue impact tracking',
      currency: 'USD',
      plans: [
        {
          name: 'Professional Monthly',
          id: 'professional-monthly',
          paymentType: 'recurring',
          interval: 'month',
          lineItems: [
            {
              id: 'price_professional_monthly',
              name: 'Professional Plan',
              cost: 149,
              type: 'flat',
            },
          ],
        },
        {
          name: 'Professional Yearly',
          id: 'professional-yearly',
          paymentType: 'recurring',
          interval: 'year',
          lineItems: [
            {
              id: 'price_professional_yearly',
              name: 'Professional Plan',
              cost: 1490, // 2 months free
              type: 'flat',
            },
          ],
        },
      ],
      features: [
        'Real-time DMARC monitoring',
        'Revenue loss tracking & alerts',
        'Competitive deliverability analysis',
        'Advanced threat intelligence',
        'Up to 5 domains',
        'Priority support',
        'API access',
        'Custom integrations'
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Advanced email security for large organizations',
      currency: 'USD',
      badge: 'Advanced',
      plans: [
        {
          name: 'Enterprise Monthly',
          id: 'enterprise-monthly',
          paymentType: 'recurring',
          interval: 'month',
          lineItems: [
            {
              id: 'price_enterprise_monthly',
              name: 'Enterprise Plan',
              cost: 299,
              type: 'flat',
            },
          ],
        },
        {
          name: 'Enterprise Yearly',
          id: 'enterprise-yearly',
          paymentType: 'recurring',
          interval: 'year',
          lineItems: [
            {
              id: 'price_enterprise_yearly',
              name: 'Enterprise Plan',
              cost: 2990, // 2 months free
              type: 'flat',
            },
          ],
        },
      ],
      features: [
        'Unlimited domains',
        'Team collaboration & permissions',
        'Advanced analytics & reporting',
        'White-label options',
        'Dedicated account manager',
        'SLA guarantee',
        'Custom integrations',
        'Phone support',
        'Quarterly business reviews'
      ],
    },
  ],
});
