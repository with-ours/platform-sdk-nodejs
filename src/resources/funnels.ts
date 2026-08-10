// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Funnels extends APIResource {
  /**
   * List every funnel configured on this account. Each funnel includes its step
   * configuration, funnel type, and conversion window. Funnel results are computed
   * on demand, so `status` is always `READY` and `reportDateRange` is always `null`;
   * both fields are retained for backward compatibility and should not be used to
   * decide whether results are available. Requires scope: web-analytics:view
   */
  list(options?: RequestOptions): APIPromise<FunnelListResponse> {
    return this._client.get('/rest/v1/funnels', options);
  }

  /**
   * Fetch a single funnel configuration by its id. Returns `404` when the funnel
   * does not exist or belongs to a different account. Requires scope:
   * web-analytics:view
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<FunnelRetrieveResponse> {
    return this._client.get(path`/rest/v1/funnels/${id}`, options);
  }

  /**
   * Compute funnel step analytics for a funnel over a date window. Returns per-step
   * visitor counts, conversion rates, drop-off rates, average time to next step, and
   * sample session IDs for replay. Results are computed on demand from event data at
   * request time, so any date window within the supported range returns current
   * results. `to` must be on or after `from`, and the window may span at most 31 days
   * including both endpoints. Requires scope: web-analytics:view
   */
  results(
    id: string,
    query: FunnelResultsParams,
    options?: RequestOptions,
  ): APIPromise<FunnelResultsResponse> {
    return this._client.get(path`/rest/v1/funnels/${id}/results`, { query, ...options });
  }
}

export interface FunnelListResponse {
  /**
   * All funnels configured on this account.
   */
  entities: Array<FunnelListResponse.Entity>;
}

export namespace FunnelListResponse {
  export interface Entity {
    createdAt: string;

    funnelId: string;

    funnelType: 'SESSION_BASED' | 'VISITOR_BASED';

    name: string;

    status: 'READY' | 'PROCESSING';

    steps: Array<Entity.Step>;

    updatedAt: string;

    conversionWindow?: Entity.ConversionWindow | null;

    countingMethod?: 'UNIQUES' | 'TOTALS' | 'SESSIONS' | null;

    description?: string | null;

    reportDateRange?: Entity.ReportDateRange | null;

    stepOrder?: 'EXACT' | 'ANY' | null;

    /**
     * UTM filter object (JSON).
     */
    utmFilters?: unknown;

    watched?: boolean | null;
  }

  export namespace Entity {
    export interface Step {
      eventName: string;

      name: string;

      order: number;

      stepId: string;

      /**
       * Step-level event filters (JSON object).
       */
      filters?: unknown;
    }

    export interface ConversionWindow {
      unit: 'MINUTES' | 'HOURS' | 'DAYS';

      value: number;
    }

    export interface ReportDateRange {
      from: string;

      to: string;
    }
  }
}

/**
 * Funnel configuration details.
 */
export interface FunnelRetrieveResponse {
  createdAt: string;

  funnelId: string;

  funnelType: 'SESSION_BASED' | 'VISITOR_BASED';

  name: string;

  status: 'READY' | 'PROCESSING';

  steps: Array<FunnelRetrieveResponse.Step>;

  updatedAt: string;

  conversionWindow?: FunnelRetrieveResponse.ConversionWindow | null;

  countingMethod?: 'UNIQUES' | 'TOTALS' | 'SESSIONS' | null;

  description?: string | null;

  reportDateRange?: FunnelRetrieveResponse.ReportDateRange | null;

  stepOrder?: 'EXACT' | 'ANY' | null;

  /**
   * UTM filter object (JSON).
   */
  utmFilters?: unknown;

  watched?: boolean | null;
}

export namespace FunnelRetrieveResponse {
  export interface Step {
    eventName: string;

    name: string;

    order: number;

    stepId: string;

    /**
     * Step-level event filters (JSON object).
     */
    filters?: unknown;
  }

  export interface ConversionWindow {
    unit: 'MINUTES' | 'HOURS' | 'DAYS';

    value: number;
  }

  export interface ReportDateRange {
    from: string;

    to: string;
  }
}

export interface FunnelResultsResponse {
  /**
   * Conversion rate from first step to last step as a percentage.
   */
  overallConversionRate: number;

  /**
   * Per-step funnel analytics, ordered by step number.
   */
  steps: Array<FunnelResultsResponse.Step>;

  /**
   * Total number of visitors who entered the funnel (entered step 1).
   */
  totalVisitors: number;

  /**
   * Average time from first step to last step in seconds. Null when no completions.
   */
  overallAvgTimeToConversion?: number | null;

  /**
   * Present when the results are wider than the funnel as configured. Some step
   * conditions could not be expressed as a query and were ignored, so the counts
   * above include visitors those conditions would have excluded. Absent when the
   * whole definition was applied. The dashboard surfaces the same caveat.
   */
  warning?: string;
}

export namespace FunnelResultsResponse {
  export interface Step {
    conversionCount: number;

    conversionRate: number;

    dropOffRate: number;

    dropOffSessionIds: Array<string>;

    overallConversionRate: number;

    sessionIds: Array<string>;

    stepNumber: number;

    visitorCount: number;

    avgTimeToNextStep?: number | null;
  }
}

export interface FunnelResultsParams {
  /**
   * Inclusive lower bound of the analysis window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window may span at most 31 days including both
   * endpoints.
   */
  from: string;

  /**
   * Inclusive upper bound of the analysis window, as a UTC calendar day in
   * `YYYY-MM-DD` format. Must be on or after `from`, and the window may span at most
   * 31 days including both endpoints.
   */
  to: string;

  /**
   * Accepted for backward compatibility but NOT applied. Funnel sessions carry a
   * single attribution set, so there is no initial vs. last-touch distinction to
   * select between.
   */
  attributionType?: 'INITIAL' | 'LAST_TOUCH';

  /**
   * Restrict the funnel to sessions on a device class. `MOBILE` matches phone
   * sessions; `DESKTOP` matches every session that is not a phone, tablet, TV,
   * console, wearable, XR, or embedded device. `ALL` (the default) applies no device
   * filter.
   */
  deviceType?: 'DESKTOP' | 'MOBILE' | 'ALL';

  /**
   * Restrict the funnel to sessions whose `utm_campaign` exactly matches this value.
   */
  utmCampaign?: string;

  /**
   * Restrict the funnel to sessions whose `utm_content` exactly matches this value.
   */
  utmContent?: string;

  /**
   * Restrict the funnel to sessions whose `utm_medium` exactly matches this value.
   */
  utmMedium?: string;

  /**
   * Accepted for backward compatibility but NOT applied — there is no campaign-name
   * dimension on funnel sessions. Use `utmCampaign` instead.
   */
  utmName?: string;

  /**
   * Restrict the funnel to sessions whose `utm_source` exactly matches this value.
   */
  utmSource?: string;

  /**
   * Restrict the funnel to sessions whose `utm_term` exactly matches this value.
   */
  utmTerm?: string;
}

export declare namespace Funnels {
  export {
    type FunnelListResponse as FunnelListResponse,
    type FunnelRetrieveResponse as FunnelRetrieveResponse,
    type FunnelResultsResponse as FunnelResultsResponse,
    type FunnelResultsParams as FunnelResultsParams,
  };
}
