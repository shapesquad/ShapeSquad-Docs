# FCurve

The *FCurve* node remaps a grayscale value through a curve that you draw, like an animation curve: the input value is read along the horizontal axis and the output is the height of the curve at that point. Use it to shape a gradient, change the contrast or falloff of a mask, or make a height profile.

## Inputs

The *FCurve* node has one input:

* **Input** — the grayscale value to remap. When nothing is connected, the node shows the curve applied to a left-to-right ramp across the texture, so you can see its shape.

## The curve

A new node has two points, at `0, 0` and `1, 1`: a straight line that passes the input through unchanged. Up to 64 points can be added. Without any points, the input passes through.

* Drag a point to move it.
* Double-click the curve to add a point there, or press **+ Point**.
* Select a point to type its **X** and **Y**, and press **Delete** (or the Delete key) to remove it.
* Drag the handles of the selected point to change the shape of the curve next to it.
* Scroll to zoom, drag the background to pan, and press **Fit** to show the whole curve. Drag the bottom-right corner of the view to change its height.

## Point parameters

* **Interpolation** — how the curve goes from this point to the next one:
  * **Constant** — keeps the value of this point until the next point.
  * **Linear** — a straight line to the next point.
  * **Bezier** — a smooth curve shaped by the handles (the default).
* **Handles** — how the handles of the point are set:
  * **Auto** — smooth handles set automatically from the neighbouring points. At a highest or lowest point the curve is flat, so it does not overshoot. This is the default.
  * **Aligned** — the two handles stay on one line, so the curve stays smooth through the point. Dragging a handle of an *Auto* point makes it *Aligned*.
  * **Free** — the two handles move independently, which allows a sharp corner.

## Parameters

* **Extrapolation** — what the curve does before its first point and after its last one, shown as dashed lines:
  * **Constant** — keeps the value of the end point (the default).
  * **Linear** — continues in the direction the curve has at the end point.

## Examples

* **Bevel** — connect the *Distance* output of a [Polygon Mask](/nodes/polygon_mask) node to the *FCurve* input. Put a point at `0, 0` (the edge) and one at a small distance inside, such as `0.05, 1`, and use the result as height. Shape the curve between them for a rounded or stepped edge.
* **Gradient shape** — put an *FCurve* node between a grayscale ramp and a [Gradient](/nodes/gradient) node to change how the colors are spread.
* **Mask falloff** — put an *FCurve* node after a mask to make its transitions softer or sharper.
