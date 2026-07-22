// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Sources extends APIResource {
  /**
   * List all sources for this account. Supports cursor pagination and optional
   * filters for `type`, `status`, and `nameContains`. Results are sorted by creation
   * date descending. Requires scope: source:list
   */
  list(
    query: SourceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SourceListResponsesCursor, SourceListResponse> {
    return this._client.getAPIList('/rest/v1/sources', Cursor<SourceListResponse>, { query, ...options });
  }

  /**
   * Create a new source. Returns the full source entity (same shape as GET
   * /sources/{id}) so callers can read all server-assigned fields without a
   * follow-up GET. Requires scope: source:create
   */
  create(body: SourceCreateParams, options?: RequestOptions): APIPromise<SourceCreateResponse> {
    return this._client.post('/rest/v1/sources', { body, ...options });
  }

  /**
   * Find a single source by ID. Requires scope: source:view
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<SourceRetrieveResponse> {
    return this._client.get(path`/rest/v1/sources/${id}`, options);
  }

  /**
   * Partially update a source. Only the fields you send are changed; omitted fields
   * are unchanged. Send explicit `null` to clear a nullable field. Returns the full
   * source entity after the update. Requires scope: source:update
   */
  update(id: string, body: SourceUpdateParams, options?: RequestOptions): APIPromise<SourceUpdateResponse> {
    return this._client.patch(path`/rest/v1/sources/${id}`, { body, ...options });
  }

  /**
   * Delete a source. Requires scope: source:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<SourceDeleteResponse> {
    return this._client.delete(path`/rest/v1/sources/${id}`, options);
  }

  /**
   * Returns the install or ingest tokens for a source. The response is a
   * discriminated union on `sourceType`: pixel sources return
   * `{ sourceType: "pixel", token, testToken, installScript, testInstallScript }`,
   * and webhook sources return
   * `{ sourceType: "webhook", token, testToken, ingestUrl, testIngestUrl, sampleCurl }`.
   * Inspect the source's `type` field (`GET /rest/v1/sources/{id}`) to know which
   * variant to expect. Requires scope: source:view
   */
  tokens(id: string, options?: RequestOptions): APIPromise<SourceTokensResponse> {
    return this._client.get(path`/rest/v1/sources/${id}/tokens`, options);
  }
}

export type SourceListResponsesCursor = Cursor<SourceListResponse>;

export interface SourceListResponse {
  id: string;

  /**
   * Organization id that owns this source.
   */
  accountId: string;

  createdAt: string;

  status: 'Disabled' | 'Enabled';

  type:
    | 'AlchemerWebhook'
    | 'AndroidNativeApi'
    | 'Branch'
    | 'CSharpApi'
    | 'CalComWebhooks'
    | 'CalendlyWebhook'
    | 'CallRail'
    | 'CallTrackingMetrics'
    | 'DotNetApi'
    | 'FacebookLeadAds'
    | 'FormsortWebhooks'
    | 'Formstack'
    | 'GoLangApi'
    | 'HTTPApiSource'
    | 'Healthie'
    | 'HubspotAppActions'
    | 'HubspotFormWebhook'
    | 'JotFormWebhooks'
    | 'KotlinApi'
    | 'NodejsApi'
    | 'PHPApi'
    | 'PixelImage'
    | 'PythonApi'
    | 'ReactNativeApi'
    | 'RedirectSource'
    | 'RubyApi'
    | 'SegmentWebPlugin'
    | 'TypeformWebhooks'
    | 'WebSource'
    | 'Webhook'
    | 'WhatConverts'
    | 'iOSNativeApi';

  botControlMode?: string | null;

  botScoreThreshold?: number | null;

  excludeRequestContext?: boolean | null;

  /**
   * Whether this source exists in the currently published version. A source that is
   * not published will not accept events.
   */
  isPublished?: boolean | null;

  /**
   * ISO-8601 timestamp of the most recent event from this source successfully
   * dispatched to a destination.
   */
  lastDispatchedAt?: string | null;

  /**
   * ISO-8601 timestamp of the most recent inbound request received by this source.
   * Useful for debugging "is my webhook even reaching us?"
   */
  lastTriggeredAt?: string | null;

  name?: string | null;

  probabilisticIdentity?: unknown | null;

