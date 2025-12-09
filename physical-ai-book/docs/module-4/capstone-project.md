# Capstone: The Autonomous Humanoid

import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

<PersonalizeButton /> <TranslateButton />

# Capstone Project: Home Service Robot

**Scenario**: Robot starts in Living Room. Needs to tidy up.

## Requirements
1. **Mapping**: Use SLAMtoolbox to map the apartment in Gazebo/Isaac Sim.
2. **Navigation**: Use Nav2 to autonomously move between rooms.
3. **Perception**: Use YOLOv8 to detect "Toys" on the floor.
4. **Manipulation**: Use MoveIt 2 to plan a grasp for the toy and drop it in the "Toy Box".

## Grading
- 80%: Functionality (Does it pick up the toy?)
- 20%: Code Quality (ROS 2 best practices, Launch files, README).