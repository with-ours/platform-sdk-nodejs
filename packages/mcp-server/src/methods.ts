// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.destinations.create',
    fullyQualifiedName: 'destinations.create',
    httpMethod: 'post',
    httpPath: '/rest/v1/destinations',
  },
  {
    clientCallName: 'client.destinations.retrieve',
    fullyQualifiedName: 'destinations.retrieve',
    httpMethod: 'get',
    httpPath: '/rest/v1/destinations/{id}',
  },
  {
    clientCallName: 'client.destinations.update',
    fullyQualifiedName: 'destinations.update',
    httpMethod: 'patch',
    httpPath: '/rest/v1/destinations/{id}',
  },
  {
    clientCallName: 'client.destinations.list',
    fullyQualifiedName: 'destinations.list',
    httpMethod: 'get',
    httpPath: '/rest/v1/destinations',
  },
  {
    clientCallName: 'client.destinations.delete',
    fullyQualifiedName: 'destinations.delete',
    httpMethod: 'delete',
    httpPath: '/rest/v1/destinations/{id}',
  },
  {
    clientCallName: 'client.sources.create',
    fullyQualifiedName: 'sources.create',
    httpMethod: 'post',
    httpPath: '/rest/v1/sources',
  },
  {
    clientCallName: 'client.sources.retrieve',
    fullyQualifiedName: 'sources.retrieve',
    httpMethod: 'get',
    httpPath: '/rest/v1/sources/{id}',
  },
  {
    clientCallName: 'client.sources.update',
    fullyQualifiedName: 'sources.update',
    httpMethod: 'patch',
    httpPath: '/rest/v1/sources/{id}',
  },
  {
    clientCallName: 'client.sources.list',
    fullyQualifiedName: 'sources.list',
    httpMethod: 'get',
    httpPath: '/rest/v1/sources',
  },
  {
    clientCallName: 'client.sources.delete',
    fullyQualifiedName: 'sources.delete',
    httpMethod: 'delete',
    httpPath: '/rest/v1/sources/{id}',
  },
  {
    clientCallName: 'client.allowedEvents.create',
    fullyQualifiedName: 'allowedEvents.create',
    httpMethod: 'post',
    httpPath: '/rest/v1/allowed-events',
  },
  {
    clientCallName: 'client.allowedEvents.retrieve',
    fullyQualifiedName: 'allowedEvents.retrieve',
    httpMethod: 'get',
    httpPath: '/rest/v1/allowed-events/{id}',
  },
  {
    clientCallName: 'client.allowedEvents.list',
    fullyQualifiedName: 'allowedEvents.list',
    httpMethod: 'get',
    httpPath: '/rest/v1/allowed-events',
  },
  {
    clientCallName: 'client.allowedEvents.delete',
    fullyQualifiedName: 'allowedEvents.delete',
    httpMethod: 'delete',
    httpPath: '/rest/v1/allowed-events/{id}',
  },
  {
    clientCallName: 'client.consentSettings.create',
    fullyQualifiedName: 'consentSettings.create',
    httpMethod: 'post',
    httpPath: '/rest/v1/consent-settings',
  },
  {
    clientCallName: 'client.consentSettings.retrieve',
    fullyQualifiedName: 'consentSettings.retrieve',
    httpMethod: 'get',
    httpPath: '/rest/v1/consent-settings/{id}',
  },
  {
    clientCallName: 'client.consentSettings.update',
    fullyQualifiedName: 'consentSettings.update',
    httpMethod: 'patch',
    httpPath: '/rest/v1/consent-settings/{id}',
  },
  {
    clientCallName: 'client.consentSettings.list',
    fullyQualifiedName: 'consentSettings.list',
    httpMethod: 'get',
    httpPath: '/rest/v1/consent-settings',
  },
  {
    clientCallName: 'client.consentSettings.delete',
    fullyQualifiedName: 'consentSettings.delete',
    httpMethod: 'delete',
    httpPath: '/rest/v1/consent-settings/{id}',
  },
  {
    clientCallName: 'client.globalDispatchCenters.create',
    fullyQualifiedName: 'globalDispatchCenters.create',
    httpMethod: 'post',
    httpPath: '/rest/v1/global-dispatch-centers',
  },
  {
    clientCallName: 'client.globalDispatchCenters.retrieve',
    fullyQualifiedName: 'globalDispatchCenters.retrieve',
    httpMethod: 'get',
    httpPath: '/rest/v1/global-dispatch-centers/{id}',
  },
  {
    clientCallName: 'client.globalDispatchCenters.update',
    fullyQualifiedName: 'globalDispatchCenters.update',
    httpMethod: 'patch',
    httpPath: '/rest/v1/global-dispatch-centers/{id}',
  },
  {
    clientCallName: 'client.globalDispatchCenters.list',
    fullyQualifiedName: 'globalDispatchCenters.list',
    httpMethod: 'get',
    httpPath: '/rest/v1/global-dispatch-centers',
  },
  {
    clientCallName: 'client.globalDispatchCenters.delete',
    fullyQualifiedName: 'globalDispatchCenters.delete',
    httpMethod: 'delete',
    httpPath: '/rest/v1/global-dispatch-centers/{id}',
  },
  {
    clientCallName: 'client.replaySettings.create',
    fullyQualifiedName: 'replaySettings.create',
    httpMethod: 'post',
    httpPath: '/rest/v1/replay-settings',
  },
  {
    clientCallName: 'client.replaySettings.retrieve',
    fullyQualifiedName: 'replaySettings.retrieve',
    httpMethod: 'get',
    httpPath: '/rest/v1/replay-settings/{id}',
  },
  {
    clientCallName: 'client.replaySettings.update',
    fullyQualifiedName: 'replaySettings.update',
    httpMethod: 'patch',
    httpPath: '/rest/v1/replay-settings/{id}',
  },
  {
    clientCallName: 'client.replaySettings.list',
    fullyQualifiedName: 'replaySettings.list',
    httpMethod: 'get',
    httpPath: '/rest/v1/replay-settings',
  },
  {
    clientCallName: 'client.replaySettings.delete',
    fullyQualifiedName: 'replaySettings.delete',
    httpMethod: 'delete',
    httpPath: '/rest/v1/replay-settings/{id}',
  },
  {
    clientCallName: 'client.versions.create',
    fullyQualifiedName: 'versions.create',
    httpMethod: 'post',
    httpPath: '/rest/v1/versions',
  },
  {
    clientCallName: 'client.versions.retrieve',
    fullyQualifiedName: 'versions.retrieve',
    httpMethod: 'get',
    httpPath: '/rest/v1/versions/{id}',
  },
  {
    clientCallName: 'client.versions.update',
    fullyQualifiedName: 'versions.update',
    httpMethod: 'patch',
    httpPath: '/rest/v1/versions/{id}',
  },
  {
    clientCallName: 'client.versions.list',
    fullyQualifiedName: 'versions.list',
    httpMethod: 'get',
    httpPath: '/rest/v1/versions',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
