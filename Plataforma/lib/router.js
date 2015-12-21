/*Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});*/

Router.route('/', {name: 'home'});
Router.route('/juegos', {name: 'juegos'});
Router.route('/about',{name: 'about'});
Router.route('/ranking',{name: 'ranking'});

Router.route('/perfil',{
	path: '/perfil/:id',
	template: 'perfil'
});

