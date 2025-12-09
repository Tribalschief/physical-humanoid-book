# Vision-Language-Action Models

import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

<PersonalizeButton /> <TranslateButton />

# Vision-Language-Action (VLA)

Traditional robotics uses separate modules (Vision -> Planning -> Control). VLA models (like RT-2) merge these into a single Transformer model.

## Tokenizing Action
The key breakthrough is treating robot actions as "words" (tokens). 
- Input: Image Tokens + Text Tokens ("Pick up apple")
- Output: Text Tokens + Action Tokens (End-Effector Pose Change)

## Open Source VLAs
- **OpenVLA**: A Llama-3 based model fine-tuned on the BridgeV2 dataset.
- **Octo**: A transformer-based policy trained on 800k trajectories.
