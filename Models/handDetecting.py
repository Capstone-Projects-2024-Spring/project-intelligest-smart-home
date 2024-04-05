import cv2
import  asyncio, os
import mediapipe as mp
import time, math
import numpy as np
#from tensorflow.keras.models import load_model
#this requires python_weather, which is not included in requirements.txt, 
#so you will need to install it with pip install python_weather
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
        print(prediction)
        return "none"

def calculate_angle(p1, p2, p3):
    """Calculate the angle between three points."""
    a = math.sqrt((p2.x - p3.x)**2 + (p2.y - p3.y)**2)
    b = math.sqrt((p1.x - p3.x)**2 + (p1.y - p3.y)**2)
    c = math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2)
    angle = math.acos((a**2 + c**2 - b**2) / (2 * a * c))
    return math.degrees(angle)

    # In your existing thumbClassifier, incorporate angle calculations where needed.
    # For example, to check if the thumb is extended in a thumbs-up gesture:
    
class hand:
    def __init__(self,hand):
        self.wrist = hand.landmark[0]
        self.thumb = finger(hand.landmark[1:5],self.wrist)
        self.indexFinger = finger(hand.landmark[5:9],self.wrist)
        self.middleFinger = finger(hand.landmark[9:13],self.wrist)
        self.ringFinger = finger(hand.landmark[13:17],self.wrist)
        self.pinky = finger(hand.landmark[17:21],self.wrist)
        self.fingers = [self.thumb,self.indexFinger,self.middleFinger,self.ringFinger,self.pinky]
        self.fingersUp, self.fingersDown,self.fingersFlat = self.getFingerDirections()
        self.gesture = self.getGesture()
    def getFingerDirections(self):
        up,down,flat=0,0,0
        for finger in self.fingers:
            if finger.direction == 'up':
                up+=1
            elif finger.direction =='down':
                down+=1
            else:
                flat+=1
        return up,down,flat
    
    def getGesture(self):
        # Refine gesture detection using counts
        if self.fingersUp == 4 and self.thumb.direction == 'up':
            return 'five fingers up'
        elif self.fingersUp == 4:
            return 'four fingers up'
        elif self.fingersUp == 3:
            return 'three fingers up'
        elif self.fingersUp == 2:
            return 'two fingers up'
        elif self.indexFinger.direction == 'up' and self.fingersUp == 1:
            return 'one finger up - index'
        elif self.thumb.direction == 'up':
            return 'thumbs up'
        elif self.thumb.direction == 'down':
            return 'thumbs down'
        elif self.thumb.direction == 'flat':
            return 'thumb flat'
        else:
            return 'unknown gesture'
            

class finger:
    def __init__(self, points, wrist):
        self.wrist = wrist
        self.points = points
        self.direction=self.getDirection()
        self.angle = self.calculate_angle(points[-1], wrist, points[0])
        #print(self.angle)
    def getDirection(self):
        upPoints=0
        downPoints=0
        for i in range(len(self.points)-1):
            if self.points[i].y > self.points[i+1].y:
                upPoints+=1
            else:
                downPoints+=1
        if abs(self.points[2].y - self.wrist.y)<0.2:
            return 'flat'
        else:
            return 'up' if upPoints>downPoints else 'down'
    
    def calculate_angle(self,p1, p2, p3):
        # Calculate the sides of the triangle
        a = math.sqrt((p2.x - p3.x) ** 2 + (p2.y - p3.y) ** 2)
        b = math.sqrt((p1.x - p3.x) ** 2 + (p1.y - p3.y) ** 2)
        c = math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

        # Calculate the angle at p1 using the cosine rule
        angle = math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c))
        return math.degrees(angle)
    
            
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
    resized_hand = cv2.resize(handRegion, (224,224))
    normalized_hand = resized_hand / 255.0
    
    reshaped_hand = np.reshape(normalized_hand, (224,224, 3))
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
    #ASLModel=load_model('v5model')
    ASLModel = ""


    queue=deque(maxlen=10)
    queueTwo=deque(maxlen=30)
    while True:
        print('start')
        pTime,cTime, detected = detectHand(hands,cap, cTime, pTime, ASLModel, 155)
        if detected!='': queue.append(detected)
        if len(queue)==10 and len(set(queue))==1:
            queue.clear()
            firstDetected=detected
            #print(f'{firstDetected} is the one.')
            break
    while True:
        pTime, cTime, detected = InstructionCommand(hands,cap,cTime,pTime, firstDetected)
        if detected: queueTwo.append(detected)
        #print(detected)
        if len(queueTwo)==30 and len(set(queueTwo))==1:
            queue.clear()
            secondDetected=detected
            print(f'{firstDetected} then {secondDetected} is your first/second command, exiting now.')
            break
        
    # cap.release()
    # cv2.destroyAllWindows()
if __name__ == "__main__":
    main()
