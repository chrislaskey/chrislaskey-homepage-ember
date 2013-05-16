var AppData = (function(){

	var _posts = [

		{
			title: "Monitoring File System Updates by VIM in Python",
			date: "2013-05-13",
			id: "590",
			uri: "590-monitoring-file-system-updates-by-vim-in-python.md",
		},

		{
			title: "Deploying Python Flask with Mod_WSGI",
			date: "2013-02-23",
			id: "580",
			uri: "580-deploying-python-flask-with-mod_wsgi.md",
		},

		{
			title: "Fixing Google Map Toolbars in Responsive Websites",
			date: "2013-02-02",
			id: "577",
			uri: "577-fixing-google-map-toolbars-in-responsive-websites.md",
		},

		{
			title: "Running Jenkins/Hudson on Port 80 Using Iptables",
			date: "2013-01-15",
			id: "541",
			uri: "541-running-jenkinshudson-on-port-80-using-iptables.md",
		},

	];

	return {
		getPosts: function(){
			return _posts;
		}
	}

}());
