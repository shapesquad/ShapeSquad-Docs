# Built-in scripting language

Scripts are written in a simple stronly-typed pure functional language. The language supports 
recursion, lists, anonymous records and higher-order functions. It works as a hybrid interpreter/compiler,
with higher-level functionality intended to be performed at compile time via the interpreter.
Backend compiler targets SPIR-V (using cross compilation via GLSL).


### Example

```
letrec f = \(list: [Int]): { sum: Int, prod: Int } ->
  if length(list) == 0 then
    { sum=0, prod=1 }
  else
    let elem = head(list), result = f(tail(list)) in
      { sum=elem + result.sum, prod=elem * result.prod }
in f([1,2,3,4,5])
```
This sample defines a recursive function that calculates both sum and product of a list and then applies this to a 5 element list.


### Language syntax

```
<expr>   ::= 'let'    id '=' <expr> ',' ... ',' id '=' <expr> 'in' <expr>
           | 'letrec' id '=' <expr> ',' ... ',' id '=' <expr> 'in' <expr>
           | 'if' <expr> 'then' <expr> 'else' <expr>
           | <expr> '?' <expr> ':' <expr>
           | <expr> ('&&' | '||') <expr>
           | <expr> ('<' | '>' | '<=' | '>=' | '==' | '!=') <expr>
           | <expr> ('+' | '-' | '*' | '/') <expr>
           | '!' <expr>
           | '-' <expr>
           | <expr> '(' <expr> ',' ... ',' <expr> ')'
           | <expr> '.' id
           | num | bool | id | <func> | <list> | <record>

<func>   ::= '\' '(' id ':' <type> ',' ... ',' id ':' <type> ')' ':' <type> '->' <expr>

<list>   ::= '[' <expr> ',' ... ',' <expr> ']'

<record> ::= '{' id '=' <expr> ',' ... ',' id '=' <expr> '}'

<type>   ::= '[' <type> ']'
           | '{' id ':' <type> ',' ... ',' id ':' <type> '}'
           | 'Void' | 'Int' | 'Float' | 'Color' | 'Vector2D' | 'Vector3D' | 'IndexVector' | 'ColorGradient' | 'Path2D'
```


### Supported basic types


| Type          | Description 
|---------------|------------
| $Void$        | No valid values
| $Bool$        | Possible values 'true', 'false'
| $Int$         | Any positive or negative integer
| $Float$       | Any floating point number
| $Color$       | Opaque color type
| $Vector2D$    | Represents both 2D points and 2D vectors
| $Vector3D$    | Represents both 3D points and 3D vectors
| $IndexVector$ | Represents instance index
| $ColorGradient$ | Color gradient
| $Path2D$      | 2D path (polygon)

The following projections are supported on basic types:

| Type       | Projections     | Type    | Description
|------------|-----------------|---------|------------
| $Color$    | $r, g, b, a$    | $Float$ | Color component
| $Vector2D$ | $x, y, length$  | $Float$ | Vector coordinates
| $Vector2D$ | $length$        | $Float$ | Vector length
| $Vector3D$ | $x, y, z$       | $Float$ | Vector coordinates
| $Vector3D$ | $length$        | $Float$ | Vector length
| $IndexVector$ | $x, y, z$    | $Int$   | Instance spatial index
| $IndexVector$ | $global$     | $Int$   | Global instance index
| $IndexVector$ | $hash$       | $Float$ | Real-valued hash of the index vector, range [0..1)
| $IndexVector$ | $seedhash$   | $(Int):Float$ | Real-valued hash of the index vector for given seed, range [0..1)
| $ColorGradient$ | $points$   | $[{pos:Float, color:Color, type:Int}]$ | List of control points of the gradient
| $Path2D$   | $points$        | $[Vector2D]$ | List of the polygon points

Projections are expressed as $e.f$ where $e$ is an expression of specified type and $f$ is the name of the projection. For example, $vec2(0.5, 0.7).length$.


### Complex types

| Type  | Example        | Description
|-------|----------------|------------
| $[T]$ | $[[Int]]$      | Lists of specified type of arbitrary size
| $\lbrace f_1:T_1, ..., f_n:T_n \rbrace$ | $\lbrace a:Int, b:[Bool] \rbrace$ | Anonymous records with fixed structure
| $(T_1, ..., T_n):T$    | $([Float]):Int$ | Functions with specified signature

Here $T, T_1, ..., T_n$ can be any type.


### Built-in operations on complex types

| Syntax             | Result type | Description
|--------------------|-------------|------------
| $[e_1, ..., e_n]$  | $[T]$       | Constructs a list of type $T$ (the most general type of $e_1, ..., e_n$)
| $e.f$              | $T$         | Syntactic sugar for $f(e)$, if $e$ is a list ($T$ is the result type of $f$)
| $\lbrace f_1=e_1, ..., f_n=e_n \rbrace$ | $\lbrace f_1:T_1, ..., f_n:T_n\rbrace$ | Constructs an anonymous record with specified fields (where $T_i$ is the type of $e_i$)
| $e.f$              | $T$         | Extracts field $f$ of the record (where $T$ is the type of $f$)
| $\backslash(a_1:T_1, ..., a_n:T_n):T$ -> $e$ | $(T_1, ..., T_n):T$ | Constructs a function expression, with arguments $a_i$ of type $T_i$
| $e(e_1, ..., e_n)$ | $T$         | Function application (where $T$ is the result type of the function)


### Built-in variables

