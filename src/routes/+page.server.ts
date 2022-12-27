import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	if (!cookies.get('userId')) {
		throw redirect(307, '/login');
	} else {
		return {};
	}
}) satisfies PageServerLoad;
