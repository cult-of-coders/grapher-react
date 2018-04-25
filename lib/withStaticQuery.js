import React from 'react';
import getDisplayName from './getDisplayName';
import { Meteor } from 'meteor/meteor';
import DataHydrator from './DataHydrator.js';

export default function withStaticQueryContainer(WrappedComponent) {
  /**
   * We use it like this so we can have naming inside React Dev Tools
   * This is a standard pattern in HOCs
   */
  class GrapherStaticQueryContainer extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isLoading: true,
        error: null,
        data: [],
      };

      const { query } = props;

      // Check the SSR query store for data
      if (Meteor.isClient && window && window.grapherQueryStore) {
        const data = DataHydrator.getQueryData(query);
        if (data) {
          this.state = {
            isLoading: false,
            data,
          };
        }
      }

      // For server-side-rendering, immediately fetch the data
      // and save it in the data store for this request
      if (Meteor.isServer) {
        const data = query.fetch({ userId: this.getUserId() });
        this.state = {
          isLoading: false,
          data,
        };
        props.dataStore.add(query, data);
      }
    }

    getUserId() {
      if (this.props.user) {
        return this.props.user._id;
      }
    }

    componentWillReceiveProps(nextProps) {
      const { query } = nextProps;
      this.fetch(query);
    }

    componentDidMount() {
      const { query, config } = this.props;

      // Do not fetch is we already have the data from SSR hydration
      if (this.state.isLoading === true) {
        this.fetch(query);
      }

      if (config.pollingMs) {
        this.pollingInterval = setInterval(() => {
          this.fetch(query);
        }, config.pollingMs);
      }
    }

    componentWillUnmount() {
      this.pollingInterval && clearInterval(this.pollingInterval);
    }

    fetch(query) {
      query.fetch({ userId: this.getUserId() }, (error, data) => {
        if (error) {
          this.setState({
            error,
            data: [],
            isLoading: false,
          });
        } else {
          this.setState({
            error: null,
            data,
            isLoading: false,
          });
        }
      });
    }

    refetch = () => {
      const { query } = this.props;
      this.fetch(query);
    };

    render() {
      const { config, props, query } = this.props;

      return React.createElement(WrappedComponent, {
        grapher: this.state,
        config,
        query,
        props: { ...props, refetch: this.refetch },
      });
    }
  }

  GrapherStaticQueryContainer.displayName = `StaticQuery(${getDisplayName(
    WrappedComponent
  )})`;

  return GrapherStaticQueryContainer;
}
