Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
});

Router.route('/perfil',{name: 'perfil'});
Router.route('/',{name: 'home'});
Router.route('/juego',{
	template: 'saboteur_temp'
});
Router.route('/perfiles/:_id',{
	name: 'perfiles',
		data: function() { return Perfiles.findOne(this.params._id);
	},
	action:function(){
		if(this.ready()){this.render();}
	}
});

//Router.onBeforeAction('loading', {only: 'perfiles'});