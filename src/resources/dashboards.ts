// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Dashboards extends APIResource {
  /**
   * List Dashboards in stable ID order with case-insensitive name search. Defaults
   * to 20 results; each request scans at most 100 configurations. Search and
   * unavailable or deleted entries can yield short pages. Continue with
   * pagination.nextCursor while hasMore is true and preserve unavailableCount and
   * warnings. Requires Analytics Suite access. Requires API-key scope or current
   * OAuth user permission: web-analytics:view
   */
  list(
    query: DashboardListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DashboardListResponsesCursor, DashboardListResponse> {
    return this._client.getAPIList('/rest/v1/dashboards', Cursor<DashboardListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Save a Dashboard with shared dates, an optional filter, and up to 12 ordered
   * report, text, or session replay tiles. Requires Analytics Suite access.
   * Referenced reports require web-analytics:view; Insight references also require
   * variables:find-custom, and Journeys selecting sources require source:view.
   * Requires API-key scope or current OAuth user permission: web-analytics:write
   */
  create(body: DashboardCreateParams, options?: RequestOptions): APIPromise<DashboardCreateResponse> {
    return this._client.post('/rest/v1/dashboards', { body, ...options });
  }

  /**
   * Get a saved Dashboard including its revision, shared date context, filter, and
   * ordered report, text, and session replay tiles. Requires Analytics Suite access;
   * unavailable Dashboards return 404. Requires API-key scope or current OAuth user
   * permission: web-analytics:view
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<DashboardRetrieveResponse> {
    return this._client.get(path`/rest/v1/dashboards/${id}`, options);
  }

  /**
   * Update a Dashboard using expectedRevision. Omitted fields remain unchanged; null
   * clears description or filter. Supplied reportContext and ordered tiles replace
   * the entire saved value. Requires Analytics Suite access. Changed report
   * references or context require web-analytics:view; Insights also require
   * variables:find-custom, and Journeys selecting sources require source:view.
   * Requires API-key scope or current OAuth user permission: web-analytics:write
   */
  update(
    id: string,
    body: DashboardUpdateParams,
    options?: RequestOptions,
  ): APIPromise<DashboardUpdateResponse> {
    return this._client.patch(path`/rest/v1/dashboards/${id}`, { body, ...options });
  }

  /**
   * Delete a Dashboard using expectedRevision. Referenced reports are preserved.
   * Requires Analytics Suite access. Requires API-key scope or current OAuth user
   * permission: web-analytics:write
   */
  delete(
    id: string,
    params: DashboardDeleteParams,
    options?: RequestOptions,
  ): APIPromise<DashboardDeleteResponse> {
    const { expectedRevision } = params;
    return this._client.delete(path`/rest/v1/dashboards/${id}`, { query: { expectedRevision }, ...options });
  }

  /**
   * Duplicate a Dashboard using the expectedRevision in the request body. Copies
   * dates, filter, and layout, assigns new Dashboard and tile IDs, and retains saved
   * report references. Requires Analytics Suite access and web-analytics:view on the
   * source and referenced reports; Insights also require variables:find-custom, and
   * Journeys selecting sources require source:view. Requires API-key scope or
   * current OAuth user permission: web-analytics:write, web-analytics:view
   */
  duplicate(
    id: string,
    body: DashboardDuplicateParams,
    options?: RequestOptions,
  ): APIPromise<DashboardDuplicateResponse> {
    return this._client.post(path`/rest/v1/dashboards/${id}/duplicate`, { body, ...options });
  }

  /**
   * Preview a saved report with temporary Dashboard context. JSON-encode input as
   * {tileId,report:{kind,id},context:{from,to,filter?},comparison?}; kinds are
   * insight, funnel, or journey, dates are inclusive UTC calendar strings, and
   * comparison applies to Insights. Maximum 16384 bytes before URL encoding.
   * Requires Analytics Suite access and report read access; Insights also require
   * variables:find-custom, and Journeys selecting sources require source:view.
   * Requires API-key scope or current OAuth user permission: web-analytics:view
   */
  preview(query: DashboardPreviewParams, options?: RequestOptions): APIPromise<DashboardPreviewResponse> {
    return this._client.get('/rest/v1/dashboards/preview', { query, ...options });
  }

  /**
   * Compute one saved Dashboard report tile using tileId and expectedRevision.
   * JSON-encode context as {from,to,filter?} with inclusive UTC calendar dates;
   * optional JSON comparison applies to Insights. Query context never changes saved
   * defaults. Text tiles need no result, and replay tiles use GET
   * /rest/v1/dashboards/{id}/replay-tile-result; other tile kinds return 400.
   * Requires Analytics Suite access and report read access; Insights also require
   * variables:find-custom, and Journeys selecting sources require source:view.
   * Requires API-key scope or current OAuth user permission: web-analytics:view
   */
  results(
    id: string,
    query: DashboardResultsParams,
    options?: RequestOptions,
  ): APIPromise<DashboardResultsResponse> {
    return this._client.get(path`/rest/v1/dashboards/${id}/tile-result`, { query, ...options });
  }

  /**
   * List the most recent session replays for one saved Dashboard replay tile using
   * tileId and expectedRevision. JSON-encode context as {from,to,filter?}; the
   * context filter is ANDed with the tile filter, eventName, and pathname. Dates
   * beyond the organization replay retention are excluded and the window covers at
   * most the most recent 61 days; the response returns the effective window and
   * warnings. Requires Analytics Suite access, like the Session Replay list;
   * unavailable Dashboards and tiles return 404. Report tiles return 400. Requires
   * API-key scope or current OAuth user permission: web-analytics:view
   */
  replayTileResult(
    id: string,
    query: DashboardReplayTileResultParams,
    options?: RequestOptions,
  ): APIPromise<DashboardReplayTileResultResponse> {
    return this._client.get(path`/rest/v1/dashboards/${id}/replay-tile-result`, { query, ...options });
  }

  /**
   * Preview a Dashboard replay tile before saving it. JSON-encode input as
   * {tileId,replays:{limit,title?,eventName?,pathname?,filter?},context:{from,to,filter?}};
   * limit is 5-25 and dates are inclusive UTC calendar strings. Maximum 16384 bytes
   * before URL encoding. Applies the same retention, 61-day window, filter
   * composition, and Analytics Suite access as saved replay tiles. Requires API-key
   * scope or current OAuth user permission: web-analytics:view
   */
  replayPreview(
    query: DashboardReplayPreviewParams,
    options?: RequestOptions,
  ): APIPromise<DashboardReplayPreviewResponse> {
    return this._client.get('/rest/v1/dashboards/replay-preview', { query, ...options });
  }
}

export type DashboardListResponsesCursor = Cursor<DashboardListResponse>;

export interface DashboardListResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  /**
   * Display name for the saved Dashboard.
   */
  name: string;

  /**
   * Complete UTC date context. Replaces the saved context on PATCH. Funnel and
   * Journey tiles support up to 91 inclusive days; Insights retain their native
   * range limit.
   */
  reportContext: DashboardListResponse.ReportContext;

  revision: string;

  /**
   * Ordered collection of up to 12 tiles; every kind counts toward the limit. Each
   * tile has id, layout { width 3-12, height }, and exactly one of report { kind:
   * insight|funnel|journey, id }, text { markdown } (at most 10000 characters per
   * tile and 20000 per Dashboard; height 80-960), or replays { title?, eventName?,
   * pathname?, filter?, limit 5-25 } (height 240-960, like report tiles). Replaces
   * the collection on PATCH; removing a tile does not delete its report. Referenced
   * reports require web-analytics:view; Insights also require variables:find-custom
   * and Journeys with selected sources require source:view. Replay tile results
   * require web-analytics:view, like the Session Replay list.
   */
  tiles: Array<
    | DashboardListResponse.UnionMember0
    | DashboardListResponse.UnionMember1
    | DashboardListResponse.UnionMember2
  >;

  updatedAt: string;

  updatedByUserId: string;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;

  /**
   * Shared analytics filter, combined with Insight report filters or Funnel and
   * Journey entry filters. Null clears it; report-specific filters remain in effect.
   */
  filter?: DashboardListResponse.Filter;
}

export namespace DashboardListResponse {
  /**
   * Complete UTC date context. Replaces the saved context on PATCH. Funnel and
   * Journey tiles support up to 91 inclusive days; Insights retain their native
   * range limit.
   */
  export interface ReportContext {
    dateRange: ReportContext.UnionMember0 | ReportContext.UnionMember1;
  }

  export namespace ReportContext {
    export interface UnionMember0 {
      from: string;

      to: string;

      timeZone?: 'UTC';
    }

    export interface UnionMember1 {
      preset:
        | 'today'
        | 'yesterday'
        | 'last_7_days'
        | 'last_30_days'
        | 'last_90_days'
        | 'last_12_months'
        | 'week_to_date'
        | 'month_to_date'
        | 'year_to_date';

      timeZone?: 'UTC';
    }
  }

  export interface UnionMember0 {
    id: string;

    layout: UnionMember0.Layout;

    report: UnionMember0.Report;
  }

  export namespace UnionMember0 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Report {
      id: string;

      kind: 'insight' | 'funnel' | 'journey';
    }
  }

  export interface UnionMember1 {
    id: string;

    layout: UnionMember1.Layout;

    text: UnionMember1.Text;
  }

  export namespace UnionMember1 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Text {
      markdown: string;
    }
  }

  export interface UnionMember2 {
    id: string;

    layout: UnionMember2.Layout;

    replays: UnionMember2.Replays;
  }

  export namespace UnionMember2 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Replays {
      limit: number;

      eventName?: string;

      filter?: Replays.Filter;

      pathname?: string;

      title?: string;
    }

    export namespace Replays {
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

  /**
   * Shared analytics filter, combined with Insight report filters or Funnel and
   * Journey entry filters. Null clears it; report-specific filters remain in effect.
   */
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

export interface DashboardCreateResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  /**
   * Display name for the saved Dashboard.
   */
  name: string;

  /**
   * Complete UTC date context. Replaces the saved context on PATCH. Funnel and
   * Journey tiles support up to 91 inclusive days; Insights retain their native
   * range limit.
   */
  reportContext: DashboardCreateResponse.ReportContext;

  revision: string;

  /**
   * Ordered collection of up to 12 tiles; every kind counts toward the limit. Each
   * tile has id, layout { width 3-12, height }, and exactly one of report { kind:
   * insight|funnel|journey, id }, text { markdown } (at most 10000 characters per
   * tile and 20000 per Dashboard; height 80-960), or replays { title?, eventName?,
   * pathname?, filter?, limit 5-25 } (height 240-960, like report tiles). Replaces
   * the collection on PATCH; removing a tile does not delete its report. Referenced
   * reports require web-analytics:view; Insights also require variables:find-custom
   * and Journeys with selected sources require source:view. Replay tile results
   * require web-analytics:view, like the Session Replay list.
   */
  tiles: Array<
    | DashboardCreateResponse.UnionMember0
    | DashboardCreateResponse.UnionMember1
    | DashboardCreateResponse.UnionMember2
  >;

  updatedAt: string;

  updatedByUserId: string;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;

  /**
   * Shared analytics filter, combined with Insight report filters or Funnel and
   * Journey entry filters. Null clears it; report-specific filters remain in effect.
   */
  filter?: DashboardCreateResponse.Filter;
}

