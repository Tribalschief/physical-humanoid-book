# VLA Models

import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

<PersonalizeButton /> <TranslateButton />

# Vision-Language-Action Models

The convergence of LLMs and Robotics has led to VLA models like Google's RT-2.

## The Concept
Instead of separate modules for perception, planning, and control, a VLA model takes images and text instructions as input and directly outputs robot actions (tokenized).

> 'Pick up the apple' -> [MOVE_ARM_X, GRASP, LIFT] .