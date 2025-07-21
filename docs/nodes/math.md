# Math

The *Math* node lets you do custom math and data operations in a compact way.

## Inputs

Unlike other nodes, the *Math* node has no fixed inputs. Instead, inputs appear automatically as you type expressions into it. 

For example, writing `a*b` into the expression field create two inputs `a` and `b` which are multiplied: 

<img src="/math_ab.png" alt="Math node example" style=" border-radius: 6px; margin: 16px 0;" />

Similarly, writing `Leather + Wrinkles * Wrinkle_Factor` results in such inputs:

<img src="/math_threeinputs.png" alt="Math node example" style=" border-radius: 6px; margin: 16px 0;" />

## Supported operations

### Maths

| Operation      | Syntax           | Description                          |
|----------------|------------------|--------------------------------------|
| Addition       | `a + b`          | Adds two values                      |
| Subtraction    | `a - b`          | Subtracts second value from first    |
| Multiplication | `a * b`          | Multiplies two values                |
| Division       | `a / b`          | Divides first value by second        |
| Modulo         | `mod(a, b)`      | Remainder after division             |
| Minimum        | `min(a, b)`      | Smallest of two values               |
| Smooth Minimum | `smoothmin(a, b, factor)`      | Smallest of two, with smoothing|
| Maximum        | `max(a, b)`      | Largest of two values                |
| Smooth Maximum | `smoothmax(a, b, factor)`      | Largest of two, with smoothing|
| Absolute       | `abs(a)`         | Absolute value (removes sign)        |
| Square Root    | `sqrt(a)`        | Square root of a value               |
| Sine           | `sin(a)`         | Sine of angle (radians)              |
| Cosine         | `cos(a)`         | Cosine of angle (radians)            |
| Tangent        | `tan(a)`         | Tangent of angle (radians)           |
| Floor          | `floor(a)`       | Rounds down to nearest integer       |
| Ceil           | `ceil(a)`        | Rounds up to nearest integer         |
| Round          | `round(a)`       | Rounds to nearest integer            |


### Comparison

| Operation         | Syntax         | Description                                 |
|-------------------|---------------|---------------------------------------------|
| Greater Than      | `a > b`       | Returns 1 if `a` is greater than `b`, else 0|
| Less Than         | `a < b`       | Returns 1 if `a` is less than `b`, else 0   |
| Equal             | `a == b`      | Returns 1 if `a` equals `b`, else 0         |
| Not Equal         | `a != b`      | Returns 1 if `a` does not equal `b`, else 0 |

### Conditional Logic

An if condition can be set so:

```
a > b ? true : false
```

For example, a condition *'if an input called noise is larger than 0.5, use blue color, else use red color'* would look like that:

```
noise > 0.5 ? rgba(0, 0, 1.0) : rgba(1.0, 0, 0)
```

### Creating data

You can create different data:

| Data type         | Syntax         | Description                                 |
|-------------------|---------------|---------------------------------------------|
| Color     | `rgba(r, g, b, a)`       | Outputs a color of four components|
| Material  | `pbr(color=rgba(0.8, 0.8, 0.8, 1.0), roughness=0.5, metallic=0.0, height=0.1)`| Outputs a material with specified PBR channel values. 
















