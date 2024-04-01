"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[3196],{98379:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>d,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var i=o(85893),n=o(11151);const s={sidebar_position:1},r="System Overview",a={id:"requirements/system-overview",title:"System Overview",description:"Project Abstract",source:"@site/docs/requirements/system-overview.md",sourceDirName:"requirements",slug:"/requirements/system-overview",permalink:"/project-intelligest-smart-home/docs/requirements/system-overview",draft:!1,unlisted:!1,editUrl:"https://github.com/Capstone-Projects-2024-Spring/project-intelligest-smart-home/edit/main/documentation/docs/requirements/system-overview.md",tags:[],version:"current",lastUpdatedBy:"Bryan Reiter",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docsSidebar",previous:{title:"Requirements Specification",permalink:"/project-intelligest-smart-home/docs/category/requirements-specification"},next:{title:"System Block Diagram",permalink:"/project-intelligest-smart-home/docs/requirements/system-block-diagram"}},c={},l=[{value:"Project Abstract",id:"project-abstract",level:2},{value:"Conceptual Design",id:"conceptual-design",level:2},{value:"Background",id:"background",level:3}];function m(e){const t={h1:"h1",h2:"h2",h3:"h3",p:"p",...(0,n.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"system-overview",children:"System Overview"}),"\n",(0,i.jsx)(t.h2,{id:"project-abstract",children:"Project Abstract"}),"\n",(0,i.jsx)(t.p,{children:"IntelliGest Home revolutionizes the landscape of smart home accessibility by introducing an ASL reading device software that will change the daily home life for individuals who are deaf or non-verbal. This application aims to empower users to seamlessly interact with their smart home devices through American Sign Language (ASL) or hand signals. Unlike traditional smart home systems that require speech recognition, IntelliGest will detect common ASL and gestures to control a home. IntelliGest will utilize the open-source Home Assistant software to serve as the foundations for the home assistant. Image recognition will be utilized to detect common ASL words and utilize them to control a smart home. Users set up the device along with a camera in an area of their choosing in order to allow the user to use ASL where they feel comfortable. Using image recognition, the system will then look to recognize any of the known ASL words or gestures and perform actions mapped to them. Users will also have access to a touchscreen display that will be used to display information they ask for as well as provide an intuitive UI and dashboard displaying them with information about their home. Users will also be notified when an action is completed, such as turning a light on or off, and locking a door."}),"\n",(0,i.jsx)(t.h2,{id:"conceptual-design",children:"Conceptual Design"}),"\n",(0,i.jsx)(t.p,{children:"The product will be prototyped on a Raspberry Pi 4 running the Raspberry Pi OS with a Coral USB TPU for machine learning co-processing. It will utilize the Home Assistant API for connecting IoT devices and controlling them. MQTT will be utilized as a messaging broker between the IntelliGest Home, Home Assistant, and IoT devices around the user\u2019s home. A backend written in Python may be preferred due to Home Assistant utilizing Python."}),"\n",(0,i.jsx)(t.h3,{id:"background",children:"Background"}),"\n",(0,i.jsx)(t.p,{children:"Most at-home smart systems require the user to perform verbal actions to control their smart. Products like Apple\u2019s HomeKit, Amazon\u2019s Alexa, and Google\u2019s Home all fit under this umbrella leading the market of smart home devices. Unlike these services, IntelliGest Home strives to create an inclusive and intuitive smart home experience for those who are deaf, non-verbal, or a combination of the two. This product provides a service to a community who often gets overlooked in the smart home sphere. Using cameras and advanced machine learning technology, IntelliGest will recognize ASL and gestures to control a smart home; something that the current competitors do not provide."})]})}function d(e={}){const{wrapper:t}={...(0,n.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(m,{...e})}):m(e)}},11151:(e,t,o)=>{o.d(t,{Z:()=>a,a:()=>r});var i=o(67294);const n={},s=i.createContext(n);function r(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:r(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);