import React, { useState, useEffect } from "react";
import "../styles/main.css";
import Sun from "../icons/sun.gif";
import Snow from "../icons/snowflake.gif";
import Clouds from "../icons/clouds.gif";
import Rain from "../icons/rain.gif";
import Storm from "../icons/storm.gif";
import Mist from "../icons/foggy.gif";

export default function App() {
  const [text, settext] = useState("");
  const [info, setinfo] = useState({});
  const [weathericon, setweathericon] = useState(Sun);

  const getweather = async () => {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=65bf8139aefde5c508bae32de94d431e`;
      let res = await fetch(url);
      let data = await res.json();

      const { temp_min, temp_max, temp, humidity, pressure, feels_like } =
        data.main;
      const { speed } = data.wind;
      const { sunrise, sunset } = data.sys;
      const { main } = data.weather[0];
      const { name } = data;

      const allinfo = {
        temp_min,
        temp_max,
        temp,
        humidity,
        pressure,
        speed,
        feels_like,
        sunrise,
        sunset,
        main,
        name,
      };
      setinfo(allinfo);
      console.log(allinfo);
    } catch (error) {
      console.log(error);
    }
  };
  const sec = info.sunset;
  let date = new Date(sec * 1000);
  let time = `${date.getHours()}:${date.getMinutes()}`;

  useEffect(() => {
    if (info.main) {
      switch (info.main) {
        case "Clear":
          setweathericon(Sun);
          break;
        case "Snow":
          setweathericon(Snow);
          break;
        case "Haze":
          setweathericon(Clouds);
          break;
        case "Rain":
          setweathericon(Rain);
          break;
        case "Storm":
          setweathericon(Storm);
          break;
        case "Mist":
          setweathericon(Mist);
          break;
        case "Clouds":
          setweathericon(Clouds);
          break;
        default:
          setweathericon(Sun);
          break;
      }
    }
  }, [info.main]);

  return (
    <>
      <div className="maindiv">
        <div className="search">
          <input
            type="search"
            value={text}
            onChange={(e) => settext(e.target.value)}
            placeholder="enter the city"
          />
          <button className="searchbtn" onClick={getweather}>
            <i className="fa fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div className="card">
          <div className="weathericon">
            <img className="Icon" src={weathericon} alt="sun icon" />
          </div>

          <div className="weatherDes">
            <div className="temp">{info.temp}℃</div>
            <div className="">
              <h1 className="weatherType">{info.main}</h1>
            </div>
          </div>
          <div className="otherdes">
            <div className="row status1">
              <div className="col col-lg-4 col-sm-4 col-md-4 editdiv">
                <h4>{info.speed} KMH</h4>
                <p className="windspeed">WindSpeed</p>
              </div>
              <div className="col col-lg-4 col-sm-4 col-md-4 editdiv">
                <h4>{time} PM</h4>
                <p>Sunset</p>
              </div>
              <div className="col col-lg-4 col-sm-4 col-md-4">
                <h4>{info.pressure} HPA</h4>
                <p>Pressure</p>
              </div>
            </div>
          </div>
          <div className="div2">
            <div className="row status2">
              <div className="col col-lg-6 col-sm-6 col-md-6 statuscol1">
                <h4>{info.feels_like}℃</h4>
                <p>Feels-Like</p>
              </div>

              <div className="col col-lg-6 col-sm-6 col-md-6">
                <h4>{info.humidity}</h4>
                <p>Humidity</p>
              </div>
            </div>
          </div>

          <div className="enddiv">
            <h3>{info.name}</h3>
            <p>{new Date().toLocaleString()}</p>
          </div>
        </div>

        <div className="footer">
          <p>Made with ❤️ by Suryansh</p>
        </div>
      </div>
    </>
  );
}
