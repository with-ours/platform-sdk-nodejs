// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Funnels extends APIResource {
  /**
   * List every funnel configured on this account. Each funnel includes its step
   * configuration, funnel type, and conversion window. Funnel results are computed
   * on demand, so `status` is always `READY` and `reportDateRange` is always `null`;
   * both fields are retained for backward compatibility and should not be used to
   * decide whether results are available. Requires scope: web-analytics:view
   */
  list(options?: RequestOptions): APIPromise<FunnelListResponse> {
    return this._client.get('/rest/v1/funnels', options);
  }

  /**
   * Create a session-based funnel with 2 to 10 ordered event steps. Returns the
   * complete saved configuration. Requires scope: web-analytics:write
   */
  create(body: FunnelCreateParams, options?: RequestOptions): APIPromise<FunnelCreateResponse> {
    return this._client.post('/rest/v1/funnels', { body, ...options });
  }

  /**
   * Fetch a single funnel configuration by its id. Returns `404` when the funnel
   * does not exist or belongs to a different account. Requires scope:
   * web-analytics:view
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<FunnelRetrieveResponse> {
    return this._client.get(path`/rest/v1/funnels/${id}`, options);
  }

  /**
   * Update one or more Funnel fields. Omitted fields remain unchanged. Send `null`
   * to clear an optional field. `globalLogic` and legacy `utmFilters` cannot be set
   * together. Requires scope: web-analytics:write
   */
  update(id: string, body: FunnelUpdateParams, options?: RequestOptions): APIPromise<FunnelUpdateResponse> {
    return this._client.patch(path`/rest/v1/funnels/${id}`, { body, ...options });
  }

  /**
   * Delete a Funnel configuration. Existing analytics data is unaffected. Requires
   * scope: web-analytics:write
   */
  delete(id: string, options?: RequestOptions): APIPromise<FunnelDeleteResponse> {
    return this._client.delete(path`/rest/v1/funnels/${id}`, options);
  }

  /**
   * Compute funnel step analytics for a funnel over a date window. Returns per-step
   * visitor counts, conversion rates, drop-off rates, average time to next step, and
   * sample session IDs for replay. Results are computed on demand from event data at
   * request time, so any date window within the supported range returns current
   * results. `to` must be on or after `from`, and the window may span at most 31 days
   * including both endpoints. Requires scope: web-analytics:view
   */
  results(
    id: string,
    query: FunnelResultsParams,
    options?: RequestOptions,
  ): APIPromise<FunnelResultsResponse> {
    return this._client.get(path`/rest/v1/funnels/${id}/results`, { query, ...options });
  }
}

export interface FunnelListResponse {
  /**
   * All funnels configured on this account.
   */
  entities: Array<FunnelListResponse.Entity>;
}

export namespace FunnelListResponse {
  export interface Entity {
    createdAt: string;

    funnelId: string;

    funnelType: 'SESSION_BASED' | 'VISITOR_BASED';

    name: string;

    status: 'READY' | 'PROCESSING';

    steps: Array<Entity.Step>;

    updatedAt: string;

    conversionWindow?: Entity.ConversionWindow | null;

    countingMethod?: 'UNIQUES' | 'TOTALS' | 'SESSIONS' | null;

    description?: string | null;

    /**
     * Nested visitor logic for the entire funnel. When supplied, this replaces legacy
     * UTM filters.
     */
    globalLogic?: Entity.GlobalLogic | null;

    reportDateRange?: Entity.ReportDateRange | null;

    stepOrder?: 'EXACT' | 'ANY' | null;

    /**
     * Legacy exact-match UTM filters. Do not combine with globalLogic; globalLogic
     * takes precedence.
     */
    utmFilters?: unknown | null;

    watched?: boolean | null;
  }

  export namespace Entity {
    export interface Step {
      eventName: string;

      name: string;

      order: number;

      stepId: string;

      /**
       * Step-level event filters (JSON object).
       */
      filters?: unknown;

      /**
       * Step-level event logic.
       */
      logic?: Step.Logic | null;
    }

    export namespace Step {
      /**
       * Step-level event logic.
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

    export interface ConversionWindow {
      unit: 'MINUTES' | 'HOURS' | 'DAYS';

      value: number;
    }

    /**
     * Nested visitor logic for the entire funnel. When supplied, this replaces legacy
     * UTM filters.
     */
    export interface GlobalLogic {
      /**
       * All child nodes must match. Each child is itself a logic node (leaf `condition`
       * or combinator).
       */
      AND?: Array<unknown> | null;

