import React from "react";
import style from "../../../../pages/css/productOption.module.scss";
import RequiredFile from "./RequiredFile";

export default function Checkbox(props) {
  const item = props.items;
  //console.log(item)
  return (
    <div className={`${style.productOption} ${style.opRadioButtons}`}>

      <label className={style.optionTitle}>
        {item.displayName}
        {item.isRequired == true ? <RequiredFile /> : "" }
      </label>

      <div className={`${style.optionWrapper}`}>
        {
          item.checkedByDefault == true ?
          (
            <label>
              <input type="checkbox" name={item.entityId} value={item.checkedOptionValueEntityId} defaultChecked={item.checkedByDefault} required={item.isRequired} />
              <span>
                  {item.label}
              </span>
            </label>
          )
          :
          (
            <label>
              <input type="checkbox" name={item.entityId} value={item.checkedOptionValueEntityId} defaultChecked={item.checkedByDefault} required={item.isRequired} />
              <span>
                  {item.label}
              </span>
            </label>
          )
        }
      </div>

    </div>
  );
}
