"use strict";(self.webpackChunkcreate_project_docs=self.webpackChunkcreate_project_docs||[]).push([[1818],{8194:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>p,frontMatter:()=>c,metadata:()=>i,toc:()=>o});var n=s(85893),a=s(11151);const c={sidebar_position:1},r="Unit tests",i={id:"Test-Procedures/unit-testing",title:"Unit tests",description:"Class Home Assistant:",source:"@site/docs/Test-Procedures/unit-testing.md",sourceDirName:"Test-Procedures",slug:"/Test-Procedures/unit-testing",permalink:"/project-intelligest-smart-home/docs/Test-Procedures/unit-testing",draft:!1,unlisted:!1,editUrl:"https://github.com/Capstone-Projects-2024-Spring/project-intelligest-smart-home/edit/main/documentation/docs/Test-Procedures/unit-testing.md",tags:[],version:"current",lastUpdatedBy:"Darshil Patel",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docsSidebar",previous:{title:"Test Procedures",permalink:"/project-intelligest-smart-home/docs/category/test-procedures"},next:{title:"Integration tests",permalink:"/project-intelligest-smart-home/docs/Test-Procedures/integration-testing"}},d={},o=[{value:"Class Home Assistant:",id:"class-home-assistant",level:2},{value:"Class User Interface:",id:"class-user-interface",level:2},{value:"Class Device",id:"class-device",level:2},{value:"Class PythonScripts:",id:"class-pythonscripts",level:2},{value:"Class JavaScript Custom Cards",id:"class-javascript-custom-cards",level:2},{value:"Class Camera",id:"class-camera",level:2},{value:"React.js Tests",id:"reactjs-tests",level:2}];function l(e){const t={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,a.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"unit-tests",children:"Unit tests"}),"\n",(0,n.jsx)(t.h2,{id:"class-home-assistant",children:"Class Home Assistant:"}),"\n",(0,n.jsx)(t.p,{children:"Method +add_device()"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:'def test_add_device(self):\n\n        device = Mock()\n        home_assistant = HomeAssistant()\n        \n        device_name = "TV"\n        \n        expected_devices_length = len(home_assistant.devices) + 1\n        \n        home_assistant.add_device(device_name, device)\n        \n        self.assertEqual(len(home_assistant.devices), expected_devices_length)\n'})}),"\n",(0,n.jsx)(t.p,{children:"Verifies that the add_device method of the HomeAssistant class correctly adds a device to the device list."}),"\n",(0,n.jsx)(t.p,{children:"Method +remove_device()"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:'def test_remove_device(self):\n        home_assistant = HomeAssistant()\n        home_assistant.devices = {"TV": Mock(), "Alarm": Mock()}\n    \n        device_name = "TV"\n    \n        expected_devices_length = len(home_assistant.devices) - 1\n        \n        home_assistant.remove_device(device_name)\n    \n        self.assertEqual(len(home_assistant.devices), expected_devices_length)\n'})}),"\n",(0,n.jsx)(t.p,{children:"Test verifies that the remove_device method of the HomeAssistant class correctly removes a device from the device list."}),"\n",(0,n.jsx)(t.p,{children:"Method +update_device_status()"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:'def test_update_device_status(self):\n        home_assistant = HomeAssistant()\n        home_assistant.devices = {"TV": Mock()}\n        \n        device_name = "TV"\n        new_status = "ON"\n        \n        home_assistant.update_device_status(device_name, new_status)\n\n        self.assertEqual(home_assistant.devices[device_name].status, new_status)\n'})}),"\n",(0,n.jsx)(t.p,{children:"Test verifies that the update_device_status method of the HomeAssistant class correctly updates the status of a device."}),"\n",(0,n.jsx)(t.p,{children:"Method +execute_automation()"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:'def test_execute_automation(self):\n        home_assistant = HomeAssistant()\n        automation = Mock()\n        \n        device_name = "TV"\n\n        expected_automation_executed = True\n        \n        result = home_assistant.execute_automation(device_name, automation)\n        \n        self.assertEqual(result, expected_automation_executed)\n'})}),"\n",(0,n.jsx)(t.p,{children:"Test verifies that the execute_automation method of the HomeAssistant class correctly executes an automation for a given device."}),"\n",(0,n.jsx)(t.h2,{id:"class-user-interface",children:"Class User Interface:"}),"\n",(0,n.jsx)(t.p,{children:"Method +send_command()"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:'def test_send_command(self):\n        home_assistant = Mock()\n        user_interface = UserInterface(home_assistant)\n        \n        command = "Turn on TV"\n        \n        expected_command_sent = True\n        \n        result = user_interface.send_command(command)\n        \n        self.assertEqual(result, expected_command_sent)\n'})}),"\n",(0,n.jsx)(t.p,{children:"Test verifies that the send_command method of the UserInterface class correctly sends a command to the Home Assistant."}),"\n",(0,n.jsx)(t.p,{children:"Method +display_device_state():"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:'def test_display_device_state(self):\n        home_assistant = Mock()\n        user_interface = UserInterface(home_assistant)\n        home_assistant.devices = {"TV": Mock()}\n\n        device_name = "TV"\n        device_state = "ON"\n        \n        expected_device_state_displayed = True\n        \n        result = user_interface.display_device_state(device_name, device_state)\n        \n        self.assertEqual(result, expected_device_state_displayed)    \n'})}),"\n",(0,n.jsx)(t.p,{children:"Test verifies that the display_device_state method of the UserInterface class correctly displays the state of a device."}),"\n",(0,n.jsx)(t.h2,{id:"class-device",children:"Class Device"}),"\n",(0,n.jsx)(t.p,{children:"Method +update_status():"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:'def test_update_status(self):\n        device = Device("123", "Light")\n        new_status = "ON"\n        expected_status_updated = True\n        \n        result = device.update_status(new_status)\n        \n        self.assertEqual(result, expected_status_updated)\n        self.assertEqual(device.status, new_status)\n'})}),"\n",(0,n.jsx)(t.p,{children:"Test verifies that the update_status method of the Device class correctly updates the status of a device."}),"\n",(0,n.jsx)(t.p,{children:"Method +execute_capability():"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:'def test_execute_capability(self):\n        device = Device("456", "Thermostat")\n        capability = "SetTemperature"\n        value = 23\n\n        expected_capability_executed = True\n        \n        result = device.execute_capability(capability, value)\n        self.assertEqual(result, expected_capability_executed)\n'})}),"\n",(0,n.jsx)(t.p,{children:"Test verifies that the execute_capability method of the Device class correctly executes a capability on a device."}),"\n",(0,n.jsx)(t.h2,{id:"class-pythonscripts",children:"Class PythonScripts:"}),"\n",(0,n.jsx)(t.p,{children:"Method +load_model():"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:'def test_load_model(self):\n        python_scripts = PythonScripts()\n        model_path = "model.tflite"\n        expected_model_loaded = True\n        \n        result = python_scripts.load_model(model_path)\n        self.assertEqual(result, expected_model_loaded)\n'})}),"\n",(0,n.jsx)(t.p,{children:"Test verifies that the load_model method of the PythonScripts class correctly loads a machine learning model from a file."}),"\n",(0,n.jsx)(t.p,{children:"Method +capture_image():"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:"def test_capture_image(self):\n        python_scripts = PythonScripts()\n        expected_image_captured = True\n    \n        result = python_scripts.capture_image()\n        self.assertEqual(result, expected_image_captured)\n"})}),"\n",(0,n.jsx)(t.p,{children:"Test verifies that the capture_image method of the PythonScripts class correctly captures an image."}),"\n",(0,n.jsx)(t.p,{children:"Method +preprocess_image():"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:"def test_preprocess_image(self):\n        python_scripts = PythonScripts()\n        image = Mock()\n        expected_image_preprocessed = True\n\n        result = python_scripts.preprocess_image(image)\n        self.assertEqual(result, expected_image_preprocessed)\n"})}),"\n",(0,n.jsx)(t.p,{children:"Verifies that the preprocess_image method of the PythonScripts class correctly preprocesses an image."}),"\n",(0,n.jsx)(t.p,{children:"Method +make_prediction():"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:'def test_make_prediction(self):\n        python_scripts = PythonScripts()\n        image = Mock()\n        expected_prediction = "A"\n        prediction = python_scripts.make_prediction(image)\n        \n        self.assertEqual(prediction, expected_prediction)\n'})}),"\n",(0,n.jsx)(t.p,{children:"Verifies that the make_prediction method of the PythonScripts class correctly makes a prediction using a pre-trained model."}),"\n",(0,n.jsx)(t.h2,{id:"class-javascript-custom-cards",children:"Class JavaScript Custom Cards"}),"\n",(0,n.jsx)(t.p,{children:"Method +create_card():"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:'def test_create_card(self):\n        javascript_custom_cards = JavaScriptCustomCards()\n        card_id = "asl_card"\n        expected_card_created = True\n\n        result = javascript_custom_cards.create_card(card_id)\n        self.assertEqual(result, expected_card_created)\n'})}),"\n",(0,n.jsx)(t.p,{children:"Verifies that the create_card method of the JavaScriptCustomCards class correctly creates a custom card."}),"\n",(0,n.jsx)(t.p,{children:"Method +display_image():"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:'def test_display_image(self):\n\n        javascript_custom_cards = JavaScriptCustomCards()\n        card_id = "asl_card"\n\n        image_url = "https://example.com/asl_image.jpg"\n\n        expected_image_displayed = True\n    \n        result = javascript_custom_cards.display_image(card_id, image_url)\n    \n        self.assertEqual(result, expected_image_displayed)\n'})}),"\n",(0,n.jsx)(t.p,{children:"Verifies that the display_image method of the JavaScriptCustomCards class correctly displays an image on a custom card."}),"\n",(0,n.jsx)(t.p,{children:"Method +update_display_state():"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:'def test_update_display_state(self):\n        javascript_custom_cards = JavaScriptCustomCards()\n        card_id = "asl_card"\n        new_display_state = "show"\n        expected_display_state_updated = True\n        \n        result = javascript_custom_cards.update_display_state(card_id, new_display_state)\n        \n        self.assertEqual(result, expected_display_state_updated)\n'})}),"\n",(0,n.jsx)(t.p,{children:"Verifies that the update_display_state method of the JavaScriptCustomCards class correctly updates the display state of a custom"}),"\n",(0,n.jsx)(t.h2,{id:"class-camera",children:"Class Camera"}),"\n",(0,n.jsx)(t.p,{children:"Method +capture_image():"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:"def test_capture_image(self):\n\n        camera = Camera()\n        python_scripts = Mock()\n        camera.python_scripts = python_scripts\n        \n        expected_image_captured = True\n\n        result = camera.capture_image()\n\n        self.assertEqual(result, expected_image_captured)\n        python_scripts.preprocess_image.assert_called_once()\n"})}),"\n",(0,n.jsx)(t.p,{children:"Verifies that the capture_image method of the Camera class correctly captures an image and preprocesses it."}),"\n",(0,n.jsx)(t.h2,{id:"reactjs-tests",children:"React.js Tests"}),"\n",(0,n.jsx)(t.p,{children:"Video Feed"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"test('Test for Video Feed', () => {\n  render(<Home />);\n  const linkElement = screen.getByText(/Video Feed/i);\n  expect(linkElement).toBeInTheDocument();\n});\n"})}),"\n",(0,n.jsx)(t.p,{children:"Verifies if Video Feed is rendered on User Interface"}),"\n",(0,n.jsx)(t.p,{children:"Home Assistant Icon"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"test('Test for Home Assistant Icon', () => {\n  render(<Home />);\n  const linkElement = screen.getByText(/Home Assistant Icon/i);\n  expect(linkElement).toBeInTheDocument();\n});\n"})}),"\n",(0,n.jsx)(t.p,{children:"Verifies if Home Assistant Icon is rendered on User Interface"}),"\n",(0,n.jsx)(t.p,{children:"TV button"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"test('Test for TV Gesture Button', () => {\n  render(<Home />);\n  const linkElement = screen.getByText(/TV Gesture Button/i);\n  expect(linkElement).toBeInTheDocument();\n});\n"})}),"\n",(0,n.jsx)(t.p,{children:"Verifies if TV button is rendered on User Interface"}),"\n",(0,n.jsx)(t.p,{children:"Light button"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"test('Test for Light Gesture Button', () => {\n  render(<Home />);\n  const linkElement = screen.getByText(/Light Gesture Button/i);\n  expect(linkElement).toBeInTheDocument();\n});\n"})}),"\n",(0,n.jsx)(t.p,{children:"Verifies if Light button is rendered on User Interface"}),"\n",(0,n.jsx)(t.p,{children:"Alarm button"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"test('Test for Alarm Gesture Button', () => {\n  render(<Home />);\n  const linkElement = screen.getByText(/Alarm Gesture Button/i);\n  expect(linkElement).toBeInTheDocument();\n});\n"})}),"\n",(0,n.jsx)(t.p,{children:"Verifies if Alarm button is rendered on User Interface"}),"\n",(0,n.jsx)(t.p,{children:"Weather button"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"test('Test for Weather Gesture Button', () => {\n  render(<Home />);\n  const linkElement = screen.getByText(/Weather Gesture Button/i);\n  expect(linkElement).toBeInTheDocument();\n});\n"})}),"\n",(0,n.jsx)(t.p,{children:"Verifies if Weather button is rendered on User Interface"}),"\n",(0,n.jsx)(t.p,{children:"Thermostat button"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"test('Test for Thermostat Gesture Button', () => {\n  render(<Home />);\n  const linkElement = screen.getByText(/Thermostat Gesture Button/i);\n  expect(linkElement).toBeInTheDocument();\n});\n"})}),"\n",(0,n.jsx)(t.p,{children:"Verifies if Thermostat button is rendered on User Interface"}),"\n",(0,n.jsx)(t.p,{children:"Locks button"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"test('Test for Locks Gesture Button', () => {\n  render(<Home />);\n  const linkElement = screen.getByText(/Locks Gesture Button/i);\n  expect(linkElement).toBeInTheDocument();\n});\n"})}),"\n",(0,n.jsx)(t.p,{children:"Verifies if Locks button is rendered on User Interface"}),"\n",(0,n.jsx)(t.p,{children:"Reminders button"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"test('Test for Reminders Gesture Button', () => {\n  render(<Home />);\n  const linkElement = screen.getByText(/Reminders Gesture Button/i);\n  expect(linkElement).toBeInTheDocument();\n});\n"})}),"\n",(0,n.jsx)(t.p,{children:"Verifies if Reminders button is rendered on User Interface"}),"\n",(0,n.jsx)(t.p,{children:"To-do list button"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"test('Test for To-do List Gesture Button', () => {\n  render(<Home />);\n  const linkElement = screen.getByText(/To-do List Gesture Button/i);\n  expect(linkElement).toBeInTheDocument();\n});\n"})}),"\n",(0,n.jsx)(t.p,{children:"Verifies if To-do button is rendered on User Interface"})]})}function p(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},11151:(e,t,s)=>{s.d(t,{Z:()=>i,a:()=>r});var n=s(67294);const a={},c=n.createContext(a);function r(e){const t=n.useContext(c);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),n.createElement(c.Provider,{value:t},e.children)}}}]);