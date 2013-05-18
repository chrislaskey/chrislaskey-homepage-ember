Monitoring File System Updates by VIM in Python
===============================================

May 13, 2013

Due to the way VIM updates files event-based kernel hooks for file system
updates are not triggered when a file is updated. This makes triggering
automated build scripts tricky as the preferred method of file system
monitoring does not work.

But it is still possible to monitor file system updates in VIM. Unix file systems
(including those used on OS X and most Linux distros) track the last time a
file was modified, a field which is updated when VIM saves.

In Python this information can be read using the standard library's
`os.path.getmtime()` method. Combined with a simple polling mechanism, it's
easy to monitor and trigger events based on file system updates by VIM.

For an example of this in action see my
[build-monitory.py](https://github.com/chrislaskey/build-assets/blob/github/build-monitor.py)
script which is part of a [build-assets](https://github.com/chrislaskey/build-assets)
repository on github. The `build-monitor.py` file uses polling to trigger Ant /
Buildr scripts for tasks like compiling LESS, minifying CSS, and combining
JavaScript files.

VIM is an Edge Case
-------------------

The fact that VIM does not trigger a file change event is an edge case. Polling
solutions are never ideal, requiring a compromise between resource use (short
poll times) and latency after event (long poll times).

Whenever possible, using event-based file system monitoring is preferred. Each
operating system has some system for event-based file system monitoring.

For cross-platform file system monitoring in Python
[Watchdog](http://pythonhosted.org/watchdog/) is highly recommended. Watchdog
simplifies the varied APIs and obscurs platform specific idiosyncrasies
involved in file system monitoring.
