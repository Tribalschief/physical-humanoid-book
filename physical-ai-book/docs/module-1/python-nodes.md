# Building ROS 2 Packages

import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

<PersonalizeButton /> <TranslateButton />

# Building ROS 2 Packages with Python

We use `rclpy` to bridge Python AI agents with robotic hardware.

## Workspace Setup
```bash
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python my_physical_ai_pkg
cd ~/ros2_ws
colcon build
source install/setup.bash
```

## Writing a Controller Node
This node listens to sensor data and publishes motor commands.
```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
import random

class HumanoidWalker(Node):
    def __init__(self):
        super().__init__('humanoid_walker')
        self.pub = self.create_publisher(Twist, '/cmd_vel', 10)
        self.timer = self.create_timer(0.1, self.move)
        self.get_logger().info("Walker Node Started")

    def move(self):
        msg = Twist()
        # Simulate simple walking logic
        msg.linear.x = 0.5  # Walk forward
        msg.angular.z = random.uniform(-0.1, 0.1) # Balance correction
        self.pub.publish(msg)

def main(args=None):
    rclpy.init(args=args)
    node = HumanoidWalker()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()
```
