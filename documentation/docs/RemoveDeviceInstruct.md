1. **Remove MQTT Configuration for Devices:**

   - If you've configured MQTT devices manually in your `configuration.yaml` file, you can remove those configurations.
   
     - Open your `configuration.yaml` file using a text editor.
     - Locate the section where MQTT devices are configured. This could be under `mqtt:`, or if you're using MQTT discovery, you might not have specific device configurations in your `configuration.yaml`.
     - Remove the configurations related to the devices you want to disconnect. This could include topics, payload configurations, etc.
     - Save the file and restart Home Assistant for the changes to take effect.

2. **Disable MQTT Discovery:**

   - If you're using MQTT discovery, which allows devices to be automatically discovered and added to Home Assistant, you can disable this feature.
   
     - Open your `configuration.yaml` file.
     - If you have `discovery:` enabled, comment it out by adding a `#` at the beginning of the line, or set it to `false`.
     - Save the file and restart Home Assistant for the changes to take effect.

3. **Remove MQTT Entities:**

   - If you want to remove specific MQTT entities from Home Assistant:
   
     - Go to the "Developer Tools" section in Home Assistant.
     - Select "States" to view all entities.
     - Find the MQTT entities you want to remove.
     - Click on the entity to open its details.
     - Click on the settings icon and select "Delete" to remove the entity.

4. **Remove MQTT Integration:**

   - If you want to completely remove the MQTT integration from Home Assistant:
   
     - Navigate to the Integrations page in Home Assistant.
     - Find and click on the MQTT integration.
     - Click on the settings icon (usually three vertical dots) and select "Delete."
     - Confirm the deletion.
