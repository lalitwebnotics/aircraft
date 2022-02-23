import fromPairs from 'lodash/fromPairs';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import keys from 'lodash/keys';
import pick from 'lodash/pick';
import trimStart from 'lodash/trimStart';
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import CertificateFilter from './CertificateFilter'
import { setSidebarSearch } from '../app/actions';

import { bind, call } from '../../utils';
import {
  getAircraftHangar,
  getAircraftMakes,
  getAircraftModels
} from '../../api/aircraft/actions';
import {
  getManufacturers,
} from '../../api/manufacturer/actions';
import { sidebarFiltersToggle } from '../app/actions';
import './Sidebar.scss';
import Accordion from '../accordion/Accordion';
import Advertisement from '../advertisement/Advertisement';
import Checkbox from '../inputs/checkbox/Checkbox';
import Icon from '../utils/Icon';
import Radio from '../inputs/radio/Radio';
import Selector from '../selector/Selector';
import Text from '../inputs/text/Text';
import { components } from 'react-select';
import api from '../../api';
import { filter } from 'lodash';

import SideAd1 from '../../assets/advertisements/SERP_ad_1.png';
import SideAd2 from '../../assets/advertisements/SERP_ad_2.png';

/**
 * Create empty aircraft filter
 */
export function createEmptyAircraftFilter() {
  return {
    active: false,
    make: {
      value: null,
      ref: createRef()
    },
    model: {
      value: null,
      ref: createRef()
    },
    year: {
      value: '',
      ref: createRef()
    }
  };
}

/**
 * Create empty hangar filter
 */
export function createEmptyHangarFilter() {
  return {
    active: false,
    aircraft: {
      value: null,
      ref: createRef()
    }
  };
}

/**
 * Create empty hangar filter
 */
export function createEmptyManufacturerFilter() {
  return {
    active: false,
    manufacturer: {
      value: null,
      ref: createRef()
    }
  };
}

/**
 * Sidebar component
 */
