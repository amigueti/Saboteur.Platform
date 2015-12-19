Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {name: 'home'});
Router.route('/juegos', {name: 'juegos'});
Router.route('/about',{name: 'about'});
Router.route('/ranking',{name: 'ranking'});
Router.route('/register',{name: 'register'});
Router.route('/login',{name: 'login'});

Router.route('/perfil',{
	path: '/perfil/:id',
	template: 'perfil'
});


Router.route('/alien', {
    name: 'alien',
    layoutTemplate: 'empty_layout'
});