---
sidebar_position: 1
description: Descriptions of classes, fields, and functions
---

# Design Document - API

## Home Assistant

### Class Purpose

The core of our system, acting as the server. It’s responsible for managing the state of all connected devices and automations. It communicates with the user interface to display device statuses. It also communicates with the IntelliGest system and MediaPipe model to predict for User hand gesture. It also interacts with the devices themselves to control their states based on user input and automation rules.

#### Data Fields / Attributes:

##### `-devices[]`

It will contain Information about all Home devices: TV, Alarm, Weather, Thermostat, Locks, Reminders, To-do list

##### `-automations[]`

Contains information about automations

#### Methods

##### `+add_device()`

Function capable of adding a new device to Home Assistant

##### `+remove_device()`

Function can remove a device

##### `+update_device_status()`

Function can update device to current status

##### `+execute_automation()`

Function executes automation for that device


## User Interface

### Class Purpose

The user interface is the Home Assistant dashboard that allows users to interact with the system. It sends user commands to the Home Assistant and displays the status of the devices. The dashboard is highly customizable and can display information from various components. We will be creating custom cards for the dashboard to display ASL images.

#### Data Fields / Attributes:

##### `-data` 
Stores various data received from the server.

##### `-showWeatherPopup`
Boolean state to control the visibility of the weather popup.

##### `-query`
Stores the query parameters for fetching weather data.

##### `-units`
Stores the units (metric or imperial) for weather data.

##### `-showEntityChoices`
Boolean state to control the visibility of entity choices popup.

##### `-showConfirmation`
Boolean state to control the visibility of the confirmation popup.

##### `-newsData` 
Stores the latest news data.

##### `-weatherData` 
Stores the fetched weather data.

##### `-handleClick`
Console logs out name of the Clicked button

##### `-handleWeatherButtonClick` 
Upon clicking Weather button, triggers the display of a weather popup

##### `-handleNewsButtonClick` 
Upon clicking News button, fetches and displays news data

##### `-closePopup`
Closes Weather Popup

