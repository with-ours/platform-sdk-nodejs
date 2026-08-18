// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class WebAnalytics extends APIResource {
  /**
   * Return the distinct visitors active in the most recent 15-minute window,
   * optionally scoped to one web source. Requires scope: web-analytics:view
   */
  currentVisitors(
    query: WebAnalyticsCurrentVisitorsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebAnalyticsCurrentVisitorsResponse> {
    return this._client.get('/rest/v1/web-analytics/current-visitors', { query, ...options });
  }

  /**
   * Return visitor counts grouped by device type, browser, or operating system for
   * the requested date range. Requires scope: web-analytics:view
   */
  devices(
    query: WebAnalyticsDevicesParams,
    options?: RequestOptions,
  ): APIPromise<WebAnalyticsDevicesResponse> {
    return this._client.get('/rest/v1/web-analytics/devices', { query, ...options });
  }

  /**
   * Return the next or previous journey steps for a pinned path. The `path` and
   * `filters` query parameters are JSON-encoded arrays. Requires scope:
   * web-analytics:view
   */
  journey(
    query: WebAnalyticsJourneyParams,
    options?: RequestOptions,
  ): APIPromise<WebAnalyticsJourneyResponse> {
    return this._client.get('/rest/v1/web-analytics/journey', { query, ...options });
  }

  /**
   * Return visitor counts grouped by country, region, or city for the requested
   * date range. Requires scope: web-analytics:view
   */
  locations(
    query: WebAnalyticsLocationsParams,
    options?: RequestOptions,
  ): APIPromise<WebAnalyticsLocationsResponse> {
    return this._client.get('/rest/v1/web-analytics/locations', { query, ...options });
  }

  /**
   * Return privacy-first traffic metrics and a timeseries for the requested date
   * range. Filter by source, geography, page, campaign, device, or other supported
   * dimensions with the JSON-encoded `filters` query parameter. Requires scope:
   * web-analytics:view
   */
  overview(
    query: WebAnalyticsOverviewParams,
    options?: RequestOptions,
  ): APIPromise<WebAnalyticsOverviewResponse> {
    return this._client.get('/rest/v1/web-analytics/overview', { query, ...options });
  }

  /**
   * Return page-level traffic metrics for top pages, entry pages, or exit pages in
   * the requested date range. Requires scope: web-analytics:view
   */
  pages(query: WebAnalyticsPagesParams, options?: RequestOptions): APIPromise<WebAnalyticsPagesResponse> {
    return this._client.get('/rest/v1/web-analytics/pages', { query, ...options });
  }

  /**
   * Return visitor counts grouped by referrer or UTM source dimension for the
   * requested date range. Requires scope: web-analytics:view
   */
  sources(
    query: WebAnalyticsSourcesParams,
    options?: RequestOptions,
  ): APIPromise<WebAnalyticsSourcesResponse> {
    return this._client.get('/rest/v1/web-analytics/sources', { query, ...options });
  }
}

export interface WebAnalyticsCurrentVisitorsResponse {
  count: number;
}

export interface WebAnalyticsDevicesResponse {
  dataUpdatedAt: string;

  rows: Array<WebAnalyticsDevicesResponse.Row>;

  totalCount: number;
}

export namespace WebAnalyticsDevicesResponse {
  export interface Row {
    name: string;

    visitors: number;
  }
}

export interface WebAnalyticsJourneyResponse {
  anchorSessions: number;

  hasMore: boolean;

  steps: Array<WebAnalyticsJourneyResponse.Step>;
}

export namespace WebAnalyticsJourneyResponse {
  export interface Step {
    isOther: boolean;

    isTerminal: boolean;

    key: string;

    kind: 'PAGE' | 'EVENT' | null;

    label: string;

    sessions: number;
  }
}

export interface WebAnalyticsLocationsResponse {
  dataUpdatedAt: string;

  rows: Array<WebAnalyticsLocationsResponse.Row>;

  totalCount: number;
}

export namespace WebAnalyticsLocationsResponse {
  export interface Row {
    code: string | null;

    name: string;

    visitors: number;
  }
}

export interface WebAnalyticsOverviewResponse {
  dataUpdatedAt: string;

  metrics: WebAnalyticsOverviewResponse.Metrics | null;

  timeseries: Array<WebAnalyticsOverviewResponse.Timeseries> | null;
}

export namespace WebAnalyticsOverviewResponse {
  export interface Metrics {
    /**
     * Percentage from 0 to 100 of visits with exactly one pageview.
     */
    bounceRate: number;

    pageviews: number;

    totalVisits: number;

    uniqueVisitors: number;

    /**
     * Average pageviews per visit.
     */
    viewsPerVisit: number;

    /**
     * Average visit duration in seconds.
     */
    visitDuration: number;
  }

  export interface Timeseries {
    date: string;

    value: number;
  }
}

export interface WebAnalyticsPagesResponse {
  dataUpdatedAt: string;

