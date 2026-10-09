// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class TestEvents extends APIResource {
  /**
   * List browser, server, and synthetic events captured with debug mode during the
   * last 48 hours, newest received first. Includes live-token and test-token events;
   * `isTestEvent` indicates whether a test token was used. Returns full event
   * properties. Pass an entity id unchanged to the detail or dispatch endpoint. Use
   * `limit` (default 25, maximum 100) and `cursor` to page through results. Requires
   * API-key scope or current OAuth user permission: report:list-events
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const testEventListResponse of client.testEvents.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: TestEventListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TestEventListResponsesCursor, TestEventListResponse> {
    return this._client.getAPIList('/rest/v1/test-events', Cursor<TestEventListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Send a test event through the same processing your production events go through,
   * using the source’s live token with debug capture enabled. This can deliver real
   * data to configured destinations. The response acknowledges acceptance for
   * processing; it does not contain processing results. The event is captured in
   * Recent Events. Use the returned `id` with
   * `GET /rest/v1/test-events/{id}/dispatches` to retrieve recorded dispatches.
   * Supply `visitorId` and `distinctId` to choose the identity yourself; otherwise
   * they are generated and returned. Requires API-key scope or current OAuth user
   * permission: test-event:create
   *
   * @example
   * ```ts
   * const testEvent = await client.testEvents.create({
   *   eventName: 'Purchase',
   * });
   * ```
   */
  create(body: TestEventCreateParams, options?: RequestOptions): APIPromise<TestEventCreateResponse> {
    return this._client.post('/rest/v1/test-events', { body, ...options });
  }

  /**
   * Retrieve one browser, server, or synthetic event captured in debug mode within
   * the last 48 hours. Use an id returned by the create or list endpoint. Events
   * that have not arrived, expired events, and events outside your account
   * return 404. Requires API-key scope or current OAuth user permission:
   * report:view-event
   *
   * @example
   * ```ts
   * const testEvent = await client.testEvents.retrieve(
   *   'a1b2c3d4:ck9x8y7z6w5v4u3t',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<TestEventRetrieveResponse> {
    return this._client.get(path`/rest/v1/test-events/${id}`, options);
  }

  /**
   * Retrieve dispatches recorded for a debug-captured browser, server, or synthetic
   * event. Use an id returned by the create or list endpoint. The entities array
   * contains mapped payloads and recorded success or failure details. It is empty
   * until dispatch records arrive, and may remain empty when no dispatch occurs.
   * Results can grow as processing continues; this endpoint does not predict
   * destinations or signal completion. Requires the report:view-dispatch scope.
   * Requires API-key scope or current OAuth user permission: report:view-dispatch
   *
   * @example
   * ```ts
   * const response = await client.testEvents.dispatches(
   *   'a1b2c3d4:ck9x8y7z6w5v4u3t',
   * );
   * ```
   */
  dispatches(id: string, options?: RequestOptions): APIPromise<TestEventDispatchesResponse> {
    return this._client.get(path`/rest/v1/test-events/${id}/dispatches`, options);
  }
}

export type TestEventListResponsesCursor = Cursor<TestEventListResponse>;

export interface TestEventListResponse {
  id: string;

  distinctId: string;

  eventName: string;

  /**
   * Whether the event used a test token. Debug-captured live-token events have false
   * here.
   */
  isTestEvent: boolean;

  time: string;

  visitorId: string;

  defaultProperties?: unknown | null;

  eventProperties?: unknown | null;

  rawData?: string | null;

  requestContext?: unknown | null;

  sourceId?: string | null;

  sourceName?: string | null;

  sourceType?: string | null;

  userProperties?: unknown | null;
}

export interface TestEventCreateResponse {
  /**
   * Identifier to pass to the event detail or dispatch endpoint.
   */
  id: string;

  /**
   * When the event was accepted for processing, as an ISO 8601 timestamp.
   */
  acceptedAt: string;

  distinctId: string;

  eventName: string;

  sourceId: string;

  visitorId: string;
}

export interface TestEventRetrieveResponse {
  id: string;

  distinctId: string;

  eventName: string;

