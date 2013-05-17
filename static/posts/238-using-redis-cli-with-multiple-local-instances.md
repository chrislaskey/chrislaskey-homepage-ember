Using Redis-cli with Multiple Local Instances
=============================================

June 2, 2011

The more I read about [Redis][1] the more my mind starts to fill with potential use cases. A blazingly fast in-memory key-value database with support for basic data-structures, Redis is worth getting excited about.

Recently I've been testing it for a variety of caching and logging scenarios. While Redis does support multiple databases on one instance, it's much better to run multiple instances side-by-side. This gives the freedom of separate configuration options optimized for each use case (what's optimal for caching won't necessarily be optimal for logging, and vice versa).

Redis includes a command line interface, which helps innumerably for rapid testing and development. But once I set up I set up two Redis instances running on one box (a topic for another post), I was a bit puzzled about how to specify which Redis instance to connect to. The solution is quite simple:

    $ redis-cli -h [host] -p [port]

So now swapping between instances is as simple as `$ redis-cli` and `$ redis-cli -p 6380` (the default port and loopback host are implied when not explicitly declared).

One final note, redis-cli will not throw an error if you have entered an incorrect host or port number until after the first command is entered. This tripped me up when I was taking stabs in the dark!

 [1]: http://redis.io
