# ROS 2 Fundamentals

import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

<PersonalizeButton /> <TranslateButton />

# ROS 2 Fundamentals

ROS 2 (Robot Operating System) is the middleware that acts as the nervous system for our robots. It adopts a Data Distribution Service (DDS) standard for real-time communication.

## Core Concepts

### 1. Nodes
A **Node** is a single process that performs a specific computation. In a humanoid, you might have one node for the camera driver, one for face detection, and one for motor control.

### 2. Topics
Nodes communicate via **Topics** (Publish/Subscribe). 
- The Camera Node *publishes* images to the `/camera/image_raw` topic.
- The Face Detection Node *subscribes* to that topic.

### 3. Services
Services use a Request/Response model. Use them for actions that terminate quickly, like `reset_simulation` or `calibrate_sensors`.

## Practical: Installing ROS 2 Humble
```bash
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

sudo apt install software-properties-common
sudo add-apt-repository universe

sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

sudo apt update
sudo apt install ros-humble-desktop
```