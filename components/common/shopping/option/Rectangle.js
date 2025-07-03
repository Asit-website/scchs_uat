import React from "react";
import style from "../../../../pages/css/productOption.module.scss";
import { useEffect } from "react";
import RequiredFile from "./RequiredFile";

export default function Rectangle(props) {
  const item = props.items;
  //console.log(item)
  return (
    <div className={`${style.productOption} ${style.opRectangle}`}>

      <label className={style.optionTitle}>
        {item.displayName}
        {item.isRequired == true ? <RequiredFile /> : "" }
      </label>

      <div className={`${style.optionWrapper}`}>
        {item.isRequired == false ? 
        <label>
          <input type="radio" name={item.entityId} value={'none'} />
          <span className={style.noneOption} >
            NONE
          </span>
        </label>
        : "" }
        {
          item?.values?.edges?.length > 0 && item?.values?.edges?.map((ls)=>(

            <label key={ls.node.entityId}>
              <input type="radio" name={item.entityId} value={ls.node.entityId} defaultChecked={ls.node.isDefault} required={item.isRequired} />
              <span
                 title={ls.node.label}
                className={style.rectangleName}
              >
                 {ls.node.label}
              </span>
            </label>
          ))
        }
      </div>

    </div>
  );
}
