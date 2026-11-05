// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

export class HeatmapPages extends APIResource {
  /**
   * List pages with heatmap coverage in a date window, ranked for triage. Each
   * entity is identified by `pageKey` (origin + pathname, query string stripped).
   * Use `queryParameterFilter` to inspect one survey step or other URL parameter
   * value; filtering narrows events without creating separate page rows. Pass the
   * same filter and returned `pageKey` to `GET /rest/v1/heatmap-pages/summary`.
   * Supports cursor pagination, with cursor depth capped at roughly 10,000 entries;
   * if you need pages beyond that, narrow `from`/`to` or add filters rather than
   * paginating further. `from`/`to` are UTC calendar days in `YYYY-MM-DD`; the
   * window must be 60 days or fewer. Requires API-key scope or current OAuth user
   * permission: web-analytics:view
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
   * comes from `GET /rest/v1/heatmap-pages`. A base key includes all query variants
   * regardless of saved splits. Reuse the same `queryParameterFilter` to scope all
   * aggregates and replay links to the selected survey step. Legacy saved split keys
   * remain supported without a filter; combining a query string in `pageKey` with
   * `queryParameterFilter` returns 400. This reads retained historical events
   * containing the parameter, requires no account setting, and does not change
   * web-analytics page paths. The endpoint is identified by query params rather than
   * a path id because heatmap pages are not stored entities; this is a documented
   * derived-read exception. `breakpoint` scopes the bin/scroll aggregations; replays
   * are returned across all breakpoints regardless of `breakpoint` (weighted to
   * cover multiple viewports) so callers can compare devices. `clickGrid` always
   * supplies fine click positions for rendering. `clickBins` derives compatible
   * 64×64 counts from the same grid; its totals must not be added to them. Requires
   * API-key scope or current OAuth user permission: web-analytics:view
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
   * Stable per-page identifier: origin + pathname with the query string stripped.
   * Query-parameter filtering narrows events without changing this key. Use the same
   * filter when requesting the page summary.
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
   * Compatibility click counts for the requested breakpoint in a 64×64
   * document-normalized grid. Use clickGrid for painting.
   */
  clickBins: Array<HeatmapPageSummaryResponse.ClickBin>;

  /**
   * Document-normalized click positions at 64×512 resolution. These are the same
   * clicks as clickBins; do not add their totals together.
   */
  clickGrid: HeatmapPageSummaryResponse.ClickGrid;

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

  /**
   * Document-normalized click positions at 64×512 resolution. These are the same
   * clicks as clickBins; do not add their totals together.
   */
  export interface ClickGrid {
    bins: Array<ClickGrid.Bin>;

    columns: 64;

    rows: 512;
  }

  export namespace ClickGrid {
    export interface Bin {
      binX: number;

      binY: number;

      clicks: number;
    }
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
    breakpoint: 'mobile' | 'tablet' | 'desktop';

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
   * Filter heatmap events by one URL query parameter, such as
   * {"name":"p","values":["Contact Details"]}. Send as JSON in an HTTP query string
   * and as an object in MCP. Matches any listed decoded value; values: [] matches
   * any non-empty value. Apply the same filter to the list and summary. Works on
   * retained historical events containing the parameter, requires no account
   * setting, and does not change web-analytics page paths.
   */
  queryParameterFilter?: string;

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
  sortBy?: 'CLICKS' | 'RAGE_RATE' | 'DEAD_RATE' | 'ISSUE_SCORE';

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
  breakpoint: 'mobile' | 'tablet' | 'desktop';

  /**
   * Inclusive lower bound of the heatmap window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window between `from` and `to` must be 60 days or
   * fewer.
   */
  from: string;

  /**
   * Base page identifier returned by the heatmap pages list. Pass it unchanged,
   * together with the same queryParameterFilter to inspect the same survey step. A
   * legacy saved split key is accepted only without queryParameterFilter; combining
   * them returns 400.
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
   * Filter heatmap events by one URL query parameter, such as
   * {"name":"p","values":["Contact Details"]}. Send as JSON in an HTTP query string
   * and as an object in MCP. Matches any listed decoded value; values: [] matches
   * any non-empty value. Apply the same filter to the list and summary. Works on
   * retained historical events containing the parameter, requires no account
   * setting, and does not change web-analytics page paths.
   */
  queryParameterFilter?: string;

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
