// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Funnels extends APIResource {
  /**
   * List readable funnels configured on this account. Each funnel includes its
   * canonical versioned definition. If some funnels cannot be loaded,
   * `unavailableCount` and `warnings` identify the incomplete result; omitted
   * funnels must not be treated as deleted. A complete list has
   * `unavailableCount: 0` and no warnings. Funnel results are computed on demand, so
   * `status` is always `READY` and `reportDateRange` is always `null`. Requires
   * scope: web-analytics:view
   */
  list(options?: RequestOptions): APIPromise<FunnelListResponse> {
    return this._client.get('/rest/v1/funnels', options);
  }

  /**
   * Create a funnel from a versioned definition. Returns the complete saved
   * configuration. Requires scope: web-analytics:write
   */
  create(body: FunnelCreateParams, options?: RequestOptions): APIPromise<FunnelCreateResponse> {
    return this._client.post('/rest/v1/funnels', { body, ...options });
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
   * Update one or more funnel fields. Omitted fields remain unchanged. The canonical
   * definition can be replaced by supplying `queryDefinition`. Requires scope:
   * web-analytics:write
   */
  update(id: string, body: FunnelUpdateParams, options?: RequestOptions): APIPromise<FunnelUpdateResponse> {
    return this._client.patch(path`/rest/v1/funnels/${id}`, { body, ...options });
  }

  /**
   * Delete a Funnel configuration. Existing analytics data is unaffected. Requires
   * scope: web-analytics:write
   */
  delete(id: string, options?: RequestOptions): APIPromise<FunnelDeleteResponse> {
    return this._client.delete(path`/rest/v1/funnels/${id}`, options);
  }

  /**
   * Duplicate a funnel configuration in the same account. The copy keeps the
   * canonical definition, receives a new ID, and is named `Copy of …`. Requires
   * scope: web-analytics:write
   */
  duplicate(id: string, options?: RequestOptions): APIPromise<FunnelDuplicateResponse> {
    return this._client.post(path`/rest/v1/funnels/${id}/duplicate`, options);
  }

  /**
   * Compute funnel step analytics from the funnel’s saved `queryDefinition` over a
   * requested date window. Returns per-step visitor counts, conversion rates,
   * drop-off rates, average time to next step, sample session IDs for replay, and
   * the resolved entry/observation scope. Results are computed on demand from event
   * data at request time; ad hoc filter, saved-scope, and web-source overrides are
   * not accepted. Observation completeness is null when the source coverage
   * watermark is unavailable. `to` must be on or after `from`, and the window may
   * span at most 91 days including both endpoints. Requires scope:
   * web-analytics:view
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
   * The readable funnels configured on this account.
   */
  entities: Array<FunnelListResponse.Entity>;

  /**
   * Number of funnels that could not be loaded. A positive count means the list is
   * incomplete.
   */
  unavailableCount: number;

  /**
   * Warnings about incomplete results. Empty when every funnel was loaded.
   */
  warnings: Array<string>;
}

export namespace FunnelListResponse {
  export interface Entity {
    createdAt: string;

    funnelId: string;

    name: string;

    /**
     * Versioned funnel definition with typed steps and filters.
     */
    queryDefinition: unknown;

    status: 'READY' | 'PROCESSING';

    updatedAt: string;

    description?: string | null;

    reportDateRange?: Entity.ReportDateRange | null;

    watched?: boolean | null;
  }

  export namespace Entity {
    export interface ReportDateRange {
      from: string;

      to: string;
    }
  }
}

export interface FunnelCreateResponse {
  createdAt: string;

  funnelId: string;

  name: string;

  /**
   * Versioned funnel definition with typed steps and filters.
   */
  queryDefinition: unknown;

  status: 'READY' | 'PROCESSING';

  updatedAt: string;

  description?: string | null;

  reportDateRange?: FunnelCreateResponse.ReportDateRange | null;

  watched?: boolean | null;
}

export namespace FunnelCreateResponse {
  export interface ReportDateRange {
    from: string;

    to: string;
  }
}

/**
 * Funnel configuration details.
 */
export interface FunnelRetrieveResponse {
  createdAt: string;

  funnelId: string;

  name: string;

  /**
   * Versioned funnel definition with typed steps and filters.
   */
  queryDefinition: unknown;

  status: 'READY' | 'PROCESSING';

  updatedAt: string;

  description?: string | null;

  reportDateRange?: FunnelRetrieveResponse.ReportDateRange | null;

