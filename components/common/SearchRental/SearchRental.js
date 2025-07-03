import React, { useEffect, useRef, useState } from "react";
import style from "../../../pages/css/search-rental.module.scss";

import GlobalSearch from "../svg/global/search";
import DatePicker, { DateObject } from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import EventDetPlus from "../svg/eventDetials/plus";
import EventDetMinus from "../svg/eventDetials/minus";
import useBodyOutsideClick from "../../../utils/body-outside-click";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import GlobalLocation from "../svg/global/location";
import "react-multi-date-picker/styles/layouts/mobile.css"

export default function SearchRental(props) {


  const [numberOfMonths, setNumberOfMonths] = useState(2);
  const [destination, setDestination] = useState("");
  const [checkinDate, setCheckinDate] = useState(
    new DateObject().subtract(0, "days")
  );
  const [checkOutDate, setcheckOutDate] = useState(
    new DateObject().subtract(0, "days")
  );

  const [destinationList, setDestinationList] = useState([]);
  const [guestsPopup, setGuestsPopup] = useState(false);
  const [guestsTotal, setGuestsTotal] = useState("Add guests");
  const [quantityAdults, setQuantityAdults] = useState(0);
  const [quantityChildren, setQuantityChildren] = useState(0);
  const [quantityInfants, setQuantityInfants] = useState(0);
  const refGuestsPopup = useRef(null);

  useBodyOutsideClick(refGuestsPopup, () => {
    setGuestsPopup(false);
    const total3in = quantityAdults + quantityChildren + quantityInfants;
    if(total3in > 0){ setGuestsTotal(total3in + " Guests"); }
    else{ setGuestsTotal("Add guests"); }
  });

  useEffect(function(){
    if(window.innerWidth <= 991){ setNumberOfMonths(1) }

    const initDestination = async () => {
      const destinationStore = [];
      const dataFetch = await fetch(process.env.server.api + "search-lodging-destination");
      const results = await dataFetch.json();
      results?.length > 0 && results?.map((ls)=>{
        destinationStore.push({ id: ls.id, name: ls.name, subTitle: ls.country })
      });
      setDestinationList(destinationStore)
    }
    initDestination();

  },[])


  const formatResult = (item) => {
    return (
      <>
        <div className={style.searchResultPopup}>
          {" "}
          <GlobalLocation />
          <div className={style.content}>
            <span className={style.name}>{item.name}</span>
            <span className={style.subTitle}>{item.subTitle}</span>
          </div>
        </div>
      </>
    );
  };

  const handleOnSearch = (string, results) => {
    /*console.log(string, results)*/
  };
  const handleOnHover = (result) => {
    /*console.log(result) */
  };
  const handleOnFocus = () => {
    /*console.log('Focused') */
  };
  const handleOnClear = () => {
    setDestination("");
  };
  const handleOnSelect = (item) => {
    setDestination(item.id);
  };



  const submitSearch = () => {
    const endPoints = `/search-rentals?query=${destination}&offset=0&filter=desc&checkin=${new DateObject(checkinDate).toUnix()}&checkout=${new DateObject(checkOutDate).toUnix()}&guest=a${quantityAdults},c${quantityChildren},i${quantityInfants}`;
    window.location.href = endPoints;
  }
  
  

  return (
    <>
      <div className={style.searchMaster + " searchMaster"}>
        <div className={style.inputFileds}>
          <label htmlFor="going_to">Going to</label>
          <select className="going_to" onChange={ (e) => {  setDestination(e.target.value)} }>
            <option value={''}>Search destination</option>
            {destinationList?.map((ls,i)=> (
              <option key={i} value={ls.id}>{ls.name}</option>
            )) }
          </select>
        </div>
        <div className={style.inputFileds}>
          <label htmlFor="check_in">Check in</label>
          {/* checkinDate.format() */}
          <DatePicker
            className={numberOfMonths == 1 ? "rmdp-mobile" : ""}
            calendarPosition={`bottom-left`}
            id="check_in"
            wrapperClassName="datepicker"
            format="MM/DD/YYYY"
            minDate={new DateObject().subtract(0, "days")}
            onChange={setCheckinDate}
            placeholder="Add dates"
            editable={false}
            portal
            hideOnScroll
            numberOfMonths={numberOfMonths}
            animations={[transition({ duration: 200, from: 35 })]}
          />
        </div>
        <div className={style.inputFileds}>
          <label htmlFor="check_out">Checkout</label>
          {/* checkinDate.format() */}
          <DatePicker
            className={numberOfMonths == 1 ? "rmdp-mobile" : ""}
            calendarPosition={`bottom-left`}
            id="check_out"
            wrapperClassName="datepicker"
            format="MM/DD/YYYY"
            minDate={new DateObject().subtract(0, "days")}
            onChange={setcheckOutDate}
            placeholder="Add dates"
            editable={false}
            portal
            hideOnScroll
            numberOfMonths={numberOfMonths}
            animations={[transition({ duration: 200, from: 35 })]}
          />
        </div>
        <div
          className={style.inputFileds}
          onClick={() => {
            setGuestsPopup(true);
          }}
          ref={refGuestsPopup}
        >
          <label htmlFor="add_guests">Who</label>
          <input
            id="add_guests"
            placeholder="Add guests"
            value={guestsTotal}
            readOnly
          />

          {/* guests_popup start */}
          {guestsPopup == true ? (
            <div className={style.guests_popup}>
              <div className={style.name_value}>
                <div className={style.lblTitle}>
                  <span className={style.type}>Adults</span>
                </div>
                <div className={style.formIncrement}>
                  <button
                    onClick={() => {
                      quantityAdults > 0
                        ? setQuantityAdults(quantityAdults - 1)
                        : setQuantityAdults(0);
                    }}
                    className={style.btnIncDec + " " + style.btnMinus}
                    type="button"
                  >
                    <EventDetMinus />
                  </button>
                  <span className={style.inputQty}>{quantityAdults}</span>
                  <button
                    onClick={() => {
                      setQuantityAdults(quantityAdults + 1);
                    }}
                    className={style.btnIncDec + " " + style.btnPlus}
                    type="button"
                  >
                    <EventDetPlus />
                  </button>
                </div>
              </div>

              <div className={style.name_value}>
                <div className={style.lblTitle}>
                  <span className={style.type}>Children</span>
                  <span className={style.info}>ages 2-12</span>
                </div>
                <div className={style.formIncrement}>
                  <button
                    onClick={() => {
                      quantityChildren > 0
                        ? setQuantityChildren(quantityChildren - 1)
                        : setQuantityChildren(0);
                    }}
                    className={style.btnIncDec + " " + style.btnMinus}
                    type="button"
                  >
                    <EventDetMinus />
                  </button>
                  <span className={style.inputQty}>{quantityChildren}</span>
                  <button
                    onClick={() => {
                      setQuantityChildren(quantityChildren + 1);
                    }}
                    className={style.btnIncDec + " " + style.btnPlus}
                    type="button"
                  >
                    <EventDetPlus />
                  </button>
                </div>
              </div>

              <div className={style.name_value}>
                <div className={style.lblTitle}>
                  <span className={style.type}>Infants</span>
                  <span className={style.info}>under 2</span>
                </div>
                <div className={style.formIncrement}>
                  <button
                    onClick={() => {
                      quantityInfants > 0
                        ? setQuantityInfants(quantityInfants - 1)
                        : setQuantityInfants(0);
                    }}
                    className={style.btnIncDec + " " + style.btnMinus}
                    type="button"
                  >
                    <EventDetMinus />
                  </button>
                  <span className={style.inputQty}>{quantityInfants}</span>
                  <button
                    onClick={() => {
                      setQuantityInfants(quantityInfants + 1);
                    }}
                    className={style.btnIncDec + " " + style.btnPlus}
                    type="button"
                  >
                    <EventDetPlus />
                  </button>
                </div>
              </div>

              <div className={style.name_value}>
                <div className={style.lblTitle}>
                  <span className={style.info}>
                    Infants don't count toward the number of guests
                  </span>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* guests_popup end */}
        </div>
        <div className={style.actionFileds}>
          <button
            type="button"
            disabled={destination == "" ? "disabled" : ""}
            className={style.searchButton}
            onClick={()=> { submitSearch(); }}
          >
            <GlobalSearch /> <span>Search</span>{" "}
          </button>
        </div>
      </div>
    </>
  );
}
