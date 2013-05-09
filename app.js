(function(){

	window.App = Ember.Application.create();

	App.config = {
		BLOG_POSTS_PER_PAGE: 3,
	}

	// App.Router.reopen({
	// 	location: 'history'
	// });

	App.Router.map(function() {
		this.route('technicalskills', {path: "/technical-skills"});
		this.route('work', {path: "/work"});
		this.route('posts', {path: "/blog"});
		this.route('post', {path: "/blog/:post_id"});
	});

	App.IndexRoute = Ember.Route.extend({
		model: function() {
			return ['this', 'is', 'home'];
		}
	});

	App.TechnicalskillsRoute = Ember.Route.extend({
		model: function(){
			return ['this', 'is', 'technical skills'];
		}
	});

	App.WorkRoute = Ember.Route.extend({
		model: function(){
			return ['this', 'is', 'work'];
		}
	});

	App.BlogRoute = Ember.Route.extend({
		model: function(){
			return ['this', 'is', 'blog'];
		}
	});

	App.Posts = Ember.Object.extend({
		_posts: [
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
		],

		get: function(){
			return this._posts;
		}
	});

	App.Posts.reopenClass({
		findAll: function(start, stop){
			if( typeof start === 'undefined' ){ start = 0; }
			if( typeof stop === 'undefined' ){ stop = 0; }

			var postsData = App.Posts.create(),
				allPosts = postsData.get(),
				posts = [];

			posts = Array.prototype.slice.call(allPosts, start, stop);
			return posts;
		},

		find: function(itemProperty){
			var posts = App.Posts.create(),
				post;

			if( _.isObject(itemProperty) ){
				post = _.where(posts._posts, itemProperty);
			}

			return post;
		}
	});

	App.PostsRoute = Ember.Route.extend({
		model: function(){
			var perPage = App.config.BLOG_POSTS_PER_PAGE,
				posts = App.Posts.findAll(0, perPage);
			return posts;
		}
	});

	App.Post = Ember.Object.extend({});

	App.Post.reopenClass({
		post: function(post_id) {
			postURI = "/static/posts/" + post_id;

			return $.ajax(postURI).then(function(data){
				var asMarkdown = marked(data);
				return asMarkdown;
			});
		}
	});

	App.PostRoute = Ember.Route.extend({
		model: function(params) {
			var metadata = App.Posts.find({id: "400"});
			// TODO: use metadata? Or is it not needed? 
			return App.Post.post(params.post_id);
		}
	});

})();
