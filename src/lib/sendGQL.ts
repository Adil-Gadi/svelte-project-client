import axios from 'axios';

const settings = {
	method: 'post',
	url: 'http://localhost:3000/graphql',
	headers: {
		'Content-Type': 'application/json'
	}
};

export default async function sendGQL(query: string, token = '') {
	const data = JSON.stringify({
		query: query,
		variables: {}
	});

	const config: { [key: string]: any } = {
		data,
		...settings
	};

	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	try {
		const result = await axios(config);
		return result.data;
	} catch (error) {
		console.error(error);
	}
}
