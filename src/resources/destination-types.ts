// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class DestinationTypes extends APIResource {
  /**
   * Lists every destination type the platform supports, with its human-readable
   * label, capability flags (oauth, listsAccounts, supportsRenamedEvents), and the
   * settings descriptor used to configure a destination of that type.
   * Account-agnostic — the response is the same for every API key. Requires scope:
   * destination:list
   */
  list(options?: RequestOptions): APIPromise<DestinationTypeListResponse> {
    return this._client.get('/rest/v1/destination-types', options);
  }

  /**
   * Fetch the descriptor for a single destination type by its identifier (e.g.
   * `Klaviyo`, `Facebook`, `GoogleDataManagerEventIngest`). Returns 404 if the
   * identifier is unknown. Requires scope: destination:list
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<DestinationTypeRetrieveResponse> {
    return this._client.get(path`/rest/v1/destination-types/${id}`, options);
  }
}

export interface DestinationTypeListResponse {
  entities: Array<DestinationTypeListResponse.Entity>;
}

export namespace DestinationTypeListResponse {
  export interface Entity {
    id:
      | 'Audiohook'
      | 'BasisPostback'
      | 'OursSyntheticData'
      | 'FullContact'
      | 'ZoomInfo'
      | 'TheTradeDesk'
      | 'Braze'
      | 'LiveIntent'
      | 'ConvertABTestingEvent'
      | 'Customerio'
      | 'BingAds'
      | 'BingAdsWeb'
      | 'HTTPDestination'
      | 'Woopra'
      | 'HTTPCustomRequest'
      | 'Google'
      | 'GoogleAdsServerContainer'
      | 'G4Analytics'
      | 'GA4ServerProxy'
      | 'GA4MeasurementProtocol'
      | 'GoogleAds360'
      | 'Facebook'
      | 'Mixpanel'
      | 'Amplitude'
      | 'TikTok'
      | 'Reddit'
      | 'Podscribe'
      | 'Pinterest'
      | 'Mailchimp'
      | 'AWSKinesis'
      | 'AWSLambda'
      | 'GooglePubSub'
      | 'LinkedInAdsCAPI'
      | 'ActiveCampaignApi'
      | 'StackAdaptAPI'
      | 'Hubspot'
      | 'Klaviyo'
      | 'XAds'
      | 'QuoraAds'
      | 'SnapchatAdsCapi'
      | 'Partnerize'
      | 'NextdoorAds'
      | 'Tatari'
      | 'Viant'
      | 'Impact'
      | 'Spotify'
      | 'Taboola'
      | 'AmazonDSP'
      | 'AppLovin'
      | 'IHeartMediaMagellan'
      | 'Vibe'
      | 'GoogleDataManagerEventIngest'
      | 'Zendesk'
      | 'Iterable'
      | 'ArtsAI'
      | 'QuantcastCAPI'
      | 'FloodlightSGTM'
      | 'VWO'
      | 'Attentive'
      | 'Admitad'
      | 'Plausible'
      | 'PostHog'
      | 'RokuCAPI'
      | 'Everflow'
      | 'BeeswaxPostback'
      | 'AdobeAnalytics';

    capabilities: Entity.Capabilities;

    label: string;

    settings: Array<
      | Entity.UnionMember0
      | Entity.UnionMember1
      | Entity.UnionMember2
      | Entity.UnionMember3
      | Entity.UnionMember4
    >;

    status: 'deprecated' | 'ga';
  }

  export namespace Entity {
    export interface Capabilities {
      listsAccounts: boolean;

      oauth: boolean;

      supportsRenamedEvents: boolean;
    }

    export interface UnionMember0 {
      key: string;

      /**
       * Informational display message only. Do not send this key in POST or PATCH
       * settings.
       */
      label: string;

      type: 'Alert';
    }

    export interface UnionMember1 {
      key: string;

      label: string;

      options: Array<UnionMember1.Option>;

      type: 'Select';

      required?: boolean | null;

      sublabel?: string | null;
    }

    export namespace UnionMember1 {
      export interface Option {
        label: string;

        value: string;
      }
    }

    export interface UnionMember2 {
      key: string;

      label: string;

      type: 'Switch';

      defaultValue?: boolean | null;

      required?: boolean | null;

      sublabel?: string | null;
    }

    export interface UnionMember3 {
      key: string;

      label: string;

      type: 'GenericOauth';

      sublabel?: string | null;
    }

    export interface UnionMember4 {
      key: string;

      label: string;

      placeholder: string;

      type: 'Text' | 'Secret';

      required?: boolean | null;

      sublabel?: string | null;
    }
  }
}

