// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ConversionJourneySummaries extends APIResource {
  /**
   * List saved Conversion Journey Summary configurations, most recently updated
   * first. Supports cursor pagination. Each result contains the conversion event,
   * analysis window, attribution window, filters, and bot/source settings needed to
   * reopen the saved analysis. Requires scope: web-analytics:view
   */
  list(
    query: ConversionJourneySummaryListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ConversionJourneySummaryListResponsesCursor, ConversionJourneySummaryListResponse> {
    return this._client.getAPIList(
      '/rest/v1/conversion-journey-summaries',
      Cursor<ConversionJourneySummaryListResponse>,
      { query, ...options },
    );
  }

  /**
   * Save a named Conversion Journey Summary configuration. Returns the full saved
   * summary so callers can reopen the same analysis without a follow-up request.
   * Each account can save up to 100 summaries. Requires scope: web-analytics:write
   */
  create(
    body: ConversionJourneySummaryCreateParams,
    options?: RequestOptions,
  ): APIPromise<ConversionJourneySummaryCreateResponse> {
    return this._client.post('/rest/v1/conversion-journey-summaries', { body, ...options });
  }

  /**
   * Fetch a saved Conversion Journey Summary by its id. Returns 404 when it does not
   * exist. Requires scope: web-analytics:view
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ConversionJourneySummaryRetrieveResponse> {
    return this._client.get(path`/rest/v1/conversion-journey-summaries/${id}`, options);
  }

  /**
   * Update one or more fields on a saved Conversion Journey Summary. Omitted fields
   * remain unchanged. When provided, `filters` replaces the complete saved filter
   * list. Send `null` for `webSourceId` or `excludeBots` to clear that optional
   * setting. Requires scope: web-analytics:write
   */
  update(
    id: string,
    body: ConversionJourneySummaryUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ConversionJourneySummaryUpdateResponse> {
    return this._client.patch(path`/rest/v1/conversion-journey-summaries/${id}`, { body, ...options });
  }

  /**
   * Delete a saved Conversion Journey Summary. The underlying analytics data is
   * unaffected. Requires scope: web-analytics:write
   */
  delete(id: string, options?: RequestOptions): APIPromise<ConversionJourneySummaryDeleteResponse> {
    return this._client.delete(path`/rest/v1/conversion-journey-summaries/${id}`, options);
  }
}

export type ConversionJourneySummaryListResponsesCursor = Cursor<ConversionJourneySummaryListResponse>;

export interface ConversionJourneySummaryListResponse {
  createdAt: string;

  dateFrom: string;

  dateTo: string;

  eventName: string;

  filters: Array<ConversionJourneySummaryListResponse.Filter>;

  name: string;

  summaryId: string;

  updatedAt: string;

  windowDays: number;

  excludeBots?: boolean | null;

  webSourceId?: string | null;
}

export namespace ConversionJourneySummaryListResponse {
  export interface Filter {
    dimension:
      | 'browser'
      | 'campaign'
      | 'city'
      | 'content'
      | 'country'
      | 'device'
      | 'entry_page'
      | 'exit_page'
      | 'medium'
      | 'os'
      | 'page'
      | 'referrer'
      | 'region'
      | 'source'
      | 'term';

    operator: 'CONTAINS' | 'IS' | 'IS_NOT' | 'NOT_CONTAINS';

    values: Array<string>;
  }
}

export interface ConversionJourneySummaryCreateResponse {
  createdAt: string;

  dateFrom: string;

  dateTo: string;

  eventName: string;

  filters: Array<ConversionJourneySummaryCreateResponse.Filter>;

  name: string;

  summaryId: string;

  updatedAt: string;

  windowDays: number;

  excludeBots?: boolean | null;

  webSourceId?: string | null;
}

export namespace ConversionJourneySummaryCreateResponse {
  export interface Filter {
    dimension:
      | 'browser'
      | 'campaign'
      | 'city'
      | 'content'
      | 'country'
      | 'device'
      | 'entry_page'
      | 'exit_page'
      | 'medium'
      | 'os'
      | 'page'
      | 'referrer'
      | 'region'
      | 'source'
      | 'term';

    operator: 'CONTAINS' | 'IS' | 'IS_NOT' | 'NOT_CONTAINS';

    values: Array<string>;
  }
}

export interface ConversionJourneySummaryRetrieveResponse {
  createdAt: string;

  dateFrom: string;

  dateTo: string;

  eventName: string;

  filters: Array<ConversionJourneySummaryRetrieveResponse.Filter>;

  name: string;

  summaryId: string;

  updatedAt: string;

  windowDays: number;

  excludeBots?: boolean | null;

  webSourceId?: string | null;
}

export namespace ConversionJourneySummaryRetrieveResponse {
  export interface Filter {
    dimension:
      | 'browser'
      | 'campaign'
      | 'city'
      | 'content'
      | 'country'
      | 'device'
      | 'entry_page'
      | 'exit_page'
      | 'medium'
      | 'os'
      | 'page'
      | 'referrer'
      | 'region'
      | 'source'
      | 'term';

    operator: 'CONTAINS' | 'IS' | 'IS_NOT' | 'NOT_CONTAINS';

    values: Array<string>;
  }
}

export interface ConversionJourneySummaryUpdateResponse {
  createdAt: string;

  dateFrom: string;

  dateTo: string;

  eventName: string;

  filters: Array<ConversionJourneySummaryUpdateResponse.Filter>;

  name: string;

  summaryId: string;

  updatedAt: string;

  windowDays: number;

  excludeBots?: boolean | null;

  webSourceId?: string | null;
}

export namespace ConversionJourneySummaryUpdateResponse {
  export interface Filter {
    dimension:
      | 'browser'
      | 'campaign'
      | 'city'
      | 'content'
      | 'country'
      | 'device'
      | 'entry_page'
      | 'exit_page'
      | 'medium'
      | 'os'
      | 'page'
      | 'referrer'
      | 'region'
      | 'source'
      | 'term';

    operator: 'CONTAINS' | 'IS' | 'IS_NOT' | 'NOT_CONTAINS';

    values: Array<string>;
  }
}

export interface ConversionJourneySummaryDeleteResponse {
  id: string;

  deleted: true;
}

export interface ConversionJourneySummaryListParams extends CursorParams {}

export interface ConversionJourneySummaryCreateParams {
  /**
   * Inclusive start of the saved analysis window in `YYYY-MM-DD` format.
   */
  dateFrom: string;

  /**
   * Inclusive end of the saved analysis window in `YYYY-MM-DD` format.
   */
  dateTo: string;

  eventName: string;

  name: string;

  windowDays: number;

  excludeBots?: boolean | null;

  filters?: Array<ConversionJourneySummaryCreateParams.Filter>;

  webSourceId?: string | null;
}

export namespace ConversionJourneySummaryCreateParams {
  export interface Filter {
    dimension:
      | 'browser'
      | 'campaign'
      | 'city'
      | 'content'
      | 'country'
      | 'device'
      | 'entry_page'
      | 'exit_page'
      | 'medium'
      | 'os'
      | 'page'
      | 'referrer'
      | 'region'
      | 'source'
      | 'term';

    operator?: 'CONTAINS' | 'IS' | 'IS_NOT' | 'NOT_CONTAINS';

    value?: string;

    values?: Array<string>;
  }
}

export interface ConversionJourneySummaryUpdateParams {
  dateFrom?: string;

  dateTo?: string;

  eventName?: string;

  excludeBots?: boolean | null;

  filters?: Array<ConversionJourneySummaryUpdateParams.Filter>;

  name?: string;

  webSourceId?: string | null;

  windowDays?: number;
}

export namespace ConversionJourneySummaryUpdateParams {
  export interface Filter {
    dimension:
      | 'browser'
      | 'campaign'
      | 'city'
      | 'content'
      | 'country'
      | 'device'
      | 'entry_page'
      | 'exit_page'
      | 'medium'
      | 'os'
      | 'page'
      | 'referrer'
      | 'region'
      | 'source'
      | 'term';

    operator?: 'CONTAINS' | 'IS' | 'IS_NOT' | 'NOT_CONTAINS';

    value?: string;

    values?: Array<string>;
  }
}

export declare namespace ConversionJourneySummaries {
  export {
    type ConversionJourneySummaryListResponse as ConversionJourneySummaryListResponse,
    type ConversionJourneySummaryCreateResponse as ConversionJourneySummaryCreateResponse,
    type ConversionJourneySummaryRetrieveResponse as ConversionJourneySummaryRetrieveResponse,
    type ConversionJourneySummaryUpdateResponse as ConversionJourneySummaryUpdateResponse,
    type ConversionJourneySummaryDeleteResponse as ConversionJourneySummaryDeleteResponse,
    type ConversionJourneySummaryListResponsesCursor as ConversionJourneySummaryListResponsesCursor,
    type ConversionJourneySummaryListParams as ConversionJourneySummaryListParams,
    type ConversionJourneySummaryCreateParams as ConversionJourneySummaryCreateParams,
    type ConversionJourneySummaryUpdateParams as ConversionJourneySummaryUpdateParams,
  };
}
