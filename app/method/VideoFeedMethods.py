import cv2
import numpy as np
from methods import *

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

def black_image(img):
    black_screen = np.zeros_like(img)
    img = black_screen 
    #print('no motion')
    ret, buffer = cv2.imencode('.jpg', img)
    img = buffer.tobytes()
    
    yield (b'--frame\r\n'
        b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')



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
    #print('checking for motion', len(contours))
    return len(contours) > 0, current_frame


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
