// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AllowedEvents extends APIResource {
  /**
   * List every allowed event for this account. Allowed events sit between sources
   * and destinations in the dispatch flow — only inbound events whose `event` field
   * matches the `name` of an allowed event (case-insensitive) can be routed to that
   * event's `destinationIds`. Events without a matching allowed event are dropped.
   * The list is not paginated; the per-account count is bounded. System events
   * (names beginning with `$`, e.g. `$heatmap_click`) are hidden from the response —
   * only `$identify` is creatable as an allowed event. Requires scope:
   * allowedEvent:list
   */
  list(options?: RequestOptions): APIPromise<AllowedEventListResponse> {
    return this._client.get('/rest/v1/allowed-events', options);
  }

  /**
   * Create a new allowed event for this account.
   *
   * - `name` is required, trimmed, case-insensitively unique within the account, and
   *   rejected if it exceeds the platform event-name length limit.
   * - Names starting with `$` are reserved for system events. Only `$identify` is
   *   accepted.
   * - `destinationIds` is optional. Unknown ids and ids belonging to other accounts
   *   are silently filtered out at write time (the destination must exist on this
   *   account to be saved).
   *
   * Returns the full entity so callers can read the server-assigned `id`,
   * `createdAt`, and the filtered `destinationIds` without a follow-up GET. Known
   * input failures (duplicate name, name length, `$`-prefix reservation, empty name)
   * are returned as HTTP 409 with the reason in the response `error` field. Requires
   * scope: allowedEvent:create
   */
  create(body: AllowedEventCreateParams, options?: RequestOptions): APIPromise<AllowedEventCreateResponse> {
    return this._client.post('/rest/v1/allowed-events', { body, ...options });
  }

  /**
   * Fetch a single allowed event by id. Returns 404 when no record matches the
   * supplied id or it belongs to a different account. Requires scope:
   * allowedEvent:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<AllowedEventRetrieveResponse> {
    return this._client.get(path`/rest/v1/allowed-events/${id}`, options);
  }

  /**
   * Partially update an allowed event. Only the fields you send are changed; omitted
   * fields keep their current value.
   *
   * - `destinationIds` is replaced wholesale when sent — the canonical way to add or
   *   remove a destination is to fetch, modify the array, and PATCH it back. Stale
   *   ids (deleted destinations or destinations on another account) are silently
   *   filtered out at write time.
   * - `name` is subject to the same rules as create: case-insensitive uniqueness,
   *   length cap, `$`-prefix reservation.
   * - `trigger` accepts `null` to clear the existing value.
   *
   * Returns the full entity. Known input failures (duplicate name, length,
   * `$`-prefix, empty name) are returned as HTTP 409 with the reason in the response
   * `error` field. Requires scope: allowedEvent:update
   */
  update(
    id: string,
    body: AllowedEventUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AllowedEventUpdateResponse> {
    return this._client.patch(path`/rest/v1/allowed-events/${id}`, { body, ...options });
  }

  /**
   * Delete an allowed event. After deletion, inbound events whose `event` field
   * matches the deleted name are no longer routed and are dropped at the allow-list
   * stage of the dispatch flow. Requires scope: allowedEvent:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<AllowedEventDeleteResponse> {
    return this._client.delete(path`/rest/v1/allowed-events/${id}`, options);
  }
}

export interface AllowedEventListResponse {
  entities: Array<AllowedEventListResponse.Entity>;
}

export namespace AllowedEventListResponse {
  export interface Entity {
    /**
     * Server-assigned UUID for this allowed event.
     */
    id: string;

    /**
     * ISO 8601 timestamp when the allowed event was created.
     */
    createdAt: string;

    /**
     * Destinations that receive this event. Empty array means the event is allowed but
     * routed nowhere (effectively dropped). PATCH replaces this list wholesale.
     */
    destinationIds: Array<string>;

    /**
     * Case-insensitive event name. Inbound events whose `event` field matches this
     * value are gated through this allowed event. Reserved: names starting with `$`
     * are system events and cannot be created (except `$identify`).
     */
    name: string;

    /**
     * Optional free-form trigger description. Not used by the dispatch pipeline —
     * surfaced in the dashboard so teams can record where each event fires.
     */
    trigger?: string | null;

    /**
     * ISO 8601 timestamp of the last PATCH. Equal to createdAt on a freshly created
     * event.
     */
    updatedAt?: string | null;
  }
}

export interface AllowedEventCreateResponse {
  /**
   * Server-assigned UUID for this allowed event.
   */
  id: string;

  /**
   * ISO 8601 timestamp when the allowed event was created.
   */
  createdAt: string;

  /**
   * Destinations that receive this event. Empty array means the event is allowed but
   * routed nowhere (effectively dropped). PATCH replaces this list wholesale.
   */
  destinationIds: Array<string>;

  /**
   * Case-insensitive event name. Inbound events whose `event` field matches this
   * value are gated through this allowed event. Reserved: names starting with `$`
   * are system events and cannot be created (except `$identify`).
   */
  name: string;

