###

Final SCSS file link.

###

Sizing text and blocks, although distinct challenges with their own particulars, in order for correctness to be retained and for things to stay as easy as possible to use, a mechanism is necessary for implementing a grid. That mechanism should be unobtrusive as possible, rather than something to be learned or turn into a reference one needs to constantly look at. Therefore, the API surface should be very small.

A grid's main function is to define the steps that any element can grow or be positioned into. In saying the word "grid", it immediately comes to mind the idea of columns, but a column is really just a helper for understanding the fact that you are in reality putting things in a map.

Think of a chessboard. The grid is composed by squares, and you can only move one square, or many, or half (that's unlike chess, generally not recommended, but technically within proportion), but never by 77% of a unit, or another non-proportional measure. Alternatively, if you're a musician, you can think of when you're trying to fit drum beats in a compass (explain here).

Creativity wants freedom. And these constraints can come across as being opposed to that, but in fact they're there to assist you with keeping proportion, a key element of aesthetics, and thus, good design. In short: using a grid helps making things look right on the screen.

###

Let's start by addressing the problem of sizing units, and a common misconception about them.

Much has been said about `px`, `ems`, `rems`. In short, `px` being considered wrong, `ems` are ok, and `rems` are "easy ems". I'll propose something else entirely: when you work with scales, the unit does not matter, not even a little bit.

The `px` stigma, to the best of my knowledge, comes from the old days os the web when IE had a bug in which text wouldn't scale up when the page was zoomed (Ctrl/CMD plus). Someone then said pixels were a bad idea and a lot was lost in the message.

The proposed solution to the problem was to use ems instead, but with ems comes great power, and with great power comes great responsibility. ems are a proportional, tool-like measure which can *very* easily create a hell of a cascading mess of font sizings if not used mindfully.

For instance, it's not rare finding `font-size` directives applied to containers (often a mistake). Small containers that have one font size used by all its child nodes would be fine, but think of something like this:

    <section>
      <h1>A heading</h1>
      <p>
        Lorem ipsum something.
      </p>
      <blockquote>
        Rah rah rah
      </blockquote>
      <aside>
        <p>Yeah but…</p>
      </aside>
    </section>

In setting the section's font size to something like `1.6em`, every child node gets its base size reset to that value. Meaning: If the font-size of `h1` is set to `1em`, nothing changes, because `1em` means "100% of the parent's font-size", for all intents and purposes.

But we want the heading size to be "slightly bigger" than the rest, no? So we go:

h1 {
  font-size: 1.3em;
}

So ok, but perhaps blockquote should be a bit bigger too, so we go:

blockquote {
  font-size: 1.1em;
}

And aside should be a bit smaller, right? That makes sense:

aside {
  font-size: .8em;
}

(In short, you're actually saying "130%", "110%", and "80%" of the container's font size. For clarity sake, *you may as well just use percentages*, since those take no decyphering)

Now picture what happens in a web app scenario with multiple nested components. Granted, this is ems in misuse, and the point is not that ems are a bad idea. But they carry tooling with them, so they're ideal for on-the-spot proportional measures, which don't fit the vision that you're learning in this booklet. We operate through a scale, and the scale is the source of all correct sizes. Hence, inventing proportions on the spot is, in this instance, wrong.

Last, it's worth mentioning viewport relative units, which are also tooling units that can come in handy. Setting a wrapper's width/height to a percentual value achieves one thing: it sets it to the *width of the parent*. Yes, the *width*. Browsers won't figure that when you say `height: 50%` you probably mean 50% of the height of the parent.

In saying "the parent", you may be going for the viewport (a.k.a. the browser window) width. That's where viewport relative units come into action. You can use `50vw` for "50% of the viewport width", and that will yield a reliable 50% of the window width. For height, you can use `height: 50vh` to get 50% of the window height, and this is particularly useful for modals, or overlays that are sized in relation to the window size.

I won't go into length here about that since there are specific tutorials on viewport relative units out there that also explain `vmin` and `vmax`. This is just so you're aware of them.

###

You may be surprised when I say this, but you don't need a grid framework. Some of them are fine tools, but as a developer, the more you understand the problem domain, the more powerful you are, and this is a problem that is only hard if you never bothered doing that. This belief ultimately leads to you being constrained by nothing but your creativity, and never by your technical expertise. You're welcome to outsource this to a tool once you learn it. But I'm sure you won't want to.

Every time someone suggests a field needs to be nudged to a direction by one pixel, it's almost a given they're doing eyeball-oriented design. That won't get you far. It also makes the discussion a lot more complicated. Suddenly it's up for debate things that, in reality, are either in the correct place or not at all.

A grid has **units**. Things should fit nicely inside these units, including text. When upsizing a font, you upsize it with a scale, so your options are simple: you can move the font size up or down the scale (similarly to dragging the size number bars in Gridlovr), and the scale, which we will implement with a SASS function, will output a pixel value. In short, there'll be font size 0, 1, 2, 3, or X until it's too large, but you won't ever again pick a font size that just "looks right" by trial and error.

Similarly, block elements that have fixed, or maximum/minimum, dimensions will be sized by a `units()` function. So instead of setting a fixed number of, say, pixels to a container, it'll be like this:

    .a-container {
      max-width: units(6);
    }

###

A text node's height is not determined by the `font-size` directive per se. That will be taken into consideration, but it's in fact the `line-height` that will. Sure, you **can** set the `height` if you also declare the node is a block node via `display: inline-block` and then that will be its height, but it'll make for some tall text nodes that are just weird. CSS is flexible and it'll let you do stupid things. That in fact is one of the main problems with it. It's up to you to make sure that flexibility is put to good use.

See this:

    p {
      font-size: 16px;
      line-height: 1.5;
      margin-top: 16px;
    }

If you inspect the paragraph using your browser's developer tools, you'll see that the node is 24 pixels tall. If this paragraph were two lines long, it'd be 48 pixels tall. That's because by setting `line-height: 1.5` you declared that the line height should be 150% of the `font-size` value.

There's nothing technically incorrect in styling things like this, by the way, if the grid unit size is in fact `24px`. But what comes with setting things like `line-height` using per-selector proportional measures such as the unitless number above is people end up setting it to something that may look ok but is incorrect as far as the grid goes. And then another paragraph elsewhere gets a `line-height: 1.3` directive, because it "looks ok". And soon enough the design is full of holes.

Text is always positioned in the centre of the line. So if you want to vertically center a text node, simply give its line height the same height of the container:

    .cube {
      height: 320px;
      width: 320px;

      .promo-paragraph {
        line-height: 320px;
        font-size: 16px;
      }
    }

That wasn't so hard, was it?

###

Now armed with this knowledge, we can establish a few ground rules:

* The base `line-height` value is 1 unit, whatever we decide the unit size should be.
* Text can obviously be bigger than 1 unit, but in which case it'll take more than one line to accomodate it.
* The dimensions of blocks (or anything that's not text) will always be X units for height and width.
* Padding and margin values will also be specified in units.

(This doesn't mean you'll need to go around setting the height of everything, to be clear. If a section has text inside and it needs to grow as tall as necessary to accomodate all text, that'll happen naturally as you add text that's correctly sized to it)

What I'm describing here is the same approach explained in [Gridlover]. Gridlover is a nice tool for generating a scale which you can copy and paste into your styles. If you're not familiar, go play with it and fiddle with the values a little. This will help clarifying the concepts explained thus far.

What will likely happen is you will have 3 scales: one for small displays, one for medium, and one for large displays. When we address responsiveness later on in this booklet, we will go through the use of the first and last scales. For now, know that the functions and mixins coming next will default to using the medium setting.

    $displays: (
      small: (
        font-size: 14px,
        unit: 15px * 1.3,
        scale: 1.25
      ),
      medium: (
        font-size: 18px,
        unit: 18px * 1.3,
        scale: 1.3
      ),
      large: (
        font-size: 20px,
        unit: 20px * 1.5,
        scale: 1.4
      )
    );

The above is a [Sass map](http://www.sitepoint.com/using-sass-maps/). Think of it as a database where we put the scales mentioned before.

Now comes the actual calculations and functions. I'm using a `pow()` function taken from [Sassmeister](http://sassmeister.com/gist/10620fefd1ed75189f1b), which I found via an article by [James Steinbach](http://sitepoint.com/using-sass-build-custom-type-scale-vertical-rhythm/), on this same topic of vertical rhythm. So I won't repeat it here.

The first function we'll write is one that'll use the scale above to output values we can use in directives:

    @function font-scale($x, $size: 'medium') {
      $display:     map-get($displays, $size);
      $scale:       map-get($display, 'scale');
      $font-size:   map-get($display, 'font-size');
      @return round($font-size * pow($scale, $x));
    }

The parameter should always be an integer, and it can be smaller, equal, or greater than zero. Technically it's possible to use a fraction, and it's not incorrect so long as the font remains within the bounds of the line height, but you should instead rely on a `scale` value that allows for as much granularity as possible.

An example of manually setting the font size with the function above:

    .welcome-heading {
      font-size: font-scale(1);
      line-height: units(2);
    }

Next comes a function for outputting a unit that conforms with the grid, which we'll use for paddings, margins, widths and (line) heights when set to a fixed value.

    @function units($x, $size: 'medium') {
      $display: map-get($displays, $size);
      @return map-get($display, 'unit') * $x;
    }

Example:

    .container {
      padding: units(1);
      width: units(8);
    }

In keeping with the lingo, and to avoid ridiculously high values of `units()` which will end up not meaning much, `column()` outputs a column width. The convention this sets is that a column width is 4 units. You could potentially keep this in a variable outside of this method.

    @function columns($x, $size: 'medium') {
      @return units(4, $size) * $x;
    }

Example:

    .container {
      padding: units(1);
      width: columns(2);
    }

And finally, a mixin for making it easy to set font sizes that come with a correct line height value. This maps directly to the result you get from dragging the scale value in Gridlover:

    @mixin font-size($units, $size: 'medium') {
      $display: map-get($displays, $size);
      $unit:    map-get($display, 'unit');
      $lh:      $unit;

      @while $lh < font-scale($units, $size) {
        $lh: $lh + $unit;
      }

      font-size: font-scale($units, $size);
      line-height: $lh;
    }

And an example:

  .an-article {
    p {
      @include font-size(0);
    }
  }

To briefly explain what happened in the previous function, in order:

1) After some digging, we fetch the base unit from the scale specified in the second argument (if no argument, it'll default to `medium`) and put it into a `$lh` variable. This variable will contain the minimum valid height for a `line-height`, which is always 1 unit.
2) In a `@while` loop, we increment `$lh` by one unit until it can accommodate the height of `font-scale()`.
3) We then output a `font-size` and a `line-height` directives with the generated values.

Throughout this booklet we'll be using the above mixin for sizing text all over.

###

This short puzzle will help clarify a lot of how sizing things in a browser works:

Say you want a container of a certain width to contain two other containers inside, perfectly.

*image of the containers*

The first thing most do is think of floats. This is crazy. Fact is those two elements are inline block elements, and shouldn't need to be floated just to behave like so. There's a value for `display` in CSS for doing precisely that, which is `inline-block`.

So:

    <div class="wrapper">
      <div class="container-a"></div>
      <div class="container-b"></div>
    </div>

    .wrapper {
      width: units(10);
    }

    .container-a,
    .container-b {
      display: inline-block;
    }

    .container-a {
      width: units(6);
    }

    .container-b {
      width: units(4);
    }

That looks like it's all you'd need to do, right? Wrong. And it's not because CSS is terrible. The "problem" is the existence of something known as a text node. A text node is how a browser understands text that's between two containers, and guess what: what's separating the two inner tags above (the carriage return or "enter" you pressed) is one of those.

Don't believe me? Rewrite the markup above like so, and refresh the page:

    <div class="wrapper">
      <div class="container-a"></div><div class="container-b"></div>
    </div>

Text nodes take space too. So in reality, you're asking for `wrapper` to contain more than those two containers up there, and we just declared that one takes 60% of the space, and the other 40%, so the total sum is over 100%.

One way to solve this problem, the way we'll use throughout this guide, is by setting the font size of the container to `0`. We can then set the font-size of text elements back to the correct size again where appropriate, thus making all text nodes "invisible" inside `wrapper`.

    .wrapper {
      width: units(10);
      font-size: 0;
    }

    .container-a,
    .container-b {
      display: inline-block;

      p {
        @include font-size(1);
      }
    }

    .container-a {
      width: units(6);
    }

    .container-b {
      width: units(4);
    }

Yes, it needs to be painfully clear that the reason why we're doing this is so we work *with* the browser, and not against it. There are a number of hacks for solving the problem above, and while I won't cast the first stone, we should strive for solutions that tackle the real issue as much as possible.

We could've re-set the font size directly in `container-a` and `container-b`, rather than in a paragraph (or any other text node). As explained earlier, that could've been fine if we're going for either a single text size throughout, or perhaps a good default that has few overrides.
