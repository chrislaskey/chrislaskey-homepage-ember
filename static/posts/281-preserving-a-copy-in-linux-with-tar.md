Preserving a Copy in Linux with Tar
===================================

June 14, 2011

Ah, `$ mv` and `$ cp` how venerable they are. But there are times when a bit more is needed, namely when an exact copy (with hidden files, permissions, etc all preserved) is required. In that case `tar` is ready to step in:

    tar cf - . | (cd /newdir ; tar xf -)

It's one of those multi-command one-liners that makes perfect sense once I see it, but may not have derived it on my own, "Of course! The solution is to pipe a created tar directly into an unpack tar command in the new location." Thanks internet!
