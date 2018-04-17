import { Promise } from 'meteor/promise'
import { generateQueryId } from './utils.js';

export default {

    decodeData(data) {
        const decodedEjsonString = decodeURIComponent(data);
        if (!decodedEjsonString) return null;

        return EJSON.parse(decodedEjsonString);
    },

    load(optns) {
        const defaults = {
            selfDestruct: 3000
        }
        const options = Object.assign({}, defaults, optns)

        return new Promise((resolve, reject) => {
            // Retrieve the payload from the DOM
            const dom = document.querySelectorAll(
                'script[type="text/grapher-data"]',
                document
            );
            const dataString = dom && dom.length > 0 ? dom[0].innerHTML : '';
            const data = this.decodeData(dataString) || {};
            window.grapherQueryStore = data

            // Self destruct the store so that dynamically loaded modules
            // do not pull from the store in the future
            setTimeout(() => {
                window.grapherQueryStore = {};
            }, options.selfDestruct)

            resolve(data);
        });
    },

    getQueryData(query) {
        const id = generateQueryId(query);
        const data = window.grapherQueryStore[id]
        return data
    }
    
}