# Normal Adjust

The *Normal Adjust* node changes the strength of a normal map and converts normal maps between the DirectX and OpenGL conventions.

## Inputs

The *Normal Adjust* node has one input:

* **Normal** — the normal map you want to adjust (OpenGL convention, components encoded from `0` to `1`).

## Parameters

* **Intensity** — scales the slopes of the normal map. `1` keeps the normal map as it is, `2` makes the bumps twice as steep, `0.5` halves them and `0` makes the surface flat.
* **Invert X** — flips the red (X) component, so that the light seems to come from the opposite side horizontally.
* **Invert Y** — flips the green (Y) component. This converts a DirectX normal map to the OpenGL convention used by Artlets, and back. If the bumps of an imported normal map look like dents, turn this on.
* **Normalize** — on by default: the result is scaled back to a valid normal of length `1`, so that *Intensity* changes the steepness of the slopes exactly. When off, *Intensity* only scales the red and green components and the result is not renormalized; with *Intensity* at `1` the normal map then passes through unchanged apart from the flips.

The alpha (coverage) of the normal map is kept.
