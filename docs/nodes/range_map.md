# Range Map

The *Range Map* node lets you remap a value range to another value range. Visually, this usually means that you either decrease or increase the contrast or the overall brightness of a texture.

<img src="/range_map_node.png" alt="Range Map node" style=" border-radius: 6px; margin: 16px 0 32px 0;" />

## Inputs

The *Range Map* node has one default input:

* **Material** — the material whose values you want to remap. You can connect any material here. By default, the node works on all the channels of a PBR material.

## Parameters

The node has four parameters:

<img src="/range_map_parameters.png" alt="Range Map node parameters" style=" border-radius: 6px; margin: 16px 0 32px 0;" />

* **From Min** — the minimum value of the incoming range.
* **From Max** — the maximum value of the incoming range.
* **To Min** — the minimum value of the outgoing range.
* **To Max** — the maximum value of the outgoing range.

The parameters form two logical groups: the *min* group (*From Min* and *To Min*) and the *max* group (*From Max* and *To Max*).

## How it works

By default, *From Min* is `0` and *To Min* is `0`, which means the value `0` in your incoming texture is translated to `0` in the outgoing texture — essentially, no change. The same goes for the max group: if *From Max* is `1`, the value `1` in your incoming texture is translated to *To Max*, which is `1` by default. So there is no change either.

To increase the contrast of your incoming texture, you can set *From Min* to `0.2` and *From Max* to `0.8`. This means that `0.2` — a darkish gray brightness in the original texture — will be translated to pitch black `0` (*To Min*), and `0.8` (*From Max*) will be translated to `1` (*To Max*). So the brightness that was already at `0.8` is pushed to the maximum possible, and the contrast of the outgoing texture is increased.

## Use cases

Besides adjusting the contrast and brightness of textures, the *Range Map* node is a good fit for:

* Changing the size of SDF shapes, such as rectangles, polygons, and circles.
* Increasing or decreasing the contrast of roughness maps, such as imperfection textures and noises.
