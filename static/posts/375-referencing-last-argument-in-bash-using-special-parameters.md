Referencing Last Argument in Bash using Special Parameters
==========================================================

September 3, 2011

Bash contains a number of powerful special parameters that can be used on both the command line and inside scripts. My most used of the bunch is `$_`, which references the last argument of the preceding command.

To illustrate the power of this, take the example of creating a new directory and cd'ing into it. Instead of writing the path twice:

    $ mkdir -p /some/new/directory; cd /some/new/directory;

The second path value can be replaced with the special parameter `$_`:

    $ mkdir -p /some/new/directory; cd $_;

This can also be accomplished using bash variables, but is shorter since it does not require a separate definition clause.

There are two caveats. First, the `$_` special parameter only refers to the last argument if the preceding command contains multiple arguments. 

Second, the reference does not work when chaining via pipes (e.g. `|`). However, it will work for commands containing both logic separators (e.g. `&&` and `||`) and command separators (e.g. `;`).

For a great summary of all Bash special parameters, check out the article [List of special bash parameter used in Unix or Linux script](http://javarevisited.blogspot.com/2011/06/special-bash-parameters-in-script-linux.html).
