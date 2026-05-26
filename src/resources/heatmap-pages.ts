// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

export class HeatmapPages extends APIResource {
  /**
   * List pages with heatmap coverage in a date window, ranked for triage. Each
   * entity is identified by `pageKey` (origin + pathname, query string stripped);
   * use that value to drill into `GET /rest/v1/heatmap-pages/summary`. Supports
   * cursor pagination, with cursor depth capped at roughly 10,000 entries; if you
   * need pages beyond that, narrow `from`/`to` or add filters rather than paginating
   * further. `from`/`to` are UTC calendar days in `YYYY-MM-DD`; the window must be
   * 60 days or fewer. Requires scope: web-analytics:view
   */
  list(
    query: HeatmapPageListParams,
    options?: RequestOptions,
  ): PagePromise<HeatmapPageListResponsesCursor, HeatmapPageListResponse> {
    return this._client.getAPIList('/rest/v1/heatmap-pages', Cursor<HeatmapPageListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Bundled per-page heatmap rollup: click bins, dead clicks, rage clicks, scroll
   * depth, and up to 5 curated in-app replay URLs in a single payload. Designed as a
   * one-call diagnosis surface for an AI assistant or marketer — answers "what is
   * happening on this page?" without fanning out across five endpoints. `pageKey`
   * comes from `GET /rest/v1/heatmap-pages`. The endpoint is identified by query
   * params rather than a path id because heatmap pages are not stored entities; this
   * is a documented derived-read exception. `breakpoint` scopes the bin/scroll
   * aggregations; replays are returned across all breakpoints regardless of
   * `breakpoint` (weighted to cover multiple viewports) so callers can compare
   * devices. Requires scope: web-analytics:view
   */
  summary(query: HeatmapPageSummaryParams, options?: RequestOptions): APIPromise<HeatmapPageSummaryResponse> {
    return this._client.get('/rest/v1/heatmap-pages/summary', { query, ...options });
  }
}

export type HeatmapPageListResponsesCursor = Cursor<HeatmapPageListResponse>;

export interface HeatmapPageListResponse {
  breakpoints: Array<HeatmapPageListResponse.Breakpoint>;

  deadClicks: number;

  deadRate: number;

  issueScore: number;

  /**
   * Stable per-page identifier (origin + pathname, query string stripped). Use this
   * as the `pageKey` argument to `GET /rest/v1/heatmap-pages/summary` and the
   * heatmap MCP tools.
   */
  pageKey: string;

  rageClicks: number;

  rageRate: number;

  totalClicks: number;
}

export namespace HeatmapPageListResponse {
  export interface Breakpoint {
    breakpoint: string;

    clicks: number;
  }
}

export interface HeatmapPageSummaryResponse {
  /**
   * Aggregated click positions for the requested breakpoint, bucketed into a 64×64
   * grid normalized to the page viewport.
   */
  clickBins: Array<HeatmapPageSummaryResponse.ClickBin>;

  /**
   * Click positions where no interactive element was hit. `topElement` is the
   * most-frequently-clicked non-interactive ancestor tag at that bucket, if
   * attributable.
   */
  deadClicks: Array<HeatmapPageSummaryResponse.DeadClick>;

  /**
   * Click positions where repeated clicks were detected within a short window.
   */
  rageClicks: Array<HeatmapPageSummaryResponse.RageClick>;

  /**
   * Up to 5 curated replay links for this page, ranked by engagement and weighted to
   * cover multiple viewport breakpoints when possible. Each entry is an absolute URL
   * into the OursPrivacy web app — open it to view the recorded session.
   */
  replays: Array<HeatmapPageSummaryResponse.Replay>;

  /**
   * Distribution of how far visitors scrolled, bucketed in percent of page height.
   * `sessions` is the count of distinct sessions that reached at least that bucket.
   */
  scrollDepth: Array<HeatmapPageSummaryResponse.ScrollDepth>;
}

export namespace HeatmapPageSummaryResponse {
  export interface ClickBin {
    binX: number;

    binY: number;

    clicks: number;
  }

  export interface DeadClick {
    binX: number;

    binY: number;

    deadClicks: number;

    topElement?: string | null;
  }

  export interface RageClick {
    binX: number;

    binY: number;

    rageEvents: number;

    totalClicks: number;
  }

  export interface Replay {
    /**
     * Viewport bucket the session was recorded under.
     */
    breakpoint: 'desktop' | 'mobile' | 'tablet';

    /**
     * Absolute link to view the session replay in the OursPrivacy web app. Opens the
     * replayer pre-scoped to this session, visitor, and date.
     */
    url: string;
  }

  export interface ScrollDepth {
    bucket: number;

    sessions: number;
  }
}

export interface HeatmapPageListParams extends CursorParams {
  /**
   * Inclusive lower bound of the heatmap window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window between `from` and `to` must be 60 days or
   * fewer.
   */
  from: string;

  /**
   * Inclusive upper bound of the heatmap window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window between `from` and `to` must be 60 days or
   * fewer.
   */
  to: string;

  /**
   * Filter by browser name as captured on events.
   */
  browserName?: string;

  /**
   * Filter by visitor country (ISO country name or code as stored on events).
   */
  country?: string;

  /**
   * Filter by visitor region (state/province as stored on events).
   */
  region?: string;

  /**
   * Case-insensitive substring match against `pageKey`.
   */
  search?: string;

  /**
   * Sort key. Defaults to `CLICKS` (descending).
   */
  sortBy?: 'CLICKS' | 'DEAD_RATE' | 'ISSUE_SCORE' | 'RAGE_RATE';

  /**
   * Sort direction. Defaults to `DESC`.
   */
  sortDir?: 'ASC' | 'DESC';
}

export interface HeatmapPageSummaryParams {
  /**
   * Viewport bucket the click, dead-click, rage, and scroll-depth aggregations are
   * computed for. Replays are returned for all breakpoints regardless of this value
   * so callers can compare across devices.
   */
  breakpoint: 'desktop' | 'mobile' | 'tablet';

  /**
   * Inclusive lower bound of the heatmap window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window between `from` and `to` must be 60 days or
   * fewer.
   */
  from: string;

  /**
   * Page identifier returned by `GET /rest/v1/heatmap-pages`. Origin + pathname with
   * the query string stripped (e.g. `https://example.com/pricing`).
   */
  pageKey: string;

  /**
   * Inclusive upper bound of the heatmap window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window between `from` and `to` must be 60 days or
   * fewer.
   */
  to: string;

  /**
   * Filter by browser name as captured on events.
   */
  browserName?: string;

  /**
   * Filter by visitor country (ISO country name or code as stored on events).
   */
  country?: string;

  /**
   * Filter by visitor region (state/province as stored on events).
   */
  region?: string;
}

export declare namespace HeatmapPages {
  export {
    type HeatmapPageListResponse as HeatmapPageListResponse,
    type HeatmapPageSummaryResponse as HeatmapPageSummaryResponse,
    type HeatmapPageListResponsesCursor as HeatmapPageListResponsesCursor,
    type HeatmapPageListParams as HeatmapPageListParams,
    type HeatmapPageSummaryParams as HeatmapPageSummaryParams,
  };
}
