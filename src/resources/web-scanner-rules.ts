// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class WebScannerRules extends APIResource {
  /**
   * List suppression rules for a single web scanner. Requires the `scannerId` query
   * parameter — rules are always scoped to a parent scanner. Not paginated; the
   * per-scanner rule count is bounded. Requires scope: webScanner:find
   */
  list(query: WebScannerRuleListParams, options?: RequestOptions): APIPromise<WebScannerRuleListResponse> {
    return this._client.get('/rest/v1/web-scanner-rules', { query, ...options });
  }

  /**
   * Create a suppression rule on a web scanner. Auth is enforced against the parent
   * scanner via `webScanner:update`. At least one of `cookiePatterns`,
   * `domainPatterns`, or `scriptPatterns` should be set for the rule to match
   * anything; omitted pattern arrays default to `[]`. Requires scope:
   * webScanner:update
   */
  create(
    body: WebScannerRuleCreateParams,
    options?: RequestOptions,
  ): APIPromise<WebScannerRuleCreateResponse> {
    return this._client.post('/rest/v1/web-scanner-rules', { body, ...options });
  }

  /**
   * Find a single web scanner rule by ID. Requires scope: webScanner:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<WebScannerRuleRetrieveResponse> {
    return this._client.get(path`/rest/v1/web-scanner-rules/${id}`, options);
  }

  /**
   * Partially update a suppression rule. Only the fields you send are changed.
   * List-valued fields (`cookiePatterns`, `domainPatterns`, `scriptPatterns`) are
   * replaced wholesale when sent. Requires scope: webScanner:update
   */
  update(
    id: string,
    body: WebScannerRuleUpdateParams,
    options?: RequestOptions,
  ): APIPromise<WebScannerRuleUpdateResponse> {
    return this._client.patch(path`/rest/v1/web-scanner-rules/${id}`, { body, ...options });
  }

  /**
   * Delete a web scanner rule. Requires scope: webScanner:update
   */
  delete(id: string, options?: RequestOptions): APIPromise<WebScannerRuleDeleteResponse> {
    return this._client.delete(path`/rest/v1/web-scanner-rules/${id}`, options);
  }
}

export interface WebScannerRuleListResponse {
  entities: Array<WebScannerRuleListResponse.Entity>;
}

export namespace WebScannerRuleListResponse {
  export interface Entity {
    id: string;

    accountId: string;

    cookiePatterns: Array<string>;

    createdAt: string;

    domainPatterns: Array<string>;

    name: string;

    priority: number;

    scannerId: string;

    scriptPatterns: Array<string>;

    createdByUserId?: string | null;

    notes?: string | null;

    reason?: 'approved' | 'baa' | 'compliant' | 'firstParty' | 'ignore' | 'internal' | 'other' | null;

    updatedAt?: string | null;

    updatedByUserId?: string | null;
  }
}

export interface WebScannerRuleCreateResponse {
  id: string;

  accountId: string;

  cookiePatterns: Array<string>;

  createdAt: string;

  domainPatterns: Array<string>;

  name: string;

  priority: number;

  scannerId: string;

  scriptPatterns: Array<string>;

  createdByUserId?: string | null;

  notes?: string | null;

  reason?: 'approved' | 'baa' | 'compliant' | 'firstParty' | 'ignore' | 'internal' | 'other' | null;

  updatedAt?: string | null;

  updatedByUserId?: string | null;
}

export interface WebScannerRuleRetrieveResponse {
  id: string;

  accountId: string;

  cookiePatterns: Array<string>;

  createdAt: string;

  domainPatterns: Array<string>;

  name: string;

  priority: number;

  scannerId: string;

  scriptPatterns: Array<string>;

  createdByUserId?: string | null;

  notes?: string | null;

  reason?: 'approved' | 'baa' | 'compliant' | 'firstParty' | 'ignore' | 'internal' | 'other' | null;

  updatedAt?: string | null;

  updatedByUserId?: string | null;
}

export interface WebScannerRuleUpdateResponse {
  id: string;

  accountId: string;

  cookiePatterns: Array<string>;

  createdAt: string;

  domainPatterns: Array<string>;

