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
  retrieve(
    id:
      | 'AWSEventBridge'
      | 'AWSKinesis'
      | 'AWSLambda'
      | 'AWSS3'
      | 'AWSSNS'
      | 'ActiveCampaignApi'
      | 'Admitad'
      | 'AmazonDSP'
      | 'Amplitude'
      | 'AppLovin'
      | 'ArtsAI'
      | 'Attentive'
      | 'Audiohook'
      | 'AzureBlob'
      | 'BasisPostback'
      | 'BeeswaxPostback'
      | 'BingAds'
      | 'BingAdsWeb'
      | 'Braze'
      | 'ConvertABTestingEvent'
      | 'Customerio'
      | 'DomoWarehouse'
      | 'Everflow'
      | 'Facebook'
      | 'FloodlightSGTM'
      | 'FullContact'
      | 'G4Analytics'
      | 'GA4MeasurementProtocol'
      | 'GA4ServerProxy'
      | 'Google'
      | 'GoogleAds360'
      | 'GoogleAdsServerContainer'
      | 'GoogleBigQuery'
      | 'GoogleBigQueryWarehouse'
      | 'GoogleDataManagerEventIngest'
      | 'GooglePubSub'
      | 'GoogleStorage'
      | 'HTTPCustomRequest'
      | 'HTTPDestination'
      | 'Hubspot'
      | 'IHeartMediaMagellan'
      | 'Impact'
      | 'Iterable'
      | 'Klaviyo'
      | 'LinkedInAdsCAPI'
      | 'LiveIntent'
      | 'LiveRampWarehouse'
      | 'Mailchimp'
      | 'Mixpanel'
      | 'NextdoorAds'
      | 'OursSyntheticData'
      | 'Partnerize'
      | 'Pinterest'
      | 'Plausible'
      | 'Podscribe'
      | 'PostHog'
      | 'QuantcastCAPI'
      | 'QuoraAds'
      | 'Reddit'
      | 'RokuCAPI'
      | 'SnapchatAdsCapi'
      | 'Spotify'
      | 'StackAdaptAPI'
      | 'Taboola'
      | 'Tatari'
      | 'TheTradeDesk'
      | 'TikTok'
      | 'VWO'
      | 'Viant'
      | 'Vibe'
      | 'Woopra'
      | 'XAds'
      | 'Zendesk'
      | 'ZoomInfo',
    options?: RequestOptions,
  ): APIPromise<DestinationTypeRetrieveResponse> {
    return this._client.get(path`/rest/v1/destination-types/${id}`, options);
  }
}

export interface DestinationTypeListResponse {
  entities: Array<DestinationTypeListResponse.Entity>;
}

export namespace DestinationTypeListResponse {
  export interface Entity {
    id:
      | 'AWSEventBridge'
      | 'AWSKinesis'
      | 'AWSLambda'
      | 'AWSS3'
      | 'AWSSNS'
      | 'ActiveCampaignApi'
      | 'Admitad'
      | 'AmazonDSP'
      | 'Amplitude'
      | 'AppLovin'
      | 'ArtsAI'
      | 'Attentive'
      | 'Audiohook'
      | 'AzureBlob'
      | 'BasisPostback'
      | 'BeeswaxPostback'
      | 'BingAds'
      | 'BingAdsWeb'
      | 'Braze'
      | 'ConvertABTestingEvent'
      | 'Customerio'
      | 'DomoWarehouse'
      | 'Everflow'
      | 'Facebook'
      | 'FloodlightSGTM'
      | 'FullContact'
      | 'G4Analytics'
      | 'GA4MeasurementProtocol'
      | 'GA4ServerProxy'
      | 'Google'
      | 'GoogleAds360'
      | 'GoogleAdsServerContainer'
      | 'GoogleBigQuery'
      | 'GoogleBigQueryWarehouse'
      | 'GoogleDataManagerEventIngest'
      | 'GooglePubSub'
      | 'GoogleStorage'
      | 'HTTPCustomRequest'
      | 'HTTPDestination'
      | 'Hubspot'
      | 'IHeartMediaMagellan'
      | 'Impact'
      | 'Iterable'
      | 'Klaviyo'
      | 'LinkedInAdsCAPI'
      | 'LiveIntent'
      | 'LiveRampWarehouse'
      | 'Mailchimp'
      | 'Mixpanel'
      | 'NextdoorAds'
      | 'OursSyntheticData'
      | 'Partnerize'
      | 'Pinterest'
      | 'Plausible'
      | 'Podscribe'
      | 'PostHog'
      | 'QuantcastCAPI'
      | 'QuoraAds'
      | 'Reddit'
      | 'RokuCAPI'
      | 'SnapchatAdsCapi'
      | 'Spotify'
      | 'StackAdaptAPI'
      | 'Taboola'
      | 'Tatari'
      | 'TheTradeDesk'
      | 'TikTok'
      | 'VWO'
      | 'Viant'
      | 'Vibe'
      | 'Woopra'
      | 'XAds'
      | 'Zendesk'
      | 'ZoomInfo';

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

