# Combine Material

The *Combine Material* node lets you combine separate textures into a single PBR material. It is the exact reverse of the [Separate Material](/nodes/separate_material) node. You could also achieve everything this node does with the [Channels](/nodes/channels) node, so this one is included for convenience.

<img src="/combine_separate_node.png" alt="Combine Material node" style=" border-radius: 6px; margin: 16px 0 32px 0;" />

## Inputs

The *Combine Material* node has one input for each PBR channel:

* **Base Color** — the base color of the material you want to build. You can connect any texture or value here.
* **Roughness** — the roughness of the material. You can connect any texture or value here.
* **Metallic** — the metallicness of the material. You can connect any texture or value here.
* **Height** — the height of the material. You can connect any texture or value here.
* **Opacity** — the opacity of the material. You can connect any texture or value here.

## Outputs

The node has one output:

* **Material** — the PBR material built from the channels you connected.

## Use cases

The *Combine Material* node is a good fit for:

* Building a PBR material from separate textures. For example, you can connect a color texture, a roughness texture, and a height texture to the corresponding inputs and get a single material out of the node.
* Working in combination with the [Separate Material](/nodes/separate_material) node, to use the color of another material as the height of a new one, for example.

::: tip NOTE

Everything the *Combine Material* node does can also be achieved with the [Channels](/nodes/channels) node. These nodes are included for convenience, as they can be easier to understand in some cases.
:::
