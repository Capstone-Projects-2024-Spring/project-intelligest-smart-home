import numpy as np
import cv2

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
    if difference < .1:
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
    
    
