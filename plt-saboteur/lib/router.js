Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/perfil',{name: 'perfil'});
Router.route('/',{name: 'chat'});
Router.route('/juegos',{name: 'juegos'});
Router.route('/saboteur',{
	template: 'saboteur'
});
