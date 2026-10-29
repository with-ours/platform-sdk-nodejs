// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Funnels extends APIResource {
  /**
   * List readable funnels configured on this account. Each funnel includes its
   * canonical versioned definition. If some funnels cannot be loaded,
   * `unavailableCount` and `warnings` identify the incomplete result; omitted
   * funnels must not be treated as deleted. A complete list has
   * `unavailableCount: 0` and no warnings. Funnel results are computed on demand, so
   * `status` is always `READY` and `reportDateRange` is always `null`. Requires
   * API-key scope or current OAuth user permission: web-analytics:view
   */
  list(options?: RequestOptions): APIPromise<FunnelListResponse> {
    return this._client.get('/rest/v1/funnels', options);
  }

  /**
   * Create a funnel from a versioned definition. Returns the complete saved
   * configuration. Requires API-key scope or current OAuth user permission:
   * web-analytics:write
   */
  create(body: FunnelCreateParams, options?: RequestOptions): APIPromise<FunnelCreateResponse> {
    return this._client.post('/rest/v1/funnels', { body, ...options });
  }

  /**
   * Fetch a single funnel configuration by its id. Returns `404` when the funnel
   * does not exist or belongs to a different account. Requires API-key scope or
   * current OAuth user permission: web-analytics:view
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<FunnelRetrieveResponse> {
    return this._client.get(path`/rest/v1/funnels/${id}`, options);
  }

  /**
   * Update one or more funnel fields. Omitted fields remain unchanged. The canonical
   * definition can be replaced by supplying `queryDefinition`. Requires API-key
   * scope or current OAuth user permission: web-analytics:write
   */
  update(id: string, body: FunnelUpdateParams, options?: RequestOptions): APIPromise<FunnelUpdateResponse> {
    return this._client.patch(path`/rest/v1/funnels/${id}`, { body, ...options });
  }

  /**
   * Delete a Funnel configuration. Existing analytics data is unaffected. Requires
   * API-key scope or current OAuth user permission: web-analytics:write
   */
  delete(id: string, options?: RequestOptions): APIPromise<FunnelDeleteResponse> {
    return this._client.delete(path`/rest/v1/funnels/${id}`, options);
  }

  /**
   * Duplicate a funnel configuration in the same account. The copy keeps the
   * canonical definition, receives a new ID, and is named `Copy of …`. Requires
   * API-key scope or current OAuth user permission: web-analytics:write,
   * web-analytics:view
   */
  duplicate(id: string, options?: RequestOptions): APIPromise<FunnelDuplicateResponse> {
    return this._client.post(path`/rest/v1/funnels/${id}/duplicate`, options);
  }

  /**
   * Compute funnel step analytics from the funnel’s saved `queryDefinition` over a
   * requested date window. Returns per-step visitor counts, conversion rates,
   * drop-off rates, average time to next step, sample session IDs for replay, and
   * the resolved entry/observation scope. Results are computed on demand from event
   * data at request time; ad hoc filter, saved-scope, and web-source overrides are
   * not accepted. Observation completeness is null when the source coverage
   * watermark is unavailable. `to` must be on or after `from`, and the window may
   * span at most 91 days including both endpoints. Requires API-key scope or current
   * OAuth user permission: web-analytics:view
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
   * The readable funnels configured on this account.
   */
  entities: Array<FunnelListResponse.Entity>;

  /**
   * Number of funnels that could not be loaded. A positive count means the list is
   * incomplete.
   */
  unavailableCount: number;

  /**
   * Warnings about incomplete results. Empty when every funnel was loaded.
   */
  warnings: Array<string>;
}

export namespace FunnelListResponse {
  export interface Entity {
    createdAt: string;

    funnelId: string;

    name: string;

    /**
     * Versioned funnel definition with typed steps and filters.
     */
    queryDefinition: Entity.QueryDefinition;

    status: 'READY' | 'PROCESSING';

    updatedAt: string;

    /**
     * Optional description; null clears it.
     */
    description?: string | null;

    reportDateRange?: Entity.ReportDateRange | null;

    watched?: boolean | null;
  }

  export namespace Entity {
    /**
     * Versioned funnel definition with typed steps and filters.
     */
    export interface QueryDefinition {
      counting: 'unique' | 'events' | 'sessions';

      identity: 'session' | 'visitor';

      kind: 'funnel';

      order: 'ordered' | 'any';

      reentry: 'first' | 'best';

      steps: Array<QueryDefinition.Step>;

