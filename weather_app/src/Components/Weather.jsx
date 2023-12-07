import React, { useState,useEffect } from 'react'
import './Weather.css'
import axios from "axios"

const Weather = () => {
  const [city,setCity] = useState('')
  const [weather,setWeather] = useState(null)

  const apiKey = 'f397b1fd5622ae9e2cc1a3adabcaff84'
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const testUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f397b1fd5622ae9e2cc1a3adabcaff84`

  const fetchData=async()=>{
    try{
      const response = await axios.get(testUrl);
      setWeather(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(() => {
  //   fetchData();
  // }, [])

  let timeoutId

  const debounceFetchData = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(fetchData, 1000); // Adjust the delay as needed
  };

  useEffect(() => {
    debounceFetchData();
  }, [city]); // Run whenever 'city' changes

  const handleOnChange= (e)=>{
    setCity(e.target.value);
    console.log(e.target.value);
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    debounceFetchData()
  }


  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
          <input
           type='text'
           placeholder='Enter City'
           value={city}
           onChange={handleOnChange}
           />
           <button type='submit'>Enter</button>
        </form>
        {weather ? (
        <>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
          <p>Feels like : {weather.main.feels_like}°C</p>
          <p>Humidity : {weather.main.humidity}%</p>
          <p>Pressure : {weather.main.pressure}</p>
          <p>Wind Speed : {weather.wind.speed}m/s</p>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}

    </div>
  )
}

export default Weather