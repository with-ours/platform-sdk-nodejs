// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class DefaultMappings extends APIResource {
  /**
   * List every stored default mapping for the account, one per destination that has
   * ever written a default. Destinations that have not yet written a default mapping
   * do not appear here. Use `GET /rest/v1/default-mappings/{destinationId}` to fetch
   * the hydrated would-be row for a specific destination. Requires API-key scope or
   * current OAuth user permission: mapping:list
   */
  list(options?: RequestOptions): APIPromise<DefaultMappingListResponse> {
    return this._client.get('/rest/v1/default-mappings', options);
  }

  /**
   * Fetch the destination's default mapping by destination id. Returns a hydrated
   * row with empty `mappings[]` when no default mapping has been written yet (so
   * callers do not need to handle a 404-vs-200 branch). Each destination has at most
   * one default mapping. Requires API-key scope or current OAuth user permission:
   * mapping:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<DefaultMappingRetrieveResponse> {
    return this._client.get(path`/rest/v1/default-mappings/${id}`, options);
  }

  /**
   * Upsert the destination default mapping. Always replaces `mappings[]` wholesale
   * (default mappings have no merge-partial semantic). Default mappings cannot have
   * custom `logic`; the field is not accepted on this endpoint. Requires API-key
   * scope or current OAuth user permission: mapping:update
   */
  replace(
    id: string,
    body: DefaultMappingReplaceParams,
    options?: RequestOptions,
  ): APIPromise<DefaultMappingReplaceResponse> {
    return this._client.put(path`/rest/v1/default-mappings/${id}`, { body, ...options });
  }
}

export interface DefaultMappingListResponse {
  entities: Array<DefaultMappingListResponse.Entity>;
}

export namespace DefaultMappingListResponse {
  export interface Entity {
    id: string;

    isEnabled: boolean;

    mappings: Array<Entity.Mapping>;

    destinationId?: string | null;

    isDefaultMapping?: boolean | null;

    /**
     * Condition tree gating when this mapping fires. A node is either a leaf
     * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
     * themselves logic nodes, so trees nest arbitrarily.
     *
     * Example leaf:
     * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
     *
     * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
     */
    logic?: Entity.Logic | null;

    name?: string | null;

    priority?: number | null;

    sourceId?: string | null;

    templateId?: string | null;

    templateName?: string | null;

    updatedAt?: string | null;
  }

  export namespace Entity {
    export interface Mapping {
      /**
       * Source expression sent to the destination for this `property`. Use `{{...}}`
       * template syntax to substitute values from the event/visitor record:
       * `{{event.event}}`, `{{event.event_properties.value}}`, `{{visitor.email}}`. Bare
       * strings (no `{{}}`) are sent verbatim. Note: `{{...}}` template syntax belongs
       * HERE, NOT in `logic.condition.property` — logic conditions use bare dotted paths
       * like `$event.event_properties.value`.
       */
      map: string;

      /**
       * Destination-side field name. Comes from the destination template — discover the
       * valid set via `GET /rest/v1/mapping-templates?entityId=...`.
       */
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

    /**
     * Condition tree gating when this mapping fires. A node is either a leaf
     * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
     * themselves logic nodes, so trees nest arbitrarily.
     *
     * Example leaf:
     * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
     *
     * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
     */
    export interface Logic {
      /**
       * All child nodes must match. Each child is itself a logic node (leaf `condition`
       * or combinator).
       */
      AND?: Array<{
        [key: string]: string | null | number | boolean | Array<unknown> | { [key: string]: unknown };
      }> | null;

      condition?: Logic.Condition | null;

      /**
       * Negates a single child logic node.
       */
      NOT?: {
        [key: string]: string | null | number | boolean | Array<unknown> | { [key: string]: unknown };
      } | null;

      /**
       * Any child node must match. Each child is itself a logic node (leaf `condition`
       * or combinator).
       */
      OR?: Array<{
        [key: string]: string | null | number | boolean | Array<unknown> | { [key: string]: unknown };
      }> | null;
    }

    export namespace Logic {
      export interface Condition {
        /**
         * Comparison verb in PascalCase. Equality/text: `Is`, `IsNot`, `Contains`,
         * `DoesNotContain`, `StartsWith`, `EndsWith`. Truthiness/nullability: `IsFalsy`,
         * `IsTruthy`, `IsNull`, `IsNotNull`, `IsUndefined`, `IsNotUndefined`, `IsTrue`,
         * `IsFalse`. Numeric: `IsGreaterThan`, `IsGreaterThanOrEqual`, `IsLessThan`,
         * `IsLessThanOrEqual`. Set membership: `IsIn`, `IsNotIn`, `IsFoundIn`,
         * `IsNotFoundIn`. Date: `IsBefore`, `IsAfter`, `IsBetween`, `IsOnOrBefore`,
         * `IsOnOrAfter`. Regex: `MatchesRegex`, `MatchesRegexIgnoreCase`,
         * `DoesNotMatchRegex`, `DoesNotMatchRegexIgnoreCase`.
         */
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

