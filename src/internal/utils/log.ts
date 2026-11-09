// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { hasOwn } from './values';
import { type OursPrivacyPlatform } from '../../client';
import { RequestOptions } from '../request-options';

type LogFn = (message: string, ...rest: unknown[]) => void;
export type Logger = {
  error: LogFn;
  warn: LogFn;
  info: LogFn;
  debug: LogFn;
};
export type LogLevel = 'off' | 'error' | 'warn' | 'info' | 'debug';

const levelNumbers = {
  off: 0,
  error: 200,
  warn: 300,
  info: 400,
  debug: 500,
};

export const parseLogLevel = (
  maybeLevel: string | undefined,
  sourceName: string,
  client: OursPrivacyPlatform,
): LogLevel | undefined => {
  if (!maybeLevel) {
    return undefined;
  }
  if (hasOwn(levelNumbers, maybeLevel)) {
    return maybeLevel;
  }
  loggerFor(client).warn(
    `${sourceName} was set to ${JSON.stringify(maybeLevel)}, expected one of ${JSON.stringify(Object.keys(levelNumbers))}`,
  );
  return undefined;
};

function noop() {}

function makeLogFn(fnLevel: keyof Logger, logger: Logger | undefined, logLevel: LogLevel) {
  if (!logger || levelNumbers[fnLevel] > levelNumbers[logLevel]) {
    return noop;
  } else {
    // Don't wrap logger functions, we want the stacktrace intact!
    return logger[fnLevel].bind(logger);
  }
}

const noopLogger = {
  error: noop,
  warn: noop,
  info: noop,
  debug: noop,
};

let cachedLoggers = /* @__PURE__ */ new WeakMap<Logger, [LogLevel, Logger]>();

export function loggerFor(client: OursPrivacyPlatform): Logger {
  const logger = client.logger;
  const logLevel = client.logLevel ?? 'off';
  if (!logger) {
    return noopLogger;
  }

  const cachedLogger = cachedLoggers.get(logger);
  if (cachedLogger && cachedLogger[0] === logLevel) {
    return cachedLogger[1];
  }

  const levelLogger = {
    error: makeLogFn('error', logger, logLevel),
    warn: makeLogFn('warn', logger, logLevel),
    info: makeLogFn('info', logger, logLevel),
    debug: makeLogFn('debug', logger, logLevel),
  };

  cachedLoggers.set(logger, [logLevel, levelLogger]);

  return levelLogger;
}

const sensitiveFields = new Set<string>([
  'accesstoken',
  'apikey',
  'clientsecret',
  'credentials',
  'ingesturl',
  'installscript',
  'password',
  'projectapikey',
  'refreshtoken',
  'samplecurl',
  'testingesturl',
  'testinstallscript',
  'testtoken',
  'token',
  'websdktoken',
]);

const redactValue = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(redactValue);
  }
  if (typeof value !== 'object' || value === null) {
    return value;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    return value;
  }
  return Object.fromEntries(
    Object.entries(value).map(([name, field]) => [
      name,
      sensitiveFields.has(name.toLowerCase().replace(/[-_]/g, '')) ? '***' : redactValue(field),
    ]),
  );
};

/**
 * Returns a copy of a request or response body with sensitive field values replaced, for debug output only.
 * A string is treated as serialized JSON.
 */
export const redactSensitiveFields = (value: unknown): unknown => {
  if (typeof value !== 'string') {
    return redactValue(value);
  }
  try {
    return JSON.stringify(redactValue(JSON.parse(value)));
  } catch {
    return value;
  }
};

export const formatRequestDetails = (details: {
  options?: RequestOptions | undefined;
  headers?: Headers | Record<string, string> | undefined;
  retryOfRequestLogID?: string | undefined;
  retryOf?: string | undefined;
  url?: string | undefined;
  status?: number | undefined;
  method?: string | undefined;
  durationMs?: number | undefined;
  message?: unknown;
  body?: unknown;
}) => {
  if (details.options) {
    details.options = { ...details.options };
    delete details.options['headers']; // redundant + leaks internals
    if ('body' in details.options) {
      details.options.body = redactSensitiveFields(details.options.body);
    }
    if ('query' in details.options) {
      details.options.query = redactSensitiveFields(details.options.query) as typeof details.options.query;
    }
  }
  if ('body' in details) {
    details.body = redactSensitiveFields(details.body);
  }
  if ('message' in details) {
    details.message = redactSensitiveFields(details.message);
  }
  if (details.headers) {
    details.headers = Object.fromEntries(
      (details.headers instanceof Headers ? [...details.headers] : Object.entries(details.headers)).map(
        ([name, value]) => [
          name,
          (
            name.toLowerCase() === 'authorization' ||
            name.toLowerCase() === 'api-key' ||
            name.toLowerCase() === 'x-api-key' ||
            name.toLowerCase() === 'cookie' ||
            name.toLowerCase() === 'set-cookie'
          ) ?
            '***'
          : value,
        ],
      ),
    );
  }
  if ('retryOfRequestLogID' in details) {
    if (details.retryOfRequestLogID) {
      details.retryOf = details.retryOfRequestLogID;
    }
    delete details.retryOfRequestLogID;
  }
  return details;
};
