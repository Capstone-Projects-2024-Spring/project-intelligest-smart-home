import React from "react";
import Image from "next/image";
import tv from "./TV.png";
import light from "./lights.png";
import alarm from "./alarm.png";
import locks from "./locks.png";
import reminders from "./reminders.png"
import thermostat from "./thermostat.png"
import weather from "./weather.png"
import toDo from "./to-dolist.png"

export default function Home() {
    const handleClick = (buttonName) => {
    console.log(buttonName);
  };

  return (
      <main className="flex min-h-screen flex-col">
      <div className="bg-gray-200 min-h-screen flex justify-center items-center">
        <div className="grid grid-cols-4 gap-4">
          <button className="hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded">
            <Image src={tv} alt="TV" width={140} height={50} />
            TV
          </button>
          <button className="hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            <Image src={light} alt="TV" width={140} height={50} />
            Lights
          </button>
          <button className="hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            <Image src={alarm} alt="TV" width={140} height={50} />
            Alarm
          </button>
          <button className="hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            <Image src={locks} alt="TV" width={140} height={50} />
            Weather
          </button>
          <button className="custom-image hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            <Image src={reminders} alt="TV" width={140} height={50} />
            Thermostat
          </button>
          <button className="custom-image hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            <Image src={thermostat} alt="TV" width={140} height={50} />
            Locks
          </button>
          <button className="custom-image hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            <Image src={weather} alt="TV" width={140} height={50} />
            Reminders
          </button>
          <button className="custom-image hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            <Image src={toDo} alt="TV" width={140} height={80} />
            To-do List
          </button>
        </div>
      </div>
    </main>
  );
}



