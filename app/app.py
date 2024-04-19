from flask import Flask, render_template, Response, jsonify
from flask_cors import CORS
import cv2
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

#https://colab.research.google.com/github/googlesamples/mediapipe/blob/main/examples/gesture_recognizer/python/gesture_recognizer.ipynb#scrollTo=TUfAcER1oUS6
#https://developers.google.com/mediapipe/solutions/vision/gesture_recognizer/python#video





def toggle_light():
    #action = "turn_on" if state else "turn_off"
    url = f"http://localhost:8123/api/services/switch/toggle"
    headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyOGU3ZDZmNTg5MjE0MzAxOWQwNTVjZWI5MThmYTcyMCIsImlhdCI6MTcxMjM0NDQ1MywiZXhwIjoyMDI3NzA0NDUzfQ.AXaP5ndD3QFtxhYxfXwT93x6qBh3GacCKmgiTHU6g7A", 
        "Content-Type": "application/json",
    }
    data = {"entity_id": "switch.living_room_light_1"}
    print('toggling light',data)
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
        # Get the new state of the light
        time.sleep(1)
        light_state = requests.get(f"http://localhost:8123/api/states/{data['entity_id']}", headers=headers).json()
        return light_state['state'] == 'on' 
    return None

async def getweather():
  # declare the client. the measuring unit used defaults to the metric system (celcius, km/h, etc.)
  async with python_weather.Client(unit=python_weather.IMPERIAL) as client:
    # fetch a weather forecast from a city
    weather = await client.get('Philadelphia')

    
    
    # get the weather forecast for a few days
    forecast = []
    for daily in weather.daily_forecasts:
      forecast.append({daily.date: [daily.temperature,daily.hourly_forecasts,
                                    daily.sunlight,daily.sunrise,daily.sunset]})
    
    forecast.append({'current':[weather.humidity,weather.precipitation, weather.pressure]})
    return forecast

def processGesture(firstGesture, secondGesture):
    global deviceChoice
    #using a switch statement to match up the gestures with their respective actions
    match firstGesture, secondGesture:
        case "one finger up", "one finger up":
            #lights
            
            deviceChoice = 'Light'
            
            try:   
                lightState = toggle_light()
                if lightState is True:
                    deviceStatus = 'on'
                elif lightState is False:
                    deviceStatus = 'off'
                print('Device Status is', deviceStatus)
            except:
                print('toggle light didnt work')
            time.sleep(3)
        case "one finger up", 'thumbs up':
            weather = asyncio.run(getweather())
            deviceChoice = 'Weather'
            print(weather)
        case "one finger up", 'thumbs down':
            weather = asyncio.run(getweather())
            deviceChoice = 'News'
            
        case "two fingers up", 'thumbs down':
            weather = asyncio.run(getweather())
            deviceChoice = 'Thermostat'
            
        case _:
            print(".")
    return

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
        
    def clear(self):
        self.latest_gesture = 'No gesture detected yet'
        self.firstGesture = 'No gesture detected'
        self.secondGesture = 'No gesture detected'
        self.deviceChoice = 'N/A'
        self.deviceStatus = 'N/A'
        self.firstQueue = deque(maxlen=30)
        self.secondQueue = deque(maxlen=30)
    
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
                self.firstQueue.clear()

                while True:
                    detected, img = self.get_img()
                    self.secondQueue.append(detected)

                    if len(self.secondQueue) == 30 and len(set(self.secondQueue)) == 1 and set(self.secondQueue).pop() != 'No gesture detected':
                        self.secondGesture = set(self.secondQueue).pop()
                        print('first and second gesture:',self.firstGesture,self.secondGesture)
                        processGesture(self.firstGesture,self.secondGesture)
                        time.sleep(1)
                        self.clear()
                        break
                    frame = self.format_image(img)
                    yield (b'--frame\r\n'
                        b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            frame = self.format_image(img)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# def gen_frames(cap): 
#     inMotion = False
#     last_frame = None
#     last_motion = None
#     global deviceStatus
#     global deviceChoice
#     #loop to keep the iterations of the model going 
#     while True:
#         success, img = cap.read()
#         if not success:
#             print('failed to read frame')
#             break
#         inMotion,last_frame = detect_motion(last_frame, img)

#         if not inMotion: 
#             if last_motion and time.time()-last_motion > 2:
#                 print('no motion detected, black screen being shown.')
#                 img = np.zeros_like(img)
#                 ret, buffer = cv2.imencode('.jpg', img)
#                 img = buffer.tobytes()
#                 yield (b'--frame\r\n'
#                     b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')
#                 continue
#         else:
#             last_motion = time.time()
        
#         detected, frame = detectHand(hands,img, '')
#         global latest_gesture
#         latest_gesture = detected
#         print('latest gesture is',latest_gesture)
        
#         if detected: firstQueue.append(detected)
#         if len(firstQueue) ==30 and len(set(firstQueue))==1 and set(firstQueue).pop() != 'No gesture detected':
#             print("first gesture detected")
#             global firstGesture
#             firstGesture = set(firstQueue).pop()
#             firstQueue.clear()

#             while True:
                
#                 success, img = cap.read()
#                 if not success:
#                     break
#                 else:
#                     detected, frame = detectHand(hands,img, '')
#                 if detected: secondQueue.append(detected)
                
#                 if len(secondQueue)== 30 and len(set(secondQueue))==1 and set(secondQueue).pop() != 'No gesture detected':
#                     #restart the loop if the thumb flat gesture is detected
#                     global secondGesture
#                     if secondGesture=='thumb flat':
#                         continue
#                     secondGesture = set(secondQueue).pop()
#                     print('both gestures are',firstGesture,secondGesture)
#                     processGesture(firstGesture,secondGesture)
                    
#                     deviceChoice, deviceStatus = 'N/A','N/A'
#                     firstGesture,secondGesture = 'No gesture detected','No gesture detected'
#                     secondQueue.clear()
#                     break
                
#                 #writing the image in the second gesture loop, shouldn't be changed
#                 ret, buffer = cv2.imencode('.jpg', img)
#                 img = buffer.tobytes()
#                 yield (b'--frame\r\n'
#                     b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')
        
#         #writing the image in the first gesture loop, shouldn't be changed
#         ret, buffer = cv2.imencode('.jpg', img)
#         img = buffer.tobytes()
#         yield (b'--frame\r\n'
#                 b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')

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
    
    return jsonify(gesture=latest_gesture, firstGesture = firstGesture, secondGesture = secondGesture, deviceChoice=deviceChoice, deviceStatus=deviceStatus)

@app.route('/current_gesture_sse')
def current_gesture_sse():
    def generate():
        while True:
            data = {
                'latestGesture': processor.latest_gesture,
                'firstGesture': processor.firstGesture,
                'secondGesture': processor.secondGesture,
                'deviceChoice': processor.deviceChoice,
                'deviceStatus': processor.deviceStatus
            }
            yield f"data:{json.dumps(data)}\n\n"
            time.sleep(1) 

    return Response(generate(), mimetype='text/event-stream')

if __name__ == "__main__":
    app.run(debug=True) 
