import cv2
import python_weather, asyncio, os
import mediapipe as mp
import time
import numpy as np
from tensorflow.keras.models import load_model
#queue to find the right gesture
from collections import deque
def IdentifyGesture(prediction):
    #print(prediction)
    if prediction == 0:
        return "Peace sign"
    elif prediction == 1:
        return "Tilted finger gun with thumb up"
    elif prediction == 2:
        return "Upward fist"
    elif prediction == 3:
        return "Three fingers up"
    elif prediction == 4:
        return "Crossed fingers"
    elif prediction == 5:
        return "O with fingers"
    elif prediction == 6:
        return "Upward fist with fingers forward"
    elif prediction == 7:
        return "One finger pointed up"
    elif prediction == 8:
        return "Two fingers pointing in a direction"
    else:
        return "None"

def thumbClassifier(results):
    thumb_tip, wrist = results.multi_hand_landmarks[0].landmark[4], results.multi_hand_landmarks[0].landmark[0]
    difference = abs(thumb_tip.y - wrist.y)
    if difference < .2:
        return 'undefined'
    elif thumb_tip.y < wrist.y:
        return 'Thumbs up'
    else:
        return 'Thumbs down'

def createSquare(results, img):
    h, w, c = img.shape
    min_x, min_y = w, h
    max_x, max_y = 0, 0
    #print(results.multi_hand_landmarks)
    for lm in results.multi_hand_landmarks[0].landmark:
        
        # Convert the normalized position to pixel coordinates
        cx, cy = int(lm.x * w), int(lm.y * h)

        # Update min and max coordinates based on current landmark
        min_x, min_y = min(min_x, cx), min(min_y, cy)
        max_x, max_y = max(max_x, cx), max(max_y, cy)
    
    center_x, center_y = (min_x + max_x) // 2, (min_y + max_y) // 2

    # Determine the side length of the square by finding the maximum dimension
    side_length = max(max_x - min_x, max_y - min_y)

    # Ensure the square doesn't go outside the image boundaries
    square_half_length = side_length // 2
    new_min_x = max(center_x - square_half_length, 0)
    new_max_x = min(center_x + square_half_length, w)
    new_min_y = max(center_y - square_half_length, 0)
    new_max_y = min(center_y + square_half_length, h)

    # Adjust the square dimensions if they go beyond the image's height or width
    if new_min_x < 0:
        new_max_x -= new_min_x  # Adjust the max_x accordingly
        new_min_x = 0
    if new_min_y < 0:
        new_max_y -= new_min_y  # Adjust the max_y accordingly
        new_min_y = 0
    if new_max_x > w:
        new_min_x -= (new_max_x - w)  # Adjust the min_x accordingly
        new_max_x = w
    if new_max_y > h:
        new_min_y -= (new_max_y - h)  # Adjust the min_y accordingly
        new_max_y = h
    return new_min_x, new_min_y, new_max_x, new_max_y

def preprocessHandRegion(handRegion):
    #resize the image to the same resolution used in the dataset
    resized_hand = cv2.resize(handRegion, (64,64))
    normalized_hand = resized_hand / 255.0
    
    reshaped_hand = np.reshape(normalized_hand, (64,64, 3))
    batch_hand = np.expand_dims(reshaped_hand, axis=0)
    return batch_hand

def getHandFromImage(img,hands):
    results = hands.process(img)
    
    if results.multi_hand_landmarks:
        minX, minY, maxX, maxY = createSquare(results, img)
        if minX < maxX and minY < maxY:
            cv2.rectangle(img, (minX, minY), (maxX, maxY), (255, 255, 25), 2)
            handRegion = img[minY:maxY, minX:maxX]
        else:
            print("error in getHandFromImage")
            return None, img
        return handRegion, img
    
def detectHand(hands, cap, cTime, pTime, ASLModel, colors):
    gestureName=""
    success, img = cap.read()
    cv2.putText(img, "looking for ASL gestures", (int(img.shape[1]/2),20), cv2.FONT_HERSHEY_PLAIN, 1, (255, 255, 255), 2)
    if not success:
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
            asl_prediction = ASLModel.predict(preprocessedHand) 

            #turning the gesture from clas number to real name and adding to video feed
            gestureName = "Detected Gesture: " + IdentifyGesture(np.argmax(asl_prediction)) 
    cTime = time.time()
    fps = 1/(cTime-pTime)
    pTime = cTime
    
    #adding all the text before displaying the image
    cv2.putText(img, gestureName, (10, 130), cv2.FONT_HERSHEY_PLAIN, 2, (colors, colors, colors), 2)
    cv2.putText(img,str(int(fps)), (10,70), cv2.FONT_HERSHEY_PLAIN, 3, (colors,50,colors), 3)
    cv2.imshow("Image", img)
    cv2.waitKey(1)
    return pTime, cTime, gestureName

