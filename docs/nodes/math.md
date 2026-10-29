
# Math

The *Math* node lets you do custom math and data operations in a compact way.

## Inputs

Unlike other nodes, the *Math* node has no fixed inputs. Instead, inputs appear automatically as you type expressions into it. 

For example, writing `a*b` into the expression field create two inputs `a` and `b` which are multiplied: 

<img src="/math_ab.png" alt="Math node example" style=" border-radius: 6px; margin: 16px 0 32px 0;" />

Similarly, writing `Leather + Wrinkles * Wrinkle_Factor` results in such inputs:

<img src="/math_threeinputs.png" alt="Math node example" style=" border-radius: 6px; margin: 16px 0 32px 0;" />

The types (either `Bool`, `Int`, `Float`, `Color` or `Material`) of inputs are automatically inferred from the context where inputs are used. The most general valid type is automatically used. But it is possible to constrain or specify input types manually using the following syntax: `(a :: Int)`.

## Supported operations

### Arithmetic

| Operation      | Syntax           | Description                          |
|----------------|------------------|--------------------------------------|
| Addition       | `a + b`          | Adds two values                      |
| Subtraction    | `a - b`          | Subtracts second value from first    |
| Multiplication | `a * b`          | Multiplies two values                |
| Division       | `a / b`          | Divides first value by second        |
| Modulo         | `mod(a, b)`      | Remainder after division             |
| Minimum        | `min(a, b)`      | Smallest of two values               |
| Smooth Minimum | `smoothmin(a, b, factor)` | Smallest of two, with smoothing|
| Maximum        | `max(a, b)`      | Largest of two values                |
| Smooth Maximum | `smoothmax(a, b, factor)` | Largest of two, with smoothing|
| Sign           | `sign(a)`        | Sign (-1, 0, 1) of a value         |
| Absolute       | `abs(a)`         | Absolute value (removes sign)        |
| Square Root    | `sqrt(a)`        | Square root of a value               |
| Sine           | `sin(a)`         | Sine of angle (radians)              |
| Cosine         | `cos(a)`         | Cosine of angle (radians)            |
| Tangent        | `tan(a)`         | Tangent of angle (radians)           |
| Arcsine        | `asin(a)`        | Arcsine of angle (in radians)        |
| Arccosine      | `acos(a)`        | Arccosine of angle (in radians)      |
| Arctangent     | `atan(a)`        | Arctangent of angle (in radians)     |
| Arctangent     | `atan2(y, x)`    | Arctangent given y/x components      |
| Floor          | `floor(a)`       | Rounds down to nearest integer       |
| Ceil           | `ceil(a)`        | Rounds up to nearest integer         |
| Round          | `round(a)`       | Rounds to nearest integer            |
| Fract          | `fract(a)`       | Returns fractional part of a value |
| Power          | `pow(a, b)`      | Raises `a` to the power of `b`       |
| Exponent       | `exp(a)`         | Raises base of natural logarithm (e) to the given power |
| Logarithm      | `log(a)`         | Calculates natural logarithm of a value   |

All arithmetic operations expect floating point arguments and return floating point value as a result.


### Color operations

| Operation      | Syntax           | Description                          |
|----------------|------------------|--------------------------------------|
| Multiplication | `multiply(a, b)` | Multiplies two colors component-wise |
| Mixing         | `mix(a, b, factor)` | Mixes colors `a` and `b` based on `factor` (between 0..1) |
| Contrast adjustment | `contrast(a, factor)` | Adjusts color given contrast `factor` (0 for grayscale, 1 for original color) |
| Saturation adjustment | `saturation(a, factor)` | Adjusts color given saturation `factor` (0 for grayscale, 1 for original color) |


### Vector operations

The red, green and blue components of a color are also an X, Y, Z vector, which is how normal maps store the direction of the surface. The components can be read as `c.x`, `c.y`, `c.z` and `c.w`, the same as `c.r`, `c.g`, `c.b` and `c.a`.

| Operation      | Syntax           | Description                          |
|----------------|------------------|--------------------------------------|
| Normalize      | `normalize(v)`   | Vector of length 1 in the direction of `v`, the alpha is kept |
| Length         | `length(v)`      | Length of the vector `v`             |
| Dot product    | `dot(a, b)`      | Dot product of the vectors `a` and `b` |
| Cross product  | `cross(a, b)`    | Cross product of the vectors `a` and `b`, with alpha 1 |
| Decode normal  | `decodenormal(n)` | Converts a normal map color (components from `0` to `1`) to a vector (components from `-1` to `1`), the alpha is kept |
| Encode normal  | `encodenormal(v)` | Converts a vector (components from `-1` to `1`) to a normal map color (components from `0` to `1`), the alpha is kept |

