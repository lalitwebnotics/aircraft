import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import Table from '../table/Table';
import Row from '../grid/Row';
import Column from '../grid/Column';

export default class RebatePartial extends Component {

  getLowestPrice = (retailers, key) => {
    const sortedRetailer = retailers.sort((a, b) => {
      return a.price - b.price;
    });

    return sortedRetailer[0][key];
  };

  render() {

    const { total, rebate, discountPrice, showHidePriceChanges, retailers = [], route, auth } = this.props;

    return (
      <div>
        <br />
        MSRP: ${total}
        <a href="https://www.google.com" target="_blank" className="link" style={{ marginLeft: '5px', marginRight: '20px' }}>Manufacturer's Website</a>
        <a onClick={showHidePriceChanges} className="link">Price/Rebate History</a>
        <br />
        {retailers && retailers.length>0 && <span
          className="alert-danger">Lowest price ${this.getLowestPrice(retailers, 'price')} ({retailers.length} retailers available)</span>}
        <br />
        <br />
        <div>
          <div className="description">
            Dealers Offering this Product:
          </div>
          {/* <Row>
            {retailers && retailers.map((retailer) => {
              return <Col span={4}>
                <img className="img-retailer-logo" src={} alt=""/>
              </Col>
            })}
          </Row> */}
          <Row>
            {retailers && retailers.slice(0, 4).map((retailer, i) => (
              <Column count={2} key={i}>
                <div className={clsx('dealer-cell')}>
                  {this.getLowestPrice(retailers, '_id') === retailer._id && <div className="lowest-price">{`$${(Number(retailer.price) || 0).toLocaleString()}`} </div>}
                  <div className="logo" style={{
                    backgroundImage: `url('https://d2kijztdgb1j07.cloudfront.net/${retailer.retailer.logo.full_path}')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '50px',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '3px'
                  }} />
                </div>
              </Column>
            ))}
          </Row>
        </div>
        <div>
          {/* <Table responsive="sm">
            <tbody>
              {retailers && retailers.map((retailer) => {
                return <tr>
                  <td><img className="img-retailer-logo" src={'https://d2kijztdgb1j07.cloudfront.net/' + retailer.logo.full_path} alt="" /></td>
                  <td>$ {retailer.price}</td>
                  <td><Link target={"_blank"} to={retailer.product_url}>Dealer Website</Link></td>
                </tr>
              })}
            </tbody>
          </Table> */}
          <div className="Table RetailerTable">
            <table>
              <tbody>
                {retailers.map((retailer) => {
                  const active = false;
                  return (
                    <tr className={clsx({ active })} key={retailer._id}>
                      <td className="logo-cell"><img className="retailer-logo" src={'https://d2kijztdgb1j07.cloudfront.net/' + retailer.retailer.logo.full_path} alt="" /></td>
                      <td className="price">
                        {`Price:  $${(Number(retailer.price) || 0).toLocaleString()}`}
                      </td>
                      <td><a target={"_blank"} href={retailer.product_url}>Dealer Website</a></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {auth && auth.data && !auth.data._id && <div className="singin-remainder">
          <br/>
          Want to be notified of Rebates, Price Changes, and STC Updates for this Product?
          <br/>
          <a target={"_blank"} href="/login" >We can email you</a>
        </div>}
        <br />
        {rebate && rebate.amount > 0 && <div id="rebateRectangle">
          <div className="price">
            ${rebate.amount} Rebate
          </div>
          <div className="description">
            Available from {(rebate.manufacturer && rebate.manufacturer.name) || rebate.name} <a target={"_blank"} href={rebate.url}>Download rebate here</a>
          </div>
        </div>}


        <br />

        {rebate && <Row className="description">
          We collect rebates for your convienence, but make sure to visit the manufacturer's website to confirm the most current version
        </Row>}

      </div>
    );
  }
}
