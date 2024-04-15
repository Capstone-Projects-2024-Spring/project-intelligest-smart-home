import React from "react";
import Image from "next/image";
import tv from "./gesture-imgs/TV.png";
import light from "./gesture-imgs/lights.png";
import alarm from "./gesture-imgs/alarm.png";
import locks from "./gesture-imgs/locks.png";
import reminders from "./gesture-imgs/reminders.png"
import thermostat from "./gesture-imgs/thermostat.png"
import weather from "./gesture-imgs/weather.png"
import toDo from "./gesture-imgs/to-dolist.png"

export default function Home() {
    const handleClick = (buttonName) => {
    console.log(buttonName);
  };

  return (
      <main className="flex min-h-screen flex-col">
      <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <img src="http://localhost:5000/video_feed" alt="Video Feed" style={{width: "100%", maxWidth: "640px", height: "auto"}} />
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



