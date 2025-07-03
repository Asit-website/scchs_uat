import React from "react";
import style from "../../../../pages/css/productOption.module.scss";
import RequiredFile from "./RequiredFile";

export default function Number(props) {
  const item = props.items;
  //console.log(item)

  return (
    <div className={`${style.productOption}`}>

      <label className={style.optionTitle}>
        {item.displayName}
        {item.isRequired == true ? <RequiredFile /> : "" }
      </label>

      <div className={`${style.optionWrapper}`}>
        <input type="number" name={item.entityId} defaultValue={item.newNumber} required={item.isRequired} />
      </div>

    </div>
  );
}
