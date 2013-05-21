Source Variables in Bash Scripts
================================

May 23, 2012

When writing system scripts in bash that will be used on different systems with different variables, it's good to split variables into their own file. This allows easy updating of the common system script without having to redefine environment specific variables. This separate variable file can then be sourced at the top of the script using `source ./<variable-file.sh>`. The variables file is only used within the system script, so it does not need a hashbang `#!/usr/bin/env bash` at the top nor does the variable file need execution privileges.

Where variables are kept is a balancing act between ultimate portability within one file and upgrade flexibility using a separate file. The right answer depends on the specific task, but a good rule of thumb is if variables are likely to change on different machines then split them out.
