import React, {useState} from 'react'
import { VictoryLine,  VictoryBrushContainer} from "victory";
 import '../styles/chart.css'
export default function MyChart({his, cry}) {

  const data = (cry) => {
   

    if(cry === 'BTC') return his.BTC
    if(cry === 'ETH') return his.ETH
    if(cry === 'BCH') return his.BCH
  }
 
 
    return (
      
<VictoryLine className = 'chart'
  containerComponent={
    <VictoryBrushContainer
    
      brushDimension="y"
      brushStyle={{fill: "teal", opacity: 0.1}}
    />
  }
  style={{
    data: {stroke: "teal"}
  }}
  data={data(cry)}
/>

   
      )
 
}