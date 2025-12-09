# ROS 2 Architecture

import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

<PersonalizeButton /> <TranslateButton />

# ROS 2 Architecture

ROS 2 (Robot Operating System) is the middleware that acts as the nervous system for our robots. It provides a structured communication layer above the OS, allowing different parts of a robot (sensors, actuators, logic) to talk to each other.

## Key Concepts
- **Nodes**: Individual processes that perform computation. Each node should be responsible for a single, modular purpose (e.g., one node for controlling the wheel motors, one for laser ranging).
- **Topics**: Buses for nodes to exchange messages. Topics have anonymous publish/subscribe semantics, which decouples the production of information from its consumption.
- **Services**: A synchronous Request/Reply communication pattern. Use services for things that have a clear start and end, like 'Take a picture' or 'Move to coordinate X,Y'.
- **Actions**: Similar to services but for long-running tasks. They provide feedback (e.g., 'Moving... 50% complete') and can be canceled.

![ROS Node Diagram](https://docs.ros.org/en/humble/_images/Nodes-TopicandService.gif)
