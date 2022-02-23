import fromPairs from 'lodash/fromPairs';
import invert from 'lodash/invert';
import isFunction from 'lodash/isFunction';
import keys from 'lodash/keys';
import pick from 'lodash/pick';
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';

import { bind, call, setState } from '../../utils';
import { join, once, reset, when } from '../../store';
import {
  CATEGORY_UPDATES,
  EMAIL_FREQUENCIES,
  PRODUCT_UPDATES,
  TITLES
} from '../../api/aircraft/Aircraft';
import { AIRCRAFT_HANGAR_UPDATE, updateAircraftHangar } from '../../api/aircraft/actions';
import { getCategories } from '../../api/product/actions';
import './Settings.scss';
import AutoComplete from '../auto-complete/AutoComplete';
import Checkbox from '../inputs/checkbox/Checkbox';
import Button from '../utils/Button';
import Loader from '../utils/loader/Loader';
import Popup from '../popups/Popup';
import Selector from '../selector/Selector';
import Toggle from '../inputs/toggle/Toggle';

const INVERTED_EMAIL_FREQUENCIES = invert(EMAIL_FREQUENCIES);

/**
 * Hangar Settings popup
 */
class Settings extends Component {

  constructor(...args) {
    super(...args);
    this.autocomplete = createRef();
    this.frequency = createRef();
    this.state = {
      adding: false,
      cache: {},
      categories: {},
      frequency: EMAIL_FREQUENCIES.NONE,
      open: false,
      products: PRODUCT_UPDATES.NONE,
      ready: false
    };
    bind(this, [
      'addCategory',
      'getCategories',
      'onClick',
      'onHide',
      'onSave',
      'onShow',
      'selectCategory',
      'toggleCategory',
      'toggleProduct'
    ]);
  }

