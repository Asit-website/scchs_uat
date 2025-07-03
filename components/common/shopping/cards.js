import React from 'react'
import style from "../../../pages/css/shoppingCards.module.scss";
import Link from 'next/link';
import Image from 'next/image';

export default function ShoppingCards(props) {
  const parentPage = props.parentPage;
  let shoppingCardsSlider = ""
  if(parentPage == "slider"){ shoppingCardsSlider = style.shoppingCardsSlider; }

  if(props.items != null){
    return (
      <div className={style.shoppingCards + " "+ shoppingCardsSlider}>
        <div className={style.shoppingCard}>
          <div className={style.imageContainer}>
            <Link href={"/shopping"+props.items.path}>
                <Image
                  className={`${style.card_image} ${props.items?.defaultImage == null ? style.comingSoonImg :"" }`}
                  src={ props.items?.defaultImage == null ? "https://cdn11.bigcommerce.com/s-suzeuussqe/images/stencil/original/image-manager/coming-soon.png": props.items?.defaultImage?.url}
                  width="304"
                  height="304"
                  alt={props.items?.defaultImage?.altText != null ? props.items?.defaultImage?.altText : props.items.name }
                />
            </Link>
          </div>
          
          <div className={style.cardsBody}>
            <h4 className={style.title}><Link href={"/shopping"+props.items.path}>{props.items.name}</Link></h4>
            <p className={style.info}>{props.items.sku}</p>
            <div className={style.priceInfo}>
              {
                props?.items?.prices?.salePrice == null ? (
                  <p className={style.price}>${props?.items?.prices?.basePrice?.value.toFixed(2)}</p>
                ):(
                  <>
                    <p className={`${style.price} ${style.priceSale}`}>${props?.items?.prices?.basePrice?.value.toFixed(2)}</p>
                    <p className={style.price}>${props?.items?.prices?.salePrice?.value.toFixed(2)}</p>
                  </>
                )
              }  
            </div>
          </div>
        </div>
      </div>
    )
  }else{
    ("")
  }
}
