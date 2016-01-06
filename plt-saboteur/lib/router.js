Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/perfil',{name: 'perfil'});
Router.route('/',{name: 'chat'});
Router.route('/ranking',{name: 'ranking'});
Router.route('/juego',{
	template: 'saboteur'
});
