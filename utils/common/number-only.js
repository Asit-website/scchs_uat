import $ from "jquery";
import React, { useEffect } from 'react'

export default function NumberOnly() {
    useEffect(function(){
        $(".numberOnly").bind("copy paste", function (e) {
            e.preventDefault();
        });
        $(".numberOnly").on("keypress", function (event) {
        var theEvent = event;
        // Handle paste
        if (theEvent.type === "paste") {
            key = event.clipboardData.getData("text/plain");
        } else {
            // Handle key press
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
        });
    },[])
}
