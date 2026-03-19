// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class GlobalDispatchCenters extends APIResource {
  /**
   * Create a new global dispatch center. Requires scope: globalDispatch:create
   */
  create(options?: RequestOptions): APIPromise<GlobalDispatchCenterCreateResponse> {
    return this._client.post('/rest/v1/global-dispatch-centers', options);
  }

  /**
   * Find a single global dispatch center by ID. Requires scope: globalDispatch:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<GlobalDispatchCenterRetrieveResponse | null> {
    return this._client.get(path`/rest/v1/global-dispatch-centers/${id}`, options);
  }

  /**
   * Update a global dispatch center. Requires scope: globalDispatch:update
   */
  update(
    id: string,
    body: GlobalDispatchCenterUpdateParams,
    options?: RequestOptions,
  ): APIPromise<GlobalDispatchCenterUpdateResponse> {
    return this._client.patch(path`/rest/v1/global-dispatch-centers/${id}`, { body, ...options });
  }

  /**
   * List all global dispatch centers. Requires scope: globalDispatch:list
   */
  list(options?: RequestOptions): APIPromise<GlobalDispatchCenterListResponse> {
    return this._client.get('/rest/v1/global-dispatch-centers', options);
  }

  /**
   * Delete a global dispatch center. Requires scope: globalDispatch:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<GlobalDispatchCenterDeleteResponse> {
    return this._client.delete(path`/rest/v1/global-dispatch-centers/${id}`, options);
  }
}

export interface GlobalDispatchCenterCreateResponse {
  id: string;

  createdAt: string;

  isEnabled: boolean;

  kind: string;

  name?: string | null;

  updatedAt?: string | null;
}

export interface GlobalDispatchCenterRetrieveResponse {
  id: string;

  createdAt: string;

  isEnabled: boolean;

  kind: string;

  name?: string | null;

  updatedAt?: string | null;
}

export interface GlobalDispatchCenterUpdateResponse {
  id: string;

  createdAt: string;

  isEnabled: boolean;

  kind: string;

  name?: string | null;

  updatedAt?: string | null;
}

export interface GlobalDispatchCenterListResponse {
  entities: Array<GlobalDispatchCenterListResponse.Entity>;
}

export namespace GlobalDispatchCenterListResponse {
  export interface Entity {
    id: string;

    createdAt: string;

    isEnabled: boolean;

    kind: string;

    name?: string | null;

    updatedAt?: string | null;
  }
}

export type GlobalDispatchCenterDeleteResponse = boolean;

export interface GlobalDispatchCenterUpdateParams {
  categories?: Array<GlobalDispatchCenterUpdateParams.Category> | null;

  isEnabled?: boolean | null;

  name?: string | null;

  notes?: string | null;
}

export namespace GlobalDispatchCenterUpdateParams {
  export interface Category {
    description?: string | null;

    destinationIds?: Array<string> | null;

    logic?: Category.Logic | null;

    name?: string | null;

    priority?: number | null;
  }

  export namespace Category {
    export interface Logic {
      AND?: Array<Logic.And> | null;

      condition?: Logic.Condition | null;

      NOT?: Logic.Not | null;

      OR?: Array<Logic.Or> | null;
    }

    export namespace Logic {
      export interface And {
        AND?: Array<And.And> | null;

        condition?: And.Condition | null;

        NOT?: And.Not | null;

        OR?: Array<And.Or> | null;
      }

      export namespace And {
        export interface And {
          condition?: And.Condition | null;
        }

        export namespace And {
          export interface Condition {
            operator:
              | 'Contains'
              | 'DoesNotContain'
              | 'DoesNotMatchRegex'
              | 'DoesNotMatchRegexIgnoreCase'
              | 'EndsWith'
              | 'Is'
              | 'IsAfter'
              | 'IsBefore'
              | 'IsBetween'
              | 'IsFalse'
              | 'IsFalsy'
              | 'IsFoundIn'
              | 'IsGreaterThan'
              | 'IsGreaterThanOrEqual'
              | 'IsIn'
              | 'IsLessThan'
              | 'IsLessThanOrEqual'
              | 'IsNot'
              | 'IsNotFoundIn'
              | 'IsNotIn'
              | 'IsNotNull'
              | 'IsNotUndefined'
              | 'IsNull'
              | 'IsOnOrAfter'
              | 'IsOnOrBefore'
              | 'IsTrue'
              | 'IsTruthy'
              | 'IsUndefined'
              | 'MatchesRegex'
              | 'MatchesRegexIgnoreCase'
              | 'StartsWith';

            property: string;

            value: string;
          }
        }

        export interface Condition {
          operator:
            | 'Contains'
            | 'DoesNotContain'
            | 'DoesNotMatchRegex'
            | 'DoesNotMatchRegexIgnoreCase'
            | 'EndsWith'
            | 'Is'
            | 'IsAfter'
            | 'IsBefore'
            | 'IsBetween'
            | 'IsFalse'
            | 'IsFalsy'
            | 'IsFoundIn'
            | 'IsGreaterThan'
            | 'IsGreaterThanOrEqual'
            | 'IsIn'
            | 'IsLessThan'
            | 'IsLessThanOrEqual'
            | 'IsNot'
            | 'IsNotFoundIn'
            | 'IsNotIn'
            | 'IsNotNull'
            | 'IsNotUndefined'
            | 'IsNull'
            | 'IsOnOrAfter'
            | 'IsOnOrBefore'
            | 'IsTrue'
            | 'IsTruthy'
            | 'IsUndefined'
            | 'MatchesRegex'
            | 'MatchesRegexIgnoreCase'
            | 'StartsWith';

          property: string;

          value: string;
        }

        export interface Not {
          condition?: Not.Condition | null;
        }

        export namespace Not {
          export interface Condition {
            operator:
              | 'Contains'
              | 'DoesNotContain'
              | 'DoesNotMatchRegex'
              | 'DoesNotMatchRegexIgnoreCase'
              | 'EndsWith'
              | 'Is'
              | 'IsAfter'
              | 'IsBefore'
              | 'IsBetween'
              | 'IsFalse'
              | 'IsFalsy'
              | 'IsFoundIn'
              | 'IsGreaterThan'
              | 'IsGreaterThanOrEqual'
              | 'IsIn'
              | 'IsLessThan'
              | 'IsLessThanOrEqual'
              | 'IsNot'
              | 'IsNotFoundIn'
              | 'IsNotIn'
              | 'IsNotNull'
              | 'IsNotUndefined'
              | 'IsNull'
              | 'IsOnOrAfter'
              | 'IsOnOrBefore'
              | 'IsTrue'
              | 'IsTruthy'
              | 'IsUndefined'
              | 'MatchesRegex'
              | 'MatchesRegexIgnoreCase'
              | 'StartsWith';

            property: string;

            value: string;
          }
        }

        export interface Or {
          condition?: Or.Condition | null;
        }

        export namespace Or {
          export interface Condition {
            operator:
              | 'Contains'
              | 'DoesNotContain'
              | 'DoesNotMatchRegex'
              | 'DoesNotMatchRegexIgnoreCase'
              | 'EndsWith'
              | 'Is'
              | 'IsAfter'
              | 'IsBefore'
              | 'IsBetween'
              | 'IsFalse'
              | 'IsFalsy'
              | 'IsFoundIn'
              | 'IsGreaterThan'
              | 'IsGreaterThanOrEqual'
              | 'IsIn'
              | 'IsLessThan'
              | 'IsLessThanOrEqual'
              | 'IsNot'
              | 'IsNotFoundIn'
              | 'IsNotIn'
              | 'IsNotNull'
              | 'IsNotUndefined'
              | 'IsNull'
              | 'IsOnOrAfter'
              | 'IsOnOrBefore'
              | 'IsTrue'
              | 'IsTruthy'
              | 'IsUndefined'
              | 'MatchesRegex'
              | 'MatchesRegexIgnoreCase'
              | 'StartsWith';

            property: string;

            value: string;
          }
        }
      }

      export interface Condition {
        operator:
          | 'Contains'
          | 'DoesNotContain'
          | 'DoesNotMatchRegex'
          | 'DoesNotMatchRegexIgnoreCase'
          | 'EndsWith'
          | 'Is'
          | 'IsAfter'
          | 'IsBefore'
          | 'IsBetween'
          | 'IsFalse'
          | 'IsFalsy'
          | 'IsFoundIn'
          | 'IsGreaterThan'
          | 'IsGreaterThanOrEqual'
          | 'IsIn'
          | 'IsLessThan'
          | 'IsLessThanOrEqual'
          | 'IsNot'
          | 'IsNotFoundIn'
          | 'IsNotIn'
          | 'IsNotNull'
          | 'IsNotUndefined'
          | 'IsNull'
          | 'IsOnOrAfter'
          | 'IsOnOrBefore'
          | 'IsTrue'
          | 'IsTruthy'
          | 'IsUndefined'
          | 'MatchesRegex'
          | 'MatchesRegexIgnoreCase'
          | 'StartsWith';

        property: string;

        value: string;
      }

      export interface Not {
        AND?: Array<Not.And> | null;

        condition?: Not.Condition | null;

        NOT?: Not.Not | null;

        OR?: Array<Not.Or> | null;
      }

      export namespace Not {
        export interface And {
          condition?: And.Condition | null;
        }

        export namespace And {
          export interface Condition {
            operator:
              | 'Contains'
              | 'DoesNotContain'
              | 'DoesNotMatchRegex'
              | 'DoesNotMatchRegexIgnoreCase'
              | 'EndsWith'
              | 'Is'
              | 'IsAfter'
              | 'IsBefore'
              | 'IsBetween'
              | 'IsFalse'
              | 'IsFalsy'
              | 'IsFoundIn'
              | 'IsGreaterThan'
              | 'IsGreaterThanOrEqual'
              | 'IsIn'
              | 'IsLessThan'
              | 'IsLessThanOrEqual'
              | 'IsNot'
              | 'IsNotFoundIn'
              | 'IsNotIn'
              | 'IsNotNull'
              | 'IsNotUndefined'
              | 'IsNull'
              | 'IsOnOrAfter'
              | 'IsOnOrBefore'
              | 'IsTrue'
              | 'IsTruthy'
              | 'IsUndefined'
              | 'MatchesRegex'
              | 'MatchesRegexIgnoreCase'
              | 'StartsWith';

            property: string;

            value: string;
          }
        }

        export interface Condition {
          operator:
            | 'Contains'
            | 'DoesNotContain'
            | 'DoesNotMatchRegex'
            | 'DoesNotMatchRegexIgnoreCase'
            | 'EndsWith'
            | 'Is'
            | 'IsAfter'
            | 'IsBefore'
            | 'IsBetween'
            | 'IsFalse'
            | 'IsFalsy'
            | 'IsFoundIn'
            | 'IsGreaterThan'
            | 'IsGreaterThanOrEqual'
            | 'IsIn'
            | 'IsLessThan'
            | 'IsLessThanOrEqual'
            | 'IsNot'
            | 'IsNotFoundIn'
            | 'IsNotIn'
            | 'IsNotNull'
            | 'IsNotUndefined'
            | 'IsNull'
            | 'IsOnOrAfter'
            | 'IsOnOrBefore'
            | 'IsTrue'
            | 'IsTruthy'
            | 'IsUndefined'
            | 'MatchesRegex'
            | 'MatchesRegexIgnoreCase'
            | 'StartsWith';

          property: string;

          value: string;
        }

        export interface Not {
          condition?: Not.Condition | null;
        }

        export namespace Not {
          export interface Condition {
            operator:
              | 'Contains'
              | 'DoesNotContain'
              | 'DoesNotMatchRegex'
              | 'DoesNotMatchRegexIgnoreCase'
              | 'EndsWith'
              | 'Is'
              | 'IsAfter'
              | 'IsBefore'
              | 'IsBetween'
              | 'IsFalse'
              | 'IsFalsy'
              | 'IsFoundIn'
              | 'IsGreaterThan'
              | 'IsGreaterThanOrEqual'
              | 'IsIn'
              | 'IsLessThan'
              | 'IsLessThanOrEqual'
              | 'IsNot'
              | 'IsNotFoundIn'
              | 'IsNotIn'
              | 'IsNotNull'
              | 'IsNotUndefined'
              | 'IsNull'
              | 'IsOnOrAfter'
              | 'IsOnOrBefore'
              | 'IsTrue'
              | 'IsTruthy'
              | 'IsUndefined'
              | 'MatchesRegex'
              | 'MatchesRegexIgnoreCase'
              | 'StartsWith';

            property: string;

            value: string;
          }
        }

        export interface Or {
          condition?: Or.Condition | null;
        }

        export namespace Or {
          export interface Condition {
            operator:
              | 'Contains'
              | 'DoesNotContain'
              | 'DoesNotMatchRegex'
              | 'DoesNotMatchRegexIgnoreCase'
              | 'EndsWith'
              | 'Is'
              | 'IsAfter'
              | 'IsBefore'
              | 'IsBetween'
              | 'IsFalse'
              | 'IsFalsy'
              | 'IsFoundIn'
              | 'IsGreaterThan'
              | 'IsGreaterThanOrEqual'
              | 'IsIn'
              | 'IsLessThan'
              | 'IsLessThanOrEqual'
              | 'IsNot'
              | 'IsNotFoundIn'
              | 'IsNotIn'
              | 'IsNotNull'
              | 'IsNotUndefined'
              | 'IsNull'
              | 'IsOnOrAfter'
              | 'IsOnOrBefore'
              | 'IsTrue'
              | 'IsTruthy'
              | 'IsUndefined'
              | 'MatchesRegex'
              | 'MatchesRegexIgnoreCase'
              | 'StartsWith';

            property: string;

            value: string;
          }
        }
      }

      export interface Or {
        AND?: Array<Or.And> | null;

        condition?: Or.Condition | null;

        NOT?: Or.Not | null;

        OR?: Array<Or.Or> | null;
      }

      export namespace Or {
        export interface And {
          condition?: And.Condition | null;
        }

        export namespace And {
          export interface Condition {
            operator:
              | 'Contains'
              | 'DoesNotContain'
              | 'DoesNotMatchRegex'
              | 'DoesNotMatchRegexIgnoreCase'
              | 'EndsWith'
              | 'Is'
              | 'IsAfter'
              | 'IsBefore'
              | 'IsBetween'
              | 'IsFalse'
              | 'IsFalsy'
              | 'IsFoundIn'
              | 'IsGreaterThan'
              | 'IsGreaterThanOrEqual'
              | 'IsIn'
              | 'IsLessThan'
              | 'IsLessThanOrEqual'
              | 'IsNot'
              | 'IsNotFoundIn'
              | 'IsNotIn'
              | 'IsNotNull'
              | 'IsNotUndefined'
              | 'IsNull'
              | 'IsOnOrAfter'
              | 'IsOnOrBefore'
              | 'IsTrue'
              | 'IsTruthy'
              | 'IsUndefined'
              | 'MatchesRegex'
              | 'MatchesRegexIgnoreCase'
              | 'StartsWith';

            property: string;

            value: string;
          }
        }

        export interface Condition {
          operator:
            | 'Contains'
            | 'DoesNotContain'
            | 'DoesNotMatchRegex'
            | 'DoesNotMatchRegexIgnoreCase'
            | 'EndsWith'
            | 'Is'
            | 'IsAfter'
            | 'IsBefore'
            | 'IsBetween'
            | 'IsFalse'
            | 'IsFalsy'
            | 'IsFoundIn'
            | 'IsGreaterThan'
            | 'IsGreaterThanOrEqual'
            | 'IsIn'
            | 'IsLessThan'
            | 'IsLessThanOrEqual'
            | 'IsNot'
            | 'IsNotFoundIn'
            | 'IsNotIn'
            | 'IsNotNull'
            | 'IsNotUndefined'
            | 'IsNull'
            | 'IsOnOrAfter'
            | 'IsOnOrBefore'
            | 'IsTrue'
            | 'IsTruthy'
            | 'IsUndefined'
            | 'MatchesRegex'
            | 'MatchesRegexIgnoreCase'
            | 'StartsWith';

          property: string;

          value: string;
        }

        export interface Not {
          condition?: Not.Condition | null;
        }

        export namespace Not {
          export interface Condition {
            operator:
              | 'Contains'
              | 'DoesNotContain'
              | 'DoesNotMatchRegex'
              | 'DoesNotMatchRegexIgnoreCase'
              | 'EndsWith'
              | 'Is'
              | 'IsAfter'
              | 'IsBefore'
              | 'IsBetween'
              | 'IsFalse'
              | 'IsFalsy'
              | 'IsFoundIn'
              | 'IsGreaterThan'
              | 'IsGreaterThanOrEqual'
              | 'IsIn'
              | 'IsLessThan'
              | 'IsLessThanOrEqual'
              | 'IsNot'
              | 'IsNotFoundIn'
              | 'IsNotIn'
              | 'IsNotNull'
              | 'IsNotUndefined'
              | 'IsNull'
              | 'IsOnOrAfter'
              | 'IsOnOrBefore'
              | 'IsTrue'
              | 'IsTruthy'
              | 'IsUndefined'
              | 'MatchesRegex'
              | 'MatchesRegexIgnoreCase'
              | 'StartsWith';

            property: string;

            value: string;
          }
        }

        export interface Or {
          condition?: Or.Condition | null;
        }

        export namespace Or {
          export interface Condition {
            operator:
              | 'Contains'
              | 'DoesNotContain'
              | 'DoesNotMatchRegex'
              | 'DoesNotMatchRegexIgnoreCase'
              | 'EndsWith'
              | 'Is'
              | 'IsAfter'
              | 'IsBefore'
              | 'IsBetween'
              | 'IsFalse'
              | 'IsFalsy'
              | 'IsFoundIn'
              | 'IsGreaterThan'
              | 'IsGreaterThanOrEqual'
              | 'IsIn'
              | 'IsLessThan'
              | 'IsLessThanOrEqual'
              | 'IsNot'
              | 'IsNotFoundIn'
              | 'IsNotIn'
              | 'IsNotNull'
              | 'IsNotUndefined'
              | 'IsNull'
              | 'IsOnOrAfter'
              | 'IsOnOrBefore'
              | 'IsTrue'
              | 'IsTruthy'
              | 'IsUndefined'
              | 'MatchesRegex'
              | 'MatchesRegexIgnoreCase'
              | 'StartsWith';

            property: string;

            value: string;
          }
        }
      }
    }
  }
}

export declare namespace GlobalDispatchCenters {
  export {
    type GlobalDispatchCenterCreateResponse as GlobalDispatchCenterCreateResponse,
    type GlobalDispatchCenterRetrieveResponse as GlobalDispatchCenterRetrieveResponse,
    type GlobalDispatchCenterUpdateResponse as GlobalDispatchCenterUpdateResponse,
    type GlobalDispatchCenterListResponse as GlobalDispatchCenterListResponse,
    type GlobalDispatchCenterDeleteResponse as GlobalDispatchCenterDeleteResponse,
    type GlobalDispatchCenterUpdateParams as GlobalDispatchCenterUpdateParams,
  };
}
