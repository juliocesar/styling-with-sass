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
