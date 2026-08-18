# Scatter

The *Scatter* node lets you randomly place a number of elements into your texture space. It is a good fit for scattering small, repeating elements across a surface — things like dust particles, pebbles, or rocks — either in a regular grid or in a randomized one.

<img src="/scatter_node.png" alt="Scatter node" style=" border-radius: 6px; margin: 16px 0;" />

## Inputs

The *Scatter* node has one default input:

* **Element** — the element that is scattered on the surface. You can connect any material here.

## Parameters

The node has a set of parameters that determine how the element is scattered:

<img src="/scatter_parameters.png" alt="Scatter node parameters" style=" border-radius: 6px; margin: 16px 0;" />

### Location

* **Density** — defines the size of the grid the element is placed on. For example, a density of `10` means you will have a `10` by `10` grid of the input element in UV space. You can best see the effect of this parameter when *Randomness* is turned down.
* **Randomness** — controls how uniform the grid looks. At `0`, the elements are placed in a perfectly regular grid. At `100%`, the placement is completely random and no longer looks like a grid at all.
* **Seed** — changes the randomization seed, giving you a different random pattern of placement. This parameter is only available when *Randomness* is anything other than `0`.

### Rotation

* **Angle** — determines the overall rotation of each element. You can rotate all the elements, for example, `90` degrees clockwise, or `-160` degrees counterclockwise. The value goes from `-180` to `180` degrees.
* **Randomness** — the rotation randomness. It controls how much each element deviates from the *Angle* above. At `100%`, the elements are rotated completely randomly. The higher the randomness, the more irregular the pattern looks, breaking up the regularity of the placement.
* **Seed** — changes the random rotation pattern.

### Scale

* **Min** — the minimum scale the element can be scaled down to.
* **Max** — the maximum scale the element can be scaled up to.

By default, *Min* is `0.5` and *Max* is `1`, which means the elements can be up to half as small but are not scaled up.

* **Seed** — changes the random scale behavior.

### Remove

* **Amount** — controls how many elements are removed. By default it is `0`, which means no elements are removed. Cranked up to `100`, all the elements are removed. You can slide it anywhere in between. 
* **Seed** — changes the random removal pattern.

::: tip NOTE

You can precisely control where elements appear or are removed by connecting a painted texture to the *Remove* amount. `0` means no removal and `1` means removal, so you can very precisely edit the scattered pattern.
:::

## Use cases

The *Scatter* node is a good fit for:

* Scattering small, repeating elements such as dust particles, pebbles, or rocks across a surface.
* Placing elements in a regular grid, or in a randomized grid for a more natural look.
