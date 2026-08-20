# Normalize

The *Normalize* node lets you automatically remap the values of an input texture between `0` and `1`. It finds the darkest and the brightest spot in the image and stretches them to the full available contrast range, so that the darkest spot becomes `0` in brightness and the brightest spot becomes `1`.

<img src="/normalize_node.png" alt="Normalize node" style=" border-radius: 6px; margin: 16px 0;" />

## Inputs

The *Normalize* node has one input:

* **Input** — the texture whose values you want to normalize. You can connect any texture here.

## How it works

Whatever you connect to the *Input*, the node analyzes the texture and finds its minimum and maximum brightness. The darkest spot in the image is remapped to `0`, and the brightest spot is remapped to `1`. Everything in between is stretched proportionally, so the outgoing texture uses the full dynamic range from `0` to `1`.

## Use cases

The *Normalize* node is a good fit for:

* Stretching a texture into its full available contrast range, making sure you are using the maximum dynamic range available in a texture for further processing.
* Preparing textures for predictable downstream processing. For example, you can first use the *Normalize* node to bring an imperfection texture into its full dynamic range, and then apply further processing that is now much easier and more predictable, since all the values go from `0` to `1` instead of some arbitrary range such as `0.4` to `0.67`.
