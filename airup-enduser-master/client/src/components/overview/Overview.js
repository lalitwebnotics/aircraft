import React, { Component } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { bind } from '../../utils';
import { routes } from '../../routes';
import { sidebarFiltersToggle } from '../app/actions';
import './Overview.scss';
import Sidebar from '../sidebar/Sidebar';

/**
 * Overview component
 */
class Overview extends Component {

  constructor(...args) {
    super(...args);
    bind(this, [
      'toggleFilters'
    ]);
  }

  render() {
    const { disabled } = this.props;
    return (
      <div className="Overview">
        <Sidebar />
        <div className={clsx('main', { disabled })}>
          <div className="overlay" onClick={this.toggleFilters}></div>
          {routes(this.props.routes)}
        </div>
      </div>
    );
  }

  /**
   * Toggle filters
   */
  toggleFilters() {
    this.props.dispatch(sidebarFiltersToggle());
  }
}

export default connect(({ app }) => {
  return {
    disabled: app.sidebar.filters
  };
})(Overview);
