// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class ReportBranding extends APIResource {
  /**
   * Get the organization logo shown on Dashboards and Dashboard PDFs. Returns {
   * logo: null } when no logo is set. Pass includeDataUrl=false to omit the image
   * data and read only its format, dimensions, size, and update time. Requires
   * Analytics Suite access. Requires API-key scope or current OAuth user permission:
   * web-analytics:view
   */
  retrieve(
    query: ReportBrandingRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ReportBrandingRetrieveResponse> {
    return this._client.get('/rest/v1/report-branding/logo', { query, ...options });
  }

  /**
   * Replace the organization logo used on Dashboards and Dashboard PDFs. Send
   * contentType and base64 data for a PNG, JPEG, or WebP image of at most 524288
   * bytes and 4096 pixels in each dimension. The bytes must match contentType; SVG
   * is not accepted, so rasterize vector logos first. Requires Analytics Suite
   * access and organization:manage-report-branding. Requires API-key scope or
   * current OAuth user permission: organization:manage-report-branding
   */
  replace(
    body: ReportBrandingReplaceParams,
    options?: RequestOptions,
  ): APIPromise<ReportBrandingReplaceResponse> {
    return this._client.put('/rest/v1/report-branding/logo', { body, ...options });
  }

  /**
   * Remove the organization logo from Dashboards and Dashboard PDFs. Succeeds when
   * no logo is set. Requires Analytics Suite access and
   * organization:manage-report-branding. Requires API-key scope or current OAuth
   * user permission: organization:manage-report-branding
   */
  delete(options?: RequestOptions): APIPromise<ReportBrandingDeleteResponse> {
    return this._client.delete('/rest/v1/report-branding/logo', options);
  }
}

export interface ReportBrandingRetrieveResponse {
  /**
   * Organization logo shown on Dashboards and Dashboard PDFs, or null when none is
   * set.
   */
  logo: ReportBrandingRetrieveResponse.Logo | null;
}

export namespace ReportBrandingRetrieveResponse {
  /**
   * Organization logo shown on Dashboards and Dashboard PDFs, or null when none is
   * set.
   */
  export interface Logo {
    /**
     * Decoded image size in bytes.
     */
    byteSize: number;

    contentType: 'image/png' | 'image/jpeg' | 'image/webp';

    /**
     * Image height in pixels.
     */
    height: number;

    updatedAt: string;

    updatedByUserId: string;

    /**
     * Image width in pixels.
     */
    width: number;

    /**
     * data: URL containing the base64 image. Returned by GET unless includeDataUrl is
     * false; omitted from write responses.
     */
    dataUrl?: string;
  }
}

export interface ReportBrandingReplaceResponse {
  /**
   * Organization logo shown on Dashboards and Dashboard PDFs, or null when none is
   * set.
   */
  logo: ReportBrandingReplaceResponse.Logo | null;
}

export namespace ReportBrandingReplaceResponse {
  /**
   * Organization logo shown on Dashboards and Dashboard PDFs, or null when none is
   * set.
   */
  export interface Logo {
    /**
     * Decoded image size in bytes.
     */
    byteSize: number;

    contentType: 'image/png' | 'image/jpeg' | 'image/webp';

    /**
     * Image height in pixels.
     */
    height: number;

    updatedAt: string;

    updatedByUserId: string;

    /**
     * Image width in pixels.
     */
    width: number;

    /**
     * data: URL containing the base64 image. Returned by GET unless includeDataUrl is
     * false; omitted from write responses.
     */
    dataUrl?: string;
  }
}

export interface ReportBrandingDeleteResponse {
  /**
   * Organization logo shown on Dashboards and Dashboard PDFs, or null when none is
   * set.
   */
  logo: ReportBrandingDeleteResponse.Logo | null;
}

export namespace ReportBrandingDeleteResponse {
  /**
   * Organization logo shown on Dashboards and Dashboard PDFs, or null when none is
   * set.
   */
  export interface Logo {
    /**
     * Decoded image size in bytes.
     */
    byteSize: number;

    contentType: 'image/png' | 'image/jpeg' | 'image/webp';

    /**
     * Image height in pixels.
     */
    height: number;

    updatedAt: string;

    updatedByUserId: string;

    /**
     * Image width in pixels.
     */
    width: number;

    /**
     * data: URL containing the base64 image. Returned by GET unless includeDataUrl is
     * false; omitted from write responses.
     */
    dataUrl?: string;
  }
}

export interface ReportBrandingRetrieveParams {
  /**
   * Whether to return the image as logo.dataUrl. Defaults to true; pass false to
   * read only the logo metadata.
   */
  includeDataUrl?: boolean;
}

export interface ReportBrandingReplaceParams {
  /**
   * Image format: image/png, image/jpeg, or image/webp. SVG is not accepted;
   * rasterize vector logos first. Must match the uploaded bytes.
   */
  contentType: 'image/png' | 'image/jpeg' | 'image/webp';

  /**
   * Standard base64 image bytes without a data: prefix. At most 524288 decoded bytes
   * and 4096 pixels in each dimension.
   */
  data: string;
}

export declare namespace ReportBranding {
  export {
    type ReportBrandingRetrieveResponse as ReportBrandingRetrieveResponse,
    type ReportBrandingReplaceResponse as ReportBrandingReplaceResponse,
    type ReportBrandingDeleteResponse as ReportBrandingDeleteResponse,
    type ReportBrandingRetrieveParams as ReportBrandingRetrieveParams,
    type ReportBrandingReplaceParams as ReportBrandingReplaceParams,
  };
}
