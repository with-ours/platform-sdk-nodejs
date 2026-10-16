// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class CustomDomains extends APIResource {
  /**
   * Returns the account custom-domain setup, observed DNS values, and `setupStatus`
   * lifecycle guidance, including readiness, blocking domains, and the next
   * recommended action. Reading status also advances certificate setup: it starts
   * certificate validation once DNS is configured and activates the certificate once
   * it is issued. The setup is `null` until created. Requires scope:
   * `distributionTenant:find`. Requires API-key scope or current OAuth user
   * permission: distributionTenant:find
   */
  status(options?: RequestOptions): APIPromise<CustomDomainStatusResponse> {
    return this._client.get('/rest/v1/custom-domains/setup', options);
  }

  /**
   * Creates the account custom-domain setup and returns its `setupStatus` lifecycle
   * guidance. Each account can have one setup; an existing setup returns HTTP 409.
   * Requires scope: `distributionTenant:create`. Requires API-key scope or current
   * OAuth user permission: distributionTenant:create
   */
  create(options?: RequestOptions): APIPromise<CustomDomainCreateResponse> {
    return this._client.post('/rest/v1/custom-domains', options);
  }

  /**
   * Replaces the full custom-domain list for this account and returns `setupStatus`
   * lifecycle guidance. The setup `id` is the path identifier. Each account can have
   * up to 10 custom domains. An empty `domains` list removes all custom domains.
   * Duplicate domains are rejected. Domains under `oursprivacy.com` are rejected.
   * Domain delivery and certificate settings are managed by Ours Privacy; DNS
   * changes are customer-managed. Requires scope: `distributionTenant:update`.
   * Requires API-key scope or current OAuth user permission:
   * distributionTenant:update
   */
  replace(
    id: string,
    body: CustomDomainReplaceParams,
    options?: RequestOptions,
  ): APIPromise<CustomDomainReplaceResponse> {
    return this._client.put(path`/rest/v1/custom-domains/${id}`, { body, ...options });
  }

  /**
   * Checks DNS and certificate status, applies any required certificate changes, and
   * returns updated `setupStatus` lifecycle guidance. Optional: reading the setup
   * status performs the same steps automatically. Use it to retry immediately after
   * configuring the required CNAME or after the certificate is issued. Requires
   * scope: `distributionTenant:update`. Requires API-key scope or current OAuth user
   * permission: distributionTenant:update
   */
  reconcileCertificate(
    id: string,
    options?: RequestOptions,
  ): APIPromise<CustomDomainReconcileCertificateResponse> {
    return this._client.post(path`/rest/v1/custom-domains/${id}/certificate-validation`, options);
  }
}

export interface CustomDomainStatusResponse {
  setup: CustomDomainStatusResponse.Setup | null;
}

export namespace CustomDomainStatusResponse {
  export interface Setup {
    /**
     * Custom-domain setup ID.
     */
    id: string;

    /**
     * Whether the managed certificate is attached to serve the custom domains.
     */
    certificateActive: boolean;

    /**
     * Managed certificate issuance status.
     */
    certificateStatus: string | null;

    createdAt: string | null;

    domains: Array<Setup.Domain>;

    enabled: boolean;

    /**
     * Current custom-domain setup progress and next action.
     */
    setupStatus: Setup.SetupStatus;

    status: string | null;

    updatedAt: string | null;
  }

  export namespace Setup {
    export interface Domain {
      /**
       * Required CNAME target for this domain.
       */
      cnameValue: string;

      /**
       * Whether DNS points to the required CNAME target.
       */
      dnsStatus: 'configured' | 'notConfigured' | 'wrongEndpoint' | 'error' | null;

      /**
       * DNS value currently observed for this domain.
       */
      dnsValue: string | null;

      /**
       * Custom domain attached to the account.
       */
      domain: string;

      /**
       * Domain attachment status.
       */
      status: 'active' | 'inactive';
    }

