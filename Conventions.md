# General conventions


## Scripting conventions


### Code formatting

Use indentation as appropriate for `let` and `if` expressions.

**Good:**

```
let
  x = 2,
  y = 2
in
  x * 2
```

or

```
let x = 2,
    y = 2
in x * y
```

**Bad:**

```
let
x = 2,
y = 2
in
x*y
```

### Naming

Use 'camelCase' naming convention for local variables and inputs.

**Good:** `count`, `xSize`, `blendFactor` 

**Bad**: `Count`, `XSIZE`, `Blend_Factor`

As an alternative, using '_' as a separator in names is also an option.

For public script names, try to avoid non-descriptive names like `a` or `number`.


## File names

Use file names with starting capital letters and spaces as word separators. Naming
should reflect the default use case while not being too general.

**Good:** 'Brick Wall', 'Snake Skin'.

**Bad:** 'brick_wall', 'Snake_Skin'.

If an asset has a major change while the original file needs to be kept, then add an explicit '_vXXX' suffix to the name.
For example, the original 'Brick Wall' should be renamed to 'Brick Wall_v001' and the new version should be named 'Brick Wall_v002'.


## Folder names

A similar naming scheme should be used for folders, as is used for files. Versioning does not apply to folder names.


## Project files

Project files should contain the minimal number of required assets. For very basic assets, there should be 1-1 correspondence between .sqp and .sqa files. 

For example, for 'Basic Circle.sqa' the should be 'Basic Circle.sqp' file that contains only reference to 'Basic Circle.sqa' and to no other assets.

For more complex cases where an asset references to subassets, .sqp file should contain references to both .sqa files.

In case of multiple versions of an asset, .sqp file should contain references to all versions. For example, if there are 'Basic Circle_v001.sqa' and 'Basic Circle_v002.sqa', there should be corresponding 'Basic Circle.sqp' file that contains both asset versions.

