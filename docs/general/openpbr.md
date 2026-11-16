
# OpenPBR Channels

Besides the core metallic-roughness channels (*Base Color*, *Height*, *Normal*, *Roughness*, *Metallic*, *Ambient Occlusion* and *Opacity*), a material can have the layers of the [OpenPBR](https://academysoftwarefoundation.github.io/OpenPBR/) surface model: emission, a tinted specular reflection, a clear coat, a fabric sheen, transmission, anisotropy and an iridescent thin film. They are the layers glTF describes with its `KHR_materials_*` extensions, so they also travel to game engines and other tools in a GLB file.

These channels are optional. A material has one only where you add it; everywhere else the channel has its default value, and the defaults shade exactly like a plain metallic-roughness material. Nodes never add them on their own, so existing materials look and export as before.

## The channels

| Channel | Group | Type | Default | Meaning |
|---------|-------|------|---------|---------|
| *Emission* | Emission | Color | black | Light the surface gives off, multiplied by the *Emission Strength* of the [Output](/nodes/output#material-values) node |
| *Specular* | Specular | Float | `1` | Strength of the reflection of non-metals, from `0` (no reflection) to `1` |
| *Specular Color* | Specular | Color | white | Tint of the reflection; for metals, the color of their edges |
| *Coat* | Coat | Float | `0` | Amount of a clear coat on top of the surface, such as varnish, lacquer or car paint, from `0` to `1` |
| *Coat Color* | Coat | Color | white | Tint of the light passing through the coat |
| *Coat Roughness* | Coat | Float | `0` | Roughness of the coat, from `0` (glossy) to `1` |
| *Sheen* | Sheen | Float | `0` | Amount of a soft sheen at grazing angles, as on velvet, cloth or dust, from `0` to `1` |
| *Sheen Color* | Sheen | Color | white | Color of the sheen |
| *Sheen Roughness* | Sheen | Float | `0.5` | How widely the sheen spreads, from `0` to `1` |
| *Transmission* | Transmission | Float | `0` | Amount of light passing through the surface, as in glass or liquids, from `0` to `1`. The *Base Color* tints the transmitted light |
| *Anisotropy* | Anisotropy | Float | `0` | How much the highlight stretches along one direction, as on brushed metal, from `0` to `1` |
| *Anisotropy Rotation* | Anisotropy | Float | `0` | Direction of the anisotropy as a fraction of a half turn: `0` to `1` is 0° to 180°, counter-clockwise from the texture's U axis |
| *Thin Film* | Thin Film | Float | `0` | Amount of an iridescent film on the surface, as on soap bubbles, oil or heat-tinted metal, from `0` to `1` |
| *Thin Film Thickness* | Thin Film | Float | `0.5` | Thickness of the film in micrometres; values from `0` to `1` give most of the colors |

Colors are linear and premultiplied by their alpha, like the *Base Color*. Their alpha is the coverage a [Mix](/nodes/mix) layer blends them with, so keep it at `1` unless a layer should only partly cover the layer below.

## Adding the channels

* **Channels node** — the [Channels](/nodes/channels) node has a group of rows for each layer (*Emission*, *Specular*, *Coat*, *Sheen*, *Transmission*, *Anisotropy* and *Thin Film*). Set the channel to *Custom* and enter a value or connect a texture.
* **Math node** — `pbr(...)` takes the channels as arguments, for example `pbr(color=rgba(0.6, 0.05, 0.05, 1.0), roughness=0.4, coat=1.0, coatRoughness=0.05)` for a car paint. See [Math](/nodes/math#material-channels).
* **Images** — when you upload texture images, files named after a channel (for example `wood_coat_roughness.png` or `fabric_sheen_color.png`) are assigned to it. Color channels are read as sRGB images, the other channels as linear data. A plain `_specular` or `_specular_level` file is not assigned to *Specular*: in texture sets those maps are reflectance colors or levels where 0.5 is neutral, not a weight, so you choose its channel yourself (a `_specular_weight` file is assigned). The normal map of a layer, such as `car_clear_coat_normal.png`, is left for you to assign too: there is no coat normal channel.
* **Library assets** — assets whose outputs are named after these channels provide them like any other channel.

The [Mix](/nodes/mix) node mixes these channels like the others, with a blend mode and a factor for each. A layer that does not have a channel contributes its default there: a plain paint layer over a coated surface removes the coat where it covers it.

## Material values

The indices of refraction and the emission strength are properties of the whole material, not channels. They are set on the *Output* node, see [Output](/nodes/output#material-values).

## Viewport

The viewport shades these layers in real time. Like any real-time renderer it approximates them: transmission shows the environment through the surface rather than the objects behind it.

*Anisotropy Rotation* wraps around: `1` is the same direction as `0`. The viewport shades it without a seam where a map wraps, but nodes that blend or blur the channel (a *Mix* of two rotations, a resized map) average the values as numbers, so `0.95` and `0.05` blend to `0.5`, the perpendicular direction. Keep rotation maps free of such wraps where they are blended or scaled.

## Export

The texture export writes each OpenPBR channel the material has as a map of its own (see [Export](/general/export#channels)).

The GLB export writes them with the glTF extensions that game engines and other tools read:

| Channels and values | glTF extension |
|---------------------|----------------|
| *Emission*, *Emission Strength* | emissive texture and factor, `KHR_materials_emissive_strength` |
| *Specular*, *Specular Color* | `KHR_materials_specular` |
| *Specular IOR* | `KHR_materials_ior` |
| *Coat*, *Coat Roughness* | `KHR_materials_clearcoat` |
| *Sheen*, *Sheen Color*, *Sheen Roughness* | `KHR_materials_sheen` (the *Sheen* amount multiplies the sheen color) |
| *Transmission* | `KHR_materials_transmission` |
| *Anisotropy*, *Anisotropy Rotation* | `KHR_materials_anisotropy` |
| *Thin Film*, *Thin Film Thickness*, *Thin Film IOR* | `KHR_materials_iridescence` |

glTF has no coat color or coat index of refraction: *Coat Color* and *Coat IOR* are left out of GLB files, and the coat is written as a colorless coat with the glTF index of refraction of `1.5`. glTF applies *Specular Color* to non-metals only, so the edge color it gives metals in the viewport is not in GLB files either.

The GLB export follows the material as the viewport shows it: on a model imported with these properties, a channel removed from the material (for example an *Output Coat* row set back to *Default* in the *Channels* node) is also removed from the exported model, and a part of the model that you give another material exports that material's properties only, without the glass, coat or glow of its original material (a baked ambient occlusion map stays, as it belongs to the model's shape). Importing a GLB reads these extensions into channels and *Output* values; an imported coat gets a *Coat IOR* of `1.5`, as glTF defines it. Maps that use a second UV set are not imported and stay on the exported model as they were.
