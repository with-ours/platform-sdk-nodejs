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
   * it is issued. Terminal certificate failures include `certificateFailure` with a
   * provider code, explanation, and failed validation domains; a successful status
   * read still returns HTTP 200. DNS blockers can coexist with a certificate
   * failure. Refresh does not restart a terminal failed request; contact support
   * after remediation. The setup is `null` until created. Requires scope:
   * `distributionTenant:find`. Requires API-key scope or current OAuth user
   * permission: distributionTenant:find
   */
  status(options?: RequestOptions): APIPromise<CustomDomainStatusResponse> {
    return this._client.get('/rest/v1/custom-domains/setup', options);
  }

  /**
   * Creates the account custom-domain setup and returns its `setupStatus` lifecycle
   * guidance with `certificateFailure: null`. Each account can have one setup; an
   * existing setup returns HTTP 409. Requires scope: `distributionTenant:create`.
   * Requires API-key scope or current OAuth user permission:
   * distributionTenant:create
   */
  create(options?: RequestOptions): APIPromise<CustomDomainCreateResponse> {
    return this._client.post('/rest/v1/custom-domains', options);
  }

  /**
   * Replaces the full custom-domain list for this account and returns `setupStatus`
   * lifecycle guidance. The setup `id` is the path identifier. The account allowance
   * is returned as `domainLimit` in the setup response (10 by default, up to 99 with
   * an increased allowance). An empty `domains` list removes all custom domains.
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
   * configuring the required CNAME or after the certificate is issued. It does not
   * restart a terminal failed certificate request; contact support after correcting
   * the reported problem. Requires scope: `distributionTenant:update`. Requires
   * API-key scope or current OAuth user permission: distributionTenant:update
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
     * Current terminal certificate failure. Null for new, pending, or issued requests;
     * independent of DNS lifecycle blockers.
     */
    certificateFailure: Setup.CertificateFailure | null;

    /**
     * Managed certificate issuance status.
     */
    certificateStatus: string | null;

    /**
     * ISO 8601 timestamp when the setup was created.
     */
    createdAt: string | null;

    /**
     * Maximum number of custom domains this account can attach.
     */
    domainLimit: number;

    /**
     * Custom domains attached to the setup.
     */
    domains: Array<Setup.Domain>;

    /**
     * Whether the setup is enabled to serve traffic.
     */
    enabled: boolean;

    /**
     * Current custom-domain setup progress and next action.
     */
    setupStatus: Setup.SetupStatus;

    /**
     * Delivery deployment status, or null when unavailable.
     */
    status: string | null;

    /**
     * ISO 8601 timestamp when the setup was last updated.
     */
    updatedAt: string | null;
  }

  export namespace Setup {
    /**
     * Current terminal certificate failure. Null for new, pending, or issued requests;
     * independent of DNS lifecycle blockers.
     */
    export interface CertificateFailure {
      /**
       * Certificate failure reason, such as CAA_ERROR when DNS CAA records do not
       * authorize the issuer. Other values may appear. Null when unavailable.
       */
      code: string | null;

      /**
       * Customer domains with failed certificate validation, not individually proven CAA
       * policy defects. An empty list means none were identified.
       */
      domains: Array<string>;

      /**
       * Certificate failure explanation and next steps.
       */
      message: string;
    }

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
      /**
       * Custom domains whose DNS currently blocks setup. Empty when DNS is not the
       * blocker.
       */
      blockingDomains: Array<string>;

      /**
       * Whether every custom domain is ready to serve traffic.
       */
      isReady: boolean;

      /**
       * Customer-facing explanation of the current stage.
       */
      message: string;

      /**
       * Recommended next step to move setup forward.
       */
      nextAction:
        'ADD_DOMAINS' | 'CONFIGURE_DNS' | 'RECONCILE_CERTIFICATE' | 'WAIT' | 'CONTACT_SUPPORT' | 'NONE';

      /**
       * Current setup stage. READY means every custom domain can serve traffic.
       */
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
     * Current terminal certificate failure. Null for new, pending, or issued requests;
     * independent of DNS lifecycle blockers.
     */
    certificateFailure: Setup.CertificateFailure | null;

    /**
     * Managed certificate issuance status.
     */
    certificateStatus: string | null;

    /**
     * ISO 8601 timestamp when the setup was created.
     */
    createdAt: string | null;

    /**
     * Maximum number of custom domains this account can attach.
     */
    domainLimit: number;

    /**
     * Custom domains attached to the setup.
     */
    domains: Array<Setup.Domain>;

    /**
     * Whether the setup is enabled to serve traffic.
     */
    enabled: boolean;

    /**
     * Current custom-domain setup progress and next action.
     */
    setupStatus: Setup.SetupStatus;

    /**
     * Delivery deployment status, or null when unavailable.
     */
    status: string | null;

    /**
     * ISO 8601 timestamp when the setup was last updated.
     */
    updatedAt: string | null;
  }

  export namespace Setup {
    /**
     * Current terminal certificate failure. Null for new, pending, or issued requests;
     * independent of DNS lifecycle blockers.
     */
    export interface CertificateFailure {
      /**
       * Certificate failure reason, such as CAA_ERROR when DNS CAA records do not
       * authorize the issuer. Other values may appear. Null when unavailable.
       */
      code: string | null;

      /**
       * Customer domains with failed certificate validation, not individually proven CAA
       * policy defects. An empty list means none were identified.
       */
      domains: Array<string>;

      /**
       * Certificate failure explanation and next steps.
       */
      message: string;
    }

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
      /**
       * Custom domains whose DNS currently blocks setup. Empty when DNS is not the
       * blocker.
       */
      blockingDomains: Array<string>;

      /**
       * Whether every custom domain is ready to serve traffic.
       */
      isReady: boolean;

      /**
       * Customer-facing explanation of the current stage.
       */
      message: string;

      /**
       * Recommended next step to move setup forward.
       */
      nextAction:
        'ADD_DOMAINS' | 'CONFIGURE_DNS' | 'RECONCILE_CERTIFICATE' | 'WAIT' | 'CONTACT_SUPPORT' | 'NONE';

      /**
       * Current setup stage. READY means every custom domain can serve traffic.
       */
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
     * Current terminal certificate failure. Null for new, pending, or issued requests;
     * independent of DNS lifecycle blockers.
     */
    certificateFailure: Setup.CertificateFailure | null;

    /**
     * Managed certificate issuance status.
     */
    certificateStatus: string | null;

    /**
     * ISO 8601 timestamp when the setup was created.
     */
    createdAt: string | null;

    /**
     * Maximum number of custom domains this account can attach.
     */
    domainLimit: number;

    /**
     * Custom domains attached to the setup.
     */
    domains: Array<Setup.Domain>;

    /**
     * Whether the setup is enabled to serve traffic.
     */
    enabled: boolean;

    /**
     * Current custom-domain setup progress and next action.
     */
    setupStatus: Setup.SetupStatus;

    /**
     * Delivery deployment status, or null when unavailable.
     */
    status: string | null;

    /**
     * ISO 8601 timestamp when the setup was last updated.
     */
    updatedAt: string | null;
  }

  export namespace Setup {
    /**
     * Current terminal certificate failure. Null for new, pending, or issued requests;
     * independent of DNS lifecycle blockers.
     */
    export interface CertificateFailure {
      /**
       * Certificate failure reason, such as CAA_ERROR when DNS CAA records do not
       * authorize the issuer. Other values may appear. Null when unavailable.
       */
      code: string | null;

      /**
       * Customer domains with failed certificate validation, not individually proven CAA
       * policy defects. An empty list means none were identified.
       */
      domains: Array<string>;

      /**
       * Certificate failure explanation and next steps.
       */
      message: string;
    }

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
      /**
       * Custom domains whose DNS currently blocks setup. Empty when DNS is not the
       * blocker.
       */
      blockingDomains: Array<string>;

      /**
       * Whether every custom domain is ready to serve traffic.
       */
      isReady: boolean;

      /**
       * Customer-facing explanation of the current stage.
       */
      message: string;

      /**
       * Recommended next step to move setup forward.
       */
      nextAction:
        'ADD_DOMAINS' | 'CONFIGURE_DNS' | 'RECONCILE_CERTIFICATE' | 'WAIT' | 'CONTACT_SUPPORT' | 'NONE';

      /**
       * Current setup stage. READY means every custom domain can serve traffic.
       */
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
     * Current terminal certificate failure. Null for new, pending, or issued requests;
     * independent of DNS lifecycle blockers.
     */
    certificateFailure: Setup.CertificateFailure | null;

    /**
     * Managed certificate issuance status.
     */
    certificateStatus: string | null;

    /**
     * ISO 8601 timestamp when the setup was created.
     */
    createdAt: string | null;

    /**
     * Maximum number of custom domains this account can attach.
     */
    domainLimit: number;

    /**
     * Custom domains attached to the setup.
     */
    domains: Array<Setup.Domain>;

    /**
     * Whether the setup is enabled to serve traffic.
     */
    enabled: boolean;

    /**
     * Current custom-domain setup progress and next action.
     */
    setupStatus: Setup.SetupStatus;

    /**
     * Delivery deployment status, or null when unavailable.
     */
    status: string | null;

    /**
     * ISO 8601 timestamp when the setup was last updated.
     */
    updatedAt: string | null;
  }

  export namespace Setup {
    /**
     * Current terminal certificate failure. Null for new, pending, or issued requests;
     * independent of DNS lifecycle blockers.
     */
    export interface CertificateFailure {
      /**
       * Certificate failure reason, such as CAA_ERROR when DNS CAA records do not
       * authorize the issuer. Other values may appear. Null when unavailable.
       */
      code: string | null;

      /**
       * Customer domains with failed certificate validation, not individually proven CAA
       * policy defects. An empty list means none were identified.
       */
      domains: Array<string>;

      /**
       * Certificate failure explanation and next steps.
       */
      message: string;
    }

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
      /**
       * Custom domains whose DNS currently blocks setup. Empty when DNS is not the
       * blocker.
       */
      blockingDomains: Array<string>;

      /**
       * Whether every custom domain is ready to serve traffic.
       */
      isReady: boolean;

      /**
       * Customer-facing explanation of the current stage.
       */
      message: string;

      /**
       * Recommended next step to move setup forward.
       */
      nextAction:
        'ADD_DOMAINS' | 'CONFIGURE_DNS' | 'RECONCILE_CERTIFICATE' | 'WAIT' | 'CONTACT_SUPPORT' | 'NONE';

      /**
       * Current setup stage. READY means every custom domain can serve traffic.
       */
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
   * Replacement list of up to 99 custom domains, subject to the account's
   * domainLimit (10 by default). An empty list removes all custom domains. Domains
   * under oursprivacy.com are rejected.
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
