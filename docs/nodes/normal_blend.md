# Normal Blend

The *Normal Blend* node combines two normal maps: it adds the detail of one normal map on top of another, for example fine scratches or pores on top of the large shapes of a surface. Blending normal maps with a regular color blend flattens both; this node blends them as the surface directions they describe.

## Inputs

The *Normal Blend* node has three inputs:

* **Base** — the normal map of the large shapes.
* **Detail** — the normal map whose detail is added on top of the base.
* **Factor** — how much of the detail is applied, from `0` (only the base) to `1` (the full detail). You can connect a mask here to apply the detail only in some areas.

Both normal maps use the OpenGL convention, like every normal map in Artlets. You can get them, for example, from a *Height To Normal* node, from an imported normal map, or from the normal channel of a material with a [Math](/nodes/math) node (`Material.normal`). The output is a normal map in the same convention, which you can put into the normal channel of a material with the [Channels](/nodes/channels) node or a [Math](/nodes/math) node (`pbr(normal=...)`).

## Parameters

* **Mode** — how the detail is combined with the base:
  * **Whiteout** — the default. Adds the slopes of both normal maps; the detail keeps its strength on sloped parts of the base.
  * **Reoriented (RNM)** — bends the detail along the base, as if the detail were applied onto the curved base surface. The most accurate mode, and a good choice for strong detail on strong shapes.
  * **UDN** — a simpler version of *Whiteout* that keeps the detail slightly flatter.
  * **Linear** — not a detail blend: it fades from the base to the detail by the *Factor*, so that where the factor is `1` only the detail is left. Use it to replace one normal map with another in masked areas.

The alpha of a normal map is its coverage, as in the normal channel of a material: where the detail is transparent the base shows through, and the alpha of the result covers both. The *Mix* node blends the normal channels of its layers with the same modes.
