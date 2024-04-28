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
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [viewUpdateTask, setViewUpdateTask] = useState(false);
  const [getTaskIndex, setGetTaskIndex] = useState();
  const [updateTask, setUpdateTask] = useState("");
  const [checkTask, setCheckTask] = useState(false);

  const [viewAlarm, setViewAlarm] = useState(false);
  const [viewReminder, setViewReminder] = useState(false);
  const [getTime, setGetTime] = useState(new Date().toLocaleTimeString());
  const [userAlarmDate, setUserAlarmDate] = useState(new Date());
  const [userAlarmTime, setUserAlarmTime] = useState(new Date().toTimeString().split(" ")[0]);
  const [newAlarm, setNewAlarm] = useState([]);
  const [alarmNotification, setAlarmNotification] = useState(false);

  const [newReminder, setNewReminder] = useState("");
  const [userReminders, setUserReminders] = useState([]);
  const [reminderDate, setReminderDate] = useState(new Date());
  const [reminderTime, setReminderTime] = useState(new Date().toTimeString().split(" ")[0]);

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
  
  function handleToDoListInputChange(event){ setNewTask(event.target.value); }
  function handleReminderInputChange(event){ setNewReminder(event.target.value); }

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
    console.log("Current Date: " + currentDate);
    console.log("Alarm Date: " + userAlarmDate);
    console.log("Alarm Time: " + userAlarmTime);
    setNewAlarm(getAlarms => [...getAlarms, isNewAlarm]);
    var alarmTimer = userAlarmDate.getTime() - currentDate.getTime();
    var timeoutID = setTimeout(()=>{
      setAlarmNotification(true);
      var getCurrentAlarms = [...newAlarm];
      var getIndex = getCurrentAlarms.indexOf(isNewAlarm);
      deleteAlarmEvent(getIndex);
    },alarmTimer);
  }

  function deleteAlarmEvent(index){
    const updatedEvents = tasks.filter((_, i) => i !== index);
    setNewAlarm(updatedEvents);
  }
 
  return(
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
          <button onClick={() => getReminder()} className="hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
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
          <ul ref={alarmsRef} style={{marginTop:"10px", textAlign:"left"}}>
            {newAlarm.map((item, index) => {
              return(
              <li key={index} ref={newAlarmRef} style={{backgroundColor:"lightgray",border:"1px solid darkgray", borderRadius:"5px", padding:"10px", display:"flex", alignItems:"center", animation:"ease-in 0.5s"}}>
                <span>{item}</span>
                <button class="deleteAlarm" ref={queryRef} onClick={() => deleteAlarmEvent(index)} style={{padding:"10px", fontSize:"1rem", border:"1px solid darkgray", borderRadius:"5px"}}>Delete</button>
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
          <div>
            <textarea type="text" placeholder="Enter an reminder..." style={{border:"1px solid black", borderRadius: "5px"}} value={newReminder} onChange={(e) =>{setNewReminder(e.target.value)}}/>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"10px"}}>
              <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <label for="alarmDate" style={{paddingRight:"10px"}}>Select Date: </label>
                <input type="date" id="alarmDate" min="" style={{padding:"10px", fontSize:"1rem", border:"1px solid darkgray", borderRadius:"5px"}} onChange={(e)=>{setUserAlarmDate(new Date(e.target.value))}}/>
              </div>
              <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <label for="alarmTime" style={{paddingRight:"10px"}}>Select Time: </label>
                <input type="time" id="alarmTime" value={userAlarmTime} style={{padding:"10px", fontSize:"1rem", border:"1px solid darkgray", borderRadius:"5px"}} onChange={(e)=>{setUserAlarmTime((e.target.value))}}/>
              </div>
            </div>
            <button id="setReminder" onClick={getNewToDoListTask} style={{marginLeft:"10px", fontSize:"1rem", border:"1px solid darkgray", borderRadius:"5px", padding:"2px"}}>Set</button>
          </div>
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
    </main>
  );
}
