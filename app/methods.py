import math,cv2, time
import numpy as np

class hand:
    def __init__(self,hand):
        self.wrist = hand.landmark[0]
        self.thumb = finger(hand.landmark[1:5],self.wrist)
        self.indexFinger = finger(hand.landmark[5:9],self.wrist)
        self.middleFinger = finger(hand.landmark[9:13],self.wrist)
        self.ringFinger = finger(hand.landmark[13:17],self.wrist)
        self.pinky = finger(hand.landmark[17:21],self.wrist)
        self.fingers = [self.indexFinger,self.middleFinger,self.ringFinger,self.pinky]
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
        elif self.indexFinger.direction == 'up' and self.thumb.direction == 'flat':
            return 'L shape'
        elif self.fingersUp == 4:
            return 'four fingers up'
        elif self.fingersUp == 3:
            return 'three fingers up'
        elif self.fingersUp == 2:
            return 'two fingers up'
        elif self.indexFinger.direction == 'up' and self.fingersUp == 1:
            return 'one finger up'
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
    

def preprocessHandRegion(handRegion):
    #resize the image to the same resolution used in the dataset
    resized_hand = cv2.resize(handRegion, (224,224))
    normalized_hand = resized_hand / 255.0
    
    reshaped_hand = np.reshape(normalized_hand, (224,224, 3))
    batch_hand = np.expand_dims(reshaped_hand, axis=0)
    return batch_hand

    
