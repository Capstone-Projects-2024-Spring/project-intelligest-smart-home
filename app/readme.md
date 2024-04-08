To run this project, we will need to be in the Professor's office, as our demo will be using our Raspberry Pi device.
The first step of running our project is to turn on and connect the Raspberry Pi to the wifi, screen, camera, and light.
Once the raspberry pi is connected and configured, navigate to the 'app' subfolder of the Project-Intelligest-Smart-Home repository.
This can be done using the 'cd app' command if you are using the terminal and have opened the repository
Once in the 'app' subfolder, run the command 'python -m flask run' to start the program. The program should take a few seconds to start up.
Once the program has output the link to the flask server, open the link in a web browser.
The web page should display a live feed from the camera, and the program should be running.
To test the program, make a thumbs up, thumbs down, and thumbs flat gesture to make sure the model is correctly detecting gestures.
After this test, hold your index finger up for the camera until the gesture is detected as your first gesture.
Next, hold a thumbs up gesture in front of the camera. After this gesture has been held for a few seconds, the web page should show the gestures you used.
Once these gestures are detected, the light should turn on through the home assistant API.