# Transform

The *Transform* node lets you move a material in UV space and offset it in height.

<img src="/transform_node.png" alt="Transform node" style=" border-radius: 6px; margin: 16px 0 32px 0;" />

## Inputs

The *Transform* node has one default input:

* **Input** — the material you want to move. You can connect any material here.

## Parameters

The node has a set of parameters that determine how the material is moved:

<img src="/transform_parameters.png" alt="Transform node parameters" style=" border-radius: 6px; margin: 16px 0 32px 0;" />

* **Translate X** — moves the material along the U axis. The value goes from `-1` to `1`, as there is no point in moving it further — that would go out of the UV range.
* **Translate Y** — moves the material along the V axis. The value goes from `-1` to `1`.
* **Scale** — changes the scale of the material. The value goes from `0.01` to `100`.
* **Scale Aspect** — squeezes the material vertically or horizontally.
* **Rotation** — rotates the material around the Z axis.
* **Height Scale** — multiplies the height of the material. A normal map of the material gets stronger or weaker by the same amount, and a negative value flips it along with the height. This parameter is grayed out if the connected material has neither a height nor a normal channel.
* **Height Offset** — adds a value to the height of the material, offsetting it up or down. For example, if you have some ceramic tiles in sand, you can move the tiles up and down inside of the sand to get the look you like.
* **Repeat mode** — applies to the areas of the material that get revealed once you have moved the material away from the main UV area or scaled it down. The available modes are:
  * **None** — no tiling behavior. The material is simply removed outside of the UV area.
  * **Clamp to Edge** — the edge pixel is repeated. This is useful for transparent assets, for example, as the transparency gets extended even if you scale the material down.
  * **Repeat** — the material repeats and starts to tile.
* **Scale Normals** — when on (the default), the normal channel follows the transform the way the height does: it rotates with the material, follows **Scale Aspect** and gets stronger or weaker with **Height Scale**, so it keeps matching the normal derived from the transformed height. When off, normals only rotate with the material and flip with a negative **Height Scale**. Graphs saved before this option existed, and the graphs created when you import images, keep it off, so imported normal maps keep the strength they were made with. This parameter is grayed out if the connected material has no normal channel.

## Viewport shortcuts

When the *Transform* node is selected, you can use the following shortcuts to manipulate the material in the viewport:

* **G** — move the material
* **R** — rotate the material
* **S** — scale the material
