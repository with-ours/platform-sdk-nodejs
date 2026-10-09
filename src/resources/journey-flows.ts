// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class JourneyFlows extends APIResource {
  /**
   * List saved Journey Flow configurations, most recently updated first. Supports
   * cursor pagination and name/description search. Requires API-key scope or current
   * OAuth user permission: web-analytics:view
   */
  list(
    query: JourneyFlowListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<JourneyFlowListResponsesCursor, JourneyFlowListResponse> {
    return this._client.getAPIList('/rest/v1/journey-flows', Cursor<JourneyFlowListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Save a validated Journey Flow configuration. Source ownership, UTC scope,
   * bounded entry dates, and compiler-supported semantics are enforced by the
   * GraphQL domain path. Requires API-key scope or current OAuth user permission:
   * web-analytics:write
   */
  create(body: JourneyFlowCreateParams, options?: RequestOptions): APIPromise<JourneyFlowCreateResponse> {
    return this._client.post('/rest/v1/journey-flows', { body, ...options });
  }

  /**
   * Fetch a saved Journey Flow configuration by id. Returns 404 when it does not
   * exist or is not readable by this account. Requires API-key scope or current
   * OAuth user permission: web-analytics:view
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<JourneyFlowRetrieveResponse> {
    return this._client.get(path`/rest/v1/journey-flows/${id}`, options);
  }

  /**
   * Partially update a Journey Flow using expectedRevision for optimistic
   * concurrency. Omitted top-level fields remain unchanged; nested values replace
   * the complete nested value. Requires API-key scope or current OAuth user
   * permission: web-analytics:write
   */
  update(
    id: string,
    body: JourneyFlowUpdateParams,
    options?: RequestOptions,
  ): APIPromise<JourneyFlowUpdateResponse> {
    return this._client.patch(path`/rest/v1/journey-flows/${id}`, { body, ...options });
  }

  /**
   * Delete a Journey Flow using expectedRevision for optimistic concurrency. The
   * response includes the deleted revision. Requires API-key scope or current OAuth
   * user permission: web-analytics:write
   */
  delete(
    id: string,
    params: JourneyFlowDeleteParams,
    options?: RequestOptions,
  ): APIPromise<JourneyFlowDeleteResponse> {
    const { expectedRevision } = params;
    return this._client.delete(path`/rest/v1/journey-flows/${id}`, {
      query: { expectedRevision },
      ...options,
    });
  }

  /**
   * Return the currently supported Journey Flow counting modes, visualizations,
   * matcher kinds, limits, and unsupported-feature flags. Requires API-key scope or
   * current OAuth user permission: web-analytics:view
   */
  capabilities(options?: RequestOptions): APIPromise<JourneyFlowCapabilitiesResponse> {
    return this._client.get('/rest/v1/journey-flows/capabilities', options);
  }

  /**
   * Compute a saved Journey Flow result on demand. Requires expectedRevision and
   * permits an optional complete report context override. Requires API-key scope or
   * current OAuth user permission: web-analytics:view
   */
  results(
    id: string,
    query: JourneyFlowResultsParams,
    options?: RequestOptions,
  ): APIPromise<JourneyFlowResultsResponse> {
    return this._client.get(path`/rest/v1/journey-flows/${id}/result`, { query, ...options });
  }

  /**
   * Export the saved Journey Flow as CSV with its effective scope, exact aggregate
   * counts, timing, graph and bounded Top Paths. Requires expectedRevision; display
   * limits and omitted path weight are included. The response contains the CSV
   * content and filename. Visitor and session samples are not included. Requires
   * API-key scope or current OAuth user permission: web-analytics:view
   */
  export(
    id: string,
    query: JourneyFlowExportParams,
    options?: RequestOptions,
  ): APIPromise<JourneyFlowExportResponse> {
    return this._client.get(path`/rest/v1/journey-flows/${id}/export`, { query, ...options });
  }

  /**
   * Compute a bounded preview from a serialized Journey Flow definition, report
   * context, and view. Use GraphQL when the serialized input exceeds the HTTP URL
   * budget. Requires API-key scope or current OAuth user permission:
   * web-analytics:view
   */
  preview(query: JourneyFlowPreviewParams, options?: RequestOptions): APIPromise<JourneyFlowPreviewResponse> {
    return this._client.get('/rest/v1/journey-flows/preview', { query, ...options });
  }
}

export type JourneyFlowListResponsesCursor = Cursor<JourneyFlowListResponse>;

export interface JourneyFlowListResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  definition: JourneyFlowListResponse.Definition;

  name: string;

  reportContext: JourneyFlowListResponse.ReportContext;

  revision: string;

  updatedAt: string;

  updatedByUserId: string;

  view: JourneyFlowListResponse.View;

  description?: string | null;
}

export namespace JourneyFlowListResponse {
  export interface Definition {
    anchors: Array<Definition.Anchor>;

    exploration: Definition.Exploration;

    kind: 'journey-flow';

    scope: Definition.Scope;

    version: 1;

    anchorFilter?: Definition.AnchorFilter;

    breakdown?: Definition.Breakdown;

    contextWindowMs?: number;

    conversionWindowMs?: number;

    counting?: 'unique' | 'totals' | 'sessions';

    entryFilter?: Definition.EntryFilter;

    exclusions?: Array<Definition.Exclusion>;

    holdConstant?: Array<Definition.HoldConstant>;

    nodeExpansions?: Array<Definition.NodeExpansion>;

    reentry?: 'first' | 'best';
  }

  export namespace Definition {
    export interface Anchor {
      id: string;

      alternatives: Array<Anchor.UnionMember0 | Anchor.UnionMember1>;

      filter?: Anchor.Filter;

      label?: string;
    }

    export namespace Anchor {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

    export interface Exploration {
      after?: number;

      before?: number;

      between?: Array<Exploration.Between>;

      collapseRepeats?: boolean;

      focus?: Array<Exploration.FocusUnionMember0 | Exploration.Outcome>;

      hiddenEvents?: Array<Exploration.HiddenEventsUnionMember0 | Exploration.UnionMember1>;

      pageKey?: 'path' | 'url';

      pathFilter?: Exploration.PathFilter;

      stepKinds?: Array<'event' | 'page'>;
    }

    export namespace Exploration {
      export interface Between {
        afterFrom: number;

        beforeTo: number;

        fromAnchorId: string;

        toAnchorId: string;
      }

      export interface FocusUnionMember0 {
        position: FocusUnionMember0.Position;

        matcher?: FocusUnionMember0.UnionMember0 | FocusUnionMember0.UnionMember1;
      }

      export namespace FocusUnionMember0 {
        export interface Position {
          anchorId: string;

          offset: number;

          side: 'anchor' | 'before' | 'after';
        }

        export interface UnionMember0 {
          eventName: string;

          kind: 'event';

          filter?: UnionMember0.Filter;
        }

        export namespace UnionMember0 {
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

        export interface UnionMember1 {
          kind: 'page';

          filter?: UnionMember1.Filter;
        }

        export namespace UnionMember1 {
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

      export interface Outcome {
        outcome: 'completed' | 'incomplete';
      }

      export interface HiddenEventsUnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: HiddenEventsUnionMember0.Filter;
      }

      export namespace HiddenEventsUnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

      export interface PathFilter {
        filter: PathFilter.UnionMember0 | PathFilter.UnionMember1 | PathFilter.UnionMember2;

        version: 1;
      }

      export namespace PathFilter {
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

    export interface Scope {
      excludeBots: boolean;

      sourceIds: Array<string>;

      sessionFilter?: Scope.SessionFilter;
    }

    export namespace Scope {
      export interface SessionFilter {
        filter: SessionFilter.UnionMember0 | SessionFilter.UnionMember1 | SessionFilter.UnionMember2;

        version: 1;
      }

      export namespace SessionFilter {
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

    export interface AnchorFilter {
      filter: AnchorFilter.UnionMember0 | AnchorFilter.UnionMember1 | AnchorFilter.UnionMember2;

      version: 1;
    }

    export namespace AnchorFilter {
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

    export interface Breakdown {
      atAnchorId: string;

      property: Breakdown.Property;

      limit?: number;
    }

    export namespace Breakdown {
      export interface Property {
        property: string;

        type: 'string' | 'number' | 'boolean';

        path?: Array<string>;
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

    export interface Exclusion {
      id: string;

      fromAnchorId: string;

      matcher: Exclusion.UnionMember0 | Exclusion.UnionMember1;

      toAnchorId: string;
    }

    export namespace Exclusion {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

    export interface HoldConstant {
      property: string;

      type: 'string' | 'number' | 'boolean';

      path?: Array<string>;
    }

    export interface NodeExpansion {
      matcher: NodeExpansion.UnionMember0 | NodeExpansion.UnionMember1;

      position: NodeExpansion.Position;

      property: NodeExpansion.Property;

      limit?: number;
    }

    export namespace NodeExpansion {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

      export interface Position {
        anchorId: string;

        offset: number;

        side: 'anchor' | 'before' | 'after';
      }

      export interface Property {
        property: string;

        type: 'string' | 'number' | 'boolean';

        path?: Array<string>;
      }
    }
  }

  export interface ReportContext {
    dateRange: ReportContext.DateRange;

    comparisons?: Array<ReportContext.Comparison>;
  }

  export namespace ReportContext {
    export interface DateRange {
      from: string;

      timeZone: string;

      to: string;
    }

    export interface Comparison {
      id: string;

      label: string;

      dateRange?: Comparison.DateRange;

      entryFilter?: Comparison.EntryFilter;

      sessionFilter?: Comparison.SessionFilter;
    }

    export namespace Comparison {
      export interface DateRange {
        from: string;

        timeZone: string;

        to: string;
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

      export interface SessionFilter {
        filter: SessionFilter.UnionMember0 | SessionFilter.UnionMember1 | SessionFilter.UnionMember2;

        version: 1;
      }

      export namespace SessionFilter {
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

  export interface View {
    showDropOff?: boolean;

    showElapsedTime?: boolean;

    topEventsPerPosition?: number;

    topPaths?: number;

    visualization?: 'sankey' | 'top-paths';
  }
}

export interface JourneyFlowCreateResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  definition: JourneyFlowCreateResponse.Definition;

  name: string;

  reportContext: JourneyFlowCreateResponse.ReportContext;

  revision: string;

  updatedAt: string;

  updatedByUserId: string;

  view: JourneyFlowCreateResponse.View;

  description?: string | null;
}

export namespace JourneyFlowCreateResponse {
  export interface Definition {
    anchors: Array<Definition.Anchor>;

    exploration: Definition.Exploration;

    kind: 'journey-flow';

    scope: Definition.Scope;

    version: 1;

    anchorFilter?: Definition.AnchorFilter;

    breakdown?: Definition.Breakdown;

    contextWindowMs?: number;

    conversionWindowMs?: number;

    counting?: 'unique' | 'totals' | 'sessions';

    entryFilter?: Definition.EntryFilter;

    exclusions?: Array<Definition.Exclusion>;

    holdConstant?: Array<Definition.HoldConstant>;

    nodeExpansions?: Array<Definition.NodeExpansion>;

    reentry?: 'first' | 'best';
  }

  export namespace Definition {
    export interface Anchor {
      id: string;

      alternatives: Array<Anchor.UnionMember0 | Anchor.UnionMember1>;

      filter?: Anchor.Filter;

      label?: string;
    }

    export namespace Anchor {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

    export interface Exploration {
      after?: number;

      before?: number;

      between?: Array<Exploration.Between>;

      collapseRepeats?: boolean;

      focus?: Array<Exploration.FocusUnionMember0 | Exploration.Outcome>;

      hiddenEvents?: Array<Exploration.HiddenEventsUnionMember0 | Exploration.UnionMember1>;

      pageKey?: 'path' | 'url';

      pathFilter?: Exploration.PathFilter;

      stepKinds?: Array<'event' | 'page'>;
    }

    export namespace Exploration {
      export interface Between {
        afterFrom: number;

        beforeTo: number;

        fromAnchorId: string;

        toAnchorId: string;
      }

      export interface FocusUnionMember0 {
        position: FocusUnionMember0.Position;

        matcher?: FocusUnionMember0.UnionMember0 | FocusUnionMember0.UnionMember1;
      }

      export namespace FocusUnionMember0 {
        export interface Position {
          anchorId: string;

          offset: number;

          side: 'anchor' | 'before' | 'after';
        }

        export interface UnionMember0 {
          eventName: string;

          kind: 'event';

          filter?: UnionMember0.Filter;
        }

        export namespace UnionMember0 {
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

        export interface UnionMember1 {
          kind: 'page';

          filter?: UnionMember1.Filter;
        }

        export namespace UnionMember1 {
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

      export interface Outcome {
        outcome: 'completed' | 'incomplete';
      }

      export interface HiddenEventsUnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: HiddenEventsUnionMember0.Filter;
      }

      export namespace HiddenEventsUnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

      export interface PathFilter {
        filter: PathFilter.UnionMember0 | PathFilter.UnionMember1 | PathFilter.UnionMember2;

        version: 1;
      }

      export namespace PathFilter {
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

    export interface Scope {
      excludeBots: boolean;

      sourceIds: Array<string>;

      sessionFilter?: Scope.SessionFilter;
    }

    export namespace Scope {
      export interface SessionFilter {
        filter: SessionFilter.UnionMember0 | SessionFilter.UnionMember1 | SessionFilter.UnionMember2;

        version: 1;
      }

      export namespace SessionFilter {
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

    export interface AnchorFilter {
      filter: AnchorFilter.UnionMember0 | AnchorFilter.UnionMember1 | AnchorFilter.UnionMember2;

      version: 1;
    }

    export namespace AnchorFilter {
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

    export interface Breakdown {
      atAnchorId: string;

      property: Breakdown.Property;

      limit?: number;
    }

    export namespace Breakdown {
      export interface Property {
        property: string;

        type: 'string' | 'number' | 'boolean';

        path?: Array<string>;
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

    export interface Exclusion {
      id: string;

      fromAnchorId: string;

      matcher: Exclusion.UnionMember0 | Exclusion.UnionMember1;

      toAnchorId: string;
    }

    export namespace Exclusion {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

    export interface HoldConstant {
      property: string;

      type: 'string' | 'number' | 'boolean';

      path?: Array<string>;
    }

    export interface NodeExpansion {
      matcher: NodeExpansion.UnionMember0 | NodeExpansion.UnionMember1;

      position: NodeExpansion.Position;

      property: NodeExpansion.Property;

      limit?: number;
    }

    export namespace NodeExpansion {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

      export interface Position {
        anchorId: string;

        offset: number;

        side: 'anchor' | 'before' | 'after';
      }

      export interface Property {
        property: string;

        type: 'string' | 'number' | 'boolean';

        path?: Array<string>;
      }
    }
  }

  export interface ReportContext {
    dateRange: ReportContext.DateRange;

    comparisons?: Array<ReportContext.Comparison>;
  }

  export namespace ReportContext {
    export interface DateRange {
      from: string;

      timeZone: string;

      to: string;
    }

    export interface Comparison {
      id: string;

      label: string;

      dateRange?: Comparison.DateRange;

      entryFilter?: Comparison.EntryFilter;

      sessionFilter?: Comparison.SessionFilter;
    }

    export namespace Comparison {
      export interface DateRange {
        from: string;

        timeZone: string;

        to: string;
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

      export interface SessionFilter {
        filter: SessionFilter.UnionMember0 | SessionFilter.UnionMember1 | SessionFilter.UnionMember2;

        version: 1;
      }

      export namespace SessionFilter {
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

  export interface View {
    showDropOff?: boolean;

    showElapsedTime?: boolean;

    topEventsPerPosition?: number;

    topPaths?: number;

    visualization?: 'sankey' | 'top-paths';
  }
}

export interface JourneyFlowRetrieveResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  definition: JourneyFlowRetrieveResponse.Definition;

  name: string;

  reportContext: JourneyFlowRetrieveResponse.ReportContext;

  revision: string;

  updatedAt: string;

  updatedByUserId: string;

  view: JourneyFlowRetrieveResponse.View;

  description?: string | null;
}

export namespace JourneyFlowRetrieveResponse {
  export interface Definition {
    anchors: Array<Definition.Anchor>;

    exploration: Definition.Exploration;

    kind: 'journey-flow';

    scope: Definition.Scope;

    version: 1;

    anchorFilter?: Definition.AnchorFilter;

    breakdown?: Definition.Breakdown;

    contextWindowMs?: number;

    conversionWindowMs?: number;

    counting?: 'unique' | 'totals' | 'sessions';

    entryFilter?: Definition.EntryFilter;

    exclusions?: Array<Definition.Exclusion>;

    holdConstant?: Array<Definition.HoldConstant>;

    nodeExpansions?: Array<Definition.NodeExpansion>;

    reentry?: 'first' | 'best';
  }

  export namespace Definition {
    export interface Anchor {
      id: string;

      alternatives: Array<Anchor.UnionMember0 | Anchor.UnionMember1>;

      filter?: Anchor.Filter;

      label?: string;
    }

    export namespace Anchor {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

    export interface Exploration {
      after?: number;

      before?: number;

      between?: Array<Exploration.Between>;

      collapseRepeats?: boolean;

      focus?: Array<Exploration.FocusUnionMember0 | Exploration.Outcome>;

      hiddenEvents?: Array<Exploration.HiddenEventsUnionMember0 | Exploration.UnionMember1>;

      pageKey?: 'path' | 'url';

      pathFilter?: Exploration.PathFilter;

      stepKinds?: Array<'event' | 'page'>;
    }

    export namespace Exploration {
      export interface Between {
        afterFrom: number;

        beforeTo: number;

        fromAnchorId: string;

        toAnchorId: string;
      }

      export interface FocusUnionMember0 {
        position: FocusUnionMember0.Position;

        matcher?: FocusUnionMember0.UnionMember0 | FocusUnionMember0.UnionMember1;
      }

      export namespace FocusUnionMember0 {
        export interface Position {
          anchorId: string;

          offset: number;

          side: 'anchor' | 'before' | 'after';
        }

        export interface UnionMember0 {
          eventName: string;

          kind: 'event';

          filter?: UnionMember0.Filter;
        }

        export namespace UnionMember0 {
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

        export interface UnionMember1 {
          kind: 'page';

          filter?: UnionMember1.Filter;
        }

        export namespace UnionMember1 {
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

      export interface Outcome {
        outcome: 'completed' | 'incomplete';
      }

      export interface HiddenEventsUnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: HiddenEventsUnionMember0.Filter;
      }

      export namespace HiddenEventsUnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

      export interface PathFilter {
        filter: PathFilter.UnionMember0 | PathFilter.UnionMember1 | PathFilter.UnionMember2;

        version: 1;
      }

      export namespace PathFilter {
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

    export interface Scope {
      excludeBots: boolean;

      sourceIds: Array<string>;

      sessionFilter?: Scope.SessionFilter;
    }

    export namespace Scope {
      export interface SessionFilter {
        filter: SessionFilter.UnionMember0 | SessionFilter.UnionMember1 | SessionFilter.UnionMember2;

        version: 1;
      }

      export namespace SessionFilter {
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

    export interface AnchorFilter {
      filter: AnchorFilter.UnionMember0 | AnchorFilter.UnionMember1 | AnchorFilter.UnionMember2;

      version: 1;
    }

    export namespace AnchorFilter {
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

    export interface Breakdown {
      atAnchorId: string;

      property: Breakdown.Property;

      limit?: number;
    }

    export namespace Breakdown {
      export interface Property {
        property: string;

        type: 'string' | 'number' | 'boolean';

        path?: Array<string>;
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

    export interface Exclusion {
      id: string;

      fromAnchorId: string;

      matcher: Exclusion.UnionMember0 | Exclusion.UnionMember1;

      toAnchorId: string;
    }

    export namespace Exclusion {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

    export interface HoldConstant {
      property: string;

      type: 'string' | 'number' | 'boolean';

      path?: Array<string>;
    }

    export interface NodeExpansion {
      matcher: NodeExpansion.UnionMember0 | NodeExpansion.UnionMember1;

      position: NodeExpansion.Position;

      property: NodeExpansion.Property;

      limit?: number;
    }

    export namespace NodeExpansion {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

      export interface Position {
        anchorId: string;

        offset: number;

        side: 'anchor' | 'before' | 'after';
      }

      export interface Property {
        property: string;

        type: 'string' | 'number' | 'boolean';

        path?: Array<string>;
      }
    }
  }

  export interface ReportContext {
    dateRange: ReportContext.DateRange;

    comparisons?: Array<ReportContext.Comparison>;
  }

  export namespace ReportContext {
    export interface DateRange {
      from: string;

      timeZone: string;

      to: string;
    }

    export interface Comparison {
      id: string;

      label: string;

      dateRange?: Comparison.DateRange;

      entryFilter?: Comparison.EntryFilter;

      sessionFilter?: Comparison.SessionFilter;
    }

    export namespace Comparison {
      export interface DateRange {
        from: string;

        timeZone: string;

        to: string;
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

      export interface SessionFilter {
        filter: SessionFilter.UnionMember0 | SessionFilter.UnionMember1 | SessionFilter.UnionMember2;

        version: 1;
      }

      export namespace SessionFilter {
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

  export interface View {
    showDropOff?: boolean;

    showElapsedTime?: boolean;

    topEventsPerPosition?: number;

    topPaths?: number;

    visualization?: 'sankey' | 'top-paths';
  }
}

export interface JourneyFlowUpdateResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  definition: JourneyFlowUpdateResponse.Definition;

  name: string;

  reportContext: JourneyFlowUpdateResponse.ReportContext;

  revision: string;

  updatedAt: string;

  updatedByUserId: string;

  view: JourneyFlowUpdateResponse.View;

  description?: string | null;
}

export namespace JourneyFlowUpdateResponse {
  export interface Definition {
    anchors: Array<Definition.Anchor>;

    exploration: Definition.Exploration;

    kind: 'journey-flow';

    scope: Definition.Scope;

    version: 1;

    anchorFilter?: Definition.AnchorFilter;

    breakdown?: Definition.Breakdown;

    contextWindowMs?: number;

    conversionWindowMs?: number;

    counting?: 'unique' | 'totals' | 'sessions';

    entryFilter?: Definition.EntryFilter;

    exclusions?: Array<Definition.Exclusion>;

    holdConstant?: Array<Definition.HoldConstant>;

    nodeExpansions?: Array<Definition.NodeExpansion>;

    reentry?: 'first' | 'best';
  }

  export namespace Definition {
    export interface Anchor {
      id: string;

      alternatives: Array<Anchor.UnionMember0 | Anchor.UnionMember1>;

      filter?: Anchor.Filter;

      label?: string;
    }

    export namespace Anchor {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

    export interface Exploration {
      after?: number;

      before?: number;

      between?: Array<Exploration.Between>;

      collapseRepeats?: boolean;

      focus?: Array<Exploration.FocusUnionMember0 | Exploration.Outcome>;

      hiddenEvents?: Array<Exploration.HiddenEventsUnionMember0 | Exploration.UnionMember1>;

      pageKey?: 'path' | 'url';

      pathFilter?: Exploration.PathFilter;

      stepKinds?: Array<'event' | 'page'>;
    }

    export namespace Exploration {
      export interface Between {
        afterFrom: number;

        beforeTo: number;

        fromAnchorId: string;

        toAnchorId: string;
      }

      export interface FocusUnionMember0 {
        position: FocusUnionMember0.Position;

        matcher?: FocusUnionMember0.UnionMember0 | FocusUnionMember0.UnionMember1;
      }

      export namespace FocusUnionMember0 {
        export interface Position {
          anchorId: string;

          offset: number;

          side: 'anchor' | 'before' | 'after';
        }

        export interface UnionMember0 {
          eventName: string;

          kind: 'event';

          filter?: UnionMember0.Filter;
        }

        export namespace UnionMember0 {
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

        export interface UnionMember1 {
          kind: 'page';

          filter?: UnionMember1.Filter;
        }

        export namespace UnionMember1 {
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

      export interface Outcome {
        outcome: 'completed' | 'incomplete';
      }

      export interface HiddenEventsUnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: HiddenEventsUnionMember0.Filter;
      }

      export namespace HiddenEventsUnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

      export interface PathFilter {
        filter: PathFilter.UnionMember0 | PathFilter.UnionMember1 | PathFilter.UnionMember2;

        version: 1;
      }

      export namespace PathFilter {
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

    export interface Scope {
      excludeBots: boolean;

      sourceIds: Array<string>;

      sessionFilter?: Scope.SessionFilter;
    }

    export namespace Scope {
      export interface SessionFilter {
        filter: SessionFilter.UnionMember0 | SessionFilter.UnionMember1 | SessionFilter.UnionMember2;

        version: 1;
      }

      export namespace SessionFilter {
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

    export interface AnchorFilter {
      filter: AnchorFilter.UnionMember0 | AnchorFilter.UnionMember1 | AnchorFilter.UnionMember2;

      version: 1;
    }

    export namespace AnchorFilter {
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

    export interface Breakdown {
      atAnchorId: string;

      property: Breakdown.Property;

      limit?: number;
    }

    export namespace Breakdown {
      export interface Property {
        property: string;

        type: 'string' | 'number' | 'boolean';

        path?: Array<string>;
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

    export interface Exclusion {
      id: string;

      fromAnchorId: string;

      matcher: Exclusion.UnionMember0 | Exclusion.UnionMember1;

      toAnchorId: string;
    }

    export namespace Exclusion {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

    export interface HoldConstant {
      property: string;

      type: 'string' | 'number' | 'boolean';

      path?: Array<string>;
    }

    export interface NodeExpansion {
      matcher: NodeExpansion.UnionMember0 | NodeExpansion.UnionMember1;

      position: NodeExpansion.Position;

      property: NodeExpansion.Property;

      limit?: number;
    }

    export namespace NodeExpansion {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

      export interface Position {
        anchorId: string;

        offset: number;

        side: 'anchor' | 'before' | 'after';
      }

      export interface Property {
        property: string;

        type: 'string' | 'number' | 'boolean';

        path?: Array<string>;
      }
    }
  }

  export interface ReportContext {
    dateRange: ReportContext.DateRange;

    comparisons?: Array<ReportContext.Comparison>;
  }

  export namespace ReportContext {
    export interface DateRange {
      from: string;

      timeZone: string;

      to: string;
    }

    export interface Comparison {
      id: string;

      label: string;

      dateRange?: Comparison.DateRange;

      entryFilter?: Comparison.EntryFilter;

      sessionFilter?: Comparison.SessionFilter;
    }

    export namespace Comparison {
      export interface DateRange {
        from: string;

        timeZone: string;

        to: string;
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

      export interface SessionFilter {
        filter: SessionFilter.UnionMember0 | SessionFilter.UnionMember1 | SessionFilter.UnionMember2;

        version: 1;
      }

      export namespace SessionFilter {
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

  export interface View {
    showDropOff?: boolean;

    showElapsedTime?: boolean;

    topEventsPerPosition?: number;

    topPaths?: number;

    visualization?: 'sankey' | 'top-paths';
  }
}

export interface JourneyFlowDeleteResponse {
  id: string;

  deleted: true;

  deletedRevision?: string | null;
}

export interface JourneyFlowCapabilitiesResponse {
  definitionVersion: number;

  maxAlternativesPerAnchor: number;

  maxAnchors: number;

  maxBuckets: number;

  maxComparisons: number;

  maxExclusions: number;

  maxHeldProperties: number;

  maxHiddenMatchers: number;

  maxNodeExpansions: number;

  maxPositions: number;

  maxTopEventsPerPosition: number;

  maxTopPaths: number;

  maxWindowMs: number;

  sampleLimitPerOutcome: number;

  supportedCounting: Array<'UNIQUE' | 'TOTALS' | 'SESSIONS'>;

  supportedMatcherKinds: Array<'EVENT' | 'PAGE'>;

  supportedProviders: Array<string>;

  supportedReentry: Array<'FIRST' | 'BEST'>;

  supportedStepKinds: Array<'EVENT' | 'PAGE'>;

  supportedVisualizations: Array<'SANKEY' | 'TOP_PATHS'>;

  supportsBreakdowns: boolean;

  supportsCollapseRepeats: boolean;

  supportsComparisons: boolean;

  supportsCsvExport: boolean;

  supportsDropOff: boolean;

  supportsElapsedTime: boolean;

  supportsExclusions: boolean;

  supportsFocus: boolean;

  supportsHiddenEvents: boolean;

  supportsNodeExpansions: boolean;

  supportsNonUtcTimeZones: boolean;

  supportsOutcomeFocus: boolean;

  supportsPropertyHolds: boolean;

  supportsReplaySamples: boolean;

  supportsSampling: boolean;

  supportsTwoSidedGaps: boolean;

  totalsReentry: 'FIRST';
}

export interface JourneyFlowResultsResponse {
  definitionHash: string;

  effectiveContext: JourneyFlowResultsResponse.EffectiveContext;

  engine: string;

  execution: JourneyFlowResultsResponse.Execution;

  limits: JourneyFlowResultsResponse.Limits;

  observation: JourneyFlowResultsResponse.Observation;

  samples: JourneyFlowResultsResponse.Samples;

  semanticVersion: string;

  series: Array<JourneyFlowResultsResponse.Series>;

  timing: Array<JourneyFlowResultsResponse.Timing>;

  definitionRevision?: string | null;
}

export namespace JourneyFlowResultsResponse {
  export interface EffectiveContext {
    comparisons: Array<EffectiveContext.Comparison>;

    contextWindowMs: number;

    conversionWindowMs: number;

    counting: 'UNIQUE' | 'TOTALS' | 'SESSIONS';

    dateRange: EffectiveContext.DateRange;

    excludeBots: boolean;

    reentry: 'FIRST' | 'BEST';

    sourceIds: Array<string>;
  }

  export namespace EffectiveContext {
    export interface Comparison {
      id: string;

      label: string;

      dateRange?: unknown | null;

      entryFilter?: unknown | null;

      sessionFilter?: unknown | null;
    }

    export interface DateRange {
      from: string;

      timeZone: string;

      to: string;
    }
  }

  export interface Execution {
    cacheHit: boolean;

    generatedAt: string;

    queryId: string;

    sampled: boolean;

    warnings: Array<Execution.Warning>;

    cacheAgeMs?: number | null;
  }

  export namespace Execution {
    export interface Warning {
      code: string;

      message: string;

      path?: Array<string> | null;
    }
  }

  export interface Limits {
    omittedPathCount: string;

    omittedPathWeight: string;

    topEventsPerPosition: number;

    topPaths: number;

    executionLimitStatus?: string | null;

    omittedNodeCount?: string | null;

    omittedNodeWeight?: string | null;
  }

  export interface Observation {
    entryFrom: string;

    entryTo: string;

    observationFrom: string;

    observationTo: string;

    status: 'COMPLETE' | 'INCOMPLETE' | 'UNKNOWN';

    complete?: boolean | null;

    retentionBoundary?: string | null;

    watermark?: string | null;
  }

  export interface Samples {
    entries: Array<Samples.Entry>;

    limitPerOutcome: number;
  }

  export namespace Samples {
    export interface Entry {
      entryAt: string;

      lastAnchorAt: string;

      outcome: 'COMPLETED' | 'INCOMPLETE';

      reachedAnchors: number;

      sessionId: string | null;

      sessionStartDate: string | null;

      visitorId: string;
    }
  }

  export interface Series {
    id: string;

    label: string;

    segments: Array<Series.Segment>;
  }

  export namespace Series {
    export interface Segment {
      id: string;

      columns: Array<Segment.Column>;

      completedCount: string;

      edges: Array<Segment.Edge>;

      entryCount: string;

      excludedCount: string;

      label: string;

      nodes: Array<Segment.Node>;

      omittedPathWeight: string;

      returnedPathWeight: string;

      topPaths: Array<Segment.TopPath>;

      totalPathCount: string;

      unfocusedEntryCount: string;

      observationIncompleteCount?: string | null;

      timedOutCount?: string | null;
    }

    export namespace Segment {
      export interface Column {
        kind: 'ANCHOR' | 'BEFORE' | 'GAP' | 'OMITTED' | 'AFTER' | 'OUTCOME';

        label: string;

        position: Column.Position;

        total: string;
      }

      export namespace Column {
        export interface Position {
          anchorId: string | null;

          column: number;

          key: string;

          offset: number | null;

          side: 'anchor' | 'before' | 'after' | null;
        }
      }

      export interface Edge {
        id: string;

        count: string;

        denominator: string;

        shareOfPrevious: Edge.ShareOfPrevious;

        sourceNodeId: string;

        targetNodeId: string;

        shareOfNext?: unknown | null;
      }

      export namespace Edge {
        export interface ShareOfPrevious {
          denominator: string;

          numerator: string;

          value?: number | null;
        }
      }

      export interface Node {
        id: string;

        anchorId: string | null;

        count: string;

        denominator: string;

        key: string;

        kind: 'ANCHOR' | 'EVENT' | 'PAGE' | 'TERMINAL' | 'OMITTED_STEPS' | 'OTHER_EVENTS';

        matcher: unknown | null;

        position: Node.Position;

        shareOfEntries: Node.ShareOfEntries;

        value: string;

        shareOfNext?: unknown | null;

        shareOfPrevious?: unknown | null;

        source?: string | null;

        terminal?: 'COMPLETED' | 'INCOMPLETE' | null;
      }

      export namespace Node {
        export interface Position {
          anchorId: string | null;

          column: number;

          key: string;

          offset: number | null;

          side: 'anchor' | 'before' | 'after' | null;
        }

        export interface ShareOfEntries {
          denominator: string;

          numerator: string;

          value?: number | null;
        }
      }

      export interface TopPath {
        id: string;

        completedCount: string;

        denominator: string;

        incompleteCount: string;

        shareOfEntries: TopPath.ShareOfEntries;

        steps: Array<TopPath.Step>;

        weight: string;
      }

      export namespace TopPath {
        export interface ShareOfEntries {
          denominator: string;

          numerator: string;

          value?: number | null;
        }

        export interface Step {
          anchorId: string | null;

          kind: 'ANCHOR' | 'EVENT' | 'PAGE' | 'TERMINAL' | 'OMITTED_STEPS' | 'OTHER_EVENTS';

          matcher: unknown | null;

          position: Step.Position;

          value: string;

          source?: string | null;

          terminal?: 'COMPLETED' | 'INCOMPLETE' | null;
        }

        export namespace Step {
          export interface Position {
            anchorId: string | null;

            column: number;

            key: string;

            offset: number | null;

            side: 'anchor' | 'before' | 'after' | null;
          }
        }
      }
    }
  }

  export interface Timing {
    count: string;

    direction: 'FORWARD' | 'BACKWARD';

    fromPosition: string;

    kind: 'EDGE' | 'ANCHOR' | 'OVERALL';

    sourceNodeId: string;

    targetNodeId: string;

    toPosition: string;

    averageMs?: number | null;

    maximumMs?: number | null;

    medianMs?: number | null;

    minimumMs?: number | null;
  }
}

export interface JourneyFlowExportResponse {
  content: string;

  contentType: 'text/csv; charset=utf-8';

  definitionHash: string;

  definitionRevision: string;

  filename: string;

  generatedAt: string;
}

export interface JourneyFlowPreviewResponse {
  definitionHash: string;

  effectiveContext: JourneyFlowPreviewResponse.EffectiveContext;

  engine: string;

  execution: JourneyFlowPreviewResponse.Execution;

  limits: JourneyFlowPreviewResponse.Limits;

  observation: JourneyFlowPreviewResponse.Observation;

  samples: JourneyFlowPreviewResponse.Samples;

  semanticVersion: string;

  series: Array<JourneyFlowPreviewResponse.Series>;

  timing: Array<JourneyFlowPreviewResponse.Timing>;

  definitionRevision?: string | null;
}

export namespace JourneyFlowPreviewResponse {
  export interface EffectiveContext {
    comparisons: Array<EffectiveContext.Comparison>;

    contextWindowMs: number;

    conversionWindowMs: number;

    counting: 'UNIQUE' | 'TOTALS' | 'SESSIONS';

    dateRange: EffectiveContext.DateRange;

    excludeBots: boolean;

    reentry: 'FIRST' | 'BEST';

    sourceIds: Array<string>;
  }

  export namespace EffectiveContext {
    export interface Comparison {
      id: string;

      label: string;

      dateRange?: unknown | null;

      entryFilter?: unknown | null;

      sessionFilter?: unknown | null;
    }

    export interface DateRange {
      from: string;

      timeZone: string;

      to: string;
    }
  }

  export interface Execution {
    cacheHit: boolean;

    generatedAt: string;

    queryId: string;

    sampled: boolean;

    warnings: Array<Execution.Warning>;

    cacheAgeMs?: number | null;
  }

  export namespace Execution {
    export interface Warning {
      code: string;

      message: string;

      path?: Array<string> | null;
    }
  }

  export interface Limits {
    omittedPathCount: string;

    omittedPathWeight: string;

    topEventsPerPosition: number;

    topPaths: number;

    executionLimitStatus?: string | null;

    omittedNodeCount?: string | null;

    omittedNodeWeight?: string | null;
  }

  export interface Observation {
    entryFrom: string;

    entryTo: string;

    observationFrom: string;

    observationTo: string;

    status: 'COMPLETE' | 'INCOMPLETE' | 'UNKNOWN';

    complete?: boolean | null;

    retentionBoundary?: string | null;

    watermark?: string | null;
  }

  export interface Samples {
    entries: Array<Samples.Entry>;

    limitPerOutcome: number;
  }

  export namespace Samples {
    export interface Entry {
      entryAt: string;

      lastAnchorAt: string;

      outcome: 'COMPLETED' | 'INCOMPLETE';

      reachedAnchors: number;

      sessionId: string | null;

      sessionStartDate: string | null;

      visitorId: string;
    }
  }

  export interface Series {
    id: string;

    label: string;

    segments: Array<Series.Segment>;
  }

  export namespace Series {
    export interface Segment {
      id: string;

      columns: Array<Segment.Column>;

      completedCount: string;

      edges: Array<Segment.Edge>;

      entryCount: string;

      excludedCount: string;

      label: string;

      nodes: Array<Segment.Node>;

      omittedPathWeight: string;

      returnedPathWeight: string;

      topPaths: Array<Segment.TopPath>;

      totalPathCount: string;

      unfocusedEntryCount: string;

      observationIncompleteCount?: string | null;

      timedOutCount?: string | null;
    }

    export namespace Segment {
      export interface Column {
        kind: 'ANCHOR' | 'BEFORE' | 'GAP' | 'OMITTED' | 'AFTER' | 'OUTCOME';

        label: string;

        position: Column.Position;

        total: string;
      }

      export namespace Column {
        export interface Position {
          anchorId: string | null;

          column: number;

          key: string;

          offset: number | null;

          side: 'anchor' | 'before' | 'after' | null;
        }
      }

      export interface Edge {
        id: string;

        count: string;

        denominator: string;

        shareOfPrevious: Edge.ShareOfPrevious;

        sourceNodeId: string;

        targetNodeId: string;

        shareOfNext?: unknown | null;
      }

      export namespace Edge {
        export interface ShareOfPrevious {
          denominator: string;

          numerator: string;

          value?: number | null;
        }
      }

      export interface Node {
        id: string;

        anchorId: string | null;

        count: string;

        denominator: string;

        key: string;

        kind: 'ANCHOR' | 'EVENT' | 'PAGE' | 'TERMINAL' | 'OMITTED_STEPS' | 'OTHER_EVENTS';

        matcher: unknown | null;

        position: Node.Position;

        shareOfEntries: Node.ShareOfEntries;

        value: string;

        shareOfNext?: unknown | null;

        shareOfPrevious?: unknown | null;

        source?: string | null;

        terminal?: 'COMPLETED' | 'INCOMPLETE' | null;
      }

      export namespace Node {
        export interface Position {
          anchorId: string | null;

          column: number;

          key: string;

          offset: number | null;

          side: 'anchor' | 'before' | 'after' | null;
        }

        export interface ShareOfEntries {
          denominator: string;

          numerator: string;

          value?: number | null;
        }
      }

      export interface TopPath {
        id: string;

        completedCount: string;

        denominator: string;

        incompleteCount: string;

        shareOfEntries: TopPath.ShareOfEntries;

        steps: Array<TopPath.Step>;

        weight: string;
      }

      export namespace TopPath {
        export interface ShareOfEntries {
          denominator: string;

          numerator: string;

          value?: number | null;
        }

        export interface Step {
          anchorId: string | null;

          kind: 'ANCHOR' | 'EVENT' | 'PAGE' | 'TERMINAL' | 'OMITTED_STEPS' | 'OTHER_EVENTS';

          matcher: unknown | null;

          position: Step.Position;

          value: string;

          source?: string | null;

          terminal?: 'COMPLETED' | 'INCOMPLETE' | null;
        }

        export namespace Step {
          export interface Position {
            anchorId: string | null;

            column: number;

            key: string;

            offset: number | null;

            side: 'anchor' | 'before' | 'after' | null;
          }
        }
      }
    }
  }

  export interface Timing {
    count: string;

    direction: 'FORWARD' | 'BACKWARD';

    fromPosition: string;

    kind: 'EDGE' | 'ANCHOR' | 'OVERALL';

    sourceNodeId: string;

    targetNodeId: string;

    toPosition: string;

    averageMs?: number | null;

    maximumMs?: number | null;

    medianMs?: number | null;

    minimumMs?: number | null;
  }
}

export interface JourneyFlowListParams extends CursorParams {
  search?: string;
}

export interface JourneyFlowCreateParams {
  definition: JourneyFlowCreateParams.Definition;

  name: string;

  reportContext: JourneyFlowCreateParams.ReportContext;

  view: JourneyFlowCreateParams.View;

  description?: string | null;
}

export namespace JourneyFlowCreateParams {
  export interface Definition {
    anchors: Array<Definition.Anchor>;

    exploration: Definition.Exploration;

    kind: 'journey-flow';

    scope: Definition.Scope;

    version: 1;

    anchorFilter?: Definition.AnchorFilter;

    breakdown?: Definition.Breakdown;

    contextWindowMs?: number;

    conversionWindowMs?: number;

    counting?: 'unique' | 'totals' | 'sessions';

    entryFilter?: Definition.EntryFilter;

    exclusions?: Array<Definition.Exclusion>;

    holdConstant?: Array<Definition.HoldConstant>;

    nodeExpansions?: Array<Definition.NodeExpansion>;

    reentry?: 'first' | 'best';
  }

  export namespace Definition {
    export interface Anchor {
      id: string;

      alternatives: Array<Anchor.UnionMember0 | Anchor.UnionMember1>;

      filter?: Anchor.Filter;

      label?: string;
    }

    export namespace Anchor {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

    export interface Exploration {
      after?: number;

      before?: number;

      between?: Array<Exploration.Between>;

      collapseRepeats?: boolean;

      focus?: Array<Exploration.FocusUnionMember0 | Exploration.Outcome>;

      hiddenEvents?: Array<Exploration.HiddenEventsUnionMember0 | Exploration.UnionMember1>;

      pageKey?: 'path' | 'url';

      pathFilter?: Exploration.PathFilter;

      stepKinds?: Array<'event' | 'page'>;
    }

    export namespace Exploration {
      export interface Between {
        afterFrom: number;

        beforeTo: number;

        fromAnchorId: string;

        toAnchorId: string;
      }

      export interface FocusUnionMember0 {
        position: FocusUnionMember0.Position;

        matcher?: FocusUnionMember0.UnionMember0 | FocusUnionMember0.UnionMember1;
      }

      export namespace FocusUnionMember0 {
        export interface Position {
          anchorId: string;

          offset: number;

          side: 'anchor' | 'before' | 'after';
        }

        export interface UnionMember0 {
          eventName: string;

          kind: 'event';

          filter?: UnionMember0.Filter;
        }

        export namespace UnionMember0 {
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

        export interface UnionMember1 {
          kind: 'page';

          filter?: UnionMember1.Filter;
        }

        export namespace UnionMember1 {
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

      export interface Outcome {
        outcome: 'completed' | 'incomplete';
      }

      export interface HiddenEventsUnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: HiddenEventsUnionMember0.Filter;
      }

      export namespace HiddenEventsUnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

      export interface PathFilter {
        filter: PathFilter.UnionMember0 | PathFilter.UnionMember1 | PathFilter.UnionMember2;

        version: 1;
      }

      export namespace PathFilter {
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

    export interface Scope {
      excludeBots: boolean;

      sourceIds: Array<string>;

      sessionFilter?: Scope.SessionFilter;
    }

    export namespace Scope {
      export interface SessionFilter {
        filter: SessionFilter.UnionMember0 | SessionFilter.UnionMember1 | SessionFilter.UnionMember2;

        version: 1;
      }

      export namespace SessionFilter {
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

    export interface AnchorFilter {
      filter: AnchorFilter.UnionMember0 | AnchorFilter.UnionMember1 | AnchorFilter.UnionMember2;

      version: 1;
    }

    export namespace AnchorFilter {
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

    export interface Breakdown {
      atAnchorId: string;

      property: Breakdown.Property;

      limit?: number;
    }

    export namespace Breakdown {
      export interface Property {
        property: string;

        type: 'string' | 'number' | 'boolean';

        path?: Array<string>;
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

    export interface Exclusion {
      id: string;

      fromAnchorId: string;

      matcher: Exclusion.UnionMember0 | Exclusion.UnionMember1;

      toAnchorId: string;
    }

    export namespace Exclusion {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

    export interface HoldConstant {
      property: string;

      type: 'string' | 'number' | 'boolean';

      path?: Array<string>;
    }

    export interface NodeExpansion {
      matcher: NodeExpansion.UnionMember0 | NodeExpansion.UnionMember1;

      position: NodeExpansion.Position;

      property: NodeExpansion.Property;

      limit?: number;
    }

    export namespace NodeExpansion {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

      export interface Position {
        anchorId: string;

        offset: number;

        side: 'anchor' | 'before' | 'after';
      }

      export interface Property {
        property: string;

        type: 'string' | 'number' | 'boolean';

        path?: Array<string>;
      }
    }
  }

  export interface ReportContext {
    dateRange: ReportContext.DateRange;

    comparisons?: Array<ReportContext.Comparison>;
  }

  export namespace ReportContext {
    export interface DateRange {
      from: string;

      timeZone: string;

      to: string;
    }

    export interface Comparison {
      id: string;

      label: string;

      dateRange?: Comparison.DateRange;

      entryFilter?: Comparison.EntryFilter;

      sessionFilter?: Comparison.SessionFilter;
    }

    export namespace Comparison {
      export interface DateRange {
        from: string;

        timeZone: string;

        to: string;
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

      export interface SessionFilter {
        filter: SessionFilter.UnionMember0 | SessionFilter.UnionMember1 | SessionFilter.UnionMember2;

        version: 1;
      }

      export namespace SessionFilter {
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

  export interface View {
    showDropOff?: boolean;

    showElapsedTime?: boolean;

    topEventsPerPosition?: number;

    topPaths?: number;

    visualization?: 'sankey' | 'top-paths';
  }
}

export interface JourneyFlowUpdateParams {
  expectedRevision: string;

  definition?: JourneyFlowUpdateParams.Definition;

  description?: string | null;

  name?: string;

  reportContext?: JourneyFlowUpdateParams.ReportContext;

  view?: JourneyFlowUpdateParams.View;
}

export namespace JourneyFlowUpdateParams {
  export interface Definition {
    anchors: Array<Definition.Anchor>;

    exploration: Definition.Exploration;

    kind: 'journey-flow';

    scope: Definition.Scope;

    version: 1;

    anchorFilter?: Definition.AnchorFilter;

    breakdown?: Definition.Breakdown;

    contextWindowMs?: number;

    conversionWindowMs?: number;

    counting?: 'unique' | 'totals' | 'sessions';

    entryFilter?: Definition.EntryFilter;

    exclusions?: Array<Definition.Exclusion>;

    holdConstant?: Array<Definition.HoldConstant>;

    nodeExpansions?: Array<Definition.NodeExpansion>;

    reentry?: 'first' | 'best';
  }

  export namespace Definition {
    export interface Anchor {
      id: string;

      alternatives: Array<Anchor.UnionMember0 | Anchor.UnionMember1>;

      filter?: Anchor.Filter;

      label?: string;
    }

    export namespace Anchor {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

    export interface Exploration {
      after?: number;

      before?: number;

      between?: Array<Exploration.Between>;

      collapseRepeats?: boolean;

      focus?: Array<Exploration.FocusUnionMember0 | Exploration.Outcome>;

      hiddenEvents?: Array<Exploration.HiddenEventsUnionMember0 | Exploration.UnionMember1>;

      pageKey?: 'path' | 'url';

      pathFilter?: Exploration.PathFilter;

      stepKinds?: Array<'event' | 'page'>;
    }

    export namespace Exploration {
      export interface Between {
        afterFrom: number;

        beforeTo: number;

        fromAnchorId: string;

        toAnchorId: string;
      }

      export interface FocusUnionMember0 {
        position: FocusUnionMember0.Position;

        matcher?: FocusUnionMember0.UnionMember0 | FocusUnionMember0.UnionMember1;
      }

      export namespace FocusUnionMember0 {
        export interface Position {
          anchorId: string;

          offset: number;

          side: 'anchor' | 'before' | 'after';
        }

        export interface UnionMember0 {
          eventName: string;

          kind: 'event';

          filter?: UnionMember0.Filter;
        }

        export namespace UnionMember0 {
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

        export interface UnionMember1 {
          kind: 'page';

          filter?: UnionMember1.Filter;
        }

        export namespace UnionMember1 {
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

      export interface Outcome {
        outcome: 'completed' | 'incomplete';
      }

      export interface HiddenEventsUnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: HiddenEventsUnionMember0.Filter;
      }

      export namespace HiddenEventsUnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

      export interface PathFilter {
        filter: PathFilter.UnionMember0 | PathFilter.UnionMember1 | PathFilter.UnionMember2;

        version: 1;
      }

      export namespace PathFilter {
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

    export interface Scope {
      excludeBots: boolean;

      sourceIds: Array<string>;

      sessionFilter?: Scope.SessionFilter;
    }

    export namespace Scope {
      export interface SessionFilter {
        filter: SessionFilter.UnionMember0 | SessionFilter.UnionMember1 | SessionFilter.UnionMember2;

        version: 1;
      }

      export namespace SessionFilter {
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

    export interface AnchorFilter {
      filter: AnchorFilter.UnionMember0 | AnchorFilter.UnionMember1 | AnchorFilter.UnionMember2;

      version: 1;
    }

    export namespace AnchorFilter {
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

    export interface Breakdown {
      atAnchorId: string;

      property: Breakdown.Property;

      limit?: number;
    }

    export namespace Breakdown {
      export interface Property {
        property: string;

        type: 'string' | 'number' | 'boolean';

        path?: Array<string>;
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

    export interface Exclusion {
      id: string;

      fromAnchorId: string;

      matcher: Exclusion.UnionMember0 | Exclusion.UnionMember1;

      toAnchorId: string;
    }

    export namespace Exclusion {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

    export interface HoldConstant {
      property: string;

      type: 'string' | 'number' | 'boolean';

      path?: Array<string>;
    }

    export interface NodeExpansion {
      matcher: NodeExpansion.UnionMember0 | NodeExpansion.UnionMember1;

      position: NodeExpansion.Position;

      property: NodeExpansion.Property;

      limit?: number;
    }

    export namespace NodeExpansion {
      export interface UnionMember0 {
        eventName: string;

        kind: 'event';

        filter?: UnionMember0.Filter;
      }

      export namespace UnionMember0 {
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

      export interface UnionMember1 {
        kind: 'page';

        filter?: UnionMember1.Filter;
      }

      export namespace UnionMember1 {
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

      export interface Position {
        anchorId: string;

        offset: number;

        side: 'anchor' | 'before' | 'after';
      }

      export interface Property {
        property: string;

        type: 'string' | 'number' | 'boolean';

        path?: Array<string>;
      }
    }
  }

  export interface ReportContext {
    dateRange: ReportContext.DateRange;

    comparisons?: Array<ReportContext.Comparison>;
  }

  export namespace ReportContext {
    export interface DateRange {
      from: string;

      timeZone: string;

      to: string;
    }

    export interface Comparison {
      id: string;

      label: string;

      dateRange?: Comparison.DateRange;

      entryFilter?: Comparison.EntryFilter;

      sessionFilter?: Comparison.SessionFilter;
    }

    export namespace Comparison {
      export interface DateRange {
        from: string;

        timeZone: string;

        to: string;
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

      export interface SessionFilter {
        filter: SessionFilter.UnionMember0 | SessionFilter.UnionMember1 | SessionFilter.UnionMember2;

        version: 1;
      }

      export namespace SessionFilter {
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

  export interface View {
    showDropOff?: boolean;

    showElapsedTime?: boolean;

    topEventsPerPosition?: number;

    topPaths?: number;

    visualization?: 'sankey' | 'top-paths';
  }
}

export interface JourneyFlowDeleteParams {
  expectedRevision: string;
}

export interface JourneyFlowResultsParams {
  expectedRevision: string;

  refresh?: boolean;

  /**
   * Optional JSON-encoded complete report context override.
   */
  reportContextOverride?: string;
}

export interface JourneyFlowExportParams {
  expectedRevision: string;

  refresh?: boolean;

  /**
   * Optional JSON-encoded complete report context override.
   */
  reportContextOverride?: string;
}

export interface JourneyFlowPreviewParams {
  /**
   * JSON-encoded Journey Flow preview input. Use GraphQL when this exceeds the URL
   * budget.
   */
  input: string;
}

export declare namespace JourneyFlows {
  export {
    type JourneyFlowListResponse as JourneyFlowListResponse,
    type JourneyFlowCreateResponse as JourneyFlowCreateResponse,
    type JourneyFlowRetrieveResponse as JourneyFlowRetrieveResponse,
    type JourneyFlowUpdateResponse as JourneyFlowUpdateResponse,
    type JourneyFlowDeleteResponse as JourneyFlowDeleteResponse,
    type JourneyFlowCapabilitiesResponse as JourneyFlowCapabilitiesResponse,
    type JourneyFlowResultsResponse as JourneyFlowResultsResponse,
    type JourneyFlowExportResponse as JourneyFlowExportResponse,
    type JourneyFlowPreviewResponse as JourneyFlowPreviewResponse,
    type JourneyFlowListResponsesCursor as JourneyFlowListResponsesCursor,
    type JourneyFlowListParams as JourneyFlowListParams,
    type JourneyFlowCreateParams as JourneyFlowCreateParams,
    type JourneyFlowUpdateParams as JourneyFlowUpdateParams,
    type JourneyFlowDeleteParams as JourneyFlowDeleteParams,
    type JourneyFlowResultsParams as JourneyFlowResultsParams,
    type JourneyFlowExportParams as JourneyFlowExportParams,
    type JourneyFlowPreviewParams as JourneyFlowPreviewParams,
  };
}