class Sidebar extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      filters: {
        keyword: '',
        aircraft: 'all',
        aircrafts: [
          createEmptyAircraftFilter()
        ],
        hangar: [
          createEmptyHangarFilter()
        ],
        manufacturers: [
          createEmptyManufacturerFilter()
        ]
      },
      years: {}
    };
    bind(this, [
      'getAircraftMenu',
      'getManufacturerMenu',
      'loadAircraftHangar',
      'loadAircraftMakes',
      'loadAircraftModels',
      'loadManufacturers',
      'onChangeFilter',
      'showSelector',
      'toggleFilters',
      'onSelectCertificate'
    ]);
  }

  render() {
    const { active } = this.props,
          { filters } = this.state,
          { keyword } = filters,
          base = trimStart(this.props.router.location.pathname, '/').split('/')[0].toLowerCase(),
          useForm = (['search'].indexOf(base) >= 0);
    return (
      <div className={clsx('Sidebar', { active })}>
        {(!useForm ? '' :
          <>
            <div className="keyword">
              <Text
                className="with-border"
                icon="fa-search"
                name="keyword"
                placeholder="Search for a product"
                value={keyword}
                onChange={this.onChangeFilter}
              />
              <span className="toggle" onClick={this.toggleFilters}>
                <Icon value="fas-sliders-v" />
              </span>
            </div>
            <div className="filters">
              <Accordion>
                {() => ({
                  aircraft: {
                    title: `Aircraft${filters.aircraft === 'multiple' ? `(${filters.aircrafts.length - 1})` : ''}`,
                    render: this.getAircraftMenu
                  },
                  manufacturer: {
                    title: `Manufacturer${filters.manufacturer === 'multiple' ? `(${filters.manufacturers.length - 1})` : ''}`,
                    render: this.getManufacturerMenu
                  },
                  advancedSearch: {
                    title: `Certification${filters.certificate ? `(${filters.certificate.split(',').length})` : ''}`,
                    render: this.getAdvancedSearchMenu(this)
                  }
                })}
              </Accordion>
            </div>
          </>
        )}
        <div className={clsx('advertisements', { grow: !useForm })}>
          {(useForm ? '' :
            <Advertisement url={SideAd1} link="https://www.aircraftspruce.com/" />
          )}
          <Advertisement url={SideAd1} link="https://www.aircraftspruce.com/" />
          <Advertisement url={SideAd2} link="https://www.aircraftspruce.com/menus/st/manu_gar.html" />
        </div>
      </div>
    );
  }

  /**
   * Advanced search
   */
  getAdvancedSearchMenu(component) {
    const { productCounts: { data = {} } = {} } = component.props;
    return (
      <CertificateFilter onSelectCertificate={component.onSelectCertificate} label="STC" counts={data}></CertificateFilter>
    );
  }

  /**
   * Aircraft menu
   */
  getAircraftMenu() {
    const { makes, models } = this.props.aircraft,
          { filters, years } = this.state;
    const {auth: {user: {data: user}}} = this.props;
    const [all, multiple, hangar] = this.getRadios('aircraft', [
      'all',
      'multiple',
      'hangar'
    ]);

    return (
      <ul>
        <li>
          <Radio {...all}>All aircrafts</Radio>
        </li>
        <li>
          <Radio {...multiple}>By specific aircrafts</Radio>
          <div className="subcontent">
            {filters.aircrafts.map((aircraft, i) => (
              <div className="subcontent-item" key={i}>
                <div className="item-header">
                  <Checkbox value={aircraft.active} className="fit" onChange={({ target: { value } }) => {
                    if (value && !aircraft.make.value) {
                      this.showSelector(aircraft, 'make');
                    } else {
                      this.setAircraftFilter(i, () => (value ? {
                        active: value
                      } : null));
                    }
                  }}>{(aircraft.make.value || {}).name || 'Select a brand'}</Checkbox>
                  <Selector
                    {...makes}
                    reference={aircraft.make.ref}
                    item={({ name }) => name}
                    selected={aircraft.make.value ? aircraft.make.value._id : null}
                    onShow={this.loadAircraftMakes}
                    onSelect={(value) => {
                      this.setAircraftFilter(i, (state) => ({
                        active: true,
                        make: {
                          ...state.make,
                          value
                        },
                        model: {
                          ...state.model,
                          value: null
                        },
                        year: {
                          ...state.year,
                          value: ''
                        }
                      }));
                    }}
                  />
                </div>
                {(!aircraft.active ? <></> :
                  <div className="item-content">
                    <div className="sub-item">
                      <span onClick={call(this.showSelector, aircraft, 'model')}>
                        {(aircraft.model.value || {}).name || 'Select a model'}
                      </span>
                      <Selector
                        {...models}
                        reference={aircraft.model.ref}
                        item={({ name }) => name}
                        selected={aircraft.model.value ? aircraft.model.value._id : null}
                        onShow={call(this.loadAircraftModels, aircraft.make.value._id)}
                        onSelect={(value) => {
                          this.setAircraftFilter(i, (state) => ({
                            model: {
                              ...state.model,
                              value
                            },
                            year: {
                              ...state.year,
                              value: ''
                            }
                          }));
                          this.setState({
                            years: fromPairs(value.years.map((year) => [year, year]))
                          });
                        }}
                      />
                    </div>
                    {(!aircraft.model.value ? <></> :
                      <div className="sub-item">
                        <span onClick={call(this.showSelector, aircraft, 'year')}>
                          {aircraft.year.value || 'Select a year'}
                        </span>
                        <Selector
                          data={years}
                          reference={aircraft.year.ref}
                          selected={aircraft.year.value}
                          onSelect={(value) => {
                            this.setAircraftFilter(i, (state) => ({
                              year: {
                                ...state.year,
                                value
                              }
                            }));
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </li>
        {user && user._id && <li>
          <Radio {...hangar}>By hangar aircraft</Radio>
          <div className="subcontent">
            {filters.hangar.map((aircraft, i) => (
              <div className="subcontent-item" key={i}>
                <div className="item-header">
                  <Checkbox value={aircraft.active} className="fit" onChange={({ target: { value } }) => {
                    if (value && !aircraft.aircraft.value) {
                      this.showSelector(aircraft, 'aircraft');
                    } else {
                      this.setHangarFilter(i, () => (value ? {
                        active: value
                      } : null));
                    }
                  }}>
                    {(aircraft.aircraft.value ? this.getHangarAircraftFullName(aircraft.aircraft.value) : 'Select aircraft' )}</Checkbox>
                  <Selector
                    {...this.props.aircraft.hangar}
                    reference={aircraft.aircraft.ref}
                    item={this.getHangarAircraftFullName}
                    selected={aircraft.aircraft.value ? aircraft.aircraft.value._id : null}
                    onShow={this.loadAircraftHangar}
                    onSelect={(value) => {
                      this.setHangarFilter(i, (state) => ({
                        active: true,
                        aircraft: {
                          ...state.aircraft,
                          value
                        }
                      }));
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="subcontent-item">
              <Link to="/hangar">+ Add aircraft to hangar</Link>
            </div>
          </div>
        </li>}
      </ul>
    );
  }


  /**
   * Function menu
   */
  getFunctionMenu() {
    return (
      <></>
    );
  }

  onSelectCertificate(certificate){
    this.setState((state) => {
      const extend = {
        certificate
      };

      this.props.dispatch(setSidebarSearch({
        ...state.filters,
        extend
      }));

      return {
        filters: {
          ...state.filters,
          certificate
        }
      };
    });
  }

  /**
   * Hangar aircraft full name
   */
  getHangarAircraftFullName({ aircraft_model }) {
    return aircraft_model.aircraft_make.name + ' ' + aircraft_model.name;
  }

  /**
   * Manufacturer menu
   */
  getManufacturerMenu() {
    const { manufacturers } = this.props.manufacturer,
          { filters } = this.state;
    const [all, multiple, hangar] = this.getRadios('manufacturer', [
      'all',
      'multiple'
    ]);

    return (
      <ul>
        <li>
          <Radio {...all}>All manufacturers</Radio>
        </li>
        <li>
          <Radio {...multiple}>By specific manufacturer</Radio>
          <div className="subcontent">
            {filters.manufacturers.map((manufacturer, i) => (
              <div className="subcontent-item" key={i}>
                <div className="item-header">
                  <Checkbox value={manufacturer.active} className="fit" onChange={({ target: { value } }) => {
                    if (value && !manufacturer.value) {
                      this.showSelector(manufacturer, 'manufacturer');
                    } else {
                      this.setManufacturerFilter(i, () => (value ? {
                        active: value
                      } : null));
                    }
                  }}>
                    {(manufacturer.manufacturer.value || {}).name || 'Select a brand'}
                  </Checkbox>
                  <Selector
                    {...manufacturers}
                    reference={manufacturer.ref}
                    item={({ name }) => name}
                    selected={manufacturer.manufacturer.value ? manufacturer.manufacturer.value._id : null}
                    onShow={this.loadManufacturers}
                    onSelect={(value) => {
                      this.setManufacturerFilter(i, (state) => ({
                        active: true,
                        manufacturer: {
                          ...state.manufacturer,
                          value
                        }
                      }));
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </li>
      </ul>
    );
  }

  /**
   * Get radios
   */
  getRadios(name, values) {
    return values.map((value) => {
      return {
        name,
        onSelect: this.onChangeFilter,
        selected: this.state.filters[name],
        value
      };
    });
  }

  /**
   * Load aircraft hangar
   */
  loadAircraftHangar() {
    if (!this.props.aircraft.hangar.busy && isEmpty(this.props.aircraft.hangar.data)) {
      this.props.dispatch(getAircraftHangar({ limit: 1000 }));
    }
  }

  /**
   * Load aircraft makes
   */
  loadAircraftMakes() {
    if (!this.props.aircraft.makes.busy && isEmpty(this.props.aircraft.makes.data)) {
      this.props.dispatch(getAircraftMakes({ limit: 1000 }));
    }
  }

  /**
   * Load manufacturers
   */
  loadManufacturers() {
    if (!this.props.manufacturer.busy && isEmpty(this.props.manufacturer.data)) {
      this.props.dispatch(getManufacturers({ limit: 1000 }));
    }
  }

  /**
   * Load aircraft models
   */
  loadAircraftModels(aircraft_make) {
    const { data } = this.props.aircraft.models;
    if (isEmpty(data) || (data[keys(data)[0]].aircraft_make._id !== aircraft_make)) {
      this.props.dispatch(getAircraftModels({
        aircraft_make,
        limit: 1000
      }));
    }
  }

  /**
   * On filter change
   */
  onChangeFilter({ target: { name, value } }) {
    this.setState((state) => {
      const extend = {
        [name]: value
      };

      let keyword;

      if (name === 'keyword') {
        keyword = value
      }

      if (name === 'aircraft' && value === 'all') {
        state.filters.aircrafts = state.filters.aircrafts.filter(ac => !ac.active);
        state.filters.hangar = state.filters.hangar.filter(ac => !ac.active);
      } else if (name === 'aircraft' && value === 'multiple') {
        state.filters.hangar = state.filters.hangar.filter(ac => !ac.active);
      } else if (name === 'aircraft' && value === 'hangar') {
        state.filters.aircrafts = state.filters.aircrafts.filter(ac => !ac.active);
      }

      if (name === 'manufacturer' && value === 'all') {
        state.filters.manufacturers = state.filters.manufacturers.filter(m => !m.active);
      }

      this.props.dispatch(setSidebarSearch({
        ...state.filters,
        ...extend,
        name: keyword
      }));

      return {
        filters: {
          ...state.filters,
          ...extend
        }
      };
    });
  }

  /**
   * Set filter
   */
  setFilter(index, value, filter, name, create) {
    this.setState((state) => {
      const update = isFunction(value) ? value(state.filters[filter][index]) : value
      const data = [
        ...state.filters[filter].slice(0, index),
        ...((update !== null) ? [{
          ...state.filters[filter][index],
          ...update
        }] : []),
        ...state.filters[filter].slice(index + 1)
      ];
      if (data[data.length - 1][name].value !== null) {
        data.push(create());
      }

      this.props.dispatch(setSidebarSearch({
        ...state.filters,
        [filter]: data
      }));

      return {
        filters: {
          ...state.filters,
          [filter]: data
        }
      };
    });

  }

  /**
   * Set aircraft make
   */
  setAircraftFilter(index, aircraft) {
    return this.setFilter(index, aircraft, 'aircrafts', 'make', createEmptyAircraftFilter);
  }

  /**
   * Set hangar filter
   */
  setHangarFilter(index, hangar) {
    return this.setFilter(index, hangar, 'hangar', 'aircraft', createEmptyHangarFilter);
  }

   /**
   * Set manufacturer filter
   */
  setManufacturerFilter(index, hangar) {
    return this.setFilter(index, hangar, 'manufacturers', 'manufacturer', createEmptyManufacturerFilter);
  }

  /**
   * Show selector
   */
  showSelector(filter, type) {
    if(filter[type].ref.current){
      setTimeout(filter[type].ref.current.show);
    }
  }

  /**
   * Toggle filters
   */
  toggleFilters() {
    this.props.dispatch(sidebarFiltersToggle());
  }
}

export default connect(({ api: { aircraft, manufacturer, product, user: {auth} }, app, router }) => {
  return {
    active: app.sidebar.filters,
    auth: {user: auth},
    productCounts: product.productCountForCertificates,
    aircraft: pick(aircraft, [
      'hangar',
      'makes',
      'models'
    ]),
    manufacturer: pick(manufacturer, ['manufacturers']),
    router
  };
})(Sidebar);
