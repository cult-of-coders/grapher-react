import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
    react: '15.3 - 16',
    'prop-types': '15.0 - 16',
}, 'cultofcoders:grapher-react');

export {
    default as setDefaults
} from './setDefaults.js';

export {
    default as withQuery
} from './withQuery.js';

export {
    default as createQueryContainer
} from './legacy/createQueryContainer.js';