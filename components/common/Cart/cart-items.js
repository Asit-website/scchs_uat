import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import style from "../../../pages/css/cart.module.scss";

import EventDetMinus from "../svg/eventDetials/minus";
import EventDetPlus from "../svg/eventDetials/plus";
import Cookies from "js-cookie";

export default function CartItems(props) {
  const ls = props.items;
  const [quantityCount, setQuantityCount] = useState(ls.quantity);
  const nx_cart_id = Cookies.get("nx_cart_id");

  const handleDecrement = (itemID, productId) => {
    if(quantityCount > 1){
      setQuantityCount(quantityCount - 1);
      updateItems(itemID, productId, quantityCount - 1)
    }
  }
  const handleIncrement = (itemID, productId) => {
    setQuantityCount(quantityCount + 1);
    updateItems(itemID, productId, quantityCount + 1)
  }

   //Update Cart & Line Items
   const updateItems = async (id, product_id, quantity) => {
    props.stateCartUpdate[1](true);
    setTimeout(async () => {
      await fetch(process.env.next.api_url + "cart/update", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart_id: nx_cart_id, item_id: id, product_id:product_id, quantity:quantity })
      });
      props.getCartDetails();
    }, 500);
  }

  
  //Remove Cart & Line Items
  const removeItems = async (id, totalItem) => {
    props.stateCartUpdate[1](true);
    try {
      const getCart = await fetch(process.env.next.api_url + "cart/delete", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart_id: nx_cart_id, item_id: id, total_item:totalItem })
      });
      await getCart.json();
      props.getCartDetails();  
    } catch (error) {
      props.getCartDetails();  
    }
  }

  const productUrl = (ls.url.replace(process.env.bc.store_url,''))?.split('/');

  return (
    <>
    {
    ls.parent_id != null ? "": (
    <tr>
        <td className={style.item_td_1}>
          <div className={style.imageWithContent}>
            <div className={style.left}>
                <Image
                  className={style.figure}
                  src={ls.image_url}
                  width="200"
                  height="212"
                  alt={ls.name}
                  quality={100}
                />
            </div>
            <div className={style.right}>
              <h4>{ls.name}</h4>
              { ls?.options?.length > 0 && ls?.options?.map((op, i) => ( <p key={i}>{op.name}: {op.value}</p> )) }
              <button type="button" onClick={()=>{removeItems(ls.id, props.cartData?.line_items?.physical_items?.length)}}>Remove</button>
            </div>
          </div>
        </td>

        <td className={style.item_td_2}>
          <span className={style.eleTitle}>Price:</span>
          <span>${ls.list_price.toFixed(2)}</span>
        </td>

        <td className={style.item_td_3}>
          <div
            className={style.formIncrement + " parentFormIncrement"}
            data-line-item-id={ls.id}
          >
            <button
              className={style.btnIncDec + " qtyDecrement"}
              type="button"
              onClick={()=>{handleDecrement(ls.id, ls.product_id);}}
            >
              <EventDetMinus />
            </button>
            <span className={style.inputQty}>{quantityCount}</span>
            <button
              className={style.btnIncDec + " qtyIncrement"}
              type="button"
              onClick={()=>{handleIncrement(ls.id, ls.product_id);}}
            >
              <EventDetPlus />
            </button>
          </div>
        </td>

        <td className={style.item_td_4}>
          <span className={style.eleTitle}>Total:</span>
          <span>${ls.extended_list_price.toFixed(2)}</span>
        </td>    
    </tr>
    )}
    </>
  );
}