  /**
   * Whether the event used a test token. Debug-captured live-token events have false
   * here.
   */
  isTestEvent: boolean;

  time: string;

  visitorId: string;

  defaultProperties?: unknown | null;

  eventProperties?: unknown | null;

  rawData?: string | null;

  requestContext?: unknown | null;

  sourceId?: string | null;

  sourceName?: string | null;

  sourceType?: string | null;

  userProperties?: unknown | null;
}

export interface TestEventDispatchesResponse {
  id: string;

  /**
   * Dispatches recorded so far. Empty until dispatches arrive; no predicted
   * destinations or completion signal. Events created through this API can be
   * delivered to live destinations.
   */
  entities: Array<TestEventDispatchesResponse.Entity>;
}

export namespace TestEventDispatchesResponse {
  export interface Entity {
    destinationId: string;

    allowedEventId?: string | null;

    allowedEventName?: string | null;

    destinationName?: string | null;

    destinationType?: string | null;

    /**
     * When the send was attempted, as an ISO 8601 timestamp.
     */
    dispatchedAt?: string | null;

    /**
     * When the destination accepted the send, as an ISO 8601 timestamp.
     */
    dispatchedSuccessAt?: string | null;

    /**
     * Failure detail when `success` is false.
     */
    message?: string | null;

    /**
     * The mapped payload recorded for this dispatch.
     */
    payload?: unknown | null;

    /**
     * Whether this send succeeded. Null while the attempt is still in flight.
     */
    success?: boolean | null;
  }
}

export interface TestEventListParams extends CursorParams {}

export interface TestEventCreateParams {
  /**
   * Name of the event to send, matching an event name configured on this account.
   */
  eventName: string;

  /**
   * Known context properties used by ingest and destination mappings. Use
   * current_url for the page URL. Unknown properties are ignored.
   */
  defaultProperties?: TestEventCreateParams.DefaultProperties | null;

  /**
   * Event identity for this specific event. Generated when omitted. Letters,
   * numbers, hyphens, and underscores only.
   */
  distinctId?: string | null;

  /**
   * Event-level properties available to destination mappings.
   */
  eventProperties?: unknown | null;

  /**
   * Source to attribute the event to. Defaults to the account's first enabled source
   * that accepts events over the API.
   */
  sourceId?: string | null;

  /**
   * Person-level properties available to destination mappings.
   */
  userProperties?: unknown | null;

  /**
   * Visitor identity to send the event as. Generated when omitted. Letters, numbers,
   * hyphens, and underscores only.
   */
  visitorId?: string | null;
}

export namespace TestEventCreateParams {
  /**
   * Known context properties used by ingest and destination mappings. Use
   * current_url for the page URL. Unknown properties are ignored.
   */
  export interface DefaultProperties {
    /**
     * The Everflow affiliate Click (Transaction) ID, captured from the
     * `_ef_transaction_id` URL parameter. Ex: ef_click_abc123
     */
    _ef_transaction_id?: string | null;

    /**
     * The active time in milliseconds that the user had this tab active
     */
    activeDuration?: number | null;

    /**
     * The ad id for detected in the session. This is set by the web sdk automatically.
     */
    ad_id?: string | null;

    /**
     * The Admitad (Mitgo) affiliate Click ID. Ex: admitad_uid_abc123
     */
    admitad_uid?: string | null;

    /**
     * The adset id for detected in the session. This is set by the web sdk
     * automatically.
     */
    adset_id?: string | null;

    /**
     * The AppLovin alart query parameter. Ex: alart123
     */
    alart?: string | null;

    /**
     * The AppLovin aleid query parameter. Ex: aleid123
     */
    aleid?: string | null;

    /**
     * The AppLovin pixel cookie value (\_axwrt). Web-only.
     */
    axwrt?: string | null;

    /**
     * The Basis DSP Click ID. Ex: basis_cid123
     */
    basis_cid?: string | null;

    /**
     * The Beeswax (FreeWheel Buyer Cloud) auction ID, captured from the
     * `{{AUCTION_ID}}` macro on creative click URLs. Ex: bx-auc-abc123
     */
    beeswax_auction_id?: string | null;

