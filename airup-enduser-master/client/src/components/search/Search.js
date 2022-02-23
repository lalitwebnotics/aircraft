import fromPairs from 'lodash/fromPairs';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import keys from 'lodash/keys';
import size from 'lodash/size';
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';

import {bind, call, toQuery} from '../../utils';
import {routeQuery} from '../../routes';
import {reset, when} from '../../store';
import {
  AIRCRAFT_MAKE,
  AIRCRAFT_MODEL,
  getAircraftMake,
  getAircraftModel
} from '../../api/aircraft/actions';
import {
  PRODUCTS,
  getProducts,
  reloadProducts,
  trackProducts,
  getProductCountForCertificates
} from '../../api/product/actions';
import './Search.scss';
import Advertisement from '../advertisement/Advertisement';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import Button from '../utils/Button';
import SwitchButton from '../utils/Switch';
import Checkbox from '../inputs/checkbox/Checkbox';
import Hangar from '../popups/Hangar';
import Table from '../table/Table';
import Track from '../product/Track';
import { filter, pick } from 'lodash';
import { removeCertificateFilter, setSidebarSearch } from '../app/actions';

import AdHeader1 from '../../assets/advertisements/SERP _header_banner.png';

/**
 * Sort fields
 */
export const sortFields = {
  name: 'Product Name',
  manufacturer: 'Manufacturer',
  certificates: 'FAA-Approvals',
  stcMatch: 'STC Match',
  updated_at: 'Last Approved'
};

/**
 * Sort keys
 */
export const sortKeys = keys(sortFields);

/**
 * Search component
 */
