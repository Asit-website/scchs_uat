import Link from 'next/link'
import React from 'react'
import style from "./../css/account.module.scss";

export default function Navigation(props) {
  return (
    <>
      <div className={style.accountNavigation}>
          <ul>
              {/* <li className={props.isActive == "1" ? style.isActive :""}><Link href={'/account/order'}>Orders</Link></li>
              <li className={props.isActive == "2" ? style.isActive :""}><Link href={'/account/address-book'}>Addresses</Link></li> */}
              <li className={props.isActive == "3" ? style.isActive :""}><Link href={'/account/account-details'}>Account Settings</Link></li>
          </ul>
      </div>
    </>
  )
}
