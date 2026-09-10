// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Attribution extends APIResource {
  /**
   * Returns the top-15 values for each UTM dimension (source, medium, campaign,
   * content, term, name) and referring domain attributed to the conversion event on
   * a first-touch basis for the given date window. Use `from`/`to` to set the
   * analysis window (max 60 days). Optionally filter to a specific UTM combo with
   * `utmSource`, `utmMedium`, etc. The counts represent unique visitors who
   * performed the specified `eventName` and were attributed to each UTM value.
   * Requires scope: web-analytics:view
   */
  initial(query: AttributionInitialParams, options?: RequestOptions): APIPromise<AttributionInitialResponse> {
    return this._client.get('/rest/v1/attribution/initial', { query, ...options });
  }

  /**
   * Returns the top-15 values for each UTM dimension (source, medium, campaign,
   * content, term, name) and referring domain attributed to the conversion event on
   * a last-touch basis for the given date window. Use `from`/`to` to set the
   * analysis window (max 60 days). The counts represent unique visitors who
   * performed the specified `eventName` and were attributed to each UTM value on
   * their most recent session. Requires scope: web-analytics:view
   */
  lastTouch(
    query: AttributionLastTouchParams,
    options?: RequestOptions,
  ): APIPromise<AttributionLastTouchResponse> {
    return this._client.get('/rest/v1/attribution/last-touch', { query, ...options });
  }

  /**
   * Multi-touch conversion attribution: returns a source → medium → campaign
   * hierarchy with attributed converter credits distributed according to the
   * selected `attributionModel`. Scoped to all web sources by default; optionally
   * narrow to a single web source via `webSourceId`. Date range is capped at 31
   * days; lookback window is capped at 60 days. Requires scope: web-analytics:view
   */
  conversion(
    query: AttributionConversionParams,
    options?: RequestOptions,
  ): APIPromise<AttributionConversionResponse> {
    return this._client.get('/rest/v1/attribution/conversion', { query, ...options });
  }

  /**
   * Audience performance conversion report: returns a summary of converters and
   * conversion rate for the selected event and date window, a per-day timeseries,
   * and a UTM source/medium/campaign breakdown. Optionally compare against the
   * preceding period of equal length when `attributionWindow` is `IN_RANGE`. Date
   * range is capped at 60 days. Requires scope: web-analytics:view
   */
  audienceConversion(
    query: AttributionAudienceConversionParams,
    options?: RequestOptions,
  ): APIPromise<AttributionAudienceConversionResponse> {
    return this._client.get('/rest/v1/attribution/audience-conversion', { query, ...options });
  }

  /**
   * Compare up to 5 UTM dimension combinations side-by-side for a single conversion
   * event. Each combo returns the unique visitors, sessions, total events, and
   * derived conversion rate for that UTM filter within the window. Requires both
   * `web-analytics:view` and `report:event-count-by-day` API-key scopes. Date range
   * is capped at 31 days. Pass `combos` as a single JSON-encoded array:
   * `combos=[{"utmSource":"google","utmMedium":"cpc"},{"utmSource":"meta"}]`.
   * Requires scope: web-analytics:view
   */
  utmComparison(
    query: AttributionUtmComparisonParams,
    options?: RequestOptions,
  ): APIPromise<AttributionUtmComparisonResponse> {
    return this._client.get('/rest/v1/attribution/utm-comparison', { query, ...options });
  }
}

export interface AttributionInitialResponse {
  initial_referring_domain: Array<AttributionInitialResponse.InitialReferringDomain>;

  initial_utm_campaign: Array<AttributionInitialResponse.InitialUtmCampaign>;

  initial_utm_content: Array<AttributionInitialResponse.InitialUtmContent>;

  initial_utm_medium: Array<AttributionInitialResponse.InitialUtmMedium>;

  initial_utm_name: Array<AttributionInitialResponse.InitialUtmName>;

  initial_utm_source: Array<AttributionInitialResponse.InitialUtmSource>;

  initial_utm_term: Array<AttributionInitialResponse.InitialUtmTerm>;
}

export namespace AttributionInitialResponse {
  export interface InitialReferringDomain {
    count: number;

    value: string;
  }

  export interface InitialUtmCampaign {
    count: number;

    value: string;
  }

  export interface InitialUtmContent {
    count: number;

    value: string;
  }

  export interface InitialUtmMedium {
    count: number;

