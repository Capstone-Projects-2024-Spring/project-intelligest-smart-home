---
sidebar_position: 2
---

# System Block Diagram

import Figure from "../../src/components/Figure";

<Figure caption={"Figure 1. High-level design of the IntelliGest System application."}>

![IntelliGest System Block Diagram](../../static/img/IntelliGestSystemBlockDiagram.png)

</Figure>

[Figure 1](../../static/img/IntelliGestSystemBlockDiagram.png) depicts the high-level design of the product. The user will be able to set up the IntelliGest Device and connect to devices around their smart home. The device will already have Home Assistant installed with configured MQTT Broker Server in a Docker container. The device will also feature a teachable machine learning model, exported as a Tensorflow Lite model. The user can then use the camera on the device to trigger a MQTT protocol to publish the request of the user to the subscribed Home Assistant, which will then handle the action requested. The display will connect to Home Assistant and its integrations to show the user all of their connected devices and any changes being made to them.
