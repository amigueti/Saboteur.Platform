Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
});

Router.route('/perfil',{name: 'perfil'});
Router.route('/',{name: 'chat'});
Router.route('/perfiles/:_id',{
	name: 'perfiles',
		data: function() { return Perfiles.findOne(this.params._id);
	},
	action:function(){
		if(this.ready()){this.render();}
	}
});

Router.onBeforeAction('dataNotFound', {only: 'perfiles'});