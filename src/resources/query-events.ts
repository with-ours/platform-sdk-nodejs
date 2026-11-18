// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class QueryEvents extends APIResource {
  /**
   * List matching event occurrences. JSON-encode input in the query string.
   * includeCount defaults to false. Requests that include raw event or visitor
   * properties also require event-detail permission, checked by the resolver; a
   * missing permission is masked as 404 Not Found. Requires API-key scope or current
   * OAuth user permission: report:list-events
   */
  list(query: QueryEventListParams, options?: RequestOptions): APIPromise<QueryEventListResponse> {
    return this._client.get('/rest/v1/query-events', { query, ...options });
  }

  /**
   * Return Query Events date, page, selection, projection, and export limits.
   * Requires API-key scope or current OAuth user permission: report:list-events
   */
  capabilities(options?: RequestOptions): APIPromise<QueryEventCapabilitiesResponse> {
    return this._client.get('/rest/v1/query-events/capabilities', options);
  }

  /**
   * List the filter fields and operators supported by Query Events. Requires API-key
   * scope or current OAuth user permission: report:list-events
   */
  catalog(options?: RequestOptions): APIPromise<QueryEventCatalogResponse> {
    return this._client.get('/rest/v1/query-events/query-catalog', options);
  }

  /**
   * Suggest observed event and visitor property paths. Optionally scope by exact
   * event name or source id. Requires API-key scope or current OAuth user
   * permission: report:list-events
   */
  propertySuggestions(
    query: QueryEventPropertySuggestionsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<QueryEventPropertySuggestionsResponse> {
    return this._client.get('/rest/v1/query-events/property-suggestions', { query, ...options });
  }

  /**
   * List observed event names available to Query Events. Requires API-key scope or
   * current OAuth user permission: report:list-events
   */
  eventNames(options?: RequestOptions): APIPromise<QueryEventEventNamesResponse> {
    return this._client.get('/rest/v1/query-events/event-names', options);
  }

  /**
   * Find one event occurrence using the same JSON-encoded input and cursor returned
   * by a Query Events list. Requires API-key scope or current OAuth user permission:
   * report:list-events, report:view-event
   */
  occurrence(
    query: QueryEventOccurrenceParams,
    options?: RequestOptions,
  ): APIPromise<QueryEventOccurrenceResponse | null> {
    return this._client.get('/rest/v1/query-events/occurrence', { query, ...options });
  }

  /**
   * Export matching events as CSV or JSON, up to the supported row limit.
   * JSON-encode input in the query string. Requires API-key scope or current OAuth
   * user permission: report:list-events, report:view-event
   */
  export(query: QueryEventExportParams, options?: RequestOptions): APIPromise<QueryEventExportResponse> {
    return this._client.get('/rest/v1/query-events/export', { query, ...options });
  }
}

export interface QueryEventListResponse {
  freshness: QueryEventListResponse.Freshness;

  matchedCount: number | null;

  pagination: QueryEventListResponse.Pagination;

  rows: Array<QueryEventListResponse.Row>;
}

export namespace QueryEventListResponse {
  export interface Freshness {
    coverageStatus: 'UNKNOWN';

    coverageWatermark: string | null;

    syncCompletedAt?: string | null;

    syncCursor?: string | null;
  }

  export interface Pagination {
    hasMore: boolean;

    nextCursor: string | null;
  }

  export interface Row {
    columns: Array<Row.Column>;

    cursor: string;

    distinctId: string;

    email: string | null;

    eventName: string;

    eventProperties: { [key: string]: unknown };

    isBot: boolean;

    isTestEvent: boolean;

    pagePath: string | null;

    sessionId: string | null;

    sourceId: string;

    sourceName: string;

    sourceType: string;

    timestamp: string;

    visitorId: string;

    visitorProperties: { [key: string]: unknown };
  }

  export namespace Row {
    export interface Column {
      path: Array<string> | null;

      property: string;

      type: 'STRING' | 'NUMBER' | 'BOOLEAN' | null;

      value: string | null;
    }
  }
}

export interface QueryEventCapabilitiesResponse {
  defaultPageSize: number;

  maxColumns: 20;

  maxDateRangeDays: 366;

  maxExportRows: 100;

  maxPageSize: 250;

