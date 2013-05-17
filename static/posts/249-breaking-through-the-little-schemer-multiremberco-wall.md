Breaking Through The Little Schemer multirember&#038;co Wall
============================================================

June 5, 2011

I hit the proverbial wall. Everything was going swimmingly in my read through The Little Schemer until I hit page 137 and the introduction of multirember&co. Though I had not been planning on referencing the internet, I had to admit temporary defeat and look for help wrapping my head around my first exposure to a collector in Scheme.

After a surprising number of false starts, I came across Michael Harrison's fantastic article [Unpacking multirember&co from TLS](http://www.michaelharrison.ws/weblog/?p=34). If you're here because of trouble with multirember&co, stop right now and read it. I'll wait.

When the penny dropped, I realized the idea of a collector isn't anything new. It follows the same process The Little Schemer builds from page one: 1. Recurse and build a stack 2. When finished recursing evaluate the stack.

Take a simple Sum function for example:

    (define length
        (lambda (lat)
            (cond
                ((null? lat) 0)
                (else (+ 1 (length (cdr lat)))))))

Which for (length (one two three four)) first builds this stack:

    1 + (length (two three four))
    1 + 1 + (length (three four))
    1 + 1 + 1 + (length (four))
    1 + 1 + 1 + 1 + (length ())
    1 + 1 + 1 + 1 + 0

Then evaluates the stack:

    1 + 1 + 1 + 1 + 0
    1 + 1 + 1 + 1
    1 + 1 + 2
    1 + 3
    4

The same has already been seen with simple functions. Build a stack and evaluate it. Take this for example, the stack after building a list with cons:

    (cons 'one (cons 'two (cons 'three (cons 'four '()))))
    (cons 'one (cons 'two (cons 'three '(four))))
    (cons 'one (cons 'two '(three four)))
    (cons 'one '(two three four))
    (one two three four)

A collector function isn't any different. Really.

In the example multirember&co, it builds a stack of functions until the final values are returned `(quote ())` and `(quote ())`. Then it starts evaluating the stack from the right-to-left/inside-out. Each evaluated function returns two values, which in turn are used as input values for the next function in the stack. The neat thing is each function waiting in the stack already has a set of instructions and its own variables from when it was added to the stack, i.e. the value of `(car lat)` when the function was added to the stack. This access to variables unique to the function when it was first instantiated is called a closure.
