// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class WebAnalytics extends APIResource {
  /**
   * Read a fixed Overview report for up to 60 inclusive UTC days. TRAFFIC measures
   * visitors with page views and page views; BEHAVIOR measures tracked clicks, dead
   * clicks, and rage clicks. Both include web sources only and use the same counting
   * and bot/test exclusions as Insights. Requires Analytics access and
   * web-analytics:view; no custom-variable permission is required. Requires API-key
   * scope or current OAuth user permission: web-analytics:view
   */
  overviewInsight(
    query: WebAnalyticsOverviewInsightParams,
    options?: RequestOptions,
  ): APIPromise<WebAnalyticsOverviewInsightResponse> {
    return this._client.get('/rest/v1/web-analytics/overview-insight', { query, ...options });
  }

  /**
   * Return privacy-first traffic metrics and a timeseries for the requested date
   * range. Filter by source, geography, page, campaign, device, or other supported
   * dimensions with the JSON-encoded `filters` query parameter. Requires API-key
   * scope or current OAuth user permission: web-analytics:view
   */
  overview(
    query: WebAnalyticsOverviewParams,
    options?: RequestOptions,
  ): APIPromise<WebAnalyticsOverviewResponse> {
    return this._client.get('/rest/v1/web-analytics/overview', { query, ...options });
  }

  /**
   * Return visitor counts grouped by referrer or UTM source dimension for the
   * requested date range. Requires API-key scope or current OAuth user permission:
   * web-analytics:view
   */
  sources(
    query: WebAnalyticsSourcesParams,
    options?: RequestOptions,
  ): APIPromise<WebAnalyticsSourcesResponse> {
    return this._client.get('/rest/v1/web-analytics/sources', { query, ...options });
  }

  /**
   * Return page-level traffic metrics for top pages, entry pages, or exit pages in
   * the requested date range. Requires API-key scope or current OAuth user
   * permission: web-analytics:view
   */
  pages(query: WebAnalyticsPagesParams, options?: RequestOptions): APIPromise<WebAnalyticsPagesResponse> {
    return this._client.get('/rest/v1/web-analytics/pages', { query, ...options });
  }

  /**
   * Return visitor counts grouped by country, region, or city for the requested date
   * range. Requires API-key scope or current OAuth user permission:
   * web-analytics:view
   */
  locations(
    query: WebAnalyticsLocationsParams,
    options?: RequestOptions,
  ): APIPromise<WebAnalyticsLocationsResponse> {
    return this._client.get('/rest/v1/web-analytics/locations', { query, ...options });
  }

  /**
   * Return visitor counts grouped by device type, browser, or operating system for
   * the requested date range. Requires API-key scope or current OAuth user
   * permission: web-analytics:view
   */
  devices(
    query: WebAnalyticsDevicesParams,
    options?: RequestOptions,
  ): APIPromise<WebAnalyticsDevicesResponse> {
    return this._client.get('/rest/v1/web-analytics/devices', { query, ...options });
  }

  /**
   * Return the distinct visitors active in the most recent 15-minute window,
   * optionally scoped to one web source. Requires API-key scope or current OAuth
   * user permission: web-analytics:view
   */
  currentVisitors(
    query: WebAnalyticsCurrentVisitorsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebAnalyticsCurrentVisitorsResponse> {
    return this._client.get('/rest/v1/web-analytics/current-visitors', { query, ...options });
  }

  /**
   * Return the next or previous journey steps for a pinned path. The `path` and
   * `filters` query parameters are JSON-encoded arrays. Requires API-key scope or
   * current OAuth user permission: web-analytics:view
   */
  pathExplorer(
    query: WebAnalyticsPathExplorerParams,
    options?: RequestOptions,
  ): APIPromise<WebAnalyticsPathExplorerResponse> {
    return this._client.get('/rest/v1/web-analytics/path-explorer', { query, ...options });
  }
}

export interface WebAnalyticsOverviewInsightResponse {
  engine: 'clickhouse';

  /**
   * Saved report identifier; null for previews.
   */
  reportId: string | null;

  /**
   * Saved report revision; null for previews.
   */
  revision: string | null;

  scope: WebAnalyticsOverviewInsightResponse.Scope;

  semanticVersion: 1;

  series: Array<WebAnalyticsOverviewInsightResponse.Series>;

  sourceLimitations: Array<string>;

  sourcePolicy: string;

  sourceRevision?: string | null;
}

export namespace WebAnalyticsOverviewInsightResponse {
  export interface Scope {
    cumulative: boolean;

    executedAt: string;

    from: string;

    interval: 'day' | 'week' | 'month';

    sourceCompleteness: 'unknown';

    timeZone: 'UTC';

    to: string;

    comparison?: Scope.Comparison | null;
  }

  export namespace Scope {
    export interface Comparison {
      from: string;

