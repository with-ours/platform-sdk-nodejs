// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class PersonalizationProperties extends APIResource {
  /**
   * List personalization properties for one experiment settings record. Requires the
   * `experimentSettingsId` query parameter — properties are always scoped to a
   * single record; list the records with `GET /rest/v1/experiment-settings`.
   * Supports cursor pagination via `limit` and `cursor`; the limit clamp is 1000 so
   * a single request can return the full set. Requires scope:
   * experimentSettings:list
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const personalizationPropertyListResponse of client.personalizationProperties.list(
   *   {
   *     experimentSettingsId:
   *       '08524dc8-5289-48e8-bf40-b3a7cfa6ca0a',
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    query: PersonalizationPropertyListParams,
    options?: RequestOptions,
  ): PagePromise<PersonalizationPropertyListResponsesCursor, PersonalizationPropertyListResponse> {
    return this._client.getAPIList(
      '/rest/v1/personalization-properties',
      Cursor<PersonalizationPropertyListResponse>,
      { query, ...options },
    );
  }

  /**
   * Create a personalization property on an experiment settings record. The new rule
   * is published automatically and starts accumulating from the next matching event
   * — no separate publish call is needed. `propertyKey` must be unique within the
   * parent record. Requires scope: experimentSettings:update
   *
   * @example
   * ```ts
   * const personalizationProperty =
   *   await client.personalizationProperties.create({
   *     accumulator: 'set_true',
   *     experimentSettingsId:
   *       '08524dc8-5289-48e8-bf40-b3a7cfa6ca0a',
   *     propertyKey: 'visited_pricing',
   *     triggerEventName: 'page_view',
   *   });
   * ```
   */
  create(
    body: PersonalizationPropertyCreateParams,
    options?: RequestOptions,
  ): APIPromise<PersonalizationPropertyCreateResponse> {
    return this._client.post('/rest/v1/personalization-properties', { body, ...options });
  }

  /**
   * Find a single personalization property by ID. Returns 404 when no property
   * matches the supplied id. Requires scope: experimentSettings:find
   *
   * @example
   * ```ts
   * const personalizationProperty =
   *   await client.personalizationProperties.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<PersonalizationPropertyRetrieveResponse> {
    return this._client.get(path`/rest/v1/personalization-properties/${id}`, options);
  }

  /**
   * Partially update a personalization property. Only the fields you send are
   * changed, and the update is published automatically. Sending `triggerConditions`
   * replaces the prior list — partial-array merging is not supported. Values already
   * accumulated for visitors are kept; the new rule applies to events from here on.
   * Returns 404 when no property matches the supplied id. Requires scope:
   * experimentSettings:update
   *
   * @example
   * ```ts
   * const personalizationProperty =
   *   await client.personalizationProperties.update('id');
   * ```
   */
  update(
    id: string,
    body: PersonalizationPropertyUpdateParams,
    options?: RequestOptions,
  ): APIPromise<PersonalizationPropertyUpdateResponse> {
    return this._client.patch(path`/rest/v1/personalization-properties/${id}`, { body, ...options });
  }

  /**
   * Delete a personalization property. The rule stops accumulating immediately;
   * values already recorded for visitors are no longer maintained. Returns 404 when
   * no property matches the supplied id. Requires scope: experimentSettings:update
   *
   * @example
   * ```ts
   * const personalizationProperty =
   *   await client.personalizationProperties.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<PersonalizationPropertyDeleteResponse> {
    return this._client.delete(path`/rest/v1/personalization-properties/${id}`, options);
  }
}

export type PersonalizationPropertyListResponsesCursor = Cursor<PersonalizationPropertyListResponse>;

export interface PersonalizationPropertyListResponse {
  /**
   * Unique identifier for this personalization property.
   */
  id: string;

  /**
   * How repeated trigger events fold into the stored value. `set_true` records
   * `true` the first time the event matches — use it for one-shot interest flags.
   * `increment` counts matching events as a number. `latest_value` stores the most
   * recent value read from `valueField`, replacing whatever was there before.
   */
  accumulator: 'increment' | 'latest_value' | 'set_true';

  /**
   * ISO 8601 timestamp of when the property was created.
   */
  createdAt: string;

  /**
   * Experiment settings record that owns this property.
   */
  experimentSettingsId: string;

  /**
   * Name this value is stored and read under. Must be unique within the parent
   * experiment settings record — a duplicate key is rejected with 409. Because
   * accumulated values are delivered to the visitor's browser and are readable
   * there, never accumulate secrets, credentials, PHI, or confidential data into a
   * property.
   */
  propertyKey: string;

  /**
   * Whether the property is accumulating. `Disabled` properties stop accumulating
   * but keep values already recorded.
   */
  status: 'Disabled' | 'Enabled';

  /**
   * Name of the tracked event that advances this property. Every event with this
   * name is evaluated against `triggerConditions`.
   */
  triggerEventName: string;

  /**
   * Optional filters the triggering event must satisfy. All conditions must match
   * (AND). Omit or send an empty list to accumulate on every event with the matching
   * name.
   */
  triggerConditions?: Array<PersonalizationPropertyListResponse.TriggerCondition> | null;

  /**
   * ISO 8601 timestamp of the last update, or null when never updated.
   */
  updatedAt?: string | null;

  /**
   * Event field to read the stored value from. Required for `latest_value`; ignored
   * by `set_true` and `increment`. Only scalar values (string, number, boolean) are
   * stored. Must be one of `event.name`, `event.properties.<name>`, or
   * `event.context.<name>` where `<name>` is one of `current_url`, `referrer`,
   * `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, or `utm_term`. Any
   * other path is rejected with 400.
   */
  valueField?: string | null;
}

