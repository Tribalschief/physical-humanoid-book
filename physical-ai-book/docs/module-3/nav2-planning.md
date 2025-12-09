# Nav2 Path Planning

import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

<PersonalizeButton /> <TranslateButton />

# Nav2 for Humanoids

Nav2 is the navigation stack for ROS 2. It takes a current pose and a goal pose and outputs velocity commands to drive the robot.

## Humanoid Challenges
Unlike wheeled robots, humanoids must balance. Nav2 usually outputs `cmd_vel` (linear/angular velocity), which a 'Walking Controller' must translate into joint movements.