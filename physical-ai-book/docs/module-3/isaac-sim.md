# NVIDIA Isaac Sim

import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

<PersonalizeButton /> <TranslateButton />

# NVIDIA Isaac Platform

NVIDIA Isaac Sim is built on the Omniverse platform and enables photorealistic simulation with RTX efficiency.

## Installing Isaac Sim
1. Download NVIDIA Omniverse Launcher.
2. Install "Isaac Sim" from the Exchange.
3. Ensure your drivers are 535+.

## USD Assets
Isaac Sim uses Universal Scene Description (USD) files. You can drag and drop robots like the Unitree Go2 directly from the Asset Browser.

## Python API (OmniKit)
```python
from omni.isaac.core import World
from omni.isaac.core.objects import DynamicCuboid
import numpy as np

world = World()
world.scene.add_default_ground_plane()
cube = world.scene.add(
    DynamicCuboid(
        prim_path="/World/Cube",
        name="cube",
        position=np.array([0, 0, 1.0]),
        scale=np.array([0.5, 0.5, 0.5])
    )
)
world.reset()
for i in range(500):
    world.step(render=True)
```