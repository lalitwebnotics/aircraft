import fromPairs from 'lodash/fromPairs';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { routes } from '../../routes';
import './Hangar.scss';
import Tabs from '../tabs/Tabs';

/**
 * Hangar component
 */
class Hangar extends Component {

  render() {
    const links = fromPairs(this.props.routes.map(({ path, title }) => [path, title]));
    return (
      <div className="Hangar">
        <div className="header">
          <h2>My Hangar</h2>
          <Tabs base="/hangar" links={links} />
        </div>
        <div className="content">
          {routes(this.props.routes)}
        </div>
      </div>
    );
  }
}

export default connect()(Hangar);
