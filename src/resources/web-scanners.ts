// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class WebScanners extends APIResource {
  /**
   * List every web scanner for this account. Not paginated — accounts have a small
   * number of scanners in practice, so the response always fits in a single page.
   * Requires scope: webScanner:list
   */
  list(options?: RequestOptions): APIPromise<WebScannerListResponse> {
    return this._client.get('/rest/v1/web-scanners', options);
  }

  /**
   * Create a new web scanner for a root domain. A first scan is enqueued
   * automatically after creation on a best-effort basis. `rootDomain` is required;
   * missing, empty, or malformed values are rejected as HTTP 400. Everything else
   * falls back to defaults (`status: Enabled`, `urlLimit: 100`, no excluded
   * patterns, no extra seed URLs). The returned entity is the created scanner row
   * and may not yet reflect async scan-state changes. Requires scope:
   * webScanner:create
   */
  create(body: WebScannerCreateParams, options?: RequestOptions): APIPromise<WebScannerCreateResponse> {
    return this._client.post('/rest/v1/web-scanners', { body, ...options });
  }

  /**
   * Find a single web scanner by ID. Requires scope: webScanner:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<WebScannerRetrieveResponse> {
    return this._client.get(path`/rest/v1/web-scanners/${id}`, options);
  }

  /**
   * Partially update a web scanner. Only the fields you send are changed; omitted
   * fields keep their current value. List-valued fields (`excludedPatterns`,
   * `includedUrls`) are replaced wholesale when sent. If `rootDomain` is provided
   * and malformed, the request is rejected as HTTP 400. Use
   * `POST /rest/v1/web-scanners/{id}/trigger` to start a new scan after edits.
   * Requires scope: webScanner:update
   */
  update(
    id: string,
    body: WebScannerUpdateParams,
    options?: RequestOptions,
  ): APIPromise<WebScannerUpdateResponse> {
    return this._client.patch(path`/rest/v1/web-scanners/${id}`, { body, ...options });
  }

  /**
   * Delete a web scanner. Associated suppression rules are deleted in the same
   * operation. Requires scope: webScanner:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<WebScannerDeleteResponse> {
    return this._client.delete(path`/rest/v1/web-scanners/${id}`, options);
  }

  /**
   * Manually kick off a new scan for this web scanner. The request body is empty (or
   * `{}`). A successful response means the request was accepted; because the scan
   * starts asynchronously, the returned entity may still reflect pre-trigger values
   * for fields like `scanStatus` and `lastScanStartedAt`. The trigger is
   * rate-limited: a 409 is returned if another scan is already in flight, the
   * per-account cooldown has not elapsed, or the request was otherwise rejected; the
   * reason is in the response `error` field. Requires scope: webScanner:trigger
   */
  trigger(id: string, options?: RequestOptions): APIPromise<WebScannerTriggerResponse> {
    return this._client.post(path`/rest/v1/web-scanners/${id}/trigger`, options);
  }

  /**
   * List the third-party trackers (requests) found on a scan run, with their risk,
   * category, the pages they were seen on, and whether each host is already covered
   * by a CMP consent service. Defaults to the latest run; pass `date` (an ISO-8601
   * timestamp; only the calendar day is used to select the run) to read an earlier
   * run. Documented exception to the cursor-pagination standard: paginates with
   * `limit` and `offset` because each run is an immutable snapshot. A host that is
   * neither covered (`coveredByCmp: false`) nor matched by a suppression rule still
   * needs a triage decision — resolve it by adding the host to a CMP consent service
   * or by creating a suppression rule with `POST /rest/v1/web-scanner-rules`. Use
   * `GET /rest/v1/web-scanners/{id}/summary` for the rolled-up counts. Requires
   * scope: webScanner:find
   */
  findings(
    id: string,
    query: WebScannerFindingsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebScannerFindingsResponse> {
    return this._client.get(path`/rest/v1/web-scanners/${id}/findings`, { query, ...options });
  }

  /**
   * List the cookies and local-storage entries observed on a scan run. Defaults to
   * the latest run; pass `date` (an ISO-8601 timestamp; only the calendar day is
   * used to select the run) to read an earlier run. Cookies paginate with `limit`
   * and `offset` (a documented exception to the cursor-pagination standard, since
   * each run is an immutable snapshot); local-storage entries are returned in full.
   * Requires scope: webScanner:find
   */
  cookies(
    id: string,
    query: WebScannerCookiesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebScannerCookiesResponse> {
    return this._client.get(path`/rest/v1/web-scanners/${id}/cookies`, { query, ...options });
  }

  /**
   * Compliance summary for a scan run — the rolled-up "what does this site look
   * like, and what still needs a decision" view, assembled server-side so you do not
   * have to page every finding. Includes total host/vendor/cookie counts, a
   * breakdown by risk and by category, coverage (how many hosts are already covered
   * by a CMP consent service or a suppression rule vs. how many still need a
   * decision), the new/removed host delta versus the previous run, and up to 10
   * highest-risk hosts that still need a decision. Defaults to the latest run; pass
   * `date` (an ISO-8601 timestamp; only the calendar day is used to select the run)
   * to read an earlier run. Clear a host that needs a decision by adding it to a CMP
   * consent service or creating a suppression rule with
   * `POST /rest/v1/web-scanner-rules`. When the scanner has no completed runs, every
   * count is 0 and `runDate` is null. Requires scope: webScanner:find
   */
  summary(
    id: string,
    query: WebScannerSummaryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebScannerSummaryResponse> {
    return this._client.get(path`/rest/v1/web-scanners/${id}/summary`, { query, ...options });
  }
}

export interface WebScannerListResponse {
  entities: Array<WebScannerListResponse.Entity>;
}

export namespace WebScannerListResponse {
  export interface Entity {
    id: string;

    accountId: string;

    rootDomain: string;

    scanStatus: 'idle' | 'scanning';

    status: 'Disabled' | 'Enabled';

    createdAt?: string | null;

    excludedPatterns?: Array<string> | null;

    includedUrls?: Array<string> | null;

    lastRunCookieCount?: number | null;

    lastRunHighRiskRequestCount?: number | null;

    lastRunRequestCount?: number | null;

    lastRunSuccessUrlCount?: number | null;

    lastScannedAt?: string | null;

    lastScanStartedAt?: string | null;

    name?: string | null;

    updatedAt?: string | null;

    urlLimit?: number | null;
  }
}

export interface WebScannerCreateResponse {
  id: string;

  accountId: string;

  rootDomain: string;

  scanStatus: 'idle' | 'scanning';

  status: 'Disabled' | 'Enabled';

  createdAt?: string | null;

  excludedPatterns?: Array<string> | null;

  includedUrls?: Array<string> | null;

  lastRunCookieCount?: number | null;

  lastRunHighRiskRequestCount?: number | null;

  lastRunRequestCount?: number | null;

  lastRunSuccessUrlCount?: number | null;

  lastScannedAt?: string | null;

  lastScanStartedAt?: string | null;

  name?: string | null;

  updatedAt?: string | null;

  urlLimit?: number | null;
}

export interface WebScannerRetrieveResponse {
  id: string;

  accountId: string;

  rootDomain: string;

  scanStatus: 'idle' | 'scanning';

  status: 'Disabled' | 'Enabled';

  createdAt?: string | null;

  excludedPatterns?: Array<string> | null;

  includedUrls?: Array<string> | null;

  lastRunCookieCount?: number | null;

  lastRunHighRiskRequestCount?: number | null;

  lastRunRequestCount?: number | null;

  lastRunSuccessUrlCount?: number | null;

  lastScannedAt?: string | null;

  lastScanStartedAt?: string | null;

  name?: string | null;

  updatedAt?: string | null;

  urlLimit?: number | null;
}

export interface WebScannerUpdateResponse {
  id: string;

  accountId: string;

  rootDomain: string;

  scanStatus: 'idle' | 'scanning';

  status: 'Disabled' | 'Enabled';

  createdAt?: string | null;

  excludedPatterns?: Array<string> | null;

  includedUrls?: Array<string> | null;

  lastRunCookieCount?: number | null;

  lastRunHighRiskRequestCount?: number | null;

  lastRunRequestCount?: number | null;

  lastRunSuccessUrlCount?: number | null;

  lastScannedAt?: string | null;

  lastScanStartedAt?: string | null;

  name?: string | null;

  updatedAt?: string | null;

  urlLimit?: number | null;
}

export interface WebScannerDeleteResponse {
  /**
   * The id of the web scanner that was deleted.
   */
  id: string;

  /**
   * True when the scanner and its rules were deleted.
   */
  deleted: boolean;
}

export interface WebScannerTriggerResponse {
  id: string;

  accountId: string;

  rootDomain: string;

  scanStatus: 'idle' | 'scanning';

  status: 'Disabled' | 'Enabled';

  createdAt?: string | null;

  excludedPatterns?: Array<string> | null;

  includedUrls?: Array<string> | null;

  lastRunCookieCount?: number | null;

  lastRunHighRiskRequestCount?: number | null;

  lastRunRequestCount?: number | null;

  lastRunSuccessUrlCount?: number | null;

  lastScannedAt?: string | null;

  lastScanStartedAt?: string | null;

  name?: string | null;

  updatedAt?: string | null;

  urlLimit?: number | null;
}

export interface WebScannerFindingsResponse {
  /**
   * True when more findings are available beyond the current window.
   */
  hasMore: boolean;

  /**
   * Third-party trackers seen on the run. `coveredByCmp` is true when the host is
   * already mapped to a CMP consent service; `risk` is high/medium/low/unknown.
   * Hosts that are neither covered nor matched by a suppression rule are the ones
   * that need a triage decision — clear them by adding the host to a CMP consent
   * service or creating a suppression rule (POST /rest/v1/web-scanner-rules).
   */
  items: Array<WebScannerFindingsResponse.Item>;

  /**
   * Total number of findings in the run.
   */
  total: number;
}

export namespace WebScannerFindingsResponse {
  export interface Item {
    coveredByCmp: boolean;

    hostname: string;

    seenOn: Array<string>;

    types: Array<
      | 'audio'
      | 'beacon'
      | 'document'
      | 'eventsource'
      | 'fetch'
      | 'font'
      | 'image'
      | 'manifest'
      | 'media'
      | 'other'
      | 'ping'
      | 'prefetch'
      | 'script'
      | 'stylesheet'
      | 'texttrack'
      | 'video'
      | 'websocket'
      | 'xhr'
    >;

    urls: Array<string>;

    category?: string | null;

    cookies?: Array<Item.Cookie> | null;

    coveredByVendorLabel?: string | null;

    displayName?: string | null;

    privacyKeywords?: Array<string> | null;

    risk?: string | null;
  }

  export namespace Item {
    export interface Cookie {
      name: string;

      domain?: string | null;

      path?: string | null;

      value?: string | null;
    }
  }
}

export interface WebScannerCookiesResponse {
  /**
   * Cookies observed on the run, paginated by `limit`/`offset`.
   */
  cookies: Array<WebScannerCookiesResponse.Cookie>;

  /**
   * True when more cookies are available beyond the current window.
   */
  hasMore: boolean;

  /**
   * Local-storage entries observed on the run. Returned in full (not paginated).
   */
  localStorage: Array<WebScannerCookiesResponse.LocalStorage>;

  totalCookies: number;

  totalLocalStorage: number;
}

export namespace WebScannerCookiesResponse {
  export interface Cookie {
    name: string;

    domain?: string | null;

    path?: string | null;

    value?: string | null;
  }

  export interface LocalStorage {
    name: string;

    value?: string | null;
  }
}

export interface WebScannerSummaryResponse {
  byCategory: Array<WebScannerSummaryResponse.ByCategory>;

  cookieCount: number;

  countsByRisk: WebScannerSummaryResponse.CountsByRisk;

  coverage: WebScannerSummaryResponse.Coverage;

  hostCount: number;

  localStorageCount: number;

  rootDomain: string;

  scannerId: string;

  scanStatus: 'idle' | 'scanning';

  /**
   * Up to 10 hosts that still need a decision (neither CMP-covered nor suppressed),
   * highest risk first. Clear each by adding the host to a CMP consent service or
   * creating a suppression rule (POST /rest/v1/web-scanner-rules) with the reason
   * that explains why it is allowed (baa, internal, approved, compliant, firstParty,
   * ignore).
   */
  topUncoveredHosts: Array<WebScannerSummaryResponse.TopUncoveredHost>;

  vendorCount: number;

  delta?: WebScannerSummaryResponse.Delta | null;

  runDate?: string | null;
}

export namespace WebScannerSummaryResponse {
  export interface ByCategory {
    category: string;

    hostCount: number;
  }

  export interface CountsByRisk {
    high: number;

    low: number;

    medium: number;

    unknown: number;
  }

  export interface Coverage {
    coveragePercent: number;

    coveredHostCount: number;

    needsDecisionHostCount: number;

    totalHostCount: number;
  }

  export interface TopUncoveredHost {
    coveredByCmp: boolean;

    hostname: string;

    seenOn: Array<string>;

    types: Array<
      | 'audio'
      | 'beacon'
      | 'document'
      | 'eventsource'
      | 'fetch'
      | 'font'
      | 'image'
      | 'manifest'
      | 'media'
      | 'other'
      | 'ping'
      | 'prefetch'
      | 'script'
      | 'stylesheet'
      | 'texttrack'
      | 'video'
      | 'websocket'
      | 'xhr'
    >;

    urls: Array<string>;

    category?: string | null;

    cookies?: Array<TopUncoveredHost.Cookie> | null;

    coveredByVendorLabel?: string | null;

    displayName?: string | null;

    privacyKeywords?: Array<string> | null;

    risk?: string | null;
  }

  export namespace TopUncoveredHost {
    export interface Cookie {
      name: string;

      domain?: string | null;

      path?: string | null;

      value?: string | null;
    }
  }

  export interface Delta {
    newHostCount: number;

    removedHostCount: number;
  }
}

export interface WebScannerCreateParams {
  /**
   * Root domain to crawl (e.g. `example.com`). Required on create. Missing or empty
   * values fail request validation as HTTP 400. Present-but-malformed values are
   * rejected as HTTP 400 with the validation reason in `details`.
   */
  rootDomain: string;

  /**
   * URL glob patterns to skip during crawl. Max 100 entries.
   */
  excludedPatterns?: Array<string> | null;

  /**
   * Additional seed URLs to include as crawl entry points. Each must be an http(s)
   * URL. Max 100 entries.
   */
  includedUrls?: Array<string> | null;

  name?: string | null;

  status?: 'Disabled' | 'Enabled';

  /**
   * Maximum URLs to crawl per scan (1–20,000). Defaults to 100 when omitted.
   */
  urlLimit?: number | null;
}

export interface WebScannerUpdateParams {
  excludedPatterns?: Array<string> | null;

  includedUrls?: Array<string> | null;

  name?: string | null;

  /**
   * Replace the scanner root domain. When provided, malformed values are rejected as
   * HTTP 400 with the validation reason in `details`.
   */
  rootDomain?: string | null;

  status?: 'Disabled' | 'Enabled';

  urlLimit?: number | null;
}

export interface WebScannerFindingsParams {
  /**
   * Which scan run to read, as an ISO-8601 timestamp. Only the UTC calendar day is
   * used to select the run; the time component is ignored. Defaults to the most
   * recent run when omitted.
   */
  date?: string;

  /**
   * Maximum number of findings to return. Defaults to 25; clamped to 1–100.
   */
  limit?: number;

  /**
   * Skip this many findings before returning. Use with `limit` for load-more paging.
   */
  offset?: number | null;
}

export interface WebScannerCookiesParams {
  /**
   * Which scan run to read, as an ISO-8601 timestamp. Only the UTC calendar day is
   * used to select the run; the time component is ignored. Defaults to the most
   * recent run when omitted.
   */
  date?: string;

  /**
   * Maximum number of findings to return. Defaults to 25; clamped to 1–100.
   */
  limit?: number;

  /**
   * Skip this many findings before returning. Use with `limit` for load-more paging.
   */
  offset?: number | null;
}

export interface WebScannerSummaryParams {
  /**
   * Which scan run to read, as an ISO-8601 timestamp. Only the UTC calendar day is
   * used to select the run; the time component is ignored. Defaults to the most
   * recent run when omitted.
   */
  date?: string;
}

export declare namespace WebScanners {
  export {
    type WebScannerListResponse as WebScannerListResponse,
    type WebScannerCreateResponse as WebScannerCreateResponse,
    type WebScannerRetrieveResponse as WebScannerRetrieveResponse,
    type WebScannerUpdateResponse as WebScannerUpdateResponse,
    type WebScannerDeleteResponse as WebScannerDeleteResponse,
    type WebScannerTriggerResponse as WebScannerTriggerResponse,
    type WebScannerFindingsResponse as WebScannerFindingsResponse,
    type WebScannerCookiesResponse as WebScannerCookiesResponse,
    type WebScannerSummaryResponse as WebScannerSummaryResponse,
    type WebScannerCreateParams as WebScannerCreateParams,
    type WebScannerUpdateParams as WebScannerUpdateParams,
    type WebScannerFindingsParams as WebScannerFindingsParams,
    type WebScannerCookiesParams as WebScannerCookiesParams,
    type WebScannerSummaryParams as WebScannerSummaryParams,
  };
}
