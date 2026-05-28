// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class TagManagerTriggers extends APIResource {
  /**
   * List triggers inside a single tag manager. Requires the `tagManagerId` query
   * parameter — triggers are always scoped to one parent container. Supports cursor
   * pagination via `limit` and `cursor`; the limit clamp is 1000 so a single request
   * can return the full set (the web-app workspace renders all triggers in one
   * shot). Requires scope: tagManagers:find
   */
  list(
    query: TagManagerTriggerListParams,
    options?: RequestOptions,
  ): PagePromise<TagManagerTriggerListResponsesCursor, TagManagerTriggerListResponse> {
    return this._client.getAPIList('/rest/v1/tag-manager-triggers', Cursor<TagManagerTriggerListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Create a new trigger inside a tag manager. `tagManagerId` is required in the
   * body. Send `conditions: []` for an unconditional trigger; otherwise supply
   * type-specific condition objects. Requires scope: tagManagers:update
   */
  create(
    body: TagManagerTriggerCreateParams,
    options?: RequestOptions,
  ): APIPromise<TagManagerTriggerCreateResponse> {
    return this._client.post('/rest/v1/tag-manager-triggers', { body, ...options });
  }

  /**
   * Find a single tag manager trigger by ID. Requires scope: tagManagers:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<TagManagerTriggerRetrieveResponse> {
    return this._client.get(path`/rest/v1/tag-manager-triggers/${id}`, options);
  }

  /**
   * Partially update a trigger. Only the fields you send are changed. `conditions`
   * is replaced wholesale when sent. To assign a trigger to a folder, use
   * `POST /rest/v1/tag-manager-asset-folders`. Requires scope: tagManagers:update
   */
  update(
    id: string,
    body: TagManagerTriggerUpdateParams,
    options?: RequestOptions,
  ): APIPromise<TagManagerTriggerUpdateResponse> {
    return this._client.patch(path`/rest/v1/tag-manager-triggers/${id}`, { body, ...options });
  }

  /**
   * Delete a tag manager trigger. Requires scope: tagManagers:update
   */
  delete(id: string, options?: RequestOptions): APIPromise<TagManagerTriggerDeleteResponse> {
    return this._client.delete(path`/rest/v1/tag-manager-triggers/${id}`, options);
  }

  /**
   * Lists every trigger template the platform supports — what `type` discriminator
   * to send on create/patch, and the shape of the type-specific `parameters`
   * payload. Trigger `conditions` are evaluated at runtime (per-trigger, see the
   * resource docs) and are not part of this descriptor. Account-agnostic: the
   * response is the same for every API key. Requires scope: tagManagers:find
   */
  types(options?: RequestOptions): APIPromise<TagManagerTriggerTypesResponse> {
    return this._client.get('/rest/v1/tag-manager-triggers/types', options);
  }
}

export type TagManagerTriggerListResponsesCursor = Cursor<TagManagerTriggerListResponse>;

export interface TagManagerTriggerListResponse {
  id: string;

  accountId: string;

  /**
   * Conditions that must hold for the trigger to match. Use `[]` for unconditional
   * triggers.
   */
  conditions: Array<{ [key: string]: unknown }>;

  name: string;

  /**
   * Type-specific configuration. Send `{}` for a no-op trigger.
   */
  parameters: { [key: string]: unknown };

  tagManagerId: string;

  /**
   * Trigger type discriminator. Examples that exist today: `PageView`, `DomReady`,
   * `Initialization`, `AllElementsClick`, `AllLinksClick`, `FormSubmit`,
   * `CustomEvent`, `ScrollReach`, `Timer`. Pick from
   * `GET /tag-manager-triggers/types` for the canonical set. Note there is no plain
   * `Click` id; use one of the `All*Click` variants.
   */
  type: string;

  createdAt?: string | null;

  enabled?: boolean | null;

  /**
   * Folder this trigger belongs to. Settable via PATCH — send a folder UUID to
   * assign, or `null` to remove from its current folder.
   */
  folderId?: string | null;

  updatedAt?: string | null;
}

export interface TagManagerTriggerCreateResponse {
  id: string;

  accountId: string;

  /**
   * Conditions that must hold for the trigger to match. Use `[]` for unconditional
   * triggers.
   */
  conditions: Array<{ [key: string]: unknown }>;

  name: string;

  /**
   * Type-specific configuration. Send `{}` for a no-op trigger.
   */
  parameters: { [key: string]: unknown };

  tagManagerId: string;

  /**
   * Trigger type discriminator. Examples that exist today: `PageView`, `DomReady`,
   * `Initialization`, `AllElementsClick`, `AllLinksClick`, `FormSubmit`,
   * `CustomEvent`, `ScrollReach`, `Timer`. Pick from
   * `GET /tag-manager-triggers/types` for the canonical set. Note there is no plain
   * `Click` id; use one of the `All*Click` variants.
   */
  type: string;

  createdAt?: string | null;

  enabled?: boolean | null;

  /**
   * Folder this trigger belongs to. Settable via PATCH — send a folder UUID to
   * assign, or `null` to remove from its current folder.
   */
  folderId?: string | null;

  updatedAt?: string | null;
}

export interface TagManagerTriggerRetrieveResponse {
  id: string;

  accountId: string;

  /**
   * Conditions that must hold for the trigger to match. Use `[]` for unconditional
   * triggers.
   */
  conditions: Array<{ [key: string]: unknown }>;

  name: string;

  /**
   * Type-specific configuration. Send `{}` for a no-op trigger.
   */
  parameters: { [key: string]: unknown };

  tagManagerId: string;

  /**
   * Trigger type discriminator. Examples that exist today: `PageView`, `DomReady`,
   * `Initialization`, `AllElementsClick`, `AllLinksClick`, `FormSubmit`,
   * `CustomEvent`, `ScrollReach`, `Timer`. Pick from
   * `GET /tag-manager-triggers/types` for the canonical set. Note there is no plain
   * `Click` id; use one of the `All*Click` variants.
   */
  type: string;

  createdAt?: string | null;

  enabled?: boolean | null;

  /**
   * Folder this trigger belongs to. Settable via PATCH — send a folder UUID to
   * assign, or `null` to remove from its current folder.
   */
  folderId?: string | null;

  updatedAt?: string | null;
}

export interface TagManagerTriggerUpdateResponse {
  id: string;

  accountId: string;

  /**
   * Conditions that must hold for the trigger to match. Use `[]` for unconditional
   * triggers.
   */
  conditions: Array<{ [key: string]: unknown }>;

  name: string;

  /**
   * Type-specific configuration. Send `{}` for a no-op trigger.
   */
  parameters: { [key: string]: unknown };

  tagManagerId: string;

  /**
   * Trigger type discriminator. Examples that exist today: `PageView`, `DomReady`,
   * `Initialization`, `AllElementsClick`, `AllLinksClick`, `FormSubmit`,
   * `CustomEvent`, `ScrollReach`, `Timer`. Pick from
   * `GET /tag-manager-triggers/types` for the canonical set. Note there is no plain
   * `Click` id; use one of the `All*Click` variants.
   */
  type: string;

  createdAt?: string | null;

  enabled?: boolean | null;

  /**
   * Folder this trigger belongs to. Settable via PATCH — send a folder UUID to
   * assign, or `null` to remove from its current folder.
   */
  folderId?: string | null;

  updatedAt?: string | null;
}

export interface TagManagerTriggerDeleteResponse {
  id: string;

  deleted: boolean;
}

export interface TagManagerTriggerTypesResponse {
  entities: Array<TagManagerTriggerTypesResponse.Entity>;
}

export namespace TagManagerTriggerTypesResponse {
  export interface Entity {
    /**
     * Type discriminator — pass this as `type` on create/patch.
     */
    id: string;

    /**
     * Grouping label.
     */
    category: string;

    fields: Array<Entity.Field>;

    /**
     * Human-readable display name.
     */
    name: string;

    description?: string | null;
  }

  export namespace Entity {
    export interface Field {
      /**
       * Parameter key that goes in the `parameters` payload at create/patch.
       */
      id: string;

      /**
       * Human-readable title for the field.
       */
      title: string;

      /**
       * Underlying data type of the parameter value.
       */
      type: 'STRING' | 'BOOLEAN' | 'INTEGER' | 'FLOAT' | 'TABLE';

      /**
       * For TABLE-typed fields, the predefined keys each row may contain.
       */
      allowedKeys?: Array<string> | null;

      /**
       * When present, the field accepts only one of these values. Send the `value`
       * string in `parameters`; the `label` is for display.
       */
      availableValues?: Array<Field.AvailableValue> | null;

      /**
       * Default value when the caller omits the parameter on create.
       */
      default?: { [key: string]: unknown };

      description?: string | null;

      /**
       * When `true`, omitting or sending an empty value for this parameter on
       * create/patch returns HTTP 400.
       */
      required?: boolean | null;

      /**
       * Server-enforced rules applied to this field at create and patch.
       */
      validators?: Array<Field.Validator> | null;
    }

    export namespace Field {
      export interface AvailableValue {
        label: string;

        value: string;
      }

      export interface Validator {
        type: 'NotEmpty' | 'CharacterLength' | 'Url' | 'Email' | 'Number' | 'Range';

        max?: number | null;

        min?: number | null;
      }
    }
  }
}

export interface TagManagerTriggerListParams extends CursorParams {
  /**
   * Parent tag manager whose triggers should be returned.
   */
  tagManagerId: string;
}

export interface TagManagerTriggerCreateParams {
  /**
   * Match conditions; use `[]` for an unconditional trigger.
   */
  conditions: Array<{ [key: string]: unknown }>;

  name: string;

  /**
   * Type-specific JSON configuration.
   */
  parameters: { [key: string]: unknown };

  /**
   * Parent tag manager that will own the new trigger.
   */
  tagManagerId: string;

  /**
   * Trigger type discriminator. Pick from `GET /tag-manager-triggers/types` for the
   * canonical set (e.g. `PageView`, `CustomEvent`, `AllElementsClick`).
   */
  type: string;

  enabled?: boolean | null;
}

export interface TagManagerTriggerUpdateParams {
  /**
   * Replaces conditions wholesale when sent. Use `[]` for an unconditional trigger.
   */
  conditions?: Array<{ [key: string]: unknown }>;

  /**
   * Pause/resume the trigger without changing other fields.
   */
  enabled?: boolean | null;

  /**
   * Updated trigger name.
   */
  name?: string;

  /**
   * Updated type-specific JSON configuration.
   */
  parameters?: { [key: string]: unknown };

  /**
   * Updated trigger type. Pick from `GET /tag-manager-triggers/types`.
   */
  type?: string;
}

export declare namespace TagManagerTriggers {
  export {
    type TagManagerTriggerListResponse as TagManagerTriggerListResponse,
    type TagManagerTriggerCreateResponse as TagManagerTriggerCreateResponse,
    type TagManagerTriggerRetrieveResponse as TagManagerTriggerRetrieveResponse,
    type TagManagerTriggerUpdateResponse as TagManagerTriggerUpdateResponse,
    type TagManagerTriggerDeleteResponse as TagManagerTriggerDeleteResponse,
    type TagManagerTriggerTypesResponse as TagManagerTriggerTypesResponse,
    type TagManagerTriggerListResponsesCursor as TagManagerTriggerListResponsesCursor,
    type TagManagerTriggerListParams as TagManagerTriggerListParams,
    type TagManagerTriggerCreateParams as TagManagerTriggerCreateParams,
    type TagManagerTriggerUpdateParams as TagManagerTriggerUpdateParams,
  };
}
