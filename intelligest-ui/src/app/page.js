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
  const [data, setData] = useState({}); // Declare 'data' in your component's state
  const handleClick = (buttonName) => {
    console.log(buttonName);
  };

  //Loads the video on page load
  useEffect(() => {
    const img = document.querySelector("#videoElement");
    img.src = "http://127.0.0.1:5000/video_feed";
    img.style.width = "640px";
  }, []);

  //sets up event stream on page load
  useEffect(() => {
    const eventSource = new EventSource(
      "http://127.0.0.1:5000/current_gesture_sse"
    );

    eventSource.onmessage = function (event) {
      setData(JSON.parse(event.data));
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-gray-200 min-h-screen flex justify-center items-center">
        <div>
          <img id="videoElement" />
          <div className="text-black">
            Latest Gesture: {data.lastestGesture} <br />
            First Gesture: {data.firstGesture} <br />
            Latest Gesture: {data.secondGesture} <br />
            Device Choice: {data.deviceChoice} <br />
            Device Status: {data.deviceStatus} <br />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
        <button 
            className={`hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ${
            data.deviceChoice === "tv" ? "bg-orange-300" : ""
            }`}
          >
            <Image src={tv} alt="TV" width={140} height={50} />
            TV
          </button>
          <button
            className={`hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ${
              data.deviceChoice === "light" ? "bg-blue-300" : ""
            }`}
          >
            <Image src={light} alt="Lights" width={140} height={50} />
            Lights
          </button>
          <button className={`hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ${
              data.deviceChoice === "alarm" ? "bg-green-300" : ""
            }`}
          >
            <Image src={alarm} alt="Alarm" width={140} height={50} />
            Alarm
          </button>
          <button className={`hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ${
              data.deviceChoice === "weather" ? "bg-green-300" : ""
            }`}
          >
            <Image src={weather} alt="Weather" width={140} height={50} />
            Weather
          </button>
          <button className={`hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ${
              data.deviceChoice === "thermostat" ? "bg-green-300" : ""
            }`}
          >
            <Image src={thermostat} alt="Thermostat" width={140} height={50} />
            Thermostat
          </button>
          <button className={`hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ${
              data.deviceChoice === "locks" ? "bg-green-300" : ""
            }`}
          >
            <Image src={locks} alt="Locks" width={140} height={50} />
            Locks
          </button>
          <button className={`hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ${
              data.deviceChoice === "reminders" ? "bg-green-300" : ""
            }`}
          >
            <Image src={reminders} alt="Reminders" width={140} height={50} />
            Reminders
          </button>
          <button className={`hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ${
              data.deviceChoice === "to-do list" ? "bg-green-300" : ""
            }`}
          >
            <Image src={toDo} alt="To-do List" width={140} height={80} />
            To-do List
          </button>
        </div>
      </div>
    </main>
  );
}
