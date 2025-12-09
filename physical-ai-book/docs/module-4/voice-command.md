# Voice & Conversion

import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

<PersonalizeButton /> <TranslateButton />

# Conversational Robotics Pipeline

## 1. Whisper (Speech to Text)
Run Whisper on the Jetson Orin using `whisper.cpp` for real-time performance.

## 2. LLM Planner (Agent)
The LLM receives the prompt:
"You are a robot controller. Available actions: [navigate(loc), pick(obj), place(loc)]. User says: 'Put the cup in the sink'."

**Output:**
1. `navigate("table")`
2. `pick("cup")`
3. `navigate("sink")`
4. `place("sink")`