def InstructionCommand(hands, cap, cTime, pTime,firstDetected):
    result = ""
    success, img = cap.read()
    cv2.putText(img, f'''Thumbs for  {firstDetected}''', (int(img.shape[1]/3),20), cv2.FONT_HERSHEY_PLAIN, 1, (255, 255, 255), 2)
    if not success:
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



async def getweather():
  # declare the client. the measuring unit used defaults to the metric system (celcius, km/h, etc.)
  async with python_weather.Client(unit=python_weather.IMPERIAL) as client:
    # fetch a weather forecast from a city
    weather = await client.get('Philadelphia')

    print(weather, "weather object", weather.current.temperature, 'weather object current temperature')
    
    for forecast in weather.forecasts:
            print(forecast)
            print(forecast.date, forecast.temperature, forecast.astronomy.sun_rise, forecast.astronomy.sun_set, forecast.astronomy.moon_phase)
    weather_data = f"Temp: {weather.current.temperature}. This is the current weather for Philadelphia"
    return weather_data

def makeTheTemperature(hands, cap, cTime, pTime,firstDetected):
    result = ""
    success, img = cap.read()
    cv2.putText(img, f'''Thumbs for  {firstDetected}''', (int(img.shape[1]/3),20), cv2.FONT_HERSHEY_PLAIN, 1, (255, 255, 255), 2)
    if not success:
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
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    weather = asyncio.run(getweather())

    cv2.putText(img,weather, (10,130), cv2.FONT_HERSHEY_PLAIN, 3, (100,50,100), 3)
    cv2.putText(img,str(int(fps))+' FPS', (10,70), cv2.FONT_HERSHEY_PLAIN, 3, (100,50,100), 3)
    cv2.imshow("Image", img)
    cv2.waitKey(1)
    return pTime, cTime, result

def runFirstIteration(hands, cap, cTime, pTime, ASLModel):
    queue=deque(maxlen=10)
    while True:
        pTime,cTime, detected = detectHand(hands,cap, cTime, pTime, ASLModel, 155)
        if detected!='': queue.append(detected)
        if len(queue)==10 and len(set(queue))==1:
            queue.clear()
            firstDetected=detected
            print(f'{firstDetected} is the one.')
            return detected
    
def runSecondIteration(hands, cap, cTime, pTime, firstDetected):
    queueTwo=deque(maxlen=30)
    while True:
        pTime, cTime, detected = InstructionCommand(hands,cap,cTime,pTime, firstDetected)
        if detected in ('Thumbs up', 'Thumbs down'): queueTwo.append(detected)
        print(detected)
        if len(queueTwo)==30 and len(set(queueTwo))==1:
            secondDetected=detected
            print(f'{firstDetected} then {secondDetected} is your first/second command, exiting now.')
            return detected
    
def main():
    cap = cv2.VideoCapture(0)
    pTime = 0
    cTime = 0
    mpHands = mp.solutions.hands
    hands = mpHands.Hands(static_image_mode=False,
                        max_num_hands=1,
                        min_detection_confidence=0.5,
                        min_tracking_confidence=0.5)


    firstDetected,secondDetected=None, None
    ASLModel=load_model('ASLModelV3.h5')



    queue=deque(maxlen=10)
    queueTwo=deque(maxlen=30)
    while True:
        pTime,cTime, detected = detectHand(hands,cap, cTime, pTime, ASLModel, 155)
        if detected!='': queue.append(detected)
        if len(queue)==10 and len(set(queue))==1:
            queue.clear()
            firstDetected=detected
            print(f'{firstDetected} is the one.')
            break
    while True:
        pTime, cTime, detected = InstructionCommand(hands,cap,cTime,pTime, firstDetected)
        if detected in ('Thumbs up', 'Thumbs down'): queueTwo.append(detected)
        print(detected)
        if len(queueTwo)==30 and len(set(queueTwo))==1:
            queue.clear()
            secondDetected=detected
            print(f'{firstDetected} then {secondDetected} is your first/second command, exiting now.')
            break
    if secondDetected == 'Thumbs up':
        makeTheTemperature(hands, cap, cTime, pTime,firstDetected)
        
        
        # Your existing hand detection and command logic here
        
    # cap.release()
    # cv2.destroyAllWindows()
main()


