import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies, url }) => {
	if (url.searchParams.has('logged_out')) {
		cookies.delete('access_token');
		return {
			logged_out: true
		};
	}

	if (cookies.get('access_token')) {
		throw redirect(307, '/');
	} else {
		return {};
	}
}) satisfies PageServerLoad;
