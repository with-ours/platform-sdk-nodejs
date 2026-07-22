// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ShortLinks extends APIResource {
  /**
   * List all short links (QR codes / redirects) for this account, newest first.
   * Supports cursor pagination and optional `status` and `nameContains` filters.
   * Each entity bundles the destination URL, the composed public `shortUrl`, and the
   * QR/campaign design. Requires scope: source:list
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const shortLinkListResponse of client.shortLinks.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ShortLinkListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ShortLinkListResponsesCursor, ShortLinkListResponse> {
    return this._client.getAPIList('/rest/v1/short-links', Cursor<ShortLinkListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Create a short link (QR code / redirect) with its destination, campaign tags,
   * and QR styling in a single call. The short code is generated automatically; the
   * response `shortUrl` is the public URL the QR encodes. All body fields are
   * optional — send `{}` to create an unconfigured link and fill it in later with
   * PATCH. A newly created short link only resolves at the edge once a version is
   * published. Requires scope: source:create
   *
   * @example
   * ```ts
   * const shortLink = await client.shortLinks.create();
   * ```
   */
  create(
    body: ShortLinkCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ShortLinkCreateResponse> {
    return this._client.post('/rest/v1/short-links', { body, ...options });
  }

  /**
   * Fetch a single short link by id, including its destination, composed `shortUrl`,
   * and QR/campaign design. Returns 404 when no short link matches the id or it
   * belongs to a different account. Requires scope: source:view
   *
   * @example
   * ```ts
   * const shortLink = await client.shortLinks.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ShortLinkRetrieveResponse> {
    return this._client.get(path`/rest/v1/short-links/${id}`, options);
  }

  /**
   * Partially update a short link. Only the fields you send are changed; omitted
   * fields are unchanged. Send explicit `null` to clear `redirectUrl`. The `utm` and
   * `qr` objects are replaced wholesale when sent. Returns the full short link
   * entity after the update. Requires scope: source:update
   *
   * @example
   * ```ts
   * const shortLink = await client.shortLinks.update('id');
   * ```
   */
  update(
    id: string,
    body: ShortLinkUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ShortLinkUpdateResponse> {
    return this._client.patch(path`/rest/v1/short-links/${id}`, { body, ...options });
  }

  /**
   * Delete a short link and its QR/campaign design. After deletion the short URL
   * stops resolving on the next publish. Requires scope: source:delete
   *
   * @example
   * ```ts
   * const shortLink = await client.shortLinks.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<ShortLinkDeleteResponse> {
    return this._client.delete(path`/rest/v1/short-links/${id}`, options);
  }

  /**
   * Aggregate click analytics for a short link over a date window: total and unique
   * clicks, a time series (daily or hourly), and breakdowns by country, city, and
   * device. QR scans are counted as clicks. Pass `from`/`to` as UTC calendar days
   * (`YYYY-MM-DD`); set `granularity=HOURLY` for hourly buckets and
   * `excludeBots=false` to include bot traffic. Requires the `shortlink:reporting`
   * scope, which is gated separately because analytics data is PHI-bearing. Requires
   * scope: shortlink:reporting
   *
   * @example
   * ```ts
   * const response = await client.shortLinks.results('id', {
   *   from: '2026-06-01',
   *   to: '2026-06-30',
   * });
   * ```
   */
  results(
    id: string,
    query: ShortLinkResultsParams,
    options?: RequestOptions,
  ): APIPromise<ShortLinkResultsResponse> {
    return this._client.get(path`/rest/v1/short-links/${id}/results`, { query, ...options });
  }
}

export type ShortLinkListResponsesCursor = Cursor<ShortLinkListResponse>;

export interface ShortLinkListResponse {
  id: string;

  /**
   * Organization id that owns this short link.
   */
  accountId: string;

  createdAt: string;

  status: 'Disabled' | 'Enabled';

  /**
   * Whether this short link exists in the currently published version. An
   * unpublished short link does not resolve at the edge.
   */
  isPublished?: boolean | null;

  name?: string | null;

  /**
   * The short code embedded in the public URL (`/redirect/{pixel}`).
   * Server-assigned.
   */
  pixel?: string | null;

  /**
   * The destination URL this short link redirects to.
   */
  redirectUrl?: string | null;

  /**
   * QR styling + campaign tags. Null until the link is styled.
   */
  shortLinkDesign?: unknown | null;

  /**
   * The public short-link URL that the QR encodes and callers share. Composed from
   * the short code, the link name (sent as the tracked event), and the campaign
   * tags. Also resolves on any branded custom domains configured for the account.
   */
  shortUrl?: string | null;
}

export interface ShortLinkCreateResponse {
  id: string;

  /**
   * Organization id that owns this short link.
   */
  accountId: string;

  createdAt: string;

  status: 'Disabled' | 'Enabled';

  /**
   * Whether this short link exists in the currently published version. An
   * unpublished short link does not resolve at the edge.
   */
  isPublished?: boolean | null;

  name?: string | null;

  /**
   * The short code embedded in the public URL (`/redirect/{pixel}`).
   * Server-assigned.
   */
  pixel?: string | null;

  /**
   * The destination URL this short link redirects to.
   */
  redirectUrl?: string | null;

  /**
   * QR styling + campaign tags. Null until the link is styled.
   */
  shortLinkDesign?: unknown | null;

  /**
   * The public short-link URL that the QR encodes and callers share. Composed from
   * the short code, the link name (sent as the tracked event), and the campaign
   * tags. Also resolves on any branded custom domains configured for the account.
   */
  shortUrl?: string | null;
}

export interface ShortLinkRetrieveResponse {
  id: string;

  /**
   * Organization id that owns this short link.
   */
  accountId: string;

  createdAt: string;

  status: 'Disabled' | 'Enabled';

  /**
   * Whether this short link exists in the currently published version. An
   * unpublished short link does not resolve at the edge.
   */
  isPublished?: boolean | null;

  name?: string | null;

  /**
   * The short code embedded in the public URL (`/redirect/{pixel}`).
   * Server-assigned.
   */
  pixel?: string | null;

  /**
   * The destination URL this short link redirects to.
   */
  redirectUrl?: string | null;

  /**
   * QR styling + campaign tags. Null until the link is styled.
   */
  shortLinkDesign?: unknown | null;

  /**
   * The public short-link URL that the QR encodes and callers share. Composed from
   * the short code, the link name (sent as the tracked event), and the campaign
   * tags. Also resolves on any branded custom domains configured for the account.
   */
  shortUrl?: string | null;
}

export interface ShortLinkUpdateResponse {
  id: string;

  /**
   * Organization id that owns this short link.
   */
  accountId: string;

  createdAt: string;

  status: 'Disabled' | 'Enabled';

  /**
   * Whether this short link exists in the currently published version. An
   * unpublished short link does not resolve at the edge.
   */
  isPublished?: boolean | null;

  name?: string | null;

  /**
   * The short code embedded in the public URL (`/redirect/{pixel}`).
   * Server-assigned.
   */
  pixel?: string | null;

  /**
   * The destination URL this short link redirects to.
   */
  redirectUrl?: string | null;

  /**
   * QR styling + campaign tags. Null until the link is styled.
   */
  shortLinkDesign?: unknown | null;

  /**
   * The public short-link URL that the QR encodes and callers share. Composed from
   * the short code, the link name (sent as the tracked event), and the campaign
   * tags. Also resolves on any branded custom domains configured for the account.
   */
  shortUrl?: string | null;
}

export interface ShortLinkDeleteResponse {
  deleted: true;
}

export interface ShortLinkResultsResponse {
  devices: Array<ShortLinkResultsResponse.Device>;

  geoByCity: Array<ShortLinkResultsResponse.GeoByCity>;

  geoByCountry: Array<ShortLinkResultsResponse.GeoByCountry>;

  timeSeries: Array<ShortLinkResultsResponse.TimeSeries>;

  totalClicks: number;

  uniqueClicks: number;
}

export namespace ShortLinkResultsResponse {
  export interface Device {
    clicks: number;

    name: string;

    uniqueClicks: number;
  }

  export interface GeoByCity {
    clicks: number;

    name: string;

    uniqueClicks: number;
  }

  export interface GeoByCountry {
    clicks: number;

    name: string;

    uniqueClicks: number;
  }

  export interface TimeSeries {
    clicks: number;

    period: string;

    uniqueClicks: number;
  }
}

export interface ShortLinkListParams extends CursorParams {
  /**
   * Case-insensitive substring filter on the short link name.
   */
  nameContains?: string;

  /**
   * Filter by short link status.
   */
  status?: 'Disabled' | 'Enabled';
}

export interface ShortLinkCreateParams {
  /**
   * Human-readable name. Also sent as the tracked event name on every click/scan.
   */
  name?: string | null;

  /**
   * QR code visual styling.
   */
  qr?: unknown | null;

  /**
   * Destination URL the short link redirects to. Must be a valid URL.
   */
  redirectUrl?: string | null;

  /**
   * Campaign / UTM tags appended to the tracked short-link URL.
   */
  utm?: unknown | null;
}

export interface ShortLinkUpdateParams {
  name?: string | null;

  qr?: unknown | null;

  /**
   * Destination URL the short link redirects to. Must be a valid URL. Send `null` to
   * clear it.
   */
  redirectUrl?: string | null;

  /**
   * Whether the short link resolves at the edge. Send `Enabled` or `Disabled`;
   * `null` is rejected since storage cannot represent it.
   */
  status?: string | null;

  utm?: unknown | null;
}

export interface ShortLinkResultsParams {
  /**
   * Inclusive lower bound of the report window, a UTC calendar day in `YYYY-MM-DD`.
   */
  from: string;

  /**
   * Inclusive upper bound of the report window, a UTC calendar day in `YYYY-MM-DD`.
   */
  to: string;

  /**
   * Exclude bot traffic from the counts. Defaults to `true`.
   */
  excludeBots?: boolean;

  /**
   * Time-series bucket size. Defaults to `DAILY`.
   */
  granularity?: 'DAILY' | 'HOURLY';
}

export declare namespace ShortLinks {
  export {
    type ShortLinkListResponse as ShortLinkListResponse,
    type ShortLinkCreateResponse as ShortLinkCreateResponse,
    type ShortLinkRetrieveResponse as ShortLinkRetrieveResponse,
    type ShortLinkUpdateResponse as ShortLinkUpdateResponse,
    type ShortLinkDeleteResponse as ShortLinkDeleteResponse,
    type ShortLinkResultsResponse as ShortLinkResultsResponse,
    type ShortLinkListResponsesCursor as ShortLinkListResponsesCursor,
    type ShortLinkListParams as ShortLinkListParams,
    type ShortLinkCreateParams as ShortLinkCreateParams,
    type ShortLinkUpdateParams as ShortLinkUpdateParams,
    type ShortLinkResultsParams as ShortLinkResultsParams,
  };
}
