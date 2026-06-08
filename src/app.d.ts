import type { Logger } from '@logtape/logtape';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			logger: Logger;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
