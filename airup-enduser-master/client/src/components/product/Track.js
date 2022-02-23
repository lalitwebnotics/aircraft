import isEmpty from 'lodash/isEmpty';
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { redirect } from '../../routes';
import { watch, when } from '../../store';
import { bind, call, freeze, isWithinElement } from '../../utils';
import { APP_CLICK, appClick } from '../app/actions';
import { reloadProducts, trackProducts } from '../../api/product/actions';
import './Track.scss';
import Button from '../utils/Button';
import Confirm from '../popups/Confirm';
import Icon from '../utils/Icon';

/**
 * Track
 */
class Track extends Component {

  constructor(...args) {
    super(...args);
    this.button = createRef();
    this.state = {
      busy: false,
      overlay: false
    };
    bind(this, [
      'onClick',
      'onSignUp',
      'toggle',
      'track'
    ]);
  }

  render() {
    const { variant = 'dark-blue' } = this.props,
          { busy, overlay } = this.state,
          active = this.isActive();
    if (isEmpty(this.props.auth.data)) {
      return (
        <Confirm
          message="Register to start tracking the latest updates!"
          ok={{
            exclusive: true,
            title: 'Sign Up',
            variant: 'red'
          }}
          onConfirm={this.onSignUp}>
          {({ show }) => (
            <Button
              variant={variant}
              size="sm"
              className="Track"
              disabled={busy || this.props.busy}
              onClick={show}>
              Track Updates
            </Button>
          )}
        </Confirm>
      );
    }
    return (
      <Button
        variant={active ? 'empty' : variant}
        size="sm"
        className={clsx('Track', { active, overlay })}
        disabled={busy || this.props.busy}
        onClick={call(this.onClick)}
        ref={this.button}>
        {(active ?
          <>
            <Icon value="fa-check" />
            <span>Tracked in Hangar</span>
            <div className="untrack-overlay" onClick={freeze(this.track, false)}>
              Untrack Updates
            </div>
            <Icon value="fas-caret-down" />
          </> :
          <>Track Updates</>
        )}
      </Button>
    );
  }

  componentDidMount() {
    this.watch = watch([APP_CLICK], ({ payload }) => {
      if (!isWithinElement(this.button.current, payload.target)) {
        this.toggle(false);
      }
    });
  }

  componentWillUnmount() {
    this.watch.cancel();
  }

  /**
   * Is active
   */
  isActive() {
    return this.props.product.updates > 0;
  }

  /**
   * onClick
   */
  onClick() {
    if (this.isActive()) {
      this.toggle(true);
    } else {
      this.track(true);
    }
  }

  /**
   * On signup
   */
  onSignUp() {
    return Promise.resolve(() => (
      redirect('/register')
    ));
  }

  /**
   * Toggle overlay
   */
  toggle(overlay = !this.state.overlay) {
    this.setState({
      overlay
    });
  }

  /**
   * Track
   */
  track(track, e) {
    const id = [this.props.product._id];
    this.setState({
      busy: true
    });
    when(trackProducts({ id, track })).then(() => (
      when(reloadProducts({ id }))
    )).catch(() => (
      Promise.resolve()
    )).then(() => {
      this.setState({
        busy: false
      });
    });
    if (!track && e) {
      this.toggle(false);
      this.props.dispatch(appClick(e));
    }
  }
}

export default connect(({ api: { user } }) => {
  return {
    auth: user.auth
  };
})(Track);
