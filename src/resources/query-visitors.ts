// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class QueryVisitors extends APIResource {
  /**
   * List visitors with matching events and their permitted current-profile fields.
   * JSON-encode input in the query string; cursors stay bound to the account and
   * filters, while page size may change. Requires API-key scope or current OAuth
   * user permission: web-analytics:view, report:list-events
   */
  list(query: QueryVisitorListParams, options?: RequestOptions): APIPromise<QueryVisitorListResponse> {
    return this._client.get('/rest/v1/query-visitors', { query, ...options });
  }

  /**
   * Return Query Visitors date, page, selection, and touch-filter capabilities.
   * Requires API-key scope or current OAuth user permission: web-analytics:view,
   * report:list-events
   */
  capabilities(options?: RequestOptions): APIPromise<QueryVisitorCapabilitiesResponse> {
    return this._client.get('/rest/v1/query-visitors/capabilities', options);
  }

  /**
   * Search current visitor profiles for the Query Visitors typeahead. Pass returned
   * visitorIds to the list input to filter the result. Requires API-key scope or
   * current OAuth user permission: web-analytics:view, report:list-events,
   * report:view-visitor
   */
  profileSearch(
    query: QueryVisitorProfileSearchParams,
    options?: RequestOptions,
  ): APIPromise<QueryVisitorProfileSearchResponse> {
    return this._client.get('/rest/v1/query-visitors/profile-search', { query, ...options });
  }
}

export interface QueryVisitorListResponse {
  freshness: QueryVisitorListResponse.Freshness;

  matchedCount: number | null;

  pagination: QueryVisitorListResponse.Pagination;

  rows: Array<QueryVisitorListResponse.Row>;
}

export namespace QueryVisitorListResponse {
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
    match: Row.Match;

    profile: Row.Profile;

    visitorId: string;
  }

  export namespace Row {
    export interface Match {
      eventCount: number;

      firstEventAt: string;

      lastEventAt: string;
    }

    export interface Profile {
      /**
       * Current profile email, when available.
       */
      email: string | null;

      /**
       * Current external ID, when available.
       */
      externalId: string | null;

      /**
       * Current first name, when permitted and available.
       */
      firstName: string | null;

      /**
       * First activity recorded on the current profile.
       */
      firstSeenAt: string | null;

      /**
       * Current last name, when permitted and available.
       */
      lastName: string | null;

      /**
       * Most recent activity recorded on the current profile.
       */
      lastSeenAt: string | null;

      /**
       * Current profile lookup status.
       */
      status: 'FOUND' | 'NOT_FOUND' | 'UNAVAILABLE';
    }
  }
}

export interface QueryVisitorCapabilitiesResponse {
  defaultPageSize: 25;

  defaultTouchLookbackDays: number;

  maxDateRangeDays: 31;

  maxPageSize: 100;

  maxSelections: 10;

  supportsVerifiedCoverageWatermark: boolean;

  touchEnabled: boolean;

  touchLookbackDays: Array<number>;

  version: 1;
}

export interface QueryVisitorProfileSearchResponse {
  matches: Array<QueryVisitorProfileSearchResponse.Match>;

  truncated: boolean;

  visitorIds: Array<string>;
}

export namespace QueryVisitorProfileSearchResponse {
  export interface Match {
    email: string | null;

    externalId: string | null;

    firstName: string | null;

    lastName: string | null;

    lastSeenAt: string | null;

    visitorId: string;
  }
}

export interface QueryVisitorListParams {
  /**
   * Query Visitors filters and page. JSON-encode input in the REST query string.
   */
  input: string;
}

export interface QueryVisitorProfileSearchParams {
  /**
   * Current profile search filters. JSON-encode input in the REST query string.
   */
  input: string;
}

export declare namespace QueryVisitors {
  export {
    type QueryVisitorListResponse as QueryVisitorListResponse,
    type QueryVisitorCapabilitiesResponse as QueryVisitorCapabilitiesResponse,
    type QueryVisitorProfileSearchResponse as QueryVisitorProfileSearchResponse,
    type QueryVisitorListParams as QueryVisitorListParams,
    type QueryVisitorProfileSearchParams as QueryVisitorProfileSearchParams,
  };
}
