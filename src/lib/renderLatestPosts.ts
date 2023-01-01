import { marked } from 'marked';
import type { Post } from '@interfaces/Post';

const renderer = {
	image(href: string, title: string, text: string) {
		// return `<img href="${href}" alt="${text}" >`;
		return '';
	}
};

marked.use({ renderer });

export default function renderLatestPosts(posts: Post[]) {
	return posts.map((post) => {
		const content = marked.parse(post.content);

		return { ...post, content };
	});
}
