import React, {Fragment} from 'react';


function HangarExtraInfo({
                           onTailNumberChange,
                           onImageSelect
                         }) {

  return <Fragment>
    <div className="hanger-input-row">
      <div className="input">
        <input type="text" placeholder={"Please Enter tail Number"} onChange={onTailNumberChange}/>
      </div>

      <div className="input">
        <input type="file" accept="image/*" onChange={onImageSelect}/>
      </div>
    </div>
  </Fragment>

}

export default HangarExtraInfo;
