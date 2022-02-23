import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { redirect } from '../../routes';
import { when } from '../../store';
import { bind, call } from '../../utils';
import { createAircraft, getAircraftMakes, getAircraftModels, updateAircraftHangar } from '../../api/aircraft/actions';
import { aircraft as AircraftAPI } from '../../api';
import Confirm from './Confirm';
import './Hangar.scss';
import Icon from '../utils/Icon';
import Button from "../utils/Button";
import { fromPairs, isEmpty, keyBy, keys, mapValues } from 'lodash';
import { connect } from 'react-redux';
import Dropdown from '../inputs/dropdown/Dropdown';

/**
 * Hangar popup
 */
export default class Hangar extends Component {

  constructor(...args) {
    super(...args);

    this.dropdowns = {};
    this.state = {
      makeList: {},
      makes: {},
      modelList: {},
      models: {},
      years: {},
      tailNumber: null,
      imageUrl: null,
      newImage: null,
      makeBusy: false,
      modelBusy: false,
      added: false,
      change: false
    };
    bind(this, [
      'onConfirm',
      'onSignUp',
      'fetchMakes',
      'fetchModels',
      'resetAircraft',
      'initDropdown',
      'onOpenDropdown',
      'getCancelButton',
      'getContent',
      'onSelectMake',
      'onSelectModel',
      'onSelectYear',
      'getMessage',
      'getOkButton',
      'onTailNumberChange',
      'onImageSelect',
      'removeImage'
    ]);
  }

  render() {
    const aircraftPresent = this.state.aircraft && this.state.aircraft.aircraft_model && this.state.aircraft.aircraft_model._id;
    return (
      <Fragment>
        {this.props.loggedOut && <Confirm
          message="Register to start tracking the latest updates!"
          ok={{
            exclusive: true,
            title: 'Sign Up',
            variant: 'red'
          }}
          onConfirm={this.onSignUp}>
          {this.props.children}
        </Confirm>}

        {!this.props.loggedOut && (this.props.withoutAircraft || aircraftPresent) && <Confirm
          className="HangarPopup"
          cancel={this.getCancelButton()}
          cancelClick={this.cancelClick}
          content={this.getContent()}
          message={this.getMessage()}
          ok={this.getOkButton()}
          onConfirm={this.onConfirm}>
          {this.props.children}
        </Confirm>}

      </Fragment>

    );
  }

  componentDidMount() {
    this.fetchMakes();
  }

  componentDidUpdate(props) {
    const { year, aircraft_model: { _id: model } = {} } = this.props.aircraft || {};
    if (
      this.props.aircraft && (
        (
          props.aircraft && (
            props.aircraft.year != year ||
            props.aircraft.aircraft_model._id != model
          )
        ) || (
          !props.aircraft
        )
      )
    ) {
      this.setState({
        aircraft: this.props.aircraft,
        tailNumber: this.props.aircraft.tailNumber,
        imageUrl: this.props.aircraft.imageUrl
      }, () => {
        const { aircraft_make: { _id: value } = {} } = this.props.aircraft.aircraft_model;
        this.onSelectMake({ target: { value } }, true);
      });
    }
  }

  cancelClick = (hide) => () => {
    if (this.state.change) {
      return this.resetAircraft();
    }
    const added = this.state.added;
    this.setState({
      aircraft: null,
      make: null,
      model: null,
      year: null,
      imageUrl: null,
      tailNumber: null,
      newImage: null,
      added: false
    }, () => {
      if (typeof this.props.onCancel === 'function') {
        this.props.onCancel(added);
      }
      hide();
    })
  }

  fetchMakes() {
    this.setState({ makeBusy: true });
    AircraftAPI.getMakes({
      limit: 1000
    })
      .then((data) => {
        const makeList = keyBy(data.results, '_id');
        this.setState({ makeBusy: false, makes: mapValues(makeList, 'name'), makeList });
      })
      .catch((err) => {
        this.setState({ makeBusy: false });
        console.error('error while fetching makes hanger popup', err);
      })
  }

  fetchModels(params, preSelect) {
    this.setState({ modelBusy: true, modelList: {}, models: {} });
    AircraftAPI.getModels(params)
      .then((data) => {
        const modelList = keyBy(data.results, '_id');
        this.setState({ modelBusy: false, models: mapValues(modelList, 'name'), modelList }, () => {
          if (preSelect) {
            this.onSelectModel({ target: { value: preSelect } }, true);
          }
        });
      })
      .catch((err) => {
        this.setState({ modelBusy: false });
        console.error('error while fetching models hanger popup', err);
      })
  }

