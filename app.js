(function(){

	window.App = Ember.Application.create();

	App.Router.reopen({
		location: 'history'
	});

	App.config = {
		BLOG_POSTS_PER_PAGE: 30,
	}

	App.Router.map(function() {
		this.route('technicalskills', {path: "/technical-skills"});
		this.route('work', {path: "/work"});
		// TODO:
		//	- update "posts" link to go to "blog" instead
		//	- create BlogIndex and BlogPost route and model functions
		this.resource('blog', 
			{path:"/blog"}, // TODO: Should be able to remove this once everything is up and running.
			function(){
				this.route('post', {path: ":post_id"});
			}
		);
		this.route('error404', {path: "*:"});
	});

	App.IndexRoute = Ember.Route.extend({
		model: function() {
			return;
		}
	});

	App.TechnicalskillsRoute = Ember.Route.extend({
		model: function(){
			return;
		}
	});

	App.WorkRoute = Ember.Route.extend({
		model: function(){
			return;
		}
	});

	App.BlogIndex = Ember.Object.extend({
		_posts: AppData.getPosts(),

		get: function(){
			return this._posts;
		}
	});

	App.BlogIndex.reopenClass({
		findAll: function(start, stop){
			if( typeof start === 'undefined' ){ start = 0; }
			if( typeof stop === 'undefined' ){ stop = 0; }

			var postsData = App.BlogIndex.create(),
				allPosts = postsData.get(),
				posts = [];

			posts = Array.prototype.slice.call(allPosts, start, stop);
			return posts;
		},

		// TODO: Deprecated. Metadata does not appear to be needed in the
		// display of actual individual blog posts.
		find: function(itemProperty){
			var posts = App.BlogIndex.create(),
				post;

			if( _.isObject(itemProperty) ){
				post = _.where(posts._posts, itemProperty);
			}

			return post;
		}
	});

	App.BlogIndexRoute = Ember.Route.extend({
		model: function(){
			var perPage = App.config.BLOG_POSTS_PER_PAGE,
				posts = App.BlogIndex.findAll(0, perPage);
			return posts;
		}
	});

	App.Post = Ember.Object.extend({});

	App.Post.reopenClass({
		post: function(post_id) {
			var postURI = "/static/posts/" + post_id;

			return $.ajax(postURI).then(function(data){
				var asMarkdown = marked(data);
				return asMarkdown;
			});
		}
	});

	App.PostRoute = Ember.Route.extend({
		model: function(params) {
			return App.Post.post(params.post_id);
		}
	});

	App.Error404Route = Ember.Route.extend({
		model: function(){
			return;
		}
	});

})();
