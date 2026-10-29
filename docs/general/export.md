# Export

The *Export* dialog writes your material as texture files, or your model as a GLB file. Open it from the asset page; the *Export texture* tab is described here.

## Channels

Every channel of the material gets a row: *Color*, *Height*, *Roughness*, *Metallic*, *Opacity*, and the *Normal* and *AO* (ambient occlusion) maps. A material that does not provide a normal or ambient occlusion channel itself gets them derived from its height. The derived *AO* starts disabled, as it is slow to compute for large textures.

For each row you choose:

* **Enabled** — whether the file is written.
* **Resolution** — the texture size, up to the material's texture resolution.
* **Format** — *PNG* (8 bits), *PNG 16-bit*, *EXR* (16-bit float) or *EXR 32-bit*. PNG colour is sRGB, EXR colour is linear. Height is normalized to the 0–1 range in PNG files and keeps its real values in EXR files.

The *Normal* row also lets you choose the convention: *OpenGL* (default) or *DirectX*.

*PNG* files are rendered at the material's [precision](/general/node_settings#material-precision); *PNG 16-bit* and *EXR* files are always rendered at 32-bit float. The *Output size* and *Precision* of a node apply to exports too (see [Node settings](/general/node_settings#node-settings)).

The *Master Controls* row sets the file name template and changes every row (packed maps included) at once. The template takes the placeholders `{material}`, `{channel}` and `{resolution}`; a `/` creates a folder. The default `{material}/{channel}_{resolution}` writes files like `Rusty_Metal/roughness_2048x2048.png`. If two files would get the same name, the later one gets a `_2` suffix.

The dialog remembers your settings for each asset in this browser.

## Extra maps

Besides its *Material* output, the top level of a material graph can have any number of extra *Color* and *Float* outputs. Add them from the *Output* menu or the quick add search (*Float Output*, *Color Output*). The viewport, previews, thumbnails and GLB export keep using the *Material* output; the extra outputs are only written by the texture export.

Each extra output appears in the dialog as a row of its own, named after its node: rename the node to name the file. A *Float* map is written as greyscale data, a *Color* map like the material colour.

## Packed maps

Game engines often expect several greyscale maps packed into the red, green, blue and alpha channels of one texture. Add one with **Add packed map** and pick a preset:

| Preset | Red | Green | Blue | Alpha |
| --- | --- | --- | --- | --- |
| Unreal / glTF ORM | AO | Roughness | Metallic | — |
| Unity HDRP Mask Map | Metallic | AO | Detail mask (1) | Smoothness |
| Unity Metallic Smoothness | Metallic | Metallic | Metallic | Smoothness |
| Custom | — | — | — | — |

Smoothness is inverted roughness. The HDRP mask map stores a constant 1 as the detail mask, so that a detail map, if you add one in Unity, applies everywhere.

A preset only fills in the rows; you can change each one afterwards. For each of red, green, blue and alpha, choose a source and whether to **Invert** it (one minus the value):

* **None** — red, green and blue are 0; *None* in alpha writes the map without an alpha channel.
* **Constant 0** or **Constant 1**.
* A channel of the material: *Height*, *Roughness*, *Metallic*, *Ambient Occlusion* or *Opacity*. A channel the material does not have is written with its default value, marked *(default)*; an ambient occlusion derived from the height is marked *(derived)*.
* An extra *Float* map, or the red, green, blue or alpha of an extra *Color* map.

Each packed map has its own name (used for `{channel}` in the file name), resolution and format. Height in a packed PNG is normalized the same way as in the height map; in an EXR it keeps its real values. Colour components of a *Color* map are read as linear values, without the alpha premultiplied in.

A channel is computed once for each resolution, however many files use it, so a packed map holds exactly the values of the separate maps at the same resolution and format.

## GLB export

The *Export model* tab writes the model with its materials as a GLB file. When the material has its own ambient occlusion channel, the occlusion is packed into the red channel of the glTF metallic-roughness texture, so that the occlusion and metallic-roughness maps share one ORM image.