| Variable   | Type       | Contexts      | Description 
|------------|------------|---------------|-----------
| $P$        | $Vector3D$ | SDF, Material | Spatial/surface coordinates
| $x, y, z$  | $Float$    | SDF, Material | Spatial/surface coordinates
| $N$        | $Vector3D$ | Material      | Surface normal
| $uvw$      | $Vector3D$ | Material      | Surface UVW coordinates
| $u, v, w$  | $Float$    | Material      | Surface UVW coordinates
| $time$     | $Float$    | Any           | Current time
| $chn$      | $Int$      | SDF, Material | Channel identification
| $idx, idx0, idx1, idx2$  | $IndexVector$  | SDF, Material | Instance identification

These variables can be only evaluated at runtime. 

Note that $x$ is a shorthand for $P.x$, likewise $u$ is a shorthand 
for $uvw.x$ and $idx$ is same as $idx0$. $idx0$, $idx1$, $idx2$ form
a 3-deep stack for repeat nodes. Subsequent repeat nodes push new indices
to the stack and the old $idx0$ becomes $idx1$, and the old $idx1$ becomes $idx2$.


### Built-in functions

| Function | Type            | Description 
|----------|-----------------|------------
| $int$    | $(Float):Int$   | Float to int (truncating)
| $float$  | $(Int):Float$   | Int to float
| $abs$    | $(Float):Float$ | Absolute value
| $exp$    | $(Float):Float$ | Natural exponent
| $log$    | $(Float):Float$ | Natural logarithm
| $sqrt$   | $(Float):Float$ | Square root
| $fract$  | $(Float):Float$ | Fractional part
| $floor$  | $(Float):Float$ | Floor (largest integer value not greater than the input)
| $ceil$   | $(Float):Float$ | Ceil (smallest integer value not smaller than the input)
| $sin$    | $(Float):Float$ | Sine (input in radians)
| $cos$    | $(Float):Float$ | Co-sine (input in radians)
| $tan$    | $(Float):Float$ | Tangent (input in radians)
| $asin$   | $(Float):Float$ | Arcsine (result in radians)
| $acos$   | $(Float):Float$ | Arccosine (result in radians)
| $atan2$  | $(Float, Float):Float$ | Two-argument arctangent (result in radians)
| $mod$    | $(Float, Float):Float$ | Modulo (remainder of the division)
| $pow$    | $(Float, Float):Float$ | Raising value to given power
| $vec2$   | $(Float, Float):Vector2D$ | Vector construction
| $vec3$   | $(Float, Float, Float):Vector3D$ | Vector construction
| $rgba$   | $(Float, Float, Float, Float):Color$ | Color construction from RGBA components
| $colorgradient$ | $([{pos:Float, color:Color, type:Int}]):ColorGradient$ | Constructs a color gradient from control points
| $polygon$ | $([Vector2D]):Path2D$ | Constructs a polygon from a list of points
| $min$    | $(a):a$, where $a \in \lbrace Int, Float \rbrace$ | Minimum of two inputs
| $max$    | $(a):a$, where $a \in \lbrace Int, Float \rbrace$ | Maximum of two inputs
| $step$   | $(Float, Float):Float$ | Step function
| $linearstep$ | $(Float, Float, Float):Float$ | Linear step function
| $smoothstep$ | $(Float, Float, Float):Float$ | Smooth step function
| $hash$       | $(Int):Float$ | Hash function, returns value in range $[0..1)$
| $hashidx$ **Deprecated** | $(IndexVector):Float$ | Hash function for index vectors, returns value in range $[0..1)$
| $hashidx2$ **Deprecated** | $(IndexVector, Int):Float$ | Hash function for index vectors with seed, returns value in range $[0..1)$
| $noise$      | $(Float):Float$ | Noise function, returns value in range $[0..1)$
| $empty$      | $([a]):Bool$    | Checks if the list is empty
| $length$     | $([a]):Int$     | Number of elements in the list
| $head$       | $([a]):a$       | Head value of the list
| $tail$       | $([a]):[a]$     | Tail of the list (sublist starting from 2nd element)
| $append$     | $([a], [a]):[a]$ | Appends two lists
| $at$         | $([a], Int):a$  | Extracts specific list element
| $range$      | $(Int, Int):[Int]$ | Generates a consecutive range of integers, given first element and number of elements
| $map$        | $((a):b, [a]):[b]$ | Applies a function to all elements of the list
| $filter$     | $((a):Bool, [a]):[a]$ | Filters elements of the list via a filter function
| $foldl$      | $((a, b):a, a, [b]):a$ | Reduces the list by applying binary function to all list elements (left side)
| $foldr$      | $((b, a):a, a, [b]):a$ | Reduces the list by applying binary function to all list elements (right side)


### Supported operators (by increasing precedence)

| Operators                   | Comments
|-----------------------------|---------
| `?:`                        | Conditional, eager evaluation
| `&&` <code>&#124;&#124;</code> | Logical
| `==` `!=` `<` `>` `<=` `>=` | Comparison
| `+` `-`                     | Arithmetic
| `*` `/`                     | Unary arithmetic, logic
| `+` `-` `!`                 | Unary, right-to-left
| `()` `[]`                   | Precedence regrouping


### Supported constants

| Constant       | Comments
|----------------|---------
| `true`         |
| `false`        |
| `PI`           | 3.141592...
| `E`            | 2.718281...


### Compile time evaluation

The compiler reduces all expressions if subexpressions are reducible. The only non-reducible
expressions are variables defined above. Thus $sin(5.0)$ can be reduced to a constant while
$sin(P.x)$ can not, as $P$ is a runtime variable.

Certain high-level constructs are only supported in compile time mode, as GLSL lacks corresponding functionality.
For example, lists and higher level functions must be reduced before GLSL can be generated.
Thus the following sample is valid but can not be compiled to GLSL as it uses runtime variable $P$:

```
(if P.x < 0 then \(x:Float):Float -> x else \(x:Float):Float -> 0)(5)
```
