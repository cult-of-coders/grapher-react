import React from 'react';
import PropTypes from 'prop-types';
import { EJSON } from 'meteor/ejson';
import { generateQueryId } from './utils.js';
export const SSRDataStoreContext = React.createContext(null);

class DataStore {
  storage = {};

  add(query, value) {
    const key = generateQueryId(query);
    this.storage[key] = value;
  }

  getData() {
    return this.storage;
  }
}

export default class SSRDataStore {
  constructor() {
    this.store = new DataStore();
  }

  collectData(children) {
    return (
      <SSRDataStoreContext.Provider value={this.store}>
        {children}
      </SSRDataStoreContext.Provider>
    );
  }

  encodeData(data) {
    data = EJSON.stringify(data);
    return encodeURIComponent(data);
  }

  getScriptTags() {
    const data = this.store.getData();

    return `<script type="text/grapher-data">${this.encodeData(data)}</script>`;
  }
}
