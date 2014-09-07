##

You don't hate CSS. You hate, maybe without even knowing, non-systematic styling. This leads to all the grief everyone frequently experiences. Non-systematic styling means thoughtlessly adding directives until the thing looks as intended.

##

Understanding takes a little extra work initially, and next to nothing in the medium and long term, since it grows by itself. Applying a methodology is a constant game of exceptions due to what you remember and what you forget…

Concede to the possibility that you don't know something as you learn it, and only then you will succeed at that. Try your best to retain a dose of that openness even after nothing seems to be an obstacle.

##

Imagine building an interface consisted simply of writing a bit of structured text, and in order to style it and make it capable of reacting to almost any change in circumstance, we could describe how this behaviour works in plain English. This is HTML/CSS. The premise isn't in the slightest flawed. The implementation, until recently, left a lot to be desired. **Until recently**.

##

Directives-based programming, or configuring if you will, means every single "command" does a lot, which is unlike most programming languages. So things can get out of hand a lot more quickly. Directives that have implications beyond just the element they're applied to (e.g.: display block vs inline-block) need to be carefully thought of and well understood.

##

A crop of strategies exists to address almost every styling problem under the sun. The problem then becomes understanding these strategies well (as some are very complex), which makes most people good at said strategy, best case scenario, while remaining oblivious to the exact problems they're dealing with. **For no other part of the front-end stack, this is truest than CSS**. And for no other part of the stack, raw understanding will do more for you than any methodology ever will.

##

While it's possible to use just CSS for doing this, SASS goes so well with creating a UI system that it'd be stupid, from that point of view, not to use it. SASS however has a lot of features, but the good news is you'll need less than half of them to be effective at it.

##

We will write a lot of stuff from scratch, for which there are alternatives out there. The reason for that is **none** of the problems we're trying to solve are hard by any stretch of the imagination. What makes them appear hard is the fact you may not have invested enough time in understanding and embracing these problems. But fear not, for this is a much shorter road than you'd think.

##

Tooling *correctly* will assist you in getting there faster. You should have autoprefixer, and a way to compile SASS at your disposal. The former will allow you to write code without worrying about vendor prefixes, but more importantly, it unifies discrepant syntaxes such as gradients and flexbox. That is, you will write directive in the most current, standard way and it'll output, alongside the original one, code that ensures it works in browsers that haven't **yet** adopted the standard syntax.

##

Browser coverage for this booklet is IE9+, and Android 4+ (YMMV). Much of it will just work in IE8 by dropping in polyfills such as selectivizr.

##

Every chapter will yield one or more modules (or SCSS files), which you're welcome to download first thing so you can use them before you jump into any actual reading.
