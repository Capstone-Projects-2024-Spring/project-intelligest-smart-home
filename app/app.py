from flask import Flask, render_template, Response, jsonify, request
from flask_cors import CORS
import requests
import time
import cv2
import  asyncio, os
import mediapipe as mp
import time, math
import numpy as np
from methods import *
from method.VideoFeedMethods import *
import json
import python_weather, asyncio, os
#from tensorflow.keras.models import load_model
#this requires python_weather, which is not included in requirements.txt, 
#so you will need to install it with pip install python_weather
#queue to find the right gesture
from collections import deque
deviceChoice = None
deviceStatus = None
entityChoice = None
entityChoices = []

gesture_to_entity = {
    'one finger up': 0,
    'two fingers up': 1,
    'three fingers up': 2,
    'four fingers up': 3,
}

#https://colab.research.google.com/github/googlesamples/mediapipe/blob/main/examples/gesture_recognizer/python/gesture_recognizer.ipynb#scrollTo=TUfAcER1oUS6
#https://developers.google.com/mediapipe/solutions/vision/gesture_recognizer/python#video



def toggle_light(device_id):
    #action = "turn_on" if state else "turn_off"
    url = f"http://localhost:8123/api/services/switch/toggle"
    headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyOGU3ZDZmNTg5MjE0MzAxOWQwNTVjZWI5MThmYTcyMCIsImlhdCI6MTcxMjM0NDQ1MywiZXhwIjoyMDI3NzA0NDUzfQ.AXaP5ndD3QFtxhYxfXwT93x6qBh3GacCKmgiTHU6g7A", 
        "Content-Type": "application/json",
    }
    # data = {"entity_id": "switch.living_room_light_1"}
    data = {"entity_id": device_id}
    print('toggling light',data)
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
        # Get the new state of the light
        #time.sleep(1)
        light_state = requests.get(f"http://localhost:8123/api/states/{data['entity_id']}", headers=headers).json()
        return light_state['state'] == 'on' 
    return None

def get_all_devices(device_type):
    url = "http://localhost:8123/api/states"
    headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyOGU3ZDZmNTg5MjE0MzAxOWQwNTVjZWI5MThmYTcyMCIsImlhdCI6MTcxMjM0NDQ1MywiZXhwIjoyMDI3NzA0NDUzfQ.AXaP5ndD3QFtxhYxfXwT93x6qBh3GacCKmgiTHU6g7A", 
        "Content-Type": "application/json"
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        devices = response.json()
        filtered_device_ids = [device['entity_id'] for device in devices if device_type.lower() in device['entity_id'].lower()]
        # Filtered Devices is an array of objects. Each object is a entity which includes entity_id, state, attributes, last changed, last updated, context
        print('filtered device ids',filtered_device_ids)
        return filtered_device_ids
    else:
        return None

async def getweather():
  # declare the client. the measuring unit used defaults to the metric system (celcius, km/h, etc.)
  async with python_weather.Client(unit=python_weather.IMPERIAL) as client:
    # fetch a weather forecast from a city
    weather = await client.get('Philadelphia') 
    # get the weather forecast for a few days
    #forecast = [weather.humidity,weather.precipitation, weather.pressure]
    forecast = {}
    for daily in weather.daily_forecasts:
        hourlyForecast = {}
        for hourly in daily.hourly_forecasts:
            
            hourlyForecast[str(hourly.time.strftime("%H:%M"))] = hourly.temperature
        forecast[str(daily.date)] = {'temperature':daily.temperature,
                                     'sunlight':daily.sunlight,
                                     'sunrise': daily.sunrise.strftime("%H:%M"),
                                     'sunset':daily.sunset.strftime("%H:%M"),
                                     'hourly_forecasts':hourlyForecast}
        
        forecast['current'] = {'humidity':weather.humidity,
                               'precipitation':weather.precipitation, 
                               'pressure':weather.pressure}
        
    return forecast

global_weather = asyncio.run(getweather())

# Determines the device choice based on the first gesture captured.
def determineDeviceChoice(firstGesture):
    #using a switch statement to match up the gestures with their respective actions
    match firstGesture:
        case "L shape":
            #lights
            return 'Light'
        case "thumbs up": # update with real gesture
            print('weather',global_weather)
            #weather = asyncio.run(getweather())
            return 'Weather'
            #print(weather)
        case "two fingers up": # update with real gesture
            return 'News'
            
        case "three fingers up": # update with real gesture
            return 'Thermostat'
            
        case _:
            print(".")

# Handles logic based on the device/service choice
# For devices like "Light" and "Lock", it waits for the second gesture to select the entity instance.
# For services like "Weather" and "News", it does not require a second gesture.
def processGesture(firstGesture, secondGesture=None):
    global deviceChoice
    deviceChoice = determineDeviceChoice(firstGesture)
    print('device choice is', deviceChoice)
    match deviceChoice:
        case "Light":
            if secondGesture is not None:
                print(f"Second gesture: {secondGesture}")
                gesture_index = gesture_to_entity.get(secondGesture, None)
                print('gesture index', gesture_index)
                if gesture_index is not None and processor.entityChoices and 0 <= gesture_index < len(processor.entityChoices):
                    processor.entityChoice = processor.entityChoices[gesture_index]
                    lightState = toggle_light(processor.entityChoice)
                    if lightState is True:
                        deviceStatus = 'on'
                    elif lightState is False:
                        deviceStatus = 'off'
                    print('Device Status is', deviceStatus)
                else:
                    print("Invalid gesture or no devices found.")
            else:
                print("Second gesture required for Light device")
            time.sleep(1)
        case "Weather" | "News":
            # These are services, so no need for a second gesture
            pass
        case "Thermostat":
            # Thermostat is a device, so we need the second gesture to select the entity instance
            # Add your logic here
            pass
        case _:
            print(".")
    return deviceChoice

