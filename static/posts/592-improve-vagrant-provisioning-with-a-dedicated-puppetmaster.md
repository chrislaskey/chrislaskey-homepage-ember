Improve Vagrant Provisioning with a Dedicated Puppetmaster
==========================================================

August 12, 2013

[Vagrant](http://vagrantup.com) supports a variety of provisioning options like Puppet, Chef and shell scripts. Provisioning with Puppet is as simple as adding a block to the Vagrantfile: 

```ruby
config.vm.provision :puppet do |puppet|
	puppet.manifests_path = "../../puppet"
	puppet.manifest_file  = "nodes.pp"
	puppet.module_path = "../../puppet/modules"
	puppet.options = "--verbose --debug"
	puppet.facter = { "vagrant" => "1", }
end
```

Vagrant provisioning with puppet is implemented by copying puppet manifests and modules to the virtual machine and executing them locally. This works, but it is likely different from most live deployment setups where a puppetmaster is used.

Though similar, there are a few key differences between deploying with a puppetmaster vs. applying a catalog locally. For example virtual resources can not be realized, and exported resources can not be exported or collected.

Since the goal of using Vagrant and virtual machines is to mirror production environment as close as possible, why not mirror puppet provisioning method?

Puppetmaster inside Vagrant
---------------------------

Cloning the production puppetmaster and running a dedicated testing puppetmaster has it's advantages, but it may not be a reality for everyone.

Vagrant makes it easy to create a dedicated puppetmaster virtual machine that can be used to provision other Vagrant virtual machines. Coordinating the various pieces isn't hard. A puppetmaster Vagrantfile might contain lines like:

```ruby
Vagrant.configure("2") do |config|
	# [...]

	# Set a static IP
	config.vm.network "public_network", ip: "192.168.0.100"

	# Limit host system resources
	config.vm.provider :virtualbox do |vb|
		vb.customize ["modifyvm", :id, "--memory", "512"]
	end 

	# Sync puppet manifest files
	config.vm.synced_folder "/puppetmaster/files/on/host", "/vagrant/puppet/"

	# Configure puppetmaster manually OR use a custom bootstrap.sh script to automate it
	# config.vm.provision :shell, :path => "bootstrap.sh"

	# [...]
end
```

The new puppetmaster can then be manually configured, or as hinted at above, automated using Vagrant [shell provisioning](http://docs.vagrantup.com/v2/getting-started/provisioning.html) and a `bootstrap.sh` script. A basic skeleton of which could be:

```bash
#!/usr/bin/env bash

hostname="puppetmaster"
fqdn="puppetmaster.example.com"

# Update the hostname and fqdn
sed -i "s#^127.0.1.1.*#127.0.1.1	${fqdn} ${hostname} puppet#" /etc/hosts
hostname ${hostname}
rm /etc/hostname && echo "${hostname}" >> /etc/hostname

# Update apt sources and install puppetmaster if needed
apt-get update && apt-get install -y puppetmaster

# Create symbolic links to puppet manifests and modules, etc.
# [...]
```

Using the new puppetmaster
--------------------------

Using the same method outlined above of using Vagrant shell provisioning can also be used to automatically connect new virtual machines to the puppetmaster. It might look something like this:

```bash
#!/usr/bin/env bash

hostname="puppetmaster"
fqdn="puppetmaster.example.com"

# Update the hostname and fqdn
sed -i "s#^127.0.1.1.*#127.0.1.1	${fqdn} ${hostname} puppet#" /etc/hosts
hostname ${hostname}
rm /etc/hostname && echo "${hostname}" >> /etc/hostname

# Add puppet domain name
if [[ ${puppetmaster_ip} != "" ]]; then
	grep "puppet" /etc/hosts || printf "\n${puppetmaster_ip}	puppet" >> /etc/hosts
fi

# Install puppet package
apt-get update && apt-get install puppet

# Run puppet configuration
puppet agent -t

# [...]
```

There's a lot of directions to take it from here. But the take away message is to always mimic production environment as closely as possible, even in the provisioning stages. If the live environment uses a puppetmaster, so should the testing environment. The best part is Vagrant makes such a set up quite easy to do!
