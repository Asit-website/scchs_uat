import React from "react";
import Link from "next/link";
import Image from "next/image";
import style from "../../../pages/css/cart.module.scss";

import EventDetMinus from "../svg/eventDetials/minus";
import EventDetPlus from "../svg/eventDetials/plus";

export default function CartItemsLoading() {
  return (
    <tr>
      <td className={style.item_td_1}>
        <div className={style.imageWithContent}>
          <div className={style.left}>
              <Link href={'/cart'}>
                <Image
                    className={style.figure}
                    src={"/images/login-back.png"}
                    width="200"
                    height="212"
                    alt={"ls.title"}
                    quality={100}
                />
              </Link>
          </div>
          <div className={style.right}>
            <h4>Loading</h4>
            <p>2 items</p>
            <button type="button">Remove</button>
          </div>
        </div>
      </td>

      <td className={style.item_td_2}>
        <span className={style.eleTitle}>Price:</span>
        <span>$00.00</span>
      </td>

      <td className={style.item_td_3}>
        <div className={style.formIncrement + " parentFormIncrement"}>
          <button className={style.btnIncDec + " qtyDecrement"} type="button">
            <EventDetMinus />
          </button>
          <span className={style.inputQty}>0</span>
          <button className={style.btnIncDec + " qtyIncrement"} type="button">
            <EventDetPlus />
          </button>
        </div>
      </td>

      <td className={style.item_td_4}>
        <span className={style.eleTitle}>Total:</span>
        <span>00.00</span>
      </td>
    </tr>
  );
}
