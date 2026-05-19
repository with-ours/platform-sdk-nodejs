// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Mappings extends APIResource {
  /**
   * List mappings for an entity (a source or destination). Requires the `entityId`
   * query parameter. Supports cursor pagination via `limit` and `cursor`. Sorted by
   * `priority` ascending, then by `id` for deterministic pagination. Requires scope:
   * mapping:list
   */
  list(
    query: MappingListParams,
    options?: RequestOptions,
  ): PagePromise<MappingListResponsesCursor, MappingListResponse> {
    return this._client.getAPIList('/rest/v1/mappings', Cursor<MappingListResponse>, { query, ...options });
  }

  /**
   * Create a mapping. Two body shapes are accepted:
   *
   * 1. Quick-create — `{ allowedEventId, destinationId }`. Binds an allowed event to
   *    a destination. Returns a slim entity with empty `mappings[]`; follow up with
   *    PATCH to populate fields.
   * 2. Template fat-create —
   *    `{ entityId, templateId, mappings?, logic?, isEnabled?, name?, insertAfterIdx? }`.
   *    Lands a fully-shaped mapping in one round-trip. Use
   *    `GET /rest/v1/mapping-templates?entityId=...` to discover the valid
   *    `templateId` and `mappings[].property` values.
   *
   * Sending both `allowedEventId` and `templateId` returns 400. Requires scope:
   * mapping:create
   */
  create(body: MappingCreateParams, options?: RequestOptions): APIPromise<MappingCreateResponse> {
    return this._client.post('/rest/v1/mappings', { body, ...options });
  }

  /**
   * Find a single mapping by ID. Requires scope: mapping:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<MappingRetrieveResponse> {
    return this._client.get(path`/rest/v1/mappings/${id}`, options);
  }

  /**
   * Partially update a mapping. Only the fields you send are changed. Send
   * `isEnabled: false` to pause the mapping without changing other fields (mirrors
   * `status` on destinations). `mappings[]` is replaced wholesale when sent.
   * Requires scope: mapping:update
   */
  update(id: string, body: MappingUpdateParams, options?: RequestOptions): APIPromise<MappingUpdateResponse> {
    return this._client.patch(path`/rest/v1/mappings/${id}`, { body, ...options });
  }

  /**
   * Delete a mapping. Requires scope: mapping:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<MappingDeleteResponse> {
    return this._client.delete(path`/rest/v1/mappings/${id}`, options);
  }

  /**
   * Reassign `priority` for a set of mappings. Pass `{ uuids: [...] }` with the
   * mapping ids in their new order — index 0 becomes the highest-priority mapping.
   * All ids must belong to the same parent entity (source or destination); mixing
   * entities returns 400. Requires scope: mapping:update
   */
  reorder(body: MappingReorderParams, options?: RequestOptions): APIPromise<MappingReorderResponse> {
    return this._client.post('/rest/v1/mappings/reorder', { body, ...options });
  }

  /**
   * Discover every mapping template available for a destination or source, with full
   * property descriptors inlined. Use the returned `id` as `templateId` when calling
   * `POST /rest/v1/mappings` (template fat-create variant), and use each entry under
   * `mappings[]` to learn the valid `property`, `kind`, `modificationOptions`, and
   * any enforced `options`. The `isDefault: true` entry is the destination's
   * built-in default template (the one stored at `MAPPER#{destinationId}` when
   * configured via `PUT /rest/v1/default-mappings/{destinationId}`). Requires scope:
   * mapping:find
   */
  templates(query: MappingTemplatesParams, options?: RequestOptions): APIPromise<MappingTemplatesResponse> {
    return this._client.get('/rest/v1/mappings/templates', { query, ...options });
  }

  /**
   * Lists the platform-provided variables that any mapping `value` can reference
   * (e.g. `event.email`, `event.request_context.ip`, `visitor.id`). Account-agnostic
   * discovery — use these paths as the right-hand side of a mapping field. Requires
   * scope: variables:find-default
   */
  defaultVariables(options?: RequestOptions): APIPromise<MappingDefaultVariablesResponse> {
    return this._client.get('/rest/v1/mappings/default-variables', options);
  }

  /**
   * Lists the custom variables observed in this account’s recent event stream (last
   * 14 days). These are dot-paths under `event.event_properties.*` that callers can
   * target in mapping `value` fields. The result is cached for 10 minutes; an empty
   * list means no custom properties have been seen yet for this account. Requires
   * scope: variables:find-custom
   */
  customVariables(options?: RequestOptions): APIPromise<MappingCustomVariablesResponse> {
    return this._client.get('/rest/v1/mappings/custom-variables', options);
  }

  /**
   * Lists every value accepted on a mapping field’s `modification` property, with a
   * human-readable label and one-sentence description. Account-agnostic. Use this
   * alongside `GET /rest/v1/mapping-templates` to render a labelled modification
   * picker without hardcoding the enum. Requires scope: variables:find-default
   */
  modifications(options?: RequestOptions): APIPromise<MappingModificationsResponse> {
    return this._client.get('/rest/v1/mappings/modifications', options);
  }
}

