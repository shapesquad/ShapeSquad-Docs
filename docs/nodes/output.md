
# Output

What's connected to the *Output* node gets shown on the mesh in the Viewport. A material graph has one *Material* output. Its top level can also have extra *Color* and *Float* outputs: the viewport ignores them, and the texture export writes each one as a map of its own (see [Export](/general/export#extra-maps)).

## Inputs

The *Output* node has one input - what you connect there will be mapped onto your selected mesh and shown in the Viewport. 

<img src="/output_node.png" alt="Math node example" style=" border-radius: 6px; margin: 16px 0 32px 0;" />

::: tip NOTE

The *Output* node will only send its input to the Viewport if pinned. *Output* is pinned by default. Double-clicking on any other node will instead show the other node in the viewport. Double-clicking on a pinned node will remove the pin, and pin *Output* again.
:::



