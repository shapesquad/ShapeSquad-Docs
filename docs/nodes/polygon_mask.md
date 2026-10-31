# Polygon Mask

The *Polygon Mask* node draws a filled polygon as a black-and-white mask: `1` inside, `0` outside, with a smooth (antialiased) edge. Use it for straight-edged shapes such as triangles, stars, arrows, panels or cut corners.

## Outputs

* The main output — the polygon mask, from `0` to `1`.
* **Distance** — the signed distance to the edge of the polygon: positive inside, negative outside, `0` on the edge. It is measured in texture units, where the full width of the texture is `1`. Connect it to an [FCurve](/nodes/fcurve) node to turn the edge into a profile, such as a bevel.

## Parameters

* **Softness** — the width of a soft fade inside the edge, from `0` (a hard edge) to `0.5`, in texture units. You can also connect a value to it.
* **Invert** — inverts the mask, so that it is `0` inside and `1` outside. It also flips the sign of *Distance*.
* **Points** — the corners of the polygon, up to 256. The polygon closes from the last point back to the first one. Where its edges cross, the overlapping parts are left out (even-odd fill). Without points the mask is empty.

## Editing the polygon

The node properties show the polygon over the texture area:

* Drag a point to move it.
* Double-click a line to add a point there, or press **+ Point**.
* Select a point to type its **X** and **Y**, and press **Delete** to remove it.
* Scroll to zoom, drag the background to pan, and press **Fit** to show the whole polygon. You can drag the bottom of the view to change its height.

The coordinates go from `0` to `1` across the texture: **X** grows to the right and **Y** grows upwards, so `0, 0` is the bottom left corner and `1, 1` the top right one. These are the same coordinates as `u()` and `v()` in the [Math](/nodes/math) node.
