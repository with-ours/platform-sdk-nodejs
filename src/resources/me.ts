// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Me extends APIResource {
  /**
   * Identify the authenticated credential. Requires no API-key scope or OAuth user
   * permission, so a narrow API key or a new OAuth connection can confirm it is
   * valid before calling other operations.
   */
  retrieve(options?: RequestOptions): APIPromise<MeRetrieveResponse> {
    return this._client.get('/rest/v1/me', options);
  }
}

export interface MeRetrieveResponse {
  /**
   * ISO-8601 expiration of the API key or OAuth access token, or null.
   */
  expiresAt: string | null;

  /**
   * Organization the credential acts for.
   */
  organizationId: string;

  /**
   * Display name of the organization, or null when unavailable.
   */
  organizationName: string | null;
}

export declare namespace Me {
  export { type MeRetrieveResponse as MeRetrieveResponse };
}
