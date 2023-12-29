# Asset Guidelines

## Parameters

### Organization


Similar parameters should be grouped. 

**Bad**: `Tile Rotation`, `Tile Tilt`, `Tile Size`

**Good**: A group named `Tile` with `Rotation,` `Tilt` and `Size` inside. 

A group must have a minimum of two parameters.

### Naming

All names in caps: `Edge Wear`, `Hole Density`.

Naming should be descriptive. Try to avoid `Size` or `Move` as they are not understandable unless you start to change them. 

Do not use more than three words in a parameter name.

### Range 

**Float** parameters should have a range from **0 to 1**. 

**0** is the minimum available of a certain effect, **1** is the maximum available. 

This makes the parameter easy to use and understand, as the maximum size of an element can vary depending on the element count, for example. 

When the parameter expresses an actual count, like layers, tiles, etc., the parameter can have a different range. 

### Count

An asset should have up to 7 parameters + parameter groups. For example, 
three parameter groups: **Tilt**, **Edges**, **Variance** and four single parameters. Or one parameter group and six single parameters. Or only three single parameters. 


### Order

Organize the parameters into groups and order them by importance. The main element is first, then the second important and so on. Tile, Mortar, Edges etc. Of course, the order is not a hard rule, 
but similar assets (tile generators, weave generators) need to have the same parameter order.

## Performance

### Compile time

A single shader should have a single role to make it more lightweight and faster to compile. Layers that do not affect each other should be separate shaders. They can be combined into an asset in Composer.

**Bad**: A "Scratched Tiles" shader that contains the tiles, scratches on them and some other imperfections.

**Good**: Separate shader for the tile generator, tile content, mortar, scratches and other imperfections.

When layers affect each other, they can be together in a single shader. For example, unlike simple scratches, the edge wear effect needs detailed information on the actual tiles, so this effect should be in the shader with the tiles.

### Render speed

Make sure **Uniform Repeat** uses the minimum needed **Limit/Spacing** ratio. The larger the **Limit** is compared to **Spacing**, the more time it takes to render the shader. 









