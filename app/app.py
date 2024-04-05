from flask import Flask, render_template, Response
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


def preprocessHandRegion(handRegion):
    #resize the image to the same resolution used in the dataset
    resized_hand = cv2.resize(handRegion, (224,224))
    normalized_hand = resized_hand / 255.0
    
    reshaped_hand = np.reshape(normalized_hand, (224,224, 3))
    batch_hand = np.expand_dims(reshaped_hand, axis=0)
    return batch_hand



def detectHand(hands, img, cTime, pTime, ASLModel, colors):
    
    gestureName=""
    #success, img = cap.read()
    cv2.putText(img, "looking for ASL gestures", (int(img.shape[1]/2),20), cv2.FONT_HERSHEY_PLAIN, 1, (255, 255, 255), 2)
    if img is None:
        print("empty camera frame!!!!!")
        
    results = hands.process(img)
    if results.multi_hand_landmarks:
        #get the dimensions for the cropped image
        minX,minY,maxX,maxY=createSquare(results,img)
        # Draw the square bounding box
        cv2.rectangle(img, (minX, minY), (maxX, maxY), (colors, colors, colors), 2)
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
    cTime = time.time()
    fps = 1/(cTime-pTime)
    pTime = cTime
    
    #adding all the text before displaying the image
    cv2.putText(img, gestureName, (10, 130), cv2.FONT_HERSHEY_PLAIN, 2, (colors, colors, colors), 2)
    cv2.putText(img,str(int(fps)), (10,70), cv2.FONT_HERSHEY_PLAIN, 3, (colors,50,colors), 3)
    #cv2.imshow("Image", img)
    cv2.waitKey(1)
    return pTime, cTime, gestureName,img

def InstructionCommand(hands, img, cTime, pTime,firstDetected):
    result = ""
    
    cv2.putText(img, f'''Thumbs for  {firstDetected}''', (int(img.shape[1]/3),20), cv2.FONT_HERSHEY_PLAIN, 1, (255, 255, 255), 2)
    if img is None:
        print("empty camera frame!!!!!")
    
    results = hands.process(img)
    if results.multi_hand_landmarks:
        #get the dimensions for the cropped image
        minX,minY,maxX,maxY=createSquare(results,img)
        # Draw the square bounding box
        cv2.rectangle(img, (minX, minY), (maxX, maxY), (0, 0, 0), 2)
        if minX < maxX and minY < maxY:
            result = thumbClassifier(results)
        
    cTime = time.time()
    fps = 1/(cTime-pTime)
    pTime = cTime
        
    cv2.putText(img,result, (10,130), cv2.FONT_HERSHEY_PLAIN, 3, (100,50,100), 3)
    cv2.putText(img,str(int(fps))+' FPS', (10,70), cv2.FONT_HERSHEY_PLAIN, 3, (100,50,100), 3)
    cv2.imshow("Image", img)
    cv2.waitKey(1)
    return pTime, cTime, result


app = Flask(__name__)
mpHands = mp.solutions.hands
hands = mpHands.Hands(static_image_mode=False,
                    max_num_hands=1,
                    min_detection_confidence=0.5,
                    min_tracking_confidence=0.5)


# Your existing code modified for Flask will go here


def gen_frames(cap):  # Generator function
    while True:
        success, img = cap.read()
        if not success:
            break
        else:
            # Your hand detection and instructions code integrated here
            # Instead of cv2.imshow, convert frame to bytes and yield
            pTime,cTime, detected, frame = detectHand(hands,img, 0,0, '', 155)
            print(detected)
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

if __name__ == "__main__":
    app.run(debug=True)
    
    
