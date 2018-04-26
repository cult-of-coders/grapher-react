import { EJSON } from 'meteor/ejson';

export const generateQueryId = function(query) {
  return `${query.queryName}::${EJSON.stringify(query.params)}`;
};

export const DATASTORE_MIME = 'text/grapher-data';