  projectAPIKey?: string | null;

  redirectUrl?: string | null;

  selectedAccountId?: string | null;

  /**
   * Limits which domains can send events to the CDP. When set, only requests from
   * these domains are accepted for this source. Separate from experiment settings
   * `whitelistDomains`, which limits which domains can load your experiments.
   */
  whitelistDomains?: Array<string> | null;

  whitelistIps?: Array<string> | null;
}

export interface SourceCreateResponse {
  id: string;

  /**
   * Organization id that owns this source.
   */
  accountId: string;

  createdAt: string;

  status: 'Disabled' | 'Enabled';

  type:
    | 'AlchemerWebhook'
    | 'AndroidNativeApi'
    | 'Branch'
    | 'CSharpApi'
    | 'CalComWebhooks'
    | 'CalendlyWebhook'
    | 'CallRail'
    | 'CallTrackingMetrics'
    | 'DotNetApi'
    | 'FacebookLeadAds'
    | 'FormsortWebhooks'
    | 'Formstack'
    | 'GoLangApi'
    | 'HTTPApiSource'
    | 'Healthie'
    | 'HubspotAppActions'
    | 'HubspotFormWebhook'
    | 'JotFormWebhooks'
    | 'KotlinApi'
    | 'NodejsApi'
    | 'PHPApi'
    | 'PixelImage'
    | 'PythonApi'
    | 'ReactNativeApi'
    | 'RedirectSource'
    | 'RubyApi'
    | 'SegmentWebPlugin'
    | 'TypeformWebhooks'
    | 'WebSource'
    | 'Webhook'
    | 'WhatConverts'
    | 'iOSNativeApi';

  botControlMode?: string | null;

  botScoreThreshold?: number | null;

  excludeRequestContext?: boolean | null;

  /**
   * Whether this source exists in the currently published version. A source that is
   * not published will not accept events.
   */
  isPublished?: boolean | null;

  /**
   * ISO-8601 timestamp of the most recent event from this source successfully
   * dispatched to a destination.
   */
  lastDispatchedAt?: string | null;

  /**
   * ISO-8601 timestamp of the most recent inbound request received by this source.
   * Useful for debugging "is my webhook even reaching us?"
   */
  lastTriggeredAt?: string | null;

  name?: string | null;

  probabilisticIdentity?: unknown | null;

  projectAPIKey?: string | null;

  redirectUrl?: string | null;

  selectedAccountId?: string | null;

  /**
   * Limits which domains can send events to the CDP. When set, only requests from
   * these domains are accepted for this source. Separate from experiment settings
   * `whitelistDomains`, which limits which domains can load your experiments.
   */
  whitelistDomains?: Array<string> | null;

  whitelistIps?: Array<string> | null;
}

export interface SourceRetrieveResponse {
  id: string;

  /**
   * Organization id that owns this source.
   */
  accountId: string;

  createdAt: string;

  status: 'Disabled' | 'Enabled';

  type:
    | 'AlchemerWebhook'
    | 'AndroidNativeApi'
    | 'Branch'
    | 'CSharpApi'
    | 'CalComWebhooks'
    | 'CalendlyWebhook'
    | 'CallRail'
    | 'CallTrackingMetrics'
    | 'DotNetApi'
    | 'FacebookLeadAds'
    | 'FormsortWebhooks'
    | 'Formstack'
    | 'GoLangApi'
    | 'HTTPApiSource'
    | 'Healthie'
    | 'HubspotAppActions'
    | 'HubspotFormWebhook'
    | 'JotFormWebhooks'
    | 'KotlinApi'
    | 'NodejsApi'
    | 'PHPApi'
    | 'PixelImage'
    | 'PythonApi'
    | 'ReactNativeApi'
    | 'RedirectSource'
    | 'RubyApi'
    | 'SegmentWebPlugin'
    | 'TypeformWebhooks'
    | 'WebSource'
    | 'Webhook'
    | 'WhatConverts'
    | 'iOSNativeApi';

  botControlMode?: string | null;

  botScoreThreshold?: number | null;

  excludeRequestContext?: boolean | null;

  /**
   * Whether this source exists in the currently published version. A source that is
   * not published will not accept events.
   */
  isPublished?: boolean | null;

