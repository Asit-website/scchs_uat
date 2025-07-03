import React, { useEffect, useState } from "react";
import style from "../../../../pages/css/productOption.module.scss";
import RequiredFile from "./RequiredFile";


import DatePicker, { DateObject } from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import "react-multi-date-picker/styles/layouts/mobile.css"
import GlobalDate from "../../svg/global/date";

export default function DateModern(props) {
  const item = props.items;
  const start_date = props?.start_date;
  const end_date = props?.end_date;

  const [isDesktop, setIsDesktop] = useState(true);
  const [checkinDate, setCheckinDate] = useState(
    new DateObject().subtract(0, "days")
  );


  var defaultDate = checkinDate?.format();
  if(item.defaultValue != null){
    defaultDate = (item.defaultValue.split('T'))[0]
  }


  useEffect(function(){
    if(window.innerWidth <= 991){
      setIsDesktop(false)
    }
  },[])


  return (
    <div className={`${style.productOption}`}>

      <label className={style.optionTitle}>
        {item.displayName}
        {item.isRequired == true ? <RequiredFile /> : "" }
      </label>
      <div className={`${style.optionWrapper}`}>
        {/* checkinDate.format() */}
        {/* <input type="date" data-value={defaultDate} name={item.entityId} defaultValue={defaultDate} required={item.isRequired} /> */}
        <DatePicker
            name={item.entityId}
            required={item.isRequired} 
            className={isDesktop == false ? "rmdp-mobile" : ""}
            calendarPosition={`bottom-left`}
            wrapperClassName="datepicker"
            format="MM/DD/YYYY"
            minDate={new Date(start_date)}
            maxDate={end_date != null ? new Date(end_date) : null }
            onChange={setCheckinDate}
            placeholder="MM/DD/YYYY"
            editable={false}
            portal
            hideOnScroll
            numberOfMonths={1}
            animations={[transition({ duration: 200, from: 35 })]}
          />
          <GlobalDate />
      </div>

    </div>
  );
}
