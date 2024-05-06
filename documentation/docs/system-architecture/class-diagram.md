---
sidebar_position: 2
---

# Class Diagrams

## Components

### Home Assistant

Home Assistant is the core of our system, acting as the server. It’s responsible for managing the state of all connected devices and automations. It communicates with the user interface to display device statuses. It also communicates with the IntelliGest system (Raspberry Pi, Camera, Flask Server) and MediaPipe model to predict User's Hand gesture. It also interacts with the devices themselves to control their states based on user input and automation rules.

### Dashboard

IntelliGest's Dashboard allows users to interact with the system. It sends user commands to the Home Assistant and displays the status of the devices. The dashboard is highly customizable and can display information from various components. We will be creating custom cards for the dashboard to display ASL images.

### IntelliGest Devices

It includes the actual Smart Home Appliances: Lights, TV, Thermostats, Alaram, and Locks. This devices can be controlled. They communicate with Home Assistant to receive commands and send status updates. The devices are controlled using the built-in components provided by Home Assistant, but can be written to include other devices.

### User Interface

User Interface is the place from where User can control and manage all of this Home Appliances. Here user will able to get Weather and Latest News just by clicking a button. Plus, User will also able to see hand gesture detected by the IntelliGest. Also, user can also access to Home Assistant Dashboard

On left of display, it has Video feed, Hand Gesture detected by User and Home Assistant Icon

While on right, it has 8 buttons for each of the features and Home appliances such as Light, Weather, News, Locks, Thermostat, TV, Reminders, and To-do list


### Python Scripts

These are scripts that we will write to load the Machine Learning model to capture and pre-process images using OpenCV, and make predictions. The scripts will be run on a Raspberry Pi 4

The OpenCV library will be used to capture images or video frames from a camera connected to the Raspberry Pi. These images will then be preprocessed (e.g., resized, normalized) to be compatible with the input requirements of the TensorFlow Lite model.

The MediaPipe model has been trained to recognize ASL gestures. The preprocessed images will be passed to this model to make predictions.



## Class and Component Diagram

```mermaid
---
title: IntelliGest Home
---

classDiagram
    HomeAssistant <|-- IntelliGestDevice : interacts with
    HomeAssistant <|-- PythonScripts : uses
    Camera --|> PythonScripts : Sends User's Hand Gesture image
    PythonScripts --|> UserInterface : Sends detected Hand Gesture and Status of Devices 
    class HomeAssistant {
        -devices[]
        -automations[]
        +add_device()
        +remove_device()
        +update_device_status()
        +execute_automation()
    }
    class UserInterface {
        -showWeatherPopup
        -showEntityChoices
        -showConfirmation
        -newsData
        -weatherData
        -handleClick
        -handleWeatherButtonClick
        -handleNewsButtonClick
        -closePopup
        -handleEntityChoice
        -handleLightButtonClick
        -handleLockButtonClick
        -getEntityIcon
        -fetchWeather
        -device_states[]
        -units
        -data
        -query
        -user_id
        -command
        -device_states[]
        +Home()
        +send_command()
        +display_device_state()
    }
    class Device {
        -device_id
        -device_type
        -status
        -capabilities[]
        +update_status()
        +execute_capability()
    }
    class PythonScripts {
        -model
        -interpreter
        -image
        -prediction
        +load_model()
        +capture_image()
        +preprocess_image()
        +make_prediction()
    }
    class Camera {
        -image
        +capture_image()
    }
```
