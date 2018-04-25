import { Promise } from 'meteor/promise';
import { EJSON } from 'meteor/ejson';
import { generateQueryId } from './utils.js';

export default {
  decodeData(data) {
    const decodedEjsonString = decodeURIComponent(data);
    if (!decodedEjsonString) return null;

    return EJSON.parse(decodedEjsonString);
  },

  load() {
    // Retrieve the payload from the DOM
    const dom = document.querySelectorAll(
      'script[type="text/grapher-data"]',
      document
    );
    const dataString = dom && dom.length > 0 ? dom[0].innerHTML : '';
    const data = this.decodeData(dataString) || {};
    window.grapherQueryStore = data;

    return data;
  },

  getQueryData(query) {
    const id = generateQueryId(query);
    const data = window.grapherQueryStore[id];
    return data;
  },

  destroy() {
    window.grapherQueryStore = null;
  },
};