    value: string;
  }

  export interface InitialUtmName {
    count: number;

    value: string;
  }

  export interface InitialUtmSource {
    count: number;

    value: string;
  }

  export interface InitialUtmTerm {
    count: number;

    value: string;
  }
}

export interface AttributionLastTouchResponse {
  referring_domain: Array<AttributionLastTouchResponse.ReferringDomain>;

  utm_campaign: Array<AttributionLastTouchResponse.UtmCampaign>;

  utm_content: Array<AttributionLastTouchResponse.UtmContent>;

  utm_medium: Array<AttributionLastTouchResponse.UtmMedium>;

  utm_name: Array<AttributionLastTouchResponse.UtmName>;

  utm_source: Array<AttributionLastTouchResponse.UtmSource>;

  utm_term: Array<AttributionLastTouchResponse.UtmTerm>;
}

export namespace AttributionLastTouchResponse {
  export interface ReferringDomain {
    count: number;

    value: string;
  }

  export interface UtmCampaign {
    count: number;

    value: string;
  }

  export interface UtmContent {
    count: number;

    value: string;
  }

  export interface UtmMedium {
    count: number;

    value: string;
  }

  export interface UtmName {
    count: number;

    value: string;
  }

  export interface UtmSource {
    count: number;

    value: string;
  }

  export interface UtmTerm {
    count: number;

    value: string;
  }
}

export interface AttributionConversionResponse {
  isTruncated: boolean;

  maxLeafRows: number;

  nodes: Array<AttributionConversionResponse.Node>;

  summary: AttributionConversionResponse.Summary;

  totalLeafRows: number;
}

export namespace AttributionConversionResponse {
  export interface Node {
    attributedConverterCredit: number;

    converters: number;

    level: 'SOURCE' | 'MEDIUM' | 'CAMPAIGN';

    sessions: number;

    source: string;

    campaign?: string | null;

    medium?: string | null;
  }

  export interface Summary {
    attributedConverters: number;

    scopeConverters: number;

    totalEventConverters: number;

    totalSessions: number;
  }
}

export interface AttributionAudienceConversionResponse {
  breakdown: Array<AttributionAudienceConversionResponse.Breakdown>;

  summary: AttributionAudienceConversionResponse.Summary;

  timeseries: Array<AttributionAudienceConversionResponse.Timesery>;

  previousSummary?: AttributionAudienceConversionResponse.PreviousSummary | null;
}

export namespace AttributionAudienceConversionResponse {
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

export interface AttributionUtmComparisonResponse {
  /**
   * Per-combo metrics in the same order as the input `combos` array.
   */
  combos: Array<AttributionUtmComparisonResponse.Combo>;

  /**
   * The conversion event that was analyzed.
   */
  eventName: string;

  /**
   * The requested date range as returned by the server.
   */
  range: AttributionUtmComparisonResponse.Range;
}

export namespace AttributionUtmComparisonResponse {
  export interface Combo {
    combo: Combo.Combo;

    conversionRate: number;

    events: number;

    sessions: number;

    visitors: number;
  }

  export namespace Combo {
    export interface Combo {
      utmCampaign?: string | null;

      utmContent?: string | null;

      utmMedium?: string | null;

      utmSource?: string | null;

      utmTerm?: string | null;
    }
  }

  /**
   * The requested date range as returned by the server.
   */
  export interface Range {
    from: string;

    to: string;
  }
}

export interface AttributionInitialParams {
  /**
   * Conversion event to count. Must be a selectable conversion event.
   */
  eventName: string;

  /**
   * Inclusive lower bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window between `from` and `to` must be 60 days or
   * fewer.
   */
  from: string;

  /**
   * Inclusive upper bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window between `from` and `to` must be 60 days or
   * fewer.
   */
  to: string;

  /**
   * Attribution type for UTM filter matching. Defaults to `INITIAL`.
   */
  attributionType?: 'INITIAL' | 'LAST_TOUCH';

  /**
   * Filter by UTM campaign.
   */
  utmCampaign?: string;

  /**
   * Filter by UTM content.
   */
  utmContent?: string;

  /**
   * Filter by UTM medium.
   */
  utmMedium?: string;

  /**
   * Filter by UTM name.
   */
  utmName?: string;

  /**
   * Filter by UTM source.
   */
  utmSource?: string;