  /**
   * ISO-8601 timestamp of the most recent event from this source successfully
   * dispatched to a destination.
   */
  lastDispatchedAt?: string | null;

  /**
   * ISO-8601 timestamp of the most recent inbound request received by this source.
   * Useful for debugging "is my webhook even reaching us?"
   */
  lastTriggeredAt?: string | null;

  name?: string | null;

  probabilisticIdentity?: unknown | null;

  projectAPIKey?: string | null;

  redirectUrl?: string | null;

  selectedAccountId?: string | null;

  /**
   * Limits which domains can send events to the CDP. When set, only requests from
   * these domains are accepted for this source. Separate from experiment settings
   * `whitelistDomains`, which limits which domains can load your experiments.
   */
  whitelistDomains?: Array<string> | null;

  whitelistIps?: Array<string> | null;
}

export interface SourceUpdateResponse {
  id: string;

  /**
   * Organization id that owns this source.
   */
  accountId: string;

  createdAt: string;

  status: 'Disabled' | 'Enabled';

  type:
    | 'AlchemerWebhook'
    | 'AndroidNativeApi'
    | 'Branch'
    | 'CSharpApi'
    | 'CalComWebhooks'
    | 'CalendlyWebhook'
    | 'CallRail'
    | 'CallTrackingMetrics'
    | 'DotNetApi'
    | 'FacebookLeadAds'
    | 'FormsortWebhooks'
    | 'Formstack'
    | 'GoLangApi'
    | 'HTTPApiSource'
    | 'Healthie'
    | 'HubspotAppActions'
    | 'HubspotFormWebhook'
    | 'JotFormWebhooks'
    | 'KotlinApi'
    | 'NodejsApi'
    | 'PHPApi'
    | 'PixelImage'
    | 'PythonApi'
    | 'ReactNativeApi'
    | 'RedirectSource'
    | 'RubyApi'
    | 'SegmentWebPlugin'
    | 'TypeformWebhooks'
    | 'WebSource'
    | 'Webhook'
    | 'WhatConverts'
    | 'iOSNativeApi';

  botControlMode?: string | null;

  botScoreThreshold?: number | null;

  excludeRequestContext?: boolean | null;

  /**
   * Whether this source exists in the currently published version. A source that is
   * not published will not accept events.
   */
  isPublished?: boolean | null;

  /**
   * ISO-8601 timestamp of the most recent event from this source successfully
   * dispatched to a destination.
   */
  lastDispatchedAt?: string | null;

  /**
   * ISO-8601 timestamp of the most recent inbound request received by this source.
   * Useful for debugging "is my webhook even reaching us?"
   */
  lastTriggeredAt?: string | null;

  name?: string | null;

  probabilisticIdentity?: unknown | null;

  projectAPIKey?: string | null;

  redirectUrl?: string | null;

  selectedAccountId?: string | null;

  /**
   * Limits which domains can send events to the CDP. When set, only requests from
   * these domains are accepted for this source. Separate from experiment settings
   * `whitelistDomains`, which limits which domains can load your experiments.
   */
  whitelistDomains?: Array<string> | null;

  whitelistIps?: Array<string> | null;
}

export interface SourceDeleteResponse {
  deleted: true;
}

/**
 * Token data for the source. The `sourceType` field discriminates between pixel
 * sources (web / PixelImage) which return an `installScript`, and webhook sources
 * which return an `ingestUrl` and `sampleCurl` instead. Pixel sources use
 * `installScript` / `testInstallScript` to add the tracking pixel to a website.
 * Webhook sources POST JSON to `ingestUrl` directly.
 */
export type SourceTokensResponse = SourceTokensResponse.UnionMember0 | SourceTokensResponse.UnionMember1;

export namespace SourceTokensResponse {
  export interface UnionMember0 {
    /**
     * Install token for the source.
     */
    token: string;

    /**
     * Ready-to-paste install snippet for the production token, including linked
     * runtime tokens for supported modules.
     */
    installScript: string;

    /**
     * Discriminator: this is a pixel/web source.
     */
    sourceType: 'pixel';

    /**
     * Ready-to-paste install snippet for the test token, suitable for validation
     * before a live install.
     */
    testInstallScript: string;

    /**
     * Test-mode token derived from `token`.
     */
    testToken: string;
  }

