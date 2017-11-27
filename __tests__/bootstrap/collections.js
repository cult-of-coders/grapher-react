import {Mongo} from 'meteor/mongo';

export const Authors = new Mongo.Collection('authors');
export const AuthorProfiles = new Mongo.Collection('author_profiles');
export const Posts = new Mongo.Collection('posts');
export const Groups = new Mongo.Collection('groups');
export const Categories = new Mongo.Collection('categories');

Posts.addLinks({
    author: {
        type: 'one',
        collection: Authors,
        field: 'authorId',
    },
    categories: {
        type: 'many',
        metadata: true,
        collection: Categories,
        field: 'categoryIds',
    }
});

Authors.addLinks({
    posts: {
        collection: Posts,
        inversedBy: 'author',
    },
    groups: {
        type: 'many',
        collection: Groups,
        field: 'groupIds',
    },
    profile: {
        type: 'one',
        metadata: true,
        collection: AuthorProfiles,
        field: 'profileId',
        unique: true,
    }
});

AuthorProfiles.addLinks({
    author: {
        collection: Authors,
        inversedBy: 'profile',
        unique: true,
    }
});

Groups.addLinks({
    authors: {
        collection: Authors,
        inversedBy: 'groups',
    }
});

Categories.addLinks({
    posts: {
        collection: Posts,
        inversedBy: 'categories',
    }
});