  watched?: boolean | null;
}

export namespace FunnelRetrieveResponse {
  export interface ReportDateRange {
    from: string;

    to: string;
  }
}

export interface FunnelUpdateResponse {
  createdAt: string;

  funnelId: string;

  name: string;

  /**
   * Versioned funnel definition with typed steps and filters.
   */
  queryDefinition: unknown;

  status: 'READY' | 'PROCESSING';

  updatedAt: string;

  description?: string | null;

  reportDateRange?: FunnelUpdateResponse.ReportDateRange | null;

  watched?: boolean | null;
}

export namespace FunnelUpdateResponse {
  export interface ReportDateRange {
    from: string;

    to: string;
  }
}

export interface FunnelDeleteResponse {
  id: string;

  deleted: true;
}

export interface FunnelDuplicateResponse {
  createdAt: string;

  funnelId: string;

  name: string;

  /**
   * Versioned funnel definition with typed steps and filters.
   */
  queryDefinition: unknown;

  status: 'READY' | 'PROCESSING';

  updatedAt: string;

  description?: string | null;

  reportDateRange?: FunnelDuplicateResponse.ReportDateRange | null;

  watched?: boolean | null;
}

export namespace FunnelDuplicateResponse {
  export interface ReportDateRange {
    from: string;

    to: string;
  }
}

export interface FunnelResultsResponse {
  definitionUpdatedAt: string;

  engine: string;

  /**
   * Conversion rate from first step to last step as a percentage.
   */
  overallConversionRate: number;

  scope: FunnelResultsResponse.Scope;

  semanticVersion: 1;

  /**
   * Known Events v3 source limitations: equal-load conflicts, corrections that move
   * across physical keys, and source completeness are unverified.
   */
  sourceLimitations: Array<
    'equal-load-conflicts-unverified' | 'cross-key-corrections-unverified' | 'source-completeness-unverified'
  >;

  sourcePolicy: 'events-v3-physical-key';

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

  sourceRevision?: string | null;
}

export namespace FunnelResultsResponse {
  export interface Scope {
    entryFrom: string;

    entryTo: string;

    observationFrom: string;

    observationTo: string;

    timezone: 'UTC';

    windowMs: number;

    observationComplete?: boolean | null;

    settledEntryTo?: string | null;

    watermark?: string | null;
  }

  export interface Step {
    conversionCount: number;

    conversionRate: number;

    dropOffRate: number;

    dropOffSessionIds: Array<string>;

    dropOffVisitorIds: Array<string>;

    overallConversionRate: number;

    sessionIds: Array<string>;

    stepNumber: number;

    visitorCount: number;

    visitorIds: Array<string>;

    avgTimeToNextStep?: number | null;
  }
}

export interface FunnelCreateParams {
  name: string;

  /**
   * Versioned funnel definition with typed steps and filters.
   */
  queryDefinition: unknown;

  description?: string | null;

  watched?: boolean | null;
}

export interface FunnelUpdateParams {
  description?: string | null;

  name?: string;

  /**
   * Versioned funnel definition with typed steps and filters.
   */
  queryDefinition?: unknown;

  watched?: boolean | null;
}

export interface FunnelResultsParams {
  /**
   * Inclusive lower bound of the analysis window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window may span at most 91 days including both
   * endpoints.
   */
  from: string;

  /**
   * Inclusive upper bound of the analysis window, as a UTC calendar day in
   * `YYYY-MM-DD` format. Must be on or after `from`, and the window may span at most
   * 91 days including both endpoints.
   */
  to: string;

  /**
   * Require this saved definition revision. Returns a conflict if the funnel has
   * changed.
   */
  expectedDefinitionUpdatedAt?: string;
}

export declare namespace Funnels {
  export {
    type FunnelListResponse as FunnelListResponse,
    type FunnelCreateResponse as FunnelCreateResponse,
    type FunnelRetrieveResponse as FunnelRetrieveResponse,
    type FunnelUpdateResponse as FunnelUpdateResponse,
    type FunnelDeleteResponse as FunnelDeleteResponse,
    type FunnelDuplicateResponse as FunnelDuplicateResponse,
    type FunnelResultsResponse as FunnelResultsResponse,
    type FunnelCreateParams as FunnelCreateParams,
    type FunnelUpdateParams as FunnelUpdateParams,
    type FunnelResultsParams as FunnelResultsParams,
  };
}
