Running Nagios with SELinux Enabled
===================================

June 16, 2014

By default RedHat Enterprise Linux systems are configured to have SELinux set to enforce in targeted mode. Popular programs like Nagios fall into the targeted category and require some policy tuning to get it working properly.

The standard way of dealing with SELinux is to disable it completely. There are times when disabling it makes sense, but it does not have to be the only option.

Tools like `audit2allow` make it easy to keep SELinux enabled and automates much of the SELinux policy tuning process. The audit2allow tool parses the existing SELinux logs, creates a custom policy configuration, and compiles the custom SELinux module.

## Creating a custom SELinux module

By default SELinux logs all security violations in the audit log, located at `/var/log/audit/audit.log`. The first step is to make sure all potential Nagios violations are logged. Start by putting SELinux into permissive mode:

```bash
    echo 0 > /selinux/enforce
```

SELinux Permissive mode logs all security violations without preventing the program from operating normally. The SELinux mode can be verified using the `sestatus` command.

Confirm Nagios is working properly and all checks are coming back green. Make sure all host and status checks have run at least once while SELinux is in permissive mode. The audit log should now contain all SELinux violations by Nagios.

Next, install the `policycoreutils-python` package which includes the audit2allow command-line tool. Then feed the SELinux audit log into audit2allow:

```bash
    audit2allow -M NagiosRule < /var/log/audit/audit.log
```

Two files will be created, a configuration file `.te` and a compiled module `.pp`. Review the `.te` file to see the custom SELinux policy. Assuming everything looks good, the final step is to load the SELinux module and put SELinux back into enforcing mode:

```bash
    semodule -i NagiosRule.pp
    echo 1 > /selinux/enforce
```

And that's it. The module will load immediately and persist across system reboots. Nagios now operates as expected with SELinux in enforce mode.

### Troubleshooting: Production systems

Putting SELinux into permissive mode may not be an option for production systems. Since enforce mode prevents additional violations, the audit log will only contain the first Nagios error. Follow the steps to create a policy, load the module, then check the audit log for the next error. Use the same module name each time and repeat the process until all violations are encorporated into the module.

### Troubleshooting: Recompiling the configuration

It is important to review the generated `.te` configuration file. Sometimes audit2allow creates rules that are too permissive. Or it may contain other non-Nagios security rules. To recompile a module from a configuration file follow the steps outlined in the `man audit2allow` page:

```bash
    checkmodule -M -m -o NagiosRule.mod NagiosRule.te
    semodule_package -o NagiosRule.pp -m NagiosRule.mod
    semodule -i NagiosRule.pp
```

### Troubleshooting: Nagios Clients

Nagios checks done by the Nagios server will be covered by the above module. However Nagios clients tools like `NRPE`, `Check-MK` and `NSCA` that run on client servers require their own custom SELinux module. The same process used on the server can be replicated on the client.

### Troubleshooting: Automation with Configuration Management

When using a configuration management tool like Ansible, deploy the `.te` configuration file and compile it on each server. Though the `.pp` file may be portable, it is not recommended. To check if a module has already been loaded, use `semodule -l | grep ^RuleName`.

## Conclusion

Turning SELinux off doesn't have to be the only answer. Whether it's for Nagios or another popular program, tools like audit2allow make it easy to create custom SELinux modules.