  rows: Array<WebAnalyticsPagesResponse.Row>;

  totalCount: number;
}

export namespace WebAnalyticsPagesResponse {
  export interface Row {
    bounceRate: number | null;

    entries: number | null;

    /**
     * Percentage from 0 to 100 of pageviews that ended a visit.
     */
    exitRate: number | null;

    exits: number | null;

    pageHostname: string;

    pagePath: string;

    pageviews: number | null;

    /**
     * Average time on page in seconds when available.
     */
    timeOnPage: number | null;

    visitors: number | null;
  }
}

export interface WebAnalyticsSourcesResponse {
  dataUpdatedAt: string;

  rows: Array<WebAnalyticsSourcesResponse.Row>;

  totalCount: number;
}

export namespace WebAnalyticsSourcesResponse {
  export interface Row {
    name: string;

    visitors: number;
  }
}

export interface WebAnalyticsCurrentVisitorsParams {
  /**
   * Optional web source UUID. Omit to count visitors across all account web
   * sources.
   */
  webSourceId?: string;
}

export interface WebAnalyticsDevicesParams {
  dimension: 'device' | 'browser' | 'os';

  /**
   * Inclusive lower bound of the analysis window as `YYYY-MM-DD`.
   */
  from: string;

  /**
   * Inclusive upper bound of the analysis window as `YYYY-MM-DD`.
   */
  to: string;

  /**
   * Exclude detected bot sessions. Defaults to true.
   */
  excludeBots?: boolean;

  /**
   * Optional JSON-encoded array of up to 20 filters. Dimensions: `page`,
   * `entry_page`, `exit_page`, `source`, `medium`, `campaign`, `content`, `term`,
   * `referrer`, `country`, `region`, `city`, `device`, `browser`, `os`. Each filter
   * has a dimension, optional operator (`IS`, `IS_NOT`, `CONTAINS`, `NOT_CONTAINS`;
   * defaults to `IS`), and one or more values. Example:
   * `[{"dimension":"country","values":["United States"]}]`.
   */
  filters?: string;

  /**
   * Optional web source UUID. Omit to aggregate all web sources in the account.
   */
  webSourceId?: string;
}

export interface WebAnalyticsJourneyParams {
  /**
   * Inclusive lower bound of the analysis window as `YYYY-MM-DD`.
   */
  from: string;

  /**
   * JSON-encoded ordered path of opaque journey step keys. Use an empty array to
   * request first-column candidates.
   */
  path: string;

  /**
   * Inclusive upper bound of the analysis window as `YYYY-MM-DD`.
   */
  to: string;

  direction?: 'forward' | 'reverse';

  /**
   * Exclude detected bot sessions. Defaults to true.
   */
  excludeBots?: boolean;

  /**
   * Optional JSON-encoded array of up to 20 journey filters. Supports web analytics
   * dimensions plus `event_name`, `ep_currency`, `ep_appointment_id`,
   * `ep_appointment_status`, `ep_service_line`, `ep_provider_id`, `ep_location_id`,
   * `ep_booking_channel`, `ep_revenue_type`, `ep_call_outcome`, and `ep_staff_id`.
   * Each filter has a dimension, optional operator (`IS`, `IS_NOT`, `CONTAINS`,
   * `NOT_CONTAINS`; defaults to `IS`), and one or more values.
   */
  filters?: string;

  limit?: number;

  search?: string;

  stepKind?: 'PAGE' | 'EVENT';

  /**
   * Optional web source UUID. Omit to aggregate all web sources in the account.
   */
  webSourceId?: string;
}

export interface WebAnalyticsLocationsParams {
  dimension: 'country' | 'region' | 'city';

  /**
   * Inclusive lower bound of the analysis window as `YYYY-MM-DD`.
   */
  from: string;

  /**
   * Inclusive upper bound of the analysis window as `YYYY-MM-DD`.
   */
  to: string;

  /**
   * Exclude detected bot sessions. Defaults to true.
   */
  excludeBots?: boolean;

  /**
   * Optional JSON-encoded array of up to 20 filters. Dimensions: `page`,
   * `entry_page`, `exit_page`, `source`, `medium`, `campaign`, `content`, `term`,
   * `referrer`, `country`, `region`, `city`, `device`, `browser`, `os`. Each filter
   * has a dimension, optional operator (`IS`, `IS_NOT`, `CONTAINS`, `NOT_CONTAINS`;
   * defaults to `IS`), and one or more values. Example:
   * `[{"dimension":"country","values":["United States"]}]`.
   */
  filters?: string;

  /**
   * Optional web source UUID. Omit to aggregate all web sources in the account.
   */
  webSourceId?: string;
}

export interface WebAnalyticsOverviewParams {
  /**
   * Inclusive lower bound of the analysis window as `YYYY-MM-DD`.
   */
  from: string;

