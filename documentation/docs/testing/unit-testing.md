---
sidebar_position: 1
---
# Unit tests

## Class Home Assistant:

Method +add_device()

```python
def test_add_device(self):

        device = Mock()
        home_assistant = HomeAssistant()
        
        device_name = "TV"
        
        expected_devices_length = len(home_assistant.devices) + 1
        
        home_assistant.add_device(device_name, device)
        
        self.assertEqual(len(home_assistant.devices), expected_devices_length)
```

Method +remove_device()

```python
def test_remove_device(self):
        home_assistant = HomeAssistant()
        home_assistant.devices = {"TV": Mock(), "Alarm": Mock()}
    
        device_name = "TV"
    
        expected_devices_length = len(home_assistant.devices) - 1
        
        home_assistant.remove_device(device_name)
    
        self.assertEqual(len(home_assistant.devices), expected_devices_length)
```

Method +update_device_status()

```python
def test_update_device_status(self):
        home_assistant = HomeAssistant()
        home_assistant.devices = {"TV": Mock()}
        
        device_name = "TV"
        new_status = "ON"
        
        home_assistant.update_device_status(device_name, new_status)

        self.assertEqual(home_assistant.devices[device_name].status, new_status)
```

Method +execute_automation()

```python
def test_execute_automation(self):
        home_assistant = HomeAssistant()
        automation = Mock()
        
        device_name = "TV"

        expected_automation_executed = True
        
        result = home_assistant.execute_automation(device_name, automation)
        
        self.assertEqual(result, expected_automation_executed)
```

## Class User Interface:

Method +send_command()

```python
def test_send_command(self):
        home_assistant = Mock()
        user_interface = UserInterface(home_assistant)
        
        command = "Turn on TV"
        
        expected_command_sent = True
        
        result = user_interface.send_command(command)
        
        self.assertEqual(result, expected_command_sent)
```

Method +display_device_state():

```python
def test_display_device_state(self):
        home_assistant = Mock()
        user_interface = UserInterface(home_assistant)
        home_assistant.devices = {"TV": Mock()}

        device_name = "TV"
        device_state = "ON"
        
        expected_device_state_displayed = True
        
        result = user_interface.display_device_state(device_name, device_state)
        
        self.assertEqual(result, expected_device_state_displayed)    
```

## Class Device 

Method +update_status():

```python
def test_update_status(self):
        device = Device("123", "Light")
        new_status = "ON"
        expected_status_updated = True
        
        result = device.update_status(new_status)
        
        self.assertEqual(result, expected_status_updated)
        self.assertEqual(device.status, new_status)
```

Method +execute_capability():

```python
def test_execute_capability(self):
        device = Device("456", "Thermostat")
        capability = "SetTemperature"
        value = 23

        expected_capability_executed = True
        
        result = device.execute_capability(capability, value)
        self.assertEqual(result, expected_capability_executed)
```

## Class PythonScripts:

Method +load_model():

```python
def test_load_model(self):
        python_scripts = PythonScripts()
        model_path = "model.tflite"
        expected_model_loaded = True
        
        result = python_scripts.load_model(model_path)
        self.assertEqual(result, expected_model_loaded)
```

Method +capture_image():

```python
def test_capture_image(self):
        python_scripts = PythonScripts()
        expected_image_captured = True
    
        result = python_scripts.capture_image()
        self.assertEqual(result, expected_image_captured)
```

Method +preprocess_image():

```python
def test_preprocess_image(self):
        python_scripts = PythonScripts()
        image = Mock()
        expected_image_preprocessed = True

        result = python_scripts.preprocess_image(image)
        self.assertEqual(result, expected_image_preprocessed)
```

Method +make_prediction():

```python
def test_make_prediction(self):
        python_scripts = PythonScripts()
        image = Mock()
        expected_prediction = "A"
        prediction = python_scripts.make_prediction(image)
        
        self.assertEqual(prediction, expected_prediction)
```

## Class JavaScript Custom Cards

Method +create_card(): 

```python
def test_create_card(self):
        javascript_custom_cards = JavaScriptCustomCards()
        card_id = "asl_card"
        expected_card_created = True

        result = javascript_custom_cards.create_card(card_id)
        self.assertEqual(result, expected_card_created)
```

Method +display_image():

```python
def test_display_image(self):

        javascript_custom_cards = JavaScriptCustomCards()
        card_id = "asl_card"

        image_url = "https://example.com/asl_image.jpg"

        expected_image_displayed = True
    
        result = javascript_custom_cards.display_image(card_id, image_url)
    
        self.assertEqual(result, expected_image_displayed)
```

Method +update_display_state():

```python
def test_update_display_state(self):
        javascript_custom_cards = JavaScriptCustomCards()
        card_id = "asl_card"
        new_display_state = "show"
        expected_display_state_updated = True
        
        result = javascript_custom_cards.update_display_state(card_id, new_display_state)
        
        self.assertEqual(result, expected_display_state_updated)
```

## Class Camera

Method +capture_image():

```python
def test_capture_image(self):

        camera = Camera()
        python_scripts = Mock()
        camera.python_scripts = python_scripts
        
        expected_image_captured = True

        result = camera.capture_image()

        self.assertEqual(result, expected_image_captured)
        python_scripts.preprocess_image.assert_called_once()
```

## Class TPU 

Method +load_model():

```python
def test_load_model(self):
        tpu = TPU()
        expected_model_loaded = True
        result = tpu.load_model()

        self.assertEqual(result, expected_model_loaded)
```

Method +make_prediction():

```python
def test_make_prediction(self):
        tpu = TPU()
        preprocessed_image = Mock()
        expected_prediction = "A"
        prediction = tpu.make_prediction(preprocessed_image)
        
        self.assertEqual(prediction, expected_prediction)
```

## React.js Tests

Video Feed

```javascript
test('Test for Video Feed', () => {
  render(<App />);
  const linkElement = screen.getByText(/Video Feed/i);
  expect(linkElement).toBeInTheDocument();
});
```

Home Assistant Icon

```javascript
test('Test for Home Assistant Icon', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home Assistant Icon/i);
  expect(linkElement).toBeInTheDocument();
});
```

TV button

```javascript
test('Test for TV Gesture Button', () => {
  render(<App />);
  const linkElement = screen.getByText(/TV Gesture Button/i);
  expect(linkElement).toBeInTheDocument();
});
```

Light button

```javascript
test('Test for Light Gesture Button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Light Gesture Button/i);
  expect(linkElement).toBeInTheDocument();
});
```

Alarm button

```javascript
test('Test for Alarm Gesture Button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Alarm Gesture Button/i);
  expect(linkElement).toBeInTheDocument();
});
```

Weather button

```javascript
test('Test for Weather Gesture Button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Weather Gesture Button/i);
  expect(linkElement).toBeInTheDocument();
});
```

Thermostat button

```javascript
test('Test for Thermostat Gesture Button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Thermostat Gesture Button/i);
  expect(linkElement).toBeInTheDocument();
});
```

Locks button

```javascript
test('Test for Locks Gesture Button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Locks Gesture Button/i);
  expect(linkElement).toBeInTheDocument();
});
```

Reminders button

```javascript
test('Test for Reminders Gesture Button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Reminders Gesture Button/i);
  expect(linkElement).toBeInTheDocument();
});
```

To-do list button

```javascript
test('Test for To-do List Gesture Button', () => {
  render(<App />);
  const linkElement = screen.getByText(/To-do List Gesture Button/i);
  expect(linkElement).toBeInTheDocument();
});
```





