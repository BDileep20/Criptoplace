import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../Context/CoinContex'
import LineChart from '../../Components/lineChart/LineChart'
const Coin = () => {
  const {coinId}=useParams()
  const [coindata,setCoinData]=useState()
  const [historicalData,setHistoricalData]=useState([])
  const {currency}=useContext(CoinContext)



  const fetchCoinData=async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-BhSYCQNEkjVgywTWRMBzqaPU'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setCoinData(response))
      .catch(err => console.error(err));
  }

  const fetchHistoricaldata=async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-BhSYCQNEkjVgywTWRMBzqaPU'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=9&interval=daily`, options)
      .then(response => response.json())
      .then(response => setHistoricalData(response))
      .catch(err => console.error(err));
  }

  useEffect(()=>{
      fetchCoinData();
      fetchHistoricaldata();
  },[currency])

  if(coindata&&historicalData){
  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coindata.image.large} alt="" />
        <p><b>{coindata.name} ({coindata.symbol.toUpperCase()})</b></p>
      </div>
      <div className="coin-chart">
       <LineChart  historicalData={historicalData}/>
      </div>
      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coindata.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>{currency.symbol} {coindata.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>{coindata.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour high</li>
          <li>{coindata.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour low</li>
          <li>{coindata.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>
      </div>
    </div>
  )
}
else{
return(
<div className="spinner">
<div className="spin">
  
</div>
</div>
)
}

}
export default Coin