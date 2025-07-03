import React, { useEffect, useRef } from 'react'
import style from "../../../pages/css/shoppings-collections.module.scss";
import Link from 'next/link';
import GlobalArrowDown from '../svg/global/arrowDown';
import $ from 'jquery';
import { useState } from 'react';
import GlobalClose from '../svg/global/close';


export default function ShoppingCollections(props) {

  const [isOpen, setOpen] = useState(true);
  
  useEffect(function(){
    $(".collLeavel_1 > li > a .iconDown").on('click', function(){
      $(this).toggleClass('is-active');
      $(this).parents('li').find('.collLeavel_2').toggleClass('is-active')
      return false;
    });
    $(".collLeavel_2 > li > a .iconDown").on('click', function(){
      $(this).toggleClass('is-active');
      $(this).parents('li').find('.collLeavel_3').toggleClass('is-active')
      return false;
    });
  },[])

  const closeMenu = () => { setOpen(!isOpen); }

  return (
    <div className='container' role="article" data-type="menu">
      <div className={style.collections}>
        
        <div className={style.collectionsHead + " collectionsHead"}>
          <h1>{props.title}</h1>
          <button onClick={() => setOpen(!isOpen)}>
            View All
            <svg height="28px" viewBox="0 0 32 32" width="28px"><path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"></path></svg>
          </button>
        </div>

        <div className={`${style.collectionsMenu} ${!isOpen ? style.isOpen : ""}`}>

          <button className={style.menuClose} onClick={() => closeMenu()}>
            <GlobalClose />
          </button>

          <ul role="menu" className={`${style.collLeavel_1 + " collLeavel_1"}`}>

            <li><a href={"/shopping"}>Home</a></li>

            {props.collections.length > 0 && props.collections.map((ls,i)=>(
              <li key={ls.entityId}>
                  <a href={"/shoppings"+ls.path}>
                    {ls.name}
                    {ls.children.length > 0 ? <span className={style.iconDown + " iconDown"}><GlobalArrowDown /> </span> :""}
                  </a>
                  {
                    ls.children.length > 0 ? 
                    <ul className={style.collLeavel_2 + " collLeavel_2"}>
                      {ls.children.length > 0 && ls.children.map((lss,i)=>(
                        <li key={lss.entityId}>
                            <a href={"/shoppings"+lss.path}>
                              {lss.name}
                              {lss.children.length > 0 ? <span className={style.iconDown + " iconDown"}><GlobalArrowDown /> </span> :""}
                            </a>
                            { lss.children.length > 0 ? (
                              <ul className={style.collLeavel_3  + " collLeavel_3"}>
                                { lss.children.length > 0 && lss.children.map((lsss,i)=>(
                                  <li key={lsss.entityId}>
                                      <a href={"/shoppings"+lsss.path}>
                                        {lsss.name}
                                      </a>
                                  </li>
                                )) }
                              </ul>
                            ) : ""}
                        </li>
                      ))}
                    </ul>
                  : "" }

              </li>
            ))}
          </ul>
          
        </div>
      </div>
    </div>
  )
}