export interface DestinationTypeRetrieveResponse {
  id:
    | 'Audiohook'
    | 'BasisPostback'
    | 'OursSyntheticData'
    | 'FullContact'
    | 'ZoomInfo'
    | 'TheTradeDesk'
    | 'Braze'
    | 'LiveIntent'
    | 'ConvertABTestingEvent'
    | 'Customerio'
    | 'BingAds'
    | 'BingAdsWeb'
    | 'HTTPDestination'
    | 'Woopra'
    | 'HTTPCustomRequest'
    | 'Google'
    | 'GoogleAdsServerContainer'
    | 'G4Analytics'
    | 'GA4ServerProxy'
    | 'GA4MeasurementProtocol'
    | 'GoogleAds360'
    | 'Facebook'
    | 'Mixpanel'
    | 'Amplitude'
    | 'TikTok'
    | 'Reddit'
    | 'Podscribe'
    | 'Pinterest'
    | 'Mailchimp'
    | 'AWSKinesis'
    | 'AWSLambda'
    | 'GooglePubSub'
    | 'LinkedInAdsCAPI'
    | 'ActiveCampaignApi'
    | 'StackAdaptAPI'
    | 'Hubspot'
    | 'Klaviyo'
    | 'XAds'
    | 'QuoraAds'
    | 'SnapchatAdsCapi'
    | 'Partnerize'
    | 'NextdoorAds'
    | 'Tatari'
    | 'Viant'
    | 'Impact'
    | 'Spotify'
    | 'Taboola'
    | 'AmazonDSP'
    | 'AppLovin'
    | 'IHeartMediaMagellan'
    | 'Vibe'
    | 'GoogleDataManagerEventIngest'
    | 'Zendesk'
    | 'Iterable'
    | 'ArtsAI'
    | 'QuantcastCAPI'
    | 'FloodlightSGTM'
    | 'VWO'
    | 'Attentive'
    | 'Admitad'
    | 'Plausible'
    | 'PostHog'
    | 'RokuCAPI'
    | 'Everflow'
    | 'BeeswaxPostback'
    | 'AdobeAnalytics';

  capabilities: DestinationTypeRetrieveResponse.Capabilities;

  label: string;

  settings: Array<
    | DestinationTypeRetrieveResponse.UnionMember0
    | DestinationTypeRetrieveResponse.UnionMember1
    | DestinationTypeRetrieveResponse.UnionMember2
    | DestinationTypeRetrieveResponse.UnionMember3
    | DestinationTypeRetrieveResponse.UnionMember4
  >;

  status: 'deprecated' | 'ga';
}

export namespace DestinationTypeRetrieveResponse {
  export interface Capabilities {
    listsAccounts: boolean;

    oauth: boolean;

    supportsRenamedEvents: boolean;
  }

  export interface UnionMember0 {
    key: string;

    /**
     * Informational display message only. Do not send this key in POST or PATCH
     * settings.
     */
    label: string;

    type: 'Alert';
  }

  export interface UnionMember1 {
    key: string;

    label: string;

    options: Array<UnionMember1.Option>;

    type: 'Select';

    required?: boolean | null;

    sublabel?: string | null;
  }

  export namespace UnionMember1 {
    export interface Option {
      label: string;

      value: string;
    }
  }

  export interface UnionMember2 {
    key: string;

    label: string;

    type: 'Switch';

    defaultValue?: boolean | null;

    required?: boolean | null;

    sublabel?: string | null;
  }

  export interface UnionMember3 {
    key: string;

    label: string;

    type: 'GenericOauth';

    sublabel?: string | null;
  }

  export interface UnionMember4 {
    key: string;

    label: string;

    placeholder: string;

    type: 'Text' | 'Secret';

    required?: boolean | null;

    sublabel?: string | null;
  }
}

export declare namespace DestinationTypes {
  export {
    type DestinationTypeListResponse as DestinationTypeListResponse,
    type DestinationTypeRetrieveResponse as DestinationTypeRetrieveResponse,
  };
}
