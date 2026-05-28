// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class DataGovernance extends APIResource {
  /**
   * List the data-governance record(s) on this account. Each account has at most one
   * record, so this list returns either an empty array or a single entity. Cursor
   * pagination is exposed for consistency with other list endpoints but is rarely
   * meaningful here. Data governance is the second stage of the dispatch flow
   * (Source → Allowed Events → Data Governance → Mappings → Destination) — it
   * evaluates each event against the configured category logic and stops dispatch to
   * the destinations on any matching category. Requires scope: globalDispatch:list
   */
  list(
    query: DataGovernanceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DataGovernanceListResponsesCursor, DataGovernanceListResponse> {
    return this._client.getAPIList('/rest/v1/data-governance', Cursor<DataGovernanceListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Create the data-governance record for this account. Each account may have at
   * most one — a second POST returns 409. Body is optional; defaults are
   * `isEnabled: false` and no categories. Categories are added later via PATCH.
   * Requires scope: globalDispatch:create
   */
  create(
    body: DataGovernanceCreateParams,
    options?: RequestOptions,
  ): APIPromise<DataGovernanceCreateResponse> {
    return this._client.post('/rest/v1/data-governance', { body, ...options });
  }

  /**
   * Fetch the data-governance record by id, including its categories (logic,
   * destinations, priority). Returns 404 when no record matches. Requires scope:
   * globalDispatch:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<DataGovernanceRetrieveResponse | null> {
    return this._client.get(path`/rest/v1/data-governance/${id}`, options);
  }

  /**
   * Partially update the data-governance record. Top-level fields (`name`, `notes`,
   * `isEnabled`) follow the standard PATCH semantic — only the fields you send are
   * changed.
   *
   * `categories` is the documented exception: when sent, it is **replaced
   * wholesale**. There is no partial-merge for individual categories. To change one
   * category, fetch the current record, modify the array, and PATCH it back.
   *
   * Categories are sorted ascending by the `priority` you supplied and then
   * renumbered `1..N` in the response, so the returned `priority` values are always
   * sequential with no gaps. Stale `destinationIds` (deleted destinations or
   * destinations on another account) are silently filtered out — the response echoes
   * the filtered list, so a follow-up GET is not required to see what was saved.
   * Requires scope: globalDispatch:update
   */
  update(
    id: string,
    body: DataGovernanceUpdateParams,
    options?: RequestOptions,
  ): APIPromise<DataGovernanceUpdateResponse> {
    return this._client.patch(path`/rest/v1/data-governance/${id}`, { body, ...options });
  }

  /**
   * Delete the data-governance record. After deletion, inbound events flow through
   * to destinations without category-level gating. Create a new record with POST to
   * reinstate governance. Requires scope: globalDispatch:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<DataGovernanceDeleteResponse> {
    return this._client.delete(path`/rest/v1/data-governance/${id}`, options);
  }
}

export type DataGovernanceListResponsesCursor = Cursor<DataGovernanceListResponse>;

export interface DataGovernanceListResponse {
  /**
   * Server-assigned UUID for this data-governance record.
   */
  id: string;

  /**
   * ISO 8601 timestamp when the record was created.
   */
  createdAt: string;

  /**
   * When false, data governance is configured but does not gate dispatch — inbound
   * events flow through to destinations regardless of category logic.
   */
  isEnabled: boolean;

  /**
   * Discriminator for the entity type. Always "dataGovernance" on the REST surface.
   * The underlying storage discriminator is "globalDispatchCenter" — REST translates
   * it on the way out.
   */
  kind: string;

  /**
   * Governance categories in priority order (1..N).
   */
  categories?: Array<DataGovernanceListResponse.Category> | null;

  /**
   * Human-readable name shown in the dashboard.
   */
  name?: string | null;

  /**
   * Free-form notes for this record.
   */
  notes?: string | null;

  /**
   * ISO 8601 timestamp of the last write. Equal to createdAt on a freshly created
   * record; advances on every PATCH.
   */
  updatedAt?: string | null;
}

export namespace DataGovernanceListResponse {
  export interface Category {
    /**
     * Display name for the category.
     */
    name: string;

    /**
     * 1-indexed sort position. Always equals (sorted index + 1) — see PATCH for
     * details.
     */
    priority: number;

    /**
     * Optional human-readable description.
     */
    description?: string | null;

    /**
     * Destinations gated by this category when its logic evaluates to TRUE.
     */
    destinationIds?: Array<string> | null;

    /**
     * Condition tree evaluated against each inbound event. Write conditions that
     * evaluate **TRUE for events you want to STOP**. A node is either a leaf
     * `condition` or a combinator (`AND`, `OR`, `NOT`); combinator children are
     * themselves logic nodes, so trees nest arbitrarily.
     *
     * Discovery: `GET /rest/v1/mappings/default-variables` lists the canonical
     * platform-provided `property` paths (visitor consent arrays, event fields,
     * request context, identity fields). Custom `event.event_properties.*` paths are
     * caller-defined.
     *
     * Example leaf (stop dispatch when the visitor rejected the `advertising` consent
     * category):
     * `{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }`.
     *
     * Example combinator:
     * `{ "AND": [{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }, { "OR": [/* nested logic nodes * /] }] }`.
     */
    logic?: Category.Logic | null;
  }

  export namespace Category {
    /**
     * Condition tree evaluated against each inbound event. Write conditions that
     * evaluate **TRUE for events you want to STOP**. A node is either a leaf
     * `condition` or a combinator (`AND`, `OR`, `NOT`); combinator children are
     * themselves logic nodes, so trees nest arbitrarily.
     *
     * Discovery: `GET /rest/v1/mappings/default-variables` lists the canonical
     * platform-provided `property` paths (visitor consent arrays, event fields,
     * request context, identity fields). Custom `event.event_properties.*` paths are
     * caller-defined.
     *
     * Example leaf (stop dispatch when the visitor rejected the `advertising` consent
     * category):
     * `{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }`.
     *
     * Example combinator:
     * `{ "AND": [{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }, { "OR": [/* nested logic nodes * /] }] }`.
     */
    export interface Logic {
      /**
       * All child nodes must match. Each child is itself a logic node (leaf `condition`
       * or combinator).
       */
      AND?: Array<unknown> | null;

      condition?: Logic.Condition;

      /**
       * Negates a single child logic node.
       */
      NOT?: unknown;

      /**
       * Any child node must match. Each child is itself a logic node (leaf `condition`
       * or combinator).
       */
      OR?: Array<unknown> | null;
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

export interface DataGovernanceCreateResponse {
  /**
   * Server-assigned UUID for this data-governance record.
   */
  id: string;

  /**
   * ISO 8601 timestamp when the record was created.
   */
  createdAt: string;

  /**
   * When false, data governance is configured but does not gate dispatch — inbound
   * events flow through to destinations regardless of category logic.
   */
  isEnabled: boolean;

  /**
   * Discriminator for the entity type. Always "dataGovernance" on the REST surface.
   * The underlying storage discriminator is "globalDispatchCenter" — REST translates
   * it on the way out.
   */
  kind: string;

  /**
   * Governance categories in priority order (1..N).
   */
  categories?: Array<DataGovernanceCreateResponse.Category> | null;

  /**
   * Human-readable name shown in the dashboard.
   */
  name?: string | null;

  /**
   * Free-form notes for this record.
   */
  notes?: string | null;

  /**
   * ISO 8601 timestamp of the last write. Equal to createdAt on a freshly created
   * record; advances on every PATCH.
   */
  updatedAt?: string | null;
}

export namespace DataGovernanceCreateResponse {
  export interface Category {
    /**
     * Display name for the category.
     */
    name: string;

    /**
     * 1-indexed sort position. Always equals (sorted index + 1) — see PATCH for
     * details.
     */
    priority: number;

    /**
     * Optional human-readable description.
     */
    description?: string | null;

    /**
     * Destinations gated by this category when its logic evaluates to TRUE.
     */
    destinationIds?: Array<string> | null;

    /**
     * Condition tree evaluated against each inbound event. Write conditions that
     * evaluate **TRUE for events you want to STOP**. A node is either a leaf
     * `condition` or a combinator (`AND`, `OR`, `NOT`); combinator children are
     * themselves logic nodes, so trees nest arbitrarily.
     *
     * Discovery: `GET /rest/v1/mappings/default-variables` lists the canonical
     * platform-provided `property` paths (visitor consent arrays, event fields,
     * request context, identity fields). Custom `event.event_properties.*` paths are
     * caller-defined.
     *
     * Example leaf (stop dispatch when the visitor rejected the `advertising` consent
     * category):
     * `{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }`.
     *
     * Example combinator:
     * `{ "AND": [{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }, { "OR": [/* nested logic nodes * /] }] }`.
     */
    logic?: Category.Logic | null;
  }

  export namespace Category {
    /**
     * Condition tree evaluated against each inbound event. Write conditions that
     * evaluate **TRUE for events you want to STOP**. A node is either a leaf
     * `condition` or a combinator (`AND`, `OR`, `NOT`); combinator children are
     * themselves logic nodes, so trees nest arbitrarily.
     *
     * Discovery: `GET /rest/v1/mappings/default-variables` lists the canonical
     * platform-provided `property` paths (visitor consent arrays, event fields,
     * request context, identity fields). Custom `event.event_properties.*` paths are
     * caller-defined.
     *
     * Example leaf (stop dispatch when the visitor rejected the `advertising` consent
     * category):
     * `{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }`.
     *
     * Example combinator:
     * `{ "AND": [{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }, { "OR": [/* nested logic nodes * /] }] }`.
     */
    export interface Logic {
      /**
       * All child nodes must match. Each child is itself a logic node (leaf `condition`
       * or combinator).
       */
      AND?: Array<unknown> | null;

      condition?: Logic.Condition;

      /**
       * Negates a single child logic node.
       */
      NOT?: unknown;

      /**
       * Any child node must match. Each child is itself a logic node (leaf `condition`
       * or combinator).
       */
      OR?: Array<unknown> | null;
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

export interface DataGovernanceRetrieveResponse {
  /**
   * Server-assigned UUID for this data-governance record.
   */
  id: string;

  /**
   * ISO 8601 timestamp when the record was created.
   */
  createdAt: string;

  /**
   * When false, data governance is configured but does not gate dispatch — inbound
   * events flow through to destinations regardless of category logic.
   */
  isEnabled: boolean;

  /**
   * Discriminator for the entity type. Always "dataGovernance" on the REST surface.
   * The underlying storage discriminator is "globalDispatchCenter" — REST translates
   * it on the way out.
   */
  kind: string;

  /**
   * Governance categories in priority order (1..N).
   */
  categories?: Array<DataGovernanceRetrieveResponse.Category> | null;

  /**
   * Human-readable name shown in the dashboard.
   */
  name?: string | null;

  /**
   * Free-form notes for this record.
   */
  notes?: string | null;

  /**
   * ISO 8601 timestamp of the last write. Equal to createdAt on a freshly created
   * record; advances on every PATCH.
   */
  updatedAt?: string | null;
}

export namespace DataGovernanceRetrieveResponse {
  export interface Category {
    /**
     * Display name for the category.
     */
    name: string;

    /**
     * 1-indexed sort position. Always equals (sorted index + 1) — see PATCH for
     * details.
     */
    priority: number;

    /**
     * Optional human-readable description.
     */
    description?: string | null;

    /**
     * Destinations gated by this category when its logic evaluates to TRUE.
     */
    destinationIds?: Array<string> | null;

    /**
     * Condition tree evaluated against each inbound event. Write conditions that
     * evaluate **TRUE for events you want to STOP**. A node is either a leaf
     * `condition` or a combinator (`AND`, `OR`, `NOT`); combinator children are
     * themselves logic nodes, so trees nest arbitrarily.
     *
     * Discovery: `GET /rest/v1/mappings/default-variables` lists the canonical
     * platform-provided `property` paths (visitor consent arrays, event fields,
     * request context, identity fields). Custom `event.event_properties.*` paths are
     * caller-defined.
     *
     * Example leaf (stop dispatch when the visitor rejected the `advertising` consent
     * category):
     * `{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }`.
     *
     * Example combinator:
     * `{ "AND": [{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }, { "OR": [/* nested logic nodes * /] }] }`.
     */
    logic?: Category.Logic | null;
  }

  export namespace Category {
    /**
     * Condition tree evaluated against each inbound event. Write conditions that
     * evaluate **TRUE for events you want to STOP**. A node is either a leaf
     * `condition` or a combinator (`AND`, `OR`, `NOT`); combinator children are
     * themselves logic nodes, so trees nest arbitrarily.
     *
     * Discovery: `GET /rest/v1/mappings/default-variables` lists the canonical
     * platform-provided `property` paths (visitor consent arrays, event fields,
     * request context, identity fields). Custom `event.event_properties.*` paths are
     * caller-defined.
     *
     * Example leaf (stop dispatch when the visitor rejected the `advertising` consent
     * category):
     * `{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }`.
     *
     * Example combinator:
     * `{ "AND": [{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }, { "OR": [/* nested logic nodes * /] }] }`.
     */
    export interface Logic {
      /**
       * All child nodes must match. Each child is itself a logic node (leaf `condition`
       * or combinator).
       */
      AND?: Array<unknown> | null;

      condition?: Logic.Condition;

      /**
       * Negates a single child logic node.
       */
      NOT?: unknown;

      /**
       * Any child node must match. Each child is itself a logic node (leaf `condition`
       * or combinator).
       */
      OR?: Array<unknown> | null;
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

export interface DataGovernanceUpdateResponse {
  /**
   * Server-assigned UUID for this data-governance record.
   */
  id: string;

  /**
   * ISO 8601 timestamp when the record was created.
   */
  createdAt: string;

  /**
   * When false, data governance is configured but does not gate dispatch — inbound
   * events flow through to destinations regardless of category logic.
   */
  isEnabled: boolean;

  /**
   * Discriminator for the entity type. Always "dataGovernance" on the REST surface.
   * The underlying storage discriminator is "globalDispatchCenter" — REST translates
   * it on the way out.
   */
  kind: string;

  /**
   * Governance categories in priority order (1..N).
   */
  categories?: Array<DataGovernanceUpdateResponse.Category> | null;

  /**
   * Human-readable name shown in the dashboard.
   */
  name?: string | null;

  /**
   * Free-form notes for this record.
   */
  notes?: string | null;

  /**
   * ISO 8601 timestamp of the last write. Equal to createdAt on a freshly created
   * record; advances on every PATCH.
   */
  updatedAt?: string | null;
}

export namespace DataGovernanceUpdateResponse {
  export interface Category {
    /**
     * Display name for the category.
     */
    name: string;

    /**
     * 1-indexed sort position. Always equals (sorted index + 1) — see PATCH for
     * details.
     */
    priority: number;

    /**
     * Optional human-readable description.
     */
    description?: string | null;

    /**
     * Destinations gated by this category when its logic evaluates to TRUE.
     */
    destinationIds?: Array<string> | null;

    /**
     * Condition tree evaluated against each inbound event. Write conditions that
     * evaluate **TRUE for events you want to STOP**. A node is either a leaf
     * `condition` or a combinator (`AND`, `OR`, `NOT`); combinator children are
     * themselves logic nodes, so trees nest arbitrarily.
     *
     * Discovery: `GET /rest/v1/mappings/default-variables` lists the canonical
     * platform-provided `property` paths (visitor consent arrays, event fields,
     * request context, identity fields). Custom `event.event_properties.*` paths are
     * caller-defined.
     *
     * Example leaf (stop dispatch when the visitor rejected the `advertising` consent
     * category):
     * `{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }`.
     *
     * Example combinator:
     * `{ "AND": [{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }, { "OR": [/* nested logic nodes * /] }] }`.
     */
    logic?: Category.Logic | null;
  }

  export namespace Category {
    /**
     * Condition tree evaluated against each inbound event. Write conditions that
     * evaluate **TRUE for events you want to STOP**. A node is either a leaf
     * `condition` or a combinator (`AND`, `OR`, `NOT`); combinator children are
     * themselves logic nodes, so trees nest arbitrarily.
     *
     * Discovery: `GET /rest/v1/mappings/default-variables` lists the canonical
     * platform-provided `property` paths (visitor consent arrays, event fields,
     * request context, identity fields). Custom `event.event_properties.*` paths are
     * caller-defined.
     *
     * Example leaf (stop dispatch when the visitor rejected the `advertising` consent
     * category):
     * `{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }`.
     *
     * Example combinator:
     * `{ "AND": [{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }, { "OR": [/* nested logic nodes * /] }] }`.
     */
    export interface Logic {
      /**
       * All child nodes must match. Each child is itself a logic node (leaf `condition`
       * or combinator).
       */
      AND?: Array<unknown> | null;

      condition?: Logic.Condition;

      /**
       * Negates a single child logic node.
       */
      NOT?: unknown;

      /**
       * Any child node must match. Each child is itself a logic node (leaf `condition`
       * or combinator).
       */
      OR?: Array<unknown> | null;
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

export interface DataGovernanceDeleteResponse {
  /**
   * The id of the data-governance record that was deleted.
   */
  id: string;

  /**
   * True when the record was deleted.
   */
  deleted: boolean;
}

export interface DataGovernanceListParams extends CursorParams {}

export interface DataGovernanceCreateParams {
  /**
   * Whether the record starts enabled. Defaults to false — opt in by setting true
   * here or via PATCH later. When disabled, every category is bypassed and inbound
   * events flow through to destinations regardless of consent state.
   */
  isEnabled?: boolean | null;

  /**
   * Display name for the new record. Defaults to "Data Governance".
   */
  name?: string | null;

  /**
   * Free-form notes shown in the dashboard. Not used for routing.
   */
  notes?: string | null;
}

export interface DataGovernanceUpdateParams {
  /**
   * Full replacement of the categories list. The sent array becomes the new state —
   * there is no partial-merge semantic for categories. Categories are sorted by
   * priority on write and re-stamped 1..N. Omit to leave existing categories
   * untouched.
   */
  categories?: Array<DataGovernanceUpdateParams.Category> | null;

  /**
   * Toggle data governance on/off without changing any other config.
   */
  isEnabled?: boolean | null;

  /**
   * New display name for the record.
   */
  name?: string | null;

  /**
   * Replace the free-form notes.
   */
  notes?: string | null;
}

export namespace DataGovernanceUpdateParams {
  export interface Category {
    /**
     * Optional human-readable description shown in the dashboard.
     */
    description?: string | null;

    /**
     * Destinations gated by this category. When the category logic evaluates to TRUE
     * for an inbound event, dispatch to every destination on this list is stopped.
     * Stale IDs (deleted destinations or destinations on another account) are silently
     * filtered out at write time.
     */
    destinationIds?: Array<string> | null;

    /**
     * Condition tree evaluated against each inbound event. Write conditions that
     * evaluate **TRUE for events you want to STOP**. A node is either a leaf
     * `condition` or a combinator (`AND`, `OR`, `NOT`); combinator children are
     * themselves logic nodes, so trees nest arbitrarily.
     *
     * Discovery: `GET /rest/v1/mappings/default-variables` lists the canonical
     * platform-provided `property` paths (visitor consent arrays, event fields,
     * request context, identity fields). Custom `event.event_properties.*` paths are
     * caller-defined.
     *
     * Example leaf (stop dispatch when the visitor rejected the `advertising` consent
     * category):
     * `{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }`.
     *
     * Example combinator:
     * `{ "AND": [{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }, { "OR": [/* nested logic nodes * /] }] }`.
     */
    logic?: Category.Logic | null;

    /**
     * Display name for the category. Auto-generated if omitted.
     */
    name?: string | null;

    /**
     * Used as a sort key on write. The server sorts categories by this value
     * (ascending), then re-stamps priority as (sorted index + 1) on persist. Send any
     * positive number — gaps are ironed out, duplicate values keep input order via
     * stable sort. Omit to fall to the end.
     */
    priority?: number | null;
  }

  export namespace Category {
    /**
     * Condition tree evaluated against each inbound event. Write conditions that
     * evaluate **TRUE for events you want to STOP**. A node is either a leaf
     * `condition` or a combinator (`AND`, `OR`, `NOT`); combinator children are
     * themselves logic nodes, so trees nest arbitrarily.
     *
     * Discovery: `GET /rest/v1/mappings/default-variables` lists the canonical
     * platform-provided `property` paths (visitor consent arrays, event fields,
     * request context, identity fields). Custom `event.event_properties.*` paths are
     * caller-defined.
     *
     * Example leaf (stop dispatch when the visitor rejected the `advertising` consent
     * category):
     * `{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }`.
     *
     * Example combinator:
     * `{ "AND": [{ "condition": { "property": "visitor.consent.rejected_categories", "operator": "Contains", "value": "advertising" } }, { "OR": [/* nested logic nodes * /] }] }`.
     */
    export interface Logic {
      /**
       * All child nodes must match. Each child is itself a logic node (leaf `condition`
       * or combinator).
       */
      AND?: Array<unknown> | null;

      condition?: Logic.Condition;

      /**
       * Negates a single child logic node.
       */
      NOT?: unknown;

      /**
       * Any child node must match. Each child is itself a logic node (leaf `condition`
       * or combinator).
       */
      OR?: Array<unknown> | null;
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

export declare namespace DataGovernance {
  export {
    type DataGovernanceListResponse as DataGovernanceListResponse,
    type DataGovernanceCreateResponse as DataGovernanceCreateResponse,
    type DataGovernanceRetrieveResponse as DataGovernanceRetrieveResponse,
    type DataGovernanceUpdateResponse as DataGovernanceUpdateResponse,
    type DataGovernanceDeleteResponse as DataGovernanceDeleteResponse,
    type DataGovernanceListResponsesCursor as DataGovernanceListResponsesCursor,
    type DataGovernanceListParams as DataGovernanceListParams,
    type DataGovernanceCreateParams as DataGovernanceCreateParams,
    type DataGovernanceUpdateParams as DataGovernanceUpdateParams,
  };
}