##### `-handleEntityChoice`
Handles user entity choices by it sending a POST request to a local server endpoint (http://127.0.0.1:5000/perform_action) with JSON data containing information about device choice and an entity choice 

##### `-handleLightButtonClick` 
Handles Light button clicks, by sending POST request to a local server endpoint (http://127.0.0.1:5000/get_entities) with JSON data specifying a device choice of "Light".

##### `-handleLockButtonClick` 
Handles clicking Lock Button. It sends a POST request to a local server endpoint (http://127.0.0.1:5000/get_entities) with JSON data specifying a device choice of "Lock"

##### `-getEntityIcon` 
A function to get the appropriate icon for a given entity type.

##### `-fetchWeather`
A function to fetch weather data.

##### `-device_states[]`

On/Off/Other state of the device


#### Methods

##### `+Home()`
It defines and initializes several state variables using the useState hook, including data related to weather, entity choices, and news, as well as flags for controlling the display of various popups and confirmation messages.

It uses the useEffect hook to fetch weather data from a local server when the component mounts, set up an EventSource to receive real-time gesture data updates, and perform other side effects like setting up a video feed.

It sets up additional useEffect hooks to handle changes in the received gesture data, device choices, entity choices, and device status.

It defines several helper functions to handle button clicks related to weather, news, lights, locks, and entity choices.

It defines a function to format the background color based on weather conditions.

It renders a main layout with buttons for various device choices, displays relevant data and gesture information, and conditionally renders popups for weather, news, entity choices, and confirmation messages based on state variables.

It exports the Home function as the default export of the module.

##### `+send_command()`

Function sends commands from User Interface

##### `+display_device_state()`

Function displays different states of Home devices on User Interface


## Device

### Class Purpose

These are the actual smart home devices (lights, thermostats, cameras, etc.) that are being controlled. They communicate with Home Assistant to receive commands and send status updates. The devices are controlled using the built-in components provided by Home Assistant, but can be written to include other devices.

#### Data Fields / Attributes

##### `-device_id`

Device ID that is a discriminator to determine a device.

##### `-device_type`

Type of device

##### `-status`

Status of device

##### `-capabilities[]`

Capabilities of the device, as specified by requirements or Apple's HAP when necessary.

#### Methods

##### `+update_status()`

Function updates status of device

##### `+execute_capability()`

Function executes capabilities of device


## PythonScripts

### Class Purpose

These are scripts that we will write to load the machine learning model pre-process images using OpenCV, and make predictions. The scripts will be run on a Raspberry Pi 4.

The OpenCV library will be used to capture images or video frames from a camera connected to the Raspberry Pi. These images will then be preprocessed (e.g., resized, normalized) to be compatible with the input requirements of the TensorFlow Lite model.

The TensorFlow Lite model, which has been trained to recognize ASL gestures. The preprocessed images will be passed to this model to make predictions.

#### Data Fields / Attributes

##### `-model`

This is the machine learning model

##### `-interpreter`

This is the TensorFlow Lite interpreter used to run the model.

##### `-image`

This is the image captured by the Pi Camera.

##### `-prediction`

This is the prediction made by the model based on the image.

#### Methods

##### `+load_model()`

Function loads Machine Learning model of PythonScripts

##### `+capture_image()`

Function captures Image of User's hand gestures

##### `+preprocess_image()`

Function Pre-Processes Image of User's hand gestures

##### `+make_prediction()`

Function makes prediction to identify correct hand gesture


## JavaScriptCustomCards

### Class Purpose

These are custom cards that we will create for the Home Assistant dashboard to display ASL images. The cards will be written in JavaScript and Home Assistant frontend development framework and will be used to enhance the user interface for our targeted demographic and provide necessary visual feedback when required.

#### Data Fields / Attributes

##### `-card_id`

Javascript Custom Card ID

##### `-image`

Image of Javascript Custom Card

##### `-display_state`

This is the current display state of the custom card.

#### Methods

##### `+create_card()`

This function creates a new custom card.

##### `+display_image()`

This function displays an `image` on the custom card.

##### `+update_display_state()`

This function updates the `display_state` of the custom card.


## Camera

### Class Purpose

Camera catches instances of User hand gestures. Also, it sends those images to Class PythonScripts

#### Data Fields / Attributes

##### `-image`

Image used in processing

#### Methods

##### `+capture_image()`

This function captures an image or video frame.


## Home Assistant RESTful API

### Class Purpose

RESTful API is responsible to establish communication between Home Assistant and IntelliGest, Home appliances. It will also get the state (On/off, etc) of Home appliances and will have power to change it as well.

##### /api/ 
Returns a message if the API is up and running.
```
{
  "message": "API running."
}
```
##### /api/services
Returns an array of service objects. Each object contains the domain and which services it contains.
```
[
    {
      "domain": "browser",
      "services": [
        "browse_url"
      ]
    },
    {
      "domain": "keyboard",
      "services": [
        "volume_up",
        "volume_down"
      ]
    }
]
```
##### /api/states
Returns an array of state objects. Each state has the following attributes: entity_id, state, last_changed and attributes
```
[
    {
        "attributes": {},
        "entity_id": "sun.sun",
        "last_changed": "2016-05-30T21:43:32.418320+00:00",
        "state": "below_horizon"
    },
    {
        "attributes": {},
        "entity_id": "process.Dropbox",
        "last_changed": "22016-05-30T21:43:32.418320+00:00",
        "state": "on"
    }
]
```

##### /api/calendars
Returns the list of calendar entities.

```
[
  {
    "entity_id": "calendar.holidays",
    "name": "National Holidays",
  },
  {
    "entity_id": "calendar.personal",
    "name": "Personal Calendar",
  }
]
```

## API Routes

##### Returns Video Feed from Flask Server

```python
@app.route('/video_feed')
def video_feed():
    return Response(processor.gen_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
```

##### Returns User's Gesture from Flask Server

```python
@app.route('/current_gesture')
def current_gesture():
    
    return jsonify(gesture=latest_gesture, firstGesture = firstGesture, secondGesture = secondGesture, deviceChoice=deviceChoice, deviceStatus=deviceStatus,global_weather=global_weather, entityChoices=entityChoices, entityChoice=entityChoice)
```

##### Returns User's ____ from Flask Server

```python
@app.route('/current_gesture_sse')
def current_gesture_sse():
    def generate():
        while True:
            
            data = {
                'latestGesture': processor.latest_gesture,
                'firstGesture': processor.firstGesture,
                'secondGesture': processor.secondGesture,
                'deviceChoice': processor.deviceChoice,
                'deviceStatus': processor.deviceStatus,
                'entityChoices': processor.entityChoices,
                'entityChoice': processor.deviceChoice,
                'weatherData': global_weather,
                'entityChoice': processor.entityChoice,
                'entityChoices': processor.entityChoices
            }
            yield f"data:{json.dumps(data)}\n\n"
            #time.sleep(1) 

    return Response(generate(), mimetype='text/event-stream')
```

##### Returns User's Performed action

```python
@app.route('/perform_action', methods=['POST'])
def perform_action():
    data = request.get_json()
    device_choice = data['deviceChoice']
    entity_choice = data['entityChoice']

    # Perform the desired action based on the device and entity choice
    if device_choice == 'Light':
        # Toggle the light
        lightState = toggle_light(entity_choice)
        if lightState is True:
            deviceStatus = 'on'
        elif lightState is False:
            deviceStatus = 'off'
        print('Device Status is', deviceStatus)
        processor.clear()
    elif device_choice == 'Lock':
        lockState = toggle_lock(entity_choice)
        if lockState is True:
            deviceStatus = 'locked'
        elif lockState is False:
            deviceStatus = 'unlocked'
        print('Device Status is', deviceStatus)
        processor.clear()
    elif device_choice == 'Thermostat':
        # Perform action for thermostat
        pass

    return jsonify(success=True)
```

##### Returns Device Entities from Flask Server

```python
@app.route('/get_entities', methods=['POST'])
def get_entities():
    data = request.get_json()
    device_choice = data['deviceChoice']

    if device_choice == 'Light':
        entity_choices = get_all_devices(device_choice)
        return jsonify(entityChoices=entity_choices)
    elif device_choice == 'Lock':
        entity_choices = get_all_devices(device_choice)
        return jsonify(entityChoices=entity_choices)
    else:
        return jsonify(entityChoices=[])
```

##### Returns News from Flask Server

```python
@app.route('/get_news')
def get_news():
    try:
        news_data = get_recent_news()
        if news_data:
            return jsonify(news_data)
        else:
            return jsonify({'error': 'No news data available'}), 404
    except Exception as e:
        return jsonify({'error': 'Failed to fetch news'}), 500
```
