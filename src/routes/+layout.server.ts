import sendGQL from '@lib/sendGQL';
import type { LayoutServerLoad } from './$types';

async function getUserInfo(userId: string, token: string) {
	const query = `
        query {
            getUser(id: "${userId}") {
                __typename

                ... on GetUserSuccess {
                    value {
                        username
                    }
                }
            }
        } 
    `;

	const data = await sendGQL(query, token);

	if (data) {
		return data.data.getUser;
	}
}

export const load = (async ({ cookies, locals }) => {
	if (cookies.get('access_token')) {
		const result = await getUserInfo(locals.userId, locals.token);

		if (result) {
			return {
				loggedIn: true,
				username: result.value.username,
				userId: locals.userId
			};
		}
	}

	return {
		loggedIn: false
	};
}) satisfies LayoutServerLoad;
