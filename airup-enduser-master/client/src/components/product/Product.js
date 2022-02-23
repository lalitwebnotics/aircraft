import isEmpty from 'lodash/isEmpty';
import range from 'lodash/range';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import ReactImageZoom from 'react-image-zoom';

import { toQuery } from '../../utils';
import { routeQuery } from '../../routes';
import { getProduct, getProductChangesById } from '../../api/product/actions';
import { getRetailersForProduct } from '../../api/retailer_products/actions';
import './Product.scss';
import Column from '../grid/Column';
import Container from '../grid/Container';
import Icon from '../utils/Icon';
import Loader from '../utils/loader/Loader';
import Media from '../media/Media';
import Nl2Br from '../utils/Nl2Br';
import Row from '../grid/Row';
import Track from './Track';
import RebatePartial from './RebatePartial'

/**
 * Product component
 */
class Product extends Component {

  state = {
    retailersCallDone: false,
    productChangesCallDone: false,
    showRebateHistory: false
  };

  render() {
    const { busy, data } = this.props.product,
      { certificate, certificates = [], description, manufacturer, name, rebate } = data,
      { query } = this.props.route,
      { data: retailersData = {} } = this.props.retailers || {},
      { data: { results: productChanges = [] } = {} } = this.props.productChanges || {},
      tracked = data.updates > 0,
      { showRebateHistory } = this.state;

    const certificateTitle = [];

    if (certificates.length) {
      certificates.forEach(c => {
        certificateTitle.push(`${c.ctype} - ${c.name}`)
      });
    }
    const getChangeString = (pc) => {
      if (pc.type === 'product') {
        return pc.newValues.amount > pc.oldValues.amount ? 'Increased' : 'Decreased';
      }
      if (pc.type === 'rebate') {
        let changes = '';
        let pdf;
        if (pc.newAmount) {
          changes += pc.newAmount > pc.oldAmount ? 'Increased' : 'Decreased';
        }
        if (pc.pdf) {
          changes += (changes.length ? ' and': '')
          pdf = <a target="_blank" style={{color: '#6199b8'}} href={`https://d2kijztdgb1j07.cloudfront.net/${pc.pdf.full_path}`}>pdf changes</a>
        }

        return <span>{changes} {pdf}</span>
      }
    }
    return (
      <div className={clsx('Product', { tracked })}>
        {(busy ?
          <Loader /> :
          <>
            <div className="header">
              {(isEmpty(query) ? '' :
                <Link className="back" to={'/search' + toQuery(query)}>
                  <Icon value="fa-chevron-left" />
                  <span>Back to list</span>
                </Link>
              )}
              <div className="information">
                <div className="basic">
                  <h2>{name}</h2>
                  <h5 className="meta">{certificates.map((certificate, index) => {
                    return <a href={`/api/v1/certificates/pdf/${certificate.permalink}`} key={index} target={"_blank"}>{certificate.ctype} - {certificate.name} {(certificates.length - 1) !== index && ', '}</a>
                  })}</h5>
                  <div className="meta">
                    {((!manufacturer || !manufacturer._id) ? '' :
                      <span className="item">
                        <span>Manufactured by:</span>
                        <Link to="/">{manufacturer.name.substring(0, manufacturer.name.length - 1)}</Link>
                      </span>
                    )}
                    {((!certificate || !certificate._id) ? '' :
                      <span className="item">
                        <span>FAA-Documentation:</span>
                        <Link to="/">View AML</Link>
                        <span className="pipe"></span>
                        <Link to="/">View STC</Link>
                      </span>
                    )}
                  </div>
                </div>
                <Track product={data} variant="red" />
              </div>
            </div>
            <div className="content">
              <div className="description">
                <Nl2Br >{description}</Nl2Br>
                {/* {(rebate && rebate.amount) && */}
                <RebatePartial
                  total={data.price}
                  retailers={Object.values(retailersData)}
                  showHidePriceChanges={() => this.setState({ showRebateHistory: !showRebateHistory })}
                  rebate={rebate}
                  discountPrice={data.price - ((rebate && rebate.amount) || 0)}
                  route={this.props.route}
                  auth={this.props.auth}
                />
                {/* } */}
              </div>
              <div className="photos">
                {(data.media || []).map((media) => {
                  {/*<Media caption="Roll over image to zoom in" media={media} key={media._id} zoom={true} />*/ }
                  const props = { className: 'react-zoom-block', width: 300, zoomWidth: 500, img: 'https://d2kijztdgb1j07.cloudfront.net/' + media.full_path, zoomPosition: 'left' };
                  return <ReactImageZoom key={media._id} {...props} />
                })}
              </div>
            </div>
            {showRebateHistory && <div className="content price-changes">
              <h4 className="price-change-title">Price and Rebate History</h4>
              <div className="Table">
                <table>
                  <thead>
                    <tr>
                      <th>Date Detected</th>
                      <th>Change Event</th>
                      <th>Price/Rebate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productChanges.map(pc => <tr key={pc._id}>
                      <td>{new Date(pc.created_at).toLocaleString()}</td>
                      <td>{pc.type === 'product' ? 'Price' : 'Rebate'} {getChangeString(pc)}</td>
                      <td>${(pc.type === 'product' ? pc.newValues.price : (pc.newAmount || 0)).toLocaleString()}</td>
                    </tr>)}
                  </tbody>
                </table>
              </div>
            </div>}
            <div className="footer">
              <h5>Vendors Who Sell This Product</h5>
              <Container className="vendors">
                <Row>
                  {range(4).map((i) => (
                    <Column count={3} key={i}>
                      <a href="https://www.aircraftspruce.com/menus/st/manu_gar.html" target="_blank" className="vendor">Logo</a>
                    </Column>
                  ))}
                </Row>
              </Container>
            </div>
          </>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.props.dispatch(getProduct(this.props.match.params.permalink));
  }

  componentDidUpdate() {
    const {
      retailers: { busy = false, data = {} } = {},
      productChanges: { busy: pcBusy = false, data: pcData = {} } = {},
      product: { data: { _id: id } = {} } = {}
    } = this.props;

    const { retailersCallDone, productChangesCallDone } = this.state;
    if (id && !busy && !retailersCallDone) {
      this.props.dispatch(getRetailersForProduct(id));
      this.setState({ retailersCallDone: !retailersCallDone })
    }
    if (id && !pcBusy && !productChangesCallDone) {
      this.props.dispatch(getProductChangesById(id));
      this.setState({ productChangesCallDone: !productChangesCallDone })
    }
  }
}

export default connect(({ api: { product, retailer_product, user }, router }) => {
  return {
    productChanges: product.productChanges,
    retailers: retailer_product.retailers_of_product,
    product: product.product,
    route: routeQuery(router),
    auth: user.auth
  };
})(Product);
