Chaining Exec Blocks in Puppet
==============================

August 7, 2012

Puppet abstracts away many of the server configuration details between different distributions of Unix and Linux. System configurations become much more transparent and flexible. Configuration files are written in a declarative language, explaining what the final configuration state should be, but not how to implement actions to achieve it.

Exec blocks are interesting because they appear to open a door into imperative commands, allowing configuration files to tell Puppet how to accomplish a particular task. Though the code contained within the Exec block is imperative, it's crucial to realize Exec blocks do not chain in an imperative manner. 

For example, if two exec blocks are chained together the second Exec block will be run whether or not the first Exec block executes it's `command` block or stops due to a `unless` or `onlyif` block. This will always happen, whether the dependency chain is described using a `require` attribute, `subscribe/notify` attribute, or class `->` chaining. Dependency chaining is only a loose ordering, where each block waits for the signal to execute without knowing the details of what the block before it has done.

Simply put, Puppet is best when used to describe the final configuration state. This embraces the declarative configuration language and also the declarative abstraction that makes Puppet so great. Implementing too much dependency chaining within the configuration files is bolting on imperative commands where they shouldn't be and can cause unexpected behavior.

As soon as multiple commands need to be chained in a dependent way it's far better to encapsulate all the related commands together in a shell script. Then call it using a simple `File[...] -> Exec[...]` block. Then `unless` and `onlyif` guards and dependency chains can be used as intended, in a declarative way.
