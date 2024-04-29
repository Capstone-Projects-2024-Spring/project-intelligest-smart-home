# App Methods
This code provides functionality for hand gesture recognition using computer vision techniques. 
It utilizes the MediaPipe library for hand landmark detection and performs various calculations and classifications based on the detected hand landmarks.

## Classes
### Hand Class
-The hand class represents a detected hand and its various attributes.


#### The __init__ method takes a MediaPipe hand landmarks object as input and initializes the following attributes:

* wrist: The wrist landmark point.
* thumb: An instance of the finger class representing the thumb.
* indexFinger: An instance of the finger class representing the index finger.
* middleFinger: An instance of the finger class representing the middle finger.
* ringFinger: An instance of the finger class representing the ring finger.
* pinky: An instance of the finger class representing the pinky finger.
* fingers: A list containing instances of the finger class for each finger (excluding the thumb).
* fingersUp: The count of fingers pointing up.
* fingersDown: The count of fingers pointing down.
* fingersFlat: The count of fingers in a flat position.
* gesture: The classified hand gesture.


#### getFingerDirections(self):

Returns: Three integers representing the counts of fingers pointing up, down, and flat.

The getFingerDirections method iterates over each finger (excluding the thumb) and determines its direction based on the positions of its landmark points. It increments the corresponding count (up, down, or flat) for each finger. The method returns the counts of fingers pointing up, down, and flat.

#### getGesture(self): 

Returns: A string representing the detected gesture (e.g., "five fingers up", "L shape", "thumbs up").

The getGesture method uses the counts of fingers pointing up, down, and flat, along with the thumb direction, to classify the hand gesture. It returns a string representing the detected gesture based on predefined conditions. The possible gestures include "five fingers up", "four fingers up", "three fingers up", "two fingers up", "L shape", "one finger up", "thumbs up", "thumbs down", "thumb flat", and "unknown gesture".

### Finger Class
-The finger class represents a single finger and its properties.

* wrist: The wrist landmark point.
* points: The list of finger landmark points.
* direction: The direction of the finger (up, down, or flat).
* angle: The angle between the finger's base, wrist, and tip points.


#### getDirection(self)

Returns: A string representing the finger direction ("up", "down", or "flat").

The getDirection method determines the direction of the finger by comparing the y-coordinates of consecutive landmark points. It counts the number of points that are above or below their previous point. If the absolute difference between the y-coordinate of the middle landmark point and the wrist is less than a threshold (0.2), the finger is considered flat. Otherwise, the direction is determined based on the majority of points being above or below their previous point.

#### calculate_angle(self, p1, p2, p3)

Returns: The angle in degrees.

The calculate_angle method calculates the angle between three points using the cosine rule. It takes three landmark points as input and calculates the lengths of the sides of the triangle formed by these points. Then, it uses the cosine rule to determine the angle at point p1 and returns the angle in degrees.

#### thumbClassifier(results)

Returns: A string representing the detected thumb gesture.

The thumbClassifier function takes the MediaPipe hand landmark detection results as input. It extracts the landmark points of the detected hand and creates an instance of the hand class. It then returns the classified gesture of the thumb based on the getGesture method of the hand object.

#### createSquare(results, img)

Returns: The coordinates of the square bounding box (min_x, min_y, max_x, max_y).

The createSquare function takes the MediaPipe hand landmark detection results and the input image as parameters. It iterates over the detected hand landmarks and calculates the minimum and maximum coordinates (x and y) of the hand. It then determines the center point and the side length of the square bounding box based on the hand's dimensions. The function ensures that the square bounding box stays within the image boundaries by adjusting the coordinates if necessary. Finally, it returns the coordinates of the square bounding box.

#### getHandFromImage(img, hands)

Returns: A tuple containing the extracted hand region and the updated image with a bounding box drawn around the hand.

The getHandFromImage function takes the input image and a MediaPipe hands object as parameters. It processes the image using the MediaPipe hands object to detect hand landmarks. If hand landmarks are detected, it calls the createSquare function to obtain the coordinates of the square bounding box around the hand. It then extracts the hand region from the image using these coordinates and draws a rectangle around the hand on the input image. The function returns a tuple containing the extracted hand region and the updated image. If no hand landmarks are detected or if there is an error in creating the square bounding box, it returns None and the original image.

#### preprocessHandRegion(handRegion)

Returns: The preprocessed hand region as a normalized and reshaped array.

The preprocessHandRegion function takes the extracted hand region image as input. It resizes the image to a fixed resolution of 224x224 pixels, which is commonly used in hand gesture recognition datasets. It then normalizes the pixel values of the resized image by dividing them by 255.0 to scale them between 0 and 1. The normalized image is reshaped to have dimensions (224, 224, 3) and expanded to a batch size of 1 using np.expand_dims. The preprocessed hand region is returned as a normalized and reshaped array, ready for further analysis or classification.
These classes and functions work together to perform hand gesture recognition. The hand and finger classes provide methods to analyze the detected hand landmarks and classify gestures based on finger directions and thumb position. The thumbClassifier, createSquare, getHandFromImage, and preprocessHandRegion functions handle the extraction and preprocessing of the hand region from an input image, preparing it for gesture classification.