      label: string;

      type: 'Alert' | 'GenericOauth' | 'Secret' | 'Select' | 'Switch' | 'Text';
    }

    export interface UnionMember1 {
      key: string;

      label: string;

      options: Array<UnionMember1.Option>;

      type: 'Alert' | 'GenericOauth' | 'Secret' | 'Select' | 'Switch' | 'Text';

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

      type: 'Alert' | 'GenericOauth' | 'Secret' | 'Select' | 'Switch' | 'Text';

      defaultValue?: boolean | null;

      required?: boolean | null;

      sublabel?: string | null;
    }

    export interface UnionMember3 {
      key: string;

      label: string;

      type: 'Alert' | 'GenericOauth' | 'Secret' | 'Select' | 'Switch' | 'Text';

      sublabel?: string | null;
    }

    export interface UnionMember4 {
      key: string;

      label: string;

      placeholder: string;

      type: 'Alert' | 'GenericOauth' | 'Secret' | 'Select' | 'Switch' | 'Text';

      required?: boolean | null;

      sublabel?: string | null;
    }
  }
}

export interface DestinationTypeRetrieveResponse {
  id:
    | 'AWSEventBridge'
    | 'AWSKinesis'
    | 'AWSLambda'
    | 'AWSS3'
    | 'AWSSNS'
    | 'ActiveCampaignApi'
    | 'Admitad'
    | 'AmazonDSP'
    | 'Amplitude'
    | 'AppLovin'
    | 'ArtsAI'
    | 'Attentive'
    | 'Audiohook'
    | 'AzureBlob'
    | 'BasisPostback'
    | 'BeeswaxPostback'
    | 'BingAds'
    | 'BingAdsWeb'
    | 'Braze'
    | 'ConvertABTestingEvent'
    | 'Customerio'
    | 'DomoWarehouse'
    | 'Everflow'
    | 'Facebook'
    | 'FloodlightSGTM'
    | 'FullContact'
    | 'G4Analytics'
    | 'GA4MeasurementProtocol'
    | 'GA4ServerProxy'
    | 'Google'
    | 'GoogleAds360'
    | 'GoogleAdsServerContainer'
    | 'GoogleBigQuery'
    | 'GoogleBigQueryWarehouse'
    | 'GoogleDataManagerEventIngest'
    | 'GooglePubSub'
    | 'GoogleStorage'
    | 'HTTPCustomRequest'
    | 'HTTPDestination'
    | 'Hubspot'
    | 'IHeartMediaMagellan'
    | 'Impact'
    | 'Iterable'
    | 'Klaviyo'
    | 'LinkedInAdsCAPI'
    | 'LiveIntent'
    | 'LiveRampWarehouse'
    | 'Mailchimp'
    | 'Mixpanel'
    | 'NextdoorAds'
    | 'OursSyntheticData'
    | 'Partnerize'
    | 'Pinterest'
    | 'Plausible'
    | 'Podscribe'
    | 'PostHog'
    | 'QuantcastCAPI'
    | 'QuoraAds'
    | 'Reddit'
    | 'RokuCAPI'
    | 'SnapchatAdsCapi'
    | 'Spotify'
    | 'StackAdaptAPI'
    | 'Taboola'
    | 'Tatari'
    | 'TheTradeDesk'
    | 'TikTok'
    | 'VWO'
    | 'Viant'
    | 'Vibe'
    | 'Woopra'
    | 'XAds'
    | 'Zendesk'
    | 'ZoomInfo';

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

    label: string;

    type: 'Alert' | 'GenericOauth' | 'Secret' | 'Select' | 'Switch' | 'Text';
  }

  export interface UnionMember1 {
    key: string;

    label: string;

    options: Array<UnionMember1.Option>;

    type: 'Alert' | 'GenericOauth' | 'Secret' | 'Select' | 'Switch' | 'Text';

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

    type: 'Alert' | 'GenericOauth' | 'Secret' | 'Select' | 'Switch' | 'Text';

    defaultValue?: boolean | null;

    required?: boolean | null;

    sublabel?: string | null;
  }

  export interface UnionMember3 {
    key: string;

    label: string;

    type: 'Alert' | 'GenericOauth' | 'Secret' | 'Select' | 'Switch' | 'Text';

    sublabel?: string | null;
  }

  export interface UnionMember4 {
    key: string;

    label: string;

    placeholder: string;

    type: 'Alert' | 'GenericOauth' | 'Secret' | 'Select' | 'Switch' | 'Text';

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
