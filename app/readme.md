# IntelliGest Smart Home

## How to Run the Project

*To run this project, you will most likely need to be in the Professor's office, as our demo will be using our Raspberry Pi device.*
1. The first step of running our project is to turn on and connect the Raspberry Pi to the wifi, screen, camera, and light. *If you're using our setup, you only need to connect to the wifi, and connect the light to any power source through a micro-USB. Follow the steps outlined [here](#connecting-the-pi-and-the-light-to-the-same-network) to connect*
2. Once the Raspberry Pi is connected and configured, navigate to the `app` subfolder of the `Project-Intelligest-Smart-Home` repository.
This can be done using the `cd` command if you are using the terminal and have opened the repository
3. Once in the `app` subfolder, run the command `python -m flask run` to start the program. The program should take a few seconds to start up.
4. Once the program has output the link to the flask server, open the link in a web browser.
5. The web page should display a live feed from the camera, and the program should be running.
6. To test the program, make a thumbs up, thumbs down, and thumbs flat gesture to make sure the model is correctly detecting gestures.
7. After this test, hold your index finger up for the camera until the gesture is detected as your first gesture.
8. Next, hold a thumbs-up gesture in front of the camera. After this gesture has been held for a few seconds, the web page should show the gestures you used.
9. Once these gestures are detected, the light should turn on through the home assistant API.

## Connecting the Pi and the Light to the Same Network
With Home Assistant, any devices in the system _must_ be connected to the same network as the device running Home Assistant. For demo and testing purposes, you will need to host this network yourself.
We recommend utilizing a laptop to provide "shared internet". Both macOS and Windows have this feature.

For minimal setup, configure the network as follows:
- SSID (network name): "showthesign"
- Password: "f334p8ofpehgb"
- Channel: 1, 6, or 11 (if required, it *MUST* be one of these channels since the light communicates over 2.4GHz band)
- WPA2/WPA3 Security

With this configuration, the Raspberry Pi already recognizes this connection and so do the ESPs running the light. To configure your own network with your own name and password, first edit `livingroom.yaml` to include your chosen ssid and password and then you will need to reflash the ESP by connecting it to your laptop and running `esphome run livingroom.yaml` through the terminal. ***We highly recommend just setting up the internet share with the defaults we provide***

Once both the ESP and the main device are connected to the same network, you are good to start using the project, following the steps outlined above!
