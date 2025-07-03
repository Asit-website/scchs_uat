import React, { useRef } from 'react'
import style from "../../../pages/css/equipment-rental-slider.module.scss";
import Link from 'next/link';

//Slider css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShoppingCards from './cards';
import EquipmentRentalCards from './cards';

var settingsSliders = {
  arrows: false,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1201,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 321,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};


export default function EquipmentRentalSlider(props) {
  const sliderRef_1 = useRef(null);

  const product = props?.items;
  const imagePath = props?.imagePath;

    return (
      <div className={`${style.categoryLayout} ${props.dataClass == "similarProduct" ? style.similarProduct : "" }`} role="article">
          <div className="container">
  
            <div className={style.categoryHead}>
              <div className={style.content}>
                  <h2>
                    {props.title}
                    {props.link != "false" ? <Link href={props.link}>View All</Link> :""}
                  </h2>
              </div>

              {
              product?.length >= 5 ? (
              <div className={style.customerArrow}>
                <button className={style.arrowButton} onClick={() => sliderRef_1?.current?.slickPrev()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15.6991 7.41L14.2891 6L8.28906 12L14.2891 18L15.6991 16.59L11.1191 12L15.6991 7.41Z" fill="#3F4254"/>
                    <path d="M15.6991 7.41L14.2891 6L8.28906 12L14.2891 18L15.6991 16.59L11.1191 12L15.6991 7.41Z" fill="black" fillOpacity="0.2"/>
                  </svg>
                </button>
                <button className={style.arrowButton} onClick={() => sliderRef_1?.current?.slickNext()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9.69906 6L8.28906 7.41L12.8691 12L8.28906 16.59L9.69906 18L15.6991 12L9.69906 6Z" fill="#3F4254"/>
                    <path d="M9.69906 6L8.28906 7.41L12.8691 12L8.28906 16.59L9.69906 18L15.6991 12L9.69906 6Z" fill="black" fillOpacity="0.2"/>
                  </svg>
                </button> 
              </div>
              ) : "" }
  
            </div>

            {
              product?.length >= 5 ? (

                <Slider {...settingsSliders} className={style.CardGrids} ref={sliderRef_1}>
                  {
                    product?.map((ls,i)=>(
                      <EquipmentRentalCards key={i} item={ls} imagePath={imagePath} parentPage="slider" />
                    ))
                  }
                </Slider>

              ) : (
                <div className={style.CardGrids}>
                    {
                      product?.map((ls,i)=>(
                        <EquipmentRentalCards key={i} item={ls} imagePath={imagePath} />
                      ))
                    }
                </div>
              )
            }
              
          </div>
      </div>
    )

  
}
