Running Jenkins/Hudson on Port 80 Using Iptables
================================================

January 15, 2013

The default Jenkins/Hudson package runs on port 8080 using Apache. When accessing the server in a web browser the port must be included in the address: `http://jenkins.domain.com:8080/`.

Web browsers default to making requests to port 80 - port 443 for HTTPS/SSL - and let users omit the `:port` specification in the address. Conceptually then, in order to access Jenkins via `http://jenkins.domain.com`, it simply needs to be configured to listen to traffic coming over port 80.

Jenkins lets the port number be changed in its configuration file. On Debian/Ubuntu systems this file is found in `/etc/default/jenkins`. The wrinkle is on Unix systems network ports below 1024 are privileged, meaning only programs with root permissions can listen on these ports. Apache starts with root permissions, but for security gives them up quickly in its startup cycle. The Jenkins binding appears to be done after the root permissions are ceded.

So simply changing the port number in the Jenkins configuration file won't do it. The good news is when it comes to Unix networking there's a variety of ways to accomplish a particular goal. The most common solution I've seen out there is to fix this on the web server level. In other words, configure Apache to redirect, or proxy, incoming traffic from port 80 to Jenkins listening on port 8080, then relay the results back.

Other solutions install a secondary web server like Nginx to proxy requests to the default Apache/Jenkins listening on 8080. Fixing the problem on the web server level is fine, though I wouldn't recommend installing a secondary web server just to proxy requests.

But there's another solution available: using `iptables` to reroute traffic on port 80 to port 8080. From a technical standpoint this is much simpler, as packets are forwarded on efficiently at the kernel level without involving the heavier web server application. To implement the iptables solution there are only three required rules:

    -A INPUT -i eth0 -p tcp --dport 80 -j ACCEPT
    -A INPUT -i eth0 -p tcp --dport 8080 -j ACCEPT
    -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080

The first two make sure packets send to port 80 and 8080, respectively, will be accepted and not blocked. The third rule does the actual rerouting, redirecting TCP packets going to port 80 to port 8080. On most systems only the last rule is technically required, though please do include the first two for both security and documentation.

Note: make sure to backup current rules using `iptables-save > output-file.rules` before changing iptable rules!

With the current rules backed up, these new rules can be tested directly on the command line using `iptables <command>` and confirmed using `iptables -L -n` to list current rules.

In order for these rules persist after a system reboot they should be stored in a file:

	## Filter Table
	
	*filter
	:INPUT ACCEPT [971:197590]
	:FORWARD ACCEPT [0:0]
	:OUTPUT ACCEPT [95:9682]
	-A INPUT -i eth0 -p tcp --dport 80 -j ACCEPT
	-A INPUT -i eth0 -p tcp --dport 8080 -j ACCEPT
	COMMIT
	
	## NAT Table
	
	*nat
	-A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
	COMMIT

Notice when using a file the `-t nat` piece of the command refers to the table section the command should be listed under (e.g. "*nat"). The actual `-t [table]` portion should be omitted in the file.

The file can be tested using `iptables-restore < /path/to/iptables.rules` before being moved to a persistent location. 

When tested and working, on Redhat/CentOS systems the location for persistent iptables.rules files is `/etc/sysconfig/iptables`.

On Debian/Ubuntu systems there are a variety of ways to load the rules file. I prefer to use the `apt` package `iptables-persistent` to manage loading/unloading of rules. By using this package the rules file can simply be stored in `/etc/iptables/rules.v4`.

Other Debian/Ubuntu options for persistence include modifying `/etc/network/interfaces` or hooking into if-up/if-down scripts. The [Ubuntu Community wiki][1] has a great page explaining these methods.

I urge people to be comfortable with `iptables` as it is a very efficient and powerful tool - it only takes three simple rules for Jenkins/Hudson to be loaded via `http://jenkins.domain.com` without a port number.

But pragmatically speaking, both solutions are great. The implementation using `iptables` vs. setting up a proxy in Apache is roughly the same amount of time, and the difference in server latency will be practically unnoticeable. Use the solution that works best in the given situation!

 [1]: https://help.ubuntu.com/community/IptablesHowTo
