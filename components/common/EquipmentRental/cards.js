import React from 'react'
import style from "../../../pages/css/equipmentRentalCards.module.scss";
import Link from 'next/link';
import Image from 'next/image';

export default function EquipmentRentalCards(props) {
  const parentPage = props.parentPage;
  let equipmentCardsSlider = ""
  if(parentPage == "slider"){ equipmentCardsSlider = style.equipmentCardsSlider; }

  const product = props?.item;
  const imagePath = props?.imagePath;
  
  return (
    <div className={style.equRentalCards+ " " + equipmentCardsSlider}>
      <div className={style.equRentalCard}>
        <div className={style.imageContainer}>
          <Link href={`/equipment-rental/${product?.slug}`}>
              {
                product?.images?.length > 0 ?
                (
                  <Image
                    className={style.banner_image}
                    src={imagePath+"/"+product?.images[0]}
                    width="100"
                    height="304"
                    layout="responsive"
                    objectFit="cover"
                    alt={product?.title}
                  />
                )
                :
                (
                  <Image
                    className={style.banner_image}
                    src={'https://cdn11.bigcommerce.com/s-suzeuussqe/images/stencil/original/image-manager/coming-soon.png'}
                    width="100"
                    height="304"
                    layout="responsive"
                    objectFit="cover"
                    alt={product?.title}
                  />
                )
              }
          </Link>
        </div>
        <div className={style.cardsBody}>
          <h4 className={style.title}><Link href={`/equipment-rental/${product?.slug}`}>{product?.title}</Link></h4>
          <p className={style.location}>{product?.store_address}</p>
          <p className={style.price}><span>${product?.price?.toFixed(2)}</span> /1 Day</p>
        </div>
      </div>
    </div>
  )
}
