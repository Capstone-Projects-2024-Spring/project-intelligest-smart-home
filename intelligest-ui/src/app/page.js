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
import toDo from "./gesture-imgs/to-dolist.png";

export default function Home() {
  const [data, setData] = useState({});
  const [showWeatherPopup, setShowWeatherPopup] = useState(false);

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
  const handleWeatherButtonClick = () => {
    setShowWeatherPopup(true);
  };

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
            <Image src={toDo} alt="To-do List gesture" width={140} height={80} />
            To-do List
          </button>
        </div>
      </div>
      {showWeatherPopup && (
        <div className="absolute right-0 top-0 w-1/2 h-screen bg-white p-4 overflow-auto">
          <button onClick={closePopup} className="absolute top-0 right-0 p-2">X</button>
          <div className="p-4 text-black">
            <h2>Current Weather:</h2>
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
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