      version: 1;

      windowMs: number;

      entryFilter?: QueryDefinition.EntryFilter;

      filter?: QueryDefinition.Filter;
    }

    export namespace QueryDefinition {
      export interface Step {
        id: string;

        eventName: string;

        name: string;

        filter?: Step.Filter;
      }

      export namespace Step {
        export interface Filter {
          filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

          version: 1;
        }

        export namespace Filter {
          export interface UnionMember0 {
            children: Array<unknown>;

            kind: 'and' | 'or';
          }

          export interface UnionMember1 {
            child: unknown;

            kind: 'not';
          }

          export interface UnionMember2 {
            kind: 'predicate';

            operator:
              | 'eq'
              | 'neq'
              | 'gt'
              | 'gte'
              | 'lt'
              | 'lte'
              | 'contains'
              | 'not_contains'
              | 'contains_ci'
              | 'not_contains_ci'
              | 'starts_with'
              | 'ends_with'
              | 'in'
              | 'not_in'
              | 'exists'
              | 'missing'
              | 'is_null';

            property: string;

            path?: Array<string>;

            type?: 'string' | 'number' | 'boolean';

            value?: string | number | boolean | Array<string | number | boolean>;
          }
        }
      }

      export interface EntryFilter {
        filter: EntryFilter.UnionMember0 | EntryFilter.UnionMember1 | EntryFilter.UnionMember2;

        version: 1;
      }

      export namespace EntryFilter {
        export interface UnionMember0 {
          children: Array<unknown>;

          kind: 'and' | 'or';
        }

        export interface UnionMember1 {
          child: unknown;

          kind: 'not';
        }

        export interface UnionMember2 {
          kind: 'predicate';

          operator:
            | 'eq'
            | 'neq'
            | 'gt'
            | 'gte'
            | 'lt'
            | 'lte'
            | 'contains'
            | 'not_contains'
            | 'contains_ci'
            | 'not_contains_ci'
            | 'starts_with'
            | 'ends_with'
            | 'in'
            | 'not_in'
            | 'exists'
            | 'missing'
            | 'is_null';

          property: string;

          path?: Array<string>;

          type?: 'string' | 'number' | 'boolean';

          value?: string | number | boolean | Array<string | number | boolean>;
        }
      }

      export interface Filter {
        filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

        version: 1;
      }

      export namespace Filter {
        export interface UnionMember0 {
          children: Array<unknown>;

          kind: 'and' | 'or';
        }

        export interface UnionMember1 {
          child: unknown;

          kind: 'not';
        }

        export interface UnionMember2 {
          kind: 'predicate';

          operator:
            | 'eq'
            | 'neq'
            | 'gt'
            | 'gte'
            | 'lt'
            | 'lte'
            | 'contains'
            | 'not_contains'
            | 'contains_ci'
            | 'not_contains_ci'
            | 'starts_with'
            | 'ends_with'
            | 'in'
            | 'not_in'
            | 'exists'
            | 'missing'
            | 'is_null';

          property: string;

          path?: Array<string>;

          type?: 'string' | 'number' | 'boolean';

          value?: string | number | boolean | Array<string | number | boolean>;
        }
      }
    }

    export interface ReportDateRange {
      from: string;

      to: string;
    }
  }
}

export interface FunnelCreateResponse {
  createdAt: string;

  funnelId: string;

  name: string;

  /**
   * Versioned funnel definition with typed steps and filters.
   */
  queryDefinition: FunnelCreateResponse.QueryDefinition;

  status: 'READY' | 'PROCESSING';

  updatedAt: string;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;

  reportDateRange?: FunnelCreateResponse.ReportDateRange | null;

  watched?: boolean | null;
}

export namespace FunnelCreateResponse {
  /**
   * Versioned funnel definition with typed steps and filters.
   */
  export interface QueryDefinition {
    counting: 'unique' | 'events' | 'sessions';

    identity: 'session' | 'visitor';

    kind: 'funnel';

    order: 'ordered' | 'any';

    reentry: 'first' | 'best';

    steps: Array<QueryDefinition.Step>;

    version: 1;

    windowMs: number;

    entryFilter?: QueryDefinition.EntryFilter;

    filter?: QueryDefinition.Filter;
  }

  export namespace QueryDefinition {
    export interface Step {
      id: string;

      eventName: string;

      name: string;

      filter?: Step.Filter;
    }

    export namespace Step {
      export interface Filter {
        filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

        version: 1;
      }

