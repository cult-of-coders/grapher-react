import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions(
  {
    react: '15.3 - 16',
    'prop-types': '15.0 - 16',
  },
  'hoist-non-react-statics',
  'cultofcoders:grapher-react',
  'js-cookie'
);

import './lib/authCookie.js';

export { default as setDefaults } from './setDefaults.js';

export { default as withUser, User } from './lib/User.js';

export { default as withQuery } from './withQuery.js';

export {
  default as createQueryContainer,
} from './legacy/createQueryContainer.js';

export { default as DataHydrator } from './lib/DataHydrator.js';
