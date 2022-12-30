import { config } from 'dotenv';
config();

import { redirect, type Handle } from '@sveltejs/kit';
import { verify } from 'jsonwebtoken';

export const handle = (async ({ event, resolve }) => {
	const webToken = event.cookies.get('access_token');
	if (!webToken) {
		event.cookies.delete('access_token');
	} else {
		try {
			event.locals.userId = verify(webToken, process.env.JWT_SECRET);
			event.locals.token = webToken;
		} catch (error) {
			event.cookies.delete('access_token');
		}
	}

	if (!event.cookies.get('access_token')) {
		if (event.url.pathname !== '/login' && event.url.pathname !== '/signup') {
			throw redirect(307, '/signup');
		}
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