  render() {
    const { children } = this.props,
          { cache, categories, frequency, products, ready } = this.state,
          selectedFrequency = keys(EMAIL_FREQUENCIES).find((key) => (EMAIL_FREQUENCIES[key] === frequency)),
          { busy, error } = this.props.update,
          ids = keys(categories);
    const checkbox = {
      onChange: call(this.toggleProduct),
      size: 'xs'
    };
    return (
      <Popup className="HangarSettings" trigger={children} onClick={this.onClick} onHide={this.onHide} onShow={this.onShow}>
        {({ hide }) => (
          <>
            {(!ready ? <Loader /> :
              <>
                <div className="frequency">
                  <label>
                    <span>Email me:</span>
                    <strong>{TITLES.EMAIL_FREQUENCIES[INVERTED_EMAIL_FREQUENCIES[frequency]]}</strong>
                  </label>
                  <Selector
                    data={TITLES.EMAIL_FREQUENCIES}
                    reference={this.frequency}
                    selected={selectedFrequency}
                    onSelect={(value, key) => {
                      this.setState({
                        frequency: EMAIL_FREQUENCIES[key]
                      });
                    }}>
                    {({ toggle }) => (
                      <span className="change" onClick={toggle}>Change</span>
                    )}
                  </Selector>
                </div>
                <div className="products">
                  <Checkbox
                    name="approved"
                    value={products & PRODUCT_UPDATES.APPROVED}
                    {...checkbox}>
                    Receive updates on FAA-approved products
                  </Checkbox>
                  <Checkbox
                    name="nonapproved"
                    value={products & PRODUCT_UPDATES.NONAPPROVED}
                    {...checkbox}>
                    Receive updates on Non-FAA approved products
                  </Checkbox>
                </div>
                <div className="categories">
                  <div className="row head">
                    <div className="column name">
                      Receive updates on below categories:
                    </div>
                    <div className="column price">
                      Price Scan
                    </div>
                    <div className="column rebate">
                      Rebate Alerts
                    </div>
                  </div>
                  {ids.map((id) => {
                    const category = cache[id],
                          updates = categories[id],
                          active = updates & CATEGORY_UPDATES.ACTIVE,
                          toggle = {
                            disabled: !active,
                            onChange: call(this.toggleCategory, id),
                            variant: 'green'
                          };
                    return (
                      <div className="row category" key={category._id}>
                        <div className="column name">
                          <Checkbox name="active" value={active} size="xs" onChange={toggle.onChange}>{category.name}</Checkbox>
                        </div>
                        <div className="column price">
                          <Toggle name="price" value={updates & CATEGORY_UPDATES.PRICE} {...toggle} />
                        </div>
                        <div className="column rebate">
                          <Toggle name="rebate" value={updates & CATEGORY_UPDATES.REBATE} {...toggle} />
                        </div>
                      </div>
                    );
                  })}
                  <div className="row more">
                    {(this.state.adding ?
                      <AutoComplete
                        format={['_id', 'name']}
                        onBlur={() => {
                          this.setState({
                            adding: false
                          });
                        }}
                        onFetch={this.getCategories}
                        onSelect={this.selectCategory}
                        placeholder="Search category"
                        reference={this.autocomplete}
                      /> :
                      <span onClick={this.addCategory}>+ Add More Categories</span>
                    )}
                  </div>
                </div>
                {(!error ? '' :
                  <div className="messages error">
                    {error.message || 'Unknown error'}
                  </div>
                )}
                <div className="buttons">
                  <Button variant="dark-blue" className="save" disabled={busy} onClick={call(this.onSave, hide)}>
                    Save Changes
                  </Button>
                  <Button variant="empty" className="cancel" disabled={busy} onClick={hide}>
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </Popup>
    );
  }

  componentDidMount() {
    this.updateCache();
  }

  componentDidUpdate(props) {
    if (this.props.categories !== props.categories) {
      this.updateCache();
    }
  }

  /**
   * Add category
   */
  addCategory() {
    return setState(this, {
      adding: true
    }).then(() => {
      this.autocomplete.current.focus();
    });
  }

  /**
   * Get categories
   */
  getCategories(name) {
    return when(getCategories({
      limit: 10,
      name
    })).then(
      ({ results }) => results
    );
  }

  /**
   * On click
   */
  onClick() {
    this.frequency.current.hide();
  }

  /**
   * On hide
   */
  onHide(...args) {
    reset(AIRCRAFT_HANGAR_UPDATE);
    this.setState({
      open: false
    });
    if (isFunction(this.props.onHide)) {
      this.props.onHide(...args);
    }
  }

  /**
   * On save
   */
  onSave(hide) {
    const { _id } = this.props;
    this.props.dispatch(updateAircraftHangar({
      _id,
      ...pick(this.state, ['categories', 'frequency', 'products'])
    }));
    return once(join(AIRCRAFT_HANGAR_UPDATE, 'SUCCESS')).then(() => {
      hide({ _id, reload: true });
    });
  }

  /**
   * On show
   */
  onShow() {
    const { categories, frequency, products } = this.props
    this.setState({
      categories: fromPairs(categories.map(({ category, updates }) => [
        category._id,
        updates
      ])),
      frequency,
      open: true,
      products
    });
  }

  /**
   * Select category
   */
  selectCategory(id, data) {
    this.setState(({ cache, categories }) => ({
      cache: {
        ...cache,
        [id]: data
      },
      categories: {
        ...categories,
        [id]: keys(CATEGORY_UPDATES).reduce((sum, key) => (sum + CATEGORY_UPDATES[key]), 0)
      }
    }));
  }

  /**
   * Toggle category
   */
  toggleCategory(id, { target: { name, value } }) {
    this.setState((state) => {
      const current = state.categories[id],
            bit = CATEGORY_UPDATES[name.toUpperCase()],
            active = current & bit;
      let next = current;
      if (bit === CATEGORY_UPDATES.ACTIVE) {
        next = value ? CATEGORY_UPDATES.ACTIVE : CATEGORY_UPDATES.NONE;
      } else if (value && !active) {
        next = current + bit;
      } else if (!value && active) {
        next = current - bit;
      }
      return {
        ...state,
        categories: {
          ...state.categories,
          [id]: next
        }
      };
    });
  }

  /**
   * Toggle product
   */
  toggleProduct({ target: { name, value } }) {
    this.setState((state) => {
      const current = state.products,
            bit = PRODUCT_UPDATES[name.toUpperCase()],
            active = current & bit;
      let products = current;
      if (value && !active) {
        products = current + bit;
      } else if (!value && active) {
        products = current - bit;
      }
      return {
        ...state,
        products
      };
    })
  }

  /**
   * Update cache
   */
  updateCache() {
    this.setState(({ cache }) => ({
      cache: {
        ...cache,
        ...fromPairs(this.props.categories.map(({ category }) => [
          category._id,
          category
        ]))
      },
      ready: true
    }));
  }
}

export default connect(({ api: { aircraft } }) => {
  return {
    update: aircraft.updateHangar
  };
})(Settings);