    /**
     * Current custom-domain setup progress and next action.
     */
    export interface SetupStatus {
      blockingDomains: Array<string>;

      isReady: boolean;

      message: string;

      nextAction:
        | 'ADD_DOMAINS'
        | 'CONFIGURE_DNS'
        | 'RECONCILE_CERTIFICATE'
        | 'WAIT'
        | 'CONTACT_SUPPORT'
        | 'NONE';

      state:
        | 'NO_DOMAINS'
        | 'DNS_REQUIRED'
        | 'CERTIFICATE_VALIDATION_REQUIRED'
        | 'CERTIFICATE_PENDING'
        | 'CERTIFICATE_ACTIVATION_REQUIRED'
        | 'DEPLOYING'
        | 'READY'
        | 'CERTIFICATE_FAILED'
        | 'DISABLED';
    }
  }
}

export interface CustomDomainCreateResponse {
  setup: CustomDomainCreateResponse.Setup;
}

export namespace CustomDomainCreateResponse {
  export interface Setup {
    /**
     * Custom-domain setup ID.
     */
    id: string;

    /**
     * Whether the managed certificate is attached to serve the custom domains.
     */
    certificateActive: boolean;

    /**
     * Managed certificate issuance status.
     */
    certificateStatus: string | null;

    createdAt: string | null;

    domains: Array<Setup.Domain>;

    enabled: boolean;

    /**
     * Current custom-domain setup progress and next action.
     */
    setupStatus: Setup.SetupStatus;

    status: string | null;

    updatedAt: string | null;
  }

  export namespace Setup {
    export interface Domain {
      /**
       * Required CNAME target for this domain.
       */
      cnameValue: string;

      /**
       * Whether DNS points to the required CNAME target.
       */
      dnsStatus: 'configured' | 'notConfigured' | 'wrongEndpoint' | 'error' | null;

      /**
       * DNS value currently observed for this domain.
       */
      dnsValue: string | null;

      /**
       * Custom domain attached to the account.
       */
      domain: string;

      /**
       * Domain attachment status.
       */
      status: 'active' | 'inactive';
    }

    /**
     * Current custom-domain setup progress and next action.
     */
    export interface SetupStatus {
      blockingDomains: Array<string>;

      isReady: boolean;

      message: string;

      nextAction:
        | 'ADD_DOMAINS'
        | 'CONFIGURE_DNS'
        | 'RECONCILE_CERTIFICATE'
        | 'WAIT'
        | 'CONTACT_SUPPORT'
        | 'NONE';

      state:
        | 'NO_DOMAINS'
        | 'DNS_REQUIRED'
        | 'CERTIFICATE_VALIDATION_REQUIRED'
        | 'CERTIFICATE_PENDING'
        | 'CERTIFICATE_ACTIVATION_REQUIRED'
        | 'DEPLOYING'
        | 'READY'
        | 'CERTIFICATE_FAILED'
        | 'DISABLED';
    }
  }
}

export interface CustomDomainReplaceResponse {
  setup: CustomDomainReplaceResponse.Setup | null;
}

export namespace CustomDomainReplaceResponse {
  export interface Setup {
    /**
     * Custom-domain setup ID.
     */
    id: string;

    /**
     * Whether the managed certificate is attached to serve the custom domains.
     */
    certificateActive: boolean;

    /**
     * Managed certificate issuance status.
     */
    certificateStatus: string | null;

    createdAt: string | null;

    domains: Array<Setup.Domain>;

    enabled: boolean;

    /**
     * Current custom-domain setup progress and next action.
     */
    setupStatus: Setup.SetupStatus;

    status: string | null;

    updatedAt: string | null;
  }

  export namespace Setup {
    export interface Domain {
      /**
       * Required CNAME target for this domain.
       */
      cnameValue: string;

      /**
       * Whether DNS points to the required CNAME target.
       */
      dnsStatus: 'configured' | 'notConfigured' | 'wrongEndpoint' | 'error' | null;