  /**
   * ISO 8601 timestamp of the most recent successful dispatch to any destination on
   * `destinationIds`. Lags `lastTriggeredAt` when consent or governance rules drop
   * the event before dispatch.
   */
  lastDispatchedAt?: string | null;

  /**
   * ISO 8601 timestamp of the most recent inbound event observed for this name.
   * Useful for spotting events that were configured but never fired. Null when never
   * observed.
   */
  lastTriggeredAt?: string | null;

  /**
   * Optional free-form trigger description. Not used by the dispatch pipeline —
   * surfaced in the dashboard so teams can record where each event fires.
   */
  trigger?: string | null;

  /**
   * ISO 8601 timestamp of the last PATCH. Equal to createdAt on a freshly created
   * event.
   */
  updatedAt?: string | null;
}

export interface AllowedEventRetrieveResponse {
  /**
   * Server-assigned UUID for this allowed event.
   */
  id: string;

  /**
   * ISO 8601 timestamp when the allowed event was created.
   */
  createdAt: string;

  /**
   * Destinations that receive this event. Empty array means the event is allowed but
   * routed nowhere (effectively dropped). PATCH replaces this list wholesale.
   */
  destinationIds: Array<string>;

  /**
   * Case-insensitive event name. Inbound events whose `event` field matches this
   * value are gated through this allowed event. Reserved: names starting with `$`
   * are system events and cannot be created (except `$identify`).
   */
  name: string;

  /**
   * ISO 8601 timestamp of the most recent successful dispatch to any destination on
   * `destinationIds`. Lags `lastTriggeredAt` when consent or governance rules drop
   * the event before dispatch.
   */
  lastDispatchedAt?: string | null;

  /**
   * ISO 8601 timestamp of the most recent inbound event observed for this name.
   * Useful for spotting events that were configured but never fired. Null when never
   * observed.
   */
  lastTriggeredAt?: string | null;

  /**
   * Optional free-form trigger description. Not used by the dispatch pipeline —
   * surfaced in the dashboard so teams can record where each event fires.
   */
  trigger?: string | null;

  /**
   * ISO 8601 timestamp of the last PATCH. Equal to createdAt on a freshly created
   * event.
   */
  updatedAt?: string | null;
}

export interface AllowedEventUpdateResponse {
  /**
   * Server-assigned UUID for this allowed event.
   */
  id: string;

  /**
   * ISO 8601 timestamp when the allowed event was created.
   */
  createdAt: string;

  /**
   * Destinations that receive this event. Empty array means the event is allowed but
   * routed nowhere (effectively dropped). PATCH replaces this list wholesale.
   */
  destinationIds: Array<string>;

  /**
   * Case-insensitive event name. Inbound events whose `event` field matches this
   * value are gated through this allowed event. Reserved: names starting with `$`
   * are system events and cannot be created (except `$identify`).
   */
  name: string;

  /**
   * ISO 8601 timestamp of the most recent successful dispatch to any destination on
   * `destinationIds`. Lags `lastTriggeredAt` when consent or governance rules drop
   * the event before dispatch.
   */
  lastDispatchedAt?: string | null;

  /**
   * ISO 8601 timestamp of the most recent inbound event observed for this name.
   * Useful for spotting events that were configured but never fired. Null when never
   * observed.
   */
  lastTriggeredAt?: string | null;

  /**
   * Optional free-form trigger description. Not used by the dispatch pipeline —
   * surfaced in the dashboard so teams can record where each event fires.
   */
  trigger?: string | null;

  /**
   * ISO 8601 timestamp of the last PATCH. Equal to createdAt on a freshly created
   * event.
   */
  updatedAt?: string | null;
}

export type AllowedEventDeleteResponse = boolean;

export interface AllowedEventCreateParams {
  name: string;

  destinationIds?: Array<string> | null;
}

export interface AllowedEventUpdateParams {
  /**
   * Destinations that should receive this event. Wholesale replacement — the sent
   * list becomes the new value. Stale IDs (destinations from another account or
   * deleted destinations) are silently filtered out at write time. Send `[]` to gate
   * the event from every destination.
   */
  destinationIds?: Array<string> | null;

  /**
   * New event name. Subject to the same rules as create: case-insensitive uniqueness
   * within the account, max length enforced by the platform, and the `$`-prefix
   * reservation (only `$identify` is allowed). Omit to leave the name unchanged.
   */
  name?: string | null;

  /**
   * Free-form trigger description shown in the dashboard. Send `null` to clear. Not
   * used by the dispatch pipeline.
   */
  trigger?: string | null;
}

export declare namespace AllowedEvents {
  export {
    type AllowedEventListResponse as AllowedEventListResponse,
    type AllowedEventCreateResponse as AllowedEventCreateResponse,
    type AllowedEventRetrieveResponse as AllowedEventRetrieveResponse,
    type AllowedEventUpdateResponse as AllowedEventUpdateResponse,
    type AllowedEventDeleteResponse as AllowedEventDeleteResponse,
    type AllowedEventCreateParams as AllowedEventCreateParams,
    type AllowedEventUpdateParams as AllowedEventUpdateParams,
  };
}
