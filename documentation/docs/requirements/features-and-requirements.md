---
sidebar_position: 4
---

# Features and Requirements

## Functional Requirements

- When the User wants to perform any task, they will perform ASL or a Gesture accordingly up to a certain distance from the IntelliGest Camera.
- IntelliGest will process the visual request using MediaPipe model 
  - Home Assistant will handle the action through the smart home.
- For Tasks related to Home devices and appliances:
  - When IntelliGest catches a Gesture it will show a certain color on light strips to notify its retrieval.
  - When processing that Gesture, will show a certain color.
  - When performing that Gesture, will show a certain color.
  - When completed that Task, will show a certain color.
- For Tasks related to accessing information from the Internet. 
  - When IntelliGest catches a Gesture it will show a certain color on light strips.
  - When processing that Gesture, will show a certain color.
  - This Information must be requestable and able to be displayed by the device on screen
      - Weather: Temperature/precipitation over next 24 hours.
      - Top News: Major events and top stores of the past week.
      - To-Do List: Entirely of the user's creation.
      - Reminders: Entirely of the user's creation.
- If users want to change or add Gesture + Task, in Account Settings they can change or add that Gesture + Task using Google’s Teachable Machine.


## Nonfunctional Requirements
- Users will set up the IntelliGest Smart Home by connecting the Device to the power supply and connecting it to the internet directly using ethernet. They can then view the dashboard at their [Home Assistant Dashboard](http://homeassistant.local:8123/).
- Users will set up Home Assistant with their Smart Home devices and appliances.
  - TV, AC, Thermostats, Light-bulbs, Security Cameras, Locks, Fans, Alarms, etc.
 - IntelliGest can also be used by individuals who can speak after adjusting some system   
    settings.
- Users can speak out the task related to their Home Devices/Appliances.
  - When IntelliGest listens, it will show a certain color on light strips.
  - When processing that, it will show a certain color.
  - When performing that, will speak out its action.
- IntelliGest is a scalable device and can handle as many home appliances as a user may need.
- IntelliGest can accurately recognize gestures using AI Vision and Google's Teachable Machine.
- Users' personal information and data will be securely stored on the device and will never travel outside the device unless requested or needed for IoT devices.
- IntelliGest will use intuitive gestures to control a smart home.
- IntelliGest will utilize Home Assistant's dashboard.
  - Features an intuitive UI.
  - Customizability.
  - Seamless control over your devices.
- IntelliGest will notify users promptly, i.e., less than one second.