        /**
         * Bare dotted path into the event/visitor record. Examples: `$event.event`,
         * `$event.event_properties.value`, `visitor.consent.marketing`. The leading `$` is
         * optional and stripped before lookup. Do **not** use `{{...}}` here — that
         * template syntax is for mapping values (`mappings[].map`), not logic conditions,
         * and would be compared as a literal string.
         */
        property: string;

        /**
         * String compared against the resolved property. Operators that take no value
         * (`IsFalsy`, `IsTruthy`, `IsNull`, `IsNotNull`, `IsUndefined`, `IsNotUndefined`,
         * `IsTrue`, `IsFalse`) ignore this field — send `""`.
         */
        value: string;
      }
    }
  }
}

export interface DefaultMappingRetrieveResponse {
  id: string;

  isEnabled: boolean;

  mappings: Array<DefaultMappingRetrieveResponse.Mapping>;

  destinationId?: string | null;

  isDefaultMapping?: boolean | null;

  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves logic nodes, so trees nest arbitrarily.
   *
   * Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   *
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  logic?: DefaultMappingRetrieveResponse.Logic | null;

  name?: string | null;

  priority?: number | null;

  sourceId?: string | null;

  templateId?: string | null;

  templateName?: string | null;

  updatedAt?: string | null;
}

export namespace DefaultMappingRetrieveResponse {
  export interface Mapping {
    /**
     * Source expression sent to the destination for this `property`. Use `{{...}}`
     * template syntax to substitute values from the event/visitor record:
     * `{{event.event}}`, `{{event.event_properties.value}}`, `{{visitor.email}}`. Bare
     * strings (no `{{}}`) are sent verbatim. Note: `{{...}}` template syntax belongs
     * HERE, NOT in `logic.condition.property` — logic conditions use bare dotted paths
     * like `$event.event_properties.value`.
     */
    map: string;

    /**
     * Destination-side field name. Comes from the destination template — discover the
     * valid set via `GET /rest/v1/mapping-templates?entityId=...`.
     */
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

  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves logic nodes, so trees nest arbitrarily.
   *
   * Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   *
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  export interface Logic {
    /**
     * All child nodes must match. Each child is itself a logic node (leaf `condition`
     * or combinator).
     */
    AND?: Array<{
      [key: string]: string | null | number | boolean | Array<unknown> | { [key: string]: unknown };
    }> | null;

    condition?: Logic.Condition | null;

    /**
     * Negates a single child logic node.
     */
    NOT?: {
      [key: string]: string | null | number | boolean | Array<unknown> | { [key: string]: unknown };
    } | null;

    /**
     * Any child node must match. Each child is itself a logic node (leaf `condition`
     * or combinator).
     */
    OR?: Array<{
      [key: string]: string | null | number | boolean | Array<unknown> | { [key: string]: unknown };
    }> | null;
  }

  export namespace Logic {
    export interface Condition {
      /**
       * Comparison verb in PascalCase. Equality/text: `Is`, `IsNot`, `Contains`,
       * `DoesNotContain`, `StartsWith`, `EndsWith`. Truthiness/nullability: `IsFalsy`,
       * `IsTruthy`, `IsNull`, `IsNotNull`, `IsUndefined`, `IsNotUndefined`, `IsTrue`,
       * `IsFalse`. Numeric: `IsGreaterThan`, `IsGreaterThanOrEqual`, `IsLessThan`,
       * `IsLessThanOrEqual`. Set membership: `IsIn`, `IsNotIn`, `IsFoundIn`,
       * `IsNotFoundIn`. Date: `IsBefore`, `IsAfter`, `IsBetween`, `IsOnOrBefore`,
       * `IsOnOrAfter`. Regex: `MatchesRegex`, `MatchesRegexIgnoreCase`,
       * `DoesNotMatchRegex`, `DoesNotMatchRegexIgnoreCase`.
       */
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

      /**
       * Bare dotted path into the event/visitor record. Examples: `$event.event`,
       * `$event.event_properties.value`, `visitor.consent.marketing`. The leading `$` is
       * optional and stripped before lookup. Do **not** use `{{...}}` here — that
       * template syntax is for mapping values (`mappings[].map`), not logic conditions,
       * and would be compared as a literal string.
       */
      property: string;

      /**
       * String compared against the resolved property. Operators that take no value
       * (`IsFalsy`, `IsTruthy`, `IsNull`, `IsNotNull`, `IsUndefined`, `IsNotUndefined`,
       * `IsTrue`, `IsFalse`) ignore this field — send `""`.
       */
      value: string;
    }
  }
}

export interface DefaultMappingReplaceResponse {
  id: string;

  isEnabled: boolean;

  mappings: Array<DefaultMappingReplaceResponse.Mapping>;

  destinationId?: string | null;

  isDefaultMapping?: boolean | null;

  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves logic nodes, so trees nest arbitrarily.
   *
   * Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   *
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  logic?: DefaultMappingReplaceResponse.Logic | null;

  name?: string | null;

  priority?: number | null;

  sourceId?: string | null;

  templateId?: string | null;

  templateName?: string | null;