      condition?: GlobalLogic.Condition;

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

    export namespace GlobalLogic {
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

    export interface ReportDateRange {
      from: string;

      to: string;
    }
  }
}

/**
 * Created funnel configuration
 */
export interface FunnelCreateResponse {
  createdAt: string;

  funnelId: string;

  funnelType: 'SESSION_BASED' | 'VISITOR_BASED';

  name: string;

  status: 'READY' | 'PROCESSING';

  steps: Array<FunnelCreateResponse.Step>;

  updatedAt: string;

  conversionWindow?: FunnelCreateResponse.ConversionWindow | null;

  countingMethod?: 'UNIQUES' | 'TOTALS' | 'SESSIONS' | null;

  description?: string | null;

  /**
   * Nested visitor logic for the entire funnel. When supplied, this replaces legacy
   * UTM filters.
   */
  globalLogic?: FunnelCreateResponse.GlobalLogic | null;

  reportDateRange?: FunnelCreateResponse.ReportDateRange | null;

  stepOrder?: 'EXACT' | 'ANY' | null;

  /**
   * Legacy exact-match UTM filters. Do not combine with globalLogic; globalLogic
   * takes precedence.
   */
  utmFilters?: unknown | null;

  watched?: boolean | null;
}

export namespace FunnelCreateResponse {
  export interface Step {
    eventName: string;

    name: string;

    order: number;

    stepId: string;

    /**
     * Step-level event filters (JSON object).
     */
    filters?: unknown;

    /**
     * Step-level event logic.
     */
    logic?: Step.Logic | null;
  }

  export namespace Step {
    /**
     * Step-level event logic.
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

  export interface ConversionWindow {
    unit: 'MINUTES' | 'HOURS' | 'DAYS';

    value: number;
  }

  /**
   * Nested visitor logic for the entire funnel. When supplied, this replaces legacy
   * UTM filters.
   */
  export interface GlobalLogic {
    /**
     * All child nodes must match. Each child is itself a logic node (leaf `condition`
     * or combinator).
     */
    AND?: Array<unknown> | null;

    condition?: GlobalLogic.Condition;

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

  export namespace GlobalLogic {
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

  export interface ReportDateRange {
    from: string;

    to: string;
  }
}

/**
 * Funnel configuration details.
 */
export interface FunnelRetrieveResponse {
  createdAt: string;

  funnelId: string;

  funnelType: 'SESSION_BASED' | 'VISITOR_BASED';

  name: string;

  status: 'READY' | 'PROCESSING';

  steps: Array<FunnelRetrieveResponse.Step>;

  updatedAt: string;

  conversionWindow?: FunnelRetrieveResponse.ConversionWindow | null;

  countingMethod?: 'UNIQUES' | 'TOTALS' | 'SESSIONS' | null;

  description?: string | null;

  /**
   * Nested visitor logic for the entire funnel. When supplied, this replaces legacy
   * UTM filters.
   */
  globalLogic?: FunnelRetrieveResponse.GlobalLogic | null;

  reportDateRange?: FunnelRetrieveResponse.ReportDateRange | null;

  stepOrder?: 'EXACT' | 'ANY' | null;

  /**
   * Legacy exact-match UTM filters. Do not combine with globalLogic; globalLogic
   * takes precedence.
   */
  utmFilters?: unknown | null;

  watched?: boolean | null;
}

export namespace FunnelRetrieveResponse {
  export interface Step {
    eventName: string;

    name: string;

    order: number;

    stepId: string;

    /**
     * Step-level event filters (JSON object).
     */
    filters?: unknown;

    /**
     * Step-level event logic.
     */
    logic?: Step.Logic | null;
  }

  export namespace Step {
    /**
     * Step-level event logic.
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

  export interface ConversionWindow {
    unit: 'MINUTES' | 'HOURS' | 'DAYS';

    value: number;
  }

  /**
   * Nested visitor logic for the entire funnel. When supplied, this replaces legacy
   * UTM filters.
   */
  export interface GlobalLogic {
    /**
     * All child nodes must match. Each child is itself a logic node (leaf `condition`
     * or combinator).
     */
    AND?: Array<unknown> | null;