  /**
   * Init dropdown
   */
  initDropdown(dropdown) {
    this.dropdowns[dropdown.id] = dropdown;
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
   * Get cancel button
   */
  getCancelButton() {
    return {
      title: this.state.change ? 'Reset' : (this.state.added ? (this.props.isHanger ? 'Back to Hanger' : 'Return to Search') : 'Cancel'),
      variant: this.state.change ? 'light-blue' : 'empty'
    };
  }

  /**
   * Get content
   */
  getContent() {
    if (!this.state.change && !this.state.aircraft) {
      return <div className={clsx('selected-aircraft', { added: this.state.added })}>
        <span className="link" onClick={() => this.setState({ change: true })}>Select Aircraft</span>
      </div>;
    }
    const name = [];
    if (this.state.aircraft) {
      name.push(this.state.aircraft.aircraft_model.aircraft_make.name);
      name.push(this.state.aircraft.aircraft_model.name);
      if (this.state.aircraft.year) {
        name.unshift(this.state.aircraft.year)
      }
    }
    const { make, makes, model, models, year, years, makeBusy, modelBusy } = this.state;
    return this.state.change ? (
      <>
        <div className="hanger-input-row">
          <div className="input">
            <Dropdown
              busy={makeBusy}
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
              busy={modelBusy}
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
      </>
    ) : (<>
      <div className={clsx('selected-aircraft', { added: this.state.added })}>
        <span>{name.join(' ')}</span>
        {(this.state.added ?
          <Icon value="fa-check" /> :
          <span className="link" onClick={() => this.setState({ change: true })}>Change</span>
        )}
      </div>
      <div className="hanger-input-col">
        <div className="input">
          <span className="input-label">Aircraft Tail Number(Optional)</span>
          <input type="text" disabled={this.state.added} value={this.state.tailNumber} placeholder={"Please Enter tail Number"} onChange={this.onTailNumberChange} />
        </div>
        <div className="input">
          <span className="input-label">Upload Picture of Your Aircraft</span>
          {(this.state.newImage || this.state.imageUrl) && <img src={this.state.newImage && this.state.newImage instanceof File ? window.URL.createObjectURL(this.state.newImage) : this.state.imageUrl} alt="aircraft-image"/>}
          <input id="aircraft-image" type="file" accept="image/*" disabled={this.state.added} onChange={this.onImageSelect} />
          <div className="file-btns">
            <label htmlFor="aircraft-image">
              {(this.state.newImage || this.state.imageUrl) ? 'Replace' : 'Add'} Picture
            </label>
            {(this.state.newImage || this.state.imageUrl) && <label onClick={this.removeImage}>Remove Picture</label>}
          </div>
        </div>
      </div>
    </>)
  }

  /**
   * On select make
   */
  onSelectMake({ target: { value } }, direct = false) {

    const { aircraft } = this.state;
    const { year = null, aircraft_model: { _id: model = null } = {} } = aircraft || {};

    this.setState({
      make: value,
      model: direct ? model : null,
      year: direct ? year : null
    });

    this.fetchModels({
      aircraft_make: value,
      limit: 1000
    }, model);
  }

  /**
   * On select model
   */
  onSelectModel({ target: { value } }, direct = false) {
    const { aircraft, modelList: models = {} } = this.state;
    const { year = null } = aircraft || {};

    this.setState({
      model: value,
      year: direct ? year : null,
      years: fromPairs(
        ((models[value] || {}).years || [])
          .map((year) => ([year, year]))
      )
    });
  }

  /**
   * On select year
   */
  onSelectYear({ target: { value } }) {
    this.setState({
      year: value
    });
  }

  onTailNumberChange({ target: { value } }) {
    this.setState({
      tailNumber: value
    });
  }

  onImageSelect({ target: { files } }) {
    if (files.length) {
      this.setState({
        newImage: files[0]
      });
    }
  }

  removeImage() {
    const fileInput = document.getElementById('aircraft-image');
    if (fileInput) {
      fileInput.value = '';
    }
    this.setState({
      newImage: null,
      imageUrl: null
    });
  }

  /**
   * Get message
   */
  getMessage() {
    return this.state.added ?
      'Your aircraft has been added to the hangar, and will begin populating products compatible products.' :
      'Are you sure you want to add this plane to your hangar to start tracking related FAA-Approved products?';
  }

  /**
   * Get ok button
   */
  getOkButton() {
    return {
      title: this.state.change ? 'Update Aircraft' : (this.state.added ? 'Go to Hangar' : 'Add to Hangar'),
      variant: 'dark-blue',
      hide: this.props.isHanger && this.state.added
    };
  }

  /**
   * On Reset change aircraft
   */
  resetAircraft() {
    const { aircraft } = this.props;
    const { year = null, aircraft_model: { _id: model = null, aircraft_make: { _id: make = null } = {} } = {} } = aircraft || {};
    this.setState({
      aircraft,
      make,
      model,
      year,
      change: false
    }, () => {
      if (make) {
        this.onSelectMake({ target: { value: make } });
      }
    });
  }

  /**
   * On confirm
   */
  onConfirm() {
    if (this.state.change) {
      const { model, year, modelList } = this.state;
      this.setState({
        aircraft: {
          aircraft_model: {
            _id: model,
            ...modelList[model]
          },
          ...(year ? { year } : {})
        },
        change: false
      });
      return false;
    }
    if (this.state.added) {
      return () => {
        redirect('/hangar');
      };
    }
    return when(createAircraft({
      aircraft_model: this.state.aircraft.aircraft_model._id,
      ...(!this.state.aircraft.year ? {} : {
        year: this.state.aircraft.year,
      }),
      tailNumber: this.state.tailNumber,
      imageUrl: this.state.imageUrl,
      newImage: this.state.newImage,
    })).then(() => {
      this.setState({
        added: true
      });
      return false;
    });
  }

  onUpdate() {
    if (this.state.change) {
      const { model, year, modelList } = this.state;
      this.setState({
        aircraft: {
          aircraft_model: {
            _id: model,
            ...modelList[model]
          },
          ...(year ? { year } : {})
        },
        change: false
      });
      return false;
    }
    if (this.state.added) {
      return () => {
        redirect('/hangar');
      };
    }
    return when(updateAircraftHangar({
      aircraft_model: this.state.aircraft.aircraft_model._id,
      ...(!this.state.aircraft.year ? {} : {
        year: this.state.aircraft.year,
      }),
      tailNumber: this.state.tailNumber,
      imageUrl: this.state.imageUrl,
      newImage: this.state.newImage,
    })).then(() => {
      this.setState({
        added: true
      });
      return false;
    });
  }

  /**
   * On Signup
   */
  onSignUp() {
    return () => {
      redirect('/register');
    };
  }
}
