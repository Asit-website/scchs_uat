import $ from "jquery";
import React, { useEffect } from 'react'

export default function MenuToggel() {
    useEffect(function(){
        const windowWidth = window.innerWidth;

        const menuLoad = () => {
            //Main Leavel
           $(".navItems").on('click', 'li > a .menuIcon', function(e){
               e.preventDefault();
               $(this).parent().parent().toggleClass('is-active');
               $(this).parent().parent().find('.navItemsLeave1').toggleClass('is-open');
               return false;
           });
           
           //Second Leavel
           $(".navItemsLeave1").on('click', 'li > a .menuIcon', function(e){
               e.preventDefault();
               $(this).parent().parent().toggleClass('is-active');
               $(this).parent().parent().find('.navItemsLeave2').toggleClass('is-open');
               return false;
           });
       }

        if(windowWidth <= 991){ menuLoad(); }
        window?.addEventListener('resize', function(event) {
            console.log('re')
            menuLoad();
        }, true);

    },[])
}
