import './fixtures';
import {Authors, Groups, Posts, Categories, AuthorProfiles} from './collections';
import {authorsList, postsList, exceptionPostList} from './namedQueries';

function expose(exposables) {
    exposables.forEach(exposable => {
        exposable.expose();
    });
}

function allow(collections) {
    collections.forEach(collection => {
        collection.allow({
            insert: () => true,
            update: () => true,
            remove: () => true,
        })
    })
}

allow([Authors, Groups, Posts, Categories, AuthorProfiles]);

expose([Authors, Groups, Posts, Categories, AuthorProfiles]);
expose([authorsList, postsList]);

exceptionPostList.expose({
    firewall() {
        throw new Meteor.Error('not-good', 'not-good');
    }
});