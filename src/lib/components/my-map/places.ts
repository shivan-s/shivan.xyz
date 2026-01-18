interface Place {
	/** Decimal form */
	lngLat: [number, number];
	/** Header content */
	title: string;
	/** Body is optional for more content */
	body?: string;
	visited?: boolean;
}

export const places: Place[] = [
	{
		title: 'ANZAC Cove',
		body: 'Where NZ and Aus served in WW1',
		lngLat: [26.27333224, 40.240999036],
		visited: false
	},
	{
		title: 'Everest Base Camp - South',
		body: 'I am fascinated by people who climb Everest. I would like to see the memorial for the 1996 disaster',
		lngLat: [86.859444, 28.007222],
		visited: false
	},
	{
		title: 'K2 Base Camp',
		body: 'I am fascinated by people who climb K2; seeing a memorial',
		lngLat: [76.4982363155381, 35.83096326788909],
		visited: false
	},
	{
		title: 'Ilavalai',
		body: 'Where my parents grew up',
		lngLat: [79.99260229491308, 9.798151912925748],
		visited: true
	},
	{
		title: 'Appian Way',
		body: 'One of the oldest road in Roman roads (first road in history?)',
		lngLat: [12.5325, 41.841389],
		visited: false
	},
	{
		title: 'Pond du Gard',
		body: 'Roman engineering marvel - Aquaduct brige',
		lngLat: [4.535556, 43.947222],
		visited: false
	}
] as const;
