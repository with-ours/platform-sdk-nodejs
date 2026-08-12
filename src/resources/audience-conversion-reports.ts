// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AudienceConversionReports extends APIResource {
  /**
   * List saved Audience Performance report configurations, most recently updated
   * first. Requires scope: web-analytics:view
   */
  list(options?: RequestOptions): APIPromise<AudienceConversionReportListResponse> {
    return this._client.get('/rest/v1/audience-conversion-reports', options);
  }

  /**
   * Save an Audience Performance report configuration. Returns the full report so
   * callers can run or update it without another request. Requires scope:
   * web-analytics:write
   */
  create(
    body: AudienceConversionReportCreateParams,
    options?: RequestOptions,
  ): APIPromise<AudienceConversionReportCreateResponse> {
    return this._client.post('/rest/v1/audience-conversion-reports', { body, ...options });
  }

  /**
   * Fetch a saved Audience Performance report by id. Requires scope:
   * web-analytics:view
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<AudienceConversionReportRetrieveResponse> {
    return this._client.get(path`/rest/v1/audience-conversion-reports/${id}`, options);
  }

  /**
   * Update a saved Audience Performance report. Omitted fields remain unchanged,
   * `filters: []` clears all filters, and dates must be sent or cleared as a pair.
   * Requires scope: web-analytics:write
   */
  update(
    id: string,
    body: AudienceConversionReportUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AudienceConversionReportUpdateResponse> {
    return this._client.patch(path`/rest/v1/audience-conversion-reports/${id}`, { body, ...options });
  }

  /**
   * Delete a saved Audience Performance report configuration. Requires scope:
   * web-analytics:write
   */
  delete(id: string, options?: RequestOptions): APIPromise<AudienceConversionReportDeleteResponse> {
    return this._client.delete(path`/rest/v1/audience-conversion-reports/${id}`, options);
  }

  /**
   * Run a saved Audience Performance report. `from` and `to` override the saved date
   * range when provided together. Returns 400 when neither a saved range nor an
   * override is available. Requires scope: web-analytics:view
   */
  results(
    id: string,
    query: AudienceConversionReportResultsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AudienceConversionReportResultsResponse> {
    return this._client.get(path`/rest/v1/audience-conversion-reports/${id}/results`, { query, ...options });
  }
}

export interface AudienceConversionReportListResponse {
  entities: Array<AudienceConversionReportListResponse.Entity>;
}

export namespace AudienceConversionReportListResponse {
  export interface Entity {
    attributionWindow: string;

    createdAt: string;

    eventName: string;

    filters: Array<Entity.Filter>;

    name: string;

    reportId: string;

    updatedAt: string;

    valueProperty: string;

    dateFrom?: string | null;

    dateTo?: string | null;

    excludeBots?: boolean | null;

    webSourceId?: string | null;
  }

  export namespace Entity {
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
}

export interface AudienceConversionReportCreateResponse {
  attributionWindow: string;

  createdAt: string;

  eventName: string;

  filters: Array<AudienceConversionReportCreateResponse.Filter>;

  name: string;

  reportId: string;

  updatedAt: string;

  valueProperty: string;

  dateFrom?: string | null;

  dateTo?: string | null;

  excludeBots?: boolean | null;

  webSourceId?: string | null;
}

export namespace AudienceConversionReportCreateResponse {
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

export interface AudienceConversionReportRetrieveResponse {
  attributionWindow: string;

  createdAt: string;

  eventName: string;

  filters: Array<AudienceConversionReportRetrieveResponse.Filter>;

  name: string;

  reportId: string;

  updatedAt: string;

  valueProperty: string;

  dateFrom?: string | null;

  dateTo?: string | null;

  excludeBots?: boolean | null;

  webSourceId?: string | null;
}

export namespace AudienceConversionReportRetrieveResponse {
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

export interface AudienceConversionReportUpdateResponse {
  attributionWindow: string;

  createdAt: string;

  eventName: string;

  filters: Array<AudienceConversionReportUpdateResponse.Filter>;

  name: string;

  reportId: string;

  updatedAt: string;

  valueProperty: string;

  dateFrom?: string | null;

  dateTo?: string | null;

  excludeBots?: boolean | null;

  webSourceId?: string | null;
}

export namespace AudienceConversionReportUpdateResponse {
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

export interface AudienceConversionReportDeleteResponse {
  id: string;

  deleted: true;
}

export interface AudienceConversionReportResultsResponse {
  breakdown: Array<AudienceConversionReportResultsResponse.Breakdown>;

  summary: AudienceConversionReportResultsResponse.Summary;

  timeseries: Array<AudienceConversionReportResultsResponse.Timesery>;

  previousSummary?: AudienceConversionReportResultsResponse.PreviousSummary | null;
}

export namespace AudienceConversionReportResultsResponse {
  export interface Breakdown {
    campaign: string;

    conversions: number;

    converters: number;

    medium: string;

    source: string;

    totalValue: number;
  }

  export interface Summary {
    audienceSize: number;

    avgValuePerConversion: number;

    avgValuePerConvertingVisitor: number;

    conversionRate: number;

    conversions: number;

    converters: number;

    totalValue: number;
  }

  export interface Timesery {
    conversions: number;

    date: string;

    totalValue: number;
  }

  export interface PreviousSummary {
    audienceSize: number;

    avgValuePerConversion: number;

    avgValuePerConvertingVisitor: number;

    conversionRate: number;

    conversions: number;

    converters: number;

    totalValue: number;
  }
}

export interface AudienceConversionReportCreateParams {
  attributionWindow: string;

  eventName: string;

  name: string;

  valueProperty: string;

  dateFrom?: string | null;

  dateTo?: string | null;

  excludeBots?: boolean | null;

  filters?: Array<AudienceConversionReportCreateParams.Filter>;

  webSourceId?: string | null;
}

export namespace AudienceConversionReportCreateParams {
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

export interface AudienceConversionReportUpdateParams {
  attributionWindow?: string;

  dateFrom?: string | null;

  dateTo?: string | null;

  eventName?: string;

  excludeBots?: boolean | null;

  filters?: Array<AudienceConversionReportUpdateParams.Filter>;

  name?: string;

  valueProperty?: string;

  webSourceId?: string | null;
}

export namespace AudienceConversionReportUpdateParams {
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

export interface AudienceConversionReportResultsParams {
  from?: string;

  to?: string;
}

export declare namespace AudienceConversionReports {
  export {
    type AudienceConversionReportListResponse as AudienceConversionReportListResponse,
    type AudienceConversionReportCreateResponse as AudienceConversionReportCreateResponse,
    type AudienceConversionReportRetrieveResponse as AudienceConversionReportRetrieveResponse,
    type AudienceConversionReportUpdateResponse as AudienceConversionReportUpdateResponse,
    type AudienceConversionReportDeleteResponse as AudienceConversionReportDeleteResponse,
    type AudienceConversionReportResultsResponse as AudienceConversionReportResultsResponse,
    type AudienceConversionReportCreateParams as AudienceConversionReportCreateParams,
    type AudienceConversionReportUpdateParams as AudienceConversionReportUpdateParams,
    type AudienceConversionReportResultsParams as AudienceConversionReportResultsParams,
  };
}