      export namespace Filter {
        export interface UnionMember0 {
          children: Array<unknown>;

          kind: 'and' | 'or';
        }

        export interface UnionMember1 {
          child: unknown;

          kind: 'not';
        }

        export interface UnionMember2 {
          kind: 'predicate';

          operator:
            | 'eq'
            | 'neq'
            | 'gt'
            | 'gte'
            | 'lt'
            | 'lte'
            | 'contains'
            | 'not_contains'
            | 'contains_ci'
            | 'not_contains_ci'
            | 'starts_with'
            | 'ends_with'
            | 'in'
            | 'not_in'
            | 'exists'
            | 'missing'
            | 'is_null';

          property: string;

          path?: Array<string>;

          type?: 'string' | 'number' | 'boolean';

          value?: string | number | boolean | Array<string | number | boolean>;
        }
      }
    }

    export interface EntryFilter {
      filter: EntryFilter.UnionMember0 | EntryFilter.UnionMember1 | EntryFilter.UnionMember2;

      version: 1;
    }

    export namespace EntryFilter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }

    export interface Filter {
      filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

      version: 1;
    }

    export namespace Filter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
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

  name: string;

  /**
   * Versioned funnel definition with typed steps and filters.
   */
  queryDefinition: FunnelRetrieveResponse.QueryDefinition;

  status: 'READY' | 'PROCESSING';

  updatedAt: string;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;

  reportDateRange?: FunnelRetrieveResponse.ReportDateRange | null;

  watched?: boolean | null;
}

export namespace FunnelRetrieveResponse {
  /**
   * Versioned funnel definition with typed steps and filters.
   */
  export interface QueryDefinition {
    counting: 'unique' | 'events' | 'sessions';

    identity: 'session' | 'visitor';

    kind: 'funnel';

    order: 'ordered' | 'any';

    reentry: 'first' | 'best';

    steps: Array<QueryDefinition.Step>;

    version: 1;

    windowMs: number;

    entryFilter?: QueryDefinition.EntryFilter;

    filter?: QueryDefinition.Filter;
  }

  export namespace QueryDefinition {
    export interface Step {
      id: string;

      eventName: string;

      name: string;

      filter?: Step.Filter;
    }

    export namespace Step {
      export interface Filter {
        filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

        version: 1;
      }

      export namespace Filter {
        export interface UnionMember0 {
          children: Array<unknown>;

          kind: 'and' | 'or';
        }

        export interface UnionMember1 {
          child: unknown;

          kind: 'not';
        }

        export interface UnionMember2 {
          kind: 'predicate';

          operator:
            | 'eq'
            | 'neq'
            | 'gt'
            | 'gte'
            | 'lt'
            | 'lte'
            | 'contains'
            | 'not_contains'
            | 'contains_ci'
            | 'not_contains_ci'
            | 'starts_with'
            | 'ends_with'
            | 'in'
            | 'not_in'
            | 'exists'
            | 'missing'
            | 'is_null';

          property: string;

          path?: Array<string>;

          type?: 'string' | 'number' | 'boolean';

          value?: string | number | boolean | Array<string | number | boolean>;
        }
      }
    }

    export interface EntryFilter {
      filter: EntryFilter.UnionMember0 | EntryFilter.UnionMember1 | EntryFilter.UnionMember2;

      version: 1;
    }

    export namespace EntryFilter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }

    export interface Filter {
      filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

      version: 1;
    }

    export namespace Filter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }
  }

  export interface ReportDateRange {
    from: string;

    to: string;
  }
}

export interface FunnelUpdateResponse {
  createdAt: string;

  funnelId: string;

  name: string;

  /**
   * Versioned funnel definition with typed steps and filters.
   */
  queryDefinition: FunnelUpdateResponse.QueryDefinition;

  status: 'READY' | 'PROCESSING';

  updatedAt: string;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;

  reportDateRange?: FunnelUpdateResponse.ReportDateRange | null;

  watched?: boolean | null;
}

export namespace FunnelUpdateResponse {
  /**
   * Versioned funnel definition with typed steps and filters.
   */
  export interface QueryDefinition {
    counting: 'unique' | 'events' | 'sessions';

    identity: 'session' | 'visitor';

    kind: 'funnel';

    order: 'ordered' | 'any';

    reentry: 'first' | 'best';

    steps: Array<QueryDefinition.Step>;

    version: 1;

    windowMs: number;

    entryFilter?: QueryDefinition.EntryFilter;

