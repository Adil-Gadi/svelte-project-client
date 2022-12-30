import sendGQL from '@lib/sendGQL';
import type { PageServerLoad } from './$types';
import { marked } from 'marked';

export const load = (async ({ locals }) => {
	const data = await sendGQL(
		`query {
		getLatestPosts(items: 10, step: 0) {
			id
			title
			content
			createdAt
			likes
			hasLiked
			author
			edited
			isAuthor
			hasLiked
			likes
		}

		getUser(id: "${locals.userId}") {
			__typename

			... on GetUserSuccess {
				value {
					id
					username
				}
			}
		}
	}`,
		locals.token
	);

	if (data) {
		data.data.getLatestPosts.forEach((item: { content: string }) => {
			item.content = marked.parse(item.content);
		});

		return {
			getLatestPosts: data.data.getLatestPosts,
			userInfo: {
				loggedIn: true,
				userId: data.data.getUser.value.id,
				username: data.data.getUser.value.username
			}
		};
	}

	return { getLatestPosts: [] };
}) satisfies PageServerLoad;
