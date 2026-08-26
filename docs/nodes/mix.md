# Mix

The *Mix* node is one of the more fundamental nodes of the material graph. It lets you combine two or more textures or materials into a single material, with all the PBR channels mixed automatically for a convenient mixing experience.

<img src="/mix_node.png" alt="Mix node" style=" border-radius: 6px; margin: 16px 0 32px 0;" />

## Inputs

The *Mix* node has one default input:

* **New Layer** — the material you want to add as a layer. You can connect any material here.

When you connect a material to *New Layer*, the node automatically populates two new ghost inputs: one for the layer above the material you just connected, and one for the layer below it. You can keep adding materials to these inputs to build up a stack of layers.

The order of the inputs on the node determines layer mixing order.

## Parameters

The node has a set of parameters for each layer:

<img src="/mix_parameters.png" alt="Mix node parameters" style=" border-radius: 6px; margin: 16px 0 32px 0;" />

At the top of the node, you will see round bubbles with numbers. Each number corresponds to a layer, and you can click on them to switch between layers and change the parameters of that specific layer.

* **Disable This Layer** — excludes the layer from the mixing process. The layer will not be shown in the output of the node.
* **Opacity** — gradually makes the layer disappear. This is essentially a blendable *Disable This Layer* parameter.

* **Height Scale** — a multiplier for the height channel of the layer. Use it to make the layer height more pronounced or flatter.
* **Height Offset** — offsets the layer up or down in height. This is essentially the same as using a [Transform](/nodes/transform) node with *Height Offset*. For example, if you have pavement stones in sand, you can move the stones up and down inside sand.

<img src="/mix_height_offset_animation.webp" alt="Height Offset animation" style=" border-radius: 6px; margin: 16px 0 32px 0;" />

* **Add to Last Layer** — by default, the *Mix* node uses height mixing: the height channels of the layers stay exactly the same — no adding, multiplying, or any other mangling happens. The highest layer at any point is the one that gets shown. When you enable *Add to Last Layer*, the heights of the layers are combined instead. For example, if you add a bumpy noise texture on top of a very flat material, the height channels are added together, and it feels as if the bumpy noise texture is pushing the flat texture.

* **Cut at This Layer** — the selected layer is used as the uppermost layer. Anything above it is cut, and only the layers below it remain. For example, you can use it to cut a cone into a flatter shape using another simple PBR material made with the [Channels](/nodes/channels) node. Here is an [example asset](https://dev.artlets.co/asset/cutting-the-cone/6591?browse=1).

<img src="/cone_cutting.png" alt="Cutting the cone" style=" border-radius: 6px; margin: 16px 0 32px 0;" />

* **Channel blend modes** — up to five options that determine the mixing mode and factor for each individual channel. If your material contains *Base Color* and *Roughness*, you have settings for *Base Color* and *Roughness*. If it contains *Metallic* as well, you have a setting for *Metallicness*. Each channel has a *Blend Mode* and a *Factor*:
  * **Blend Mode** — determines how the channel of this layer is combined with the layer below. For example, you can just blend the *Base Color* on top of the bottom layer, multiply it with the bottom layer, or use any other blend mode.
  * **Factor** — determines how much the channel is used. For example, you can turn off a specific channel from mixing by setting the factor to `0`. If you don't want the *Roughness* of the top layer to override the bottom layer's *Roughness*, you just turn the factor to `0`, and only the bottom layer's *Roughness* will be output from the *Mix* node.

These settings are available on every single layer, however many you add — the *Mix* node supports 64 layers, and you can tune the settings for each one of them.
