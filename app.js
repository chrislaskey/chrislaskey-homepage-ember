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
		this.resource('blog', function(){
			this.resource('post', {path: ":post_id"}, function(){
				this.route('uri', {path: ":post_uri"});
			});
		});
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

	App.BlogPosts = Ember.Object.extend({
		_posts: AppData.getPosts(),

		get: function(){
			return this._posts;
		}
	});

	App.BlogPosts.reopenClass({
		findAll: function(start, stop){
			if( typeof start === 'undefined' ){ start = 0; }
			if( typeof stop === 'undefined' ){ stop = 0; }

			var postsData = App.BlogPosts.create(),
				allPosts = postsData.get(),
				posts = [];

			posts = Array.prototype.slice.call(allPosts, start, stop);
			return posts;
		},

		find: function(itemProperty){
			var posts = App.BlogPosts.create(),
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
				posts = App.BlogPosts.findAll(0, perPage);
			return posts;
		}
	});

	App.Post = Ember.Object.extend({});

	App.Post.reopenClass({
		post: function(post_id) {
			//TODO: Update post lookup to use numeric post_id only.
			//		Requires hooking into App.BlogPosts data object
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