export type MappingListResponsesCursor = Cursor<MappingListResponse>;

export interface MappingListResponse {
  id: string;

  isEnabled: boolean;

  mappings: Array<MappingListResponse.Mapping>;

  destinationId?: string | null;

  isDefaultMapping?: boolean | null;

  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  logic?: unknown;

  name?: string | null;

  priority?: number | null;

  sourceId?: string | null;

  templateId?: string | null;

  templateName?: string | null;

  updatedAt?: string | null;
}

export namespace MappingListResponse {
  export interface Mapping {
    map: string;

    property: string;

    modification?:
      | 'CamelCase'
      | 'DmaIP'
      | 'DomainOnly'
      | 'DomainPathOnly'
      | 'DomainPathUTMs'
      | 'DomainUTMs'
      | 'FakeDomain'
      | 'FakeDomainRealPath'
      | 'FakeIP'
      | 'FullUrl'
      | 'Hash'
      | 'HashMD5'
      | 'HashedCountry'
      | 'HashedDateOfBirth'
      | 'HashedGender'
      | 'HashedNormalized'
      | 'HashedNormalizedNoSpecialChars'
      | 'HashedPhone'
      | 'HashedState'
      | 'HashedZip'
      | 'KebabCase'
      | 'LowerCase'
      | 'None'
      | 'Null'
      | 'Redacted'
      | 'RegionalIP'
      | 'SnakeCase'
      | 'StartCase'
      | 'UpperCase'
      | null;
  }
}

export interface MappingCreateResponse {
  id: string;

  isEnabled: boolean;

  mappings: Array<MappingCreateResponse.Mapping>;

  destinationId?: string | null;

  isDefaultMapping?: boolean | null;

  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  logic?: unknown;

  name?: string | null;

  priority?: number | null;

  sourceId?: string | null;

  templateId?: string | null;

  templateName?: string | null;

  updatedAt?: string | null;
}

export namespace MappingCreateResponse {
  export interface Mapping {
    map: string;

    property: string;

    modification?:
      | 'CamelCase'
      | 'DmaIP'
      | 'DomainOnly'
      | 'DomainPathOnly'
      | 'DomainPathUTMs'
      | 'DomainUTMs'
      | 'FakeDomain'
      | 'FakeDomainRealPath'
      | 'FakeIP'
      | 'FullUrl'
      | 'Hash'
      | 'HashMD5'
      | 'HashedCountry'
      | 'HashedDateOfBirth'
      | 'HashedGender'
      | 'HashedNormalized'
      | 'HashedNormalizedNoSpecialChars'
      | 'HashedPhone'
      | 'HashedState'
      | 'HashedZip'
      | 'KebabCase'
      | 'LowerCase'
      | 'None'
      | 'Null'
      | 'Redacted'
      | 'RegionalIP'
      | 'SnakeCase'
      | 'StartCase'
      | 'UpperCase'
      | null;
  }
}