  export interface UnionMember1 {
    /**
     * Ingest token embedded in the webhook URL path.
     */
    token: string;

    /**
     * Production ingest URL for the webhook source.
     */
    ingestUrl: string;

    /**
     * Example curl command showing how to POST a sample event to the ingest URL. Copy
     * and run to verify connectivity.
     */
    sampleCurl: string;

    /**
     * Discriminator: this is a webhook source.
     */
    sourceType: 'webhook';

    /**
     * Test-mode ingest URL.
     */
    testIngestUrl: string;

    /**
     * Test-mode ingest token derived from `token`.
     */
    testToken: string;
  }
}

export interface SourceListParams extends CursorParams {
  /**
   * Case-insensitive substring filter on the source name.
   */
  nameContains?: string;

  /**
   * Filter by source status.
   */
  status?: 'Disabled' | 'Enabled';

  /**
   * Filter by source type.
   */
  type?:
    | 'AlchemerWebhook'
    | 'AndroidNativeApi'
    | 'Branch'
    | 'CSharpApi'
    | 'CalComWebhooks'
    | 'CalendlyWebhook'
    | 'CallRail'
    | 'CallTrackingMetrics'
    | 'DotNetApi'
    | 'FacebookLeadAds'
    | 'FormsortWebhooks'
    | 'Formstack'
    | 'GoLangApi'
    | 'HTTPApiSource'
    | 'Healthie'
    | 'HubspotAppActions'
    | 'HubspotFormWebhook'
    | 'JotFormWebhooks'
    | 'KotlinApi'
    | 'NodejsApi'
    | 'PHPApi'
    | 'PixelImage'
    | 'PythonApi'
    | 'ReactNativeApi'
    | 'RedirectSource'
    | 'RubyApi'
    | 'SegmentWebPlugin'
    | 'TypeformWebhooks'
    | 'WebSource'
    | 'Webhook'
    | 'WhatConverts'
    | 'iOSNativeApi';
}

export interface SourceCreateParams {
  type:
    | 'AlchemerWebhook'
    | 'AndroidNativeApi'
    | 'Branch'
    | 'CSharpApi'
    | 'CalComWebhooks'
    | 'CalendlyWebhook'
    | 'CallRail'
    | 'CallTrackingMetrics'
    | 'DotNetApi'
    | 'FacebookLeadAds'
    | 'FormsortWebhooks'
    | 'Formstack'
    | 'GoLangApi'
    | 'HTTPApiSource'
    | 'Healthie'
    | 'HubspotAppActions'
    | 'HubspotFormWebhook'
    | 'JotFormWebhooks'
    | 'KotlinApi'
    | 'NodejsApi'
    | 'PHPApi'
    | 'PixelImage'
    | 'PythonApi'
    | 'ReactNativeApi'
    | 'RedirectSource'
    | 'RubyApi'
    | 'SegmentWebPlugin'
    | 'TypeformWebhooks'
    | 'WebSource'
    | 'Webhook'
    | 'WhatConverts'
    | 'iOSNativeApi';

  name?: string | null;

  /**
   * Destination URL for a RedirectSource (short link). Ignored by other source
   * types. Must be a valid http(s) URL.
   */
  redirectUrl?: string | null;
}

export interface SourceUpdateParams {
  botControlMode?: string | null;

  botScoreThreshold?: number | null;

  excludeRequestContext?: boolean | null;

  name?: string | null;

  probabilisticIdentity?: unknown | null;

  projectAPIKey?: string | null;

  redirectUrl?: string | null;

  selectedAccountId?: string | null;

  status?: string | null;

  whitelistDomains?: Array<string> | null;

  whitelistIps?: Array<string> | null;
}

export declare namespace Sources {
  export {
    type SourceListResponse as SourceListResponse,
    type SourceCreateResponse as SourceCreateResponse,
    type SourceRetrieveResponse as SourceRetrieveResponse,
    type SourceUpdateResponse as SourceUpdateResponse,
    type SourceDeleteResponse as SourceDeleteResponse,
    type SourceTokensResponse as SourceTokensResponse,
    type SourceListResponsesCursor as SourceListResponsesCursor,
    type SourceListParams as SourceListParams,
    type SourceCreateParams as SourceCreateParams,
    type SourceUpdateParams as SourceUpdateParams,
  };
}
