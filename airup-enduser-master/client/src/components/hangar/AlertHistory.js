import includes from 'lodash/includes';
import isUndefined from 'lodash/isUndefined';
import keys from 'lodash/keys';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { size, isEqual } from 'lodash';

import { bind } from '../../utils';
import {
  ALERT_HISTORY,
  getAlertHistory
} from '../../api/product/actions';
import { routeQuery } from '../../routes';
import './AlertHistory.scss';
import Table from '../table/Table';

/**
 * Sort fields
 */
export const sortFields = {
  created_at: 'Alert Date',
};

/**
 * Sort keys
 */
export const sortKeys = keys(sortFields);

/**
 * Aircraft hangar
 */
class Aircraft extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      products: {},
      toRemove: [],
    };
    bind(this, [
      'reload',
      'onReachEnd',
      'updateList'
    ]);
    this.infinite = {
      action: ALERT_HISTORY,
      onReachEnd: this.onReachEnd
    };
  }

  render() {
    const { alertHistory, device, route } = this.props,
      smDown = includes(['xs', 'sm'], device);
    const { toRemove } = this.state;
    return (
      <div className="AlertHistory">
        <div className="description">
          Below contains alert history of update sent for tracked products.
        </div>

        <Table {...alertHistory} infinite={this.infinite} route={route}>
          {() => ({
            head: ({ selected, sort, toggle }) => (
              <tr>
                <th>Product Name</th>
                <th>Change Type</th>
                {sortKeys.map((key) => (
                  <th key={key}>{sort(key, sortFields[key])}</th>
                ))}
              </tr>
            ),
            row: (alertRecord, { index, odd, selected, toggle }) => {
              return (
                <>
                  <tr className={clsx({ odd, selected })}>
                    <td>{alertRecord.newValues.name}</td>
                    <td>{alertRecord.productChange ? 'Price Changes' : (alertRecord ? 'Rebate Changes' : 'Details Changes')}</td>
                    <td>{new Date(alertRecord.created_at).toLocaleString()}</td>
                  </tr>
                </>
              );
            }
          })}
        </Table>
      </div>
    );
  }

  componentDidMount() {
    this.reload();
  }

  componentDidUpdate(props, state) {
    this.updateList(props, state);
  }

  /**
   * update list
   */
  updateList(props, state) {
    const first = isUndefined(props) && isUndefined(state),
      {query} = this.props.route;

    if (first || !isEqual(query, props.route.query)) {
      this.props.dispatch(getAlertHistory(query));
    }
  }

  /**
   * Reload
   */
  reload() {
    this.props.dispatch(getAlertHistory());
  }

  /**
   * On reach end
   */
  onReachEnd() {
    const length = size(this.props.alertHistory.data);
    if (length < this.props.alertHistory.count) {
      const {query} = this.props.route;
      this.props.dispatch(getAlertHistory({
        ...query,
        limit: length + 10
      }));
    }
  }
}

export default connect(({ api: { product }, app, router }) => {
  return {
    alertHistory: product.alertHistory,
    device: app.device,
    route: routeQuery(router)
  };
})(Aircraft);
