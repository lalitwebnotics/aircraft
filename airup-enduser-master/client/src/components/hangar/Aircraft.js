import includes from 'lodash/includes';
import isUndefined from 'lodash/isUndefined';
import keyBy from 'lodash/keyBy';
import keys from 'lodash/keys';
import pick from 'lodash/pick';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment'

import { bind, call } from '../../utils';
import { join, once, when } from '../../store';
import {
  AIRCRAFT_HANGAR_DELETE,
  getAircraftHangar,
  deleteAircraftHangar
} from '../../api/aircraft/actions';
import { getProducts } from '../../api/product/actions';
import { routeQuery } from '../../routes';
import './Aircraft.scss';
import Checkbox from '../inputs/checkbox/Checkbox';
import Confirm from '../popups/Confirm';
import Icon from '../utils/Icon';
import Media from '../media/Media';
import Slider, { itemsPerQuery, sliderInitialData } from '../slider/Slider';
import Table from '../table/Table';
import Hangar from "../popups/Hangar";
import { aircraft } from '../../api';

/**
 * Sort fields
 */
export const sortFields = {
  aircraft_make: 'Make',
  name: 'Model',
  year: 'Year'
};

/**
 * Sort keys
 */
export const sortKeys = keys(sortFields);

/**
 * Aircraft hangar
 */
class Aircraft extends Component {
  showHideHanger;
  constructor(...args) {
    super(...args);
    this.state = {
      products: {},
      toRemove: [],
      selectedAircraft: null
    };
    bind(this, [
      'loadProducts',
      'onHideSettings',
      'reload',
      'remove',
      'toggleProducts',
      'selectProduct',
      'bulkRemove'
    ]);
  }

