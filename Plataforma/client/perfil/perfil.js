

Template.perfil.helpers({
	'conectado': function(){
		return Meteor.userId();
	}
});


Template.perfil_usuario.helpers({
	'perfil': function(){
		return Meteor.user().profile;
		//return Perfiles.find();//nombre="Jaime");
	},
	'otro_perfil': function(){
		var currentUser= this._id;
		return Meteor.users.find({currentUser}).fetch();
	}
});


Template.jugadores.helpers({
	'jugadores': function(){
		return Meteor.users.find().fetch()
	}
});

