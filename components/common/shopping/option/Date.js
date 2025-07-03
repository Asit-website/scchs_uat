import React, { useEffect } from "react";
import style from "../../../../pages/css/productOption.module.scss";
import RequiredFile from "./RequiredFile";

export default function Date(props) {
  const item = props.items;
  //console.log(item)

  var defaultDate = "";
  if(item.defaultValue != null){
    defaultDate = (item.defaultValue.split('T'))[0]
  }


  return (
    <div className={`${style.productOption}`}>

      <label className={style.optionTitle}>
        {item.displayName}
        {item.isRequired == true ? <RequiredFile /> : "" }
      </label>

      <div className={`${style.optionWrapper}`}>
        <input type="date" data-value={defaultDate} name={item.entityId} defaultValue={defaultDate} required={item.isRequired} />
      </div>

    </div>
  );
}
