import React from 'react'
import GlobalArrowDown from '../../svg/global/arrowDown'
import style from "../../../../pages/css/shoppings-faceted-component.module.scss";
import { useState } from 'react';

export default function FacetedComponent({ title, children }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={`${style.accordion} ${isOpen ? style.isOpen : "" }`}>
        <div className={style.accordionHead} onClick={() => setOpen(!isOpen)}>
          <h4>{title}</h4>
          <GlobalArrowDown />
        </div>
        <div className={`${style.accordionBody} ${!isOpen ? "" : style.collapsed } `}>{children}</div>
    </div>
  )
}