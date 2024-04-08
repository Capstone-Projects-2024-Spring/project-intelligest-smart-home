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
    
    gestureName=""
    
    #cv2.putText(img, "looking for ASL gestures", (int(img.shape[1]/2),20), cv2.FONT_HERSHEY_PLAIN, 1, (255, 255, 255), 2)
    if img is None:
        print("empty camera frame!!!!!")
        
    results = hands.process(img)
    if results.multi_hand_landmarks:
        #get the dimensions for the cropped image
        minX,minY,maxX,maxY=createSquare(results,img)
        # Draw the square bounding box
        cv2.rectangle(img, (minX, minY), (maxX, maxY), (155, 155, 155), 2)
        if minX < maxX and minY < maxY:
            handRegion = img[minY:maxY, minX:maxX]
            #Preprocess the hand region for the ASL model
            preprocessedHand = preprocessHandRegion(handRegion) 
            #Predict the ASL gesture given by user
            #asl_prediction = ASLModel.predict(preprocessedHand) 
            asl_prediction = 1
            #turning the gesture from clas number to real name and adding to video feed
            #gestureName = "Detected Gesture: " + IdentifyGesture(np.argmax(asl_prediction)) 
            gestureName = thumbClassifier(results)
    
    
    #adding all the text before displaying the image
    #cv2.putText(img, gestureName, (10, 130), cv2.FONT_HERSHEY_PLAIN, 2, (colors, colors, colors), 2)
    #cv2.putText(img,str(int(fps)), (10,70), cv2.FONT_HERSHEY_PLAIN, 3, (colors,50,colors), 3)
    #cv2.imshow("Image", img)
    
    global latest_gesture  # Declare it as global inside the function if you're updating it
    # Update this line accordingly in your detectHand function
    latest_gesture = gestureName  # gestureName is the detected gesture
    return gestureName,img

app = Flask(__name__)
mpHands = mp.solutions.hands
hands = mpHands.Hands(static_image_mode=False,
                    max_num_hands=1,
                    min_detection_confidence=0.5,
                    min_tracking_confidence=0.5)
latest_gesture = 'No gesture detected yet'
firstGesture, secondGesture = 'No gesture detected yet','No gesture detected yet'
firstQueue,secondQueue = deque(maxlen=30),deque(maxlen=30)

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
                while True:
                    print('made it into second loop')
                    success, img = cap.read()
                    if not success:
                        break
                    else:
                        detected, frame = detectHand(hands,img, '')
                    if detected: secondQueue.append(detected)
                    ret, buffer = cv2.imencode('.jpg', img)
                    img = buffer.tobytes()
                    if len(secondQueue)== 30 and len(set(secondQueue))==1:
                        global secondGesture
                        secondGesture = set(secondQueue).pop()
                        print('both gestures are',firstGesture,secondGesture)
                        time.sleep(3)
                        firstGesture,secondGesture = 'No gesture detected yet','No gesture detected yet'
                        secondQueue.clear()
                        
                        break
                    yield (b'--frame\r\n'
                        b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')
            #cv2.putText(img,'put text on the frame', (10,130), cv2.FONT_HERSHEY_PLAIN, 3, (100,50,100), 3)
            ret, buffer = cv2.imencode('.jpg', img)
            img = buffer.tobytes()
            
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')

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