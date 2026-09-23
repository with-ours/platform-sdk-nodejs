// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Analytics extends APIResource {
  /**
   * Discover the filter properties, operators, and providers available to analytics
   * query definitions. Requires scope: web-analytics:view
   */
  queryCatalog(options?: RequestOptions): APIPromise<AnalyticsQueryCatalogResponse> {
    return this._client.get('/rest/v1/analytics/query-catalog', options);
  }

  /**
   * Discover property paths recently observed in event data. Results are suggestions
   * from a fixed recent 30-day sample and may be incomplete; callers can still use
   * manually entered paths. Use `eventName` and `sourceId` to narrow the
   * suggestions. Requires scope: web-analytics:view
   */
  propertySuggestions(
    query: AnalyticsPropertySuggestionsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AnalyticsPropertySuggestionsResponse> {
    return this._client.get('/rest/v1/analytics/property-suggestions', { query, ...options });
  }
}

export interface AnalyticsQueryCatalogResponse {
  entries: Array<AnalyticsQueryCatalogResponse.Entry>;

  limitations: Array<string>;

  version: 1;
}

export namespace AnalyticsQueryCatalogResponse {
  export interface Entry {
    id: string;

    label: string;

    missingBehavior: string;

    operators: Array<string>;

    provider: string;

    scope: string;

    type: string;

    allowedTypes?: Array<string> | null;

    requiresPath?: boolean | null;
  }
}

export interface AnalyticsPropertySuggestionsResponse {
  entities: Array<AnalyticsPropertySuggestionsResponse.Entity>;

  from: string;

  sampled: boolean;

  to: string;
}

export namespace AnalyticsPropertySuggestionsResponse {
  export interface Entity {
    path: Array<string>;

    property: 'event.properties' | 'event.visitor_properties';

    type: 'string' | 'number' | 'boolean';
  }
}

export interface AnalyticsPropertySuggestionsParams {
  /**
   * Optional exact event name to scope the suggestions.
   */
  eventName?: string;

  /**
   * Optional exact source identifier to scope the suggestions.
   */
  sourceId?: string;
}

export declare namespace Analytics {
  export {
    type AnalyticsQueryCatalogResponse as AnalyticsQueryCatalogResponse,
    type AnalyticsPropertySuggestionsResponse as AnalyticsPropertySuggestionsResponse,
    type AnalyticsPropertySuggestionsParams as AnalyticsPropertySuggestionsParams,
  };
}
