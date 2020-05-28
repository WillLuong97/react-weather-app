import React, { useState } from 'react';
const api = {
  key : "0dbba878a16119c3c8b596c58e17ffb4",
  base: "https://api.openweathermap.org/data/2.5/"
 
}
//Hook is similar to the concept of Class in OOP
function App() {

  const [query, setQuery] = useState('');
  //hook 1 for the weather API
  const [weather, setWeather] = useState({});
  //hook 2 for the forecast API
  const [forecast, setForecast] = useState({});


  const search = evt => {
    if (evt.key === "Enter") {
      //When the key enter is hit: a GET request is fired off to request and receive a json package of weather information from openweather api
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      // fetch(`${api.base}forecast?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('');
        console.log(result);

      });

      // //second get request to call the 5 day/3 hours forecase from openweather api:
      fetch(`${api.base}forecast?q=${query}&units=metric&appid=${api.key}`)
      .then(res_info => res_info.json())
      .then(result_weather => {
        setForecast(result_weather);
        //clear up the query for the next call
        setQuery('');
        // console.log(result_weather)
        // let forecastDatesList = []
        // for (var i = 0; i < result_weather.list.length; i++){
        //   forecastDatesList.push(result_weather.list[i].main.temp)

        // }
        
        // console.log(forecastDatesList)

      })


     
    }
  }
  
  //Function to build a date containing a month, date and year:
  const dateBuilder = (d) => {
    let months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    //extracting the current date and time using built-in function:
    let day = days[d.getDay()];
    let date = d.getDate(); 
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  //generating the next 5 days from the current days
  // const theNextFiveDays = (dates) =>  {
  //   let months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



  // }

  return (
    <div className={
      //A check to change the picture in the background depends on the temperature of the current place being found
      (typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm': 'app') :'app'}>
      <main>
      
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? ( 
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="weather">
                  {weather.weather[0].main}
                </div>
              </div>
              <div className="date">
                {dateBuilder(new Date())}
              </div>

            </div>
          </div>
          ) : ('')}

        {(typeof forecast.list != "undefined") ? ( 
          <div>
            <div className="forecast-box">
              <div className="forecast-five">
                Five Day Forecast
              </div>
              {/* <div className="forecast-weather-0">
                {Math.round(forecast.list[0].main.temp)}°C
              </div> */}
              <div className="forecast-weather-1">
                {Math.round(forecast.list[1].main.temp)}°C
              </div>

              <div className="forecast-weather-2">
                {Math.round(forecast.list[2].main.temp)}°C
              </div>

              <div className="forecast-weather-3">
                {Math.round(forecast.list[3].main.temp)}°C
              </div>

              <div className="forecast-weather-4">
                {Math.round(forecast.list[4].main.temp)}°C
              </div>

              <div className="date-forecast">
                {/* {dateBuilder(forecast.list[0].)} */}
              </div>
              {/* <div className="weather-box">
                <div className="temp">
                  {Math.round(forecast.main.temp)}°C
                </div>
                <div className="weather">
                  {weather.weather[0].main}
                </div>
              </div> */}

            </div>
          </div>
          ) : ('')}

        
      </main>
    </div>
  );
}

//Function call to execute the website:
export default App;
