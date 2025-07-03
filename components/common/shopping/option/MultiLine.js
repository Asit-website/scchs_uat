import React from "react";
import style from "../../../../pages/css/productOption.module.scss";
import RequiredFile from "./RequiredFile";

export default function MultiLine(props) {
  const item = props.items;
  //console.log(item)
  return (
    <div className={`${style.productOption}`}>

      <label className={style.optionTitle}>
        {item.displayName}
        {item.isRequired == true ? <RequiredFile /> : "" }
      </label>

      <div className={`${style.optionWrapper}`}>
        <textarea name={item.entityId} maxLength={item.maxLength} defaultValue={item.newName} required={item.isRequired}></textarea>
      </div>

    </div>
  );
}
