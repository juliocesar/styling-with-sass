###

One of the inheritances from the times a browser’s main purpose was to read documents is the concept of lines. This will be relevant to any component that has text in it.

The controversially named `vertical-align` attribute works on lines, not blocks. That’s extremely confusing since most expect it to just do what the name says. Fact is it is doing that, but it lets you change the vertical alignment of text *within a line*.

To make this clear, look at this example.

    Foo bar baz (units(2) height, font-size(1))

The default value for `vertical-align` is `baseline`, which in short it means the text will appear around the bottom of the line height. This is what happens when we change it to `top`:

    Show top

A container’s `height` won’t help you getting there, since as explained, `vertical-align` applies to the line height and not it. So in the container below, despite we setting `vertical-align: top`, it won’t work as expected:

    Container with units(2) height, units(1) line height

Knowing this is useful for patterns such as menus with text-looking buttons, where the buttons are vertically centered:

    Example top menu

Now, you may then be inclined to think that the solution for vertically centering text is setting the line height to the same as the container height, but there’s a nuance to that: should the text span to two lines, the line break will look horrible:

    Example

This being the case, you’re better off using either flexbox (while still keeping a sane line height set), or hack it for older browsers emulating a `<table>` with `display: table` and setting it’s vertical alignment to `middle`.

Yes, the exception to the point made thus far is `vertical-align` works differently on tables. Read: as you’d expect.

###

In practice, there are two main ways you can position an element: in-grid and off-grid. In-grid means the element will push other elements around with its dimensions, while positioning an element off grid means whatever is the `top` and `left` values you give to it will be where the element will appear, and multiple off-grid elements will stack on top of each other, the last on top of the  first, in the order they’re written in the markup, unless overridden by a `z-index` directive.

For in-grid elements, having flexbox available changes everything because flexbox will give you full control over where to render anything without you needing to compromise on much, if at all. So while it’s relevant to the topic, there are guides out there that are wholly dedicated to it that are better suited to teaching flexbox specifically. In here, only comparisons will be covered where appropriate.

Off-grid elements tend to be easy in that they'll be positioned where you tell them to. This comes with a few caveats, one of them being that magic numbers then seem to be the answer when it comes to positioning, but the need for those disappear when you rely on a grid, which we will. Another caveat is if you need elements to push one another when, say, you add more of them, it just won't happen. Though as a matter of strategy, we will be using off-grid elements only where appropriate.

##

Let's cover how to correctly position things next to each other first. In the previous chapter, an example of sizing elements with exact `50%` of width next to each other was presented. That example is multi-faceted in that it also explains how to position those elements.

*explain the has-columns module here*

This structure is common: grid of columns libraries are all over the web, but chances are you never rolled one of your own, but now you will.

One crucial element to any columns library is gutters. As we've seen in the aforementioned example, placing things next to each other is easy without any hacks. The problem begins when you start needing gutters. Which is almost always.

Implementing gutters that require no compromise on the markup would be trivial if it weren't for the fact that to get there, you'd have to rely on `calc()`, and `calc()` is only supported on Android 4+. Funny enough (and by funny I mean tragic), IE9 supports `calc()` just fine, even though Android 3 was launched around a month before it, and Microsoft, not Google, has a long standing tradition of not producing remarkable browsers.

At any rate, we'll discuss the approach, in hopes a miracle forces every Android user on the planet to upgrade to 4+ sometime soon.

*explain the approach*

*explain the compromised approach with paddings*

###

Another common pattern is page headers, or depending what you have in mind, you could be seeing it as a mobile web app top menu. Although common, there are many ways you can do it wrong.

Commonly, this is how it looks:

*show a sketch*
