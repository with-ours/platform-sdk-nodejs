// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Destinations extends APIResource {
  /**
   * List all destinations. Requires scope: destination:list
   */
  list(
    query: DestinationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DestinationListResponsesCursor, DestinationListResponse> {
    return this._client.getAPIList('/rest/v1/destinations', Cursor<DestinationListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Create a new destination. Requires scope: destination:create
   */
  create(body: DestinationCreateParams, options?: RequestOptions): APIPromise<DestinationCreateResponse> {
    return this._client.post('/rest/v1/destinations', { body, ...options });
  }

  /**
   * Find a single destination by ID. Requires scope: destination:find
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<DestinationRetrieveResponse> {
    return this._client.get(path`/rest/v1/destinations/${id}`, options);
  }

  /**
   * Partially update a destination. Only the fields you send are changed; omitted
   * fields are unchanged. The `settings` object is patch-only: omitted keys keep
   * their current value, and send `null` to clear a specific setting. Requires
   * scope: destination:update
   */
  update(
    id: string,
    body: DestinationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<DestinationUpdateResponse> {
    return this._client.patch(path`/rest/v1/destinations/${id}`, { body, ...options });
  }

  /**
   * Delete a destination. Requires scope: destination:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<DestinationDeleteResponse> {
    return this._client.delete(path`/rest/v1/destinations/${id}`, options);
  }

  /**
   * Lists every destination type the platform supports, with its human-readable
   * label, capability flags (oauth, listsAccounts, supportsRenamedEvents), and the
   * settings descriptor used to configure a destination of that type.
   * Account-agnostic — the response is the same for every API key. Filter
   * client-side to find a specific type (e.g. `Klaviyo`, `Facebook`). Requires
   * scope: destination:list
   */
  types(options?: RequestOptions): APIPromise<DestinationTypesResponse> {
    return this._client.get('/rest/v1/destinations/types', options);
  }
}

export type DestinationListResponsesCursor = Cursor<DestinationListResponse>;

export interface DestinationListResponse {
  id: string;

  createdAt: string;

  status: 'Disabled' | 'Enabled';

  /**
   * Destination type. Read responses may include warehouse or cloud-storage types
   * that are not creatable through POST /rest/v1/destinations.
   */
  type:
    | 'AWSEventBridge'
    | 'AWSKinesis'
    | 'AWSLambda'
    | 'AWSS3'
    | 'AWSSNS'
    | 'ActiveCampaignApi'
    | 'Admitad'
    | 'AdobeAnalytics'
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
    | 'DatabricksWarehouse'
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
    | 'MNTN'
    | 'Mailchimp'
    | 'Mixpanel'
    | 'NextdoorAds'
    | 'OpenAIAds'
    | 'OursSyntheticData'
    | 'Outbrain'
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
    | 'UniversalAds'
    | 'VWO'
    | 'Viant'
    | 'ViantCAPI'
    | 'Vibe'
    | 'Woopra'
    | 'XAds'
    | 'YelpCAPI'
    | 'Zendesk'
    | 'ZoomInfo';

  hashingSalt?: string | null;

  limitedToSourceIds?: Array<string> | null;

  name?: string | null;

  settings?: unknown | null;

  updatedAt?: string | null;
}

export interface DestinationCreateResponse {
  id: string;

  createdAt: string;

  status: 'Disabled' | 'Enabled';

  /**
   * Destination type. Read responses may include warehouse or cloud-storage types
   * that are not creatable through POST /rest/v1/destinations.
   */
  type:
    | 'AWSEventBridge'
    | 'AWSKinesis'
    | 'AWSLambda'
    | 'AWSS3'
    | 'AWSSNS'
    | 'ActiveCampaignApi'
    | 'Admitad'
    | 'AdobeAnalytics'
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
    | 'DatabricksWarehouse'
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
    | 'MNTN'
    | 'Mailchimp'
    | 'Mixpanel'
    | 'NextdoorAds'
    | 'OpenAIAds'
    | 'OursSyntheticData'
    | 'Outbrain'
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
    | 'UniversalAds'
    | 'VWO'
    | 'Viant'
    | 'ViantCAPI'
    | 'Vibe'
    | 'Woopra'
    | 'XAds'
    | 'YelpCAPI'
    | 'Zendesk'
    | 'ZoomInfo';

  hashingSalt?: string | null;

  limitedToSourceIds?: Array<string> | null;

  name?: string | null;

  settings?: unknown | null;

  updatedAt?: string | null;
}

export interface DestinationRetrieveResponse {
  id: string;

  createdAt: string;

  status: 'Disabled' | 'Enabled';

  /**
   * Destination type. Read responses may include warehouse or cloud-storage types
   * that are not creatable through POST /rest/v1/destinations.
   */
  type:
    | 'AWSEventBridge'
    | 'AWSKinesis'
    | 'AWSLambda'
    | 'AWSS3'
    | 'AWSSNS'
    | 'ActiveCampaignApi'
    | 'Admitad'
    | 'AdobeAnalytics'
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
    | 'DatabricksWarehouse'
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
    | 'MNTN'
    | 'Mailchimp'
    | 'Mixpanel'
    | 'NextdoorAds'
    | 'OpenAIAds'
    | 'OursSyntheticData'
    | 'Outbrain'
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
    | 'UniversalAds'
    | 'VWO'
    | 'Viant'
    | 'ViantCAPI'
    | 'Vibe'
    | 'Woopra'
    | 'XAds'
    | 'YelpCAPI'
    | 'Zendesk'
    | 'ZoomInfo';

  hashingSalt?: string | null;

  limitedToSourceIds?: Array<string> | null;

  name?: string | null;

  settings?: unknown | null;

  updatedAt?: string | null;
}

export interface DestinationUpdateResponse {
  id: string;

  createdAt: string;

  status: 'Disabled' | 'Enabled';

  /**
   * Destination type. Read responses may include warehouse or cloud-storage types
   * that are not creatable through POST /rest/v1/destinations.
   */
  type:
    | 'AWSEventBridge'
    | 'AWSKinesis'
    | 'AWSLambda'
    | 'AWSS3'
    | 'AWSSNS'
    | 'ActiveCampaignApi'
    | 'Admitad'
    | 'AdobeAnalytics'
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
    | 'DatabricksWarehouse'
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
    | 'MNTN'
    | 'Mailchimp'
    | 'Mixpanel'
    | 'NextdoorAds'
    | 'OpenAIAds'
    | 'OursSyntheticData'
    | 'Outbrain'
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
    | 'UniversalAds'
    | 'VWO'
    | 'Viant'
    | 'ViantCAPI'
    | 'Vibe'
    | 'Woopra'
    | 'XAds'
    | 'YelpCAPI'
    | 'Zendesk'
    | 'ZoomInfo';

  hashingSalt?: string | null;

  limitedToSourceIds?: Array<string> | null;

  name?: string | null;

  settings?: unknown | null;

  updatedAt?: string | null;
}

export type DestinationDeleteResponse = boolean;

export interface DestinationTypesResponse {
  entities: Array<DestinationTypesResponse.Entity>;
}

export namespace DestinationTypesResponse {
  export interface Entity {
    id:
      | 'Audiohook'
      | 'BasisPostback'
      | 'Outbrain'
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
      | 'AWSSNS'
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
      | 'ViantCAPI'
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
      | 'AdobeAnalytics'
      | 'UniversalAds'
      | 'OpenAIAds'
      | 'YelpCAPI'
      | 'MNTN';

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

export interface DestinationListParams extends CursorParams {
  /**
   * Filter destinations by status.
   */
  status?: 'Disabled' | 'Enabled';

  /**
   * Filter destinations by destination type.
   */
  type?:
    | 'AWSEventBridge'
    | 'AWSKinesis'
    | 'AWSLambda'
    | 'AWSS3'
    | 'AWSSNS'
    | 'ActiveCampaignApi'
    | 'Admitad'
    | 'AdobeAnalytics'
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
    | 'DatabricksWarehouse'
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
    | 'MNTN'
    | 'Mailchimp'
    | 'Mixpanel'
    | 'NextdoorAds'
    | 'OpenAIAds'
    | 'OursSyntheticData'
    | 'Outbrain'
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
    | 'UniversalAds'
    | 'VWO'
    | 'Viant'
    | 'ViantCAPI'
    | 'Vibe'
    | 'Woopra'
    | 'XAds'
    | 'YelpCAPI'
    | 'Zendesk'
    | 'ZoomInfo';
}

export interface DestinationCreateParams {
  /**
   * Event-dispatch destination type to create. Warehouse and cloud-storage
   * destination types may appear on read responses but are not creatable through
   * POST.
   */
  type:
    | 'Audiohook'
    | 'BasisPostback'
    | 'Outbrain'
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
    | 'AWSSNS'
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
    | 'ViantCAPI'
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
    | 'AdobeAnalytics'
    | 'UniversalAds'
    | 'OpenAIAds'
    | 'YelpCAPI'
    | 'MNTN';

  name?: string | null;

  /**
   * Per-type configuration keys and values. Call GET /rest/v1/destinations/types to
   * get the valid keys for your destination type.
   */
  settings?: unknown | null;
}

export interface DestinationUpdateParams {
  hashingSalt?: string | null;

  limitedToSourceIds?: Array<string> | null;

  name?: string | null;

  /**
   * Per-type configuration keys and values. Call GET /rest/v1/destinations/types to
   * get the valid keys for your destination type.
   */
  settings?: unknown | null;

  status?: 'Disabled' | 'Enabled' | null;
}

export declare namespace Destinations {
  export {
    type DestinationListResponse as DestinationListResponse,
    type DestinationCreateResponse as DestinationCreateResponse,
    type DestinationRetrieveResponse as DestinationRetrieveResponse,
    type DestinationUpdateResponse as DestinationUpdateResponse,
    type DestinationDeleteResponse as DestinationDeleteResponse,
    type DestinationTypesResponse as DestinationTypesResponse,
    type DestinationListResponsesCursor as DestinationListResponsesCursor,
    type DestinationListParams as DestinationListParams,
    type DestinationCreateParams as DestinationCreateParams,
    type DestinationUpdateParams as DestinationUpdateParams,
  };
}
