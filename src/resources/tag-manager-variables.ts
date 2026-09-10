// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class TagManagerVariables extends APIResource {
  /**
   * List variables inside a single tag manager. Requires the `tagManagerId` query
   * parameter — variables are always scoped to one parent container. Supports cursor
   * pagination via `limit` and `cursor`; the limit clamp is 1000 so a single request
   * can return the full set (the web-app workspace renders all variables in one
   * shot). Requires scope: tagManagers:find
   */
  list(
    query: TagManagerVariableListParams,
    options?: RequestOptions,
  ): PagePromise<TagManagerVariableListResponsesCursor, TagManagerVariableListResponse> {
    return this._client.getAPIList('/rest/v1/tag-manager-variables', Cursor<TagManagerVariableListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Create a new variable inside a tag manager. `tagManagerId` is required in the
   * body. Known input failures (e.g. duplicate variable name within the tag manager)
   * are returned as HTTP 409 with the reason in the response `error` field. Requires
   * scope: tagManagers:update
   */
  create(
    body: TagManagerVariableCreateParams,
    options?: RequestOptions,
  ): APIPromise<TagManagerVariableCreateResponse> {
    return this._client.post('/rest/v1/tag-manager-variables', { body, ...options });
  }

  /**
   * Find a single tag manager variable by ID. Requires scope: tagManagers:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<TagManagerVariableRetrieveResponse> {
    return this._client.get(path`/rest/v1/tag-manager-variables/${id}`, options);
  }

  /**
   * Partially update a variable. Only the fields you send are changed. Name
   * collisions with other variables in the same tag manager return 409 with the
   * reason in the response `error` field. To assign a variable to a folder, use
   * `POST /rest/v1/tag-manager-asset-folders`. Requires scope: tagManagers:update
   */
  update(
    id: string,
    body: TagManagerVariableUpdateParams,
    options?: RequestOptions,
  ): APIPromise<TagManagerVariableUpdateResponse> {
    return this._client.patch(path`/rest/v1/tag-manager-variables/${id}`, { body, ...options });
  }

  /**
   * Delete a tag manager variable. Requires scope: tagManagers:update
   */
  delete(id: string, options?: RequestOptions): APIPromise<TagManagerVariableDeleteResponse> {
    return this._client.delete(path`/rest/v1/tag-manager-variables/${id}`, options);
  }

  /**
   * Lists every variable template the platform supports — what `type` discriminator
   * to send on create/patch, the shape of the type-specific `parameters` payload,
   * and `supportsVariables` (whether the variable's own parameter fields may
   * reference `{{OtherVariable}}` at runtime). Account-agnostic: the response is the
   * same for every API key. Requires scope: tagManagers:find
   */
  types(options?: RequestOptions): APIPromise<TagManagerVariableTypesResponse> {
    return this._client.get('/rest/v1/tag-manager-variables/types', options);
  }
}

export type TagManagerVariableListResponsesCursor = Cursor<TagManagerVariableListResponse>;

export interface TagManagerVariableListResponse {
  id: string;

  accountId: string;

  name: string;

  /**
   * Type-specific configuration.
   */
  parameters: { [key: string]: unknown };

  tagManagerId: string;

  /**
   * Variable type discriminator. Examples that exist today: `DataLayer`, `Constant`,
   * `Cookie`, `Url`, `UrlParameter`, `Weekday`, `RandomNumber`. Pick from
   * `GET /tag-manager-variables/types` for the canonical set.
   */
  type: string;

  createdAt?: string | null;

  /**
   * Default value returned when no rule matches. JSON value — type depends on
   * `type`.
   */
  defaultValue?: { [key: string]: unknown };

  enabled?: boolean | null;

  /**
   * Folder this variable belongs to. Settable via PATCH — send a folder UUID to
   * assign, or `null` to remove from its current folder.
   */
  folderId?: string | null;

  /**
   * Optional lookup table for `LookUpTable`-style variables. JSON value.
   */
  lookUpTable?: { [key: string]: unknown };

  updatedAt?: string | null;
}

export interface TagManagerVariableCreateResponse {
  id: string;

  accountId: string;

  name: string;

  /**
   * Type-specific configuration.
   */
  parameters: { [key: string]: unknown };

  tagManagerId: string;

  /**
   * Variable type discriminator. Examples that exist today: `DataLayer`, `Constant`,
   * `Cookie`, `Url`, `UrlParameter`, `Weekday`, `RandomNumber`. Pick from
   * `GET /tag-manager-variables/types` for the canonical set.
   */
  type: string;

  createdAt?: string | null;

  /**
   * Default value returned when no rule matches. JSON value — type depends on
   * `type`.
   */
  defaultValue?: { [key: string]: unknown };

  enabled?: boolean | null;

  /**
   * Folder this variable belongs to. Settable via PATCH — send a folder UUID to
   * assign, or `null` to remove from its current folder.
   */
  folderId?: string | null;

  /**
   * Optional lookup table for `LookUpTable`-style variables. JSON value.
   */
  lookUpTable?: { [key: string]: unknown };

  updatedAt?: string | null;
}

export interface TagManagerVariableRetrieveResponse {
  id: string;

  accountId: string;

  name: string;

  /**
   * Type-specific configuration.
   */
  parameters: { [key: string]: unknown };

  tagManagerId: string;

  /**
   * Variable type discriminator. Examples that exist today: `DataLayer`, `Constant`,
   * `Cookie`, `Url`, `UrlParameter`, `Weekday`, `RandomNumber`. Pick from
   * `GET /tag-manager-variables/types` for the canonical set.
   */
  type: string;

  createdAt?: string | null;

  /**
   * Default value returned when no rule matches. JSON value — type depends on
   * `type`.
   */
  defaultValue?: { [key: string]: unknown };

  enabled?: boolean | null;

  /**
   * Folder this variable belongs to. Settable via PATCH — send a folder UUID to
   * assign, or `null` to remove from its current folder.
   */
  folderId?: string | null;

  /**
   * Optional lookup table for `LookUpTable`-style variables. JSON value.
   */
  lookUpTable?: { [key: string]: unknown };

  updatedAt?: string | null;
}

export interface TagManagerVariableUpdateResponse {
  id: string;

  accountId: string;

  name: string;

  /**
   * Type-specific configuration.
   */
  parameters: { [key: string]: unknown };

  tagManagerId: string;

  /**
   * Variable type discriminator. Examples that exist today: `DataLayer`, `Constant`,
   * `Cookie`, `Url`, `UrlParameter`, `Weekday`, `RandomNumber`. Pick from
   * `GET /tag-manager-variables/types` for the canonical set.
   */
  type: string;

  createdAt?: string | null;

  /**
   * Default value returned when no rule matches. JSON value — type depends on
   * `type`.
   */
  defaultValue?: { [key: string]: unknown };

  enabled?: boolean | null;

  /**
   * Folder this variable belongs to. Settable via PATCH — send a folder UUID to
   * assign, or `null` to remove from its current folder.
   */
  folderId?: string | null;

  /**
   * Optional lookup table for `LookUpTable`-style variables. JSON value.
   */
  lookUpTable?: { [key: string]: unknown };

  updatedAt?: string | null;
}

export interface TagManagerVariableDeleteResponse {
  id: string;

  deleted: boolean;
}

export interface TagManagerVariableTypesResponse {
  entities: Array<TagManagerVariableTypesResponse.Entity>;
}

export namespace TagManagerVariableTypesResponse {
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

    /**
     * When `true`, this variable type's parameter fields can themselves contain
     * `{{OtherVariable}}` references that the SDK resolves at runtime.
     */
    supportsVariables?: boolean | null;
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

export interface TagManagerVariableListParams extends CursorParams {
  /**
   * Parent tag manager whose variables should be returned.
   */
  tagManagerId: string;
}

export interface TagManagerVariableCreateParams {
  name: string;

  /**
   * Type-specific JSON configuration.
   */
  parameters: { [key: string]: unknown };

  /**
   * Parent tag manager that will own the new variable.
   */
  tagManagerId: string;

  /**
   * Variable type discriminator. Pick from `GET /tag-manager-variables/types` for
   * the canonical set (e.g. `DataLayer`, `Constant`, `Cookie`, `Url`).
   */
  type: string;

  /**
   * Optional default value. JSON value of any type.
   */
  defaultValue?: { [key: string]: unknown } | null;

  enabled?: boolean | null;

  /**
   * Optional lookup table for `LookUpTable` variables.
   */
  lookUpTable?: { [key: string]: unknown } | null;
}

export interface TagManagerVariableUpdateParams {
  /**
   * Updated default value. JSON value of any type.
   */
  defaultValue?: { [key: string]: unknown } | null;

  /**
   * Pause/resume the variable without changing other fields.
   */
  enabled?: boolean | null;

  /**
   * Updated lookup table payload.
   */
  lookUpTable?: { [key: string]: unknown } | null;

  /**
   * Updated variable name.
   */
  name?: string;

  /**
   * Updated type-specific JSON configuration.
   */
  parameters?: { [key: string]: unknown };

  /**
   * Updated variable type. Pick from `GET /tag-manager-variables/types`.
   */
  type?: string;
}

export declare namespace TagManagerVariables {
  export {
    type TagManagerVariableListResponse as TagManagerVariableListResponse,
    type TagManagerVariableCreateResponse as TagManagerVariableCreateResponse,
    type TagManagerVariableRetrieveResponse as TagManagerVariableRetrieveResponse,
    type TagManagerVariableUpdateResponse as TagManagerVariableUpdateResponse,
    type TagManagerVariableDeleteResponse as TagManagerVariableDeleteResponse,
    type TagManagerVariableTypesResponse as TagManagerVariableTypesResponse,
    type TagManagerVariableListResponsesCursor as TagManagerVariableListResponsesCursor,
    type TagManagerVariableListParams as TagManagerVariableListParams,
    type TagManagerVariableCreateParams as TagManagerVariableCreateParams,
    type TagManagerVariableUpdateParams as TagManagerVariableUpdateParams,
  };
}
