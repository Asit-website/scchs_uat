import React from 'react'
import style from "../../../pages/css/shoppings-sidebar.module.scss";
import FacetedComponent from './faceted-search';
import GlobalFilter from '../svg/global/filters';
import { useState } from 'react';
import GlobalClose from '../svg/global/close';
import useBodyOutsideClick from '../../../utils/body-outside-click';
import { useRef } from 'react';
import { useRouter } from 'next/router';

export default function ShoppingSidebar(props) {

  const [openFilter, setOpenFilter] = useState(false);
  const router = useRouter();
  
  let defaultSort = "NEWEST";
  if(typeof router.query.sort != "undefined"){
      defaultSort = router.query.sort;
  }

  const refSidebar = useRef(null);

  useBodyOutsideClick(refSidebar, () => { setOpenFilter(false); });
  
  return (
    <div className={`${style.sidebar}`} ref={refSidebar}>

        <div className={style.facetedSortBy}>
            <label className={style.formLabel}>Sort By:</label>
            <ul>
              <li className={defaultSort == "newest" ? style.isActive : ""}><a href="?sort=newest">Newest Items</a></li>
              <li className={defaultSort == "featured" ? style.isActive : ""}><a href="?sort=featured">Featured Items</a></li>
              <li className={defaultSort == "best_selling" ? style.isActive : ""}><a href="?sort=best_selling">Best Selling</a></li>
              <li className={defaultSort == "a_to_z" ? style.isActive : ""}><a href="?sort=a_to_z">A to Z</a></li>
              <li className={defaultSort == "z_to_a" ? style.isActive : ""}><a href="?sort=z_to_a">Z to A</a></li>
              {/* <li><a href="?sort=best_reviewed">By Review</a></li> */}
              <li className={defaultSort == "lowest_price" ? style.isActive : ""}><a href="?sort=lowest_price">Price: Ascending</a></li>
              <li className={defaultSort == "highest_price" ? style.isActive : ""}><a href="?sort=highest_price">Price: Descending</a></li>
            </ul>
        </div>

        <button className={style.mobileFilter} onClick={() => setOpenFilter(!openFilter)} style={{display:'none'}}>
            <GlobalFilter />
            Filters
        </button>

        <div className={`${style.sidebarInner} ${openFilter ? style.sidebarOpen : '' }`} style={{display:'none'}}>

          <button className={style.sidebarClose} onClick={() => setOpenFilter(!openFilter)} >
            <GlobalClose />
          </button>

          <div className={style.sidebarHead}>
            <h3>FILTER & SORT</h3>
              <button className={style.clear_button}>Clear All</button>
          </div>

          <FacetedComponent title={'GENDER'}>
            <div className={`${style.accordionInner} ${style.facetedRadio}`}>
              <label>
                <input type='radio' value={'Kids'} name='gender' />
                Kids
              </label>

              <label>
                <input type='radio' value={'Men'} name='gender' />
                Men
              </label>

              <label>
                <input type='radio' value={'Women'} name='gender' />
                Women
              </label>
            </div>
          </FacetedComponent>

          <FacetedComponent title={'SORT BY'}>
            <div className={`${style.accordionInner} ${style.facetedRadio}`}>
              <label>
                <input type='radio' value={'Price: Low to High'} name='sort_by' />
                Price: Low to High
              </label>

              <label>
                <input type='radio' value={'Price: High to Low'} name='sort_by' />
                Price: High to Low
              </label>

              <label>
                <input type='radio' value={'Newest'} name='sort_by' />
                Newest
              </label>
            </div>
          </FacetedComponent>

          <FacetedComponent title={'PRODUCT TYPE'}>
            <div className={`${style.accordionInner} ${style.facetedRectangle}`}>
              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='product_type' />
                T-Shirts & Tops
              </label>

              <label>
                <input type='radio' value={'Price: High to Low'} name='product_type' />
                All Accessories
              </label>
              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='product_type' />
                T-Shirts & Tops
              </label>

              <label>
                <input type='radio' value={'Price: High to Low'} name='product_type' />
                All Accessories
              </label>
              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='product_type' />
                T-Shirts & Tops
              </label>
            </div>
          </FacetedComponent>

          <FacetedComponent title={'Sizes'}>
            <div className={`${style.accordionInner} ${style.facetedRectangle}`}>
              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='sizes' />
                XXL
              </label>

              <label>
                <input type='radio' value={'Price: High to Low'} name='sizes' />
                XXL
              </label>
              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='sizes' />
                XXL
              </label>

              <label>
                <input type='radio' value={'Price: High to Low'} name='sizes' />
                XXL
              </label>
              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='sizes' />
                XXL
              </label>
            </div>
          </FacetedComponent>

          <FacetedComponent title={'Colors'}>
            <div className={`${style.accordionInner} ${style.facetedColor}`}>
              
              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='colors' />
                <span className={style.colorName} style={{background:'#000'}}>&nbsp;</span>
                Black
              </label>

              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='colors' />
                <span className={style.colorName} style={{background:'blue'}}>&nbsp;</span>
                Blue
              </label>

              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='colors' />
                <span className={style.colorName} style={{background:'brown'}}>&nbsp;</span>
                Brown
              </label>

              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='colors' />
                <span className={style.colorName} style={{background:'green'}}>&nbsp;</span>
                Green
              </label>

              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='colors' />
                <span className={style.colorName} style={{background:'gray'}}>&nbsp;</span>
                Gray
              </label>

              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='colors' />
                <span className={style.colorName} style={{background:'pink'}}>&nbsp;</span>
                Pink
              </label>

              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='colors' />
                <span className={style.colorName} style={{background:'red'}}>&nbsp;</span>
                Red
              </label>

              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='colors' />
                <span className={style.colorName} style={{background:'white'}}>&nbsp;</span>
                White
              </label>

              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='colors' />
                <span className={style.colorName} style={{background:'yellow'}}>&nbsp;</span>
                Yellow
              </label>

            </div>
          </FacetedComponent>


          <FacetedComponent title={'Prices'}>
            <div className={`${style.accordionInner} ${style.facetedRectangle}`}>
              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='prices' />
                US$10 - US$20
              </label>

              <label>
                <input type='radio' value={'Price: High to Low'} name='prices' />
                US$10 - US$20
              </label>
              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='prices' />
                US$10 - US$20
              </label>

              <label>
                <input type='radio' value={'Price: High to Low'} name='prices' />
                US$10 - US$20
              </label>
              <label>
                <input type='radio' value={'T-Shirts & Tops'} name='prices' />
                US$10 - US$20
              </label>
            </div>
          </FacetedComponent>

        </div>
        

    </div>
  )

}
