import logo from './logo.svg';
import './App.css';
import Fog from './images/Fog.jpeg'
import { useEffect, useState } from 'react';

function App() {
  let [city,setCity]=useState('')
  let[wDetails,setWdetails]=useState()
  let[isLoading,setIsLoading]=useState(false)
  // let[counter,setCounter]=useState(1)
  let getData=(event)=>{
    setIsLoading(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e81bd1ae4613c835c101ce769122913b&units=metrics`)
    .then((res)=>res.json())
    .then((finalRes)=>{
      if(finalRes.cod=='404'){
        setWdetails(undefined)
      }
      else{
        setWdetails(finalRes)
      }
      setIsLoading(false)
    })
    event.preventDefault()
    setCity('')
  }
  
  // let changeCounter=()=>{
  //  setCounter(counter + 1)
  // }
  
  // useEffect(()=>{
  //   console.log('welcome')
  // },[counter])
  
  return (
    <div className='w-[100%] h-[100vh] bg-[#4aacb1]'>
      {/* {counter} */}
      {/* <button onClick={changeCounter}>Count</button> */}
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-[40px] font-bold py-[50px] text-white'>Weather App</h1>
        
        <form onSubmit={getData}>
          <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder='City Name' className='w-[500px] h-[40px] pl-3 rounded-[10px] bg-[#f7f7f7f] text-[18px] font-bold '/><button className='bg-cyan-700 h-[40px] rounded-[10px] w-[50px]'>Enter</button>
        </form>


        <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative'>
          <img src='https://media1.tenor.com/m/FawYo00tBekAAAAC/loading-thinking.gif' width={100} className={`absolute left-[40%] ${isLoading ? '':'hidden'} `} />
          {
          wDetails !== undefined ?
          <>
          <h3 className='font-bold text-[30px] text-left'>{wDetails.name} <span className='bg-amber-600'>{wDetails.sys.country}</span></h3>
          <h2 className='font-bold text-[40px]'>
            {wDetails.main.temp}°F
          </h2>
          <img src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`}/>
          <p className='font-bold'>
            {wDetails.weather[0].description}
          </p>
          </>
          :
          <>No Data!</>
          }  
        </div>

      </div>

    </div>
  );
}

export default App;
