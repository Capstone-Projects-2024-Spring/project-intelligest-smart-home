import unittest
import sys, os
sys.path.append(r'C:\Users\casey\OneDrive\Desktop\projects ultrafolder\CapstonePushing\project-intelligest-smart-home')
from intelligest_smart_home.Models.DetectionFunctions import *
from intelligest_smart_home.add_nums import add_nums
import cv2
import mediapipe as mp

from intelligest_smart_home.add_nums import add_numbers, subtract_numbers, multiple_numbers, divide_numbers


class TestAddNumbers(unittest.TestCase):
    def test_addition(self):
        result = add_nums(1, 2)
        self.assertEqual(result, 3)
    
    def test_addition_negative(self):
        result = add_nums(-1, -2)
        self.assertEqual(result, -3)

    def test_addition_zero(self):
        result = add_nums(0, 0)
        self.assertEqual(result, 0)

    def test_addition_float(self):
        result = add_nums(1.5, 2.5)
        self.assertEqual(result, 4)
    
    def test_addition_positive_negative(self):
        result = add_nums(1, -2)
        self.assertEqual(result, -1)

    def test_addition_large_numbers(self):
        result = add_nums(1000000, 2000000)
        self.assertEqual(result, 3000000)

    def test_addition_decimal_numbers(self):
        result = add_nums(0.1, 0.2)
        self.assertAlmostEqual(result, 0.3)

    def test_addition_mixed_types(self):
        result = add_nums(10, 2.5)
        self.assertAlmostEqual(result, 12.5)

    def test_add_fractions(self):
        result = add_numbers(55/100, 45/100)
        self.assertEqual(result, 1)

    def test_subtract_mixed_types(self):
        result = subtract_numbers(9284, 9053)
        self.assertEqual(result, 231)

    def test_multiple_decimals(self):
        result = multiple_numbers(8.46, 47.4)
        self.assertEqual(result, 401.004)

    def test_divide_floating_point_numbers(self):
        self.assertAlmostEqual(divide_numbers(1, 3), 0.333, places=3)

    def test_split_devices(self):
        s = 'TV Lights Alarm Weather Thermostat Locks Reminders To-do-List'
        self.assertEqual(s.split(), ['TV', 'Lights', 'Alarm', 'Weather', 'Thermostat', 
                                     'Locks', 'Reminders', 'To-do-List'])
        with self.assertRaises(TypeError):

            add_nums("Hello", "World")
            s.split(8)


    def test_multiply_by_zero(self):
        result = multiple_numbers(10, 0)
        self.assertEqual(result, 0)

    def test_multiply_negative_by_positive(self):
        result = multiple_numbers(-5, 10)
        self.assertEqual(result, -50)

    def test_multiply_two_negatives(self):
        result = multiple_numbers(-5, -10)
        self.assertEqual(result, 50)

    def test_multiply_with_one(self):
        result = multiple_numbers(10, 1)
        self.assertEqual(result, 10)


    def testIdentifyGesture(self):
        #these should be the results for values 0-8
        IdealResult = ["Peace sign", "Tilted finger gun with thumb up", "Upward fist", "Three fingers up", "Crossed fingers", "O with fingers", "Upward fist with fingers forward", "One finger pointed up", "Two fingers pointing in a direction", "None"]
        result = []
        #testing for values 0-9, using result to store answers
        for i in range(10):
            result.append(IdentifyGesture(i))
        #comparing the arrays to make sure function is working correctly
        self.assertEqual(result, IdealResult)
        
    def testPreprocessHandRegion(self):
        testRegion = np.random.randint(255, size=(128, 128, 3), dtype=np.uint8)
        result = preprocessHandRegion(testRegion)
        #checking to make sure the image has been resized to correct dimensions
        self.assertEqual(result.shape, (1, 64, 64, 3))
        #checking to make sure that the image has been normalized. values all between 0 and 1
        self.assertTrue((result>=0).all())
        self.assertTrue((result<=1).all())
        #making sure that the image is the correct type
        self.assertIsInstance(result, np.ndarray)
        
    def testThumbClassifier(self):
        #initializing the mediapipe hands model, this will be used on benchmark images to make sure it works
        mpHands = mp.solutions.hands
        hands = mpHands.Hands(static_image_mode=True,
                            max_num_hands=1,
                            min_detection_confidence=0.5,
                            min_tracking_confidence=0.5)
        mpDraw = mp.solutions.drawing_utils
        
        #getting images to test the thumb classifier, one for each class(more will be added later)
        undefined = cv2.imread(os.path.join(os.path.dirname(__file__), 'ExampleImages', 'undefined.jpg'))
        thumbsUp = cv2.imread(os.path.join(os.path.dirname(__file__), 'ExampleImages', 'thumbsup.jpg'))
        thumbsDown = cv2.imread(os.path.join(os.path.dirname(__file__), 'ExampleImages', 'thumbsdown.jpg'))
        
        #making sure all of the images have been loaded, gives error if any haven't
        for image in [undefined, thumbsUp, thumbsDown]:
            if image is None:
                print("not found")
                raise FileNotFoundError(f"Unable to load image {image}")
        
        #putting them all through the thumb classifier to see if they work
        self.assertEqual(thumbClassifier(hands.process(undefined)), 'undefined')
        self.assertEqual(thumbClassifier(hands.process(thumbsUp)), 'Thumbs up')
        self.assertEqual(thumbClassifier(hands.process(thumbsDown)), 'Thumbs down')
        
    def testCreateSquare(self):
        #Should change the createsquare to return the results in an array
        undefinedResults, thumbsupResults, thumbsDownResults =[801,245,1099,543],[734,278,1054,598], [667,290,923,546]
        mpHands = mp.solutions.hands
        hands = mpHands.Hands(static_image_mode=True,
                            max_num_hands=1,
                            min_detection_confidence=0.5,
                            min_tracking_confidence=0.5)
        mpDraw = mp.solutions.drawing_utils
        
        #getting images to test the create square
        undefined = cv2.imread(os.path.join(os.path.dirname(__file__), 'ExampleImages', 'undefined.jpg'))
        thumbsUp = cv2.imread(os.path.join(os.path.dirname(__file__), 'ExampleImages', 'thumbsup.jpg'))
        thumbsDown = cv2.imread(os.path.join(os.path.dirname(__file__), 'ExampleImages', 'thumbsdown.jpg'))
        
        #making sure all of the images have been loaded, gives error if any haven't
        
        for image in [undefined, thumbsUp, thumbsDown]:
            if image is None:
                print("not found")
                raise FileNotFoundError(f"Unable to load image {image}")
            
        #getting the results from each example image, comparing it to results that I have already gotten
        #I am not sure if this is a correct unit test but can't think of a better way to do it
        minX,minY,maxX,maxY = createSquare(hands.process(undefined), undefined)
        self.assertEqual([minX,minY,maxX,maxY], undefinedResults)
        minX,minY,maxX,maxY = createSquare(hands.process(thumbsUp), thumbsUp)
        self.assertEqual([minX,minY,maxX,maxY], thumbsupResults)
        minX,minY,maxX,maxY = createSquare(hands.process(thumbsDown), thumbsDown)
        self.assertEqual([minX,minY,maxX,maxY], thumbsDownResults)
    
        
if __name__ == '__main__':
    
    unittest.main()