class VideoProcessor:
    def __init__(self):
        self.cap = cv2.VideoCapture(0)
        self.hands = mp.solutions.hands.Hands(static_image_mode=False,
                                              max_num_hands=1,
                                              min_detection_confidence=0.5,
                                              min_tracking_confidence=0.5)
        self.latest_gesture = 'No gesture detected yet'
        self.firstGesture = 'No gesture detected'
        self.secondGesture = 'No gesture detected'
        self.deviceChoice = 'N/A'
        self.deviceStatus = 'N/A'
        self.firstQueue = deque(maxlen=30)
        self.secondQueue = deque(maxlen=30)
        self.entityChoice = None
        self.entityChoices = []
        
    def clear(self):
        self.latest_gesture = 'No gesture detected yet'
        self.firstGesture = 'No gesture detected'
        self.secondGesture = 'No gesture detected'
        self.deviceChoice = 'N/A'
        self.deviceStatus = 'N/A'
        self.firstQueue = deque(maxlen=30)
        self.secondQueue = deque(maxlen=30)
        self.entityChoice = None
        self.entityChoices = []
    
    def format_image(self,img):
        ret, buffer = cv2.imencode('.jpg', img)
        frame = buffer.tobytes()
        return frame
    
    def get_img(self):
        success, img = self.cap.read()
        if not success:
            print('Failed to read frame')
            return None
        detected, img = detectHand(self.hands,img,"")
        self.latest_gesture = detected
        
        return detected, img
    
    def gen_frames(self):
        last_frame = None
        last_motion = None
        inMotion = False
        # List of devices that require a second gesture
        devices_requiring_second_gesture = ['Light', 'Thermostat']
        while True:
            detected, img = self.get_img()

            #Motion detection part
            
            inMotion, last_frame = detect_motion(last_frame, img)
            
            if not inMotion: 
                if last_motion and time.time() - last_motion > 2:
                    print('No motion detected, showing black screen.')
                    img = np.zeros_like(img)
                else:
                    continue
            else:
                last_motion = time.time()

            #self.latest_gesture = detected

            if detected:
                self.firstQueue.append(detected)
            if len(self.firstQueue) == 30 and len(set(self.firstQueue)) == 1 and set(self.firstQueue).pop() != 'No gesture detected':
                self.firstGesture = set(self.firstQueue).pop()
                print('first gesture set to:', self.firstGesture)
                self.firstQueue.clear()

                if self.firstGesture == 'thumb flat':
                    self.clear()
                    continue

                self.deviceChoice = determineDeviceChoice(self.firstGesture)

                if self.deviceChoice in devices_requiring_second_gesture:
                    self.entityChoices = get_all_devices(self.deviceChoice)
                    print(f"Available {self.deviceChoice} options:", self.entityChoices)

                    second_gesture_captured = False
                    while not second_gesture_captured:
                        detected, img = self.get_img()
                        self.secondQueue.append(detected)

                        if len(self.secondQueue) == 30 and len(set(self.secondQueue)) == 1 and set(self.secondQueue).pop() != 'No gesture detected':
                            self.secondGesture = set(self.secondQueue).pop()
                            print('second gesture set to:', self.secondGesture)
                            processGesture(self.firstGesture, self.secondGesture)
                            second_gesture_captured = True
                            self.clear()
                            if self.secondGesture=='thumb flat':
                                self.clear()
                                continue
                        frame = self.format_image(img)
                        yield (b'--frame\r\n'
                               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
                else:
                        processGesture(self.firstGesture)
                        self.clear()

            frame = self.format_image(img)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

app = Flask(__name__)
CORS(app)
#comment this out if mediapipe doesnt work
mpHands = mp.solutions.hands
hands = mpHands.Hands(static_image_mode=False,
                    max_num_hands=1,
                    min_detection_confidence=0.5,
                    min_tracking_confidence=0.5)

#until here
#comment the next line in if mediapipe doesn't work
#hands = ""
#weather = asyncio.run(getweather())
latest_gesture, firstGesture, secondGesture = 'No gesture detected yet','No gesture detected','No gesture detected'
firstQueue,secondQueue = deque(maxlen=30),deque(maxlen=30)
processor=VideoProcessor()
@app.route('/video_feed')
def video_feed():
    return Response(processor.gen_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
    
@app.route('/')
def index():
    
    return render_template('index.html')

@app.route('/current_gesture')
def current_gesture():
    
    return jsonify(gesture=latest_gesture, firstGesture = firstGesture, secondGesture = secondGesture, deviceChoice=deviceChoice, deviceStatus=deviceStatus,global_weather=global_weather, entityChoices=entityChoices, entityChoice=entityChoice)

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
    elif device_choice == 'Thermostat':
        # Perform action for thermostat
        pass

    return jsonify(success=True)

if __name__ == "__main__":
    app.run(debug=True) 
