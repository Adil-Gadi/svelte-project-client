import { config } from 'dotenv';
config();

import type { Handle } from '@sveltejs/kit';
import { verify } from 'jsonwebtoken';

export const handle = (async ({ event, resolve }) => {
	const webToken = event.cookies.get('access_token');
	if (!webToken) {
		event.cookies.delete('access_token');
	} else {
		try {
			const decoded = verify(webToken, process.env.JWT_SECRET);
			console.log(decoded);
		} catch (error) {
			event.cookies.delete('access_token');
		}
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
