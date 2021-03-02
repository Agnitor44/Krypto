import React, {useState, useEffect} from 'react'
import './styles/App.css';
import Panel from './comp/Panel'
import MyChart from './comp/Chart'





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

function App() {
  const [curr, setCurr] = useState("PLN")
  const [cry, setCry] = useState("BTC")
  const [now, setNow] = useState(null)
  const [his, setHis] = useState(null)
  const [go, setGo] = useState(false)

  useEffect( async() => {
    console.log(`${yester.year}.${yester.month}.${yester.day}`, `${today.year}.${today.month}.${today.day}`)
   await fetch(`https://api.nomics.com/v1/currencies/ticker?key=935de2070212329af568817d7ed0f198&ids=BTC,ETH,XRP&interval=7d,30d&convert=${curr}&per-page=100&page=1`)
    .then(response => response.json())
    .then(data => setNow({BTC: data[0].price, ETH: data[1].price, BCH: data[2].price}))

   await fetch(`https://api.nomics.com/v1/currencies/sparkline?key=935de2070212329af568817d7ed0f198&ids=BTC,ETH,XRP&start=${yester.year}-${yester.month}-${yester.day}T00%3A00%3A00Z&end=${today.year}-${today.month}-${today.day}T00%3A00%3A00Z&convert=${curr}`)
  .then(response => response.json())
  .then(data => {
    setHis({
      BTC: data[0].prices,
      ETH: data[1].prices,
      BCH: data[2].prices,
    })
  })
  setGo(true)
  }, [])


  return (
    go 
    ?
    <div className = 'panel'>
        <Panel curr = {curr} setCurr = {setCurr} cry = {cry} setCry = {setCry} now = {now} setNow = {setNow} setHis = {setHis}/>
        <MyChart his = {his} cry = {cry}/>
    </div>
    :
    null
  );
}

export default App;
