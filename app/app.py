from flask import Flask, render_template, Response, jsonify
import cv2
import time
import cv2
import  asyncio, os
import mediapipe as mp
import time, math
import numpy as np
from methods import *
#from tensorflow.keras.models import load_model
#this requires python_weather, which is not included in requirements.txt, 
#so you will need to install it with pip install python_weather
#queue to find the right gesture
from collections import deque
import requests


def thumbClassifier(results):
    res=results.multi_hand_landmarks[0].landmark
    GestureObject = hand(results.multi_hand_landmarks[0])
    
    # print('Thumb angle: ', thumb.angle)
    # print('Ring Finger angle: ', ringFinger.angle)
    # print('Middle Finger angle: ', middleFinger.angle)
    # print('Index Finger angle: ', indexFinger.angle)
    # print('Pinky Finger angle: ', pinkyFinger.angle)
    # print(wrist.x, wrist.y, wrist.z)

    return GestureObject.gesture


def detectHand(hands, img, ASLModel):
    #comment this in if meidapipe doesnt work
    #return "thumbs up", img
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




def detect_motion(last_frame, current_frame, threshold=50):
    # Convert frames to grayscale
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
    return len(contours) > 0

def detection(cap,queue):
    while True:
        success, img = cap.read()
        if not success:
            return False, None
        detected, frame = detectHand(hands,img, '')
        print(detected)
        if detected: queue.append(detected)
        if len(queue) ==30 and len(set(queue))==1:
            global firstGesture
            firstGesture = set(queue).pop()
            queue.clear()
            return firstGesture
        
        

def gen_frames(cap): 
    inMotion = False
    last_frame = None
    while True:
        
        success, img = cap.read()
        if not success:
            break
        else:
            
            detected, frame = detectHand(hands,img, '')
            print(detected)
            if detected: firstQueue.append(detected)
            if len(firstQueue) ==30 and len(set(firstQueue))==1:
                print("first gesture detected")
                global firstGesture
                firstGesture = set(firstQueue).pop()
                firstQueue.clear()

                if firstGesture == "Turn Light On":  
                    toggle_light("switch.living_room_light_1", True)  
                elif firstGesture == "Turn Light Off":  
                    toggle_light("switch.living_room_light_1", False)

                while True:
                    print('made it into second loop')
                    success, img = cap.read()
                    if not success:
                        break
                    else:
                        detected, frame = detectHand(hands,img, '')
                    if detected: secondQueue.append(detected)
                    
                    if len(secondQueue)== 30 and len(set(secondQueue))==1:
                        global secondGesture
                        secondGesture = set(secondQueue).pop()
                        print('both gestures are',firstGesture,secondGesture)
                        time.sleep(2)
                        firstGesture,secondGesture = 'No gesture detected','No gesture detected'
                        secondQueue.clear()
                        
                        break
                    ret, buffer = cv2.imencode('.jpg', img)
                    img = buffer.tobytes()
                    yield (b'--frame\r\n'
                        b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')
            #cv2.putText(img,'put text on the frame', (10,130), cv2.FONT_HERSHEY_PLAIN, 3, (100,50,100), 3)
            ret, buffer = cv2.imencode('.jpg', img)
            img = buffer.tobytes()
            
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')

def toggle_light(light_id, state):
    url = f"http://your-homeassistant-domain:8123/api/services/light/{'turn_on' if state else 'turn_off'}"
    headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyOGU3ZDZmNTg5MjE0MzAxOWQwNTVjZWI5MThmYTcyMCIsImlhdCI6MTcxMjM0NDQ1MywiZXhwIjoyMDI3NzA0NDUzfQ.AXaP5ndD3QFtxhYxfXwT93x6qBh3GacCKmgiTHU6g7A", 
        "Content-Type": "application/json",
    }
    data = {"entity_id": "switch.living_room_light_1"}
    
    response = requests.post(url, json=data, headers=headers)
    return response.status_code == 200


app = Flask(__name__)
#comment this out if mediapipe doesnt work
mpHands = mp.solutions.hands
hands = mpHands.Hands(static_image_mode=False,
                    max_num_hands=1,
                    min_detection_confidence=0.5,
                    min_tracking_confidence=0.5)
#until here
#comment the next line in if mediapipe doesn't work
#hands = ""
latest_gesture = 'No gesture detected'
firstGesture, secondGesture = 'No gesture detected yet','No gesture detected'
firstQueue,secondQueue = deque(maxlen=30),deque(maxlen=30)


@app.route('/video_feed')
def video_feed():
    # Assuming 'cap' is your cv2.VideoCapture object
    return Response(gen_frames(cv2.VideoCapture(0)),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
    
@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('index.html')

@app.route('/current_gesture')
def current_gesture():
    return jsonify(gesture=latest_gesture, firstGesture = firstGesture, secondGesture = secondGesture)

if __name__ == "__main__":
    
    
    app.run(debug=True) 