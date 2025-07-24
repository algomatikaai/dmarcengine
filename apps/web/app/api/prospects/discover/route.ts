import { enhanceRouteHandler } from '@kit/next/routes';
import { getLogger } from '@kit/shared/logger';
import { getSupabaseServerActionClient } from '@kit/supabase/server-actions-client';

import { ProspectDiscoveryService } from '~/lib/services/prospect-discovery.service';

/**
 * @description Discover new prospects using BuiltWith API and DNS scanning
 */
export const POST = enhanceRouteHandler(
  async ({ request }) => {
    const logger = await getLogger();
    const supabase = getSupabaseServerActionClient();

    const ctx = {
      name: 'prospects.discover',
    };

    logger.info(ctx, 'Starting prospect discovery...');

    try {
      const body = await request.json();
      const { limit = 100, target_services = ['sendgrid', 'amazonses', 'mailgun'] } = body;

      const prospectService = new ProspectDiscoveryService();
      
      const prospects = await prospectService.discoverProspects({
        limit,
        targetServices: target_services,
      });

      logger.info(ctx, `Discovered ${prospects.length} prospects`);

      // Store prospects in database
      const { data, error } = await supabase
        .from('prospects')
        .upsert(prospects, { onConflict: 'domain' })
        .select();

      if (error) {
        logger.error({ ...ctx, error }, 'Failed to store prospects');
        throw error;
      }

      return new Response(
        JSON.stringify({
          success: true,
          count: prospects.length,
          prospects: data,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      logger.error({ ...ctx, error }, 'Failed to discover prospects');

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to discover prospects',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  },
  {
    auth: true,
    role: 'super-admin', // Only admins can run prospect discovery
  }
);

/**
 * @description Get discovered prospects with filtering
 */
export const GET = enhanceRouteHandler(
  async ({ request }) => {
    const logger = await getLogger();
    const supabase = getSupabaseServerActionClient();
    const url = new URL(request.url);

    const ctx = {
      name: 'prospects.list',
    };

    try {
      const limit = parseInt(url.searchParams.get('limit') || '50');
      const status = url.searchParams.get('status') || 'active';
      const minRevenueLoss = parseInt(url.searchParams.get('min_revenue_loss') || '1000');

      let query = supabase
        .from('prospects')
        .select('*')
        .eq('status', status)
        .gte('estimated_monthly_loss', minRevenueLoss)
        .order('estimated_monthly_loss', { ascending: false })
        .limit(limit);

      const { data, error } = await query;

      if (error) {
        logger.error({ ...ctx, error }, 'Failed to fetch prospects');
        throw error;
      }

      logger.info(ctx, `Retrieved ${data?.length || 0} prospects`);

      return new Response(
        JSON.stringify({
          success: true,
          prospects: data,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      logger.error({ ...ctx, error }, 'Failed to fetch prospects');

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to fetch prospects',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  },
  {
    auth: true,
  }
);