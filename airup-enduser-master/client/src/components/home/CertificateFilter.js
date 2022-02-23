

import React, { Component, createRef } from 'react';
import isFunction from 'lodash/isFunction';
import Checkbox from '../inputs/checkbox/Checkbox';
import Dropdown from '../inputs/dropdown/Dropdown';
import { bind, call, toQuery } from '../../utils';
import clsx from 'clsx';

const certificateCodes = [
  'STC',
  'TSO',
  'PMA',
  'TCCA',
  'EASA',
  'No-STC',
  'NORSEE',
  'Minor Alteration'
];

export default class CertificateFilter extends Component {
	constructor(...args) {
	    super(...args);

	    this.state = {
	    	selected: false,
	    	selectedCode : null
	    }

	    bind(this, [
            'toggleSelect',
        ]);
	}

	render() {
		const { label, sectionClass } = this.props;
		const { selected: selectedValue , selectedCode } = this.state;

		const checkboxRenderView = []

	    for (const [index, value] of certificateCodes.entries()) {
	      checkboxRenderView.push(
	        <Checkbox key={index} name={value} className={'certificateCheckbox'} icon="fa-minus" value={selectedValue && selectedCode == value } size="md" onChange={this.toggleSelect} >
                  {value}
            </Checkbox>
            )
    	}

		return (
			<div className={clsx(sectionClass, 'home-categories-filters') }>
				{checkboxRenderView}
			</div>
		);
	}

	toggleSelect(ev){

		const { selectedCode } = this.state;
		let currentCode = ev.target.name;
		let selectedValue = !this.state.selected;
		if (currentCode != selectedCode) {
			selectedValue = true;
		}

        this.setState({
            selected: selectedValue,
            selectedCode: currentCode,
        })

        if (isFunction(this.props.onSelectCertificate)) {
        	if (!selectedValue) {
        		currentCode = ""
        	}
        	this.props.onSelectCertificate(currentCode)
        }
    }
}
