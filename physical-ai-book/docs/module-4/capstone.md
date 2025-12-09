# Capstone: Autonomous Humanoid

import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

<PersonalizeButton /> <TranslateButton />

# Capstone Project

**Goal**: Design a simulated robot that receives voice commands and manipulates objects.

## Pipeline
1. **Voice**: OpenAI Whisper converts speech to text.
2. **Plan**: GPT-4 generates a high-level plan ('Go to kitchen', 'Find apple').
3. **Navigation**: Nav2 moves the robot to the kitchen.
4. **Vision**: YOLO or OwL-ViT identifies the apple.
5. **Action**: MoveIt 2 plans the arm trajectory to grasp the apple.