import React from "react";
import style from "../../../../pages/css/productOption.module.scss";
import RequiredFile from "./RequiredFile";

export default function RadioButtons(props) {
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
          item?.values?.edges?.length > 0 && item?.values?.edges?.map((ls)=>(

            <label key={ls.node.entityId}>
              <input type="radio" name={item.entityId} value={ls.node.entityId} defaultChecked={ls.node.isDefault} required={item.isRequired} />
              <span>
                 {ls.node.label}
              </span>
            </label>
          ))
        }
      </div>

    </div>
  );
}
