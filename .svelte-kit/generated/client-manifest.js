export { matchers } from './client-matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6')];

export const server_loads = [0];

export const dictionary = {
	"/": [~2],
	"/login": [~3],
	"/posts/create": [4],
	"/posts/[postId]": [~5],
	"/signup": [~6]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};