  render() {
    const { busy, device, route } = this.props,
      { count } = this.props.aircraft,
      smDown = includes(['xs', 'sm'], device);
    const { toRemove } = this.state;
    return (
      <div className="Aircraft">
        <div className="description">
          Below contains aircrafts you have saved. You can configure tracking settings for each one of them and receive updates on related FAA-Approved products in the categories you&apos;re interested in.
        </div>

        <div className="description">
          <Hangar aircraft={this.state.selectedAircraft} withoutAircraft isHanger loggedOut={false} onCancel={this.hangarCancelClick}>
            {({ show }) => {
              this.showHideHanger = show;
              return (
                <span className={clsx('add-to-hangar', { disabled: !this.state.selectedAircraft })} onClick={show}>
                  + Add aircraft to hangar
                </span>
              );
            }}
          </Hangar>
        </div>

        <Table {...this.props.aircraft} route={route}>
          {() => ({
            head: ({ selected, sort, toggle }) => (
              <>
                <tr>
                  <th>
                    <Checkbox icon="fa-minus" value={selected} size="sm" onChange={call(toggle, !selected)}>
                      {selected ? 'Deselect' : 'Select'} All ({count})
                    </Checkbox>
                  </th>
                  <th></th>
                  {(smDown ? <></> :
                    <>
                      <th>
                        <Confirm
                          message="Are you sure you want to remove selected aircrafts from your hangar?"
                          ok={{ title: 'Remove Aircrafts' }}
                          onConfirm={call(this.bulkRemove)}>
                          {({ show }) => (
                            <a onClick={show} style={{ color: '#cf2f37', cursor: 'pointer' }}>Remove selected({ toRemove.length})</a>
                          )}
                        </Confirm>
                      </th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </>
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
                    <th colSpan={4}></th>
                  </tr>
                )}
              </>
            ),
            row: (aircraft, { index, odd, selected, toggle }) => {
              const { _id, aircraft_model, year } = aircraft,
                { aircraft_make, name } = aircraft_model,
                updates = pick(aircraft, [
                  'categories',
                  'frequency',
                  'products'
                ]),
                products = this.state.products[_id],
                open = products && products.active;
              return (
                <>
                  <tr className={clsx({ odd, open, selected })}>
                    <td>
                      <Checkbox value={selected} size="sm" productId={_id} onChange={call(toggle, !selected)} onToggle={this.selectProduct} />
                    </td>
                    {(!smDown ?
                      <>
                        <td>{aircraft_make.name}</td>
                        <td>{name}</td>
                        <td>{year || '-'}</td>
                        <td className="products">
                          <span
                            className={clsx('action', { 'with-badge': (index <= 1) })}
                            onClick={call(this.toggleProducts, aircraft)}>
                            {(this.putNewTag(aircraft) ?
                              <span className="badge">New</span> :
                              null
                            )}
                            <span>{open ? 'Hide' : 'Show'} related product(s)</span>
                          </span>
                        </td>
                        <td className="setting">
                          {/*<Settings {...updates} _id={_id} onHide={this.onHideSettings}>*/}
                          {/*{({ show }) => (*/}
                          {/*<span className="action" onClick={show}>*/}
                          {/*<span>Email Update Setting</span>*/}
                          {/*<Icon value="fa-ellipsis-v" />*/}
                          {/*</span>*/}
                          {/*)}*/}
                          {/*</Settings>*/}
                        </td>
                      </> :
                      <td>
                        {aircraft_make.name} - {name}<br />
                        Year: {year || '-'}
                      </td>
                    )}
                    <td className="delete">
                      <span className={clsx('add-to-hangar')} onClick={this.editAircraft(aircraft)}>
                        <Icon className="fa-edit"/>
                      </span>
                    </td>
                    <td className="delete">
                      <Confirm
                        message="Are you sure you want to remove this aircraft from your hangar?"
                        ok={{ title: 'Remove Aircraft' }}
                        onConfirm={call(this.remove, _id)}>
                        {({ show }) => (
                          <Icon value="fa-trash" onClick={show} />
                        )}
                      </Confirm>
                    </td>
                  </tr>
                  {(!open ? <></> :
                    <tr className="related">
                      <td colSpan={7}>
                        <Slider
                          busy={busy}
                          disabled={products.busy}
                          className="products"
                          data={products}
                          onReachEnd={call(this.loadProducts, aircraft)}>
                          {({ certificate, media, name, permalink }) => (
                            <>
                              <Link to={'/products/' + permalink}>
                                <Media media={(media || [])[0]} />
                                <h5>{name}</h5>
                                {(!certificate ? <></> :
                                  <h6>({certificate.reference})</h6>
                                )}
                              </Link>
                            </>
                          )}
                        </Slider>
                      </td>
                    </tr>
                  )}
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

  /**
   * Hangar cancel/back to hanger click
   */
  hangarCancelClick = (reload) => {
    this.setState({ selectedAircraft: null }, () => {
      if (reload) this.reload();
    });
  }

  /**
   * Load products
   */
  loadProducts(aircraft) {
    if (this.props.busy) {
      return;
    }
    const products = this.state.products[aircraft._id] || sliderInitialData;
    const start = products.length,
      limit = Math.min(products.count - start, itemsPerQuery);
    if (limit <= 0) {
      return;
    }

    let lastestNewProductDate = moment().subtract(1, 'months').format('YYYY-MM-DD');

    const filter = {
      aircraft_model: aircraft.aircraft_model._id,
      both: 1,
      limit,
      start,
      // created_at: lastestNewProductDate,
    };

    if (aircraft.newProductDate && new Date(lastestNewProductDate).getTime() <= new Date(moment(new Date(aircraft.newProductDate)).format('YYYY-MM-DD'))) {
      filter.created_at = lastestNewProductDate;
    }

    this.updateProducts(aircraft, {
      busy: true
    }, products);
    when(getProducts(filter)).then(({ count, results }) => {

      this.updateProducts(aircraft, {
        busy: false,
        count,
        items: {
          ...products.items,
          ...keyBy(results, '_id')
        },
        length: products.length + results.length
      });
    }).catch(() => {
      this.updateProducts(aircraft, {
        busy: false
      });
    });
  }

  /**
   * On hide settings
   */
  onHideSettings({ _id, reload }) {
    if (_id && (reload === true)) {
      this.reload();
    }
  }

  putNewTag(aircraft) {
    const lastestNewProductDate = moment().subtract(1, 'month').format('YYYY-MM-DD');
    return aircraft.newProductDate && new Date(lastestNewProductDate).getTime() <= new Date(moment(new Date(aircraft.newProductDate)).format('YYYY-MM-DD'));
  }

  /**
   * Reload
   */
  reload() {
    this.props.dispatch(getAircraftHangar());
  }

  /**
   * Remove an aircraft
   */
  remove(id) {
    this.props.dispatch(deleteAircraftHangar(id));
    return once(join(AIRCRAFT_HANGAR_DELETE, 'COMPLETE')).then(() => {
      this.reload();
    });
  }

  bulkRemove() {
    let toRemoveIds = this.state.toRemove;
    for (var i = 0; i < toRemoveIds.length; i++) {
      this.remove(toRemoveIds[i]);
    }
    this.setState({
      toRemove: []
    })
  }

  editAircraft = (selectedAircraft) => () => {
    this.setState({ selectedAircraft }, () => {
      if (typeof this.showHideHanger === 'function') {
        this.showHideHanger();
      }
    });
  }

  selectProduct(id) {
    let toRemove = this.state.toRemove;
    if (toRemove.includes(i)) {
      for (var i = 0; i < toRemove.length; i++) { if (toRemove[i] === id) { toRemove.splice(i, 1); break; } }
    } else {
      toRemove.push(id);
    }

    this.setState({
      toRemove
    })

  }

  /**
   * Toggle related products
   */
  toggleProducts(aircraft) {
    if (isUndefined(this.state.products[aircraft._id])) {
      this.loadProducts(aircraft);
    } else {
      this.updateProducts(aircraft, {
        active: !this.state.products[aircraft._id].active
      });
    }
  }

  /**
   * Update products
   */
  updateProducts(aircraft, extend, products) {
    this.setState((state) => ({
      products: {
        ...state.products,
        [aircraft._id]: {
          ...(products || state.products[aircraft._id]),
          ...extend
        }
      }
    }));
  }
}

export default connect(({ api: { aircraft, product }, app, router }) => {
  return {
    aircraft: aircraft.hangar,
    busy: product.products.busy,
    device: app.device,
    route: routeQuery(router)
  };
})(Aircraft);
