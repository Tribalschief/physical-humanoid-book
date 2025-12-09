# Isaac ROS & VSLAM

import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

<PersonalizeButton /> <TranslateButton />

# Isaac ROS GEMs

Hardware-accelerated ROS 2 packages that run on the Jetson Orin.

## VSLAM (Visual SLAM)
Using the stereo cameras to map a room and locate the robot within it, without GPS. 
`isaac_ros_visual_slam` provides a high-performance node for this, utilizing the Elbrus VSLAM library.

## Launching VSLAM
```bash
ros2 launch isaac_ros_visual_slam isaac_ros_visual_slam.launch.py camera_input:=/camera/stereo/image_raw
```

## Nvblox
For 3D reconstruction/occupancy grids, we use `nvblox` which processes depth maps on the GPU to create a costmap for Nav2 in real-time.