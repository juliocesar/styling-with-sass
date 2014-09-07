* The breakdown approach is summarised by this: each element of the screen is a module. Each module is identified by a class name. Each module gets its own SCSS file.

* A manifest will load what a given screen needs. Whether you decide to load everything, or parts of the system, will determine how many manifests you'll have. So for example, if a JavaScript app needs all modules because it won't ever reload the page, you'll most likely need one manifest. Conversely, if this is a website made of a set of pages, you could write one manifest for each and save on bytes transferred by requiring only what's necessary for it. Be mindful, however, that due to the flow of use of a common website (hit front page first), loading everything and then caching that request will often be more performant than making one HTTP request for each manifest of a page visited.

* The above system of manifests **does not** exclude approaches such as inlining CSS for better performance. (more here)

* Each file name will map directly to a class name. So for example, `main-header.scss` will contain one or both of these: variables that apply to *only* the `main-header` module, and a `.main-header { ... }` declaration.

* It'd be unreasonable to call **every single small thing** on the screen a module and create files for things that could be nested under a bigger one without problems. For example, if a certain section module has a paragraph with images inside which are all floated to the right, there is no need for 3 modules at least until one of these becomes sufficiently complex. **This is exactly** the same thinking applied to programming: a function is enough for small logical units, until it grows and logic is broken off to its own module.

* It's often the case that container modules will refer to other modules that it contains, and rather than setting properties that radically change the way it works directly in a module, the container should dictate those concerns. For example, in the following scenario:

<sketch>

For `main-menu` to work, it doesn't need to carry `float: left` with itself. That module is only "floated" to the left because given the way we designed its container, it should be so. So

<code with breakdown>

The fact that it's unlikely we would ever be using `main-menu` in any other way other than the design above is irrelevant: the point is is isolating presentation logic correctly.
