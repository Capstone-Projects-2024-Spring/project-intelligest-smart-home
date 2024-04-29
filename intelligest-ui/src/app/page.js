"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "@component/app/services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faLock } from "@fortawesome/free-solid-svg-icons";
import toDo from "./gesture-imgs/to-dolist.png";
import Icon from '@mdi/react';
import { mdiAccount, mdiAccountMultiple, mdiHomeAssistant } from '@mdi/js';
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [data, setData] = useState({});
  const [showWeatherPopup, setShowWeatherPopup] = useState(false);
  const [query, setQuery] = useState({ q: "Philadelphia" });
  const [units, setUnits] = useState("metric");
  const [showEntityChoices, setShowEntityChoices] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  //const [weather, setWeather] = useState(null);
  const [showNewsPopup, setShowNewsPopup] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const handleClick = (buttonName) => {
    console.log(buttonName);
  };

  useEffect(() => {
    const img = document.querySelector("#videoElement");
    img.src = "http://127.0.0.1:5000/video_feed";
    img.style.width = "640px";
  }, []);

  // useEffect(() => {
  //   const videoPlayer = videoRef.current; // Get the current value of the ref

  //   const loadVideo = () => {
  //     fetch('/video_feed')
  //       .then((response) => response.body)
  //       .then((body) => {
  //         const reader = body.getReader();
  //         const stream = new ReadableStream({
  //           start(controller) {
  //             function push() {
  //               reader.read().then(({ done, value }) => {
  //                 if (done) {
  //                   controller.close();
  //                   return;
  //                 }
  //                 controller.enqueue(new Uint8Array(value));
  //                 push();
  //               });
  //             }
  //             push();
  //           },
  //         });
  //         videoPlayer.srcObject = new MediaSource(stream);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching video feed:', error);
  //       });
  //   };

  //   loadVideo();
  // }, []);

  useEffect(() => {
    const eventSource = new EventSource(
      "http://127.0.0.1:5000/current_gesture_sse"
    );
    eventSource.onmessage = function (event) {
      setData(JSON.parse(event.data));
    };
    return () => eventSource.close();
  }, []);

  useEffect(() => {
    if (data.deviceChoice === "Weather") {
      setShowWeatherPopup(true);
    } else if (data.deviceChoice === "News") {
      setShowWeatherPopup(false);
    } else {
      setShowWeatherPopup(false);
      setShowNewsPopup(false);
    }
  }, [data.deviceChoice]);

  useEffect(() => {
    if (
      data.firstGesture === "thumb flat" ||
      data.secondGesture === "thumb flat"
    ) {
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

  useEffect(() => {
    if (data.entityChoices && data.entityChoices.length > 0) {
      setShowEntityChoices(true);
    } else {
      setShowEntityChoices(false);
    }
  }, [data.entityChoices]);

  useEffect(() => {
    if (data.deviceStatus !== "N/A") {
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 2000);
    }
  }, [data.deviceStatus]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_news');
        if (response.ok) {
          const data = await response.json();
          setNewsData(data);
          setShowNewsPopup(true);
        } else {
          console.error('Failed to fetch news');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (data.deviceChoice === "News") {
      fetchNews();
    }
  }, [data.deviceChoice]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  const handleWeatherButtonClick = () => {
    setShowWeatherPopup(true);
  };

  const handleNewsButtonClick = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_news');
      if (response.ok) {
        const data = await response.json();
        setNewsData(data);
        setShowNewsPopup(true);
      } else {
        console.error('Failed to fetch news');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchWeather = async () => {
    const data = await getFormattedWeatherData({ q: "Philadelphia" });
    console.log(data);
  };

  const closePopup = () => {
    setShowWeatherPopup(false);
  };

  const getEntityIcon = (entityType) => {
    switch (entityType) {
      case "Light":
        return faLightbulb;
      case "Lock":
        return faLock;
      default:
        return null;
    }
  };

  const handleEntityChoice = async (index) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/perform_action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deviceChoice: data.deviceChoice,
          entityChoice: data.entityChoices[index],
        }),
      });

      if (response.ok) {
        // Action performed successfully
        console.log("Action performed successfully");
        setShowEntityChoices(false); // Hide the entity choices popup
      } else {
        // Handle error case
        console.error("Failed to perform action");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLightButtonClick = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get_entities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deviceChoice: "Light",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update the state with the received entity choices
        setData((prevData) => ({
          ...prevData,
          entityChoices: data.entityChoices,
        }));
        setShowEntityChoices(true);
      } else {
        // Handle error case
        console.error("Failed to fetch entities");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLockButtonClick = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get_entities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deviceChoice: "Lock",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update the state with the received entity choices
        setData((prevData) => ({
          ...prevData,
          entityChoices: data.entityChoices,
        }));
        setShowEntityChoices(true);
      } else {
        // Handle error case
        console.error("Failed to fetch entities");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-gray-200 min-h-screen flex justify-center items-center">
        <div data-testid="HA-icon" className="Icon">
          <Link
            href="https://127.0.1.1:8123/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button aria-label="User Profile" className="self-end mr-4 mt-4">
              <Icon path={mdiHomeAssistant} title="User Profile" size={3} />
            </button>
          </Link>
        </div>
        <div data-testid="video-feed">
          <img id="videoElement" />
          <div className="text-black">
            Latest Gesture: {data.latestGesture} <br />
            First Gesture: {data.firstGesture} <br />
            Second Gesture: {data.secondGesture} <br />
            Device Choice: {data.deviceChoice} <br />
            Device Status: {data.deviceStatus} <br />
            Entity Choices: {data.entityChoices} <br />
            Entity Choice: {data.entityChoice} <br />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <button
            onClick={handleNewsButtonClick}
            className={`hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ${
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
            onClick={handleLightButtonClick}
          >
            <Image src={light} alt="Lights gesture" width={140} height={50} />
            Lights
          </button>
          <button className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={alarm} alt="Alarm gesture" width={140} height={50} />
            Alarm
          </button>
          <button
            onClick={handleWeatherButtonClick}
            className={`hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ${
              data.deviceChoice === "Weather" ? "bg-blue-300" : ""
            }`}
          >
            <Image
              src={weather}
              alt="Weather gesture"
              width={140}
              height={50}
            />
            Weather
          </button>
          <button
            className={`hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ${
              data.deviceChoice === "Thermostat" ? "bg-blue-300" : ""
            }`}
          >
            <Image
              src={reminders}
              alt="Thermostat gesture"
              width={140}
              height={50}
            />
            Thermostat
          </button>
          <button className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image
              src={thermostat}
              alt="Locks gesture"
              width={140}
              height={50}
            />
            Locks
          </button>
          <button className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image
              src={locks}
              alt="Reminders gesture"
              width={140}
              height={50}
            />
            Reminders
          </button>
          <button className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image
              src={livetranscription}
              alt="Live Transcription gesture"
              width={140}
              height={80}
            />
            Live Transcription
          </button>
        </div>
      </div>
      {showWeatherPopup && (
        <div className="absolute right-0 top-0 w-1/2 h-screen bg-white p-4 overflow-auto">
          <button onClick={closePopup} className="absolute top-0 right-0 p-2">
            X
          </button>
          <div className="flex flex-col items-center justify-center absolute top-20 right-10">
            <Image
              src={sidewaysthumb}
              alt="Close"
              width={80} // Original size times four (assuming original was 20x20)
              height={80}
              className="block"
            />
            <span className="text-sm mt-1">Exit</span>
          </div>
          <span className="text-s mt-1">Exit</span>
          <div className="p-4 text-black">
            <h2>Current Weather:</h2>
            <p>Humidity: {data.weatherData?.current?.humidity}%</p>
            <p>
              Precipitation: {data.weatherData?.current?.precipitation} inches
            </p>
            <p>Pressure: {data.weatherData?.current?.pressure} inHg</p>

            {Object.keys(data.weatherData)
              .filter((date) => date !== "current")
              .map((date) => (
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
                      {Object.entries(
                        data.weatherData[date].hourly_forecasts
                      ).map(([time, temp]) => (
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
      {showEntityChoices && (
        <div className="absolute right-0 top-0 w-1/2 h-screen bg-white p-4 overflow-auto">
          <h2>Select a {data.deviceChoice}:</h2>
          <ul>
            {data.entityChoices.map((entity, index) => (
              <li key={entity}>
                <button
                  className={`hover:bg-gray-300 text-black font-bold py-2 px-4 rounded flex items-center ${
                    data.entityChoice === entity ? "bg-blue-300" : ""
                  }`}
                  onClick={() => handleEntityChoice(index)}
                >
                  {getEntityIcon(data.deviceChoice) && (
                    <FontAwesomeIcon
                      icon={getEntityIcon(data.deviceChoice)}
                      className="mr-2"
                    />
                  )}
                  {entity}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showNewsPopup && (
          <div className="absolute right-0 top-0 w-1/2 h-screen bg-white p-4 overflow-auto shadow-lg">
            <button onClick={() => setShowNewsPopup(false)} 
                    className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="p-4 text-black">
              <h2 className="text-xl font-semibold mb-4">Latest News:</h2>
              {newsData.map((article, index) => (
                <div key={index} className="mb-4 border-b pb-4">
                  <h3 className="text-lg font-bold">{article.title}</h3>
                  <p className="text-gray-700 mb-2">{article.content}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                    Read more
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      {showConfirmation && (
        <div className="absolute right-0 bottom-0 w-1/2 h-screen bg-white p-4 overflow-auto">
          <h2>Operation Complete</h2>
          <p>Device Status: {data.deviceStatus}</p>
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
