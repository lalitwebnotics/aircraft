import fromPairs from 'lodash/fromPairs';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { bind, call, toQuery } from '../../utils';
import { when } from '../../store';
import { redirect } from '../../routes';
import {
  getAircraftMakes,
  getAircraftModels
} from '../../api/aircraft/actions';
import { getManufacturers } from '../../api/manufacturer/actions';
import {
  getProductsCountAll,
  getProductsCountAircraftMakes,
  getProductsCountAircraftModels,
  getProductsCountApprovedAircraftMakes,
  getProductsCountApprovedAircraftModels,
  getProductsCountCategories,
  getCategories
} from '../../api/product/actions';
import { createAircraft } from '../../api/aircraft/actions';

import './Home.scss';
import Advertisement from '../advertisement/Advertisement';
import CertificateFilter from './CertificateFilter';
import Button from '../utils/Button';
import Column from '../grid/Column';
import Container from '../grid/Container';
import Dropdown from '../inputs/dropdown/Dropdown';
import Loader from '../utils/loader/Loader';
import Row from '../grid/Row';
import Hangar from '../popups/Hangar';

import AdHome1 from '../../assets/advertisements/home_page_ad_1.png';
import AdHome2 from '../../assets/advertisements/home_page_ad_2.png';


export const videoRatio = 1.773809523809524;

/**
 * Home component
 */
class Home extends Component {

  constructor(...args) {
    super(...args);

    this.dropdowns = {};
    this.home = createRef();
    this.video = createRef();
    this.state = {
      makes: {},
      make: null,
      models: {},
      model: null,
      categories: {},
      category: null,
      ready: false,
      years: {},
      year: null,
      extra_filters: false,
      certificate: null,
      manufacturer: null,
      manufacturers: null
    };

    bind(this, [
      'initDropdown',
      'onOpenDropdown',
      'onSelectMake',
      'onSelectModel',
      'onSelectYear',
      'toggleExtraFilters',
      'onSelectCertificate',
      'onSelectCategory',
      'onSelectManufacturer',
      'getSearchPayload',
      'addAircraftToHangar'
    ]);

  }

  render() {
    const { makes, make, models, model, categories, category, ready, years, year, extra_filters, manufacturer, manufacturers } = this.state;
    const { auth: { data } } = this.props;
    const {
      countAll,
      countAircraftMakes,
      countAircraftModels,
      countApprovedAircraftMakes,
      countApprovedAircraftModels
    } = this.props.product;
    return (
      <div className={clsx('Home', { ready })} ref={this.home}>
        <div className="intro">
          <h1>Select your aircraft</h1>
          <p>Identify all existing and stay up to date on all FAA-Approved Parts for your aircraft model.</p>
        </div>
        <div className={clsx('main', { wide: !!make, pull: !!make })}>
          <div className="inputs clearfix">
            <div className="input">
              <Dropdown
                busy={this.props.aircraft.makes.busy}
                className="dropdown-make"
                empty="No makes available..."
                id="dropdown-make"
                items={makes}
                onChange={this.onSelectMake}
                onInit={call(this.initDropdown)}
                onOpen={call(this.onOpenDropdown)}
                placeholder="Select a manufacturer"
                position="left"
                value={make}
              />
            </div>
            <div className="input">
              <Dropdown
                busy={this.props.aircraft.models.busy}
                className="dropdown-model"
                empty="No models available..."
                id="dropdown-model"
                items={models}
                onChange={this.onSelectModel}
                onInit={call(this.initDropdown)}
                onOpen={call(this.onOpenDropdown)}
                placeholder="Model"
                value={model}
              />
            </div>
            <div className="input">
              <Dropdown
                className="dropdown-year"
                empty="No years available..."
                id="dropdown-year"
                items={years}
                onChange={this.onSelectYear}
                onInit={call(this.initDropdown)}
                onOpen={call(this.onOpenDropdown)}
                placeholder="Year"
                position="right"
                value={year}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <p className={clsx('text-center', { none: !make })} id="moreFilterText">
              <a href="#" onClick={this.toggleExtraFilters} >
                More Filters
                  <i className={clsx('Icon', 'fas', extra_filters ? 'fas-caret-up' : 'fas-caret-down', 'arrow')}   ></i>
              </a>
            </p>
            <CertificateFilter sectionClass={clsx({ none: !extra_filters })} onSelectCertificate={this.onSelectCertificate} label="STC" />
          </div>
          <div className={clsx('clearfix', { none: !extra_filters })} id="categoriesFilterSection">
            <div className="category-home-input">
              <Dropdown
                className="dropdown-model2"
                empty="No categories available..."
                id="dropdown-category"
                items={categories}
                onChange={this.onSelectCategory}
                placeholder="All categories"
                value={category}
              />
            </div>
            <div className="manufacturer-home-input">
              <Dropdown
                className="dropdown-model2"
                empty="No manufacturer available..."
                id="dropdown-manufacturer"
                items={manufacturers}
                onChange={this.onSelectManufacturer}
                placeholder="All manufacturers"
                value={manufacturer}
              />
            </div>
          </div>
          <div className={clsx('buttons', { none: !make }, 'clearfix')}>
            <Button className="home-btn" variant="red" to={'/search' + this.getSearchQuery(true)}>
              {(countApprovedAircraftMakes.busy ||
                countApprovedAircraftModels.busy) ?
                <Loader /> :
                `See FAA-Approved Parts (${(model ? countApprovedAircraftModels : countApprovedAircraftMakes).count})`}
            </Button>
            <Button className="home-btn" variant="red" to={'/search' + this.getSearchQuery()}>
              {(countAircraftMakes.busy ||
                countAircraftModels.busy) ?
                <Loader /> :
                `See All Parts (${(model ? countAircraftModels : countAircraftMakes).count})`}
            </Button>
          </div>
          <div className="links clearfix">
            <span className="left">
              <span>Or, you can also</span>
              <Link className={clsx('count', { busy: countAll.busy })} to="/search">
                {countAll.busy ?
                  <Loader /> :
                  `view all products (${countAll.count})`
                }
              </Link>
            </span>
            {this.state.model && <Hangar aircraft={this.getAircraft()} loggedOut={!data || !data._id}>
              {({ show }) => <span className={clsx('right', { none: !make })}>
                <a
                  href="#"
                  onClick={show}
                  // onClick={this.addAircraftToHangar}
                >
                  + Add aircraft to hangar
                </a>
              </span>}
            </Hangar>}
          </div>
        </div>
        <div className="featured">
          <h5>Featured New FAA-Approved Products</h5>
          <Container>
            <Row>
              <Column count={6}><Advertisement url={AdHome1} link="https://www.aircraftspruce.com/menus/st/manu_gar.html" /></Column>
              <Column count={6}><Advertisement url={AdHome2} /></Column>
            </Row>
          </Container>
        </div>
        <video autoPlay={true} controls={false} loop={true} preload="true" ref={this.video}>
          <source src="/assets/videos/home-preview.mp4" type="video/mp4" />
        </video>
      </div>
    )
  }

