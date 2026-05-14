// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Destinations extends APIResource {
  /**
   * List all destinations. Requires scope: destination:list
   */
  list(options?: RequestOptions): APIPromise<DestinationListResponse> {
    return this._client.get('/rest/v1/destinations', options);
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
   * fields are unchanged. The `settings` object is deep-merged into the existing
   * settings by default — keys you omit keep their current value. Pass
   * `?settings_strategy=replace` to wipe and replace the settings blob entirely.
   * Requires scope: destination:update
   */
  update(
    id: string,
    params: DestinationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<DestinationUpdateResponse> {
    const { settings_strategy, ...body } = params;
    return this._client.patch(path`/rest/v1/destinations/${id}`, {
      query: { settings_strategy },
      body,
      ...options,
    });
  }

  /**
   * Delete a destination. Requires scope: destination:delete
   */
  delete(id: string, options?: RequestOptions): APIPromise<DestinationDeleteResponse> {
    return this._client.delete(path`/rest/v1/destinations/${id}`, options);
  }
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

    settings?: unknown | null;

    updatedAt?: string | null;
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

  settings?: unknown | null;

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

  name?: string | null;

  updatedAt?: string | null;
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

  name?: string | null;
}

export interface DestinationUpdateParams {
  /**
   * Query param
   */
  settings_strategy?: 'merge' | 'replace';

  /**
   * Body param
   */
  facebookConversionAPIKey?: string | null;

  /**
   * Body param
   */
  facebookPixelId?: string | null;

  /**
   * Body param
   */
  g4AnalyticsApiKey?: string | null;

  /**
   * Body param
   */
  g4AnalyticsMeasurementId?: string | null;

  /**
   * Body param
   */
  g4AnalyticsTrackOnPage?: boolean | null;

  /**
   * Body param
   */
  hashingSalt?: string | null;

  /**
   * Body param
   */
  httpDestinationUrl?: string | null;

  /**
   * Body param
   */
  limitedToSourceIds?: Array<string> | null;

  /**
   * Body param
   */
  managerGoogleCustomerId?: string | null;

  /**
   * Body param
   */
  name?: string | null;

  /**
   * Body param
   */
  projectAPIKey?: string | null;

  /**
   * Body param
   */
  projectToken?: string | null;

  /**
   * Body param
   */
  selectedAccountId?: string | null;

  /**
   * Body param
   */
  settings?: unknown | null;

  /**
   * Body param
   */
  status?: 'Disabled' | 'Enabled' | null;
}

export declare namespace Destinations {
  export {
    type DestinationListResponse as DestinationListResponse,
    type DestinationCreateResponse as DestinationCreateResponse,
    type DestinationRetrieveResponse as DestinationRetrieveResponse,
    type DestinationUpdateResponse as DestinationUpdateResponse,
    type DestinationDeleteResponse as DestinationDeleteResponse,
    type DestinationCreateParams as DestinationCreateParams,
    type DestinationUpdateParams as DestinationUpdateParams,
  };
}
