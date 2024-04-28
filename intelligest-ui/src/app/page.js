"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import tv from "./gesture-imgs/TV.png";
import light from "./gesture-imgs/lights.png";
import alarm from "./gesture-imgs/alarm.png";
import locks from "./gesture-imgs/locks.png";
import reminders from "./gesture-imgs/reminders.png";
import thermostat from "./gesture-imgs/thermostat.png";
import weather from "./gesture-imgs/weather.png";
import livetranscription from "./gesture-imgs/to-dolist.png";
import thumbsup from "./gesture-imgs/thumbsup.png";
import sidewaysthumb from "./gesture-imgs/sidewaysthumb.png";
import TimeAndLocation from "./components/TimeAndLocation";
import Temperature from "./components/Temperature";
import Forecast  from "./components/Forecast";
import getFormattedWeatherData from "@component/app/services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [data, setData] = useState({});
  const [showWeatherPopup, setShowWeatherPopup] = useState(false);
  const [query, setQuery] = useState({ q: "Philadelphia" });
  const [units, setUnits] = useState("metric");
  //const [weather, setWeather] = useState(null);

  useEffect(() => {
    const img = document.querySelector("#videoElement");
    img.src = "http://127.0.0.1:5000/video_feed";
    img.style.width = "640px";
  }, []);

  useEffect(() => {
    const eventSource = new EventSource("http://127.0.0.1:5000/current_gesture_sse");
    eventSource.onmessage = function (event) {
      setData(JSON.parse(event.data));
    };
    return () => eventSource.close();
  }, []);

  useEffect(() => {
    if (data.deviceChoice === "Weather") {
      setShowWeatherPopup(true);
    } else {
      setShowWeatherPopup(false);
    }
  }, [data.deviceChoice]); 

  useEffect(() => {
    if (data.firstGesture === "thumb flat" || data.secondGesture === "thumb flat") {
      setShowWeatherPopup(false);
    }
  }, [data.firstGesture, data.secondGesture]);

  // Weather stuff
  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  const handleWeatherButtonClick = () => {
    setShowWeatherPopup(true);
  };

  const fetchWeather = async () => {
    const data = await getFormattedWeatherData({ q: "Philadelphia"});
    console.log(data);
  }

  const closePopup = () => {
    setShowWeatherPopup(false);
  };

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-gray-200 min-h-screen flex justify-center items-center">
        <div>
          <img id="videoElement" />
          <div className="text-black">
            Latest Gesture: {data.latestGesture} <br />
            First Gesture: {data.firstGesture} <br />
            Second Gesture: {data.secondGesture} <br />
            Third Gesture: {data.thirdGesture} <br />
            Device Choice: {data.deviceChoice} <br />
            Device Status: {data.deviceStatus} <br />
            Entity Choices: {data.entityChoices} <br />
            Entity Choice: {data.entityChoice} <br />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <button className={`hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ${
              data.deviceChoice === "News" ? "bg-blue-300" : ""
            }`}
          >
            <Image src={tv} alt="News gesture" width={140} height={50} />
            News
          </button>
          <button
            className={`hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ${
              data.deviceChoice === "Light" ? "bg-blue-300" : ""
            }`}
          >
            <Image src={light} alt="Lights gesture" width={140} height={50} />
            Lights
          </button>
          <button className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={alarm} alt="Alarm gesture" width={140} height={50} />
            Alarm
          </button>
          <button onClick={handleWeatherButtonClick} className={`hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ${
            data.deviceChoice === "Weather" ? "bg-blue-300" : ""}`}>
            <Image src={weather} alt="Weather gesture" width={140} height={50} />
            Weather
          </button>
          <button className={`hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ${
              data.deviceChoice === "Thermostat" ? "bg-blue-300" : ""
            }`}
          >
            <Image src={reminders} alt="Thermostat gesture" width={140} height={50} />
            Thermostat
          </button>
          <button className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={thermostat} alt="Locks gesture" width={140} height={50} />
            Locks
          </button>
          <button className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={locks} alt="Reminders gesture" width={140} height={50} />
            Reminders
          </button>
          <button className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={livetranscription} alt="Live Transcription gesture" width={140} height={80} />
            Live Transcription
          </button>
        </div>
      </div>
      {showWeatherPopup && (
        <div className="fixed inset-0 flex justify-center items-center ">
          <div className={`w-1/2 h-4/5-screen bg-gradient-to-br from-cyan-700 to-blue-700 p-4 overflow-auto ${formatBackground()}`}>
            {/* <TopButtons setQuery={setQuery} />
            <Inputs setQuery={setQuery} units={units} setUnits={setUnits} /> */}
            {weather && (
              <div>
                <TimeAndLocation />
                <Temperature  />
                <Forecast title="Hourly forecast"/>
                <Forecast title="Daily forecast"/>
              </div>
            )}

          </div>
        </div>
      )}
        {/*<div className="fixed inset-0 flex justify-center items-center w-1/2 h-screen bg-white">
          <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700
          to-blue-700 h-fit shadow-xl">
              <TimeAndLocation />
          </div>
    </div>*/}
  

        {/*<div className="absolute right-0 top-0 w-1/2 h-screen bg-white p-4 overflow-auto">
            <button onClick={closePopup} className="absolute top-0 right-0 p-2">X</button>
          <div className="flex flex-col items-center justify-center absolute top-20 right-10">
            <span className="text-sm mt-1">Exit</span>
          </div>
        <span className="text-s mt-1" >Exit
        </span>
        
          <div className="p-4 text-black">
            <p class="text-2xl font-bold">Weather</p>
            <p>Humidity: {data.weatherData?.current?.humidity}%</p>
            <p>Precipitation: {data.weatherData?.current?.precipitation} inches</p>
            <p>Pressure: {data.weatherData?.current?.pressure} inHg</p>
            
            {Object.keys(data.weatherData).filter(date => date !== 'current').map((date) => (
              <div key={date}>
                <h3>{date}</h3>
                <p>Sunrise: {data.weatherData[date].sunrise}</p>
                <p>Sunset: {data.weatherData[date].sunset}</p>
                <p>Daylight: {data.weatherData[date].sunlight} hours</p>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Temperature (°F)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(data.weatherData[date].hourly_forecasts).map(([time, temp]) => (
                      <tr key={time}>
                        <td>{time}</td>
                        <td>{temp}°F</td>
                      </tr>
                    ))}
                    <div id="area-chart">
                      <svg class="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
                      </svg>
                    </div>
                  </tbody>

                </table>
              <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
              </div>
            ))} 
          </div>
          */}
    </main>
  );
}

export default Home;
