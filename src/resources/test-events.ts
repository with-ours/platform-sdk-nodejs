// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class TestEvents extends APIResource {
  /**
   * List browser, server, and synthetic events captured with debug mode during the
   * last 48 hours, newest received first. Includes live-token events as well as
   * synthetic test events; `isTestEvent` distinguishes them. Returns full event
   * properties. Pass an entity id unchanged to the detail or dispatch endpoint. Use
   * `limit` (default 25, maximum 100) and `cursor` to page through results. Requires
   * scope: report:list-events
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
   * without delivering it to any destination. The response acknowledges acceptance
   * for processing; it does not contain processing results. The event is captured in
   * Recent Events. Use the returned `id` with
   * `GET /rest/v1/test-events/{id}/dispatches` to retrieve recorded dispatches.
   * Supply `visitorId` and `distinctId` to choose the identity yourself; otherwise
   * they are generated and returned. Requires scope: test-event:create
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
   * return 404. Requires scope: report:view-event
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
   * Requires scope: report:view-dispatch
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
   * destinations or completion signal. Synthetic events are never delivered live.
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
   * Context properties normally collected automatically, such as page URL or
   * referrer.
   */
  defaultProperties?: unknown | null;

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
