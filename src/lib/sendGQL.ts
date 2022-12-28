import axios from 'axios';

const config = {
	method: 'post',
	url: 'http://localhost:3000/graphql',
	headers: {
		'Content-Type': 'application/json'
	}
};

export default async function sendGQL(query: string) {
	const data = JSON.stringify({
		query: query,
		variables: {}
	});

	try {
		const result = await axios({ ...config, data });
		return result.data;
	} catch (error) {
		console.error(error);
	}
}
