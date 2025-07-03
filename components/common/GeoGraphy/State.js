import React, { useState } from 'react'
import { useEffect } from 'react'
import $ from 'jquery'

export default function State(props) {
    const [allState, setAllState] = useState([]);
    
    
    const getState = async (countriesID) => {
        if(countriesID != ""){
            const getData = await fetch(`${process.env.next.api_url}geography/states`,{
                method:"POST",
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({id:countriesID})
            });
            const dataRes = await getData.json();
            if(dataRes.status == false){
                setAllState([])
                props.dataSetValue('')
                props.dataSetValueName('');
            }else{
                props.dataSetValue('')
                props.dataSetValueName('');
                setAllState(dataRes)
            }
        }else{
            props.dataSetValue('')
            props.dataSetValueName('');
            setAllState([])
        }
        props.dataSetLoad(false)
    }

    const updateValues = (e) => {
        const currentValue = e.target.value;
        const state = $('option[value="'+e.target.value+'"]').attr('datastate');
        props.dataSetValue(currentValue);
        if(typeof state != "undefined"){
            props.dataSetValueName(state);
            props.dataSetUpdateName(state);
        }else{
            props.dataSetValueName(currentValue);
            props.dataSetUpdateName(currentValue);
        }
        
    }

    useEffect(() =>{ 
        setTimeout(() => {
            getState(props.dataCountryID);
        }, 1000);
    },[props.dataCountryID])
  return (
    <>
        {allState.length > 0 ? (
            <select id='stateDrodown' value={props.dataValue} onChange={(e) => {updateValues(e)}}>
                <option value="">Choose a State</option>
                { allState.length > 0 && allState.map((ls,i)=>(
                    <option key={i} value={ls.state} datastate={ls.state}>{ls.state}</option>
                )) }
            </select>
        ):(
            <input
                id='stateDrodown' 
                type="text"
                maxLength={'30'} 
                value={props.dataUpdateName}
                onChange={(e) => {updateValues(e)}}
            />
        )}
    </>
  )
}
