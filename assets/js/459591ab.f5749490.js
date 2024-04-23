"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[7375],{77239:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>m,frontMatter:()=>s,metadata:()=>l,toc:()=>d});var o=t(85893),i=t(11151);const s={sidebar_position:4},r="Development Environment",l={id:"system-architecture/development-environment",title:"Development Environment",description:"Hardware",source:"@site/docs/system-architecture/development-environment.md",sourceDirName:"system-architecture",slug:"/system-architecture/development-environment",permalink:"/project-intelligest-smart-home/docs/system-architecture/development-environment",draft:!1,unlisted:!1,editUrl:"https://github.com/Capstone-Projects-2024-Spring/project-intelligest-smart-home/edit/main/documentation/docs/system-architecture/development-environment.md",tags:[],version:"current",lastUpdatedBy:"KevinXJarema",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"docsSidebar",previous:{title:"Sequence Diagrams",permalink:"/project-intelligest-smart-home/docs/system-architecture/sequence-diagrams"},next:{title:"Version Control",permalink:"/project-intelligest-smart-home/docs/system-architecture/version-control"}},a={},d=[{value:"Hardware",id:"hardware",level:2},{value:"Software",id:"software",level:2},{value:"Docker",id:"docker",level:3},{value:"Image Detection Models",id:"image-detection-models",level:3},{value:"Development Tools",id:"development-tools",level:2},{value:"Documentation",id:"documentation",level:3},{value:"Editors",id:"editors",level:3},{value:"Langauges and Technologies",id:"langauges-and-technologies",level:3}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...(0,i.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"development-environment",children:"Development Environment"}),"\n",(0,o.jsx)(n.h2,{id:"hardware",children:"Hardware"}),"\n",(0,o.jsx)(n.p,{children:"A Raspberry Pi 4 running Raspbery Pi OS will be used for development and testing. A Raspberry Pi Camera will be used to send images to the machine learning models. Various smart devices will be used for testing, such as smart lights, ESPs and ESPhomes, locks, and more."}),"\n",(0,o.jsx)(n.h2,{id:"software",children:"Software"}),"\n",(0,o.jsx)(n.h3,{id:"docker",children:"Docker"}),"\n",(0,o.jsxs)(n.p,{children:["Docker will be utilized to containerize both Home Assistant and a MQTT Broker server using ",(0,o.jsx)(n.a,{href:"https://mosquitto.org/",children:"Eclipse Mosquitto"}),". A ",(0,o.jsx)(n.code,{children:"docker-compose.yaml"})," file will be used to seamless share the shared docker containers under the same stack and deploy them together."]}),"\n",(0,o.jsx)(n.h3,{id:"image-detection-models",children:"Image Detection Models"}),"\n",(0,o.jsx)(n.p,{children:"Teachable Machine will be used to create a base model for hand gesture detection using Tensorflow Lite."}),"\n",(0,o.jsx)(n.p,{children:"OpenCV will be utilized for movement detection and hand isolation models."}),"\n",(0,o.jsx)(n.h2,{id:"development-tools",children:"Development Tools"}),"\n",(0,o.jsx)(n.h3,{id:"documentation",children:"Documentation"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Docusaurus"}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"editors",children:"Editors"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Visual Studio Code"}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"langauges-and-technologies",children:"Langauges and Technologies"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Python"}),"\n",(0,o.jsx)(n.li,{children:"JavaScript"}),"\n",(0,o.jsx)(n.li,{children:"YAML"}),"\n",(0,o.jsx)(n.li,{children:"OpenCV"}),"\n",(0,o.jsx)(n.li,{children:"MQTT Messaging Protocol"}),"\n"]})]})}function m(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>l,a:()=>r});var o=t(67294);const i={},s=o.createContext(i);function r(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);