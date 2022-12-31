import sendGQL from '@lib/sendGQL';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const query = `
	    query {
	        getPost(postId: "${params.postId}") {
	            ok

	            ... on GetPostSuccess {
                    value {
	                    title
	                    content
	                    isAuthor
						postId: id
                    }
	            }

	        }
	    }
	`;

	const res = await sendGQL(query, locals.token);

	if (res?.data?.getPost?.ok) {
		const {
			data: { getPost }
		} = res;

		if (getPost.value.isAuthor) {
			return getPost.value;
		}
	}

	throw redirect(307, '/');
}) satisfies PageServerLoad;