    condition?: GlobalLogic.Condition;

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

  export namespace GlobalLogic {
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

  export interface ReportDateRange {
    from: string;

    to: string;
  }
}

/**
 * Updated funnel configuration
 */
export interface FunnelUpdateResponse {
  createdAt: string;

  funnelId: string;

  funnelType: 'SESSION_BASED' | 'VISITOR_BASED';

  name: string;

  status: 'READY' | 'PROCESSING';

  steps: Array<FunnelUpdateResponse.Step>;

  updatedAt: string;

  conversionWindow?: FunnelUpdateResponse.ConversionWindow | null;

  countingMethod?: 'UNIQUES' | 'TOTALS' | 'SESSIONS' | null;

  description?: string | null;

  /**
   * Nested visitor logic for the entire funnel. When supplied, this replaces legacy
   * UTM filters.
   */
  globalLogic?: FunnelUpdateResponse.GlobalLogic | null;

  reportDateRange?: FunnelUpdateResponse.ReportDateRange | null;

  stepOrder?: 'EXACT' | 'ANY' | null;

  /**
   * Legacy exact-match UTM filters. Do not combine with globalLogic; globalLogic
   * takes precedence.
   */
  utmFilters?: unknown | null;

  watched?: boolean | null;
}

export namespace FunnelUpdateResponse {
  export interface Step {
    eventName: string;

    name: string;

    order: number;

    stepId: string;

    /**
     * Step-level event filters (JSON object).
     */
    filters?: unknown;

    /**
     * Step-level event logic.
     */
    logic?: Step.Logic | null;
  }

  export namespace Step {
    /**
     * Step-level event logic.
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

  export interface ConversionWindow {
    unit: 'MINUTES' | 'HOURS' | 'DAYS';

    value: number;
  }

  /**
   * Nested visitor logic for the entire funnel. When supplied, this replaces legacy
   * UTM filters.
   */
  export interface GlobalLogic {
    /**
     * All child nodes must match. Each child is itself a logic node (leaf `condition`
     * or combinator).
     */
    AND?: Array<unknown> | null;

    condition?: GlobalLogic.Condition;

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

  export namespace GlobalLogic {
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

  export interface ReportDateRange {
    from: string;

    to: string;
  }
}

export interface FunnelDeleteResponse {
  deleted: true;

  id: string;
}

export interface FunnelResultsResponse {
  /**
   * Conversion rate from first step to last step as a percentage.
   */
  overallConversionRate: number;

  /**
   * Per-step funnel analytics, ordered by step number.
   */
  steps: Array<FunnelResultsResponse.Step>;

  /**
   * Total number of visitors who entered the funnel (entered step 1).
   */
  totalVisitors: number;

  /**
   * Average time from first step to last step in seconds. Null when no completions.
   */
  overallAvgTimeToConversion?: number | null;

  /**
   * Present when the results are wider than the funnel as configured. Some step
   * conditions could not be expressed as a query and were ignored, so the counts
   * above include visitors those conditions would have excluded. Absent when the
   * whole definition was applied. The dashboard surfaces the same caveat.
   */
  warning?: string;
}

export namespace FunnelResultsResponse {
  export interface Step {
    conversionCount: number;

    conversionRate: number;

    dropOffRate: number;

    dropOffSessionIds: Array<string>;

    overallConversionRate: number;

    sessionIds: Array<string>;

    stepNumber: number;

    visitorCount: number;

    avgTimeToNextStep?: number | null;
  }
}

export interface FunnelCreateParams {
  name: string;

  steps: Array<FunnelCreateParams.Step>;

  conversionWindow?: unknown | null;

  countingMethod?: string | null;

  description?: string | null;

  /**
   * Funnels are session-based. `SESSION_BASED` is the only supported value and is
   * applied when omitted.
   */
  funnelType?: 'SESSION_BASED';

  /**
   * Nested visitor logic for the entire funnel. When supplied, this replaces legacy
   * UTM filters.
   */
  globalLogic?: FunnelCreateParams.GlobalLogic | null;

  stepOrder?: string | null;

  /**
   * Legacy exact-match UTM filters. Do not combine with globalLogic; globalLogic
   * takes precedence.
   */
  utmFilters?: unknown | null;

