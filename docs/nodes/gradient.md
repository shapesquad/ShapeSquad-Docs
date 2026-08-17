# Gradient

The *Gradient* node lets you translate a grayscale value into a color value. It is generally used to remap black-and-white values (such as a noise texture) into a custom color palette.

<img src="/gradient_node.png" alt="Gradient node" style=" border-radius: 6px; margin: 16px 0;" />

## Inputs

The *Gradient* node has one input:

* **Source** — the grayscale value to translate into a color. You can connect any grayscale source here, such as a noise texture.

## The gradient ramp

The node features a gradient ramp going from left to right. The leftmost position of the ramp corresponds to the darkest value of the input (`0`), and the rightmost position corresponds to the brightest value (`1`).

The ramp comes with two pre-existing points. You can drag the handles of these points to increase or decrease the contrast of the incoming grayscale value. Clicking on any part of the ramp adds a new point at that position, which you can then move and adjust. There is no limit to the number of points you can have on the ramp.

## Point parameters

Each point on the gradient has the following parameters:

<img src="/gradient_parameters.png" alt="Gradient node parameters" style=" border-radius: 6px; margin: 16px 0;" />

* **Position** — the position of the point on the ramp. You can also change it by sliding the point along the ramp. It expresses the grayscale brightness that will be translated into a color.
* **Interpolation** — determines how the color from the neighboring point on the ramp blends into the color of this point. The available modes are:
  * **Step** — a harsh cut between the colors of neighboring points.
  * **Linear** — the color gradually and linearly progresses from the color of one point to the color of the next.
  * **Smooth Step** — a more natural blend between the colors of the two points.
* **Color** — the color that the grayscale brightness of this point's position will be translated into.
* **Remove** — removes the point from the ramp.
