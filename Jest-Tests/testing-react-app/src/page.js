"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
// import tv from "./gesture-imgs/TV.png";
// import light from "./gesture-imgs/lights.png";
// import alarm from "./gesture-imgs/alarm.png";
// import locks from "./gesture-imgs/locks.png";
// import reminders from "./gesture-imgs/reminders.png";
// import thermostat from "./gesture-imgs/thermostat.png";
// import weather from "./gesture-imgs/weather.png";
// import toDo from "./gesture-imgs/to-dolist.png";
import Icon from '@mdi/react';
import { mdiAccount, mdiAccountMultiple, mdiHomeAssistant } from '@mdi/js';


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
      <div >

      </div>
      <div  className="bg-gray-200 min-h-screen flex justify-center items-center">
        <div className="Icon">
          <button aria-label="User Profile" className="self-end mr-4 mt-4">
            <Icon path={mdiHomeAssistant} title="User Profile" size={3} />
          </button>
        </div>
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
        <div data-testid="button-test" className="grid grid-cols-4 gap-4">
          <button onClick={() => handleClick("TV Button Pressed")} className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={tv} alt="TV" width={140} height={50} />
            TV
          </button>
          <button onClick={() => handleClick("Light Button Pressed")}
            className={`hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ${
              data.deviceChoice === "light" ? "bg-blue-300" : ""
            }`}>
            <Image src={light} alt="TV" width={140} height={50} />
            Lights
          </button>
          <button onClick={() => handleClick("Alarm Button Pressed")} 
          className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={alarm} alt="TV" width={140} height={50} />
            Alarm
          </button>
          <button onClick={() => handleClick("Weather Button Pressed")} className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={locks} alt="TV" width={140} height={50} />
            Weather
          </button>
          <button onClick={() => handleClick("Thermostat Button Pressed")} className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={reminders} alt="TV" width={140} height={50} />
            Thermostat
          </button>
          <button onClick={() => handleClick("Locks Button Pressed")} className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={thermostat} alt="TV" width={140} height={50} />
            Locks
          </button>
          <button onClick={() => handleClick("Reminders Button Pressed")} className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={weather} alt="TV" width={140} height={50} />
            Reminders
          </button>
          <button onClick={() => handleClick("To-do Button Pressed")} className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={toDo} alt="TV" width={140} height={80} />
            To-do List
          </button>
        </div>
      </div>
    </main>
  );
}
