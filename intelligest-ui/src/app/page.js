"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import tv from "./gesture-imgs/TV.png";
import light from "./gesture-imgs/lights.png";
import alarm from "./gesture-imgs/alarm.png";
import locks from "./gesture-imgs/locks.png";
import reminders from "./gesture-imgs/reminders.png";
import thermostat from "./gesture-imgs/thermostat.png";
import weather from "./gesture-imgs/weather.png";
import toDo from "./gesture-imgs/to-dolist.png";
import Icon from '@mdi/react';
import { mdiAccount, mdiAccountMultiple, mdiFlaskEmpty, mdiHomeAssistant } from '@mdi/js';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [data, setData] = useState({}); // Declare 'data' in your component's state
  const [lightState, setLightState] = useState("Inactive");
  const [lockState, setLockState] = useState("Inactive");
  const [thermostatState, setThermostatState] = useState("Inactive");
  const [tvState, setTvState] = useState("Inactive");

  const [viewToDoList, setViewToDoList] = useState(false);
  const [viewAlarm, setViewAlarm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [getTime, setGetTime] = useState(new Date().toLocaleTimeString());
  const [userAlarmDate, setUserAlarmDate] = useState(new Date());
  const [userAlarmTime, setUserAlarmTime] = useState(new Date().toTimeString().split(" ")[0]);
  const [newAlarm, setNewAlarm] = useState([]);

  const [getDOM, setGetDOM] = useState("");
  const [getError, setGetError] = useState(false);
  const [getErrorMsg, setGetErrorMsg] = useState("");
  const newAlarmRef = useRef();
  const alarmsRef = useRef();
  const queryRef = useRef();

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
    const eventSource = new EventSource("http://127.0.0.1:5000/current_gesture_sse");
    eventSource.onmessage = function(event){
      setData(JSON.parse(event.data));
    };

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
  },[viewAlarm]);

  const getToDoList=()=>{ setViewToDoList(true); }
  const getAlarm=()=>{ setViewAlarm(true); }
  const closeToDoList=()=>{ setViewToDoList(false); }
  const closeAlarm=()=>{ setViewAlarm(false); }
  const resetError=()=>{ setGetError(false); setGetErrorMsg(""); }
  
  function handleInputChange(event){
    setNewTask(event.target.value);
    console.log("Task Set");
  }

  function addTask(){
    console.log("Adding Task");
    if(newTask.trim() !== ""){
      setTasks(getTasks => [...getTasks, newTask]);
      setNewTask("");
    }
  }
  
  function deleteTask(index){
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function getNewAlarm(){
    console.log("Setting Alarm...");
    var currentDate = new Date();
    if(userAlarmDate < currentDate){
      setGetError(true);
      setGetErrorMsg("Invalid Date");
      return;
    }
    if(userAlarmDate == currentDate && userAlarmTime < currentDate.toTimeString().split(" ")[0]){
      setGetError(true);
      setGetErrorMsg("Invalid Time");
      return;
    }
    const isNewAlarm = userAlarmDate + userAlarmTime;
    setNewAlarm(getAlarms => [...getAlarms, isNewAlarm]);
  }
 
  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-gray-200 min-h-screen flex justify-center items-center">
        <div data-testid="HA-icon" className="Icon">
          <button aria-label="User Profile" className="self-end mr-4 mt-4">
            <Icon path={mdiHomeAssistant} title="User Profile" size={3} />
          </button>
        </div>
        <div data-testid="video-feed" >
          <img id="videoElement" />
          <div className="text-black">
            Latest Gesture: {data.lastestGesture} <br />
            First Gesture: {data.firstGesture} <br />
            Latest Gesture: {data.secondGesture} <br />
            Device Choice: {data.deviceChoice} <br />
            Device Status: {data.deviceStatus} <br />
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
          <button onClick={()=>getAlarm()} className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
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
          <button onClick={()=>getToDoList()} className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
            <Image src={toDo} alt="TV" width={140} height={80} />
            To-do List
          </button>
        </div>
      </div>

      <Modal show={viewToDoList} onHide={closeToDoList}>
        <Modal.Header closeButton>
        <Modal.Title>To-Do List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input type="text" placeholder="Enter an task..." style={{border:"1px solid black", borderRadius: "4px"}} value={newTask} onChange={handleInputChange}/>
            <button onclick={addTask}>Add</button>
          </div>
          <ul>
            {tasks.map((task, index)=>{
              return(
              <li key={index}>
                <span>{task}</span>
                <button onClick={() => deleteTask(index)}> Delete</button>
              </li>)
            })}
          </ul>
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
            <button id="setAlarm" onClick={getNewAlarm} style={{padding:"10px", fontSize:"1rem", border:"1px solid darkgray", borderRadius:"5px"}}>Set Alarm</button>
          </div>
          <div class="alarms" id="alarms" ref={alarmsRef}>
            {newAlarm.map((item, index) => {
              return(
              <div ref={newAlarmRef}>
                <span>{item}</span>
                <button class="deleteAlarm" ref={queryRef}>Delete</button>
              </div>);
            })}
          </div>
        </div>
      </Modal>

      <Modal show={getError} centered>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{getErrorMsg}</Modal.Body>
      <Modal.Footer>
        <Button onClick={resetError}>Close</Button>
      </Modal.Footer>
    </Modal>
    </main>
  );
}
