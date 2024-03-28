"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[4808],{35800:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>d});var i=t(85893),s=t(11151);const o={},c=void 0,r={id:"RemoveDeviceInstruct",title:"RemoveDeviceInstruct",description:"1. Remove MQTT Configuration for Devices:",source:"@site/docs/RemoveDeviceInstruct.md",sourceDirName:".",slug:"/RemoveDeviceInstruct",permalink:"/project-intelligest-smart-home/docs/RemoveDeviceInstruct",draft:!1,unlisted:!1,editUrl:"https://github.com/Capstone-Projects-2024-Spring/project-intelligest-smart-home/edit/main/documentation/docs/RemoveDeviceInstruct.md",tags:[],version:"current",lastUpdatedBy:"Bryan Reiter",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Acceptance test",permalink:"/project-intelligest-smart-home/docs/testing/acceptance-testing"}},l={},d=[];function a(e){const n={code:"code",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Remove MQTT Configuration for Devices:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["If you've configured MQTT devices manually in your ",(0,i.jsx)(n.code,{children:"configuration.yaml"})," file, you can remove those configurations."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Open your ",(0,i.jsx)(n.code,{children:"configuration.yaml"})," file using a text editor."]}),"\n",(0,i.jsxs)(n.li,{children:["Locate the section where MQTT devices are configured. This could be under ",(0,i.jsx)(n.code,{children:"mqtt:"}),", or if you're using MQTT discovery, you might not have specific device configurations in your ",(0,i.jsx)(n.code,{children:"configuration.yaml"}),"."]}),"\n",(0,i.jsx)(n.li,{children:"Remove the configurations related to the devices you want to disconnect. This could include topics, payload configurations, etc."}),"\n",(0,i.jsx)(n.li,{children:"Save the file and restart Home Assistant for the changes to take effect."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Disable MQTT Discovery:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"If you're using MQTT discovery, which allows devices to be automatically discovered and added to Home Assistant, you can disable this feature."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Open your ",(0,i.jsx)(n.code,{children:"configuration.yaml"})," file."]}),"\n",(0,i.jsxs)(n.li,{children:["If you have ",(0,i.jsx)(n.code,{children:"discovery:"})," enabled, comment it out by adding a ",(0,i.jsx)(n.code,{children:"#"})," at the beginning of the line, or set it to ",(0,i.jsx)(n.code,{children:"false"}),"."]}),"\n",(0,i.jsx)(n.li,{children:"Save the file and restart Home Assistant for the changes to take effect."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Remove MQTT Entities:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"If you want to remove specific MQTT entities from Home Assistant:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:'Go to the "Developer Tools" section in Home Assistant.'}),"\n",(0,i.jsx)(n.li,{children:'Select "States" to view all entities.'}),"\n",(0,i.jsx)(n.li,{children:"Find the MQTT entities you want to remove."}),"\n",(0,i.jsx)(n.li,{children:"Click on the entity to open its details."}),"\n",(0,i.jsx)(n.li,{children:'Click on the settings icon and select "Delete" to remove the entity.'}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Remove MQTT Integration:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"If you want to completely remove the MQTT integration from Home Assistant:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Navigate to the Integrations page in Home Assistant."}),"\n",(0,i.jsx)(n.li,{children:"Find and click on the MQTT integration."}),"\n",(0,i.jsx)(n.li,{children:'Click on the settings icon (usually three vertical dots) and select "Delete."'}),"\n",(0,i.jsx)(n.li,{children:"Confirm the deletion."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>c});var i=t(67294);const s={},o=i.createContext(s);function c(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);