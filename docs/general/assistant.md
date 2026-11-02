# AI assistant

The AI assistant edits your materials from plain-language requests. Open the *Assistant* tab in the sidebar of the node graph; it is there on your own assets while the node graph is open. Type what you want and send it with the send button or <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (<kbd>Shift</kbd>+<kbd>Enter</kbd> also works).

Each request sends the assistant the graph open in the editor and the nodes you have selected, so you can select a node and ask about "this node". The chat history is kept in your browser, separately for each asset.

## What to ask

Describe the result you want, as you would to a colleague: "make the rust only appear in the cavities", "add a scratch layer on top and keep it subtle", "the stones look too regular, vary their size". You can also ask for exact edits: "connect the noise to the roughness of the Mix layer 2", "rename the selected nodes".

The assistant is careful with what you already have: it changes the connections and parameters of existing nodes only when you ask for it, and builds a new setup next to your graph without connecting it, unless you say where it goes ("...and mix it over the base material"). It tells you what it did, and the nodes it added or changed are highlighted in the graph.

## Editing the node graph

The assistant adds, removes, connects and renames nodes and changes their parameters. A larger change, such as building a new layer from several nodes, is made in one go: either all of it is applied or, if something does not fit, none of it.

It can also:

* **Duplicate nodes** — copies of a selection, connected to the same inputs as the originals.
* **Group nodes** — moves a set of nodes into a new *Node Group*, with group inputs and outputs for the connections that cross it, so the result looks the same.
* **Check the graph** — after larger changes it looks for connections that did not fit, nodes with errors and parts that fail to render, and fixes what it finds.

The assistant edits the graph you have open, including the inside of a *Node Group* you have entered.

## Materials of a model

In a texturing project whose model has several materials, the assistant can switch to another material and edit it. When you ask, it also:

* **Creates a material** for some parts of the mesh.
* **Duplicates a material**, for example to give a second part a variation of an existing one.
* **Assigns a material** to other parts of the mesh.

Refer to the mesh parts by their names in the model. A material that no part of the mesh uses any more is marked *(unused)* in the material list; it stays in the project, so you can assign it again later.

## Views and screenshots

The assistant can show a node in one of the viewports, for example "show the roughness of this mask in view 2", or switch a view between *3D*, *2D* and the tiled *2D* view. Views only change what you see, never the material.

To check its own work, the assistant can take screenshots of the viewport, from other angles too, and look at the image of a single node, tiled to show its seams. It can also measure a node's values, for example whether a mask really reaches 0 and 1. The screenshots it took are shown under its reply. Screenshots and node images need a model that can see images.

## Images and assets

Use the image button next to the prompt to attach pictures: **Add pictures** from your computer, **Add from assets**, or **Attach viewport** for a screenshot of the current view. You can also paste or drop images into the prompt. The assistant uses them as a reference, for example "match the colours of this photo".

To use an attached picture in the material itself, say so: "use this photo as the base colour". The assistant uploads it as an image asset of yours and adds it to the graph with an *Image* node.

The assistant can also search the Artlets library and your own assets for materials, generators and images, by name or tag, and add them to the graph: "add a moss material from my assets".

## Export

When you ask, the assistant exports the textures as a zip file or the model as a GLB file. A texture export starts from the settings of the [Export](/general/export) dialog, with the changes you ask for, such as "export all materials as 16-bit PNG at 2048 with an ORM map"; the changed settings are saved in the dialog for next time.

## Questions about Artlets

Ask how something works, for example "what does Add to Last Layer do in the Mix node?". The assistant answers from this documentation and links the page it used.

## Undoing changes

The assistant's changes are kept and saved as soon as its reply is done, and the nodes it added or changed glow for a few seconds. You can go on working or send the next request right away.

When a reply has changed something, **Undo assistant changes** appears at the bottom right of the node graph. It undoes everything the reply did: graph edits, new and duplicated materials, and mesh parts moved to another material. Press it again to undo the reply before that. Images it uploaded as assets stay in your assets. Once you edit the graph yourself the button goes away, since undoing would also lose your edit; <kbd>Ctrl</kbd>+<kbd>Z</kbd> still steps back through the graph's history.

While a request runs, the send button becomes a stop button that cancels it.

## Models and daily allowance

Pick the AI model in the menu next to the send button. Faster models are good for small, exact edits; the more capable ones are better at building materials and at longer requests. A text-only model cannot see attached pictures or take screenshots.

The assistant has a daily allowance that comes with your plan. Every request uses part of it, depending on the length of the conversation, how much work the request takes and the model: a more capable model uses the allowance faster. Hover the send button to see how much is left today. When it runs out, the chat tells you when it resets.
