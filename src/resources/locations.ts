// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Locations extends APIResource {
  /**
   * List every location for this account. Not paginated — each account has a small
   * map-count limit (single digits in practice) so the response always fits in a
   * single page. Requires scope: maps:list
   */
  list(options?: RequestOptions): APIPromise<LocationListResponse> {
    return this._client.get('/rest/v1/locations', options);
  }

  /**
   * Create a new location (map embed). All address fields are optional and can be
   * filled in later via PATCH. Returns the slim entity with the server-assigned `id`
   * so callers can immediately request `GET /rest/v1/locations/{id}/embed-code`.
   * Requires scope: maps:create
   */
  create(body: LocationCreateParams, options?: RequestOptions): APIPromise<LocationCreateResponse> {
    return this._client.post('/rest/v1/locations', { body, ...options });
  }

  /**
   * Partially update a location. Only the fields you send are changed.
   * `additionalAddresses` is replaced wholesale when sent — partial item updates are
   * not merged. The map's computed center is recalculated on every PATCH from the
   * latest coordinates. Requires scope: maps:update
   */
  update(
    id: string,
    body: LocationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<LocationUpdateResponse> {
    return this._client.patch(path`/rest/v1/locations/${id}`, { body, ...options });
  }

  /**
   * Generate the paste-ready HTML embed snippet for a location. The response is a
   * single self-contained HTML string (a `<style>` block + `<div>` wrapping an
   * `<iframe>` pointed at the maps CDN for the current stage, plus an optional
   * JSON-LD `<script>`). Customize the render with the optional query params
   * (`color`, `theme`, `colorScheme`, `mapStyle`, `includeAddressBox`, `zoom`,
   * `includeControls`, `includeSEOSchema`); all have sane defaults. Requires scope:
   * maps:find
   */
  embedCode(
    id: string,
    query: LocationEmbedCodeParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<LocationEmbedCodeResponse> {
    return this._client.get(path`/rest/v1/locations/${id}/embed-code`, { query, ...options });
  }
}

export interface LocationListResponse {
  entities: Array<LocationListResponse.Entity>;
}

export namespace LocationListResponse {
  export interface Entity {
    id: string;

    accountId: string;

    additionalAddresses?: Array<Entity.AdditionalAddress> | null;

    center?: unknown | null;

    city?: string | null;

    country?: string | null;

    createdAt?: string | null;

    customDomain?: string | null;

    latitude?: number | null;

    line1?: string | null;

    line2?: string | null;

    longitude?: number | null;

    mapName?: string | null;

    name?: string | null;

    phoneNumber?: string | null;

    state?: string | null;

    updatedAt?: string | null;

    websiteLinkText?: string | null;

    websiteUrl?: string | null;

    zip?: string | null;
  }

  export namespace Entity {
    export interface AdditionalAddress {
      city?: string | null;

      country?: string | null;

      latitude?: number | null;

      line1?: string | null;

      line2?: string | null;

      longitude?: number | null;

      name?: string | null;

      phoneNumber?: string | null;

      state?: string | null;

      websiteLinkText?: string | null;

      websiteUrl?: string | null;

      zip?: string | null;
    }
  }
}

export interface LocationCreateResponse {
  id: string;

  accountId: string;

  additionalAddresses?: Array<LocationCreateResponse.AdditionalAddress> | null;

  center?: unknown | null;

  city?: string | null;

  country?: string | null;

  createdAt?: string | null;

  customDomain?: string | null;

  latitude?: number | null;

  line1?: string | null;

  line2?: string | null;

  longitude?: number | null;

  mapName?: string | null;

  name?: string | null;

  phoneNumber?: string | null;

  state?: string | null;

  updatedAt?: string | null;

  websiteLinkText?: string | null;

  websiteUrl?: string | null;

  zip?: string | null;
}

export namespace LocationCreateResponse {
  export interface AdditionalAddress {
    city?: string | null;

    country?: string | null;

    latitude?: number | null;

    line1?: string | null;

    line2?: string | null;

    longitude?: number | null;

    name?: string | null;

    phoneNumber?: string | null;

    state?: string | null;

    websiteLinkText?: string | null;

    websiteUrl?: string | null;

    zip?: string | null;
  }
}

export interface LocationUpdateResponse {
  id: string;

  accountId: string;

  additionalAddresses?: Array<LocationUpdateResponse.AdditionalAddress> | null;

  center?: unknown | null;

  city?: string | null;

  country?: string | null;

  createdAt?: string | null;

  customDomain?: string | null;

  latitude?: number | null;

  line1?: string | null;

  line2?: string | null;

  longitude?: number | null;

  mapName?: string | null;

  name?: string | null;

  phoneNumber?: string | null;

  state?: string | null;

  updatedAt?: string | null;

  websiteLinkText?: string | null;

  websiteUrl?: string | null;

  zip?: string | null;
}

export namespace LocationUpdateResponse {
  export interface AdditionalAddress {
    city?: string | null;

    country?: string | null;

    latitude?: number | null;

    line1?: string | null;

    line2?: string | null;

    longitude?: number | null;

    name?: string | null;

    phoneNumber?: string | null;

    state?: string | null;

    websiteLinkText?: string | null;

    websiteUrl?: string | null;

    zip?: string | null;
  }
}

export interface LocationEmbedCodeResponse {
  /**
   * Self-contained HTML snippet (a `<style>` + `<div>` wrapping an `<iframe>`, plus
   * an optional JSON-LD `<script>`) ready to paste into any page. The iframe `src`
   * points to the maps CDN for the current stage.
   */
  embedCode: string;
}

export interface LocationCreateParams {
  additionalAddresses?: Array<LocationCreateParams.AdditionalAddress> | null;

  center?: unknown | null;

  city?: string | null;

  country?: string | null;

  customDomain?: string | null;

  latitude?: number | null;

  line1?: string | null;

  line2?: string | null;

  longitude?: number | null;

  mapName?: string | null;

  name?: string | null;

  phoneNumber?: string | null;

  state?: string | null;

  websiteLinkText?: string | null;

  websiteUrl?: string | null;

  zip?: string | null;
}

export namespace LocationCreateParams {
  export interface AdditionalAddress {
    latitude: number;

    longitude: number;

    city?: string | null;

    country?: string | null;

    line1?: string | null;

    line2?: string | null;

    name?: string | null;

    phoneNumber?: string | null;

    state?: string | null;

    websiteLinkText?: string | null;

    websiteUrl?: string | null;

    zip?: string | null;
  }
}

export interface LocationUpdateParams {
  additionalAddresses?: Array<LocationUpdateParams.AdditionalAddress> | null;

  center?: unknown | null;

  city?: string | null;

  country?: string | null;

  customDomain?: string | null;

  latitude?: number | null;

  line1?: string | null;

  line2?: string | null;

  longitude?: number | null;

  mapName?: string | null;

  name?: string | null;

  phoneNumber?: string | null;

  state?: string | null;

  websiteLinkText?: string | null;

  websiteUrl?: string | null;

  zip?: string | null;
}

export namespace LocationUpdateParams {
  export interface AdditionalAddress {
    latitude: number;

    longitude: number;

    city?: string | null;

    country?: string | null;

    line1?: string | null;

    line2?: string | null;

    name?: string | null;

    phoneNumber?: string | null;

    state?: string | null;

    websiteLinkText?: string | null;

    websiteUrl?: string | null;

    zip?: string | null;
  }
}

export interface LocationEmbedCodeParams {
  /**
   * Brand color used in the embedded map UI. Any CSS color string.
   */
  color?: string;

  /**
   * Light or dark color scheme.
   */
  colorScheme?: 'light' | 'dark';

  /**
   * Render the address sidebar overlay next to the map. Send `false` to hide.
   */
  includeAddressBox?: boolean;

  /**
   * Whether the embed renders map controls. `accessible` enables keyboard-navigable
   * controls.
   */
  includeControls?: 'yes' | 'no' | 'accessible';

  /**
   * Emit a `schema.org` Place JSON-LD block alongside the iframe so search engines
   * can index the location.
   */
  includeSEOSchema?: boolean;

  /**
   * Base map style.
   */
  mapStyle?: 'Standard' | 'Monochrome';

  /**
   * Visual theme variant.
   */
  theme?: 'default' | 'modern';

  /**
   * Initial map zoom level (Google-style 1–20).
   */
  zoom?: number;
}

export declare namespace Locations {
  export {
    type LocationListResponse as LocationListResponse,
    type LocationCreateResponse as LocationCreateResponse,
    type LocationUpdateResponse as LocationUpdateResponse,
    type LocationEmbedCodeResponse as LocationEmbedCodeResponse,
    type LocationCreateParams as LocationCreateParams,
    type LocationUpdateParams as LocationUpdateParams,
    type LocationEmbedCodeParams as LocationEmbedCodeParams,
  };
}