export interface MappingRetrieveResponse {
  id: string;

  isEnabled: boolean;

  mappings: Array<MappingRetrieveResponse.Mapping>;

  destinationId?: string | null;

  isDefaultMapping?: boolean | null;

  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  logic?: unknown;

  name?: string | null;

  priority?: number | null;

  sourceId?: string | null;

  templateId?: string | null;

  templateName?: string | null;

  updatedAt?: string | null;
}

export namespace MappingRetrieveResponse {
  export interface Mapping {
    map: string;

    property: string;

    modification?:
      | 'CamelCase'
      | 'DmaIP'
      | 'DomainOnly'
      | 'DomainPathOnly'
      | 'DomainPathUTMs'
      | 'DomainUTMs'
      | 'FakeDomain'
      | 'FakeDomainRealPath'
      | 'FakeIP'
      | 'FullUrl'
      | 'Hash'
      | 'HashMD5'
      | 'HashedCountry'
      | 'HashedDateOfBirth'
      | 'HashedGender'
      | 'HashedNormalized'
      | 'HashedNormalizedNoSpecialChars'
      | 'HashedPhone'
      | 'HashedState'
      | 'HashedZip'
      | 'KebabCase'
      | 'LowerCase'
      | 'None'
      | 'Null'
      | 'Redacted'
      | 'RegionalIP'
      | 'SnakeCase'
      | 'StartCase'
      | 'UpperCase'
      | null;
  }
}

export interface MappingUpdateResponse {
  id: string;

  isEnabled: boolean;

  mappings: Array<MappingUpdateResponse.Mapping>;

  destinationId?: string | null;

  isDefaultMapping?: boolean | null;

  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  logic?: unknown;

  name?: string | null;

  priority?: number | null;

  sourceId?: string | null;

  templateId?: string | null;

  templateName?: string | null;

  updatedAt?: string | null;
}

export namespace MappingUpdateResponse {
  export interface Mapping {
    map: string;

    property: string;

    modification?:
      | 'CamelCase'
      | 'DmaIP'
      | 'DomainOnly'
      | 'DomainPathOnly'
      | 'DomainPathUTMs'
      | 'DomainUTMs'
      | 'FakeDomain'
      | 'FakeDomainRealPath'
      | 'FakeIP'
      | 'FullUrl'
      | 'Hash'
      | 'HashMD5'
      | 'HashedCountry'
      | 'HashedDateOfBirth'
      | 'HashedGender'
      | 'HashedNormalized'
      | 'HashedNormalizedNoSpecialChars'
      | 'HashedPhone'
      | 'HashedState'
      | 'HashedZip'
      | 'KebabCase'
      | 'LowerCase'
      | 'None'
      | 'Null'
      | 'Redacted'
      | 'RegionalIP'
      | 'SnakeCase'
      | 'StartCase'
      | 'UpperCase'
      | null;
  }
}

export type MappingDeleteResponse = boolean;

export interface MappingReorderResponse {
  entities: Array<MappingReorderResponse.Entity>;
}

export namespace MappingReorderResponse {
  export interface Entity {
    id: string;

    isEnabled: boolean;

    mappings: Array<Entity.Mapping>;

    destinationId?: string | null;

    isDefaultMapping?: boolean | null;

    /**
     * Condition tree gating when this mapping fires. A node is either a leaf
     * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
     * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
     * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
     * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
     */
    logic?: unknown;

    name?: string | null;

    priority?: number | null;

    sourceId?: string | null;

    templateId?: string | null;

    templateName?: string | null;

    updatedAt?: string | null;
  }

  export namespace Entity {
    export interface Mapping {
      map: string;

      property: string;

