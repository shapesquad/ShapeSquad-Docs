# Send to Artlets

**Send to Artlets** is a Blender extensions that simplifies the texturing workflow between Artlets and Blender.

## Overview

**Send to Artlets** exports the objects you have selected in viewport as a *.glb* file with correct settings, so you can import it into a new texturing project in Artlets.

Also, it auto-refreshes image textures in your Blender project when they change on disk. This lets you preview textures in the final scene while working in Artlets.


## Installation 

Download the latest release [here](https://cdn.badnormals.com/Send_to_Artlets).

In Blender, go to *Edit -> Preferences -> Extensions -> Install from disk.*

## Usage

### Exporting

The extension lives in the *Viewport N-panel -> Artlets*.

Select an object you wish to texture in Artlets and in the extension, click on *Export Selected*. This exports the selected object as a *.glb* file. 

The export will be saved to the same folder with your .blend file, in a folder named 'Artlets Model Exports.'

Now you can create a new project in Artlets and use that model.

### Texture refreshing

To preview the textures you are creating in Artlets directly in Blender, open the Export menu from the top-right corner in Artlets.

Click *Export to folder* and export the textures in a suitable location.

Set up the textures in Blender using the <kbd>Shift</kbd>+<kbd>Ctrl</kbd>+<kbd>T</kbd> shortcut, which auto-populates the *Principled BSDF* shader with PBR textures from a folder. 

You can now see the textures from Artlets in Blender. Now make an edit in Artlets and press <kbd>Shift</kbd>+<kbd>R</kbd> on keyboard. This reexports textures to the previously defined folder. 

Textures will update automatically in Blender after a couple of seconds. 












