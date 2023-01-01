import type { User } from '@interfaces/User';
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

		if (result && result.__typename === 'GetUserSuccess') {
			const user: User = result.value;
			return {
				loggedIn: true,
				username: user.username,
				userId: locals.userId
			};
		}
	}

	return {
		loggedIn: false
	};
}) satisfies LayoutServerLoad;