      modification?:
        | 'CamelCase'
        | 'DmaIP'
        | 'DomainOnly'
        | 'DomainPathOnly'
        | 'DomainPathUTMs'
        | 'DomainUTMs'
        | 'FakeDomain'
        | 'FakeDomainRealPath'
        | 'FakeIP'
        | 'FullUrl'
        | 'Hash'
        | 'HashMD5'
        | 'HashedCountry'
        | 'HashedDateOfBirth'
        | 'HashedGender'
        | 'HashedNormalized'
        | 'HashedNormalizedNoSpecialChars'
        | 'HashedPhone'
        | 'HashedState'
        | 'HashedZip'
        | 'KebabCase'
        | 'LowerCase'
        | 'None'
        | 'Null'
        | 'Redacted'
        | 'RegionalIP'
        | 'SnakeCase'
        | 'StartCase'
        | 'UpperCase'
        | null;
    }
  }
}

export interface MappingTemplatesResponse {
  entities: Array<MappingTemplatesResponse.Entity>;
}

export namespace MappingTemplatesResponse {
  export interface Entity {
    /**
     * Template identifier — pass to `POST /rest/v1/mappings` as `templateId`.
     */
    id: string;

    /**
     * True for the destination's built-in default template (the one stored at
     * `MAPPER#{destinationId}` when configured). Sources only have one template; it is
     * always default.
     */
    isDefault: boolean;

    mappings: Array<Entity.Mapping>;

    name: string;

    description?: string | null;
  }

  export namespace Entity {
    export interface Mapping {
      /**
       * Long-form description / tooltip for this property.
       */
      description: string | null;

      isPII: boolean;

      /**
       * Type information for SDK validation (Text, Integer, Email, Url, IP, Object,
       * KnownObject, Date, DateTime, Array, Boolean, JSON).
       */
      kind:
        | 'Array'
        | 'Boolean'
        | 'Date'
        | 'DateTime'
        | 'Email'
        | 'IP'
        | 'Integer'
        | 'JSON'
        | 'KnownObject'
        | 'Object'
        | 'Text'
        | 'Url';

      /**
       * Human-readable label (e.g. "Email", "Event Name").
       */
      label: string;

      /**
       * The template default source expression, e.g. `{{visitor.email}}`.
       */
      map: string;

      /**
       * The value to send as `mappings[].property` when creating or patching a mapping.
       */
      property: string;

      required: boolean;

      /**
       * The template default modification (hashing / case / URL truncation).
       */
      modification?:
        | 'CamelCase'
        | 'DmaIP'
        | 'DomainOnly'
        | 'DomainPathOnly'
        | 'DomainPathUTMs'
        | 'DomainUTMs'
        | 'FakeDomain'
        | 'FakeDomainRealPath'
        | 'FakeIP'
        | 'FullUrl'
        | 'Hash'
        | 'HashMD5'
        | 'HashedCountry'
        | 'HashedDateOfBirth'
        | 'HashedGender'
        | 'HashedNormalized'
        | 'HashedNormalizedNoSpecialChars'
        | 'HashedPhone'
        | 'HashedState'
        | 'HashedZip'
        | 'KebabCase'
        | 'LowerCase'
        | 'None'
        | 'Null'
        | 'Redacted'
        | 'RegionalIP'
        | 'SnakeCase'
        | 'StartCase'
        | 'UpperCase'
        | null;

      /**
       * Suggested modification options for this property. Not a whitelist.
       */
      modificationOptions?: Array<
        | 'CamelCase'
        | 'DmaIP'
        | 'DomainOnly'
        | 'DomainPathOnly'
        | 'DomainPathUTMs'
        | 'DomainUTMs'
        | 'FakeDomain'
        | 'FakeDomainRealPath'
        | 'FakeIP'
        | 'FullUrl'
        | 'Hash'
        | 'HashMD5'
        | 'HashedCountry'
        | 'HashedDateOfBirth'
        | 'HashedGender'
        | 'HashedNormalized'
        | 'HashedNormalizedNoSpecialChars'
        | 'HashedPhone'
        | 'HashedState'
        | 'HashedZip'
        | 'KebabCase'
        | 'LowerCase'
        | 'None'
        | 'Null'
        | 'Redacted'
        | 'RegionalIP'
        | 'SnakeCase'
        | 'StartCase'
        | 'UpperCase'
      > | null;