export namespace PersonalizationPropertyListResponse {
  export interface TriggerCondition {
    /**
     * Event field the condition reads. Must be one of `event.name`,
     * `event.properties.<name>`, or `event.context.<name>` where `<name>` is one of
     * `current_url`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign`,
     * `utm_content`, or `utm_term`. Any other path is rejected with 400.
     */
    field: string;

    /**
     * Comparison applied to the field. `exists` and `not_exists` ignore `value`;
     * `regex` matches the field against `value` as a regular expression.
     */
    operator: 'contains' | 'equals' | 'exists' | 'not_equals' | 'not_exists' | 'regex';

    /**
     * Scalar value the operator compares against. Omit for `exists` and `not_exists`.
     * Nested objects and arrays are rejected.
     */
    value?: string | null;
  }
}

export interface PersonalizationPropertyCreateResponse {
  /**
   * Unique identifier for this personalization property.
   */
  id: string;

  /**
   * How repeated trigger events fold into the stored value. `set_true` records
   * `true` the first time the event matches — use it for one-shot interest flags.
   * `increment` counts matching events as a number. `latest_value` stores the most
   * recent value read from `valueField`, replacing whatever was there before.
   */
  accumulator: 'increment' | 'latest_value' | 'set_true';

  /**
   * ISO 8601 timestamp of when the property was created.
   */
  createdAt: string;

  /**
   * Experiment settings record that owns this property.
   */
  experimentSettingsId: string;

  /**
   * Name this value is stored and read under. Must be unique within the parent
   * experiment settings record — a duplicate key is rejected with 409. Because
   * accumulated values are delivered to the visitor's browser and are readable
   * there, never accumulate secrets, credentials, PHI, or confidential data into a
   * property.
   */
  propertyKey: string;

  /**
   * Whether the property is accumulating. `Disabled` properties stop accumulating
   * but keep values already recorded.
   */
  status: 'Disabled' | 'Enabled';

  /**
   * Name of the tracked event that advances this property. Every event with this
   * name is evaluated against `triggerConditions`.
   */
  triggerEventName: string;

  /**
   * Optional filters the triggering event must satisfy. All conditions must match
   * (AND). Omit or send an empty list to accumulate on every event with the matching
   * name.
   */
  triggerConditions?: Array<PersonalizationPropertyCreateResponse.TriggerCondition> | null;

  /**
   * ISO 8601 timestamp of the last update, or null when never updated.
   */
  updatedAt?: string | null;

  /**
   * Event field to read the stored value from. Required for `latest_value`; ignored
   * by `set_true` and `increment`. Only scalar values (string, number, boolean) are
   * stored. Must be one of `event.name`, `event.properties.<name>`, or
   * `event.context.<name>` where `<name>` is one of `current_url`, `referrer`,
   * `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, or `utm_term`. Any
   * other path is rejected with 400.
   */
  valueField?: string | null;
}

