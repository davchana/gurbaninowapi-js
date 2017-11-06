export const API_URL = `https://api.gurbaninow.com/v2/`;

export const TYPES = [
	'First Letter Start (Gurmukhi/Unicode)',
	'First Letter Anywhere (Gurmukhi/Unicode)',
	'Full Word/Line (Gurmukhi)',
	'Full Word/Line (English)',
	'Search All Words (Gurmukhi)',
	'Search All Words (English)',
	'Search Any Words (Gurmukhi)',
	'Search Any Words (English)'
];

export const SOURCES = {
	G: 'Sri Guru Granth Sahib Ji',
	D: 'Sri Dasam Granth',
	B: 'Bhai Gurdas Ji Vaaran',
	N: 'Bhai Nand Lal Ji Guzals',
	A: 'Amrit Keertan',
	U: 'Uggardanti'
};

export const buildApiUrl = options => {
	const {
		q = false,              // String: Query string.
		source = false,         // String: one of Object.keys(SOURCES).
		type = false,           // Number: index of TYPES.
		writer = false,         // Number: Writer ID - Check README.md.
		raag = false,           // Number: Raag ID - Check README.md.
		ang = false,            // Number: Page number of the source (If Source is Empty, defaults to G).
		results = false,        // Number: Count of results you want.
		offset = false,         // Number: Used for pagination.
		id = false,             // Number: Shabad ID.
		hukam = false,          // Boolean: Pass true if you want hukamnama of today.
		unicode = false,        // Boolean: Pass true to convert query string (GurbaniAkhar) into unicode text.
		akhar = false,          // Boolean: Pass true to convert query string (Unicode) into GurbaniAkhar text.
	} = options;
	let url = API_URL;
	if (q !== false) {
		let params = [];
		if (source) params.push(`source=${source}`);
		if (type) params.push(`searchtype=${type}`);
		if (writer) params.push(`writer=${writer}`);
		if (raag) params.push(`raag=${raag}`);
		if (ang) params.push(`ang=${ang}`);
		if (results) params.push(`results=${results}`);
		if (offset) params.push(`offset=${offset}`);
		url += `search/${q}?${params.join('&')}`;
	} else if (id !== false) {
		url += `shabad/${id}`;
	} else if (ang !== false) {
		url += `ang/${ang}/${source ? source : ''}`;
	} else if (hukam !== false) {
		url += `hukamnama/today`;
	} else if (unicode !== false) {
		url += `convert/unicode/${unicode}`;
	} else if (akhar !== false) {
		url += `convert/akhar/${akhar}`;
	} else {
		throw new Error('Invalid Options Sent');
	}
	return url;
}
