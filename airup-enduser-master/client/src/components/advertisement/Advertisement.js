import React, { Component } from 'react';

import './Advertisement.scss';

/**
 * Advertisement component
 */
class Advertisement extends Component {

  render() {
    return (
      <a href={this.props.link || `${window.location.origin}/advertisement`} target="_blank" className="Advertisement">
        <img src={this.props.url} alt=""/>
      </a>
    );
  }
}

export default Advertisement;