export namespace PersonalizationPropertyCreateResponse {
  export interface TriggerCondition {
    /**
     * Event field the condition reads. Must be one of `event.name`,
     * `event.properties.<name>`, or `event.context.<name>` where `<name>` is one of
     * `current_url`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign`,
     * `utm_content`, or `utm_term`. Any other path is rejected with 400.
     */
    field: string;

    /**
     * Comparison applied to the field. `exists` and `not_exists` ignore `value`;
     * `regex` matches the field against `value` as a regular expression.
     */
    operator: 'contains' | 'equals' | 'exists' | 'not_equals' | 'not_exists' | 'regex';

    /**
     * Scalar value the operator compares against. Omit for `exists` and `not_exists`.
     * Nested objects and arrays are rejected.
     */
    value?: string | null;
  }
}

export interface PersonalizationPropertyRetrieveResponse {
  /**
   * Unique identifier for this personalization property.
   */
  id: string;

  /**
   * How repeated trigger events fold into the stored value. `set_true` records
   * `true` the first time the event matches — use it for one-shot interest flags.
   * `increment` counts matching events as a number. `latest_value` stores the most
   * recent value read from `valueField`, replacing whatever was there before.
   */
  accumulator: 'increment' | 'latest_value' | 'set_true';

  /**
   * ISO 8601 timestamp of when the property was created.
   */
  createdAt: string;

  /**
   * Experiment settings record that owns this property.
   */
  experimentSettingsId: string;

  /**
   * Name this value is stored and read under. Must be unique within the parent
   * experiment settings record — a duplicate key is rejected with 409. Because
   * accumulated values are delivered to the visitor's browser and are readable
   * there, never accumulate secrets, credentials, PHI, or confidential data into a
   * property.
   */
  propertyKey: string;

  /**
   * Whether the property is accumulating. `Disabled` properties stop accumulating
   * but keep values already recorded.
   */
  status: 'Disabled' | 'Enabled';

  /**
   * Name of the tracked event that advances this property. Every event with this
   * name is evaluated against `triggerConditions`.
   */
  triggerEventName: string;

  /**
   * Optional filters the triggering event must satisfy. All conditions must match
   * (AND). Omit or send an empty list to accumulate on every event with the matching
   * name.
   */
  triggerConditions?: Array<PersonalizationPropertyRetrieveResponse.TriggerCondition> | null;

  /**
   * ISO 8601 timestamp of the last update, or null when never updated.
   */
  updatedAt?: string | null;

  /**
   * Event field to read the stored value from. Required for `latest_value`; ignored
   * by `set_true` and `increment`. Only scalar values (string, number, boolean) are
   * stored. Must be one of `event.name`, `event.properties.<name>`, or
   * `event.context.<name>` where `<name>` is one of `current_url`, `referrer`,
   * `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, or `utm_term`. Any
   * other path is rejected with 400.
   */
  valueField?: string | null;
}

export namespace PersonalizationPropertyRetrieveResponse {
  export interface TriggerCondition {
    /**
     * Event field the condition reads. Must be one of `event.name`,
     * `event.properties.<name>`, or `event.context.<name>` where `<name>` is one of
     * `current_url`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign`,
     * `utm_content`, or `utm_term`. Any other path is rejected with 400.
     */
    field: string;

    /**
     * Comparison applied to the field. `exists` and `not_exists` ignore `value`;
     * `regex` matches the field against `value` as a regular expression.
     */
    operator: 'contains' | 'equals' | 'exists' | 'not_equals' | 'not_exists' | 'regex';

    /**
     * Scalar value the operator compares against. Omit for `exists` and `not_exists`.
     * Nested objects and arrays are rejected.
     */
    value?: string | null;
  }
}

export interface PersonalizationPropertyUpdateResponse {
  /**
   * Unique identifier for this personalization property.
   */
  id: string;

  /**
   * How repeated trigger events fold into the stored value. `set_true` records
   * `true` the first time the event matches — use it for one-shot interest flags.
   * `increment` counts matching events as a number. `latest_value` stores the most
   * recent value read from `valueField`, replacing whatever was there before.
   */
  accumulator: 'increment' | 'latest_value' | 'set_true';

  /**
   * ISO 8601 timestamp of when the property was created.
   */
  createdAt: string;

  /**
   * Experiment settings record that owns this property.
   */
  experimentSettingsId: string;

  /**
   * Name this value is stored and read under. Must be unique within the parent
   * experiment settings record — a duplicate key is rejected with 409. Because
   * accumulated values are delivered to the visitor's browser and are readable
   * there, never accumulate secrets, credentials, PHI, or confidential data into a
   * property.
   */
  propertyKey: string;