  /**
   * Filter by UTM term.
   */
  utmTerm?: string;
}

export interface AttributionLastTouchParams {
  /**
   * Conversion event to count. Must be a selectable conversion event.
   */
  eventName: string;

  /**
   * Inclusive lower bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window between `from` and `to` must be 60 days or
   * fewer.
   */
  from: string;

  /**
   * Inclusive upper bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window between `from` and `to` must be 60 days or
   * fewer.
   */
  to: string;

  /**
   * Attribution type for UTM filter matching. Defaults to `LAST_TOUCH`.
   */
  attributionType?: 'INITIAL' | 'LAST_TOUCH';

  /**
   * Filter by UTM campaign.
   */
  utmCampaign?: string;

  /**
   * Filter by UTM content.
   */
  utmContent?: string;

  /**
   * Filter by UTM medium.
   */
  utmMedium?: string;

  /**
   * Filter by UTM name.
   */
  utmName?: string;

  /**
   * Filter by UTM source.
   */
  utmSource?: string;

  /**
   * Filter by UTM term.
   */
  utmTerm?: string;
}

export interface AttributionConversionParams {
  /**
   * Attribution model to apply to multi-touch conversion paths.
   */
  attributionModel: 'FIRST_TOUCH' | 'LAST_TOUCH' | 'LINEAR' | 'POSITION_BASED';

  /**
   * Conversion event to attribute. Must be a selectable conversion event.
   */
  eventName: string;

  /**
   * Inclusive lower bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window between `from` and `to` must be 31 days or
   * fewer.
   */
  from: string;

  /**
   * Inclusive upper bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window between `from` and `to` must be 31 days or
   * fewer.
   */
  to: string;

  /**
   * Maximum number of leaf-level attribution rows to return. Defaults to 1000.
   */
  limit?: number;

  /**
   * How far back before each conversion to consider touchpoints. Capped at 60 days
   * for this report. Defaults to `THIRTY_DAYS`.
   */
  lookbackWindow?:
    | 'SEVEN_DAYS'
    | 'FOURTEEN_DAYS'
    | 'THIRTY_DAYS'
    | 'SIXTY_DAYS'
    | 'NINETY_DAYS'
    | 'ONE_HUNDRED_EIGHTY_DAYS'
    | 'UNLIMITED';

  /**
   * Scope to a single web source by id, or omit for all sources (account-wide).
   */
  webSourceId?: string;
}

export interface AttributionAudienceConversionParams {
  /**
   * Conversion event to analyze.
   */
  eventName: string;

  /**
   * Inclusive lower bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window between `from` and `to` must be 60 days or
   * fewer.
   */
  from: string;

  /**
   * Inclusive upper bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window between `from` and `to` must be 60 days or
   * fewer.
   */
  to: string;

  /**
   * Attribution window: `IN_RANGE` or a number of lookback days (e.g. `7`, `30`).
   * Defaults to `IN_RANGE`.
   */
  attributionWindow?: string;

  /**
   * Event property to sum as conversion value.
   */
  valueProperty?: string;
}

export interface AttributionUtmComparisonParams {
  /**
   * JSON-encoded array of UTM dimension combos to compare side-by-side (min 1, max
   * 5). Each combo is an object with optional `utmSource`, `utmMedium`,
   * `utmCampaign`, `utmContent`, `utmTerm` fields.
   */
  combos: string;

  /**
   * Conversion event to compare across UTM combos.
   */
  eventName: string;

  /**
   * Inclusive lower bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window between `from` and `to` must be 31 days or
   * fewer.
   */
  from: string;

  /**
   * Inclusive upper bound of the analytics window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window between `from` and `to` must be 31 days or
   * fewer.
   */
  to: string;
}

export declare namespace Attribution {
  export {
    type AttributionInitialResponse as AttributionInitialResponse,
    type AttributionLastTouchResponse as AttributionLastTouchResponse,
    type AttributionConversionResponse as AttributionConversionResponse,
    type AttributionAudienceConversionResponse as AttributionAudienceConversionResponse,
    type AttributionUtmComparisonResponse as AttributionUtmComparisonResponse,
    type AttributionInitialParams as AttributionInitialParams,
    type AttributionLastTouchParams as AttributionLastTouchParams,
    type AttributionConversionParams as AttributionConversionParams,
    type AttributionAudienceConversionParams as AttributionAudienceConversionParams,
    type AttributionUtmComparisonParams as AttributionUtmComparisonParams,
  };
}
