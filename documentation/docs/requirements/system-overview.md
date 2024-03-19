---
sidebar_position: 1
---

# System Overview

## Project Abstract

IntelliGest Home revolutionizes the landscape of smart home accessibility by introducing an ASL reading device software that will change the daily home life for individuals who are deaf or non-verbal. This application aims to empower users to seamlessly interact with their smart home devices through American Sign Language (ASL) or hand signals. Unlike traditional smart home systems that require speech recognition, IntelliGest will detect common ASL and gestures to control a home. IntelliGest will utilize the open-source Home Assistant software to serve as the foundations for the home assistant. Image recognition will be utilized to detect common ASL words and utilize them to control a smart home. Users set up the device along with a camera in an area of their choosing in order to allow the user to use ASL where they feel comfortable. Using image recognition, the system will then look to recognize any of the known ASL words or gestures and perform actions mapped to them. Users will also have access to a touchscreen display that will be used to display information they ask for as well as provide an intuitive UI and dashboard displaying them with information about their home. Users will also be notified when an action is completed, such as turning a light on or off, and locking a door.

## Conceptual Design

The product will be prototyped on a Raspberry Pi 4 running the Raspberry Pi OS with a Coral USB TPU for machine learning co-processing. It will utilize the Home Assistant API for connecting IoT devices and controlling them. MQTT will be utilized as a messaging broker between the IntelliGest Home, Home Assistant, and IoT devices around the user’s home. A backend written in Python may be preferred due to Home Assistant utilizing Python. 

### Background
Most at-home smart systems require the user to perform verbal actions to control their smart. Products like Apple’s HomeKit, Amazon’s Alexa, and Google’s Home all fit under this umbrella leading the market of smart home devices. Unlike these services, IntelliGest Home strives to create an inclusive and intuitive smart home experience for those who are deaf, non-verbal, or a combination of the two. This product provides a service to a community who often gets overlooked in the smart home sphere. Using cameras and advanced machine learning technology, IntelliGest will recognize ASL and gestures to control a smart home; something that the current competitors do not provide.  
