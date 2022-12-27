import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies, url }) => {
	if (url.searchParams.has('logged_out')) {
		cookies.delete('userId');
		return {
			logged_out: true
		};
	}

	if (cookies.get('userId')) {
		throw redirect(307, '/');
	} else {
		return {};
	}
}) satisfies PageServerLoad;
