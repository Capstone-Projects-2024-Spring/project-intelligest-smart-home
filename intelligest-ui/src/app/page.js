"use client";
import React, { useState, useEffect, useRef } from "react";
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

import { mdiAccount, mdiAccountMultiple, mdiFlaskEmpty, mdiHomeAssistant } from '@mdi/js';
import "react-toastify/dist/ReactToastify.css";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [data, setData] = useState({}); // Declare 'data' in your component's state
  const [lightState, setLightState] = useState("Inactive");
  const [lockState, setLockState] = useState("Inactive");
  const [thermostatState, setThermostatState] = useState("Inactive");
  const [tvState, setTvState] = useState("Inactive");

  const [viewToDoList, setViewToDoList] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [viewUpdateTask, setViewUpdateTask] = useState(false);
  const [getTaskIndex, setGetTaskIndex] = useState();
  const [updateTask, setUpdateTask] = useState("");
  const [checkTask, setCheckTask] = useState(false);

  const [viewAlarm, setViewAlarm] = useState(false);
  const [getTime, setGetTime] = useState(new Date().toLocaleTimeString());
  const [userAlarmDate, setUserAlarmDate] = useState(new Date());
  const [userAlarmTime, setUserAlarmTime] = useState(new Date().toTimeString().split(" ")[0]);
  const [newAlarm, setNewAlarm] = useState([]);
  const [alarmNotification, setAlarmNotification] = useState(false);

  const [viewReminder, setViewReminder] = useState(false);
  const [newReminder, setNewReminder] = useState("");
  const [userReminders, setUserReminders] = useState([]);
  const [reminderDate, setReminderDate] = useState(new Date());
  const [reminderTime, setReminderTime] = useState(new Date().toTimeString().split(" ")[0]);

  const [getError, setGetError] = useState(false);
  const [getErrorMsg, setGetErrorMsg] = useState("");

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

    const eventSource = new EventSource("http://127.0.0.1:5000/current_gesture_sse");
    eventSource.onmessage = function(event){
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
    return ()=>{
      eventSource.close();      
    };
  }, []);

  //Capture the change of states in devices.
  useEffect(() => {
    switch(data.deviceChoice){
      case 'Light':
        (data.deviceStatus == 'on') && (setLightState("Active"));
      case 'Lock':
        (data.deviceStatus == 'on') && (setLockState("Active"));
      case 'Thermostat':
        (data.deviceStatus == 'on') && (setThermostatState("Active"));
      case 'TV':
        (data.deviceStatus == 'on') && (setTvState("Active"));
      default:
        console.log("Error");
    }
  },[data.lastestGesture]);

  useEffect(()=>{
    let isTimer = setInterval(()=>{
      setGetTime(new Date().toLocaleTimeString())
    },1000)
    return()=>clearInterval(isTimer);
  }, []);

  useEffect(()=>{
    (viewAlarm) && (document.getElementById('alarmDate').valueAsDate = new Date());
    (viewReminder) && (document.getElementById('reminderDate').valueAsDate = new Date());
  },[viewAlarm, viewReminder]);

  const getToDoList=()=>{ setViewToDoList(true); }
  const getUpdateTask=(index)=>{
    setUpdateTask([...tasks][index]);
    setGetTaskIndex(index);
    setViewUpdateTask(true);
  }
  const getNegatedTask=()=>{ setCheckTask(!checkTask);}
  const getReminder=()=>{ setViewReminder(true); }
  const getAlarm=()=>{ setViewAlarm(true); }
  const closeToDoList=()=>{ setViewToDoList(false); }
  const closeUpdateTask=()=>{ setViewUpdateTask(false); }
  const closeReminder=()=>{ setViewReminder(false); }
  const closeAlarm=()=>{ setViewAlarm(false); }
  const closeAlarmNotification=()=>{ setAlarmNotification(false); }
  const resetError=()=>{ setGetError(false); setGetErrorMsg(""); }

  function getNewToDoListTask(){
    if(newTask.trim() !== ""){
      setTasks(getTasks => [...getTasks, newTask]);
      setNewTask("");
    }
  }

  function editToDoListTask(){
    var newTasks = [...tasks];
    newTasks[getTaskIndex] = updateTask;
    setTasks(newTasks);
    setViewUpdateTask(false);
  }

  function deleteToDoListTask(index){
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function getNewAlarmEvent(){
    var checkCurrentAlarms = [...newAlarm];
    if(checkCurrentAlarms.includes(userAlarmDate.toLocaleDateString("en-US") + ", " + userAlarmTime)){
      setGetError(true);
      setGetErrorMsg("That time is already set");
      return;
    }
    var currentDate = new Date();
    var isUserDate = userAlarmDate.getMonth()+"/"+userAlarmDate.getDate()+"/"+userAlarmDate.getFullYear();
    var getCurrentDate = currentDate.getMonth()+"/"+currentDate.getDate()+"/"+currentDate.getFullYear();
    if(isUserDate < getCurrentDate){
      setGetError(true);
      setGetErrorMsg("Invalid Date");
      return;
    }
    if(userAlarmDate == currentDate && userAlarmTime < currentDate.toTimeString().split(" ")[0]){
      setGetError(true);
      setGetErrorMsg("Invalid Time");
      return;
    }
    const isNewAlarm = userAlarmDate.toLocaleDateString("en-US") + ", " + userAlarmTime;
    var timeComponents = userAlarmTime.split(":");
    userAlarmDate.setHours(timeComponents[0], timeComponents[1], timeComponents[2]);
    var alarmTimer = userAlarmDate.getTime() - currentDate.getTime();
    var timeoutID = setTimeout(()=>{
      setAlarmNotification(true);
      var getCurrentAlarms = [...newAlarm];
      var getIndex = getCurrentAlarms.indexOf(isNewAlarm);
      deleteAlarmEvent(getIndex);
    },alarmTimer);
    setNewAlarm(getAlarms => [...getAlarms, {isDate:isNewAlarm, isLinker:timeoutID}]);
  }

  function deleteAlarmEvent(index){
      clearTimeout(newAlarm[index].isLinker);
      const updatedAlarms = newAlarm.filter((_, i) => i !== index);
      setNewAlarm(updatedAlarms);
  }

  function getReminderTask(){
    if(newReminder.trim() == ""){
      setGetError(true);
      setGetErrorMsg("Enter a task...");
      return;
    }
    var checkCurrentAlarms = [...newAlarm];
    if(checkCurrentAlarms.includes(userAlarmDate.toLocaleDateString("en-US") + ", " + userAlarmTime)){
      setGetError(true);
      setGetErrorMsg("That time is already set");
      return;
    }
    var currentDate = new Date();
    var isUserDate = reminderDate.getMonth()+"/"+reminderDate.getDate()+"/"+reminderDate.getFullYear();
    var getCurrentDate = currentDate.getMonth()+"/"+currentDate.getDate()+"/"+currentDate.getFullYear();
    if(isUserDate < getCurrentDate){
      setGetError(true);
      setGetErrorMsg("Invalid Date");
      return;
    }
    if(reminderDate == currentDate && reminderTime < currentDate.toTimeString().split(" ")[0]){
      setGetError(true);
      setGetErrorMsg("Invalid Time");
      return;
    }
    const isNewReminderTime = reminderDate.toLocaleDateString("en-US") + ", " + reminderTime;
    var timeComponents = reminderTime.split(":");
    reminderDate.setHours(timeComponents[0], timeComponents[1], timeComponents[2]);
    var reminderTimer = reminderDate.getTime() - currentDate.getTime();
    console.log("Time until: " + reminderTimer)
    var timeoutID = setTimeout(()=>{
      setAlarmNotification(true);
      var getCurrentReminders = [...userReminders];
      var getIndex = getCurrentReminders.indexOf(isItem => isItem.task === newReminder);
      deleteReminderTask(getIndex);
    },reminderTimer);
    setUserReminders(getReminders => [...getReminders, {task:newReminder, time:isNewReminderTime, isLinker:timeoutID}]);
  }

  function deleteReminderTask(index){
    clearTimeout(userReminders[index].isLinker);
    const updatedReminders = userReminders.filter((_, i) => i !== index);
    setUserReminders(updatedReminders);
  }
 
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
        <div style={{ color:"gray",position:"absolute", top:"5px", right:"5px"}}>Devices 
          <select style={{border:"black"}}>
            <option label=" "> </option>
            <option>Light : {lightState} </option>
            <option>Lock : {lockState}</option>
            <option>Thermostat : {thermostatState}</option>
            <option>TV : {tvState}</option>
          </select>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <button onClick={() => handleClick("TV Button Pressed")} className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={tv} alt="TV" width={140} height={50} />
            TV
          </button>
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
          <button onClick={()=>getAlarm()} className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
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

          <button onClick={() => getReminder()} className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={weather} alt="TV" width={140} height={50} />
            Reminders
          </button>
          <button onClick={()=>getToDoList()} className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={toDo} alt="TV" width={140} height={80} />
            To-do List
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
      
      <Modal show={viewToDoList} onHide={closeToDoList}>
        <Modal.Header closeButton>
        <Modal.Title>To-Do List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input type="text" placeholder="Enter an task..." style={{border:"1px solid black", borderRadius: "5px"}} value={newTask} onChange={(e)=>{setNewTask(e.target.value)}}/>
            <button id="setAlarm" onClick={getNewToDoListTask} style={{marginLeft:"10px", fontSize:"1rem", border:"1px solid darkgray", borderRadius:"5px", padding:"2px"}}>Add</button>
          </div>
          <ul style={{textAlign:"left", display:"inline"}}>
            {tasks.map((task, index)=>{
              return(
              <li key={index} style={{backgroundColor:"lightgray",border:"1px solid darkgray", borderRadius:"5px", animation:"ease-in 0.5s", marginTop:"10px"}}>
                <span onClick={getNegatedTask} style={{textDecoration: checkTask ? 'line-through' : 'none'}}>{task}</span>
                <button onClick={()=> getUpdateTask(index)} style={{padding:"2px", fontSize:"1rem", border:"1px solid darkgray", borderRadius:"5px", marginLeft:"4px"}}> Edit</button>
                <button onClick={() => deleteToDoListTask(index)} style={{padding:"2px", fontSize:"1rem", border:"1px solid darkgray", borderRadius:"5px", right:"0"}}> Delete</button>
              </li>)
            })}
          </ul>
        </Modal.Body>
      </Modal>

      <Modal show={viewUpdateTask} onHide={closeUpdateTask} centered>
        <Modal.Header closeButton>
        <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input type="text" style={{border:"1px solid black", borderRadius: "5px"}} value={updateTask} onChange={(e)=>{setUpdateTask(e.target.value)}}/>
            <button onClick={editToDoListTask} style={{marginLeft:"10px", fontSize:"1rem", border:"1px solid darkgray", borderRadius:"5px", padding:"2px"}}>Update Task</button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={viewAlarm} onHide={closeAlarm}>
      <Modal.Header closeButton>
        <Modal.Title>Alarm</Modal.Title>
      </Modal.Header>
        <div style={{textAlign:"center", padding:"10px"}}>
          <div style={{fontSize:"2rem", margin:"20px"}}>
            {getTime}
          </div>
          <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"10px"}}>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
              <label for="alarmDate" style={{paddingRight:"10px"}}>Select Date: </label>
              <input type="date" id="alarmDate" min="" style={{padding:"10px", fontSize:"1rem", border:"1px solid darkgray", borderRadius:"5px"}} onChange={(e)=>{setUserAlarmDate(new Date(e.target.value))}}/>
            </div>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
              <label for="alarmTime" style={{paddingRight:"10px"}}>Select Time: </label>
              <input type="time" id="alarmTime" value={userAlarmTime} style={{padding:"10px", fontSize:"1rem", border:"1px solid darkgray", borderRadius:"5px"}} onChange={(e)=>{setUserAlarmTime((e.target.value))}}/>
            </div>
            <br/>
            <button id="setAlarm" onClick={getNewAlarmEvent} style={{padding:"10px", fontSize:"1rem", border:"1px solid darkgray", borderRadius:"5px"}}>Set Alarm</button>
          </div>
          <ul style={{marginTop:"10px", textAlign:"left"}}>
            {newAlarm.map((item, index) => {
              return(
              <li key={index} style={{backgroundColor:"lightgray",border:"1px solid darkgray", borderRadius:"5px", padding:"10px", display:"flex", alignItems:"center", animation:"ease-in 0.5s"}}>
                <span>{item.isDate}</span>
                <button class="deleteAlarm" onClick={() => deleteAlarmEvent(index)} style={{padding:"10px", fontSize:"1rem", border:"1px solid darkgray", borderRadius:"5px"}}>Delete</button>
              </li>);
            })}
          </ul>
        </div>
      </Modal>
      
      <Modal show={alarmNotification} onHide={closeAlarmNotification} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>Alarm!!!</Modal.Body>
        <Modal.Footer>
          <Button onClick={closeAlarmNotification}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={viewReminder} onHide={closeReminder}>
        <Modal.Header closeButton>
        <Modal.Title>Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea type="text" placeholder="Enter an reminder..." style={{border:"1px solid black", borderRadius: "5px", width:"100%", height:"150px"}} value={newReminder} onChange={(e) =>{setNewReminder(e.target.value)}} contentEditable/>
          <div style={{display:"flex", flexDirection:"column", alignItems:"center", padding:"10px", gap:"10px"}}>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
              <label for="reminderDate" style={{paddingRight:"10px"}}>Select Date: </label>
              <input type="date" id="reminderDate" min="" style={{padding:"10px", fontSize:"1rem", border:"1px solid darkgray", borderRadius:"5px"}} onChange={(e)=>{setReminderDate(new Date(e.target.value))}}/>
            </div>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
              <label for="reminderTime" style={{paddingRight:"10px"}}>Select Time: </label>
              <input type="time" id="reminderTime" value={reminderTime} style={{padding:"10px", fontSize:"1rem", border:"1px solid darkgray", borderRadius:"5px"}} onChange={(e)=>{setReminderTime((e.target.value))}}/>
            </div>
            <button id="setReminder" onClick={getReminderTask} style={{marginLeft:"10px", fontSize:"1rem", border:"1px solid darkgray", borderRadius:"5px", padding:"10px"}}>Set</button>
          </div>
          <ul style={{marginTop:"10px", textAlign:"left", display:"inline"}}>
            {userReminders.map((item, index) => {
              return(
              <li key={index} style={{backgroundColor:"lightgray",border:"1px solid darkgray", borderRadius:"5px", padding:"10px", display:"flex", alignItems:"center", animation:"ease-in 0.5s"}}>
                <span style={{width:"100px", whiteSpace:"nowrap" ,overflow:"hidden", textOverflow:"ellipsis", display:"inline-block"}}>{item.task}</span>
                <span style={{display:"inline-block"}}>{item.time}</span>
                <button class="deleteReminder" onClick={() => deleteReminderTask(index)} style={{padding:"10px", fontSize:"1rem", border:"1px solid darkgray", borderRadius:"5px"}}>Delete</button>
              </li>);
            })}
          </ul>
        </Modal.Body>
      </Modal>

      <Modal show={getError} onHide={resetError} centered>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{getErrorMsg}</Modal.Body>
      <Modal.Footer>
        <Button onClick={resetError}>Close</Button>
      </Modal.Footer>
    </Modal>
    
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
