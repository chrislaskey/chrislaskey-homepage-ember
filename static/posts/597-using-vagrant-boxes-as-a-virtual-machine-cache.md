Using Vagrant Boxes as a Virtual Machine Cache
==============================================

November 17, 2013

Vagrant makes it easy to create custom Vagrant boxes from existing virtual
machines. As someone who uses Vagrant frequently, it's great to be able to
create snapshots of partially-configured, fully-configured, or in-development
virtual machine for the small price of a few minutes of time and about one
gigabyte of local storage.

They do not replace full provisioning on top of fresh distributions, but they
do come in handy in certain situations. For example I've used custom Vagrant
boxes to move a development environment from desktop to laptop to seamlessly
continue work over the weekend. Other times I've created half-configured boxes
to speed of provisioning in a multi-VM environment. Or I've created snapshots
of fresh fully-configured boxes when I'm exploring a new direction and don't
want to wait to re-provision when I hit a dead end.

Provisioning is easier than ever with modern configuration management tools,
but it still takes time to build from scratch. Used wisely, custom Vagrant
boxes can act like a virtual-machine cache and minimize the time spent waiting
in provisioning stages and maximize time spent in development.

Creating a custom Vagrant box from an existing virtual machine instance
-----------------------------------------------------------------------

There are two requirements to creating a custom Vagrant box:

	1. The running VM must use VirtualBox as a provider
	2. Must know the `vm-name`

Both of these can be checked with a simple `vagrant status` call from the
current Vagrant box directory. The output will look something like:

```
	Current machine states:

	default                   poweroff (virtualbox)

	The VM is powered off. To restart the VM, simply run `vagrant up`
```

The provider is in parenthesis "(virtualbox)" and the name is "default". The
`vm-name` can be specified in the `Vagrantfile` using the `config.name` value,
if one is not set explicitly the default name is "default".

	$ vagrant package <vm-name> --output <new-box-name>
	[default] Creating temporary directory for export...
	[default] Exporting VM...
	[default] Compressing package to: /current/path/new-box-name.box

For more information, including additional optional tags, see the official
[Vagrant Package](http://docs.vagrantup.com/v2/cli/package.html) documentation.

Using the new Vagrant box
-------------------------

The new box can be treated like any other Vagrant box. The simplest method is
to add the box:

	vagrant box add <box-name> /path/to/box/file.box

Alternatively, if the Vagrant box will be used by multiple machines the box
file can be uploaded to a shared http accessible location and specified in a
Vagrant file using the `config.vm.box_url` directive.
