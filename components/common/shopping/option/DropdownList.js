import React from "react";
import style from "../../../../pages/css/productOption.module.scss";
import RequiredFile from "./RequiredFile";

export default function DropdownList(props) {
  const item = props.items;
  //console.log(item)
  return (
    <div className={`${style.productOption} ${style.opColor}`}>

      <label className={style.optionTitle}>
        {item.displayName}
        {item.isRequired == true ? <RequiredFile /> : "" }
      </label>

      <div className={`${style.optionWrapper}`}>
        <select name={item.entityId} required={item.isRequired}>
          <option value="">Choose Options</option>
          {
            item?.values?.edges?.length > 0 && item?.values?.edges?.map((ls)=>(
              <option selected={ls.node.isDefault} key={ls.node.entityId} value={ls.node.entityId}>{ls.node.label}</option>
            ))
          }
        </select>
      </div>

    </div>
  );
}
