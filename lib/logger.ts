import { NextRequest } from 'next/server';

/**
 * Logs error failed API calls to external services.
 * @param {object} options - logging options.
 * @param {string} options.message - main log message.
 * @param {NextRequest} options.req - request object.
 * @param {Response} options.resp - failed Response object from the fetch call.
 * @param {any} options.data - parsed JSON data from the failed response.
 */
export function logApiError({ message, req, resp, data }: {
  message: string;
  req: NextRequest;
  resp: Response;
  data: any;
}) {
  const logPayload = {
    timestamp: new Date().toISOString(),
    level: 'ERROR',
    message,
    context: {
      requestPath: req.nextUrl.pathname,
      externalApiUrl: resp.url,
      responseStatus: resp.status,
      responseBody: data,
    },
  };
  console.error(logPayload);
}

/**
 * Logs error for exceptions caught in a try...catch block.
 * @param {object} options - logging options.
 * @param {string} options.message - main log message.
 * @param {NextRequest} options.req - request object.
 * @param {unknown} options.error - error object caught in the catch block.
 */
export function logCaughtError({ message, req, error }: {
  message: string;
  req: NextRequest;
  error: unknown;
}) {
  const originalStackTrace = error instanceof Error ? error.stack : undefined;
  const formattedStackTrace = originalStackTrace
    ? originalStackTrace.split('\n').map((line) => line.trim()).join('\n')
    : undefined;

  const logPayload = {
    timestamp: new Date().toISOString(),
    level: 'ERROR',
    message,
    context: {
      requestPath: req.nextUrl.pathname,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      stackTrace: formattedStackTrace,
    },
  };
  console.error(logPayload);
}