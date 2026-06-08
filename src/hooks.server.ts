import { setup as loggerSetup } from '$lib/logger';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { getLogger, withContext } from '@logtape/logtape';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

await loggerSetup();

const loggerHandle: Handle = ({ event, resolve }) => {
	const logger = getLogger();
	event.locals.logger = logger;
	const url = event.url.pathname + event.url.search;
	const method = event.request.method;
	logger.info('{method} {status} {url}');
	return withContext({ url }, async () => {
		logger.info('{method} {status} {url}');
		return await resolve(event);
	});
};

const i18nHandle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

export const handle: Handle = sequence(loggerHandle, i18nHandle);
