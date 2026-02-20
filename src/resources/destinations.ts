// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Destinations extends APIResource {
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
   * Update a destination. Requires scope: destination:update
   */
  update(
    id: string,
    body: DestinationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<DestinationUpdateResponse> {
    return this._client.patch(path`/rest/v1/destinations/${id}`, { body, ...options });
  }

  /**
   * List all destinations. Requires scope: destination:list
   */
  list(options?: RequestOptions): APIPromise<DestinationListResponse> {
    return this._client.get('/rest/v1/destinations', options);
  }

  /**
   * Delete a destination. Requires scope: destination:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<DestinationDeleteResponse> {
    return this._client.delete(path`/rest/v1/destinations/${id}`, options);
  }
}

export interface DestinationCreateResponse {
  id: string;

  createdAt: string;

  status: 'Disabled' | 'Enabled';

  type:
    | 'AWSEventBridge'
    | 'AWSKinesis'
    | 'AWSLambda'
    | 'AWSS3'
    | 'AWSSNS'
    | 'ActiveCampaignApi'
    | 'AmazonDSP'
    | 'Amplitude'
    | 'AppLovin'
    | 'ArtsAI'
    | 'Audiohook'
    | 'AzureBlob'
    | 'BasisPostback'
    | 'BingAds'
    | 'BingAdsWeb'
    | 'Braze'
    | 'ConvertABTestingEvent'
    | 'Customerio'
    | 'DomoWarehouse'
    | 'Facebook'
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
    | 'Podscribe'
    | 'QuantcastCAPI'
    | 'QuoraAds'
    | 'Reddit'
    | 'SnapchatAdsCapi'
    | 'Spotify'
    | 'StackAdaptAPI'
    | 'Taboola'
    | 'Tatari'
    | 'TheTradeDesk'
    | 'TikTok'
    | 'Viant'
    | 'Vibe'
    | 'Woopra'
    | 'XAds'
    | 'Zendesk'
    | 'ZoomInfo';

  name?: string | null;

  updatedAt?: string | null;
}

export interface DestinationRetrieveResponse {
  id: string;

  createdAt: string;

  status: 'Disabled' | 'Enabled';

  type:
    | 'AWSEventBridge'
    | 'AWSKinesis'
    | 'AWSLambda'
    | 'AWSS3'
    | 'AWSSNS'
    | 'ActiveCampaignApi'
    | 'AmazonDSP'
    | 'Amplitude'
    | 'AppLovin'
    | 'ArtsAI'
    | 'Audiohook'
    | 'AzureBlob'
    | 'BasisPostback'
    | 'BingAds'
    | 'BingAdsWeb'
    | 'Braze'
    | 'ConvertABTestingEvent'
    | 'Customerio'
    | 'DomoWarehouse'
    | 'Facebook'
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
    | 'Podscribe'
    | 'QuantcastCAPI'
    | 'QuoraAds'
    | 'Reddit'
    | 'SnapchatAdsCapi'
    | 'Spotify'
    | 'StackAdaptAPI'
    | 'Taboola'
    | 'Tatari'
    | 'TheTradeDesk'
    | 'TikTok'
    | 'Viant'
    | 'Vibe'
    | 'Woopra'
    | 'XAds'
    | 'Zendesk'
    | 'ZoomInfo';

  name?: string | null;

  updatedAt?: string | null;
}

export interface DestinationUpdateResponse {
  id: string;

  createdAt: string;

  status: 'Disabled' | 'Enabled';

  type:
    | 'AWSEventBridge'
    | 'AWSKinesis'
    | 'AWSLambda'
    | 'AWSS3'
    | 'AWSSNS'
    | 'ActiveCampaignApi'
    | 'AmazonDSP'
    | 'Amplitude'
    | 'AppLovin'
    | 'ArtsAI'
    | 'Audiohook'
    | 'AzureBlob'
    | 'BasisPostback'
    | 'BingAds'
    | 'BingAdsWeb'
    | 'Braze'
    | 'ConvertABTestingEvent'
    | 'Customerio'
    | 'DomoWarehouse'
    | 'Facebook'
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
    | 'Podscribe'
    | 'QuantcastCAPI'
    | 'QuoraAds'
    | 'Reddit'
    | 'SnapchatAdsCapi'
    | 'Spotify'
    | 'StackAdaptAPI'
    | 'Taboola'
    | 'Tatari'
    | 'TheTradeDesk'
    | 'TikTok'
    | 'Viant'
    | 'Vibe'
    | 'Woopra'
    | 'XAds'
    | 'Zendesk'
    | 'ZoomInfo';

  name?: string | null;

  updatedAt?: string | null;
}

export interface DestinationListResponse {
  entities: Array<DestinationListResponse.Entity>;
}

export namespace DestinationListResponse {
  export interface Entity {
    id: string;

    createdAt: string;

    status: 'Disabled' | 'Enabled';

    type:
      | 'AWSEventBridge'
      | 'AWSKinesis'
      | 'AWSLambda'
      | 'AWSS3'
      | 'AWSSNS'
      | 'ActiveCampaignApi'
      | 'AmazonDSP'
      | 'Amplitude'
      | 'AppLovin'
      | 'ArtsAI'
      | 'Audiohook'
      | 'AzureBlob'
      | 'BasisPostback'
      | 'BingAds'
      | 'BingAdsWeb'
      | 'Braze'
      | 'ConvertABTestingEvent'
      | 'Customerio'
      | 'DomoWarehouse'
      | 'Facebook'
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
      | 'Podscribe'
      | 'QuantcastCAPI'
      | 'QuoraAds'
      | 'Reddit'
      | 'SnapchatAdsCapi'
      | 'Spotify'
      | 'StackAdaptAPI'
      | 'Taboola'
      | 'Tatari'
      | 'TheTradeDesk'
      | 'TikTok'
      | 'Viant'
      | 'Vibe'
      | 'Woopra'
      | 'XAds'
      | 'Zendesk'
      | 'ZoomInfo';

    name?: string | null;

    updatedAt?: string | null;
  }
}

export type DestinationDeleteResponse = boolean;

export interface DestinationCreateParams {
  type:
    | 'AWSEventBridge'
    | 'AWSKinesis'
    | 'AWSLambda'
    | 'AWSS3'
    | 'AWSSNS'
    | 'ActiveCampaignApi'
    | 'AmazonDSP'
    | 'Amplitude'
    | 'AppLovin'
    | 'ArtsAI'
    | 'Audiohook'
    | 'AzureBlob'
    | 'BasisPostback'
    | 'BingAds'
    | 'BingAdsWeb'
    | 'Braze'
    | 'ConvertABTestingEvent'
    | 'Customerio'
    | 'DomoWarehouse'
    | 'Facebook'
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
    | 'Podscribe'
    | 'QuantcastCAPI'
    | 'QuoraAds'
    | 'Reddit'
    | 'SnapchatAdsCapi'
    | 'Spotify'
    | 'StackAdaptAPI'
    | 'Taboola'
    | 'Tatari'
    | 'TheTradeDesk'
    | 'TikTok'
    | 'Viant'
    | 'Vibe'
    | 'Woopra'
    | 'XAds'
    | 'Zendesk'
    | 'ZoomInfo';

  name?: string | null;
}

export interface DestinationUpdateParams {
  status: 'Disabled' | 'Enabled';

  facebookConversionAPIKey?: string | null;

  facebookPixelId?: string | null;

  g4AnalyticsApiKey?: string | null;

  g4AnalyticsMeasurementId?: string | null;

  g4AnalyticsTrackOnPage?: boolean | null;

  hashingSalt?: string | null;

  httpDestinationUrl?: string | null;

  limitedToSourceIds?: Array<string> | null;

  managerGoogleCustomerId?: string | null;

  name?: string | null;

  projectAPIKey?: string | null;

  projectToken?: string | null;

  selectedAccountId?: string | null;

  settings?: { [key: string]: unknown } | null;
}

export declare namespace Destinations {
  export {
    type DestinationCreateResponse as DestinationCreateResponse,
    type DestinationRetrieveResponse as DestinationRetrieveResponse,
    type DestinationUpdateResponse as DestinationUpdateResponse,
    type DestinationListResponse as DestinationListResponse,
    type DestinationDeleteResponse as DestinationDeleteResponse,
    type DestinationCreateParams as DestinationCreateParams,
    type DestinationUpdateParams as DestinationUpdateParams,
  };
}
