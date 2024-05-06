---
sidebar_position: 4
---

# Features and Requirements

## Functional Requirements

- When the User wants to perform any task, they will perform ASL or a Gesture accordingly up to a certain distance from the IntelliGest Camera.
- IntelliGest will process the visual request using MediaPipe model 
  - Home Assistant will handle the action through the smart home devices
- For Tasks related to Home devices and appliances:
  - When IntelliGest catches a Gesture, it will show that Gesture and Device involved on User Interface
  - When processing that Gesture, it will show processing
  - When that Task is completed, it will somehow convey Task is done.

- For Tasks related to accessing information from the Internet. 
  - When IntelliGest catches a Gesture, it will show that Gesture and Devive involved on User Interface
  - When processing that Gesture, it will show processing
  - This Information must be requestable and able to be displayed by the device on screen
      - Weather: current, hourly and Temperature for next two days. Plus, Precipitation and Humidity,
      - Top News: Major events and Top stories of this week.


## Nonfunctional Requirements
- Users will set up the IntelliGest Smart Home by connecting the Device to the power supply and connecting it to the internet directly using ethernet. They can then view the dashboard at their [Home Assistant Dashboard](http://homeassistant.local:8123/).
- Users will set up Home Assistant with their Smart Home devices and appliances.
  - LED Lights, Locks, TV, AC, Thermostats, Security Cameras, Fans, Alarms, etc.
- IntelliGest is a scalable device and can handle as many home appliances as a user may need.
- IntelliGest can accurately recognize gestures using MediaPipe model
- Users' personal information and data will be securely stored on the device and will never travel outside the device unless requested or needed for IoT devices.
- IntelliGest will use intuitive gestures to control a smart home.
- IntelliGest will utilize Home Assistant's dashboard.
  - Features an intuitive UI.
  - Seamless control over your devices.