  /**
   * Whether the property is accumulating. `Disabled` properties stop accumulating
   * but keep values already recorded.
   */
  status: 'Disabled' | 'Enabled';

  /**
   * Name of the tracked event that advances this property. Every event with this
   * name is evaluated against `triggerConditions`.
   */
  triggerEventName: string;

  /**
   * Optional filters the triggering event must satisfy. All conditions must match
   * (AND). Omit or send an empty list to accumulate on every event with the matching
   * name.
   */
  triggerConditions?: Array<PersonalizationPropertyUpdateResponse.TriggerCondition> | null;

  /**
   * ISO 8601 timestamp of the last update, or null when never updated.
   */
  updatedAt?: string | null;

  /**
   * Event field to read the stored value from. Required for `latest_value`; ignored
   * by `set_true` and `increment`. Only scalar values (string, number, boolean) are
   * stored. Must be one of `event.name`, `event.properties.<name>`, or
   * `event.context.<name>` where `<name>` is one of `current_url`, `referrer`,
   * `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, or `utm_term`. Any
   * other path is rejected with 400.
   */
  valueField?: string | null;
}

export namespace PersonalizationPropertyUpdateResponse {
  export interface TriggerCondition {
    /**
     * Event field the condition reads. Must be one of `event.name`,
     * `event.properties.<name>`, or `event.context.<name>` where `<name>` is one of
     * `current_url`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign`,
     * `utm_content`, or `utm_term`. Any other path is rejected with 400.
     */
    field: string;

    /**
     * Comparison applied to the field. `exists` and `not_exists` ignore `value`;
     * `regex` matches the field against `value` as a regular expression.
     */
    operator: 'contains' | 'equals' | 'exists' | 'not_equals' | 'not_exists' | 'regex';

    /**
     * Scalar value the operator compares against. Omit for `exists` and `not_exists`.
     * Nested objects and arrays are rejected.
     */
    value?: string | null;
  }
}

/**
 * Whether the personalization property was deleted successfully.
 */
export type PersonalizationPropertyDeleteResponse = boolean;

export interface PersonalizationPropertyListParams extends CursorParams {
  /**
   * Required. List properties belonging to this experiment settings record. Get the
   * id from `GET /rest/v1/experiment-settings`.
   */
  experimentSettingsId: string;
}

export interface PersonalizationPropertyCreateParams {
  /**
   * How repeated trigger events fold into the stored value. `set_true` records
   * `true` the first time the event matches — use it for one-shot interest flags.
   * `increment` counts matching events as a number. `latest_value` stores the most
   * recent value read from `valueField`, replacing whatever was there before.
   */
  accumulator: 'increment' | 'latest_value' | 'set_true';

  /**
   * Experiment settings record that will own this property. Get the id from
   * `GET /rest/v1/experiment-settings`.
   */
  experimentSettingsId: string;

  /**
   * Name this value is stored and read under. Must be unique within the parent
   * experiment settings record — a duplicate key is rejected with 409. Because
   * accumulated values are delivered to the visitor's browser and are readable
   * there, never accumulate secrets, credentials, PHI, or confidential data into a
   * property.
   */
  propertyKey: string;

  /**
   * Name of the tracked event that advances this property. Every event with this
   * name is evaluated against `triggerConditions`.
   */
  triggerEventName: string;

  /**
   * Optional filters the triggering event must satisfy. All conditions must match
   * (AND). Omit or send an empty list to accumulate on every event with the matching
   * name.
   */
  triggerConditions?: Array<PersonalizationPropertyCreateParams.TriggerCondition> | null;

  /**
   * Event field to read the stored value from. Required for `latest_value`; ignored
   * by `set_true` and `increment`. Only scalar values (string, number, boolean) are
   * stored. Must be one of `event.name`, `event.properties.<name>`, or
   * `event.context.<name>` where `<name>` is one of `current_url`, `referrer`,
   * `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, or `utm_term`. Any
   * other path is rejected with 400.
   */
  valueField?: string | null;
}

export namespace PersonalizationPropertyCreateParams {
  export interface TriggerCondition {
    /**
     * Event field the condition reads. Must be one of `event.name`,
     * `event.properties.<name>`, or `event.context.<name>` where `<name>` is one of
     * `current_url`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign`,
     * `utm_content`, or `utm_term`. Any other path is rejected with 400.
     */
    field: string;

