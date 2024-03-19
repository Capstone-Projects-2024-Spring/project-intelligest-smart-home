---
sidebar_position: 2
---

# Integration tests

## Use Case 1: Light control through ASL Gestures

```python
    def test_light_control_integration(self):
        home_assistant = Mock(spec=HomeAssistant)
        user_interface = Mock(spec=UserInterface)
        python_scripts = Mock(spec=PythonScripts)
        tpu = Mock(spec=TPU)
        intelligest_home = IntelliGestHome(home_assistant, user_interface, python_scripts, tpu)

        intelligest_home.connect_device()
        gesture = "Gesture for turning lights on/off"
        intelligest_home.detect_gesture(gesture)
        user_interface.display_feedback.assert_called_once()

        home_assistant.update_device_status.assert_called_once()
```

## Use Case 2: Weather seeking through Gestures

```python
        def test_weather_seeking_integration(self):
        home_assistant = Mock(spec=HomeAssistant)
        user_interface = Mock(spec=UserInterface)
        python_scripts = Mock(spec=PythonScripts)

        intelligest_home = IntelliGestHome(home_assistant, user_interface, python_scripts, tpu)
        gesture = "Gesture for seeking weather information"
        intelligest_home.detect_gesture(gesture)
        user_interface.display_feedback.assert_called_once()
        user_interface.display_processing.assert_called_once()

        user_interface.display_weather_info.assert_called_once()
```

## Use Case 3: Changing the Kitchen Light Color

```python
    def test_kitchen_light_color_change_integration(self):
        home_assistant = Mock(spec=HomeAssistant)
        user_interface = Mock(spec=UserInterface)
        python_scripts = Mock(spec=PythonScripts)
        tpu = Mock(spec=TPU)
        intelligest_home = IntelliGestHome(home_assistant, user_interface, python_scripts, tpu)

        gesture = "Gesture for changing kitchen light color"
        intelligest_home.detect_gesture(gesture)
        user_interface.display_feedback.assert_called_once()

        user_interface.display_processing.assert_called_once()
        home_assistant.update_device_status.assert_called_once_with("Kitchen Light", "Yellow")
```

## Use Case 4: Smart lock setup and control

```python
    def test_smart_lock_setup_and_control_integration(self):
        home_assistant = Mock(spec=HomeAssistant)
        user_interface = Mock(spec=UserInterface)
        python_scripts = Mock(spec=PythonScripts)
        tpu = Mock(spec=TPU)

        intelligest_home = IntelliGestHome(home_assistant, user_interface, python_scripts, tpu)
        smart_lock = Mock()
        intelligest_home.connect_device(smart_lock)

        user_interface.display_device_state.assert_called_once_with("Smart Lock", "Locked")
        intelligest_home.perform_action("Unlock Smart Lock")
        home_assistant.update_device_status.assert_called_once_with("Smart Lock", "Unlocked")
        intelligest_home.perform_action("Lock Smart Lock")
        home_assistant.update_device_status.assert_called_with("Smart Lock", "Locked")
```

## Use Case 5: Adding reminders through Gestures

```python
    def test_reminder_addition_integration(self):
        home_assistant = Mock(spec=HomeAssistant)
        user_interface = Mock(spec=UserInterface)
        python_scripts = Mock(spec=PythonScripts)
        tpu = Mock(spec=TPU)

        intelligest_home = IntelliGestHome(home_assistant, user_interface, python_scripts, tpu)

        gesture = "Gesture for adding reminder"
        intelligest_home.detect_gesture(gesture)

        user_interface.display_feedback.assert_called_once()
        user_interface.display_processing.assert_called_once()

        reminder_text = "Buy a couple of Milk Gallons"
        python_scripts.make_prediction.return_value = reminder_text

        user_interface.ask_for_confirmation.assert_called_once_with(reminder_text)

        confirmed = True
        intelligest_home.confirm_action(confirmed)
        python_scripts.add_reminder.assert_called_once_with(reminder_text)
```

## Use Case 6: Temperature adjustment with ASL

```python
    def test_temperature_adjustment_integration(self):

        home_assistant = Mock(spec=HomeAssistant)
        user_interface = Mock(spec=UserInterface)
        python_scripts = Mock(spec=PythonScripts)
        tpu = Mock(spec=TPU)

        intelligest_home = IntelliGestHome(home_assistant, user_interface, python_scripts, tpu)

        gesture = "Gesture for adjusting temperature"
        intelligest_home.detect_gesture(gesture)
        user_interface.display_feedback.assert_called_once()
        user_interface.display_processing.assert_called_once()

        temperature_change = "Hotter"
        python_scripts.make_prediction.return_value = temperature_change

        home_assistant.execute_automation.assert_called_once_with("Temperature Control", temperature_change)

        user_interface.display_confirmation.assert_called_once()
```

## Use Case 7: Changing Channels

```python
    def test_tv_channel_change_integration(self):
        home_assistant = Mock(spec=HomeAssistant)
        user_interface = Mock(spec=UserInterface)
        python_scripts = Mock(spec=PythonScripts)
        tpu = Mock(spec=TPU)

        intelligest_home = IntelliGestHome(home_assistant, user_interface, python_scripts, tpu)

        gesture = "Gesture for turning on TV"
        intelligest_home.detect_gesture(gesture)
        user_interface.display_feedback.assert_called_once()

        user_interface.display_processing.assert_called_once()

        channel = "Channel to be turned on"
        python_scripts.make_prediction.return_value = channel

        home_assistant.execute_automation.assert_called_once_with("TV Control", channel)
        user_interface.display_confirmation.assert_called_once()
```
