# Node and material settings

Besides its parameters, a node has settings that change how it is rendered rather than what it computes: its *Output size* and *Precision*, and whether it is muted. The material has a working precision that its nodes start from.

## Material precision

The *Precision* of a material is the number of bits per channel its nodes compute with: *16-bit float* (the default) or *32-bit float*. Set it in the viewport settings, behind the gear button at the bottom left of the viewport. In a texturing project, each material of the model has its own precision instead: pick the material at the top left of the node graph and set *Precision* under *Material settings* in the *Material* tab.

The viewport, the 2D preview and the node previews render at this precision, and images are imported at it: at 32-bit, 32-bit float EXR and 16-bit PNG images keep their full precision. *PNG* exports are rendered at the material's precision; *PNG 16-bit* and *EXR* exports are always rendered at 32-bit float (see [Export](/general/export)).

Use *32-bit float* when smooth heights show banding or steps. 16-bit float stores a height between 0.5 and 1 in steps of about `0.0005`, which shows in gentle slopes and even more in the normals derived from them. 32-bit float uses twice the GPU memory, so keep 16-bit for materials that look right. The option is disabled on GPUs that cannot filter 32-bit float textures.

## Node settings

Select a node to open its properties in the sidebar. Most nodes show two settings above their parameters, *Output size* and *Precision*, both *Inherit* by default. Frames, the *Input* and *Output* nodes, and nodes that only output single values do not have them. A node with a setting shows it as a badge next to its name, for example *1/2 · 8-bit*. Resetting the node to its defaults clears both.

### Output size

*Output size* sets the resolution of the node and of the nodes feeding it:

* **Inherit** — the node renders at the size requested from it: the viewport resolution, the export resolution, the size of a node preview, or the size of a node further down the graph with its own *Output size*.
* **1/2**, **1/4**, **1/8** — divide the requested size. A *1/2* node feeding another *1/2* node renders at a quarter of the size.
* **256**, **512**, **1024**, **2048**, **4096** — render at that size, but never above the requested size.

*Output size* only ever lowers the resolution. The nodes feeding the node render at the lower size too, which is where the time is saved. The result is scaled up to the requested size with linear filtering, so it looks softer; the nodes after it render at their full size. The setting applies wherever the node is rendered, exports included.

Use it on heavy nodes whose result is smooth anyway, such as *Ambient Occlusion*, or on branches that only feed broad masks.

### Precision

*Precision* sets the bits per channel of the node's outputs. The nodes feeding it keep their own precision.

* **Inherit** — the material's precision, or the float precision set on a *Node Group* around the node.
* **8-bit** — stores the outputs at 8 bits per channel, clamped to 0–1. The node still computes at the inherited float precision; only its result is stored at 8 bits. Colour is stored sRGB encoded, which keeps dark tones from banding, and data such as normal maps and linear images is stored linearly. Height and other unbounded data (vectors, whole numbers) keep float precision: the height channel of a material output stays float, and on a *Normal To Height* node 8-bit has no effect.
* **16-bit float**, **32-bit float** — the node computes and stores its textures at that precision. An *Image* node at *32-bit float* imports its image at full precision, as in a 32-bit material. If the GPU cannot filter 32-bit float textures, 16-bit float is used.

On a *Node Group*, *16-bit float* or *32-bit float* passes on to the nodes inside it that have no precision of their own; *8-bit* applies to the outputs of the group only.

Use *8-bit* for masks and colours that stay within 0–1, to save GPU memory in large graphs, but not on a *Float* output that later becomes a height, which would then have only 256 levels. Use *32-bit float* on the node or group that builds a smooth height, instead of setting the whole material to 32-bit.

## Mute

Right-click a node and choose **Mute** to bypass it, as if the node were not there: each output passes on the input of the same type that is connected to the node. A muted node is drawn faded; **Unmute** turns it back on. Muting is a quick way to compare the result with and without a node.

An output passes on an input only when exactly one input of its type is connected; otherwise it gives its default value while the node is muted. A library material or a *Node Group* with extra outputs, for example, passes its *Material* input on to its *Material* output, and its extra outputs give their default value. A node can be muted when at least one of its outputs has an input to pass on. *Mute* is not offered on frames, the *Input* and *Output* nodes, or the node pinned to the viewport. While a node is muted, its *Output size* and *Precision* do not apply.
