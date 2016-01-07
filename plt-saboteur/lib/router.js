Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/perfil',{name: 'perfil'});
Router.route('/',{name: 'chat'});
Router.route('/ranking',{name: 'ranking'});
Router.route('/juego',{
	template: 'saboteur'
});
<<<<<<< HEAD

Router.route('/chatperfil',{name: 'chatperfil'});

=======
Router.route('/chatperfil',{name: 'chatperfil'});
>>>>>>> 7f551911c9bd0e4b8a72c5edd014f4250b53e86c
