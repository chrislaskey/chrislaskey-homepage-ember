Keep Puppet Modules Flat and Focused
====================================

December 5, 2012

On the surface most servers are configured to do one task. It's tempting to create a Puppet configuration management system that mirrors this by capturing all the parts of a specific server role in one module - webserver, fileserver, monitoring server, continuous integration server, etc. But there's a better way.

Under the surface a server accomplishes a specific role by combining a number of specific tools together to achieve a broad task. These tools reflect the spirit, though not always the simple implementation, of the Unix philosophy of doing one thing and doing it well: webservers parse incoming requests, programming languages determine the output, databases handle persistent data.

Many of these individual resources and tools are utilized on a server for more than one task. For example, in a simple webserver Python may be utilized to process both web requests and handle system utility functions. In a more complex uni-task server such as a continuous integration server Python may be used in additional ways such as testing and test scaffolding. And of course multi-role servers may reuse certain tools in a variety of tasks.

When configuring with Puppet it's much easier to treat each of these specific tools on their own. Configuration files are flatter and simpler to parse, and decoupling each tool makes flexible configurations easy and cuts down on repeated code.

Puppet's configuration language is declarative, not imperative - configuration files tell Puppet what the configuration should be, not how it should go about configuring it. Declarative configurations are a boon to Puppet, allowing the platform specific implementation details to be abstracted away.

However the declarative paradigm presents problems not present in imperative languages, one of which is contention resolution. Since the imperative concept of execution order does not exist, when Puppet parses the configuration files if there are two different blocks describing the same resource it can not resolve which block should have precedence.

This is the other reason for preferring flat modules focused on only one system tool, a configuration block takes ownership of that resource. Any tool or resource that may need to be described in different Puppet configurations should not be contained within a large, role based module.

Avoiding the creation of complex modules based on server role is one simple and powerful way to minimize spaghetti configurations and resource contention resolution headaches down the road. 

This is not say multiple tools should not be packaged into one module, indeed most of my core command line tools like vim, sed and awk are included in one core module. Instead the point is to think hard about the implications before including multiple resources in one module. Keep Puppet modules flat and focused on specific tools and resources whenever possible.