  watched?: boolean | null;
}

export namespace FunnelCreateParams {
  export interface Step {
    eventName: string;

    name: string;

    order: number;

    filters?: unknown | null;

    logic?: Step.Logic | null;
  }

  export namespace Step {
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

  /**
   * Nested visitor logic for the entire funnel. When supplied, this replaces legacy
   * UTM filters.
   */
  export interface GlobalLogic {
    /**
     * All child nodes must match. Each child is itself a logic node (leaf `condition`
     * or combinator).
     */
    AND?: Array<unknown> | null;

    condition?: GlobalLogic.Condition;

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

  export namespace GlobalLogic {
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

export interface FunnelUpdateParams {
  conversionWindow?: unknown | null;

  countingMethod?: string | null;

  description?: string | null;

  funnelType?: 'SESSION_BASED';

  /**
   * Nested visitor logic for the entire funnel. When supplied, this replaces legacy
   * UTM filters.
   */
  globalLogic?: FunnelUpdateParams.GlobalLogic | null;

  name?: string;

  stepOrder?: string | null;

  steps?: Array<FunnelUpdateParams.Step>;

  /**
   * Legacy exact-match UTM filters. Do not combine with globalLogic; globalLogic
   * takes precedence.
   */
  utmFilters?: unknown | null;

  watched?: boolean | null;
}

export namespace FunnelUpdateParams {
  /**
   * Nested visitor logic for the entire funnel. When supplied, this replaces legacy
   * UTM filters.
   */
  export interface GlobalLogic {
    /**
     * All child nodes must match. Each child is itself a logic node (leaf `condition`
     * or combinator).
     */
    AND?: Array<unknown> | null;

    condition?: GlobalLogic.Condition;

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

  export namespace GlobalLogic {
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

  export interface Step {
    eventName: string;

    name: string;

    order: number;

    filters?: unknown | null;

    logic?: Step.Logic | null;
  }

  export namespace Step {
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

export interface FunnelResultsParams {
  /**
   * Inclusive lower bound of the analysis window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window may span at most 31 days including both
   * endpoints.
   */
  from: string;

  /**
   * Inclusive upper bound of the analysis window, as a UTC calendar day in
   * `YYYY-MM-DD` format. Must be on or after `from`, and the window may span at most
   * 31 days including both endpoints.
   */
  to: string;

  /**
   * Accepted for backward compatibility but NOT applied. Funnel sessions carry a
   * single attribution set, so there is no initial vs. last-touch distinction to
   * select between.
   */
  attributionType?: 'INITIAL' | 'LAST_TOUCH';

  /**
   * Restrict the funnel to sessions on a device class. `MOBILE` matches phone
   * sessions; `DESKTOP` matches every session that is not a phone, tablet, TV,
   * console, wearable, XR, or embedded device. `ALL` (the default) applies no device
   * filter.
   */
  deviceType?: 'DESKTOP' | 'MOBILE' | 'ALL';

  /**
   * Restrict the funnel to sessions whose `utm_campaign` exactly matches this value.
   */
  utmCampaign?: string;

  /**
   * Restrict the funnel to sessions whose `utm_content` exactly matches this value.
   */
  utmContent?: string;

  /**
   * Restrict the funnel to sessions whose `utm_medium` exactly matches this value.
   */
  utmMedium?: string;

  /**
   * Accepted for backward compatibility but NOT applied — there is no campaign-name
   * dimension on funnel sessions. Use `utmCampaign` instead.
   */
  utmName?: string;

  /**
   * Restrict the funnel to sessions whose `utm_source` exactly matches this value.
   */
  utmSource?: string;

  /**
   * Restrict the funnel to sessions whose `utm_term` exactly matches this value.
   */
  utmTerm?: string;
}

export declare namespace Funnels {
  export {
    type FunnelListResponse as FunnelListResponse,
    type FunnelCreateResponse as FunnelCreateResponse,
    type FunnelRetrieveResponse as FunnelRetrieveResponse,
    type FunnelUpdateResponse as FunnelUpdateResponse,
    type FunnelDeleteResponse as FunnelDeleteResponse,
    type FunnelResultsResponse as FunnelResultsResponse,
    type FunnelCreateParams as FunnelCreateParams,
    type FunnelUpdateParams as FunnelUpdateParams,
    type FunnelResultsParams as FunnelResultsParams,
  };
}
