Monitoring Long Running IO Commands with pv
===========================================

June 18, 2012

Setting up a virtual machine environment means moving around a lot of big files. I prefer to use raw LVM disk images for virtual machines, as they have fewer IO bottlenecks and allow live backups through the LVM Snapshot functionality. This also means I spend a lot of time moving around logical volume data on the command line with `dd`. These transfers can take anywhere from a couple minutes to an hour depending on the size.

I use the `pv` Pipe Viewer utility to track progress. As the name implies, it works by tracking data moving through piped commands. Using it is just a matter of placing it between two commands via pipes. So:

	dd if=/dev/mapper/vg-lv1 of=/dev/mapper/vg-lv2

becomes:

	dd if=/dev/mapper/vg-lv1 | pv | dd of=/dev/mapper/vg-lv2

When executed the data throughput is displayed in realtime.

Depending on the commands piping data to `pv` it not only displays current progress, but also time remaining. There are packages available for `apt` and `yum`.
