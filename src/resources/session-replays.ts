// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class SessionReplays extends APIResource {
  /**
   * List recorded sessions for a date range. Filter by event, page, visitor, UTM
   * fields, or an explicit JSON-encoded session ID list. Use
   * `pagination.nextCursor` to retrieve the next page. Requires scope:
   * web-analytics:view
   */
  list(query: SessionReplayListParams, options?: RequestOptions): APIPromise<SessionReplayListResponse> {
    return this._client.get('/rest/v1/session-replays', { query, ...options });
  }

  /**
   * Return the total number of replay-bearing sessions and a daily timeseries for
   * the requested date range. Requires scope: web-analytics:view
   */
  overview(
    query: SessionReplayOverviewParams,
    options?: RequestOptions,
  ): APIPromise<SessionReplayOverviewResponse> {
    return this._client.get('/rest/v1/session-replays/overview', { query, ...options });
  }
}

export interface SessionReplayListResponse {
  items: Array<SessionReplayListResponse.Item>;

  pagination: SessionReplayListResponse.Pagination;
}

export namespace SessionReplayListResponse {
  export interface Item {
    date: string;

    duration: number | null;

    eventCount: number | null;

    pageCount: number | null;

    sessionId: string;

    startTime: string | null;

    visitorId: string;
  }

  export interface Pagination {
    hasMore: boolean;

    nextCursor?: string | null;
  }
}

export interface SessionReplayOverviewResponse {
  timeseries: Array<SessionReplayOverviewResponse.Timeseries>;

  totalReplays: number;
}

export namespace SessionReplayOverviewResponse {
  export interface Timeseries {
    date: string;

    value: number;
  }
}

export interface SessionReplayListParams {
  /**
   * Inclusive lower bound of the replay window as `YYYY-MM-DD`.
   */
  from: string;

  /**
   * Inclusive upper bound of the replay window as `YYYY-MM-DD`.
   */
  to: string;

  /**
   * Opaque pagination cursor from pagination.nextCursor in the previous response.
   * Do not decode or modify it. Malformed cursors return 400 Bad Request.
   */
  cursor?: string;

  eventName?: string;

  /**
   * Maximum replay sessions to return. Defaults to the report default.
   */
  limit?: number;

  pathname?: string;

  /**
   * Optional JSON-encoded session ID array. Maximum 100 session IDs.
   */
  sessionIds?: string;

  utmCampaign?: string;

  utmContent?: string;

  utmMedium?: string;

  utmName?: string;

  utmSource?: string;

  utmTerm?: string;

  visitorId?: string;
}

export interface SessionReplayOverviewParams {
  /**
   * Inclusive lower bound of the replay window as `YYYY-MM-DD`.
   */
  from: string;

  /**
   * Inclusive upper bound of the replay window as `YYYY-MM-DD`.
   */
  to: string;
}

export declare namespace SessionReplays {
  export {
    type SessionReplayListResponse as SessionReplayListResponse,
    type SessionReplayOverviewResponse as SessionReplayOverviewResponse,
    type SessionReplayListParams as SessionReplayListParams,
    type SessionReplayOverviewParams as SessionReplayOverviewParams,
  };
}
