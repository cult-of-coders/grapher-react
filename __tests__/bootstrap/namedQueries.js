import {Authors, Groups, Posts, Categories, AuthorProfiles} from './collections';

export const authorsList = Authors.createQuery('authorsList', {
    name: 1,
    groups: {
        name: 1,
    }
});

export const postsList = Posts.createQuery('postsList', {
    title: 1,
    createdAt: 1,
});

export const exceptionPostList = Posts.createQuery('exceptionPostList', {
    title: 1,
    createdAt: 1,
});