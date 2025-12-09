# URDF and Humanoids

import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

<PersonalizeButton /> <TranslateButton />

# Unified Robot Description Format (URDF)

To simulate a robot, we must first describe its physical structure. URDF is an XML format used in ROS to describe the kinematics, inertial properties, and visual/collision geometry of robots.

## Structure
- **Links**: The rigid parts of the robot (e.g., forearm, hand).
- **Joints**: The moving connections between links (e.g., elbow hinge).

For humanoid robots, the URDF file can be extremely complex, defining dozens of joints for fingers, legs, and neck.