      kind: 'previous_period' | 'previous_year' | 'custom';

      to: string;
    }
  }

  export interface Series {
    aggregation: 'event_count' | 'unique_visitors' | 'sum' | 'average';

    breakdownValues: Array<Series.BreakdownValue>;

    comparison: 'previous_period' | 'previous_year' | 'custom' | null;

    key: string;

    label: string;

    metricId: string;

    points: Array<Series.Point>;

    rangeValue: number | null;
  }

  export namespace Series {
    export interface BreakdownValue {
      property: string;

      value: string | null;
    }

    export interface Point {
      bucketEnd: string;

      bucketStart: string;

      cumulative: number | null;

      isPartial: boolean;

      raw: number | null;

      smoothed: number | null;
    }
  }
}

export interface WebAnalyticsOverviewResponse {
  dataUpdatedAt: string;

  metrics: WebAnalyticsOverviewResponse.Metrics | null;

  timeseries: Array<WebAnalyticsOverviewResponse.Timesery> | null;
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

  export interface Timesery {
    date: string;

    value: number;
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

export interface WebAnalyticsPagesResponse {
  dataUpdatedAt: string;

  rows: Array<WebAnalyticsPagesResponse.Row>;

  totalCount: number;
}

export namespace WebAnalyticsPagesResponse {
  export interface Row {
    /**
     * Percentage from 0 to 100 of visits to the page that bounced.
     */
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

export interface WebAnalyticsCurrentVisitorsResponse {
  count: number;
}

export interface WebAnalyticsPathExplorerResponse {
  anchorSessions: number;

  hasMore: boolean;

  steps: Array<WebAnalyticsPathExplorerResponse.Step>;
}

export namespace WebAnalyticsPathExplorerResponse {
  export interface Step {
    isOther: boolean;

    isTerminal: boolean;

    key: string;

    kind: 'PAGE' | 'EVENT' | null;

    label: string;

    sessions: number;
  }
}

export interface WebAnalyticsOverviewInsightParams {
  /**
   * First included UTC calendar day (YYYY-MM-DD).
   */
  from: string;

  /**
   * Built-in traffic or click-behavior report.
   */
  preset: 'TRAFFIC' | 'BEHAVIOR';

  /**
   * Last included UTC calendar day, at most 60 days including from.
   */
  to: string;
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
   * JSON-encoded query input.
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
   * JSON-encoded query input.
   */
  filters?: string;

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
   * JSON-encoded query input.
   */
  filters?: string;

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
   * JSON-encoded query input.
   */
  filters?: string;

  /**
   * Optional web source UUID. Omit to aggregate all web sources in the account.
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
   * JSON-encoded query input.
   */
  filters?: string;

  /**
   * Optional web source UUID. Omit to aggregate all web sources in the account.
   */
  webSourceId?: string;
}

export interface WebAnalyticsCurrentVisitorsParams {
  /**
   * Optional web source UUID. Omit to count visitors across all account web sources.
   */
  webSourceId?: string;
}

export interface WebAnalyticsPathExplorerParams {
  /**
   * Inclusive lower bound of the analysis window as `YYYY-MM-DD`.
   */
  from: string;

  /**
   * JSON-encoded query input.
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
   * JSON-encoded query input.
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

export declare namespace WebAnalytics {
  export {
    type WebAnalyticsOverviewInsightResponse as WebAnalyticsOverviewInsightResponse,
    type WebAnalyticsOverviewResponse as WebAnalyticsOverviewResponse,
    type WebAnalyticsSourcesResponse as WebAnalyticsSourcesResponse,
    type WebAnalyticsPagesResponse as WebAnalyticsPagesResponse,
    type WebAnalyticsLocationsResponse as WebAnalyticsLocationsResponse,
    type WebAnalyticsDevicesResponse as WebAnalyticsDevicesResponse,
    type WebAnalyticsCurrentVisitorsResponse as WebAnalyticsCurrentVisitorsResponse,
    type WebAnalyticsPathExplorerResponse as WebAnalyticsPathExplorerResponse,
    type WebAnalyticsOverviewInsightParams as WebAnalyticsOverviewInsightParams,
    type WebAnalyticsOverviewParams as WebAnalyticsOverviewParams,
    type WebAnalyticsSourcesParams as WebAnalyticsSourcesParams,
    type WebAnalyticsPagesParams as WebAnalyticsPagesParams,
    type WebAnalyticsLocationsParams as WebAnalyticsLocationsParams,
    type WebAnalyticsDevicesParams as WebAnalyticsDevicesParams,
    type WebAnalyticsCurrentVisitorsParams as WebAnalyticsCurrentVisitorsParams,
    type WebAnalyticsPathExplorerParams as WebAnalyticsPathExplorerParams,
  };
}