  maxSelections: 10;

  supportsVerifiedCoverageWatermark: boolean;

  version: 1;
}

export interface QueryEventCatalogResponse {
  /**
   * Fields available to analytics report filters.
   */
  entries: Array<QueryEventCatalogResponse.Entry>;

  /**
   * Known limits of analytics filtering.
   */
  limitations: Array<string>;

  /**
   * Catalog format version.
   */
  version: 1;
}

export namespace QueryEventCatalogResponse {
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

export interface QueryEventPropertySuggestionsResponse {
  /**
   * Property paths and value types observed in a sample of recent events.
   */
  entities: Array<QueryEventPropertySuggestionsResponse.Entity>;

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

export namespace QueryEventPropertySuggestionsResponse {
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

export interface QueryEventEventNamesResponse {
  /**
   * Distinct event names seen in the last 30 days, alphabetical. Not paginated: the
   * list holds up to the 500 most frequent names.
   */
  entities: Array<QueryEventEventNamesResponse.Entity>;

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

export namespace QueryEventEventNamesResponse {
  export interface Entity {
    /**
     * Event name exactly as collected, including `$`-prefixed system events.
     */
    name: string;
  }
}

export interface QueryEventOccurrenceResponse {
  columns: Array<QueryEventOccurrenceResponse.Column>;

  cursor: string;

  distinctId: string;

  email: string | null;

  eventName: string;

  eventProperties: { [key: string]: unknown };

  isBot: boolean;

  isTestEvent: boolean;

  pagePath: string | null;

  sessionId: string | null;

  sourceId: string;

  sourceName: string;

  sourceType: string;

  timestamp: string;

  visitorId: string;

  visitorProperties: { [key: string]: unknown };
}

export namespace QueryEventOccurrenceResponse {
  export interface Column {
    path: Array<string> | null;

    property: string;

    type: 'STRING' | 'NUMBER' | 'BOOLEAN' | null;

    value: string | null;
  }
}

export interface QueryEventExportResponse {
  content: string;

  format: 'CSV' | 'JSON';

  pagination: QueryEventExportResponse.Pagination;

  rowCount: number;
}

export namespace QueryEventExportResponse {
  export interface Pagination {
    hasMore: boolean;

    nextCursor: string | null;
  }
}

export interface QueryEventListParams {
  /**
   * Query Events filters and projection. JSON-encode input in the REST query string.
   */
  input: string;

  /**
   * Cursor from the previous page.
   */
  cursor?: string;

  includeCount?: boolean;

  limit?: number;
}

export interface QueryEventPropertySuggestionsParams {
  /**
   * Optional exact event name to scope the suggestions.
   */
  eventName?: string;

  /**
   * Optional exact source identifier to scope the suggestions.
   */
  sourceId?: string;
}

export interface QueryEventOccurrenceParams {
  /**
   * Cursor from the page containing this event.
   */
  cursor: string;

  /**
   * The same filters used to obtain the event cursor. JSON-encode input in the REST
   * query string.
   */
  input: string;
}

export interface QueryEventExportParams {
  /**
   * Export encoding.
   */
  format: 'CSV' | 'JSON';

  /**
   * Query Events filters and projection. JSON-encode input in the REST query string.
   */
  input: string;

  /**
   * Start after this event cursor.
   */
  cursor?: string;

  limit?: number;
}

export declare namespace QueryEvents {
  export {
    type QueryEventListResponse as QueryEventListResponse,
    type QueryEventCapabilitiesResponse as QueryEventCapabilitiesResponse,
    type QueryEventCatalogResponse as QueryEventCatalogResponse,
    type QueryEventPropertySuggestionsResponse as QueryEventPropertySuggestionsResponse,
    type QueryEventEventNamesResponse as QueryEventEventNamesResponse,
    type QueryEventOccurrenceResponse as QueryEventOccurrenceResponse,
    type QueryEventExportResponse as QueryEventExportResponse,
    type QueryEventListParams as QueryEventListParams,
    type QueryEventPropertySuggestionsParams as QueryEventPropertySuggestionsParams,
    type QueryEventOccurrenceParams as QueryEventOccurrenceParams,
    type QueryEventExportParams as QueryEventExportParams,
  };
}
