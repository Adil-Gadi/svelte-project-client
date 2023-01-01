import type { Post } from '@interfaces/Post';
import { postsLoaded } from '@lib/config';
import sendGQL from './sendGQL';

export default async function loadLatestsPosts(
	steps: number,
	since: number,
	token: string
): Promise<{ getLatestPosts: Post[]; next: boolean }> {
	const query = `
        query {
			 getLatestPosts(items: ${postsLoaded}, step: ${steps}, since: "${since}") {
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
        }
    `;

	const res = await sendGQL(query, token);

	if (res && res.data) {
		const getLatestPosts = res.data.getLatestPosts;

		const { posts, next }: { posts: any[]; next: boolean } = getLatestPosts;

		return {
			getLatestPosts: posts,
			next
		};
	}

	return {
		getLatestPosts: [],
		next: false
	};
}
