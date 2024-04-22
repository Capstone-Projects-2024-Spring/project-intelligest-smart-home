from flask import Flask, render_template, Response, jsonify
from flask_cors import CORS
import cv2
import requests
import time
import  asyncio, os
#import mediapipe as mp
import time, math
import numpy as np
from methods import *
import json
#from tensorflow.keras.models import load_model
#this requires python_weather, which is not included in requirements.txt, 
#so you will need to install it with pip install python_weather
#queue to find the right gesture
from collections import deque
deviceChoice = None
deviceStatus = None

#https://colab.research.google.com/github/googlesamples/mediapipe/blob/main/examples/gesture_recognizer/python/gesture_recognizer.ipynb#scrollTo=TUfAcER1oUS6
#https://developers.google.com/mediapipe/solutions/vision/gesture_recognizer/python#video



def detectHand(hands, img, ASLModel):
    #comment this in if meidapipe doesnt work
    return "thumbs up", img
    gestureName=""
    if img is None: print("empty camera frame!!!!!")
       
    results = hands.process(img)
    if results.multi_hand_landmarks:
        
        minX,minY,maxX,maxY=createSquare(results,img)
        cv2.rectangle(img, (minX, minY), (maxX, maxY), (155, 155, 155), 2)
        gestureName = thumbClassifier(results)
    else:
        gestureName ='No gesture detected'
    global latest_gesture 
    latest_gesture = gestureName  # gestureName is the detected gesture
    return gestureName,img


def detect_motion(last_frame, current_frame, threshold=20):
    # Convert frames to grayscale
    if last_frame is None:
        last_frame = current_frame
    gray_last = cv2.cvtColor(last_frame, cv2.COLOR_BGR2GRAY)
    gray_current = cv2.cvtColor(current_frame, cv2.COLOR_BGR2GRAY)
    
    # Apply Gaussian Blur to reduce noise and detail
    gray_last = cv2.GaussianBlur(gray_last, (21, 21), 0)
    gray_current = cv2.GaussianBlur(gray_current, (21, 21), 0)
    
    # Compute the absolute difference between the current frame and reference frame
    frame_diff = cv2.absdiff(gray_last, gray_current)
    
    # Threshold the difference
    _, thresh = cv2.threshold(frame_diff, threshold, 255, cv2.THRESH_BINARY)
    
    # Find contours to see if there are significant changes
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Return True if contours are found
    print('checking for motion', len(contours))
    return len(contours) > 0, current_frame


def toggle_light():
    #action = "turn_on" if state else "turn_off"
    #url = f"http://localhost:8123/api/services/switch/toggle"
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


def get_all_devices(device_type):
    url = "http://localhost:8123/api/states"
    headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyOGU3ZDZmNTg5MjE0MzAxOWQwNTVjZWI5MThmYTcyMCIsImlhdCI6MTcxMjM0NDQ1MywiZXhwIjoyMDI3NzA0NDUzfQ.AXaP5ndD3QFtxhYxfXwT93x6qBh3GacCKmgiTHU6g7A", 
        "Content-Type": "application/json"
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        devices = response.json()
        filtered_devices = [device for device in devices if device_type in device['entity_id']]
        return filtered_devices
    else:
        return None


def black_image(img):
    black_screen = np.zeros_like(img)
    img = black_screen 
    print('no motion')
    ret, buffer = cv2.imencode('.jpg', img)
    img = buffer.tobytes()
    
    yield (b'--frame\r\n'
        b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')

def gen_frames(cap): 
    inMotion = False
    last_frame = None
    last_motion = None
    global deviceStatus
    global deviceChoice
    #loop to keep the iterations of the model going 
    while True:
        success, img = cap.read()
        if not success:
            print('failed to read frame')
            break
        
        inMotion,last_frame = detect_motion(last_frame, img)
        
        if not inMotion: 
            if last_motion and time.time()-last_motion > 2:
                print('no motion detected, black screen being shown.')
                img = np.zeros_like(img)
                ret, buffer = cv2.imencode('.jpg', img)
                img = buffer.tobytes()
                yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')
                continue
        else:
            last_motion = time.time()
        
        detected, frame = detectHand(hands,img, '')
        print(detected)
        if detected: firstQueue.append(detected)
        if len(firstQueue) ==30 and len(set(firstQueue))==1 and set(firstQueue).pop() != 'No gesture detected':
            print("first gesture detected")
            global firstGesture
            firstGesture = set(firstQueue).pop()
            firstQueue.clear()

            while True:
                print('made it into second loop')
                success, img = cap.read()
                if not success:
                    break
                else:
                    detected, frame = detectHand(hands,img, '')
                if detected: secondQueue.append(detected)
                
                if len(secondQueue)== 30 and len(set(secondQueue))==1 and set(secondQueue).pop() != 'No gesture detected':
                    global secondGesture
                    secondGesture = set(secondQueue).pop()
                    print('both gestures are',firstGesture,secondGesture)
                    if firstGesture == 'thumbs up' and secondGesture == 'thumbs up':
                        print('both thumbs up detected')
                        deviceChoice = 'light'
                        print('device choice is', deviceChoice)
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
                    deviceChoice, deviceStatus = 'N/A','N/A'
                    firstGesture,secondGesture = 'No gesture detected','No gesture detected'
                    secondQueue.clear()
                    break
                
                #writing the image in the second gesture loop, shouldn't be changed
                ret, buffer = cv2.imencode('.jpg', img)
                img = buffer.tobytes()
                yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')
        
        #writing the image in the first gesture loop, shouldn't be changed
        ret, buffer = cv2.imencode('.jpg', img)
        img = buffer.tobytes()
        yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')


app = Flask(__name__)
CORS(app)
#comment this out if mediapipe doesnt work
# mpHands = mp.solutions.hands
# hands = mpHands.Hands(static_image_mode=False,
#                       max_num_hands=1,
#                       min_detection_confidence=0.5,
#                       min_tracking_confidence=0.5)
#until here
#comment the next line in if mediapipe doesn't work
hands = ""

latest_gesture, firstGesture, secondGesture = 'No gesture detected yet','No gesture detected','No gesture detected'
firstQueue,secondQueue = deque(maxlen=30),deque(maxlen=30)

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(cv2.VideoCapture(0)),
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
                'latestGesture': latest_gesture,
                'firstGesture': firstGesture,
                'secondGesture': secondGesture,
                'deviceChoice': deviceChoice,
                'deviceStatus': deviceStatus
            }
            yield f"data:{json.dumps(data)}\n\n"
            time.sleep(1) 

    return Response(generate(), mimetype='text/event-stream')

if __name__ == "__main__":
    app.run(debug=True) 
