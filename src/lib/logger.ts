import { configure, getConsoleSink, getLogger } from '@logtape/logtape';
import { prettyFormatter } from '@logtape/pretty';

const LOG_LEVEL = 'debug';

export async function setup() {
	const logger = getLogger();
	await configure({
		sinks: { console: prettyFormatter },
		loggers: [{ category: [], sinks: ['console'], lowestLevel: LOG_LEVEL }],
		reset: true
	});
	logger.debug('Logger loaded');
}
