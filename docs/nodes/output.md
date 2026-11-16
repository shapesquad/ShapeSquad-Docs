
# Output

What's connected to the *Output* node gets shown on the mesh in the Viewport. A material graph has one *Material* output. Its top level can also have extra *Color* and *Float* outputs: the viewport ignores them, and the texture export writes each one as a map of its own (see [Export](/general/export#extra-maps)).

## Inputs

The *Output* node has one input - what you connect there will be mapped onto your selected mesh and shown in the Viewport. 

<img src="/output_node.png" alt="Math node example" style=" border-radius: 6px; margin: 16px 0 32px 0;" />

::: tip NOTE

The *Output* node will only send its input to the Viewport if pinned. *Output* is pinned by default. Double-clicking on any other node will instead show the other node in the viewport. Double-clicking on a pinned node will remove the pin, and pin *Output* again.
:::

## Material values

The *Material* output of a material graph also has a *Material* group of settings. They are physical properties of the whole material used by the [OpenPBR channels](/general/openpbr), so they are values rather than channels:

* **Emission Strength** — multiplies the *Emission* channel. Default `1`.
* **Specular IOR** — index of refraction of the reflection and of the transmission, which sets how strongly non-metals reflect light head-on. Default `1.5`; for example `1.33` for water, `1.5` for glass and `2.4` for diamond.
* **Coat IOR** — index of refraction of the coat. Default `1.6`.
* **Thin Film IOR** — index of refraction of the thin film. Default `1.4`.

Only the *Output* node of the material itself uses these values: the *Output* nodes inside node groups do not show them.