  name: string;

  priority: number;

  scannerId: string;

  scriptPatterns: Array<string>;

  createdByUserId?: string | null;

  notes?: string | null;

  reason?: 'approved' | 'baa' | 'compliant' | 'firstParty' | 'ignore' | 'internal' | 'other' | null;

  updatedAt?: string | null;

  updatedByUserId?: string | null;
}

export interface WebScannerRuleDeleteResponse {
  /**
   * The id of the suppression rule that was deleted.
   */
  id: string;

  /**
   * True when the rule was deleted.
   */
  deleted: boolean;
}

export interface WebScannerRuleListParams {
  /**
   * The web scanner whose suppression rules should be returned.
   */
  scannerId: string;
}

export interface WebScannerRuleCreateParams {
  /**
   * User-friendly name for the suppression rule.
   */
  name: string;

  /**
   * Rule priority (1–10,000). Lower numbers are evaluated first when multiple rules
   * match.
   */
  priority: number;

  /**
   * The web scanner this rule belongs to.
   */
  scannerId: string;

  /**
   * Glob patterns matched against cookie names (e.g. `_ga*`). Max 100 entries. When
   * sent on PATCH, replaces the existing list wholesale.
   */
  cookiePatterns?: Array<string>;

  /**
   * Glob patterns matched against cookie domain / script hostname (e.g.
   * `*.google-analytics.com`). Max 100 entries. When sent on PATCH, replaces the
   * existing list wholesale.
   */
  domainPatterns?: Array<string>;

  /**
   * Free-form notes about why this rule exists or what it covers. Trimmed
   * server-side; empty strings become `null`.
   */
  notes?: string | null;

  /**
   * Why this rule was added. Surfaced in audit views. Send `null` to clear an
   * existing reason on patch.
   */
  reason?: 'approved' | 'baa' | 'compliant' | 'firstParty' | 'ignore' | 'internal' | 'other' | null;

  /**
   * Glob patterns matched against full script URLs (e.g.
   * `https://www.googletagmanager.com/gtm.js?id=*`). Max 100 entries. When sent on
   * PATCH, replaces the existing list wholesale.
   */
  scriptPatterns?: Array<string>;
}

export interface WebScannerRuleUpdateParams {
  /**
   * Glob patterns matched against cookie names (e.g. `_ga*`). Max 100 entries. When
   * sent on PATCH, replaces the existing list wholesale.
   */
  cookiePatterns?: Array<string>;

  /**
   * Glob patterns matched against cookie domain / script hostname (e.g.
   * `*.google-analytics.com`). Max 100 entries. When sent on PATCH, replaces the
   * existing list wholesale.
   */
  domainPatterns?: Array<string>;

  name?: string;

  /**
   * Free-form notes about why this rule exists or what it covers. Trimmed
   * server-side; empty strings become `null`.
   */
  notes?: string | null;

  priority?: number;

  /**
   * Why this rule was added. Surfaced in audit views. Send `null` to clear an
   * existing reason on patch.
   */
  reason?: 'approved' | 'baa' | 'compliant' | 'firstParty' | 'ignore' | 'internal' | 'other' | null;

  /**
   * Glob patterns matched against full script URLs (e.g.
   * `https://www.googletagmanager.com/gtm.js?id=*`). Max 100 entries. When sent on
   * PATCH, replaces the existing list wholesale.
   */
  scriptPatterns?: Array<string>;
}

export declare namespace WebScannerRules {
  export {
    type WebScannerRuleListResponse as WebScannerRuleListResponse,
    type WebScannerRuleCreateResponse as WebScannerRuleCreateResponse,
    type WebScannerRuleRetrieveResponse as WebScannerRuleRetrieveResponse,
    type WebScannerRuleUpdateResponse as WebScannerRuleUpdateResponse,
    type WebScannerRuleDeleteResponse as WebScannerRuleDeleteResponse,
    type WebScannerRuleListParams as WebScannerRuleListParams,
    type WebScannerRuleCreateParams as WebScannerRuleCreateParams,
    type WebScannerRuleUpdateParams as WebScannerRuleUpdateParams,
  };
}
