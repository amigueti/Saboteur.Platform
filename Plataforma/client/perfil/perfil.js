

Template.perfil.helpers({
	'conectado': function(){
		return Meteor.userId();
	}
});


Template.perfil_usuario.helpers({
	'perfil': function(){
		return Meteor.user().profile;
		//return Perfiles.find();//nombre="Jaime");
	}
});


Template.jugadores.helpers({
	'jugadores': function(){
		return Meteor.users.find().fetch()
	}
});

