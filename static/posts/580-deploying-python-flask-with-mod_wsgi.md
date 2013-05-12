Deploying Python Flask with Mod_WSGI
====================================

February 23, 2013

The server stack for my wedding website [chrisandgitte.com](http://chrisandgitte.com) is a Flask app served by Apache with Mod_WSGI running on top of an Amazon EC2 instance. The deployment process is straight-forward for the most part, but Mod_WSGI isn't without its quirks.

By default Python errors will not be logged anywhere. This makes sense, but can be confusing as 500 Server errors caused by Apache misconfigurations will show up in the logs, while 500 Server errors caused by a typo in a Python file will not be logged anywhere.

The second gotcha is the working directory and Python path when Mod_WSGI executes Python files. In the development environment when the Flask app is run with `./main.py` the Python Path includes the current directory, and the working directory is set to the same dir as the main.py file.

This is not necessarily the case when Mod_WSGI is executing the Python environment. A different Python Path setting can cause errors with application modules using `import`. And a different working directory will break any relative filesystem references in the application.

Once aware of these potential problems, fixing them is trivial. Both Flask logging can be turned on and the Python path added to in the application's WSGI file.

[Here's a Gist of a simple WSGI application file](https://gist.github.com/chrislaskey/5021505).