    /**
     * Comparison applied to the field. `exists` and `not_exists` ignore `value`;
     * `regex` matches the field against `value` as a regular expression.
     */
    operator: 'contains' | 'equals' | 'exists' | 'not_equals' | 'not_exists' | 'regex';

    /**
     * Scalar value the operator compares against. Omit for `exists` and `not_exists`.
     * Nested objects and arrays are rejected.
     */
    value?: string | null;
  }
}

export interface PersonalizationPropertyUpdateParams {
  /**
   * How repeated trigger events fold into the stored value. `set_true` records
   * `true` the first time the event matches — use it for one-shot interest flags.
   * `increment` counts matching events as a number. `latest_value` stores the most
   * recent value read from `valueField`, replacing whatever was there before. Omit
   * this field or send `null` to leave it unchanged.
   */
  accumulator?: 'increment' | 'latest_value' | 'set_true' | null;

  /**
   * Renamed key. Name this value is stored and read under. Must be unique within the
   * parent experiment settings record — a duplicate key is rejected with 409.
   * Because accumulated values are delivered to the visitor's browser and are
   * readable there, never accumulate secrets, credentials, PHI, or confidential data
   * into a property. Omit this field or send `null` to leave it unchanged.
   */
  propertyKey?: string | null;

  /**
   * Pause or resume accumulation. `Disabled` stops accumulating without discarding
   * values already recorded. Omit this field or send `null` to leave it unchanged.
   */
  status?: 'Disabled' | 'Enabled' | null;

  /**
   * Optional filters the triggering event must satisfy. All conditions must match
   * (AND). Omit or send an empty list to accumulate on every event with the matching
   * name. Sending this field replaces the prior list — partial-array merging is not
   * supported. Send `null` or an empty array to clear every condition, which makes
   * the rule fire on each occurrence of the trigger event.
   */
  triggerConditions?: Array<PersonalizationPropertyUpdateParams.TriggerCondition> | null;

  /**
   * Name of the tracked event that advances this property. Every event with this
   * name is evaluated against `triggerConditions`. Omit this field or send `null` to
   * leave it unchanged.
   */
  triggerEventName?: string | null;

  /**
   * Event field to read the stored value from. Required for `latest_value`; ignored
   * by `set_true` and `increment`. Only scalar values (string, number, boolean) are
   * stored. Must be one of `event.name`, `event.properties.<name>`, or
   * `event.context.<name>` where `<name>` is one of `current_url`, `referrer`,
   * `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, or `utm_term`. Any
   * other path is rejected with 400.
   */
  valueField?: string | null;
}

export namespace PersonalizationPropertyUpdateParams {
  export interface TriggerCondition {
    /**
     * Event field the condition reads. Must be one of `event.name`,
     * `event.properties.<name>`, or `event.context.<name>` where `<name>` is one of
     * `current_url`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign`,
     * `utm_content`, or `utm_term`. Any other path is rejected with 400.
     */
    field: string;

    /**
     * Comparison applied to the field. `exists` and `not_exists` ignore `value`;
     * `regex` matches the field against `value` as a regular expression.
     */
    operator: 'contains' | 'equals' | 'exists' | 'not_equals' | 'not_exists' | 'regex';

    /**
     * Scalar value the operator compares against. Omit for `exists` and `not_exists`.
     * Nested objects and arrays are rejected.
     */
    value?: string | null;
  }
}

export declare namespace PersonalizationProperties {
  export {
    type PersonalizationPropertyListResponse as PersonalizationPropertyListResponse,
    type PersonalizationPropertyCreateResponse as PersonalizationPropertyCreateResponse,
    type PersonalizationPropertyRetrieveResponse as PersonalizationPropertyRetrieveResponse,
    type PersonalizationPropertyUpdateResponse as PersonalizationPropertyUpdateResponse,
    type PersonalizationPropertyDeleteResponse as PersonalizationPropertyDeleteResponse,
    type PersonalizationPropertyListResponsesCursor as PersonalizationPropertyListResponsesCursor,
    type PersonalizationPropertyListParams as PersonalizationPropertyListParams,
    type PersonalizationPropertyCreateParams as PersonalizationPropertyCreateParams,
    type PersonalizationPropertyUpdateParams as PersonalizationPropertyUpdateParams,
  };
}
