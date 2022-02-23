import React, {Fragment} from 'react';

function SwitchButton({
                        showOnlySTC,
                        onStcShowChange,
                        children
                      }) {
  return <Fragment>
    <label className="switch-button">
      <input type="checkbox" checked={showOnlySTC} onChange={onStcShowChange}/>
        <span className="slider-button round"/>
    </label>
    {children}
  </Fragment>
}

export default SwitchButton;
