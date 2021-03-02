import React, {useRef, useState, useEffect} from 'react'
import '../styles/panel.css'

const dateObj = new Date() ;
const month = dateObj.getUTCMonth() + 1; 
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();

var yesterday = new Date(dateObj.getTime());
yesterday.setDate(dateObj.getDate() - 1);



const doZero = (ent) => {
  if(ent < 10) {
    return `0${ent}`
  }
  else return ent
}


const today = {
  year:  year,
  month:  doZero(month) ,
  day:  doZero(day) ,
}
const yester = {
  year:   yesterday.getFullYear(),
  month: doZero(yesterday.getMonth() + 1) ,
  day:  doZero(yesterday.getDate()) ,
}

export default function Panel({curr, setCurr, cry, setCry, now, setNow, setHis}) {
    const inputRef = useRef()
    const [edit, setEdit] = useState(false)

    useEffect(async() => {
       await fetch(`https://api.nomics.com/v1/currencies/ticker?key=935de2070212329af568817d7ed0f198&ids=BTC,ETH,XRP&interval=7d,30d&convert=${curr}&per-page=100&page=1`)
        .then(response => response.json())
        .then(data => setNow({BTC: data[0].price, ETH: data[1].price, BCH: data[2].price}))
    
      await  fetch(`https://api.nomics.com/v1/currencies/sparkline?key=935de2070212329af568817d7ed0f198&ids=BTC,ETH,XRP&start=${yester.year}-${yester.month}-${yester.day}T00%3A00%3A00Z&end=${today.year}-${today.month}-${today.day}T00%3A00%3A00Z&convert=${curr}`)
      .then(response => response.json())
      .then(data => {
        setHis({
          BTC: data[0].prices,
          ETH: data[1].prices,
          BCH: data[2].prices,
        })
      }).catch(err => err)
    }, [curr])


    const handleEdit = (e) => {
        e.preventDefault()
        const newString = inputRef.current.value.toUpperCase()
        setCurr(curr = newString)
        setEdit(false)
    }
    const handleCheck = (krypto) => {
        
        setCry(cry = krypto)

       
    }
    const data = (cry) => {
   
        if(cry === 'BTC') return Number(now.BTC)
        if(cry === 'ETH') return Number(now.ETH)
        if(cry === 'BCH') return Number(now.BCH)
      }
    return (
        <div className = 'panel'>  
            <div className="buttonZone">
            <button onClick = {handleCheck.bind(this, 'BTC')} style = {cry == 'BTC'?{backgroundColor: 'transparent'}:{backgroundColor: 'rgb(26, 18, 99)'}}>BTC</button>
            <button onClick = {handleCheck.bind(this, 'BCH')} style = {cry == 'BCH'?{backgroundColor: 'transparent'}:{backgroundColor: 'rgb(26, 18, 99)'}}>BCH</button>
            <button onClick = {handleCheck.bind(this, 'ETH')} style = {cry == 'ETH'?{backgroundColor: 'transparent'}:{backgroundColor: 'rgb(26, 18, 99)'}}>ETH</button>
            </div>
            <div className="editZone">
            {edit ?  <form onSubmit = {handleEdit}><input onBlur = {() => setEdit(false)} ref = {inputRef}/></form> : <h3 onClick = {() => setEdit(true)}>{curr}</h3>}
            </div>
        
            <div className="info">
                <div>
                <h1>{cry}</h1> <i class="fas fa-arrow-right"></i> <h1>{curr}</h1>
                </div>
               
                <h1>{data(cry) ? data(cry).toFixed(3) : "Błędna waluta"}</h1>
            </div>
        </div>
    )
}