  updatedAt?: string | null;
}

export namespace DefaultMappingReplaceResponse {
  export interface Mapping {
    /**
     * Source expression sent to the destination for this `property`. Use `{{...}}`
     * template syntax to substitute values from the event/visitor record:
     * `{{event.event}}`, `{{event.event_properties.value}}`, `{{visitor.email}}`. Bare
     * strings (no `{{}}`) are sent verbatim. Note: `{{...}}` template syntax belongs
     * HERE, NOT in `logic.condition.property` — logic conditions use bare dotted paths
     * like `$event.event_properties.value`.
     */
    map: string;

    /**
     * Destination-side field name. Comes from the destination template — discover the
     * valid set via `GET /rest/v1/mapping-templates?entityId=...`.
     */
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

  /**
   * Condition tree gating when this mapping fires. A node is either a leaf
   * `condition` or a combinator (`AND`, `OR`, `NOT`). Combinator children are
   * themselves logic nodes, so trees nest arbitrarily.
   *
   * Example leaf:
   * `{ "condition": { "property": "$event.event", "operator": "Is", "value": "page_view" } }`.
   *
   * Example combinator: `{ "AND": [{ "condition": ... }, { "OR": [...] }] }`.
   */
  export interface Logic {
    /**
     * All child nodes must match. Each child is itself a logic node (leaf `condition`
     * or combinator).
     */
    AND?: Array<{
      [key: string]: string | null | number | boolean | Array<unknown> | { [key: string]: unknown };
    }> | null;

    condition?: Logic.Condition | null;

    /**
     * Negates a single child logic node.
     */
    NOT?: {
      [key: string]: string | null | number | boolean | Array<unknown> | { [key: string]: unknown };
    } | null;

    /**
     * Any child node must match. Each child is itself a logic node (leaf `condition`
     * or combinator).
     */
    OR?: Array<{
      [key: string]: string | null | number | boolean | Array<unknown> | { [key: string]: unknown };
    }> | null;
  }

  export namespace Logic {
    export interface Condition {
      /**
       * Comparison verb in PascalCase. Equality/text: `Is`, `IsNot`, `Contains`,
       * `DoesNotContain`, `StartsWith`, `EndsWith`. Truthiness/nullability: `IsFalsy`,
       * `IsTruthy`, `IsNull`, `IsNotNull`, `IsUndefined`, `IsNotUndefined`, `IsTrue`,
       * `IsFalse`. Numeric: `IsGreaterThan`, `IsGreaterThanOrEqual`, `IsLessThan`,
       * `IsLessThanOrEqual`. Set membership: `IsIn`, `IsNotIn`, `IsFoundIn`,
       * `IsNotFoundIn`. Date: `IsBefore`, `IsAfter`, `IsBetween`, `IsOnOrBefore`,
       * `IsOnOrAfter`. Regex: `MatchesRegex`, `MatchesRegexIgnoreCase`,
       * `DoesNotMatchRegex`, `DoesNotMatchRegexIgnoreCase`.
       */
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

      /**
       * Bare dotted path into the event/visitor record. Examples: `$event.event`,
       * `$event.event_properties.value`, `visitor.consent.marketing`. The leading `$` is
       * optional and stripped before lookup. Do **not** use `{{...}}` here — that
       * template syntax is for mapping values (`mappings[].map`), not logic conditions,
       * and would be compared as a literal string.
       */
      property: string;

      /**
       * String compared against the resolved property. Operators that take no value
       * (`IsFalsy`, `IsTruthy`, `IsNull`, `IsNotNull`, `IsUndefined`, `IsNotUndefined`,
       * `IsTrue`, `IsFalse`) ignore this field — send `""`.
       */
      value: string;
    }
  }
}

export interface DefaultMappingReplaceParams {
  /**
   * Property mappings to persist as the destination default. Use
   * `GET /rest/v1/mapping-templates?entityId={destinationId}` to discover the valid
   * `property` values.
   */
  mappings: Array<DefaultMappingReplaceParams.Mapping>;

  /**
   * Toggle the default mapping on/off. Defaults to `true` when omitted. `null` is
   * treated as omitted.
   */
  isEnabled?: boolean | null;
}

export namespace DefaultMappingReplaceParams {
  export interface Mapping {
    /**
     * Source expression sent to the destination for this `property`. Use `{{...}}`
     * template syntax to substitute values from the event/visitor record:
     * `{{event.event}}`, `{{event.event_properties.value}}`, `{{visitor.email}}`. Bare
     * strings (no `{{}}`) are sent verbatim. Note: `{{...}}` template syntax belongs
     * HERE, NOT in `logic.condition.property` — logic conditions use bare dotted paths
     * like `$event.event_properties.value`.
     */
    map: string;

    /**
     * Destination-side field name. Comes from the destination template — discover the
     * valid set via `GET /rest/v1/mapping-templates?entityId=...`.
     */
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

export declare namespace DefaultMappings {
  export {
    type DefaultMappingListResponse as DefaultMappingListResponse,
    type DefaultMappingRetrieveResponse as DefaultMappingRetrieveResponse,
    type DefaultMappingReplaceResponse as DefaultMappingReplaceResponse,
    type DefaultMappingReplaceParams as DefaultMappingReplaceParams,
  };
}
