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

export declare namespace WebScanners {
  export {
    type WebScannerListResponse as WebScannerListResponse,
    type WebScannerCreateResponse as WebScannerCreateResponse,
    type WebScannerRetrieveResponse as WebScannerRetrieveResponse,
    type WebScannerUpdateResponse as WebScannerUpdateResponse,
    type WebScannerDeleteResponse as WebScannerDeleteResponse,
    type WebScannerTriggerResponse as WebScannerTriggerResponse,
    type WebScannerCreateParams as WebScannerCreateParams,
    type WebScannerUpdateParams as WebScannerUpdateParams,
  };
}
