# Simulating Sensors

import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

<PersonalizeButton /> <TranslateButton />

# Simulating Physical Sensors

To bridge the Sim-to-Real gap, our virtual robot must have the same senses as the physical one.

### LiDAR Simulation
Gazebo uses plugins to simulate sensors. Here is a Ray Sensor logic:
```xml
<sensor type="ray" name="head_hokuyo_sensor">
  <pose>0 0 0 0 0 0</pose>
  <visualize>true</visualize>
  <update_rate>40</update_rate>
  <ray>
    <scan>
      <horizontal>
        <samples>720</samples>
        <resolution>1</resolution>
        <min_angle>-1.570796</min_angle>
        <max_angle>1.570796</max_angle>
      </horizontal>
    </scan>
    <range>
      <min>0.10</min>
      <max>30.0</max>
      <resolution>0.01</resolution>
    </range>
  </ray>
  <plugin name="gazebo_ros_head_hokuyo_controller" filename="libgazebo_ros_ray_sensor.so">
    <ros>
      <namespace>/humanoid</namespace>
      <remapping>~/out:=scan</remapping>
    </ros>
    <output_type>sensor_msgs/LaserScan</output_type>
  </plugin>
</sensor>
```