    filter?: QueryDefinition.Filter;
  }

  export namespace QueryDefinition {
    export interface Step {
      id: string;

      eventName: string;

      name: string;

      filter?: Step.Filter;
    }

    export namespace Step {
      export interface Filter {
        filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

        version: 1;
      }

      export namespace Filter {
        export interface UnionMember0 {
          children: Array<unknown>;

          kind: 'and' | 'or';
        }

        export interface UnionMember1 {
          child: unknown;

          kind: 'not';
        }

        export interface UnionMember2 {
          kind: 'predicate';

          operator:
            | 'eq'
            | 'neq'
            | 'gt'
            | 'gte'
            | 'lt'
            | 'lte'
            | 'contains'
            | 'not_contains'
            | 'contains_ci'
            | 'not_contains_ci'
            | 'starts_with'
            | 'ends_with'
            | 'in'
            | 'not_in'
            | 'exists'
            | 'missing'
            | 'is_null';

          property: string;

          path?: Array<string>;

          type?: 'string' | 'number' | 'boolean';

          value?: string | number | boolean | Array<string | number | boolean>;
        }
      }
    }

    export interface EntryFilter {
      filter: EntryFilter.UnionMember0 | EntryFilter.UnionMember1 | EntryFilter.UnionMember2;

      version: 1;
    }

    export namespace EntryFilter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }

    export interface Filter {
      filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

      version: 1;
    }

    export namespace Filter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }
  }

  export interface ReportDateRange {
    from: string;

    to: string;
  }
}

export interface FunnelDeleteResponse {
  id: string;

  deleted: true;
}

export interface FunnelDuplicateResponse {
  createdAt: string;

  funnelId: string;

  name: string;

  /**
   * Versioned funnel definition with typed steps and filters.
   */
  queryDefinition: FunnelDuplicateResponse.QueryDefinition;

  status: 'READY' | 'PROCESSING';

  updatedAt: string;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;

  reportDateRange?: FunnelDuplicateResponse.ReportDateRange | null;

  watched?: boolean | null;
}

export namespace FunnelDuplicateResponse {
  /**
   * Versioned funnel definition with typed steps and filters.
   */
  export interface QueryDefinition {
    counting: 'unique' | 'events' | 'sessions';

    identity: 'session' | 'visitor';

    kind: 'funnel';

    order: 'ordered' | 'any';

    reentry: 'first' | 'best';

    steps: Array<QueryDefinition.Step>;

    version: 1;

    windowMs: number;

    entryFilter?: QueryDefinition.EntryFilter;

    filter?: QueryDefinition.Filter;
  }

  export namespace QueryDefinition {
    export interface Step {
      id: string;

      eventName: string;

      name: string;

      filter?: Step.Filter;
    }

    export namespace Step {
      export interface Filter {
        filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

        version: 1;
      }

      export namespace Filter {
        export interface UnionMember0 {
          children: Array<unknown>;

          kind: 'and' | 'or';
        }

        export interface UnionMember1 {
          child: unknown;

          kind: 'not';
        }

        export interface UnionMember2 {
          kind: 'predicate';

          operator:
            | 'eq'
            | 'neq'
            | 'gt'
            | 'gte'
            | 'lt'
            | 'lte'
            | 'contains'
            | 'not_contains'
            | 'contains_ci'
            | 'not_contains_ci'
            | 'starts_with'
            | 'ends_with'
            | 'in'
            | 'not_in'
            | 'exists'
            | 'missing'
            | 'is_null';

          property: string;

          path?: Array<string>;

          type?: 'string' | 'number' | 'boolean';

          value?: string | number | boolean | Array<string | number | boolean>;
        }
      }
    }

    export interface EntryFilter {
      filter: EntryFilter.UnionMember0 | EntryFilter.UnionMember1 | EntryFilter.UnionMember2;

      version: 1;
    }

    export namespace EntryFilter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }

    export interface Filter {
      filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

      version: 1;
    }

    export namespace Filter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }
  }

  export interface ReportDateRange {
    from: string;

    to: string;
  }
}

export interface FunnelResultsResponse {
  definitionUpdatedAt: string;

  engine: string;

  /**
   * Ratio of last-step to first-step volume as a percentage. Event-counting ratios
   * may exceed 100%.
   */
  overallConversionRate: number;

  scope: FunnelResultsResponse.Scope;

  semanticVersion: 1;