      /**
       * DNS value currently observed for this domain.
       */
      dnsValue: string | null;

      /**
       * Custom domain attached to the account.
       */
      domain: string;

      /**
       * Domain attachment status.
       */
      status: 'active' | 'inactive';
    }

    /**
     * Current custom-domain setup progress and next action.
     */
    export interface SetupStatus {
      blockingDomains: Array<string>;

      isReady: boolean;

      message: string;

      nextAction:
        | 'ADD_DOMAINS'
        | 'CONFIGURE_DNS'
        | 'RECONCILE_CERTIFICATE'
        | 'WAIT'
        | 'CONTACT_SUPPORT'
        | 'NONE';

      state:
        | 'NO_DOMAINS'
        | 'DNS_REQUIRED'
        | 'CERTIFICATE_VALIDATION_REQUIRED'
        | 'CERTIFICATE_PENDING'
        | 'CERTIFICATE_ACTIVATION_REQUIRED'
        | 'DEPLOYING'
        | 'READY'
        | 'CERTIFICATE_FAILED'
        | 'DISABLED';
    }
  }
}

export interface CustomDomainReconcileCertificateResponse {
  setup: CustomDomainReconcileCertificateResponse.Setup | null;
}

export namespace CustomDomainReconcileCertificateResponse {
  export interface Setup {
    /**
     * Custom-domain setup ID.
     */
    id: string;

    /**
     * Whether the managed certificate is attached to serve the custom domains.
     */
    certificateActive: boolean;

    /**
     * Managed certificate issuance status.
     */
    certificateStatus: string | null;

    createdAt: string | null;

    domains: Array<Setup.Domain>;

    enabled: boolean;

    /**
     * Current custom-domain setup progress and next action.
     */
    setupStatus: Setup.SetupStatus;

    status: string | null;

    updatedAt: string | null;
  }

  export namespace Setup {
    export interface Domain {
      /**
       * Required CNAME target for this domain.
       */
      cnameValue: string;

      /**
       * Whether DNS points to the required CNAME target.
       */
      dnsStatus: 'configured' | 'notConfigured' | 'wrongEndpoint' | 'error' | null;

      /**
       * DNS value currently observed for this domain.
       */
      dnsValue: string | null;

      /**
       * Custom domain attached to the account.
       */
      domain: string;

      /**
       * Domain attachment status.
       */
      status: 'active' | 'inactive';
    }

    /**
     * Current custom-domain setup progress and next action.
     */
    export interface SetupStatus {
      blockingDomains: Array<string>;

      isReady: boolean;

      message: string;

      nextAction:
        | 'ADD_DOMAINS'
        | 'CONFIGURE_DNS'
        | 'RECONCILE_CERTIFICATE'
        | 'WAIT'
        | 'CONTACT_SUPPORT'
        | 'NONE';

      state:
        | 'NO_DOMAINS'
        | 'DNS_REQUIRED'
        | 'CERTIFICATE_VALIDATION_REQUIRED'
        | 'CERTIFICATE_PENDING'
        | 'CERTIFICATE_ACTIVATION_REQUIRED'
        | 'DEPLOYING'
        | 'READY'
        | 'CERTIFICATE_FAILED'
        | 'DISABLED';
    }
  }
}

export interface CustomDomainReplaceParams {
  /**
   * Replacement list of up to 10 custom domains. An empty list removes all custom
   * domains. Domains under oursprivacy.com are rejected.
   */
  domains: Array<string>;
}

export declare namespace CustomDomains {
  export {
    type CustomDomainStatusResponse as CustomDomainStatusResponse,
    type CustomDomainCreateResponse as CustomDomainCreateResponse,
    type CustomDomainReplaceResponse as CustomDomainReplaceResponse,
    type CustomDomainReconcileCertificateResponse as CustomDomainReconcileCertificateResponse,
    type CustomDomainReplaceParams as CustomDomainReplaceParams,
  };
}