    /**
     * The language of the browser. Ex: en-US
     */
    browser_language?: string | null;

    /**
     * The name of the browser. Ex: Chrome
     */
    browser_name?: string | null;

    /**
     * The version of the browser. Ex: 114.0
     */
    browser_version?: string | null;

    /**
     * The campaign id for detected in the session. This is set by the web sdk
     * automatically.
     */
    campaign_id?: string | null;

    /**
     * The Click ID. Ex: clickid123
     */
    clickid?: string | null;

    /**
     * The Generic Click ID. Ex: clid123
     */
    clid?: string | null;

    /**
     * The architecture of the CPU. Ex: x64
     */
    cpu_architecture?: string | null;

    /**
     * The full url (including query params) of the current page
     */
    current_url?: string | null;

    /**
     * The DoubleClick Click ID. Ex: dclid123
     */
    dclid?: string | null;

    /**
     * The model of the device. Ex: iPhone 13
     */
    device_model?: string | null;

    /**
     * The type of device the user is using. Ex: mobile
     */
    device_type?: string | null;

    /**
     * The vendor of the device. Ex: Apple
     */
    device_vendor?: string | null;

    /**
     * The time in milliseconds since the page was loaded // script was loaded
     */
    duration?: number | null;

    /**
     * The browsers encoding. Ex: UTF-8
     */
    encoding?: string | null;

    /**
     * The name of the browser engine. Ex: Blink
     */
    engine_name?: string | null;

    /**
     * The version of the browser engine. Ex: 114.0
     */
    engine_version?: string | null;

    /**
     * The Pinterest Click ID. Ex: epik456
     */
    epik?: string | null;

    /**
     * Facebook Click ID with prefix format for Conversions API tracking. Ex:
     * fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
     */
    fbc?: string | null;

    /**
     * Raw Facebook Click ID query parameter without prefix from ad clicks. Ex:
     * AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
     */
    fbclid?: string | null;

    /**
     * Facebook Browser ID parameter for identifying browsers and attributing events.
     * Ex: fb.1.1554763741205.1098115397
     */
    fbp?: string | null;

    /**
     * Deprecated
     */
    fv?: boolean | null;

    /**
     * The Google Ad Source. Ex: google
     */
    gad_source?: string | null;

    /**
     * The Google Braid ID. Ex: gbraid123
     */
    gbraid?: string | null;

    /**
     * The Google Click ID. Ex: gclid123
     */
    gclid?: string | null;

    /**
     * The host of the current page. Ex: example.com
     */
    host?: string | null;

    /**
     * Whether the user is in an iframe. Ex: true
     */
    iframe?: boolean | null;

    /**
     * The Impact Click ID reference. Ex: im_ref123
     */
    im_ref?: string | null;

    /**
     * The IP address of the user. Ex: 127.0.0.1
     */
    ip?: string | null;

    /**
     * The Impact Click ID. Ex: irclickid123
     */
    irclickid?: string | null;

    /**
     * Whether we have detected that the user is a bot. This is set automatically by
     * the Ours server primarily for events tracked through the web SDK.
     */
    is_bot?: boolean | null;

    /**
     * The LinkedIn Click ID. Ex: li_fat_id123
     */
    li_fat_id?: string | null;

    /**
     * The Microsoft Click ID. Ex: msclkid123
     */
    msclkid?: string | null;

    /**
     * The NextDoor Click ID. Ex: ndclid123
     */
    ndclid?: string | null;

    /**
     * Deprecated
     */
    new_s?: boolean | null;

    /**
     * The Outbrain click ID, captured from the `ob_click_id` URL parameter (Outbrain
     * `{{ob_click_id}}` macro) on the landing page. Ex: ob_click_abc123
     */
    ob_click_id?: string | null;

    /**
     * The OpenAI Ads privacy-preserving reference, captured from the `oppref` URL
     * parameter on landing pages (the OpenAI Pixel also stores it in a `__oppref`
     * cookie). Sent to OpenAI Ads on Conversions API events for attribution. Ex:
     * oppref_abc
     */
    oppref?: string | null;

