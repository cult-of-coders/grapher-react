import './enzyme.config';

import React from 'react';
import {shallow, mount} from 'enzyme';
import {Authors, Groups, Posts, Categories, AuthorProfiles} from './bootstrap/collections';
import {authorsList, postsList} from './bootstrap/namedQueries';
import sinon from 'sinon';
import {withQuery} from 'meteor/cultofcoders:grapher-react';
import {expect} from 'chai';

import PostItemContainer from './components/containers/PostItem';
import PostItemWithDataPropContainer from './components/containers/PostItemWithDataProp';
import PostItemReactiveWithDataPropContainer from './components/containers/PostItemReactiveWithDataProp';
import PostItemPollingContainer from './components/containers/PostItemPolling';
import PostItemReactiveContainer from './components/containers/PostItemReactive';
import PostItemErrorContainer from './components/containers/PostItemError';
import PostItemReactiveErrorContainer from './components/containers/PostItemReactiveError';
import Post from './components/dumb/Post';
import PostWithDataProp from './components/dumb/PostWithDataProp';
import Loading from './components/dumb/Loading';
import Error from './components/dumb/Error';

describe('withTracker()', function () {
    it('[Static] Should load the date after mounting', function (done) {
        const wrapper = mount(<PostItemContainer />);
        let loadingComponent = wrapper.html();

        expect(wrapper.find('Post').length).to.equal(1);
        expect(wrapper.find('Loading').length).to.equal(1);

        setTimeout(function () {
            let html = wrapper.html();
            expect(html).to.equal('<div class="title">Post 0</div>');

            done();
        }, 100)
    });

    it('[Static] Should trigger the error if specified', function (done) {
        const wrapper = mount(<PostItemErrorContainer />);

        let html = wrapper.html();

        expect(wrapper.find('Post').length).to.equal(1);
        expect(wrapper.find('Loading').length).to.equal(1);

        setTimeout(function () {
            wrapper.update();
            expect(wrapper.find('Error').length).to.equal(1);
            done();
        }, 100)
    });

    it('[Static] Should work with dataProp', function (done) {
        const wrapper = mount(<PostItemWithDataPropContainer />);
        let loadingComponent = wrapper.html();

        expect(wrapper.find('PostWithDataProp').length).to.equal(1);
        expect(wrapper.find('Loading').length).to.equal(1);

        setTimeout(function () {
            let html = wrapper.html();
            expect(html).to.equal('<div class="title">Post 0</div>');

            done();
        }, 100)
    });

    it('[Reactive] Should work with dataProp', function (done) {
        const wrapper = mount(<PostItemReactiveWithDataPropContainer />);
        let loadingComponent = wrapper.html();

        // expect(wrapper.find('PostWithDataProp').length).to.equal(1);
        // expect(wrapper.find('Loading').length).to.equal(1);

        setTimeout(function () {
            wrapper.update();

            let html = wrapper.html();
            expect(html).to.equal('<div class="title">Post 0</div>');

            done();
        }, 100)
    });

    it('[Reactive] Should load the date after mounting', function (done) {
        const wrapper = mount(<PostItemReactiveContainer />);

        expect(wrapper.find('Post').length).to.equal(1);
        expect(wrapper.find('Loading').length).to.equal(1);

        setTimeout(function () {
            let html = wrapper.html();
            expect(html).to.equal('<div class="title">Post 0</div>');

            // triggering a reactive change
            wrapper.update();
            const {data} = wrapper.find('Post').props();
            assert.isObject(data);

            Posts.update(data._id, {$set: {'title': 'Post 0 update'}});

            setTimeout(function () {
                wrapper.update();
                let html = wrapper.html();
                expect(html).to.equal('<div class="title">Post 0 update</div>');
                Posts.update(data._id, {$set: {'title': 'Post 0'}});
                done();
            }, 200);
        }, 100)
    });

    it('[Reactive] Should trigger the error if specified', function (done) {
        const wrapper = mount(<PostItemReactiveErrorContainer />);

        let html = wrapper.html();

        expect(wrapper.find('Post').length).to.equal(1);
        expect(wrapper.find('Loading').length).to.equal(1);

        setTimeout(function () {
            wrapper.update();
            expect(wrapper.find('Error').length).to.equal(1);
            expect(wrapper.find('Error').html()).to.equal('<div>not-good</div>')
            done();
        }, 100)
    });

    it('[Static] Should load the date after polling', function (done) {
        const wrapper = mount(<PostItemPollingContainer />);

        expect(wrapper.find('Post').length).to.equal(1);
        expect(wrapper.find('Loading').length).to.equal(1);

        setTimeout(function () {
            let html = wrapper.html();
            expect(html).to.equal('<div class="title">Post 0</div>');

            // triggering a reactive change
            wrapper.update();
            const {data} = wrapper.find('Post').props();
            assert.isObject(data);

            Posts.update(data._id, {$set: {'title': 'Post 0 update'}});

            setTimeout(function () {
                wrapper.update();
                let html = wrapper.html();
                expect(html).to.equal('<div class="title">Post 0 update</div>');
                Posts.update(data._id, {$set: {'title': 'Post 0'}});
                done();
            }, 200);
        }, 100);
    });
});
