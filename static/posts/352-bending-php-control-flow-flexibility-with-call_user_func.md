Bending PHP, Control Flow Flexibility With call_user_func()
===========================================================

August 16, 2011

In comparison to other dynamic languages like <a class="external" href="http://python.org">Python</a> and <a class="external" href="http://www.ruby-lang.org/en/">Ruby</a>, control flow mechanisms in PHP are rigid. But in the absence of first-class functions and limited OOP paradigms, there's still some flexibility in the language thanks to built in functions like [`call_user_func()`](http://php.net/call_user_func).

While lacking the same syntactic sugar, `call_user_func()` is the equivalent of <a class="external" href="http://php.net/manual/en/language.variables.variable.php">variable variables</a>(`$$v`) for functions. But instead of declaring variables dynamically, it's calling function dynamically.

This adds a very nice control flow mechanisms to PHP: dynamic function call ordering. Need to change the order a series of function is called depending on application state? With `call_user_func()` and its twin function `call_user_func_array()` it's possible without the mess of hard coded control structures and missed fringe cases.
