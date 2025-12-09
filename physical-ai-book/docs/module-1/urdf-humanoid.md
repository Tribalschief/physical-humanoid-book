# URDF and Kinematics

import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

<PersonalizeButton /> <TranslateButton />

# Unified Robot Description Format (URDF)

URDF files describe the physical properties of your robot using XML.

## Humanoid Structure
A humanoid URDF includes links (bones) and joints (motors).

```xml
<robot name="simple_humanoid">
  <!-- Torso Link -->
  <link name="torso">
    <visual>
      <geometry>
        <box size="0.3 0.5 0.2"/>
      </geometry>
    </visual>
  </link>

  <!-- Neck Joint -->
  <joint name="neck_joint" type="revolute">
    <parent link="torso"/>
    <child link="head"/>
    <origin xyz="0 0.3 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-1.57" upper="1.57" effort="10" velocity="1.0"/>
  </joint>
</robot>
```

## Forward vs Inverse Kinematics
- **Forward Kinematics (FK)**: Given joint angles (e.g., Elbow 90°), where is the hand?
- **Inverse Kinematics (IK)**: Check "MoveIt 2" module. Given "Hand at (x,y,z)", what are the joint angles?