      /**
       * When set, the ONLY valid `map` values for this property. Typically used for
       * enum-shaped destinations.
       */
      options?: Array<Mapping.Option> | null;

      /**
       * Non-binding suggestions for the `map` value (e.g. common event names a customer
       * might want to use).
       */
      suggestedOptions?: Array<Mapping.SuggestedOption> | null;
    }

    export namespace Mapping {
      export interface Option {
        label: string;

        value: string;
      }

      export interface SuggestedOption {
        label: string;

        value: string;
      }
    }
  }
}

export interface MappingDefaultVariablesResponse {
  entities: Array<MappingDefaultVariablesResponse.Entity>;
}

export namespace MappingDefaultVariablesResponse {
  export interface Entity {
    /**
     * Sample values observed for this path (empty for unsampled defaults).
     */
    examples: Array<string>;

    /**
     * Human-readable display name.
     */
    name: string;

    /**
     * Dot-path used in mapping `value` fields (e.g. `event.email`).
     */
    path: string;

    /**
     * Relative popularity rank. Higher means more frequently set across events.
     */
    popularity: number;

    /**
     * Optional long-form context shown in the variable dictionary drawer.
     */
    advancedInfo?: string | null;
  }
}

export interface MappingCustomVariablesResponse {
  entities: Array<MappingCustomVariablesResponse.Entity>;
}

export namespace MappingCustomVariablesResponse {
  export interface Entity {
    /**
     * Sample values observed for this path (empty for unsampled defaults).
     */
    examples: Array<string>;

    /**
     * Human-readable display name.
     */
    name: string;

    /**
     * Dot-path used in mapping `value` fields (e.g. `event.email`).
     */
    path: string;

    /**
     * Relative popularity rank. Higher means more frequently set across events.
     */
    popularity: number;

    /**
     * Optional long-form context shown in the variable dictionary drawer.
     */
    advancedInfo?: string | null;
  }
}

export interface MappingModificationsResponse {
  entities: Array<MappingModificationsResponse.Entity>;
}

export namespace MappingModificationsResponse {
  export interface Entity {
    /**
     * One-sentence explanation of what the modification does to the mapped value.
     */
    description: string;

    /**
     * Short human-readable name (suitable for picker labels).
     */
    label: string;

    /**
     * Enum value to send on `modification` fields when authoring a mapping.
     */
    value:
      | 'CamelCase'
      | 'DmaIP'
      | 'DomainOnly'
      | 'DomainPathOnly'
      | 'DomainPathUTMs'
      | 'DomainUTMs'
      | 'FakeDomain'
      | 'FakeDomainRealPath'
      | 'FakeIP'
      | 'FullUrl'
      | 'Hash'
      | 'HashMD5'
      | 'HashedCountry'
      | 'HashedDateOfBirth'
      | 'HashedGender'
      | 'HashedNormalized'
      | 'HashedNormalizedNoSpecialChars'
      | 'HashedPhone'
      | 'HashedState'
      | 'HashedZip'
      | 'KebabCase'
      | 'LowerCase'
      | 'None'
      | 'Null'
      | 'Redacted'
      | 'RegionalIP'
      | 'SnakeCase'
      | 'StartCase'
      | 'UpperCase';
  }
}

export interface MappingListParams extends CursorParams {
  /**
   * Filter mappings by their parent entity id. Must be a destination id or source
   * id.
   */
  entityId: string;
}

export interface MappingCreateParams {
  /**
   * Quick-create variant: allowed event to bind the new mapping to. Required
   * together with `destinationId`. Mutually exclusive with `templateId`/`entityId`.
   */
  allowedEventId?: string;

  /**
   * Quick-create variant: destination that should receive events matched by this
   * mapping. Required together with `allowedEventId`.
   */
  destinationId?: string;

