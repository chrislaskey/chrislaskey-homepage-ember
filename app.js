App = Ember.Application.create();

App.Router.reopen({
	location: 'history'
});

App.Router.map(function() {
	this.route('work', {path: "/work"});
});

App.IndexRoute = Ember.Route.extend({
	model: function() {
		return ['red', 'yellow', 'blue'];
	}
});

App.WorkRoute = Ember.Route.extend({
	model: function(){
		return ['this', 'is', 'work'];
	}
});
