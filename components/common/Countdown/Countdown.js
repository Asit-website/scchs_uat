import React, { useCallback, useEffect, useRef, useState } from 'react'

export default function Countdown({ eventTime, interval }) {
    const timerRef = useRef(0);
    const [isReady, setIsReady] = useState(false);
    const [timeHtml, setTimeHtml] = useState('');
    let endDate = new Date(eventTime).getTime();
    
    const timer = (t)=>{
        let nowTime=new Date().getTime();
        let timeLeft=t-nowTime;
        setTimeHtml(`${Math.floor(timeLeft/(1000*1*60*60*24))} : ${Math.floor(((timeLeft/(1000*1*60*60))%(24)))} : ${Math.floor(((timeLeft/(1000*1*60))%(60)))} : ${Math.floor(((timeLeft/(1000*1))%(60)))}`)
    };

    useEffect(() => {
            timerRef.current = setInterval(()=>{
              timer(endDate);
            }, interval);;
            setIsReady(true)
            return () => { clearInterval(timerRef.current); }
    }, [eventTime]);
    
  return (<>{isReady ? <p>{timeHtml}</p> : (<p>0 : 0 : 0 : 0</p>)}</>)
}
