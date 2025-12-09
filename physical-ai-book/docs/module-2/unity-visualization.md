# Unity for Visualization

import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

<PersonalizeButton /> <TranslateButton />

# Unity and ROS 2

Unity provides High-Fidelity Rendering that Gazebo lacks. This is crucial for Human-Robot Interaction (HRI).

## Setup
1. Install Unity Hub.
2. Create a new 3D URP Project.
3. Import the `ROS-TCP-Connector` package.
4. In Unity, set the ROS IP to your local machine (127.0.0.1) and Port 10000.
5. In ROS 2, run the endpoint: `ros2 run ros_tcp_endpoint default_server_endpoint`.

Now you can visualize topics directly in Unity's Scene view.