    /**
     * The name of the operating system. Ex: Windows
     */
    os_name?: string | null;

    /**
     * The version of the operating system. Ex: 10.0
     */
    os_version?: string | null;

    /**
     * A random set of numbers for the page load
     */
    page_hash?: number | null;

    /**
     * The pathname of the current page. Ex: /home
     */
    pathname?: string | null;

    /**
     * The Quora Click ID. Ex: qclid123
     */
    qclid?: string | null;

    /**
     * The Reddit Click ID. Ex: rdt_cid123
     */
    rdt_cid?: string | null;

    /**
     * The time the event was received by an Ours server in ISO format
     */
    received_at?: string | null;

    /**
     * The referrer URL of the current page
     */
    referrer?: string | null;

    /**
     * The referring domain of the current page
     */
    referring_domain?: string | null;

    /**
     * The StackAdapt Tracking ID. Ex: sacid123
     */
    sacid?: string | null;

    /**
     * The SnapChat Click ID. Ex: sccid123
     */
    sccid?: string | null;

    /**
     * The height of the screen. Ex: 1080
     */
    screen_height?: number | null;

    /**
     * The width of the screen. Ex: 1920
     */
    screen_width?: number | null;

    /**
     * The number of sessions the user has had. Ex: 3
     */
    sessionCount?: number | null;

    /**
     * The session ID as assigned automatically by the web SDK. This is required for
     * session replay
     */
    sid?: string | null;

    sr?: string | null;

    /**
     * The title of the current page
     */
    title?: string | null;

    /**
     * The TikTok Click ID. Ex: ttclid123
     */
    ttclid?: string | null;

    /**
     * The Twitter Click ID. Ex: twclid123
     */
    twclid?: string | null;

    /**
     * User agent as a full list of strings.
     */
    uafvl?: string | null;

    /**
     * The user agent of the browser
     */
    user_agent?: string | null;

    /**
     * The UTM Campaign. The web SDK automatically captures this from the query params.
     */
    utm_campaign?: string | null;

    /**
     * The UTM Content. The web SDK automatically captures this from the query params.
     */
    utm_content?: string | null;

    /**
     * The UTM Medium. The web SDK automatically captures this from the query params.
     */
    utm_medium?: string | null;

    /**
     * The UTM Name. The web SDK automatically captures this from the query params.
     */
    utm_name?: string | null;

    /**
     * The UTM Source. The web SDK automatically captures this from the query params.
     */
    utm_source?: string | null;

    /**
     * The UTM Term. The web SDK automatically captures this from the query params.
     */
    utm_term?: string | null;

    /**
     * The SDK version (e.g., web SDK or ingest-sdk-\* via generated SDK headers)
     */
    version?: string | null;

    /**
     * The Viant (Adelphic) Click ID, captured from the `viant_click_id` URL parameter
     * (Viant `${ADELPHIC_CLICKID}` macro). Sent as `xid` on Viant postbacks. Ex:
     * viant_click_abc123
     */
    viant_click_id?: string | null;

    /**
     * The Viant (Adelphic) Impression ID, captured from the `viant_impression_id` URL
     * parameter (Viant `${ADELPHIC_IMPRESSIONID}` macro). Sent as `imp_id` on Viant
     * postbacks for post-view attribution. Ex: viant_imp_abc123
     */
    viant_impression_id?: string | null;

    /**
     * The WBRAID Identifier. The web SDK automatically captures this from the query
     * params.
     */
    wbraid?: string | null;

    /**
     * Whether the user is in a webview. Ex: true
     */
    webview?: boolean | null;
  }
}

export declare namespace TestEvents {
  export {
    type TestEventListResponse as TestEventListResponse,
    type TestEventCreateResponse as TestEventCreateResponse,
    type TestEventRetrieveResponse as TestEventRetrieveResponse,
    type TestEventDispatchesResponse as TestEventDispatchesResponse,
    type TestEventListResponsesCursor as TestEventListResponsesCursor,
    type TestEventListParams as TestEventListParams,
    type TestEventCreateParams as TestEventCreateParams,
  };
}
