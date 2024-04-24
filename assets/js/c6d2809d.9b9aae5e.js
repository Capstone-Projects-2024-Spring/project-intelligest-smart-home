"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[2257],{26442:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var a=s(85893),n=s(11151);const i={sidebar_position:2},r="Class Diagrams",o={id:"system-architecture/class-diagram",title:"Class Diagrams",description:"Components",source:"@site/docs/system-architecture/class-diagram.md",sourceDirName:"system-architecture",slug:"/system-architecture/class-diagram",permalink:"/project-intelligest-smart-home/docs/system-architecture/class-diagram",draft:!1,unlisted:!1,editUrl:"https://github.com/Capstone-Projects-2024-Spring/project-intelligest-smart-home/edit/main/documentation/docs/system-architecture/class-diagram.md",tags:[],version:"current",lastUpdatedBy:"Darshil Patel",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"docsSidebar",previous:{title:"System Architecture",permalink:"/project-intelligest-smart-home/docs/category/system-architecture"},next:{title:"Algorithms",permalink:"/project-intelligest-smart-home/docs/system-architecture/algorithms"}},c={},d=[{value:"Components",id:"components",level:2},{value:"Home Assistant",id:"home-assistant",level:3},{value:"Dashboard",id:"dashboard",level:3},{value:"IntelliGest Devices",id:"intelligest-devices",level:3},{value:"Python Scripts",id:"python-scripts",level:3},{value:"Javascript Custom Lovelace Cards",id:"javascript-custom-lovelace-cards",level:3},{value:"Class and Component Diagram",id:"class-and-component-diagram",level:2}];function l(e){const t={h1:"h1",h2:"h2",h3:"h3",mermaid:"mermaid",p:"p",...(0,n.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"class-diagrams",children:"Class Diagrams"}),"\n",(0,a.jsx)(t.h2,{id:"components",children:"Components"}),"\n",(0,a.jsx)(t.h3,{id:"home-assistant",children:"Home Assistant"}),"\n",(0,a.jsx)(t.p,{children:"Home Assistant is the core of our system, acting as the server. It\u2019s responsible for managing the state of all connected devices and automations. It communicates with the user interface to display device statuses. It also communicates with the IntelliGest system (Raspberry Pi) by receiving data payloads sent through an MQTT Broker which include a prediction for the action. It also interacts with the devices themselves to control their states based on user input and automation rules."}),"\n",(0,a.jsx)(t.h3,{id:"dashboard",children:"Dashboard"}),"\n",(0,a.jsx)(t.p,{children:"IntelliGest's Dashboard allows users to interact with the system. It sends user commands to the Home Assistant and displays the status of the devices. The dashboard is highly customizable and can display information from various components. We will be creating custom cards for the dashboard to display ASL images."}),"\n",(0,a.jsx)(t.h3,{id:"intelligest-devices",children:"IntelliGest Devices"}),"\n",(0,a.jsx)(t.p,{children:"It includes the actual Smart Home Appliances: Lights, TV, Thermostats, Alaram, and Locks. This devices can be controlled. They communicate with Home Assistant to receive commands and send status updates. The devices are controlled using the built-in components provided by Home Assistant, but can be written to include other devices."}),"\n",(0,a.jsx)(t.h3,{id:"python-scripts",children:"Python Scripts"}),"\n",(0,a.jsx)(t.p,{children:"These are scripts that we will write to load the Machine Learning model on the TPU Coral (to decrease processing tiem), capture, and pre-process images using OpenCV, and make predictions. The scripts will be run on a Raspberry Pi 4, with a Coral TPU co-processor."}),"\n",(0,a.jsx)(t.p,{children:"The OpenCV library will be used to capture images or video frames from a camera connected to the Raspberry Pi. These images will then be preprocessed (e.g., resized, normalized) to be compatible with the input requirements of the TensorFlow Lite model."}),"\n",(0,a.jsx)(t.p,{children:"The TensorFlow Lite model, which has been trained to recognize ASL gestures, will then be loaded into the Coral TPU. The preprocessed images will be passed to this model to make predictions."}),"\n",(0,a.jsx)(t.h3,{id:"javascript-custom-lovelace-cards",children:"Javascript Custom Lovelace Cards"}),"\n",(0,a.jsx)(t.p,{children:"These are custom cards that we will create for the Home Assistant dashboard to display ASL images. The cards will be written in JavaScript and Home Assistant frontend development framework and will be used to enhance the user interface for our targeted demographic and provide necessary visual feedback when required."}),"\n",(0,a.jsx)(t.h2,{id:"class-and-component-diagram",children:"Class and Component Diagram"}),"\n",(0,a.jsx)(t.mermaid,{value:"---\ntitle: IntelliGest Home\n---\n\nclassDiagram\n    HomeAssistant <|--|> Dashboard : sends commands and updates\n    HomeAssistant <|--|> IntelliGestDevice : interacts with\n    HomeAssistant <|--|> PythonScripts : uses\n    UserInterface <|--|> JavaScriptCustomCards : uses\n    PythonScripts <|--|> Camera : captures image from\n    PythonScripts <|--|> TPU : loads model into\n    Camera <|--|> PythonScripts : sends image to\n    TPU <|--|> PythonScripts : sends prediction to\n    class HomeAssistant {\n        -devices[]\n        -automations[]\n        +add_device()\n        +remove_device()\n        +update_device_status()\n        +execute_automation()\n    }\n    class UserInterface {\n        -user_id\n        -command\n        -device_states[]\n        +send_command()\n        +display_device_state()\n    }\n    class Device {\n        -device_id\n        -device_type\n        -status\n        -capabilities[]\n        +update_status()\n        +execute_capability()\n    }\n    class PythonScripts {\n        -model\n        -interpreter\n        -image\n        -prediction\n        +load_model()\n        +capture_image()\n        +preprocess_image()\n        +make_prediction()\n    }\n    class JavaScriptCustomCards {\n        -card_id\n        -image\n        -display_state\n        +create_card()\n        +display_image()\n        +update_display_state()\n    }\n    class Camera {\n        -image\n        +capture_image()\n    }\n    class TPU {\n        -model\n        +load_model()\n        +make_prediction()\n    }"})]})}function m(e={}){const{wrapper:t}={...(0,n.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},11151:(e,t,s)=>{s.d(t,{Z:()=>o,a:()=>r});var a=s(67294);const n={},i=a.createContext(n);function r(e){const t=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:r(e.components),a.createElement(i.Provider,{value:t},e.children)}}}]);