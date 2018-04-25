export const generateQueryId = function(query) {
  return `${query.queryName}::${EJSON.stringify(query.params)}`;
};