For example, `let d = decodenormal(n) in encodenormal(normalize(rgb(d.x * 2.0, d.y * 2.0, d.z)))` makes the bumps of a normal map `n` twice as steep, and `dot(decodenormal(n), rgb(0.0, 0.0, 1.0))` is the cosine of the slope of the surface. The [Normal Adjust](/nodes/normal_adjust), [Normal Blend](/nodes/normal_blend), [Curvature](/nodes/curvature) and [Slope](/nodes/slope) nodes cover the common normal map operations.


### Comparison

| Operation         | Syntax        | Description                                        |
|-------------------|---------------|----------------------------------------------------|
| Greater Than      | `a > b`       | Returns true if `a` is greater than `b`, else false|
| Less Than         | `a < b`       | Returns true if `a` is less than `b`, else false   |
| Greater Than or Equal | `a >= b`  | Returns true if `a` is greater than or equal to `b`, else false|
| Less Than         | `a < b`       | Returns true if `a` is less than `b`, else false   |
| Less Than or Equal | `a <= b`     | Returns true if `a` is less than or equal to `b`, else false |
| Equal             | `a == b`      | Returns true if `a` equals `b`, else false         |
| Not Equal         | `a != b`      | Returns true if `a` does not equal `b`, else false |

All comparison operations except `==` and `!=` expect floating point arguments and return
boolean value a result. `==` and `!=` are also available for boolean arguments.

### Logic

| Operation         | Syntax        | Description                                        |
|-------------------|---------------|----------------------------------------------------|
| And      | `a && b`       | Returns true if both `a` and `b` are true, else false|
| Or       | `a \|\| b`       | Returns true if either `a` or `b` is true, else false|
| Not      | `!a`           | Returns true if `a` is false and false if `a` is true|

All logic operations expect boolean arguments and return boolean value as a result.

An if condition can be set so:

```
a > b ? true : false
```

For example, a condition *'if an input called noise is larger than 0.5, use blue color, else use red color'* would look like that:

```
noise > 0.5 ? rgba(0, 0, 1.0, 1) : rgba(1.0, 0, 0, 1)
```

### Type conversion

You can convert values with following functions:

| Data type         | Syntax         | Description                                 |
|-------------------|---------------|---------------------------------------------|
| Bool      | `bool(v)` | Converts integer or floating point value to boolean value|
| Int       | `int(v)` | Converts floating point or boolean value to integer value|
| Color     | `rgb(r, g, b)`       | Outputs a color of three components|
| Color     | `rgba(r, g, b, a)`       | Outputs a color of four components. The color components are premultiplied by the alpha: red with alpha 0.5 is `rgba(0.5, 0, 0, 0.5)`, not `rgba(1, 0, 0, 0.5)`. The alpha of a material color blends layers in a Mix node and is written to exported images; the transparency of the material itself is its opacity channel|
| Material  | `pbr(color=rgba(0.8, 0.8, 0.8, 1.0), roughness=0.5, metallic=0.0, height=0.1)`| Outputs a material with specified PBR channel values. The optional `normal=` (a normal map color, OpenGL convention, components in 0..1) and `ao=` (ambient occlusion, 0..1) arguments set the normal and occlusion channels explicitly; without them both are derived from the height. | 


### Material channels

A single channel of a material input can be read with a dot, for example `Leather.color`, `Leather.height`, `Leather.roughness`, `Leather.metallic`, `Leather.opacity`, `Leather.normal` or `Leather.ao`. Reading `normal` or `ao` from a material that does not provide them gives the map derived from its height, the same one the viewer shows for that material. This also works for a `pbr(...)` written inline, in a node of any output type: `pbr(height=h).normal` gives the normal derived from `h`.

### Coordinates

| Data type         | Syntax         | Description                                 |
|-------------------|---------------|---------------------------------------------|
| Float     | `u()`       | Outputs texture 'u' coordinate (range 0..1)|
| Float     | `v()`       | Outputs texture 'v' coordinate (range 0..1)|

