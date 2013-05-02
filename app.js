(function(){

	App = Ember.Application.create();

	// App.Router.reopen({
	// 	location: 'history'
	// });

	App.Router.map(function() {
		this.route('technicalskills', {path: "/technical-skills"});
		this.route('work', {path: "/work"});
		this.route('blog', {path: "/blog"});
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

	App.Post = Ember.Object.extend({});

	App.PostRoute = Ember.Route.extend({
		model: function(params) {
			posts = App.Post.create({
				'one': ['text for post one'],
				'two': ['text for post two'],
			});
			return posts.get(params.post_id);
		},
		serialize: function(post) {
			return { post_id: post.get('id') };
		}
	});

})();