  /**
   * Template fat-create variant: destination or source id this mapping belongs to.
   * Required together with `templateId`.
   */
  entityId?: string;

  /**
   * Template fat-create only. Zero-based position in the destination/source priority
   * order to insert this mapping after. Omit to append at the end.
   */
  insertAfterIdx?: number;

  /**
   * Template fat-create only. Initial enabled state. Defaults to `true`.
   */
  isEnabled?: boolean;

  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  logic?: MappingCreateParams.Logic;

  /**
   * Template fat-create only. Optional initial property mappings. When omitted the
   * mapping is seeded with template defaults for sources and non-default destination
   * templates, and with `[]` for default destination templates.
   */
  mappings?: Array<MappingCreateParams.Mapping>;

  /**
   * Template fat-create only. Override the auto-generated mapping name.
   */
  name?: string | null;

  /**
   * Template fat-create variant: template id from `GET /rest/v1/mapping-templates`.
   * Picks the property descriptor set used to validate `mappings[].property`.
   * Required together with `entityId`.
   */
  templateId?: string;
}

export namespace MappingCreateParams {
  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  export interface Logic {
    /**
     * All child nodes must match. Each child is a `MappingLogic` node.
     */
    AND?: Array<unknown> | null;

    condition?: Logic.Condition;

    /**
     * Negates a single child `MappingLogic` node.
     */
    NOT?: unknown;

    /**
     * Any child node must match. Each child is a `MappingLogic` node.
     */
    OR?: Array<unknown> | null;
  }

  export namespace Logic {
    export interface Condition {
      operator:
        | 'Is'
        | 'IsNot'
        | 'Contains'
        | 'DoesNotContain'
        | 'StartsWith'
        | 'EndsWith'
        | 'IsFalsy'
        | 'IsTruthy'
        | 'IsNull'
        | 'IsNotNull'
        | 'IsUndefined'
        | 'IsNotUndefined'
        | 'IsGreaterThan'
        | 'IsGreaterThanOrEqual'
        | 'IsLessThan'
        | 'IsLessThanOrEqual'
        | 'IsIn'
        | 'IsNotIn'
        | 'IsFoundIn'
        | 'IsNotFoundIn'
        | 'IsTrue'
        | 'IsFalse'
        | 'IsBefore'
        | 'IsAfter'
        | 'IsBetween'
        | 'IsOnOrBefore'
        | 'IsOnOrAfter'
        | 'MatchesRegex'
        | 'MatchesRegexIgnoreCase'
        | 'DoesNotMatchRegex'
        | 'DoesNotMatchRegexIgnoreCase';

      property: string;

      value: string;
    }
  }

  export interface Mapping {
    map: string;

    property: string;

    modification?:
      | 'CamelCase'
      | 'DmaIP'
      | 'DomainOnly'
      | 'DomainPathOnly'
      | 'DomainPathUTMs'
      | 'DomainUTMs'
      | 'FakeDomain'
      | 'FakeDomainRealPath'
      | 'FakeIP'
      | 'FullUrl'
      | 'Hash'
      | 'HashMD5'
      | 'HashedCountry'
      | 'HashedDateOfBirth'
      | 'HashedGender'
      | 'HashedNormalized'
      | 'HashedNormalizedNoSpecialChars'
      | 'HashedPhone'
      | 'HashedState'
      | 'HashedZip'
      | 'KebabCase'
      | 'LowerCase'
      | 'None'
      | 'Null'
      | 'Redacted'
      | 'RegionalIP'
      | 'SnakeCase'
      | 'StartCase'
      | 'UpperCase'
      | null;
  }
}

export interface MappingUpdateParams {
  /**
   * Flip the mapping on/off without changing other fields. `null` is treated as
   * omitted.
   */
  isEnabled?: boolean | null;

  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  logic?: MappingUpdateParams.Logic;

  mappings?: Array<MappingUpdateParams.Mapping>;

  name?: string | null;
}