  /**
   * Data quality limitations affecting these results. Source completeness and
   * conflicting event corrections may be unverified.
   */
  sourceLimitations: Array<
    'equal-load-conflicts-unverified' | 'cross-key-corrections-unverified' | 'source-completeness-unverified'
  >;

  sourcePolicy: 'events-v3-physical-key';

  /**
   * Per-step funnel analytics, ordered by step number.
   */
  steps: Array<FunnelResultsResponse.Step>;

  /**
   * First-step volume using the saved counting method: unique people, sessions, or
   * events.
   */
  totalVisitors: number;

  /**
   * Average time from first step to last step in seconds. Null when no completions.
   */
  overallAvgTimeToConversion?: number | null;

  sourceRevision?: string | null;
}

export namespace FunnelResultsResponse {
  export interface Scope {
    entryFrom: string;

    entryTo: string;

    observationFrom: string;

    observationTo: string;

    timezone: 'UTC';

    windowMs: number;

    observationComplete?: boolean | null;

    settledEntryTo?: string | null;

    watermark?: string | null;
  }

  export interface Step {
    conversionCount: number;

    /**
     * Step ratio as a percentage. Event-counting ratios may exceed 100%.
     */
    conversionRate: number;

    /**
     * Drop-off percentage for participant counting; zero when the previous step volume
     * is zero. Not a participant loss measure for event counting.
     */
    dropOffRate: number;

    dropOffSessionIds: Array<string>;

    dropOffVisitorIds: Array<string>;

    /**
     * Ratio to first-step volume as a percentage. Event-counting ratios may exceed
     * 100%.
     */
    overallConversionRate: number;

    sessionIds: Array<string>;

    stepNumber: number;

    /**
     * Step volume using the saved counting method: unique people, sessions, or events.
     */
    visitorCount: number;

    visitorIds: Array<string>;

    /**
     * Average incoming hop time from the previous step to this step, in seconds.
     */
    avgTimeToNextStep?: number | null;
  }
}

export interface FunnelCreateParams {
  /**
   * Display name for the saved funnel.
   */
  name: string;

  /**
   * Versioned funnel definition with typed steps and filters.
   */
  queryDefinition: FunnelCreateParams.QueryDefinition;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;

  /**
   * Whether funnel monitoring is enabled. Requires notifications to be enabled for
   * this account.
   */
  watched?: boolean | null;
}

export namespace FunnelCreateParams {
  /**
   * Versioned funnel definition with typed steps and filters.
   */
  export interface QueryDefinition {
    counting: 'unique' | 'events' | 'sessions';

    identity: 'session' | 'visitor';

    kind: 'funnel';

    order: 'ordered' | 'any';

    reentry: 'first' | 'best';

    steps: Array<QueryDefinition.Step>;

    version: 1;

    windowMs: number;

    entryFilter?: QueryDefinition.EntryFilter;

    filter?: QueryDefinition.Filter;
  }

  export namespace QueryDefinition {
    export interface Step {
      id: string;

      eventName: string;

      name: string;

      filter?: Step.Filter;
    }

    export namespace Step {
      export interface Filter {
        filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

        version: 1;
      }

      export namespace Filter {
        export interface UnionMember0 {
          children: Array<unknown>;

          kind: 'and' | 'or';
        }

        export interface UnionMember1 {
          child: unknown;

          kind: 'not';
        }

        export interface UnionMember2 {
          kind: 'predicate';

          operator:
            | 'eq'
            | 'neq'
            | 'gt'
            | 'gte'
            | 'lt'
            | 'lte'
            | 'contains'
            | 'not_contains'
            | 'contains_ci'
            | 'not_contains_ci'
            | 'starts_with'
            | 'ends_with'
            | 'in'
            | 'not_in'
            | 'exists'
            | 'missing'
            | 'is_null';

          property: string;

          path?: Array<string>;

          type?: 'string' | 'number' | 'boolean';

          value?: string | number | boolean | Array<string | number | boolean>;
        }
      }
    }

    export interface EntryFilter {
      filter: EntryFilter.UnionMember0 | EntryFilter.UnionMember1 | EntryFilter.UnionMember2;

      version: 1;
    }

    export namespace EntryFilter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }

    export interface Filter {
      filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

      version: 1;
    }

    export namespace Filter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }
  }
}

export interface FunnelUpdateParams {
  /**
   * Optional description; null clears it.
   */
  description?: string | null;

  /**
   * Display name for the saved funnel.
   */
  name?: string;

  /**
   * Versioned funnel definition with typed steps and filters.
   */
  queryDefinition?: FunnelUpdateParams.QueryDefinition;

