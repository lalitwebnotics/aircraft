import fromPairs from 'lodash/fromPairs';
import includes from 'lodash/includes';
import omit from 'lodash/omit';
import keys from 'lodash/keys';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';

import { bind, call, toQuery } from '../../utils';
import { when } from '../../store';
import { routeQuery } from '../../routes';
import { PRODUCT_UPDATES, TITLES } from '../../api/product/Product';
import { getTracked, reloadProducts, trackProducts } from '../../api/product/actions';
import './Products.scss';
import Checkbox from '../inputs/checkbox/Checkbox';
import Confirm from '../popups/Confirm';
import Icon from '../utils/Icon';
import Table from '../table/Table';
import Toggle from '../inputs/toggle/Toggle';

/**
 * Sort fields
 */
export const sortFields = {
  name: 'Product Name',
  manufacturer: 'Manufacturer',
  updated_at: 'Last Approved'
};

/**
 * Sort keys
 */
export const sortKeys = keys(sortFields);

/**
 * Products hangar
 */
class Products extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      busy: {},
      updates: {}
    };
    bind(this, [
      'onToggle',
      'remove'
    ]);
  }

  render() {
    const { device, products, route } = this.props,
          { updates } = this.state,
          busy = products.busy,
          smDown = includes(['xs', 'sm'], device);
    return (
      <div className="Products">
        <div className="description">
          Below contains all the products you are tracking updates for. You can configure tracking settings for each one of them.
        </div>
        <Table {...products} route={route}>
          {() => ({
            head: ({ selected, sort, toggle }) => (
              <Fragment>
                <tr>
                  <th>
                    <Checkbox icon="fa-minus" value={selected} size="sm" onChange={call(toggle, !selected)}>
                      {selected ? 'Deselect' : 'Select'} All ({products.count})
                    </Checkbox>
                  </th>
                  <th></th>
                  {(smDown ? <></> :
                    <Fragment>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </Fragment>
                  )}
                  <th>
                    {(smDown ? sort(sortFields) : <></>)}
                  </th>
                </tr>
                {(smDown ? <></> :
                  <tr>
                    <th></th>
                    {sortKeys.map((key) => (
                      <th key={key}>{sort(key, sortFields[key])}</th>
                    ))}
                    <th className="toggle">{TITLES.PRODUCT_UPDATES.PRICE}</th>
                    <th className="toggle">{TITLES.PRODUCT_UPDATES.REBATE}</th>
                    <th></th>
                  </tr>
                )}
              </Fragment>
            ),
            row: (product, { odd, selected, toggle }) => {
              const { certificate, _id, manufacturer, name, permalink, updated_at } = product,
                    bits = updates[_id] || 0,
                    disabled = !!this.state.busy[_id] || busy,
                    input = {
                      disabled,
                      onChange: call(this.onToggle, _id),
                      variant: 'light-blue'
                    };
              return (
                <tr className={clsx({ odd, selected })}>
                  <td><Checkbox value={selected} size="sm" onChange={call(toggle, !selected)} /></td>
                  {(!smDown ?
                    <Fragment>
                      <td>
                        <Link to={'/products/' + permalink + toQuery(route.query)}>
                          {name + (certificate ? (' (STC ' + certificate.reference + ')') : '')}
                        </Link>
                      </td>
                      <td><Link to="/">{manufacturer.name}</Link></td>
                      <td>{moment(updated_at).format('MMM DD, YYYY')}</td>
                      <td className="toggle">
                        <Toggle value={bits & PRODUCT_UPDATES.PRICE} name="price" {...input} />
                      </td>
                      <td className="toggle">
                        <Toggle value={bits & PRODUCT_UPDATES.REBATE} name="rebate" {...input} />
                      </td>
                    </Fragment> :
                    <td>
                      <Link to={'/products/' + permalink + toQuery(route.query)}>
                        {name + (certificate ? (' (STC ' + certificate.reference + ')') : '')}
                      </Link>
                      <br />
                      <Link to="/">{manufacturer.name}</Link><br />
                      Last approved: {moment(updated_at).format('MMM DD, YYYY')}
                    </td>
                  )}
                  <td className="delete">
                    <Confirm
                      disabled={disabled}
                      message="Are you sure you'd like to remove this product from your hanger and stop tracking its updates?"
                      ok={{ title: 'Stop Tracking' }}
                      onConfirm={call(this.remove, _id)}>
                      {({ show }) => (
                        <Icon disabled={disabled} value="fa-trash" onClick={show} />
                      )}
                    </Confirm>
                  </td>
                </tr>
              );
            }
          })}
        </Table>
      </div>
    );
  }

  componentDidMount() {
    when(getTracked()).then(() => {
      this.setState({
        updates: fromPairs(keys(this.props.products.data).map((_id) => [
          _id,
          this.props.products.data[_id].updates || 0
        ]))
      });
    });
  }

  /**
   * Toggle
   */
  onToggle(_id, { target: { name, value } }) {
    const current = this.state.updates[_id],
          bit = PRODUCT_UPDATES[name.toUpperCase()],
          active = current & bit,
          id = [_id];
    let updates = current;
    if (value && !active) {
      updates = current + bit;
    } else if (!value && active) {
      updates = current - bit;
    }
    this.setBusy(_id, true);
    this.setState((state) => ({
      updates: {
        ...state.updates,
        [_id]: updates
      }
    }));
    when(trackProducts({
      id,
      track: true,
      updates
    })).then(() => (
      when(reloadProducts({ id })).then((result) => {
        this.setState(({ updates }) => ({
          updates: {
            ...updates,
            [result._id]: result.updates || 0
          }
        }))
      })
    )).catch(() => (
      Promise.resolve()
    )).then(() => {
      this.setBusy(_id, false);
    });
  }

  /**
   * Set busy
   */
  setBusy(_id, busy) {
    this.setState((state) => ({
      busy: {
        ...state.busy,
        [_id]: busy
      }
    }));
  }

  /**
   * Remove product
   */
  remove(_id) {
    this.setBusy(_id, true);
    when(trackProducts({
      id: [_id],
      track: false
    })).then(() => (
      when(getTracked())
    )).catch(() => (
      Promise.resolve()
    )).then(() => {
      this.setState((state) => ({
        busy: omit(state.busy, [_id])
      }));
    });
  }
}

export default connect(({ api: { product }, app, router }) => {
  return {
    device: app.device,
    products: product.tracked,
    route: routeQuery(router),
    track: product.track
  };
})(Products);
