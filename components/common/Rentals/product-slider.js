import React, { useRef } from 'react'
import style from "../../../pages/css/rental-product-slider.module.scss";
import Link from 'next/link';
import RentalCards from './cards';

//Slider css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


var settingsSliders = {
  arrows: false,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
};



export default function RentalProductSlider(props) {
  const sliderRef_1 = useRef(null);
  const imagePath = props?.imagePath;
  const sections = props?.section;

    return (
      <div className={style.categoryLayoutFull}>
        <div className="container">

          <div className={style.categoryHead}>
            <div className={style.content}>
                <h2>{sections?.name}</h2>
                <p>
                  {sections?.title}
                  {
                    sections?.link != "" ? <Link href={"/rentals/"+sections?.link}>View All</Link>
                    :""
                  }
                </p>
            </div>

            {sections?.items?.length > 3 ? 
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

          {
          sections?.items?.length > 3 ? 
            <Slider {...settingsSliders} className={style.rentalCardGrids} ref={sliderRef_1}>
              {sections?.items?.map((ls)=>(
                  <RentalCards key={ls} parentPage="slider" item={ls} imagePath={imagePath} />
                ))}
            </Slider>
          :
            <div className={style.rentalCardGrids}>
              {sections?.items?.map((ls)=>(
                  <RentalCards key={ls} item={ls} imagePath={imagePath} />
                ))}
            </div>
          }

        </div>
      </div>
    )

 
}
