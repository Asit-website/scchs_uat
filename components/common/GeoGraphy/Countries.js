import React, { useState } from 'react'
import { useEffect } from 'react'
import $ from 'jquery'

export default function Countries(props) {
    const [allCountries, setAllCountries] = useState([]);
    const getCountries = async () => {
        const getData = await fetch(`${process.env.next.api_url}geography/countries`);
        const dataRes = await getData.json();
        if(dataRes.status != false){
            setAllCountries(dataRes)
            setTimeout(() => {
                if(props.dataValueName != ""){
                    const dataCountryValue = $('option[datacountry="'+props.dataValueName+'"]').attr('value');
                    $('#countryDropdown').val(dataCountryValue).trigger('change');
                    props.dataSetValueName(props.dataValueName);
                }
            }, 2000);
        }
    }

    const updateValues = (e) => {
        props.dataSetLoad(true)
        const currentValue = e.target.value;
        const country = $('option[value="'+e.target.value+'"]').attr('datacountry');
        props.dataSetValue(currentValue);
        if(typeof country != "undefined"){
            props.dataSetValueName(country);
        }else{
            props.dataSetValueName(currentValue);
        }
    }
    
    useEffect(() =>{
        getCountries();
    },[props.dataValueName])
  return (
    <>
        {allCountries.length > 0 ? (
            <select id='countryDropdown' value={props.dataValue} onChange={(e) => {updateValues(e);}}>
            <option value="">Choose a Country</option>
            { allCountries.length > 0 && allCountries.map((ls,i)=>(
                <option key={i} value={ls.id} datacountry={ls.country_iso2}>{ls.country}</option>
            )) }
            </select>
        ):(
            <input
                type="text"
                maxLength={'30'} 
                value={props.dataValue}
                onChange={(e) => {updateValues(e)}}
            />
        )}
    </>
  )
}
