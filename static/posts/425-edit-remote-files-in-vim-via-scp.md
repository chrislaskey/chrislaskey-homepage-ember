Edit Remote Files in Vim via SCP
================================

November 24, 2011

One of the many neat features of VIM is support for remote editing. The Vim command is simply:

	:edit scp://username@hostname/directory/path/starting/in/home

If the `scp://` protocol wasn't already a give away, VIM uses secure copy [<code>scp</code>](http://linux.die.net/man/1/scp) to edit remote files. This means many of the same tricks used with `scp` on the command-line can be used inside the Vim command.

Instead of typing in a password every time, use ssh private/public keys and `ssh-agent`. Or utilize aliases and settings defined in ssh configuration files (`~/.ssh/config`).

So a quick edit of the hosts file on a remote server named tux is as simple as:

	:e scp://tux//etc/hosts