export namespace MappingUpdateParams {
  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves `MappingLogic` nodes, so trees nest arbitrarily. Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  export interface Logic {
    /**
     * All child nodes must match. Each child is a `MappingLogic` node.
     */
    AND?: Array<unknown> | null;

    condition?: Logic.Condition;

    /**
     * Negates a single child `MappingLogic` node.
     */
    NOT?: unknown;

    /**
     * Any child node must match. Each child is a `MappingLogic` node.
     */
    OR?: Array<unknown> | null;
  }

  export namespace Logic {
    export interface Condition {
      operator:
        | 'Is'
        | 'IsNot'
        | 'Contains'
        | 'DoesNotContain'
        | 'StartsWith'
        | 'EndsWith'
        | 'IsFalsy'
        | 'IsTruthy'
        | 'IsNull'
        | 'IsNotNull'
        | 'IsUndefined'
        | 'IsNotUndefined'
        | 'IsGreaterThan'
        | 'IsGreaterThanOrEqual'
        | 'IsLessThan'
        | 'IsLessThanOrEqual'
        | 'IsIn'
        | 'IsNotIn'
        | 'IsFoundIn'
        | 'IsNotFoundIn'
        | 'IsTrue'
        | 'IsFalse'
        | 'IsBefore'
        | 'IsAfter'
        | 'IsBetween'
        | 'IsOnOrBefore'
        | 'IsOnOrAfter'
        | 'MatchesRegex'
        | 'MatchesRegexIgnoreCase'
        | 'DoesNotMatchRegex'
        | 'DoesNotMatchRegexIgnoreCase';

      property: string;

      value: string;
    }
  }

  export interface Mapping {
    map: string;

    property: string;

    modification?:
      | 'CamelCase'
      | 'DmaIP'
      | 'DomainOnly'
      | 'DomainPathOnly'
      | 'DomainPathUTMs'
      | 'DomainUTMs'
      | 'FakeDomain'
      | 'FakeDomainRealPath'
      | 'FakeIP'
      | 'FullUrl'
      | 'Hash'
      | 'HashMD5'
      | 'HashedCountry'
      | 'HashedDateOfBirth'
      | 'HashedGender'
      | 'HashedNormalized'
      | 'HashedNormalizedNoSpecialChars'
      | 'HashedPhone'
      | 'HashedState'
      | 'HashedZip'
      | 'KebabCase'
      | 'LowerCase'
      | 'None'
      | 'Null'
      | 'Redacted'
      | 'RegionalIP'
      | 'SnakeCase'
      | 'StartCase'
      | 'UpperCase'
      | null;
  }
}

export interface MappingReorderParams {
  /**
   * Mapping ids in their new priority order, low priority index first. All ids must
   * belong to the same parent entity (source or destination).
   */
  uuids: Array<string>;
}

export interface MappingTemplatesParams {
  /**
   * Destination or source id. Required.
   */
  entityId: string;
}

export declare namespace Mappings {
  export {
    type MappingListResponse as MappingListResponse,
    type MappingCreateResponse as MappingCreateResponse,
    type MappingRetrieveResponse as MappingRetrieveResponse,
    type MappingUpdateResponse as MappingUpdateResponse,
    type MappingDeleteResponse as MappingDeleteResponse,
    type MappingReorderResponse as MappingReorderResponse,
    type MappingTemplatesResponse as MappingTemplatesResponse,
    type MappingDefaultVariablesResponse as MappingDefaultVariablesResponse,
    type MappingCustomVariablesResponse as MappingCustomVariablesResponse,
    type MappingModificationsResponse as MappingModificationsResponse,
    type MappingListResponsesCursor as MappingListResponsesCursor,
    type MappingListParams as MappingListParams,
    type MappingCreateParams as MappingCreateParams,
    type MappingUpdateParams as MappingUpdateParams,
    type MappingReorderParams as MappingReorderParams,
    type MappingTemplatesParams as MappingTemplatesParams,
  };
}
