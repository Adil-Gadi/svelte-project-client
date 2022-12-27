import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	if (cookies.get('userId')) {
		throw redirect(307, '/');
	} else {
		return {};
	}
}) satisfies PageServerLoad;
