JavaScript First-class Functions and Prototypal Inheritence
===========================================================

September 8, 2012

JavaScript Patterns by Stoyan Stefanov has been far more thought-provoking than I had expected when I first picked it up. Event-driven architecture of JavaScript receives the lion's share of attention these days, but I've found a lot more of my thoughts focused on JavaScript's prototypal inheritance and first-class functions.

Prototypal inheritance is an interesting paradigm, one I believe is neither better or worse than the more common classical inheritance. The biggest problem with non-traditional paradigms is they need to be better than the status quo to gain any traction. Indeed the only problem I have with prototypal inheritance is the lack of solid understanding amongst developers to exploit the powerful aspects while remaining accessible.

Related, a frequent confusion in JavaScript occurs over what `this` references in different contexts. It's not inherently hard - `this` references the global object unless prefaced by the `new` keyword - but rather it's hard to remember. Drawing on my own experience I'm convinced for many programmers it's just a matter of repetition before it becomes familiar.

What I do love about JavaScript is true first-class functions. First-class functions are wonderfully powerful. Smart use of them can help overcome short comings of the language like global namespace by using closures to encapsulate and pass variables. Wielded correctly first-class functions can bend a language into more convenient and more expressive ways, all while cutting down on code volume and increasing readability.

Powerful and complete anonymous/lambda functions are a boon, one that is especially helpful when it comes to callback powered event-driven design... but that is a topic for another time.

For a surprisingly thought-provoking book on JavaScript, check out [JavaScript Patterns][1].

 [1]: http://www.amazon.com/JavaScript-Patterns-Stoyan-Stefanov/dp/0596806752

