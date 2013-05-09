var AppData = (function(){

	var _posts = [

		{
			title: "Example blog post",
			date: "2012-12-11",
			id: "405",
			uri: "#/blog/example.md",
		},

		{
			title: "Example blog post two (redirects to home)",
			date: "2012-12-10",
			id: "400",
			uri: "/",
		},

	];

	return {
		getPosts: function(){
			return _posts;
		}
	}

}());
