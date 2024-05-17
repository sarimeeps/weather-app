import { useState, useEffect } from 'react'
import './App.css'
import {Header} from './components/Header';
import { Photo } from './components/Photo';
import { Week } from './components/Week';
import { Footer } from './components/Footer';

function App() {

  const [data, setData] = useState(null);
  const [temp, setTemp] = useState(0);
  // const [timestamp, setTimestamp] = useState(null);
  const [location, setLocation] = useState("");
  const [dailyTemp, setDailyTemp] = useState();
  const [desc, setDesc] = useState();
  const [dailyDesc, setDailyDesc] = useState();

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=imperial&cnt=5&exclude=hourly,minutely&appid=833110e347976d143c39463d4742e9fc`)
      .then(response => response.json())
      .then(json => {
        setData(json);
        setTemp(json.current.temp);
        // setTimestamp(json.current.dt);
        setLocation(json.timezone);
        setDailyTemp(json.daily.map(daily => daily.temp.day));
        setDesc(json.current.weather.map(weather => weather.main));
        setDailyDesc(json.daily.map(daily => daily.weather[0].main));
    
        })
      .catch(error => console.error(error));
  },[]);

  const date = new Date();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[date.getDay()];

  var img = {
    "Clouds" : "src/assets/partly-cloudy.jpg",
    "Clear" : "src/assets/sunny.png",
    "Rain" : "src/assets/rainy.jpg",
    "Thunderstorm" : "src/assets/storm.png",
    "Snow" : "src/assets/snowy.png",
    "Drizzle" : "src/assets/drizzle.jpg"
  }

  if(dailyTemp && dailyTemp.length > 0){
    dailyTemp.length = 4;
  }

  if(dailyDesc && dailyDesc.length > 0){
    dailyDesc.length = 4;
  }

  return (
    <>
      <div className='container'>
      <Header location={location}/>
      <Photo temp={Math.floor(temp)} date={currentDay} img={img[desc]}/>

      {dailyTemp && dailyTemp.length > 0 ? dailyTemp.map((temp, i) =>
        <Week temp={Math.floor(temp)} date={daysOfWeek[(date.getDay() + i + 1) % 7]} img={img[dailyDesc[i]]}/>
      ) : null}

      <Footer />
      </div>
    </>
  );
}

export default App
