###

In practice, there are two main ways you can position an element: in-grid and off-grid. In-grid means the element will push other elements around with its dimensions, while positioning an element off grid means whatever is the `top` and `left` values you give to it will be where the element will appear, and multiple off-grid elements will stack on top of each other, the last on top of the  first, in the order they’re written in the markup.

For in-grid elements, having flexbox available changes everything because flexbox will give you full control of where to render anything without you needing to compromise on much, if at all. So while it’s relevant to the topic, there are guides out there that are wholly dedicated to it that are better suited to teaching flexbox specifically.

Nevertheless, the concepts explained here are useful for understanding the fundamentals.

###

When laying out the elements of a component, its important knowing exactly what features it’ll need. For instance, if a header has two links on each side and it’ll never go beyond that, the thinking that goes behind the directives is very different than if it had to support an indefinite number of links
