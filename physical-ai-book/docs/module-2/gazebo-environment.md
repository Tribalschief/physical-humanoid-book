# Gazebo Simulation

import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

<PersonalizeButton /> <TranslateButton />

# Robot Simulation with Gazebo

Gazebo is the standard for physics-based robot simulation. It handles Rigid Body Dynamics (Gravity, Inertia), Battery consumption, and Sensor noise generation.

## Launching Gazebo
```bash
sudo apt install ros-humble-gazebo-ros-pkgs
ros2 launch gazebo_ros gazebo.launch.py
```

## Creating Worlds (SDF)
We use SDF (Simulation Description Format) to define the environment.
```xml
<sdf version="1.6">
  <world name="default">
    <include>
      <uri>model://sun</uri>
    </include>
    <include>
      <uri>model://ground_plane</uri>
    </include>
    <!-- Add obstacles here -->
  </world>
</sdf>
```
