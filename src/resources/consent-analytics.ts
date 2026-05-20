// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class ConsentAnalytics extends APIResource {
  /**
   * Account-wide blocking stats from the Global Consent Center for the window: how
   * many dispatches were attempted, how many were blocked, and a per-category
   * breakdown of the blocks (with `percentageBlocked` = share of `totalDispatches`).
   * Not scoped to a single consent settings record — this aggregates across every
   * destination in the account. The endpoint is identified by query params rather
   * than a path id because the report is account-scoped; this is a documented
   * derived-read exception. Reuses the API-key scope `consentSettings:list` because
   * the report crosses every consent setting. Requires scope: consentSettings:list
   */
  list(
    query: ConsentAnalyticsListParams,
    options?: RequestOptions,
  ): APIPromise<ConsentAnalyticsListResponse> {
    return this._client.get('/rest/v1/consent-analytics', { query, ...options });
  }
}

export interface ConsentAnalyticsListResponse {
  /**
   * Per-category breakdown of blocked dispatches. `categoryName` is `Unknown` when
   * the upstream block message could not be parsed; `percentageBlocked` is the share
   * of `totalDispatches` blocked under that category.
   */
  items: Array<ConsentAnalyticsListResponse.Item>;

  /**
   * Total dispatches blocked by the Global Consent Center across all categories.
   */
  totalBlocked: number;

  /**
   * Total dispatches attempted across all destinations for the window.
   */
  totalDispatches: number;
}

export namespace ConsentAnalyticsListResponse {
  export interface Item {
    blockedCount: number;

    categoryName: string;

    percentageBlocked: number;
  }
}

export interface ConsentAnalyticsListParams {
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
}

export declare namespace ConsentAnalytics {
  export {
    type ConsentAnalyticsListResponse as ConsentAnalyticsListResponse,
    type ConsentAnalyticsListParams as ConsentAnalyticsListParams,
  };
}
