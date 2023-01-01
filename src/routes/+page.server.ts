import renderLatestPosts from '@lib/renderLatestPosts';
import sendGQL from '@lib/sendGQL';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const date = Date.now();
	const res = await sendGQL(
		`query {
			 getLatestPosts(items: 10, step: 0, since: "${date}") {
  				  next
				posts {
					id
				title
				content
				createdAt
				likes
				hasLiked
				author
				edited
				isAuthor
			}
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

	if (res) {
		const next = res.data.getLatestPosts.next;

		return {
			next,
			getLatestPosts: renderLatestPosts(res.data.getLatestPosts.posts),
			userInfo: {
				loggedIn: true,
				userId: res.data.getUser.value.id,
				username: res.data.getUser.value.username
			},
			step: 1
		};
	}

	return { getLatestPosts: [], step: 1 };
}) satisfies PageServerLoad;
