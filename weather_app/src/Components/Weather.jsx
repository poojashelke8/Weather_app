import React, { useState, useEffect } from 'react'
import './Weather.css'
import axios from "axios"

const Weather = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})

  const apiKey = 'f397b1fd5622ae9e2cc1a3adabcaff84'

  const fetchData = (city) => {
    if (!city) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      setWeather(res.data)
    }).catch((err) => {
      console.log("err", err)
    })
  }

  const handleOnChange = (e) => {
    setCity(e.target.value);
  }

  const handleSubmit = () => {
    fetchData(city)
  }


  return (
    <div className='container'>
      <input
        type='text'
        placeholder='Enter City'
        value={city}
        onChange={handleOnChange}
      />
      <button type='submit' onClick={handleSubmit}>Enter</button>

      {Object.keys(weather).length > 0 &&
        <div>
          <h5 className="weathorCity">
            {weather?.name}
          </h5>
          <h6 className="weathorTemp">{((weather?.main?.temp) - 273.15).toFixed(2)}°C</h6>
        </div>
      }
    </div>
  )
}

export default Weather