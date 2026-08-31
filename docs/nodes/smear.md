# Smear

The *Smear* node lets you smear an input texture along the slopes of another texture you provide, called the *Smear Map*. It is a directional blur: instead of blurring in a fixed direction, the blur follows the shape of the smear map, which makes it great for effects such as edge damage on shapes, or for blurring a texture in a very specific way.

<video src="/smear_node.webm" aria-label="Smear node" style="border-radius: 6px; margin: 16px 0 32px 0;" autoplay loop muted playsinline />

## Inputs

The *Smear* node has two inputs:

* **Input** — the texture you want to smear.
* **Smear Map** — the texture that drives the smear effect with its slopes.

## Parameters

The node has two parameters:

<img src="/smear_parameters.png" alt="Smear node parameters" style=" border-radius: 6px; margin: 16px 0 32px 0;" />

* **Strength** — controls how much the input is smeared along the slopes of the smear map. The slopes of the smear map are calculated from its brightness: dark areas as low, bright areas as high. The input texture melts down the slopes as you increase strength.
* **Invert Direction** — inverts the direction of the smear. By default, the texture is smeared from the brighter areas of the smear map to the darker ones. When you enable *Invert Direction*, the texture is smeared the other way — from the darker areas to the brighter ones.

## Use cases

The *Smear* node is good for:

* Adding edge damage to shapes, using an imprefection texture as the *Smear Map*.
* Directionally blurring a texture in a very specific way, driven by the shape of another texture.