  /**
   * Timeseries bucket interval. Minute queries are capped to the most recent 24
   * hours.
   */
  interval: 'minute' | 'day' | 'week' | 'month';

  metric:
    'unique_visitors' | 'total_visits' | 'pageviews' | 'views_per_visit' | 'bounce_rate' | 'visit_duration';

  /**
   * Inclusive upper bound of the analysis window as `YYYY-MM-DD`.
   */
  to: string;

  /**
   * Exclude detected bot sessions. Defaults to true.
   */
  excludeBots?: boolean;

  /**
   * Optional JSON-encoded array of up to 20 filters. Dimensions: `page`,
   * `entry_page`, `exit_page`, `source`, `medium`, `campaign`, `content`, `term`,
   * `referrer`, `country`, `region`, `city`, `device`, `browser`, `os`. Each filter
   * has a dimension, optional operator (`IS`, `IS_NOT`, `CONTAINS`, `NOT_CONTAINS`;
   * defaults to `IS`), and one or more values. Example:
   * `[{"dimension":"country","values":["United States"]}]`.
   */
  filters?: string;

  /**
   * Optional ISO timestamp used as the lower bound for realtime queries.
   */
  realtimeFrom?: string;

  /**
   * Optional web source UUID. Omit to aggregate all web sources in the account.
   */
  webSourceId?: string;
}

export interface WebAnalyticsPagesParams {
  /**
   * Inclusive lower bound of the analysis window as `YYYY-MM-DD`.
   */
  from: string;

  /**
   * Inclusive upper bound of the analysis window as `YYYY-MM-DD`.
   */
  to: string;

  view: 'top' | 'entry' | 'exit';

  /**
   * Exclude detected bot sessions. Defaults to true.
   */
  excludeBots?: boolean;

  /**
   * Optional JSON-encoded array of up to 20 filters. Dimensions: `page`,
   * `entry_page`, `exit_page`, `source`, `medium`, `campaign`, `content`, `term`,
   * `referrer`, `country`, `region`, `city`, `device`, `browser`, `os`. Each filter
   * has a dimension, optional operator (`IS`, `IS_NOT`, `CONTAINS`, `NOT_CONTAINS`;
   * defaults to `IS`), and one or more values. Example:
   * `[{"dimension":"country","values":["United States"]}]`.
   */
  filters?: string;

  /**
   * Optional web source UUID. Omit to aggregate all web sources in the account.
   */
  webSourceId?: string;
}

export interface WebAnalyticsSourcesParams {
  dimension: 'referrer' | 'campaign' | 'source' | 'medium' | 'content' | 'term';

  /**
   * Inclusive lower bound of the analysis window as `YYYY-MM-DD`.
   */
  from: string;

  /**
   * Inclusive upper bound of the analysis window as `YYYY-MM-DD`.
   */
  to: string;

  /**
   * Exclude detected bot sessions. Defaults to true.
   */
  excludeBots?: boolean;

  /**
   * Optional JSON-encoded array of up to 20 filters. Dimensions: `page`,
   * `entry_page`, `exit_page`, `source`, `medium`, `campaign`, `content`, `term`,
   * `referrer`, `country`, `region`, `city`, `device`, `browser`, `os`. Each filter
   * has a dimension, optional operator (`IS`, `IS_NOT`, `CONTAINS`, `NOT_CONTAINS`;
   * defaults to `IS`), and one or more values. Example:
   * `[{"dimension":"country","values":["United States"]}]`.
   */
  filters?: string;

  /**
   * Optional web source UUID. Omit to aggregate all web sources in the account.
   */
  webSourceId?: string;
}

export declare namespace WebAnalytics {
  export {
    type WebAnalyticsCurrentVisitorsResponse as WebAnalyticsCurrentVisitorsResponse,
    type WebAnalyticsDevicesResponse as WebAnalyticsDevicesResponse,
    type WebAnalyticsJourneyResponse as WebAnalyticsJourneyResponse,
    type WebAnalyticsLocationsResponse as WebAnalyticsLocationsResponse,
    type WebAnalyticsOverviewResponse as WebAnalyticsOverviewResponse,
    type WebAnalyticsPagesResponse as WebAnalyticsPagesResponse,
    type WebAnalyticsSourcesResponse as WebAnalyticsSourcesResponse,
    type WebAnalyticsCurrentVisitorsParams as WebAnalyticsCurrentVisitorsParams,
    type WebAnalyticsDevicesParams as WebAnalyticsDevicesParams,
    type WebAnalyticsJourneyParams as WebAnalyticsJourneyParams,
    type WebAnalyticsLocationsParams as WebAnalyticsLocationsParams,
    type WebAnalyticsOverviewParams as WebAnalyticsOverviewParams,
    type WebAnalyticsPagesParams as WebAnalyticsPagesParams,
    type WebAnalyticsSourcesParams as WebAnalyticsSourcesParams,
  };
}
