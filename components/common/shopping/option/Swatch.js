import React from "react";
import style from "../../../../pages/css/productOption.module.scss";
import RequiredFile from "./RequiredFile";
import Image from "next/image";

export default function Swatch(props) {
  const item = props.items;
  //console.log(item)
  return (
    <div className={`${style.productOption} ${style.opColor}`}>

      <label className={style.optionTitle}>
        {item.displayName}
        {item.isRequired == true ? <RequiredFile /> : "" }
      </label>

      <div className={`${style.optionWrapper}`}>

        {item.isRequired == false ? 
          <label>
            <input type="radio" name={item.entityId} value={'none'} defaultChecked={true} />
            <span className={style.noneOption} >
              NONE
            </span>
          </label>
         : "" }

        {
          item?.values?.edges?.length > 0 && item?.values?.edges?.map((ls)=>(
            ls?.node?.hexColors?.length == 0 ? 
            (
              <label key={ls}>
                <input type="radio" name={item.entityId} value={ls.node.entityId} defaultChecked={ls.node.isDefault} required={item.isRequired} />
                <span className={style.colorMain}>
                  <span className={style.colorName} >
                    <Image src={ls.node.imageUrl} alt="pattern" width={30} height={30} />
                  </span>
                </span>
              </label>
            )
            :
            (
              <label key={ls.node.entityId}>
                <input type="radio" name={item.entityId} value={ls.node.entityId} defaultChecked={ls.node.isDefault} required={item.isRequired} />
                <span className={style.colorMain} title={ls.node.label}>
                  {ls?.node?.hexColors?.length > 0 && ls.node.hexColors.map((lss, ii)=>(
                  <span key={ii}
                    className={style.colorName}
                    style={{ "--headerBCColor" : lss }}
                  >
                    &nbsp;
                  </span>
                  )
                  )}
                </span>
              </label>
            )

          ))
        }
       
      </div>
    </div>
  );
}
