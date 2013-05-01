App = Ember.Application.create();

App.Router.reopen({
	location: 'history'
});

App.Router.map(function() {
	this.route('technicalskills', {path: "/technical-skills"});
	this.route('work', {path: "/work"});
	this.route('blog', {path: "/blog"});
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
	model: function(params){
		return ['this', 'is', 'blog'];
	}
});