  /**
   * Whether funnel monitoring is enabled. Requires notifications to be enabled for
   * this account.
   */
  watched?: boolean | null;
}

export namespace FunnelUpdateParams {
  /**
   * Versioned funnel definition with typed steps and filters.
   */
  export interface QueryDefinition {
    counting: 'unique' | 'events' | 'sessions';

    identity: 'session' | 'visitor';

    kind: 'funnel';

    order: 'ordered' | 'any';

    reentry: 'first' | 'best';

    steps: Array<QueryDefinition.Step>;

    version: 1;

    windowMs: number;

    entryFilter?: QueryDefinition.EntryFilter;

    filter?: QueryDefinition.Filter;
  }

  export namespace QueryDefinition {
    export interface Step {
      id: string;

      eventName: string;

      name: string;

      filter?: Step.Filter;
    }

    export namespace Step {
      export interface Filter {
        filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

        version: 1;
      }

      export namespace Filter {
        export interface UnionMember0 {
          children: Array<unknown>;

          kind: 'and' | 'or';
        }

        export interface UnionMember1 {
          child: unknown;

          kind: 'not';
        }

        export interface UnionMember2 {
          kind: 'predicate';

          operator:
            | 'eq'
            | 'neq'
            | 'gt'
            | 'gte'
            | 'lt'
            | 'lte'
            | 'contains'
            | 'not_contains'
            | 'contains_ci'
            | 'not_contains_ci'
            | 'starts_with'
            | 'ends_with'
            | 'in'
            | 'not_in'
            | 'exists'
            | 'missing'
            | 'is_null';

          property: string;

          path?: Array<string>;

          type?: 'string' | 'number' | 'boolean';

          value?: string | number | boolean | Array<string | number | boolean>;
        }
      }
    }

    export interface EntryFilter {
      filter: EntryFilter.UnionMember0 | EntryFilter.UnionMember1 | EntryFilter.UnionMember2;

      version: 1;
    }

    export namespace EntryFilter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }

    export interface Filter {
      filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

      version: 1;
    }

    export namespace Filter {
      export interface UnionMember0 {
        children: Array<unknown>;

        kind: 'and' | 'or';
      }

      export interface UnionMember1 {
        child: unknown;

        kind: 'not';
      }

      export interface UnionMember2 {
        kind: 'predicate';

        operator:
          | 'eq'
          | 'neq'
          | 'gt'
          | 'gte'
          | 'lt'
          | 'lte'
          | 'contains'
          | 'not_contains'
          | 'contains_ci'
          | 'not_contains_ci'
          | 'starts_with'
          | 'ends_with'
          | 'in'
          | 'not_in'
          | 'exists'
          | 'missing'
          | 'is_null';

        property: string;

        path?: Array<string>;

        type?: 'string' | 'number' | 'boolean';

        value?: string | number | boolean | Array<string | number | boolean>;
      }
    }
  }
}

export interface FunnelResultsParams {
  /**
   * Inclusive lower bound of the analysis window, as a UTC calendar day in
   * `YYYY-MM-DD` format. The window may span at most 91 days including both
   * endpoints.
   */
  from: string;

  /**
   * Inclusive upper bound of the analysis window, as a UTC calendar day in
   * `YYYY-MM-DD` format. Must be on or after `from`, and the window may span at most
   * 91 days including both endpoints.
   */
  to: string;

  /**
   * Use the saved funnel response's updatedAt from GET /funnels/{id} (MCP:
   * get_funnel.updatedAt) to require that definition revision. Results return the
   * same revision as definitionUpdatedAt. Returns a conflict if the funnel has
   * changed; omit to use the latest saved definition.
   */
  expectedDefinitionUpdatedAt?: string;
}

export declare namespace Funnels {
  export {
    type FunnelListResponse as FunnelListResponse,
    type FunnelCreateResponse as FunnelCreateResponse,
    type FunnelRetrieveResponse as FunnelRetrieveResponse,
    type FunnelUpdateResponse as FunnelUpdateResponse,
    type FunnelDeleteResponse as FunnelDeleteResponse,
    type FunnelDuplicateResponse as FunnelDuplicateResponse,
    type FunnelResultsResponse as FunnelResultsResponse,
    type FunnelCreateParams as FunnelCreateParams,
    type FunnelUpdateParams as FunnelUpdateParams,
    type FunnelResultsParams as FunnelResultsParams,
  };
}
