// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Funnels extends APIResource {
  /**
   * List every funnel configured on this account. Each funnel includes its step
   * configuration, funnel type, conversion window, and current processing status.
   * The available report date range (if any pre-computed reports exist) is returned
   * in `reportDateRange`. Requires scope: web-analytics:view
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
   * sample session IDs for replay. Funnel results are pre-computed daily from S3;
   * reports outside the `reportDateRange` shown on the funnel config will return
   * empty steps. Requires scope: web-analytics:view
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
   * `YYYY-MM-DD` format.
   */
  from: string;

  /**
   * Inclusive upper bound of the analysis window, as a UTC calendar day in
   * `YYYY-MM-DD` format.
   */
  to: string;

  /**
   * Attribution type for UTM filter matching in funnel steps.
   */
  attributionType?: 'INITIAL' | 'LAST_TOUCH';

  /**
   * Filter funnel analytics to a specific device type. Defaults to `ALL`.
   */
  deviceType?: 'DESKTOP' | 'MOBILE' | 'ALL';

  /**
   * Filter by UTM campaign.
   */
  utmCampaign?: string;

  /**
   * Filter by UTM content.
   */
  utmContent?: string;

  /**
   * Filter by UTM medium.
   */
  utmMedium?: string;

  /**
   * Filter by UTM name.
   */
  utmName?: string;

  /**
   * Filter by UTM source.
   */
  utmSource?: string;

  /**
   * Filter by UTM term.
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
