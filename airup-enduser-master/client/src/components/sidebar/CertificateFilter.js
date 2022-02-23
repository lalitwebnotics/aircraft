import React, { Component, createRef } from 'react';
import isFunction from 'lodash/isFunction';
import Checkbox from '../inputs/checkbox/Checkbox';
import Dropdown from '../inputs/dropdown/Dropdown';
import { bind, call, toQuery } from '../../utils';
import clsx from 'clsx';
import connect from "react-redux/es/connect/connect";

import {clearCertificateFilter} from '../app/actions';

const certificateCodes = [
	'STC',
	'TSO',
	'PMA',
	'TCCA',
	'EASA',
	'No-STC'
];

class CertificateFilter extends Component {
	constructor(...args) {
		super(...args);

		this.state = {
			selected: false,
			selectedCode: []
		}

		bind(this, [
			'toggleSelect',
      'getDerivedStateFromProps'
		]);
	}

  componentDidUpdate(prevProps,prevState, snapshot) {
	  if(this.props.certificateRemove && prevProps.certificateRemove !== this.props.certificateRemove) {
	    this.toggleSelect({target: {value: null}}, this.props.certificateRemove);
	    this.props.dispatch(clearCertificateFilter());
    }
  }

	render() {
		const { label, sectionClass, counts = {} } = this.props;
		const { selected: selectedValue, selectedCode } = this.state;

		const checkboxRenderView = []

		for (const [index, value] of certificateCodes.entries()) {
			checkboxRenderView.push(
				<Checkbox key={index} name={value} className={'certificateCheckbox'} icon="fa-check" value={selectedCode.indexOf(value) != -1} size="md" onChange={this.toggleSelect} >
					{value}({counts[value] || 0})
				</Checkbox>
			)
		}

		return (
			<div className={clsx(sectionClass, 'home-categories-filters')}>
				{checkboxRenderView}
			</div>
		);
	}

	toggleSelect(ev, certificateName) {

		const { selectedCode } = this.state;
		let currentCode = certificateName || ev.target.name;
		if (ev.target.value) {
			selectedCode.push(currentCode);
		} else if (selectedCode && selectedCode.includes(currentCode)) {
			selectedCode.splice(selectedCode.indexOf(currentCode), 1);
		}

		this.setState({
			selectedCode,
		});

		if (isFunction(this.props.onSelectCertificate)) {
			this.props.onSelectCertificate(selectedCode.length ? selectedCode.join(',') : '')
		}
	}
}

export default connect((app) => {
  return {
    certificateRemove: app.app.certificateRemove
  }
})(CertificateFilter);
