(function(){

	window.App = Ember.Application.create();

	App.Router.reopen({
		location: 'history'
	});

	App.config = {
		BLOG_POSTS_PER_PAGE: 30,
		BLOG_POSTS_DIR: "/static/posts/",
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
				post = _.where(posts._posts, itemProperty)[0];
			}

			return post;
		}
	});

	App.BlogIndexRoute = Ember.Route.extend({
		model: function(){
			var perPage = App.config.BLOG_POSTS_PER_PAGE,
				posts = App.BlogPosts.findAll(0, perPage);
			return posts;
		},
		renderTemplate: function() {

			// Ember throws warning whenever parent template bubbling is used,
			// unless explicitly acknowledged with the code below.
			this.render({ into: 'application' });
		}
	});

	App.Post = Ember.Object.extend({});

	App.Post.reopenClass({
		find: function(post_id) {
			var postDir = App.config.BLOG_POSTS_DIR,
				postMetadata = App.BlogPosts.find({"post_id": post_id}),
				postFile = postMetadata.file, //TODO: This needs error handling, if undefined accessing .file property throws JS error
				postURI = postDir + postFile,
				asMarkdown;

			// TODO: Deprecated.
			// Async version using promises causes too many problems within Ember.js.
			// Some of ember code handles them, so doesn't.

			// return $.ajax(postURI).then(function(data){
			// 	var asMarkdown = marked(data);
			// 	return asMarkdown;
			// });

			$.ajax({
				url: postURI,
				async: false,
				success: function(data){
					asMarkdown = marked(data);
				}
			});

			return asMarkdown;
		}
	});

	// App.PostObjectController = Ember

	App.PostRoute = Ember.Route.extend({

		/* 
		 * The `model` hook is only executed when entered via the URL. It is
		 * not executed at all when loaded via linkTo.
		 * See: http://emberjs.com/guides/routing/specifying-a-routes-model/
		 */
		model: function(params) {
			return App.Post.find(params.post_id);
		},

		/* 
		 * Use the setupController hook to force the model hook to execute,
		 * regardless of whether routed via an internal link (linkTo) or
		 * external link (reload).
		 */
		setupController: function(controller, model){

			/*
			 * If routed via an external link, the model hook already executed
			 * and the value of the model variable is correct. If routed via an
			 * internal link (linkTo), the model hook has not been executed and
			 * the value of the model variable is the passed linkTo object.
			 */
			if( _.isObject(model) ){
				// TODO: Switch this to a model hook call.
				var post = App.Post.find(model.id);
				controller.set('model', post);
			}
		},
		renderTemplate: function() {

			// Ember throws warning whenever parent template bubbling is used,
			// unless explicitly acknowledged with the code below.
			this.render({ into: 'application' });
		}
	});

	App.Error404Route = Ember.Route.extend({
		model: function(){
			return;
		}
	});

})();
