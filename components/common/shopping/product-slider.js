import React, { useRef } from 'react'
import style from "../../../pages/css/shoppings-product-slider.module.scss";
import Link from 'next/link';

//Slider css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShoppingCards from './cards';

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


export default function ShoppingProductSlider(props) {
  const sliderRef_1 = useRef(null);


  if(props?.items?.length > 0){

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
  
              {props?.items?.length > 4 ? 
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
              : "" }
  
            </div>
            
            {props?.items?.length > 4 ? 
                <Slider {...settingsSliders} className={style.rentalCardGrids} ref={sliderRef_1}>
                { props?.items?.map((ls,i)=>(
                  <ShoppingCards key={i} items={ls.node} parentPage="slider" />
                ))}
            </Slider>
              :
              <div className={`${style.rentalCardGrids} ${style.rentalCardGridsFlex}`} ref={sliderRef_1}>
              { props?.items?.map((ls,i)=>(
                <ShoppingCards key={i} items={ls.node} parentPage="slider" />
              ))}
              </div>
            }
              
          </div>
      </div>
    )

  }else{
    return ("");
  }
}