  componentDidMount() {
    this.initVideo();
    this.props.dispatch(getProductsCountAll());
    this.props.dispatch(getCategories({ limit: 1000, sort: "name", order: "asc" }));
    this.props.dispatch(getManufacturers({ limit: 1000 }));
    this.props.dispatch(getAircraftMakes({
      limit: 1000
    }));
  }

  componentDidUpdate(props) {
    const makes = this.props.aircraft.makes.data,
      categories = this.props.categories.categories.data,
      manufacturers = this.props.manufacturer.manufacturers.data,
      models = this.props.aircraft.models.data;

    if ((props.aircraft.makes.data !== makes) || (!isEmpty(makes) && isEmpty(this.state.makes))) {
      this.setState({
        makes: mapValues(makes, 'name')
      });
    }
    if ((props.aircraft.models.data !== models || (!isEmpty(models) && isEmpty(this.state.models)))) {
      this.setState({
        models: mapValues(models, 'name')
      });
    }

    if ((props.categories.categories.data !== categories || (!isEmpty(categories) && isEmpty(this.state.categories)))) {
      this.setState({
        categories: mapValues(categories, 'name')
      });
    }

    if ((props.manufacturer.manufacturers.data !== manufacturers || (!isEmpty(manufacturers) && isEmpty(this.state.manufacturers)))) {
      this.setState({
        manufacturers: mapValues(manufacturers, 'name')
      });
    }
  }

  componentWillUnmount() {
    this.unresize();
  }

  /**
   * Get search query
   */
  getSearchQuery(approved = false) {
    const query = {};
    if (this.state.model) {
      if (this.props.aircraft.models.busy) {
        return query;
      }
      query.aircraft_model = this.props.aircraft.models.data[this.state.model].permalink;
      if (this.state.year) {
        query.year = this.state.year;
      }
    } else if (this.state.make) {
      if (this.props.aircraft.makes.busy) {
        return query;
      }
      query.aircraft_make = this.props.aircraft.makes.data[this.state.make].permalink;
    } else {
      return query;
    }
    query.approved = approved;
    return toQuery(query);
  }

  /**
   * Init dropdown
   */
  initDropdown(dropdown) {
    this.dropdowns[dropdown.id] = dropdown;
  }

