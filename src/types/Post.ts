export interface Post {
	id: string;
	title: string;
	content: string;
	author: string;
	createdAt: string;
	likes: number;
	hasLiked: boolean;
	edited: boolean;
	isAuthor: boolean;
}
