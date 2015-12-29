/*Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});*/

Router.route('/', {name: 'home'});
Router.route('/juegos', {name: 'juegos'});
Router.route('/about',{name: 'about'});
Router.route('/ranking',{name: 'ranking'});

Router.route('/perfil/:_id',{
	template: 'perfil',
	data: function(){
		var usuario = this.params._id;
		return {_id: this.params._id};
	}
});

