# Separate Material

The *Separate Material* node lets you split a PBR material into its individual channels. You could also achieve everything this node does with the [Channels](/nodes/channels) node, so this one is included for convenience.

<img src="/combine_separate_node.png" alt="Separate Material node" style=" border-radius: 6px; margin: 16px 0 32px 0;" />

## Inputs

The *Separate Material* node has one input:

* **Material** — the PBR material you want to split into its channels. You can connect any material here.

## Outputs

The node has one output for each PBR channel:

* **Base Color** — the base color channel of the connected material.
* **Roughness** — the roughness channel of the connected material.
* **Metallic** — the metallic channel of the connected material.
* **Height** — the height channel of the connected material.
* **Opacity** — the opacity channel of the connected material.

Each output passes through the corresponding channel of the material connected to the *Material* input.

## Use cases

The *Separate Material* node is a good fit for:

* Extracting a single channel from a material for further processing. For example, you can take the *Height* channel of a material and feed it into a [Range Map](/nodes/range_map) node to increase its contrast, and then feed back into a new material with the [Combine Material](/nodes/combine_material) node.
* Inspecting the individual channels of a material.

::: tip NOTE

Everything the *Separate Material* node does can also be achieved with the [Channels](/nodes/channels) node. These nodes are included for convenience, as they can be easier to understand in some cases.
:::
