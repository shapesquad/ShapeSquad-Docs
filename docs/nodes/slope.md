# Slope

The *Slope* node makes a mask from the steepness of a normal map, or from the direction its surface faces. Use it, for example, to put moss on flat tops, rock on steep sides, or snow on surfaces facing up.

## Inputs

The *Slope* node has one input:

* **Normal** — the normal map to measure (OpenGL convention), for example from a *Height To Normal* node or the normal channel of a material.

## Parameters

* **Angle** — the angle, in degrees, between the surface normal and the *Direction* where the mask is `0.5`.
* **Softness** — the width, in degrees, of the transition from `0` to `1` around *Angle*. `0` gives a hard edge. With the defaults (*Angle* 45°, *Softness* 90°) the mask is simply the angle divided by 90°: `0` on flat areas and `1` on vertical ones.
* **Invert** — inverts the mask, so that it is `1` below the angle and `0` above it.
* **Direction** — the direction the angle is measured from, as **X**, **Y** and **Z**. The default is straight up from the surface (`0, 0, 1`), which makes the mask the slope of the surface. Another direction masks the areas facing away from it, or, with *Invert* on, the areas facing it: for example `0, 1, 0` with *Invert* on, *Angle* 60° and *Softness* 20° picks out the slopes that face up the texture (+Y in the OpenGL convention).

Transparent (uncovered) parts of the normal map count as flat.
