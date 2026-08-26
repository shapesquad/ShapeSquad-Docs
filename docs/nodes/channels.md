
# Channels

The *Channels* node lets you create a PBR material and decide what goes into its channels. It can be used to build a custom material from scratch, or to replace and modify the PBR channels of an existing material.

<img src="/channels_node.png" alt="Channels node" style=" border-radius: 6px; margin: 16px 0 32px 0;" />

## Inputs

The *Channels* node has one input:

* **Material** — the material whose channels you want to work with. You can connect any material here. By default, the connected material is passed through to the output of the node exactly as-is. The output only changes when you modify one of the channel parameters described below.

## Parameters

The node has one parameter for each PBR channel:

<img src="/channels_parameters.png" alt="Channels node parameters" style=" border-radius: 6px; margin: 16px 0 32px 0;" />

* **Output Base Color**
* **Output Height**
* **Output Roughness**
* **Output Metallic**
* **Output Opacity**

Each parameter controls which value is output for that channel. By default, every drop-down is set to the corresponding channel coming in from the *Material* input (for example, *Base Color* for *Output Base Color*). If the corresponding channel is not connected, the drop-down shows the channel as missing (for example, *Base Color (missing)*).

### Drop-down options

Each parameter drop-down offers the following options:

* **Default** — uses the default value for the channel, effectively removing it. The default values are: Base Color is middle gray, Roughness is `0.5`, Metallic is `0`, Height is `0`, and Opacity is `1`.
* **Custom** — lets you set the channel to a value of your own. You can either set it manually using the slider, or toggle the connection button on the right of the parameter and connect a value (for example, a noise texture to be used as roughness or height).
* **Base Color / Height / Roughness / Metallic / Opacity** — the corresponding channel of the connected *Material* input. These options let you shuffle values between channels. For example, you can output the *Roughness* as the *Base Color*, or output the *Height* as the color of the material you have connected to the *Material* input.

::: tip NOTE

You can't completely remove a channel, as some value is still needed for rendering the surface in the viewport. That's why there is no removal option but *Default* and *Custom* instead.
:::

## Examples

### Creating a custom material

To create a new basic PBR material, leave the *Material* input unconnected and set each channel you need to *Custom* with the values you want. This works like a Principled BSDF node in Blender.

### Removing a channel

Connect a material, then set the channel you don't want to use to *Default* or *Custom*. The channel is effectively removed from the material, or replaced with a simple value of your choice. 

### Adding a channel

Connect a material that is missing a channel (for example, a material with no height). Under *Output Height*, set the parameter to *Custom*, enable the connection button, and connect a node such as a noise texture. This adds a height channel to your PBR material.

::: tip NOTE

For separating a material into its individual channels, inspecting them, and combining them into new materials, you can also use the [Separate Material](/nodes/separate_material) and [Combine Material](/nodes/combine_material) nodes.
:::

