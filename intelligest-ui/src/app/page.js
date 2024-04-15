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

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        let video = document.querySelector("#videoElement");
        video.srcObject = stream;
      })
      .catch(function (err) {
        console.log("Something went wrong!", err);
      });
  }, []);

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:5000/current_gesture_sse"
    );

    eventSource.onmessage = function (event) {
      setData(JSON.parse(event.data));
      console.log(data);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-gray-200 min-h-screen flex justify-center items-center">
        <video autoPlay={true} id="videoElement" />
        <div className="text-black">
          Latest Gesture: {data.lastestGesture} <br />
          First Gesture: {data.firstGesture} <br />
          Latest Gesture: {data.secondGesture} <br />
          Device Choice: {data.deviceChoice} <br />
          Device Status: {data.deviceStatus} <br />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <button className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={tv} alt="TV" width={140} height={50} />
            TV
          </button>
          <button className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={light} alt="TV" width={140} height={50} />
            Lights
          </button>
          <button className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={alarm} alt="TV" width={140} height={50} />
            Alarm
          </button>
          <button className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={locks} alt="TV" width={140} height={50} />
            Weather
          </button>
          <button className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={reminders} alt="TV" width={140} height={50} />
            Thermostat
          </button>
          <button className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={thermostat} alt="TV" width={140} height={50} />
            Locks
          </button>
          <button className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={weather} alt="TV" width={140} height={50} />
            Reminders
          </button>
          <button className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={toDo} alt="TV" width={140} height={80} />
            To-do List
          </button>
        </div>
      </div>
    </main>
  );
}