export namespace DashboardCreateResponse {
  /**
   * Complete UTC date context. Replaces the saved context on PATCH. Funnel and
   * Journey tiles support up to 91 inclusive days; Insights retain their native
   * range limit.
   */
  export interface ReportContext {
    dateRange: ReportContext.UnionMember0 | ReportContext.UnionMember1;
  }

  export namespace ReportContext {
    export interface UnionMember0 {
      from: string;

      to: string;

      timeZone?: 'UTC';
    }

    export interface UnionMember1 {
      preset:
        | 'today'
        | 'yesterday'
        | 'last_7_days'
        | 'last_30_days'
        | 'last_90_days'
        | 'last_12_months'
        | 'week_to_date'
        | 'month_to_date'
        | 'year_to_date';

      timeZone?: 'UTC';
    }
  }

  export interface UnionMember0 {
    id: string;

    layout: UnionMember0.Layout;

    report: UnionMember0.Report;
  }

  export namespace UnionMember0 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Report {
      id: string;

      kind: 'insight' | 'funnel' | 'journey';
    }
  }

  export interface UnionMember1 {
    id: string;

    layout: UnionMember1.Layout;

    text: UnionMember1.Text;
  }

  export namespace UnionMember1 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Text {
      markdown: string;
    }
  }

  export interface UnionMember2 {
    id: string;

    layout: UnionMember2.Layout;

    replays: UnionMember2.Replays;
  }

  export namespace UnionMember2 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Replays {
      limit: number;

      eventName?: string;

      filter?: Replays.Filter;

      pathname?: string;

      title?: string;
    }

    export namespace Replays {
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

  /**
   * Shared analytics filter, combined with Insight report filters or Funnel and
   * Journey entry filters. Null clears it; report-specific filters remain in effect.
   */
  export interface Filter {
    filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

    version: 1;
  }

  export namespace Filter {
    export interface UnionMember0 {
      children: Array<UnionMember0.UnionMember0 | UnionMember0.UnionMember1 | UnionMember0.UnionMember2>;

      kind: 'and' | 'or';
    }

    export namespace UnionMember0 {
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

    export interface UnionMember1 {
      child: UnionMember1.UnionMember0 | UnionMember1.UnionMember1 | UnionMember1.UnionMember2;

      kind: 'not';
    }

    export namespace UnionMember1 {
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

export interface DashboardRetrieveResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  /**
   * Display name for the saved Dashboard.
   */
  name: string;

  /**
   * Complete UTC date context. Replaces the saved context on PATCH. Funnel and
   * Journey tiles support up to 91 inclusive days; Insights retain their native
   * range limit.
   */
  reportContext: DashboardRetrieveResponse.ReportContext;

  revision: string;

  /**
   * Ordered collection of up to 12 tiles; every kind counts toward the limit. Each
   * tile has id, layout { width 3-12, height }, and exactly one of report { kind:
   * insight|funnel|journey, id }, text { markdown } (at most 10000 characters per
   * tile and 20000 per Dashboard; height 80-960), or replays { title?, eventName?,
   * pathname?, filter?, limit 5-25 } (height 240-960, like report tiles). Replaces
   * the collection on PATCH; removing a tile does not delete its report. Referenced
   * reports require web-analytics:view; Insights also require variables:find-custom
   * and Journeys with selected sources require source:view. Replay tile results
   * require web-analytics:view, like the Session Replay list.
   */
  tiles: Array<
    | DashboardRetrieveResponse.UnionMember0
    | DashboardRetrieveResponse.UnionMember1
    | DashboardRetrieveResponse.UnionMember2
  >;

  updatedAt: string;

  updatedByUserId: string;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;

  /**
   * Shared analytics filter, combined with Insight report filters or Funnel and
   * Journey entry filters. Null clears it; report-specific filters remain in effect.
   */
  filter?: DashboardRetrieveResponse.Filter;
}

export namespace DashboardRetrieveResponse {
  /**
   * Complete UTC date context. Replaces the saved context on PATCH. Funnel and
   * Journey tiles support up to 91 inclusive days; Insights retain their native
   * range limit.
   */
  export interface ReportContext {
    dateRange: ReportContext.UnionMember0 | ReportContext.UnionMember1;
  }

  export namespace ReportContext {
    export interface UnionMember0 {
      from: string;

      to: string;

      timeZone?: 'UTC';
    }

    export interface UnionMember1 {
      preset:
        | 'today'
        | 'yesterday'
        | 'last_7_days'
        | 'last_30_days'
        | 'last_90_days'
        | 'last_12_months'
        | 'week_to_date'
        | 'month_to_date'
        | 'year_to_date';

      timeZone?: 'UTC';
    }
  }

  export interface UnionMember0 {
    id: string;

    layout: UnionMember0.Layout;

    report: UnionMember0.Report;
  }

  export namespace UnionMember0 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Report {
      id: string;

      kind: 'insight' | 'funnel' | 'journey';
    }
  }

  export interface UnionMember1 {
    id: string;

    layout: UnionMember1.Layout;

    text: UnionMember1.Text;
  }

  export namespace UnionMember1 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Text {
      markdown: string;
    }
  }

  export interface UnionMember2 {
    id: string;

    layout: UnionMember2.Layout;

    replays: UnionMember2.Replays;
  }

  export namespace UnionMember2 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Replays {
      limit: number;

      eventName?: string;

      filter?: Replays.Filter;

      pathname?: string;

      title?: string;
    }

    export namespace Replays {
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

  /**
   * Shared analytics filter, combined with Insight report filters or Funnel and
   * Journey entry filters. Null clears it; report-specific filters remain in effect.
   */
  export interface Filter {
    filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

    version: 1;
  }

  export namespace Filter {
    export interface UnionMember0 {
      children: Array<UnionMember0.UnionMember0 | UnionMember0.UnionMember1 | UnionMember0.UnionMember2>;

      kind: 'and' | 'or';
    }

    export namespace UnionMember0 {
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

    export interface UnionMember1 {
      child: UnionMember1.UnionMember0 | UnionMember1.UnionMember1 | UnionMember1.UnionMember2;

      kind: 'not';
    }

    export namespace UnionMember1 {
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

export interface DashboardUpdateResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  /**
   * Display name for the saved Dashboard.
   */
  name: string;

  /**
   * Complete UTC date context. Replaces the saved context on PATCH. Funnel and
   * Journey tiles support up to 91 inclusive days; Insights retain their native
   * range limit.
   */
  reportContext: DashboardUpdateResponse.ReportContext;

  revision: string;

  /**
   * Ordered collection of up to 12 tiles; every kind counts toward the limit. Each
   * tile has id, layout { width 3-12, height }, and exactly one of report { kind:
   * insight|funnel|journey, id }, text { markdown } (at most 10000 characters per
   * tile and 20000 per Dashboard; height 80-960), or replays { title?, eventName?,
   * pathname?, filter?, limit 5-25 } (height 240-960, like report tiles). Replaces
   * the collection on PATCH; removing a tile does not delete its report. Referenced
   * reports require web-analytics:view; Insights also require variables:find-custom
   * and Journeys with selected sources require source:view. Replay tile results
   * require web-analytics:view, like the Session Replay list.
   */
  tiles: Array<
    | DashboardUpdateResponse.UnionMember0
    | DashboardUpdateResponse.UnionMember1
    | DashboardUpdateResponse.UnionMember2
  >;

  updatedAt: string;

  updatedByUserId: string;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;

  /**
   * Shared analytics filter, combined with Insight report filters or Funnel and
   * Journey entry filters. Null clears it; report-specific filters remain in effect.
   */
  filter?: DashboardUpdateResponse.Filter;
}

export namespace DashboardUpdateResponse {
  /**
   * Complete UTC date context. Replaces the saved context on PATCH. Funnel and
   * Journey tiles support up to 91 inclusive days; Insights retain their native
   * range limit.
   */
  export interface ReportContext {
    dateRange: ReportContext.UnionMember0 | ReportContext.UnionMember1;
  }

  export namespace ReportContext {
    export interface UnionMember0 {
      from: string;

      to: string;

      timeZone?: 'UTC';
    }

    export interface UnionMember1 {
      preset:
        | 'today'
        | 'yesterday'
        | 'last_7_days'
        | 'last_30_days'
        | 'last_90_days'
        | 'last_12_months'
        | 'week_to_date'
        | 'month_to_date'
        | 'year_to_date';

      timeZone?: 'UTC';
    }
  }

  export interface UnionMember0 {
    id: string;

    layout: UnionMember0.Layout;

    report: UnionMember0.Report;
  }

  export namespace UnionMember0 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Report {
      id: string;

      kind: 'insight' | 'funnel' | 'journey';
    }
  }

  export interface UnionMember1 {
    id: string;

    layout: UnionMember1.Layout;

    text: UnionMember1.Text;
  }

  export namespace UnionMember1 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Text {
      markdown: string;
    }
  }

  export interface UnionMember2 {
    id: string;

    layout: UnionMember2.Layout;

    replays: UnionMember2.Replays;
  }

  export namespace UnionMember2 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Replays {
      limit: number;

      eventName?: string;

      filter?: Replays.Filter;

      pathname?: string;

      title?: string;
    }

    export namespace Replays {
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

  /**
   * Shared analytics filter, combined with Insight report filters or Funnel and
   * Journey entry filters. Null clears it; report-specific filters remain in effect.
   */
  export interface Filter {
    filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

    version: 1;
  }

  export namespace Filter {
    export interface UnionMember0 {
      children: Array<UnionMember0.UnionMember0 | UnionMember0.UnionMember1 | UnionMember0.UnionMember2>;

      kind: 'and' | 'or';
    }

    export namespace UnionMember0 {
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

    export interface UnionMember1 {
      child: UnionMember1.UnionMember0 | UnionMember1.UnionMember1 | UnionMember1.UnionMember2;

      kind: 'not';
    }

    export namespace UnionMember1 {
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

export interface DashboardDeleteResponse {
  id: string;

  deleted: true;

  deletedRevision: string;
}

export interface DashboardDuplicateResponse {
  id: string;

  createdAt: string;

  createdByUserId: string;

  /**
   * Display name for the saved Dashboard.
   */
  name: string;

  /**
   * Complete UTC date context. Replaces the saved context on PATCH. Funnel and
   * Journey tiles support up to 91 inclusive days; Insights retain their native
   * range limit.
   */
  reportContext: DashboardDuplicateResponse.ReportContext;

  revision: string;

  /**
   * Ordered collection of up to 12 tiles; every kind counts toward the limit. Each
   * tile has id, layout { width 3-12, height }, and exactly one of report { kind:
   * insight|funnel|journey, id }, text { markdown } (at most 10000 characters per
   * tile and 20000 per Dashboard; height 80-960), or replays { title?, eventName?,
   * pathname?, filter?, limit 5-25 } (height 240-960, like report tiles). Replaces
   * the collection on PATCH; removing a tile does not delete its report. Referenced
   * reports require web-analytics:view; Insights also require variables:find-custom
   * and Journeys with selected sources require source:view. Replay tile results
   * require web-analytics:view, like the Session Replay list.
   */
  tiles: Array<
    | DashboardDuplicateResponse.UnionMember0
    | DashboardDuplicateResponse.UnionMember1
    | DashboardDuplicateResponse.UnionMember2
  >;

  updatedAt: string;

  updatedByUserId: string;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;

  /**
   * Shared analytics filter, combined with Insight report filters or Funnel and
   * Journey entry filters. Null clears it; report-specific filters remain in effect.
   */
  filter?: DashboardDuplicateResponse.Filter;
}

export namespace DashboardDuplicateResponse {
  /**
   * Complete UTC date context. Replaces the saved context on PATCH. Funnel and
   * Journey tiles support up to 91 inclusive days; Insights retain their native
   * range limit.
   */
  export interface ReportContext {
    dateRange: ReportContext.UnionMember0 | ReportContext.UnionMember1;
  }

  export namespace ReportContext {
    export interface UnionMember0 {
      from: string;

      to: string;

      timeZone?: 'UTC';
    }

    export interface UnionMember1 {
      preset:
        | 'today'
        | 'yesterday'
        | 'last_7_days'
        | 'last_30_days'
        | 'last_90_days'
        | 'last_12_months'
        | 'week_to_date'
        | 'month_to_date'
        | 'year_to_date';

      timeZone?: 'UTC';
    }
  }

  export interface UnionMember0 {
    id: string;

    layout: UnionMember0.Layout;

    report: UnionMember0.Report;
  }

  export namespace UnionMember0 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Report {
      id: string;

      kind: 'insight' | 'funnel' | 'journey';
    }
  }

  export interface UnionMember1 {
    id: string;

    layout: UnionMember1.Layout;

    text: UnionMember1.Text;
  }

  export namespace UnionMember1 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Text {
      markdown: string;
    }
  }

  export interface UnionMember2 {
    id: string;

    layout: UnionMember2.Layout;

    replays: UnionMember2.Replays;
  }

  export namespace UnionMember2 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Replays {
      limit: number;

      eventName?: string;

      filter?: Replays.Filter;

      pathname?: string;

      title?: string;
    }

    export namespace Replays {
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

  /**
   * Shared analytics filter, combined with Insight report filters or Funnel and
   * Journey entry filters. Null clears it; report-specific filters remain in effect.
   */
  export interface Filter {
    filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

    version: 1;
  }

  export namespace Filter {
    export interface UnionMember0 {
      children: Array<UnionMember0.UnionMember0 | UnionMember0.UnionMember1 | UnionMember0.UnionMember2>;

      kind: 'and' | 'or';
    }

    export namespace UnionMember0 {
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

    export interface UnionMember1 {
      child: UnionMember1.UnionMember0 | UnionMember1.UnionMember1 | UnionMember1.UnionMember2;

      kind: 'not';
    }

    export namespace UnionMember1 {
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

export type DashboardPreviewResponse =
  | DashboardPreviewResponse.UnionMember0
  | DashboardPreviewResponse.UnionMember1
  | DashboardPreviewResponse.UnionMember2;

export namespace DashboardPreviewResponse {
  export interface UnionMember0 {
    computedAt: string;

    kind: 'insight';

    report: UnionMember0.Report;

    result: UnionMember0.Result;

    /**
     * Tile identifier from get_dashboard, or a new unique tile identifier for a report
     * preview.
     */
    tileId: string;
  }

  export namespace UnionMember0 {
    export interface Report {
      id: string;

      createdAt: string;

      createdByUserId: string;

      /**
       * Version 1 Insight definition: one to ten metrics and a day, week, or month
       * interval. Sum and average require a numeric event property. Filters use the
       * analytics property catalog.
       */
      definition: Report.Definition;

      /**
       * Display name for the saved Insight.
       */
      name: string;

      /**
       * UTC date range using either a preset or inclusive from/to calendar dates, up to
       * 366 days.
       */
      reportContext: Report.ReportContext;

      revision: string;

      updatedAt: string;

      updatedByUserId: string;

      /**
       * Complete chart settings. Replaces the saved view when supplied on PATCH; omitted
       * view fields reset to their defaults.
       */
      view: Report.View;

      /**
       * Optional description; null clears it.
       */
      description?: string | null;
    }

    export namespace Report {
      /**
       * Version 1 Insight definition: one to ten metrics and a day, week, or month
       * interval. Sum and average require a numeric event property. Filters use the
       * analytics property catalog.
       */
      export interface Definition {
        interval: 'day' | 'week' | 'month';

        kind: 'insight';

        metrics: Array<Definition.Metric>;

        version: 1;

        filter?: Definition.Filter;
      }

      export namespace Definition {
        export interface Metric {
          id: string;

          aggregation: 'event_count' | 'unique_visitors' | 'sum' | 'average';

          eventNames: Array<string>;

          name: string;

          filter?: Metric.Filter;

          property?: Metric.Property;
        }

        export namespace Metric {
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

          export interface Property {
            path: Array<string>;

            property: 'event.properties';

            type?: 'number';
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

      /**
       * UTC date range using either a preset or inclusive from/to calendar dates, up to
       * 366 days.
       */
      export interface ReportContext {
        dateRange: ReportContext.UnionMember0 | ReportContext.UnionMember1;
      }

      export namespace ReportContext {
        export interface UnionMember0 {
          from: string;

          to: string;

          timeZone?: 'UTC';
        }

        export interface UnionMember1 {
          preset:
            | 'today'
            | 'yesterday'
            | 'last_7_days'
            | 'last_30_days'
            | 'last_90_days'
            | 'last_12_months'
            | 'week_to_date'
            | 'month_to_date'
            | 'year_to_date';

          timeZone?: 'UTC';
        }
      }

      /**
       * Complete chart settings. Replaces the saved view when supplied on PATCH; omitted
       * view fields reset to their defaults.
       */
      export interface View {
        cumulative?: boolean;

        series?: Array<View.Series>;

        smoothing?: 'none' | 'rolling_average';

        smoothingWindow?: number;

        stacked?: boolean;

        tableSort?: View.TableSort;

        visualization?: 'line' | 'column' | 'bar' | 'pie' | 'table' | 'metric';

        yAxisScale?: 'linear' | 'log';
      }

      export namespace View {
        export interface Series {
          metricId: string;

          color?: string;

          hidden?: boolean;
        }

        export interface TableSort {
          column: 'label' | 'range_value' | 'average';

          direction: 'asc' | 'desc';
        }
      }
    }

    export interface Result {
      engine: 'clickhouse';

      /**
       * Saved report identifier; null for previews.
       */
      reportId: string | null;

      /**
       * Saved report revision; null for previews.
       */
      revision: string | null;

      scope: Result.Scope;

      semanticVersion: 1;

      series: Array<Result.Series>;

      sourceLimitations: Array<string>;

      sourcePolicy: string;

      sourceRevision?: string | null;
    }

    export namespace Result {
      export interface Scope {
        cumulative: boolean;

        executedAt: string;

        from: string;

        interval: 'day' | 'week' | 'month';

        sourceCompleteness: 'unknown';

        timeZone: 'UTC';

        to: string;

        comparison?: Scope.Comparison | null;
      }

      export namespace Scope {
        export interface Comparison {
          from: string;

          kind: 'previous_period' | 'previous_year' | 'custom';

          to: string;
        }
      }

      export interface Series {
        aggregation: 'event_count' | 'unique_visitors' | 'sum' | 'average';

        breakdownValues: Array<Series.BreakdownValue>;

        comparison: 'previous_period' | 'previous_year' | 'custom' | null;

        key: string;

        label: string;

        metricId: string;

        points: Array<Series.Point>;

        rangeValue: number | null;
      }

      export namespace Series {
        export interface BreakdownValue {
          property: string;

          value: string | null;
        }

        export interface Point {
          bucketEnd: string;

          bucketStart: string;

          cumulative: number | null;

          isPartial: boolean;

          raw: number | null;

          smoothed: number | null;
        }
      }
    }
  }

  export interface UnionMember1 {
    computedAt: string;

    kind: 'funnel';

    /**
     * Funnel configuration details.
     */
    report: UnionMember1.Report;

    result: UnionMember1.Result;

    /**
     * Tile identifier from get_dashboard, or a new unique tile identifier for a report
     * preview.
     */
    tileId: string;
  }

  export namespace UnionMember1 {
    /**
     * Funnel configuration details.
     */
    export interface Report {
      createdAt: string;

      funnelId: string;

      name: string;

      /**
       * Versioned funnel definition with typed steps and filters.
       */
      queryDefinition: Report.QueryDefinition;

      status: 'READY' | 'PROCESSING';

      updatedAt: string;

      /**
       * Optional description; null clears it.
       */
      description?: string | null;

      reportDateRange?: Report.ReportDateRange | null;

      watched?: boolean | null;
    }

    export namespace Report {
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

    export interface Result {
      definitionUpdatedAt: string;

      engine: string;

      /**
       * Ratio of last-step to first-step volume as a percentage. Event-counting ratios
       * may exceed 100%.
       */
      overallConversionRate: number;

      scope: Result.Scope;

      semanticVersion: 1;

      /**
       * Data quality limitations affecting these results. Source completeness and
       * conflicting event corrections may be unverified.
       */
      sourceLimitations: Array<
        | 'equal-load-conflicts-unverified'
        | 'cross-key-corrections-unverified'
        | 'source-completeness-unverified'
      >;

      sourcePolicy: 'events-v3-physical-key';

      /**
       * Per-step funnel analytics, ordered by step number.
       */
      steps: Array<Result.Step>;

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

    export namespace Result {
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
  }

  export interface UnionMember2 {
    computedAt: string;

    kind: 'journey';

    report: UnionMember2.Report;

    result: UnionMember2.Result;

    /**
     * Tile identifier from get_dashboard, or a new unique tile identifier for a report
     * preview.
     */
    tileId: string;
  }

  export namespace UnionMember2 {
    export interface Report {
      id: string;

      createdAt: string;

      createdByUserId: string;

      /**
       * Version 1 Journey Flow definition with anchors, event or page matchers,
       * counting, scope, and exploration settings. Selecting specific sourceIds also
       * requires source:view permission.
       */
      definition: Report.Definition;

      name: string;

      /**
       * Complete UTC date range and comparisons for this Journey Flow.
       */
      reportContext: Report.ReportContext;

      revision: string;

      updatedAt: string;

      updatedByUserId: string;

      /**
       * Complete visualization settings. Supplied view replaces the saved value on
       * PATCH.
       */
      view: Report.View;

      /**
       * Optional description; null clears it.
       */
      description?: string | null;
    }

    export namespace Report {
      /**
       * Version 1 Journey Flow definition with anchors, event or page matchers,
       * counting, scope, and exploration settings. Selecting specific sourceIds also
       * requires source:view permission.
       */
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

      /**
       * Complete UTC date range and comparisons for this Journey Flow.
       */
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

      /**
       * Complete visualization settings. Supplied view replaces the saved value on
       * PATCH.
       */
      export interface View {
        showDropOff?: boolean;

        showElapsedTime?: boolean;

        topEventsPerPosition?: number;

        topPaths?: number;

        visualization?: 'sankey' | 'top-paths';
      }
    }

    export interface Result {
      definitionHash: string;

      effectiveContext: Result.EffectiveContext;

      engine: string;

      execution: Result.Execution;

      limits: Result.Limits;

      observation: Result.Observation;

      samples: Result.Samples;

      semanticVersion: string;

      series: Array<Result.Series>;

      timing: Array<Result.Timing>;

      definitionRevision?: string | null;
    }

    export namespace Result {
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

          dateRange?: Comparison.DateRange | null;

          entryFilter?: Comparison.EntryFilter | null;

          sessionFilter?: Comparison.SessionFilter | null;
        }

        export namespace Comparison {
          export interface DateRange {
            from: string;

            timeZone: string;

            to: string;
          }

          export interface EntryFilter {
            filter: EntryFilter.Filter;

            version: number;
          }

          export namespace EntryFilter {
            export interface Filter {
              kind: 'AND' | 'OR' | 'NOT' | 'PREDICATE';

              child?: Filter.Child | null;

              children?: Array<Filter.Child> | null;

              predicate?: Filter.Predicate | null;
            }

            export namespace Filter {
              export interface Child {
                kind: 'AND' | 'OR' | 'NOT' | 'PREDICATE';
              }

              export interface Child {
                kind: 'AND' | 'OR' | 'NOT' | 'PREDICATE';
              }

              export interface Predicate {
                operator:
                  | 'EQ'
                  | 'NEQ'
                  | 'GT'
                  | 'GTE'
                  | 'LT'
                  | 'LTE'
                  | 'CONTAINS'
                  | 'NOT_CONTAINS'
                  | 'CONTAINS_CI'
                  | 'NOT_CONTAINS_CI'
                  | 'STARTS_WITH'
                  | 'ENDS_WITH'
                  | 'IN'
                  | 'NOT_IN'
                  | 'EXISTS'
                  | 'MISSING'
                  | 'IS_NULL';

                property: string;

                path?: Array<string> | null;

                type?: 'STRING' | 'NUMBER' | 'BOOLEAN' | null;

                value?: Predicate.Value | null;
              }

              export namespace Predicate {
                export interface Value {
                  booleanValue?: boolean | null;

                  booleanValues?: Array<boolean> | null;

                  numberValue?: number | null;

                  numberValues?: Array<number> | null;

                  stringValue?: string | null;

                  stringValues?: Array<string> | null;
                }
              }
            }
          }

          export interface SessionFilter {
            filter: SessionFilter.Filter;

            version: number;
          }

          export namespace SessionFilter {
            export interface Filter {
              kind: 'AND' | 'OR' | 'NOT' | 'PREDICATE';

              child?: Filter.Child | null;

              children?: Array<Filter.Child> | null;

              predicate?: Filter.Predicate | null;
            }

            export namespace Filter {
              export interface Child {
                kind: 'AND' | 'OR' | 'NOT' | 'PREDICATE';
              }

              export interface Child {
                kind: 'AND' | 'OR' | 'NOT' | 'PREDICATE';
              }

              export interface Predicate {
                operator:
                  | 'EQ'
                  | 'NEQ'
                  | 'GT'
                  | 'GTE'
                  | 'LT'
                  | 'LTE'
                  | 'CONTAINS'
                  | 'NOT_CONTAINS'
                  | 'CONTAINS_CI'
                  | 'NOT_CONTAINS_CI'
                  | 'STARTS_WITH'
                  | 'ENDS_WITH'
                  | 'IN'
                  | 'NOT_IN'
                  | 'EXISTS'
                  | 'MISSING'
                  | 'IS_NULL';

                property: string;

                path?: Array<string> | null;

                type?: 'STRING' | 'NUMBER' | 'BOOLEAN' | null;

                value?: Predicate.Value | null;
              }

              export namespace Predicate {
                export interface Value {
                  booleanValue?: boolean | null;

                  booleanValues?: Array<boolean> | null;

                  numberValue?: number | null;

                  numberValues?: Array<number> | null;

                  stringValue?: string | null;

                  stringValues?: Array<string> | null;
                }
              }
            }
          }
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

            shareOfNext?: Edge.ShareOfNext | null;
          }

          export namespace Edge {
            export interface ShareOfPrevious {
              denominator: string;

              numerator: string;

              value?: number | null;
            }

            export interface ShareOfNext {
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

            matcher: Node.UnionMember0 | null | Node.UnionMember1;

            position: Node.Position;

            shareOfEntries: Node.ShareOfEntries;

            value: string;

            shareOfNext?: Node.ShareOfNext | null;

            shareOfPrevious?: Node.ShareOfPrevious | null;

            source?: string | null;

            terminal?: 'COMPLETED' | 'INCOMPLETE' | null;
          }

          export namespace Node {
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
                  children: Array<
                    UnionMember0.UnionMember0 | UnionMember0.UnionMember1 | UnionMember0.UnionMember2
                  >;

                  kind: 'and' | 'or';
                }

                export namespace UnionMember0 {
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

                export interface UnionMember1 {
                  child: UnionMember1.UnionMember0 | UnionMember1.UnionMember1 | UnionMember1.UnionMember2;

                  kind: 'not';
                }

                export namespace UnionMember1 {
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

            export interface ShareOfNext {
              denominator: string;

              numerator: string;

              value?: number | null;
            }

            export interface ShareOfPrevious {
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

              matcher: Step.UnionMember0 | null | Step.UnionMember1;

              position: Step.Position;

              value: string;

              source?: string | null;

              terminal?: 'COMPLETED' | 'INCOMPLETE' | null;
            }

            export namespace Step {
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
                    children: Array<
                      UnionMember0.UnionMember0 | UnionMember0.UnionMember1 | UnionMember0.UnionMember2
                    >;

                    kind: 'and' | 'or';
                  }

                  export namespace UnionMember0 {
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

                  export interface UnionMember1 {
                    child: UnionMember1.UnionMember0 | UnionMember1.UnionMember1 | UnionMember1.UnionMember2;

                    kind: 'not';
                  }

                  export namespace UnionMember1 {
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
  }
}

export type DashboardResultsResponse =
  | DashboardResultsResponse.UnionMember0
  | DashboardResultsResponse.UnionMember1
  | DashboardResultsResponse.UnionMember2;

export namespace DashboardResultsResponse {
  export interface UnionMember0 {
    computedAt: string;

    kind: 'insight';

    report: UnionMember0.Report;

    result: UnionMember0.Result;

    /**
     * Tile identifier from get_dashboard, or a new unique tile identifier for a report
     * preview.
     */
    tileId: string;
  }

  export namespace UnionMember0 {
    export interface Report {
      id: string;

      createdAt: string;

      createdByUserId: string;

      /**
       * Version 1 Insight definition: one to ten metrics and a day, week, or month
       * interval. Sum and average require a numeric event property. Filters use the
       * analytics property catalog.
       */
      definition: Report.Definition;

      /**
       * Display name for the saved Insight.
       */
      name: string;

      /**
       * UTC date range using either a preset or inclusive from/to calendar dates, up to
       * 366 days.
       */
      reportContext: Report.ReportContext;

      revision: string;

      updatedAt: string;

      updatedByUserId: string;

      /**
       * Complete chart settings. Replaces the saved view when supplied on PATCH; omitted
       * view fields reset to their defaults.
       */
      view: Report.View;

      /**
       * Optional description; null clears it.
       */
      description?: string | null;
    }

    export namespace Report {
      /**
       * Version 1 Insight definition: one to ten metrics and a day, week, or month
       * interval. Sum and average require a numeric event property. Filters use the
       * analytics property catalog.
       */
      export interface Definition {
        interval: 'day' | 'week' | 'month';

        kind: 'insight';

        metrics: Array<Definition.Metric>;

        version: 1;

        filter?: Definition.Filter;
      }

      export namespace Definition {
        export interface Metric {
          id: string;

          aggregation: 'event_count' | 'unique_visitors' | 'sum' | 'average';

          eventNames: Array<string>;

          name: string;

          filter?: Metric.Filter;

          property?: Metric.Property;
        }

        export namespace Metric {
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

          export interface Property {
            path: Array<string>;

            property: 'event.properties';

            type?: 'number';
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

      /**
       * UTC date range using either a preset or inclusive from/to calendar dates, up to
       * 366 days.
       */
      export interface ReportContext {
        dateRange: ReportContext.UnionMember0 | ReportContext.UnionMember1;
      }

      export namespace ReportContext {
        export interface UnionMember0 {
          from: string;

          to: string;

          timeZone?: 'UTC';
        }

        export interface UnionMember1 {
          preset:
            | 'today'
            | 'yesterday'
            | 'last_7_days'
            | 'last_30_days'
            | 'last_90_days'
            | 'last_12_months'
            | 'week_to_date'
            | 'month_to_date'
            | 'year_to_date';

          timeZone?: 'UTC';
        }
      }

      /**
       * Complete chart settings. Replaces the saved view when supplied on PATCH; omitted
       * view fields reset to their defaults.
       */
      export interface View {
        cumulative?: boolean;

        series?: Array<View.Series>;

        smoothing?: 'none' | 'rolling_average';

        smoothingWindow?: number;

        stacked?: boolean;

        tableSort?: View.TableSort;

        visualization?: 'line' | 'column' | 'bar' | 'pie' | 'table' | 'metric';

        yAxisScale?: 'linear' | 'log';
      }

      export namespace View {
        export interface Series {
          metricId: string;

          color?: string;

          hidden?: boolean;
        }

        export interface TableSort {
          column: 'label' | 'range_value' | 'average';

          direction: 'asc' | 'desc';
        }
      }
    }

    export interface Result {
      engine: 'clickhouse';

      /**
       * Saved report identifier; null for previews.
       */
      reportId: string | null;

      /**
       * Saved report revision; null for previews.
       */
      revision: string | null;

      scope: Result.Scope;

      semanticVersion: 1;

      series: Array<Result.Series>;

      sourceLimitations: Array<string>;

      sourcePolicy: string;

      sourceRevision?: string | null;
    }

    export namespace Result {
      export interface Scope {
        cumulative: boolean;

        executedAt: string;

        from: string;

        interval: 'day' | 'week' | 'month';

        sourceCompleteness: 'unknown';

        timeZone: 'UTC';

        to: string;

        comparison?: Scope.Comparison | null;
      }

      export namespace Scope {
        export interface Comparison {
          from: string;

          kind: 'previous_period' | 'previous_year' | 'custom';

          to: string;
        }
      }

      export interface Series {
        aggregation: 'event_count' | 'unique_visitors' | 'sum' | 'average';

        breakdownValues: Array<Series.BreakdownValue>;

        comparison: 'previous_period' | 'previous_year' | 'custom' | null;

        key: string;

        label: string;

        metricId: string;

        points: Array<Series.Point>;

        rangeValue: number | null;
      }

      export namespace Series {
        export interface BreakdownValue {
          property: string;

          value: string | null;
        }

        export interface Point {
          bucketEnd: string;

          bucketStart: string;

          cumulative: number | null;

          isPartial: boolean;

          raw: number | null;

          smoothed: number | null;
        }
      }
    }
  }

  export interface UnionMember1 {
    computedAt: string;

    kind: 'funnel';

    /**
     * Funnel configuration details.
     */
    report: UnionMember1.Report;

    result: UnionMember1.Result;

    /**
     * Tile identifier from get_dashboard, or a new unique tile identifier for a report
     * preview.
     */
    tileId: string;
  }

  export namespace UnionMember1 {
    /**
     * Funnel configuration details.
     */
    export interface Report {
      createdAt: string;

      funnelId: string;

      name: string;

      /**
       * Versioned funnel definition with typed steps and filters.
       */
      queryDefinition: Report.QueryDefinition;

      status: 'READY' | 'PROCESSING';

      updatedAt: string;

      /**
       * Optional description; null clears it.
       */
      description?: string | null;

      reportDateRange?: Report.ReportDateRange | null;

      watched?: boolean | null;
    }

    export namespace Report {
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

    export interface Result {
      definitionUpdatedAt: string;

      engine: string;

      /**
       * Ratio of last-step to first-step volume as a percentage. Event-counting ratios
       * may exceed 100%.
       */
      overallConversionRate: number;

      scope: Result.Scope;

      semanticVersion: 1;

      /**
       * Data quality limitations affecting these results. Source completeness and
       * conflicting event corrections may be unverified.
       */
      sourceLimitations: Array<
        | 'equal-load-conflicts-unverified'
        | 'cross-key-corrections-unverified'
        | 'source-completeness-unverified'
      >;

      sourcePolicy: 'events-v3-physical-key';

      /**
       * Per-step funnel analytics, ordered by step number.
       */
      steps: Array<Result.Step>;

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

    export namespace Result {
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
  }

  export interface UnionMember2 {
    computedAt: string;

    kind: 'journey';

    report: UnionMember2.Report;

    result: UnionMember2.Result;

    /**
     * Tile identifier from get_dashboard, or a new unique tile identifier for a report
     * preview.
     */
    tileId: string;
  }

  export namespace UnionMember2 {
    export interface Report {
      id: string;

      createdAt: string;

      createdByUserId: string;

      /**
       * Version 1 Journey Flow definition with anchors, event or page matchers,
       * counting, scope, and exploration settings. Selecting specific sourceIds also
       * requires source:view permission.
       */
      definition: Report.Definition;

      name: string;

      /**
       * Complete UTC date range and comparisons for this Journey Flow.
       */
      reportContext: Report.ReportContext;

      revision: string;

      updatedAt: string;

      updatedByUserId: string;

      /**
       * Complete visualization settings. Supplied view replaces the saved value on
       * PATCH.
       */
      view: Report.View;

      /**
       * Optional description; null clears it.
       */
      description?: string | null;
    }

    export namespace Report {
      /**
       * Version 1 Journey Flow definition with anchors, event or page matchers,
       * counting, scope, and exploration settings. Selecting specific sourceIds also
       * requires source:view permission.
       */
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

      /**
       * Complete UTC date range and comparisons for this Journey Flow.
       */
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

      /**
       * Complete visualization settings. Supplied view replaces the saved value on
       * PATCH.
       */
      export interface View {
        showDropOff?: boolean;

        showElapsedTime?: boolean;

        topEventsPerPosition?: number;

        topPaths?: number;

        visualization?: 'sankey' | 'top-paths';
      }
    }

    export interface Result {
      definitionHash: string;

      effectiveContext: Result.EffectiveContext;

      engine: string;

      execution: Result.Execution;

      limits: Result.Limits;

      observation: Result.Observation;

      samples: Result.Samples;

      semanticVersion: string;

      series: Array<Result.Series>;

      timing: Array<Result.Timing>;

      definitionRevision?: string | null;
    }

    export namespace Result {
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

          dateRange?: Comparison.DateRange | null;

          entryFilter?: Comparison.EntryFilter | null;

          sessionFilter?: Comparison.SessionFilter | null;
        }

        export namespace Comparison {
          export interface DateRange {
            from: string;

            timeZone: string;

            to: string;
          }

          export interface EntryFilter {
            filter: EntryFilter.Filter;

            version: number;
          }

          export namespace EntryFilter {
            export interface Filter {
              kind: 'AND' | 'OR' | 'NOT' | 'PREDICATE';

              child?: Filter.Child | null;

              children?: Array<Filter.Child> | null;

              predicate?: Filter.Predicate | null;
            }

            export namespace Filter {
              export interface Child {
                kind: 'AND' | 'OR' | 'NOT' | 'PREDICATE';
              }

              export interface Child {
                kind: 'AND' | 'OR' | 'NOT' | 'PREDICATE';
              }

              export interface Predicate {
                operator:
                  | 'EQ'
                  | 'NEQ'
                  | 'GT'
                  | 'GTE'
                  | 'LT'
                  | 'LTE'
                  | 'CONTAINS'
                  | 'NOT_CONTAINS'
                  | 'CONTAINS_CI'
                  | 'NOT_CONTAINS_CI'
                  | 'STARTS_WITH'
                  | 'ENDS_WITH'
                  | 'IN'
                  | 'NOT_IN'
                  | 'EXISTS'
                  | 'MISSING'
                  | 'IS_NULL';

                property: string;

                path?: Array<string> | null;

                type?: 'STRING' | 'NUMBER' | 'BOOLEAN' | null;

                value?: Predicate.Value | null;
              }

              export namespace Predicate {
                export interface Value {
                  booleanValue?: boolean | null;

                  booleanValues?: Array<boolean> | null;

                  numberValue?: number | null;

                  numberValues?: Array<number> | null;

                  stringValue?: string | null;

                  stringValues?: Array<string> | null;
                }
              }
            }
          }

          export interface SessionFilter {
            filter: SessionFilter.Filter;

            version: number;
          }

          export namespace SessionFilter {
            export interface Filter {
              kind: 'AND' | 'OR' | 'NOT' | 'PREDICATE';

              child?: Filter.Child | null;

              children?: Array<Filter.Child> | null;

              predicate?: Filter.Predicate | null;
            }

            export namespace Filter {
              export interface Child {
                kind: 'AND' | 'OR' | 'NOT' | 'PREDICATE';
              }

              export interface Child {
                kind: 'AND' | 'OR' | 'NOT' | 'PREDICATE';
              }

              export interface Predicate {
                operator:
                  | 'EQ'
                  | 'NEQ'
                  | 'GT'
                  | 'GTE'
                  | 'LT'
                  | 'LTE'
                  | 'CONTAINS'
                  | 'NOT_CONTAINS'
                  | 'CONTAINS_CI'
                  | 'NOT_CONTAINS_CI'
                  | 'STARTS_WITH'
                  | 'ENDS_WITH'
                  | 'IN'
                  | 'NOT_IN'
                  | 'EXISTS'
                  | 'MISSING'
                  | 'IS_NULL';

                property: string;

                path?: Array<string> | null;

                type?: 'STRING' | 'NUMBER' | 'BOOLEAN' | null;

                value?: Predicate.Value | null;
              }

              export namespace Predicate {
                export interface Value {
                  booleanValue?: boolean | null;

                  booleanValues?: Array<boolean> | null;

                  numberValue?: number | null;

                  numberValues?: Array<number> | null;

                  stringValue?: string | null;

                  stringValues?: Array<string> | null;
                }
              }
            }
          }
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

            shareOfNext?: Edge.ShareOfNext | null;
          }

          export namespace Edge {
            export interface ShareOfPrevious {
              denominator: string;

              numerator: string;

              value?: number | null;
            }

            export interface ShareOfNext {
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

            matcher: Node.UnionMember0 | null | Node.UnionMember1;

            position: Node.Position;

            shareOfEntries: Node.ShareOfEntries;

            value: string;

            shareOfNext?: Node.ShareOfNext | null;

            shareOfPrevious?: Node.ShareOfPrevious | null;

            source?: string | null;

            terminal?: 'COMPLETED' | 'INCOMPLETE' | null;
          }

          export namespace Node {
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
                  children: Array<
                    UnionMember0.UnionMember0 | UnionMember0.UnionMember1 | UnionMember0.UnionMember2
                  >;

                  kind: 'and' | 'or';
                }

                export namespace UnionMember0 {
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

                export interface UnionMember1 {
                  child: UnionMember1.UnionMember0 | UnionMember1.UnionMember1 | UnionMember1.UnionMember2;

                  kind: 'not';
                }

                export namespace UnionMember1 {
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

            export interface ShareOfNext {
              denominator: string;

              numerator: string;

              value?: number | null;
            }

            export interface ShareOfPrevious {
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

              matcher: Step.UnionMember0 | null | Step.UnionMember1;

              position: Step.Position;

              value: string;

              source?: string | null;

              terminal?: 'COMPLETED' | 'INCOMPLETE' | null;
            }

            export namespace Step {
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
                    children: Array<
                      UnionMember0.UnionMember0 | UnionMember0.UnionMember1 | UnionMember0.UnionMember2
                    >;

                    kind: 'and' | 'or';
                  }

                  export namespace UnionMember0 {
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

                  export interface UnionMember1 {
                    child: UnionMember1.UnionMember0 | UnionMember1.UnionMember1 | UnionMember1.UnionMember2;

                    kind: 'not';
                  }

                  export namespace UnionMember1 {
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
  }
}

export interface DashboardReplayTileResultResponse {
  computedAt: string;

  /**
   * Effective inclusive UTC start date after retention and range limits.
   */
  from: string;

  /**
   * True when more matching sessions exist in the window.
   */
  hasMore: boolean;

  /**
   * Most recent replay-bearing sessions first, at most the tile limit.
   */
  items: Array<DashboardReplayTileResultResponse.Item>;

  kind: 'replays';

  /**
   * Tile identifier from get_dashboard, or a new unique tile identifier for a report
   * preview.
   */
  tileId: string;

  /**
   * Effective inclusive UTC end date.
   */
  to: string;

  /**
   * REPLAY_RETENTION_LIMITED, REPLAY_RANGE_LIMITED, or REPLAY_OUTSIDE_RETENTION when
   * the window was narrowed or has no retained replays.
   */
  warnings: Array<DashboardReplayTileResultResponse.Warning>;
}

export namespace DashboardReplayTileResultResponse {
  export interface Item {
    date: string;

    /**
     * Session length in seconds.
     */
    duration: number | null;

    eventCount: number | null;

    pageCount: number | null;

    sessionId: string;

    startTime: string | null;

    visitorId: string;
  }

  export interface Warning {
    code: string;

    message: string;
  }
}

export interface DashboardReplayPreviewResponse {
  computedAt: string;

  /**
   * Effective inclusive UTC start date after retention and range limits.
   */
  from: string;

  /**
   * True when more matching sessions exist in the window.
   */
  hasMore: boolean;

  /**
   * Most recent replay-bearing sessions first, at most the tile limit.
   */
  items: Array<DashboardReplayPreviewResponse.Item>;

  kind: 'replays';

  /**
   * Tile identifier from get_dashboard, or a new unique tile identifier for a report
   * preview.
   */
  tileId: string;

  /**
   * Effective inclusive UTC end date.
   */
  to: string;

  /**
   * REPLAY_RETENTION_LIMITED, REPLAY_RANGE_LIMITED, or REPLAY_OUTSIDE_RETENTION when
   * the window was narrowed or has no retained replays.
   */
  warnings: Array<DashboardReplayPreviewResponse.Warning>;
}

export namespace DashboardReplayPreviewResponse {
  export interface Item {
    date: string;

    /**
     * Session length in seconds.
     */
    duration: number | null;

    eventCount: number | null;

    pageCount: number | null;

    sessionId: string;

    startTime: string | null;

    visitorId: string;
  }

  export interface Warning {
    code: string;

    message: string;
  }
}

export interface DashboardListParams extends CursorParams {
  /**
   * Case-insensitive substring search on Dashboard names.
   */
  search?: string;
}

export interface DashboardCreateParams {
  /**
   * Display name for the saved Dashboard.
   */
  name: string;

  /**
   * Complete UTC date context. Replaces the saved context on PATCH. Funnel and
   * Journey tiles support up to 91 inclusive days; Insights retain their native
   * range limit.
   */
  reportContext: DashboardCreateParams.ReportContext;

  /**
   * Ordered collection of up to 12 tiles; every kind counts toward the limit. Each
   * tile has id, layout { width 3-12, height }, and exactly one of report { kind:
   * insight|funnel|journey, id }, text { markdown } (at most 10000 characters per
   * tile and 20000 per Dashboard; height 80-960), or replays { title?, eventName?,
   * pathname?, filter?, limit 5-25 } (height 240-960, like report tiles). Replaces
   * the collection on PATCH; removing a tile does not delete its report. Referenced
   * reports require web-analytics:view; Insights also require variables:find-custom
   * and Journeys with selected sources require source:view. Replay tile results
   * require web-analytics:view, like the Session Replay list.
   */
  tiles: Array<
    | DashboardCreateParams.UnionMember0
    | DashboardCreateParams.UnionMember1
    | DashboardCreateParams.UnionMember2
  >;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;

  /**
   * Shared analytics filter, combined with Insight report filters or Funnel and
   * Journey entry filters. Null clears it; report-specific filters remain in effect.
   */
  filter?: DashboardCreateParams.Filter;
}

export namespace DashboardCreateParams {
  /**
   * Complete UTC date context. Replaces the saved context on PATCH. Funnel and
   * Journey tiles support up to 91 inclusive days; Insights retain their native
   * range limit.
   */
  export interface ReportContext {
    dateRange: ReportContext.UnionMember0 | ReportContext.UnionMember1;
  }

  export namespace ReportContext {
    export interface UnionMember0 {
      from: string;

      to: string;

      timeZone?: 'UTC';
    }

    export interface UnionMember1 {
      preset:
        | 'today'
        | 'yesterday'
        | 'last_7_days'
        | 'last_30_days'
        | 'last_90_days'
        | 'last_12_months'
        | 'week_to_date'
        | 'month_to_date'
        | 'year_to_date';

      timeZone?: 'UTC';
    }
  }

  export interface UnionMember0 {
    id: string;

    layout: UnionMember0.Layout;

    report: UnionMember0.Report;
  }

  export namespace UnionMember0 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Report {
      id: string;

      kind: 'insight' | 'funnel' | 'journey';
    }
  }

  export interface UnionMember1 {
    id: string;

    layout: UnionMember1.Layout;

    text: UnionMember1.Text;
  }

  export namespace UnionMember1 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Text {
      markdown: string;
    }
  }

  export interface UnionMember2 {
    id: string;

    layout: UnionMember2.Layout;

    replays: UnionMember2.Replays;
  }

  export namespace UnionMember2 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Replays {
      limit: number;

      eventName?: string;

      filter?: Replays.Filter;

      pathname?: string;

      title?: string;
    }

    export namespace Replays {
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

  /**
   * Shared analytics filter, combined with Insight report filters or Funnel and
   * Journey entry filters. Null clears it; report-specific filters remain in effect.
   */
  export interface Filter {
    filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

    version: 1;
  }

  export namespace Filter {
    export interface UnionMember0 {
      children: Array<UnionMember0.UnionMember0 | UnionMember0.UnionMember1 | UnionMember0.UnionMember2>;

      kind: 'and' | 'or';
    }

    export namespace UnionMember0 {
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

    export interface UnionMember1 {
      child: UnionMember1.UnionMember0 | UnionMember1.UnionMember1 | UnionMember1.UnionMember2;

      kind: 'not';
    }

    export namespace UnionMember1 {
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

export interface DashboardUpdateParams {
  /**
   * Current revision from get_dashboard, list_dashboards, or the last write. A stale
   * revision returns 409; reload before retrying.
   */
  expectedRevision: string;

  /**
   * Optional description; null clears it.
   */
  description?: string | null;

  /**
   * Shared analytics filter, combined with Insight report filters or Funnel and
   * Journey entry filters. Null clears it; report-specific filters remain in effect.
   */
  filter?: DashboardUpdateParams.Filter;

  /**
   * Display name for the saved Dashboard.
   */
  name?: string;

  /**
   * Complete UTC date context. Replaces the saved context on PATCH. Funnel and
   * Journey tiles support up to 91 inclusive days; Insights retain their native
   * range limit.
   */
  reportContext?: DashboardUpdateParams.ReportContext;

  /**
   * Ordered collection of up to 12 tiles; every kind counts toward the limit. Each
   * tile has id, layout { width 3-12, height }, and exactly one of report { kind:
   * insight|funnel|journey, id }, text { markdown } (at most 10000 characters per
   * tile and 20000 per Dashboard; height 80-960), or replays { title?, eventName?,
   * pathname?, filter?, limit 5-25 } (height 240-960, like report tiles). Replaces
   * the collection on PATCH; removing a tile does not delete its report. Referenced
   * reports require web-analytics:view; Insights also require variables:find-custom
   * and Journeys with selected sources require source:view. Replay tile results
   * require web-analytics:view, like the Session Replay list.
   */
  tiles?: Array<
    | DashboardUpdateParams.UnionMember0
    | DashboardUpdateParams.UnionMember1
    | DashboardUpdateParams.UnionMember2
  >;
}

export namespace DashboardUpdateParams {
  /**
   * Shared analytics filter, combined with Insight report filters or Funnel and
   * Journey entry filters. Null clears it; report-specific filters remain in effect.
   */
  export interface Filter {
    filter: Filter.UnionMember0 | Filter.UnionMember1 | Filter.UnionMember2;

    version: 1;
  }

  export namespace Filter {
    export interface UnionMember0 {
      children: Array<UnionMember0.UnionMember0 | UnionMember0.UnionMember1 | UnionMember0.UnionMember2>;

      kind: 'and' | 'or';
    }

    export namespace UnionMember0 {
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

    export interface UnionMember1 {
      child: UnionMember1.UnionMember0 | UnionMember1.UnionMember1 | UnionMember1.UnionMember2;

      kind: 'not';
    }

    export namespace UnionMember1 {
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

  /**
   * Complete UTC date context. Replaces the saved context on PATCH. Funnel and
   * Journey tiles support up to 91 inclusive days; Insights retain their native
   * range limit.
   */
  export interface ReportContext {
    dateRange: ReportContext.UnionMember0 | ReportContext.UnionMember1;
  }

  export namespace ReportContext {
    export interface UnionMember0 {
      from: string;

      to: string;

      timeZone?: 'UTC';
    }

    export interface UnionMember1 {
      preset:
        | 'today'
        | 'yesterday'
        | 'last_7_days'
        | 'last_30_days'
        | 'last_90_days'
        | 'last_12_months'
        | 'week_to_date'
        | 'month_to_date'
        | 'year_to_date';

      timeZone?: 'UTC';
    }
  }

  export interface UnionMember0 {
    id: string;

    layout: UnionMember0.Layout;

    report: UnionMember0.Report;
  }

  export namespace UnionMember0 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Report {
      id: string;

      kind: 'insight' | 'funnel' | 'journey';
    }
  }

  export interface UnionMember1 {
    id: string;

    layout: UnionMember1.Layout;

    text: UnionMember1.Text;
  }

  export namespace UnionMember1 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Text {
      markdown: string;
    }
  }

  export interface UnionMember2 {
    id: string;

    layout: UnionMember2.Layout;

    replays: UnionMember2.Replays;
  }

  export namespace UnionMember2 {
    export interface Layout {
      height: number;

      width: number;
    }

    export interface Replays {
      limit: number;

      eventName?: string;

      filter?: Replays.Filter;

      pathname?: string;

      title?: string;
    }

    export namespace Replays {
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
}

export interface DashboardDeleteParams {
  /**
   * Current revision from get_dashboard, list_dashboards, or the last write. A stale
   * revision returns 409; reload before retrying.
   */
  expectedRevision: string;
}

export interface DashboardDuplicateParams {
  /**
   * Current revision from get_dashboard, list_dashboards, or the last write. A stale
   * revision returns 409; reload before retrying.
   */
  expectedRevision: string;
}

export interface DashboardPreviewParams {
  /**
   * Required preview input: tileId, report { kind, id }, and context { from, to,
   * filter? }; comparison is optional. JSON-encode this object in the REST query
   * string; maximum 16384 bytes before URL encoding. Preview does not save a
   * Dashboard or change the report.
   */
  input: string;
}

export interface DashboardResultsParams {
  /**
   * Complete execution context: inclusive UTC from/to dates and an optional
   * temporary filter. Pass the saved Dashboard filter from get_dashboard to include
   * it; omitting filter applies only report-native filters. Resolve dates once for
   * every tile. This does not change the saved Dashboard or report.
   */
  context: string;

  /**
   * Current revision from get_dashboard, list_dashboards, or the last write. A stale
   * revision returns 409; reload before retrying.
   */
  expectedRevision: string;

  /**
   * Tile identifier from get_dashboard, or a new unique tile identifier for a report
   * preview.
   */
  tileId: string;

  /**
   * Temporary comparison for Insight tiles only. JSON-encoded in the REST query
   * string; never saved.
   */
  comparison?: string;
}

export interface DashboardReplayTileResultParams {
  /**
   * Complete execution context: inclusive UTC from/to dates and an optional
   * temporary filter, ANDed with the tile filter. Pass the saved Dashboard filter
   * from get_dashboard to include it. Dates older than the organization replay
   * retention are excluded and the window is limited to the most recent 61 days; the
   * response reports the effective window and warnings.
   */
  context: string;

  /**
   * Current revision from get_dashboard, list_dashboards, or the last write. A stale
   * revision returns 409; reload before retrying.
   */
  expectedRevision: string;

  /**
   * Tile identifier from get_dashboard, or a new unique tile identifier for a report
   * preview.
   */
  tileId: string;
}

export interface DashboardReplayPreviewParams {
  /**
   * Required preview input: tileId, replays { limit, title?, eventName?, pathname?,
   * filter? }, and context { from, to, filter? }. JSON-encode this object in the
   * REST query string; maximum 16384 bytes before URL encoding. Preview does not
   * save a Dashboard.
   */
  input: string;
}

export declare namespace Dashboards {
  export {
    type DashboardListResponse as DashboardListResponse,
    type DashboardCreateResponse as DashboardCreateResponse,
    type DashboardRetrieveResponse as DashboardRetrieveResponse,
    type DashboardUpdateResponse as DashboardUpdateResponse,
    type DashboardDeleteResponse as DashboardDeleteResponse,
    type DashboardDuplicateResponse as DashboardDuplicateResponse,
    type DashboardPreviewResponse as DashboardPreviewResponse,
    type DashboardResultsResponse as DashboardResultsResponse,
    type DashboardReplayTileResultResponse as DashboardReplayTileResultResponse,
    type DashboardReplayPreviewResponse as DashboardReplayPreviewResponse,
    type DashboardListResponsesCursor as DashboardListResponsesCursor,
    type DashboardListParams as DashboardListParams,
    type DashboardCreateParams as DashboardCreateParams,
    type DashboardUpdateParams as DashboardUpdateParams,
    type DashboardDeleteParams as DashboardDeleteParams,
    type DashboardDuplicateParams as DashboardDuplicateParams,
    type DashboardPreviewParams as DashboardPreviewParams,
    type DashboardResultsParams as DashboardResultsParams,
    type DashboardReplayTileResultParams as DashboardReplayTileResultParams,
    type DashboardReplayPreviewParams as DashboardReplayPreviewParams,
  };
}
