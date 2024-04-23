"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[273],{69713:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>r,metadata:()=>c,toc:()=>d});var i=n(85893),s=n(11151),o=n(79337);const r={sidebar_position:3},a="Algorithms",c={id:"system-architecture/algorithms",title:"Algorithms",description:"Algorithms for Hand Signal Detection",source:"@site/docs/system-architecture/algorithms.md",sourceDirName:"system-architecture",slug:"/system-architecture/algorithms",permalink:"/project-intelligest-smart-home/docs/system-architecture/algorithms",draft:!1,unlisted:!1,editUrl:"https://github.com/Capstone-Projects-2024-Spring/project-intelligest-smart-home/edit/main/documentation/docs/system-architecture/algorithms.md",tags:[],version:"current",lastUpdatedBy:"KevinXJarema",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"docsSidebar",previous:{title:"Class Diagrams",permalink:"/project-intelligest-smart-home/docs/system-architecture/class-diagram"},next:{title:"Sequence Diagrams",permalink:"/project-intelligest-smart-home/docs/system-architecture/sequence-diagrams"}},l={},d=[{value:"Algorithms for Hand Signal Detection",id:"algorithms-for-hand-signal-detection",level:2},{value:"Step 1: Continuous Motion Detection",id:"step-1-continuous-motion-detection",level:3},{value:"Step 2: Hand Isolation",id:"step-2-hand-isolation",level:3},{value:"Step 3: Detecting Home Device",id:"step-3-detecting-home-device",level:3},{value:"Step 4: Hand Gesture Detection",id:"step-4-hand-gesture-detection",level:3},{value:"Step 5: Instruction Recognition",id:"step-5-instruction-recognition",level:3},{value:"Example",id:"example",level:3},{value:"Useful Resources",id:"useful-resources",level:3},{value:"Model 2 Classes",id:"model-2-classes",level:2},{value:"Letter Mapping Data Set",id:"letter-mapping-data-set",level:3},{value:"Model 3 Classes",id:"model-3-classes",level:2},{value:"Gesture Recognition Data Set",id:"gesture-recognition-data-set",level:3}];function h(e){const t={a:"a",h1:"h1",h2:"h2",h3:"h3",img:"img",p:"p",strong:"strong",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"algorithms",children:"Algorithms"}),"\n","\n","\n",(0,i.jsx)(t.h2,{id:"algorithms-for-hand-signal-detection",children:"Algorithms for Hand Signal Detection"}),"\n",(0,i.jsx)(o.Z,{caption:"Use UML State Diagram",children:(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"UML State Diagram",src:n(47685).Z+"",width:"921",height:"1805"})})}),"\n",(0,i.jsx)(t.h3,{id:"step-1-continuous-motion-detection",children:"Step 1: Continuous Motion Detection"}),"\n",(0,i.jsxs)(t.p,{children:["The Raspberry Pi camera feed is monitored using OpenCV motion detection continually until motion is detected. Once motion is detected, ",(0,i.jsx)(t.a,{href:"#step-2-hand-isolation",children:"Step 2"})," is activated."]}),"\n",(0,i.jsx)(t.h3,{id:"step-2-hand-isolation",children:"Step 2: Hand Isolation"}),"\n",(0,i.jsxs)(t.p,{children:["An OpenCV hand detection model is used to draw a box around the user\u2019s hand. The hand will be cropped, then preprocessed for ",(0,i.jsx)(t.a,{href:"#step-3-device-choice",children:"Step 3"}),". If no hand is detected for 5 seconds, this process will cease and return to ",(0,i.jsx)(t.a,{href:"#step-1-continuous-motion-detection",children:"Step 1"}),"."]}),"\n",(0,i.jsx)(t.h3,{id:"step-3-detecting-home-device",children:"Step 3: Detecting Home Device"}),"\n",(0,i.jsxs)(t.p,{children:["The prepared image of the hand will be input into an ASL recognition model, and the results from the model will be used to update the Raspberry Pi to show the intended device the user wants to send instructions to. A hand signal can be given to go back to ",(0,i.jsx)(t.a,{href:"#step-2-hand-isolation",children:"Step 2"})," if the model detects the hand gesture incorrectly."]}),"\n",(0,i.jsx)(t.h3,{id:"step-4-hand-gesture-detection",children:"Step 4: Hand Gesture Detection"}),"\n",(0,i.jsx)(t.p,{children:"After the device is detected by the ASL recognition model, the hand detection model will be activated again to detect the user\u2019s gesture"}),"\n",(0,i.jsx)(t.h3,{id:"step-5-instruction-recognition",children:"Step 5: Instruction Recognition"}),"\n",(0,i.jsxs)(t.p,{children:["The image will be processed and input into a gesture recognition model to detect the instruction given by the user. If it is a one step instruction such as turning on or turning off, or changing by one, the instruction will be carried out, and then return to step one. If it is a multi step instruction, such as setting to a certain number, the model will swap between the hand detection and gesture recognition model until the multi step instruction is complete. After the instruction is complete, it will be carried out and the process will return to ",(0,i.jsx)(t.a,{href:"#step-1-continuous-motion-detection",children:"Step 1"}),"."]}),"\n",(0,i.jsx)(t.h3,{id:"example",children:"Example"}),"\n",(0,i.jsx)(t.p,{children:"A user walks in front of the camera, the motion detection recognizes this and the process moves to the next step. The user signals an \u201cO\u201d with their thumb and index finger, and the hand detection captures the gesture given by the user and sends it to the ASL recognition model. The model identifies this as the gesture for the locks, and displays the smart lock status on the screen. The user intends to lock the smart locks, so they gesture a thumbs up to the camera. This is detected by the gesture recognition model, and the instruction to lock all smart locks is carried out. After this, the Raspberry Pi returns to its original state"}),"\n",(0,i.jsx)(t.h3,{id:"useful-resources",children:"Useful Resources"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.a,{href:"https://wecapable.com/tools/text-to-sign-language-converter/",children:"ASL Translator"})}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.a,{href:"https://www.analyticsvidhya.com/blog/2021/07/building-a-hand-tracking-system-using-opencv/",children:"Hand Detection Model Tutorial"})}),"\n",(0,i.jsx)(t.h2,{id:"model-2-classes",children:"Model 2 Classes"}),"\n",(0,i.jsx)(o.Z,{caption:"Figure 1. Letter Mappings for Various Devices",children:(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{src:"https://github.com/Capstone-Projects-2024-Spring/project-intelligest-smart-home/assets/82054873/b226a9ce-bfd9-44b6-8158-1ce8d33e8e27",alt:"Finger Spelling Mapping"})})}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:"From left to right:"}),"\nTV Lights, Alarm, Weather, Thermostat, Locks, Reminders, To-do list"]}),"\n",(0,i.jsx)(t.h3,{id:"letter-mapping-data-set",children:"Letter Mapping Data Set"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.a,{href:"https://www.kaggle.com/datasets/datamunge/sign-language-mnist",children:"Sign Language MNIST Data Set"})}),"\n",(0,i.jsx)(t.h2,{id:"model-3-classes",children:"Model 3 Classes"}),"\n",(0,i.jsx)(t.p,{children:"Increase by 1/turn on, Decrease by 1/turn off, set number"}),"\n",(0,i.jsx)(o.Z,{caption:"Figure 2. Increasing and Decreasing with Set Numbers",children:(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{src:"https://github.com/Capstone-Projects-2024-Spring/project-intelligest-smart-home/assets/82054873/2dbbc7d9-f931-4355-a918-e40b0c76e6ea",alt:"Increasing and Decreasing based on a Set Number"})})}),"\n",(0,i.jsx)(t.p,{children:"Finishing (only required for command using set numbers)"}),"\n",(0,i.jsx)(o.Z,{caption:"Figure 3. Completing a Request",children:(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{src:"https://github.com/Capstone-Projects-2024-Spring/project-intelligest-smart-home/assets/82054873/b01ab1b3-e601-4531-b7e7-88e650bd40df",alt:"Completing a Request"})})}),"\n",(0,i.jsx)(t.h3,{id:"gesture-recognition-data-set",children:"Gesture Recognition Data Set"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.a,{href:"https://www.kaggle.com/datasets/imsparsh/gesture-recognition",children:"Gesture Recognition Data Set"})})]})}function u(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},79337:(e,t,n)=>{n.d(t,{Z:()=>s});n(67294);var i=n(85893);function s(e){function t(){return t=e.id?e.id:(t=(t=(t=e.caption).replaceAll("."," ")).replaceAll(" ","-")).toLowerCase()}return(0,i.jsxs)("figure",{id:t(),align:e.align?e.align:"center",style:e.style?e.style:{},children:[e.children,e.src?(0,i.jsx)("img",{src:e.src,alt:e.alt}):(0,i.jsx)(i.Fragment,{}),(0,i.jsx)("figcaption",{align:e.align?e.align:"center",style:{fontWeight:"bold"},children:e.caption}),(0,i.jsx)("figcaption",{align:e.align?e.align:"center",style:{},children:e.subcaption})]})}},47685:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/StateDiagram-5a88610d8add1da5c09e62a261ca11a5.png"},11151:(e,t,n)=>{n.d(t,{Z:()=>a,a:()=>r});var i=n(67294);const s={},o=i.createContext(s);function r(e){const t=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(o.Provider,{value:t},e.children)}}}]);