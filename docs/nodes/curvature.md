# Curvature

The *Curvature* node turns a normal map into a curvature mask: mid gray (`0.5`) on flat or evenly sloped areas, brighter on convex areas such as ridges and edges, and darker in concave areas such as cavities and grooves. Curvature masks are a classic way to place edge wear on the edges of a surface and dirt in its cavities.

## Inputs

The *Curvature* node has one input:

* **Normal** — the normal map to measure (OpenGL convention), for example from a *Height To Normal* node or the normal channel of a material.

## Parameters

* **Intensity** — the contrast of the mask: how far convex and concave areas move away from mid gray. Gentle shapes need a higher intensity than sharp edges.
* **Radius** — the size of the features the mask responds to, as a fraction of the texture size. Small values pick out fine edges and scratches; larger values pick out broad bulges and hollows and ignore fine detail. Because the radius is relative to the texture size, the mask looks the same at every resolution, in the viewport and in exports.

The mask tiles: at the borders of the texture it continues on the opposite side. To get separate edge and cavity masks, remap the result with a [Range Map](/nodes/range_map) or [Math](/nodes/math) node, for example `max(0, c - 0.5) * 2` for the edges and `max(0, 0.5 - c) * 2` for the cavities.