class Search extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      breadcrumbs: {
        busy: true,
        links: {}
      },
      showOnlySTC: false,
      tracking: {}
    };
    bind(this, [
      'onReachEnd',
      'reset',
      'track',
      'manageStcOnlySwitchChange'
    ]);
    this.infinite = {
      action: PRODUCTS,
      onReachEnd: this.onReachEnd
    };
  }

  render() {
    const {search_filters = {}, device, products, route, auth: {user: {data: user}} = {}, aircraft: {model}} = this.props,
      smDown = includes(['xs', 'sm'], device),
      aircraft = this.getAircraft();

    let updatedProducts = JSON.parse(JSON.stringify(products));

    Object.values(updatedProducts.data).forEach((product) => {
      let includeSTCMake = false, includeSTCModel = false;

      product.certificates && product.certificates.length && product.certificates.forEach((cert) => {
        if (cert.ctype === 'STC') {
          product.isStc = true;
          if (model.data && model.data._id && model.data.aircraft_make && model.data.aircraft_make._id && cert.aircraft_makes.includes(model.data.aircraft_make._id)) {
            includeSTCMake = true;
          }
          if (model.data._id && cert.aircraft_models.includes(model.data._id)) {
            includeSTCModel = true;
          }
        }
      });

      product.includeSTCMake = includeSTCMake;
      product.includeSTCModel = includeSTCModel;

    });


    if (this.state.showOnlySTC) {
      Object.values(updatedProducts.data).forEach((product) => {
        let isStc = product.certificates && product.certificates.length && product.certificates.some((cert) => {
          return cert.ctype === 'STC'
        });

        if (!isStc) {
          delete updatedProducts.data[product._id];
        }
      })
    }

    return (
      <div className="Search">
        <div className="header">
          <Advertisement url={AdHeader1}/>
          <Breadcrumbs {...this.state.breadcrumbs}>
            {this.props.search_filters && this.props.search_filters.extend?.certificate && this.props.search_filters.extend?.certificate.split(',').map((certificate) => {
              return <Fragment>
                <span className="tag-block">{certificate} <span
                  onClick={() => this.onCertificateRemove(certificate)} className="close-tag">x</span></span>
              </Fragment>
            })}
          </Breadcrumbs>
          <Hangar aircraft={aircraft} loggedOut={!(user && user._id)}>
            {({show}) => (
              <span className={clsx('add-to-hangar', {disabled: !aircraft})} onClick={show}>
                + Add aircraft to hangar
              </span>
            )}
          </Hangar>
        </div>
        <Table {...updatedProducts} infinite={this.infinite} route={route}>
          {() => ({
            head: ({selected, sort, state, toggle}) => {
              const disabled = !state.selected.length || !isEmpty(this.state.tracking);
              return (
                <>
                  <tr>
                    <th>
                      <Checkbox icon="fa-minus" value={selected} size="sm" onChange={call(toggle, !selected)}>
                        {selected ? 'Deselect' : 'Select'} All ({size(products.data)})
                      </Checkbox>
                    </th>
                    {(smDown ? <></> :
                        <>
                          <th style={{display: 'flex', alignItems: 'center'}} colSpan="2">
                            <Button
                              variant="dark-blue"
                              size="sm"
                              className={clsx('track-multiple')}
                              style={{marginRight: '5px'}}
                              disabled={disabled}
                              onClick={call(this.track, state.selected, call(toggle, false))}
                            >
                              Track Selected ({state.selected.length})
                            </Button>
                            <div className="custom-switch">
                              <SwitchButton showOnlySTC={state.showOnlySTC}
                                            onStcShowChange={this.manageStcOnlySwitchChange}>
                                <span style={{marginLeft: '5px'}}> STC Matches Only</span>
                              </SwitchButton>
                            </div>
                          </th>
                          <th></th>
                          <th></th>
                          <th></th>
                          {model && model.data && model.data._id && ['multiple', 'hangar'].indexOf(search_filters.aircraft) == -1 && <th/>}
                        </>
                    )}
                    <th>
                      {(smDown ? sort(sortFields) :
                          <span
                            className={clsx('untrack-multiple', {disabled})}
                            onClick={call(this.track, state.selected, call(toggle, false), false)}>
                          Untrack selected ({state.selected.length})
                        </span>
                      )}
                    </th>
                  </tr>
                  {(smDown ? <></> :
                      <tr>
                        <th></th>
                        {sortKeys.map((key) => {
                          if (key === 'stcMatch' && ((!model.data._id) || ['multiple', 'hangar'].indexOf(search_filters.aircraft) != -1)) {
                            return null;
                          }
                          return <th key={key}>{sort(key, sortFields[key])}</th>
                        })}
                        <th></th>
                      </tr>
                  )}
                </>
              );
            },
            row: (product, {odd, selected, toggle}) => {
              const {certificates, manufacturer, name, permalink, updated_at, isStc} = product,
                active = false;
              return (
                <tr className={clsx({active, odd, selected})}>
                  <td><Checkbox value={selected} size="sm" onChange={call(toggle, !selected)}/></td>
                  <td>
                    <Link className="link-product" to={'/products/' + permalink + toQuery(route.query)}>
                      {name}
                    </Link>
                    {(!smDown ? <></> :
                        <>
                          <br/>
                          <Link className="link-manufacturer" to="/">{manufacturer.name}</Link><br/>
                          <span
                            className="text-last-approved">Last approved on {moment(updated_at).format('MMM DD, YYYY')}</span><br/>
                          <Track product={product}/>
                        </>
                    )}
                  </td>
                  {(smDown ? <></> :
                      <>
                        <td><Link to="/">{manufacturer.name}</Link></td>
                        <td>
                          {certificates && certificates.length ? certificates.map((cert, i) => (<Fragment key={i}>
                            <a href={`/api/v1/certificates/pdf/${cert.permalink}`} key={i}
                               target={"_blank"}>{cert.name}</a>{i < certificates.length - 1 && ', '}
                          </Fragment>)) : '-'}
                        </td>
                        {model && model.data && model.data._id && ['multiple', 'hangar'].indexOf(search_filters.aircraft) == -1 &&
                        <td>
                          <span
                            className={!product.includeSTCMake ? 'stc-no-match' : ''}>{model.data.aircraft_make.name} &nbsp;
                            {product.includeSTCMake ? <span>&#10003;</span> : '?'} &nbsp; &nbsp;
                         </span>

                          <span className={!product.includeSTCModel ? 'stc-no-match' : ''}>
                            {model.data.name} &nbsp;
                            {product.includeSTCModel ? <span>&#10003;</span> : '?'} &nbsp; &nbsp;
                            </span>
                        </td>}
                        <td>{moment(updated_at).format('MMM DD, YYYY')}</td>
                        <td>
                          <Track
                            busy={this.state.tracking[product._id]}
                            product={product}
                          />
                        </td>
                      </>
                  )}
                </tr>
              );
            }
          })}
        </Table>
      </div>
    );
  }

  componentDidMount() {
    this.manageBreadcrumbs();
    this.manageSearch();
  }

  componentDidUpdate(props, state) {
    this.manageBreadcrumbs(props, state);
    this.manageSearch(props, state);
  }

  componentWillUnmount() {
    this.reset();
  }

  onCertificateRemove(cert) {
    this.props.dispatch(removeCertificateFilter(cert));
  }

  /**
   * Get aircraft
   */
  getAircraft() {
    if (!this.props.aircraft.model.count) {
      return null;
    }
    const {year} = this.props.route.query || {};
    return {
      aircraft_model: {
        ...this.props.aircraft.model.data
      },
      ...(year ? {year} : {})
    };
  }

  /**
   * Manage breadcrumbs
   */
  manageBreadcrumbs(props, state) {
    const first = isUndefined(props) && isUndefined(state),
      { dispatch } = this.props,
      { make, model } = this.props.aircraft,
      { query } = this.props.route,
      { year } = query;
    let newLinks = {};
    if (query.aircraft_make && make && make.data.permalink) {
      newLinks['/search?aircraft_make=' + make.data.permalink] = make.data.name
    }
    if (query.aircraft_model && model && model.data && model.data.permalink) {
      const modelUrl = '/search?aircraft_model=' + model.data.permalink;
      newLinks['/search?aircraft_make=' + model.data.aircraft_make.permalink] = model.data.aircraft_make.name;
      newLinks[modelUrl] = model.data.name;
      if (query.year) {
        newLinks[modelUrl + '&year=' + year] = query.year
      }
    }
    if (!first && props.search_filters && ['multiple', 'hangar'].indexOf(this.props.search_filters.aircraft) != -1) {
      newLinks = {
        '/search': 'Multiple'
      };
    }
    if (first || !isEqual(query, pick(props.route.query, ['aircraft_make', 'aircraft_model']))) {
      if (
        query.aircraft_model &&
        (
          !(model && (model.busy || (model.data && model.data.permalink)))
        )
      ) {
        dispatch(getAircraftModel(query.aircraft_model));
        reset(AIRCRAFT_MAKE);
        this.setBreadcrumbs();
      } else if (
        query.aircraft_make &&
        (
          !(make && (make.busy || (make.data && make.data.permalink)))
        )
      ) {
        dispatch(getAircraftMake(query.aircraft_make));
        this.setBreadcrumbs();
        reset(AIRCRAFT_MODEL);
      } else if (state && state.breadcrumbs && state.breadcrumbs.busy) {
        this.setState(({breadcrumbs}) => ({
          breadcrumbs: {
            ...breadcrumbs,
            busy: false
          }
        }));
      }
    }
    if (!first && (
      !isEqual(newLinks, this.state.breadcrumbs.links) ||
      (!(make.busy || model.busy) && this.state.breadcrumbs.busy)
    )) {
      this.setState({
        breadcrumbs: {
          busy: false,
          links: {
            ...newLinks
          }
        }
      });
    }
  }

  manageStcOnlySwitchChange({target: {checked}}) {
    this.setState({
      showOnlySTC: checked
    })
  }

  /**
   * Manage search
   */
  manageSearch(props, state) {
    const first = isUndefined(props) && isUndefined(state);
    const query = this.props.route.query;

    let filters = this.props.search_filters;

    let manufacturerFilters = [];
    let aircraftMakesFilters = [];
    let aircraftModelsFilters = [];

    if (filters.manufacturers) {
      manufacturerFilters = filters.manufacturers.filter(m => m.active == true).map(x => {
        return x.manufacturer.value._id + ""
      })

      query.manufacturers = manufacturerFilters
    }

    if (filters.aircrafts) {
      aircraftMakesFilters = filters.aircrafts.filter(m => m.active == true && m.make.value).map(x => {
        return x.make.value._id + ""
      });
      aircraftModelsFilters = filters.aircrafts.filter(m => m.active == true && m.model.value).map(x => {
        const makeIndex = aircraftMakesFilters.indexOf(x.model.value.aircraft_make._id);
        if (makeIndex != -1) {
          aircraftMakesFilters.splice(makeIndex, 1);
        }
        return x.model.value._id + ""
      });
      
      query[(Boolean(query.approved) ? 'approved_' : '') + 'aircraft_makes'] = aircraftMakesFilters;
      query[(Boolean(query.approved) ? 'approved_' : '') + 'aircraft_models'] = aircraftModelsFilters;
      if (
        ['multiple', 'hangar'].indexOf(filters.aircraft) != -1 &&
        query.aircraft_model &&
        (aircraftMakesFilters.length || aircraftModelsFilters.length)
      ) {
        delete query.aircraft_model;
      }
    }
    if (filters.hangar && filters.hangar.filter(m => m.active).length) {
      aircraftModelsFilters = filters.hangar.filter(m => m.active == true && m.aircraft.value && m.aircraft.value.aircraft_model).map(x => {
        aircraftMakesFilters.push(x.aircraft.value.aircraft_model.aircraft_make._id + "");
        return x.aircraft.value.aircraft_model._id + ""
      });

      query.aircraft_models = aircraftModelsFilters
    }

    if (filters.extend && filters.extend.certificate) {
      query.certificate = filters.extend.certificate
    }

    if (filters.name) {
      query.name = filters.name
    }


    if (first || !isEqual(query, props.route.query)) {
      this.props.dispatch(getProducts(query));
      this.props.dispatch(getProductCountForCertificates(query));
    }
  }

  /**
   * On reach end
   */
  onReachEnd() {
    const length = size(this.props.products.data);
    if (length < this.props.products.count) {
      const {query} = this.props.route;
      this.props.dispatch(getProducts({
        ...query,
        limit: length + 10
      }));
    }
  }

  /**
   * Reset
   */
  reset() {
    this.props.dispatch(setSidebarSearch([]));
    reset(AIRCRAFT_MAKE, AIRCRAFT_MODEL, PRODUCTS);
    this.setBreadcrumbs();
  }

  handleSidebarSearch(products) {


  }

  /**
   * Set breadcrumbs
   */
  setBreadcrumbs(links = {}) {
    this.setState({
      breadcrumbs: {
        busy: isEmpty(links),
        links
      }
    });
  }

  /**
   * Track
   */
  async track(selected, callback, track = true) {
    this.setState({
      tracking: fromPairs(selected.map((id) => [id, true]))
    });
    try {
      await when(trackProducts({
        id: selected,
        track
      }));
      await when(reloadProducts({
        id: selected
      }));
    } catch (error) {
      await Promise.resolve();
    }
    if (isFunction(callback)) {
      callback();
    }
    this.setState({
      tracking: {}
    });
  }
}

export default connect((state) => {
  const {api: {aircraft, product, user: {auth}}, app: {device, search}, router} = state;
  return {
    device,
    aircraft: {
      make: aircraft.make,
      model: aircraft.model
    },
    auth: {user: auth},
    products: product.products,
    search_filters: search,
    route: routeQuery(router)
  };
})(Search);
