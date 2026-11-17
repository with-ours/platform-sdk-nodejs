// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Analytics extends APIResource {
  /**
   * Discover the filter properties, operators, and providers available to analytics
   * query definitions. Requires API-key scope or current OAuth user permission:
   * variables:find-default
   */
  queryCatalog(options?: RequestOptions): APIPromise<AnalyticsQueryCatalogResponse> {
    return this._client.get('/rest/v1/analytics/query-catalog', options);
  }

  /**
   * Discover property paths recently observed in event data. Results are suggestions
   * from a fixed recent 30-day sample and may be incomplete; callers can still use
   * manually entered paths. Use `eventName` and `sourceId` to narrow the
   * suggestions. Requires API-key scope or current OAuth user permission:
   * variables:find-custom, web-analytics:view
   */
  propertySuggestions(
    query: AnalyticsPropertySuggestionsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AnalyticsPropertySuggestionsResponse> {
    return this._client.get('/rest/v1/analytics/property-suggestions', { query, ...options });
  }

  /**
   * Discover the event names this account has collected in the last 30 days, for
   * Insight metric `eventNames`, the `eventName` of funnel steps and journey flows,
   * or the `eventName` filter of `GET /rest/v1/analytics/property-suggestions`.
   * Returns `{ entities }` in alphabetical order. The list is not paginated: it
   * holds up to the 500 most frequent names, and newly seen events may take a few
   * minutes to appear. Names missing from the list still work when entered exactly.
   * Requires API-key scope or current OAuth user permission: web-analytics:view
   */
  eventNames(options?: RequestOptions): APIPromise<AnalyticsEventNamesResponse> {
    return this._client.get('/rest/v1/analytics/event-names', options);
  }
}

export interface AnalyticsQueryCatalogResponse {
  /**
   * Fields available to analytics report filters.
   */
  entries: Array<AnalyticsQueryCatalogResponse.Entry>;

  /**
   * Known limits of analytics filtering.
   */
  limitations: Array<string>;

  /**
   * Catalog format version.
   */
  version: 1;
}

export namespace AnalyticsQueryCatalogResponse {
  export interface Entry {
    /**
     * Catalog identifier for this filterable field.
     */
    id: string;

    /**
     * Human-readable field name.
     */
    label: string;

    /**
     * How a filter treats events where the field is absent.
     */
    missingBehavior: string;

    /**
     * Operators this field accepts in a filter condition.
     */
    operators: Array<string>;

    /**
     * Data source that supplies the field value.
     */
    provider: string;

    /**
     * Whether the field belongs to the event or to its session.
     */
    scope: string;

    /**
     * Value type the filter compares against.
     */
    type: string;

    /**
     * Value types allowed for a path-based field.
     */
    allowedTypes?: Array<string> | null;

    /**
     * True when a property path must be supplied, as for custom event properties.
     */
    requiresPath?: boolean | null;
  }
}

export interface AnalyticsPropertySuggestionsResponse {
  /**
   * Property paths and value types observed in a sample of recent events.
   */
  entities: Array<AnalyticsPropertySuggestionsResponse.Entity>;

  /**
   * Start of the observation window the suggestions were drawn from.
   */
  from: string;

  /**
   * True when the suggestions come from a sample, so some paths may be missing.
   */
  sampled: boolean;

  /**
   * End of the observation window the suggestions were drawn from.
   */
  to: string;
}

export namespace AnalyticsPropertySuggestionsResponse {
  export interface Entity {
    /**
     * Property path segments, outermost first.
     */
    path: Array<string>;

    /**
     * Property bag the path belongs to.
     */
    property: 'event.properties' | 'event.visitor_properties';

    /**
     * Value type observed at this path.
     */
    type: 'string' | 'number' | 'boolean';
  }
}

export interface AnalyticsEventNamesResponse {
  /**
   * Distinct event names seen in the last 30 days, alphabetical. Not paginated: the
   * list holds up to the 500 most frequent names.
   */
  entities: Array<AnalyticsEventNamesResponse.Entity>;

  /**
   * Start of the observation window the suggestions were drawn from.
   */
  from: string;

  /**
   * True when rare names may be missing from the list. Missing names still work when
   * entered exactly.
   */
  sampled: boolean;

  /**
   * End of the observation window the suggestions were drawn from.
   */
  to: string;
}

export namespace AnalyticsEventNamesResponse {
  export interface Entity {
    /**
     * Event name exactly as collected, including `$`-prefixed system events.
     */
    name: string;
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
    type AnalyticsEventNamesResponse as AnalyticsEventNamesResponse,
    type AnalyticsPropertySuggestionsParams as AnalyticsPropertySuggestionsParams,
  };
}