  /**
   * Initialize video
   */
  initVideo() {
    const resize = () => {
      if (this.home.current && this.video.current) {
        const width = this.home.current.clientWidth,
          height = this.home.current.clientHeight,
          ratio = width / height;
        if (ratio > videoRatio) {
          this.video.current.style.width = width + 'px';
          this.video.current.style.height = (width / videoRatio) + 'px';
        } else if (ratio < videoRatio) {
          this.video.current.style.width = (height * videoRatio) + 'px';
          this.video.current.style.height = height + 'px';
        } else {
          this.video.current.style.width = width;
          this.video.current.style.height = height;
        }
      }
      if (!this.state.ready) {
        this.setState({
          ready: true
        });
      }
    };
    window.addEventListener('resize', resize, true);
    this.unresize = () => {
      window.removeEventListener('resize', resize, true);
    };
  }

  /**
   * On open dropdown
   */
  onOpenDropdown(id) {
    keys(this.dropdowns).forEach((key) => {
      if (key !== id) {
        this.dropdowns[key].toggle(false);
      }
    });
  }

  /**
   * On select make
   */
  onSelectMake({ target: { value } }) {

    this.setState({
      make: value,
      model: null,
      year: null
    });

    this.props.dispatch(getProductsCountAircraftMakes(this.getSearchPayload("make", value)));
    this.props.dispatch(getProductsCountApprovedAircraftMakes(this.getSearchPayload("make", value)));

    this.props.dispatch(getAircraftModels({
      aircraft_make: value,
      limit: 1000
    }));
  }

  /**
   * On select model
   */
  onSelectModel({ target: { value } }) {
    const models = this.props.aircraft.models.data || {};

    this.setState({
      model: value,
      year: null,
      years: fromPairs(
        ((models[value] || {}).years || [])
          .map((year) => ([year, year]))
      )
    });
    const payload = this.getSearchPayload("model", value);
    this.props.dispatch(getProductsCountApprovedAircraftModels(payload));
    this.props.dispatch(getProductsCountAircraftModels(payload));
  }

  toggleExtraFilters(ev) {

    ev.preventDefault();
    const { extra_filters } = this.state;

    this.setState({
      extra_filters: !extra_filters
    })
  }

  /**
   * On select year
   */
  onSelectYear({ target: { value } }) {
    this.setState({
      year: value
    });
  }


  onSelectCertificate(certificateCode) {
    this.setState({
      certificate: certificateCode,
    });

    this.props.dispatch(getProductsCountAircraftMakes(this.getSearchPayload("certificate", certificateCode)));
    this.props.dispatch(getProductsCountApprovedAircraftMakes(this.getSearchPayload("certificate", certificateCode)));
  }

  onSelectCategory({ target: { value } }) {

    this.setState({
      category: value,
    });

    this.props.dispatch(getProductsCountAircraftMakes(this.getSearchPayload("category", value)));
    this.props.dispatch(getProductsCountApprovedAircraftMakes(this.getSearchPayload("category", value)));
  }

  onSelectManufacturer({ target: { value } }) {
    this.setState({
      manufacturer: value,
    });

    this.props.dispatch(getProductsCountAircraftMakes(this.getSearchPayload("manufacturer", value)));
    this.props.dispatch(getProductsCountApprovedAircraftMakes(this.getSearchPayload("manufacturer", value)));
  }

  getSearchPayload(key, value) {
    const { make, model, manufacturer, category, certificate, year } = this.state

    let payload = {
      make: make,
      model: model,
      year: year,
      manufacturer: manufacturer,
      category: category,
      certificate: certificate
    };

    if (key) {
      payload[key] = value;
    }

    return payload;
  }

  getAircraft = () => {
    const { model, year } = this.state;
    const models = this.props.aircraft.models.data || {};
    return {
      aircraft_model: {
        _id: model,
        ...models[model]
      },
      ...(year ? { year } : {})
    };
  }

  addAircraftToHangar() {
    const { make, model } = this.state;
    if (model) {
      return when(createAircraft({
        aircraft_model: model,
      })).then(() => {
        redirect('/hangar');
      });
    }
  }

  dispatchProductsCountFetch(searchPayload) {
    const { make, model, manufacturer, category, certificate } = this.state;

    console.log(searchPayload);

    // this.props.dispatch(getProductsCountAircraftMakes(searchPayload));
    // this.props.dispatch(getProductsCountApprovedAircraftMakes(searchPayload));

    this.props.dispatch(getProductsCountAircraftModels(searchPayload));
    this.props.dispatch(getProductsCountApprovedAircraftModels(searchPayload));
  }

}

export default connect(
  ({ api: { aircraft, product, certificate, manufacturer, user }, app: {search} }) => {

    return {
      auth: user.auth,
      aircraft: {
        makes: aircraft.makes,
        models: aircraft.models
      },
      product: pick(product, [
        'countAll',
        'countAircraftMakes',
        'countAircraftModels',
        'countApprovedAircraftMakes',
        'countApprovedAircraftModels',
        'countCategories',
      ]),
      categories: {
        category: product.category,
        categories: product.categories
      },
      manufacturer: {
        manufacturer: manufacturer.manufacturer,
        manufacturers: manufacturer.manufacturers
      }
    };
  }
)(Home);
