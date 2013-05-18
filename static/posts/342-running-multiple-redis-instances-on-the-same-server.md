Running Multiple Redis Instances on the Same Server
===================================================

August 6, 2011

Setting up multiple Redis instances on one server is surprisingly easy. Redis runs as a daemon - a background process that answers requests on demand but is otherwise dormant - and receives requests by over a socket.

Running multiple instances is as simple as creating a separate config file and a new init script. The config file specifies details like memory limits and the persistent storage location, and the init script handles starting/stopping of the daemon process.

Below I walk through the process of setting up a second Redis instance simply called redis-cache listening on port 6380 on a dev server running Debian Squeeze.

## Config File

The first step is to copy the config file (on Debian it's usually found in `/etc/redis/redis.conf`), name it something simple like redis-cache.conf and leave it in the same directory as the original redis.conf. There are four important values to change in our new /etc/redis/cache.conf file.

The first is the PID file `pidfile /var/run/redis-cache.pid`. Remember this value, it will be used in the init script.

The other three are `port 6380`, followed by `logfile /var/log/redis/redis-server-cache.log` and finally `dir /var/lib/redis-cache`. 

The config file is well documented, so now's a great time to read through it and make any application specific changes.

Note: as Damien pointed out in the comments below, the path specified in the `dir` line in the config file is where Redis data will persist (be saved) on disk. It is important to create the directory and give it redis:redis ownership.

## Init Script

Below is the complete init script I use on a server running Debian Squeeze. The important part is the first four lines, setting unique values for DAEMON_ARGS (the location of the custom config file), NAME, DESC and PIDFILE (use the same value as in the new config). Remember this example script is a Debian init script, make sure to use one that is compatible with your operating system!

	### BEGIN INIT INFO
	# Provides:		redis-server-cache
	# Required-Start:	$syslog $remote_fs
	# Required-Stop:	$syslog $remote_fs
	# Should-Start:		$local_fs
	# Should-Stop:		$local_fs
	# Default-Start:	2 3 4 5
	# Default-Stop:		0 1 6
	# Short-Description:	redis-server - Persistent key-value db
	# Description:		redis-server - Persistent key-value db
	### END INIT INFO

	PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
	DAEMON=/usr/bin/redis-server
	DAEMON_ARGS=/etc/redis/cache.conf
	NAME=redis-server-cache
	DESC=redis-server-cache
	PIDFILE=/var/run/redis-cache.pid

	test -x $DAEMON || exit 0
	test -x $DAEMONBOOTSTRAP || exit 0

	set -e

	case "$1" in
  	start)
        	echo -n "Starting $DESC: "
        	touch $PIDFILE
        	chown redis:redis $PIDFILE
        	if start-stop-daemon --start --quiet --umask 007 --pidfile $PIDFILE --chuid redis:redis --exec $DAEMON -- $DAEMON_ARGS
        	then
                	echo "$NAME."
        	else
                	echo "failed"
        	fi
        	;;
  	stop)
        	echo -n "Stopping $DESC: "
        	if start-stop-daemon --stop --retry 10 --quiet --oknodo --pidfile $PIDFILE --exec $DAEMON
        	then
                	echo "$NAME."
        	else
                	echo "failed"
        	fi
        	rm -f $PIDFILE
        	;;

  	restart|force-reload)
        	${0} stop
        	${0} start
        	;;
  	*)
        	echo "Usage: /etc/init.d/$NAME {start|stop|restart|force-reload}" >&2
        	exit 1
        	;;
	esac    

Place the init script in the correct location (on Debian it's `/etc/init.d/`), and add the correct run level (on Debian the command is `update-rc.d my-redis-init-file defaults`) to ensure it loads on startup/shutdown.

Finally start up the new instance `/etc/init.d/redis-server-cache start`. Verify everything is working via the Redis command line interface `redis-cli -p 6380`. Be sure to do a quick SET/GET check, as redis-cli won't throw an error on a misconfigured instance until after the first command is received.

## Which Socket

Now that the instance is up and running, the only thing left is to hook up the new application to it. But which method of communication is better, using the TCP socket or the Unix socket?

The difference between the two is minimal. A TCP socket communicates over the networking layer, making requests to the [loopback address](http://en.wikipedia.org/wiki/Loopback) (usually 127.0.0.1) on a specific port (Redis defaults to 6379). Unix servers provide a second alternative, a Unix domain socket. These act similar to TCP sockets but do not use the networking layer to communicate, instead they are implemented as files in the operating system.

Both work great, and while there are subtle differences between them, choose what works best for the application and don't sweat the details.

## Alternatives to Multiple Instances

Redis supports two alternative methods to spawning multiple instances. The first is to simply apply your own key namespacing by prefixing each key with the application/function. Second is to utilize the 16 numeric databases Redis supports to prevent namespace collisions. While technically possible, the overhead for multiple instances is so low and the gains are so high (custom configuration per utilization), there's little reason to run different tasks within only one Redis instance.

Now that you know how to do it, the sky is now the limit. I've deployed multiple Redis instances on one box to handle different tasks like smart MySQL caching, HTML page caching, and application logging, each with their own optimized configuration.
