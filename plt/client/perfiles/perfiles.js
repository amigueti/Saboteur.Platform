var idOtro=document.URL.slice(31,100);

Template.perfiles.helpers({

	'imagen':function(){
		
		 imagenOtro =Meteor.users.findOne({_id:idOtro});
		return imagenOtro.profile.image;
	},
	'nicky':function(){
		
		perfil=Perfiles.findOne({_id:idOtro});

		return perfil.nick;
	},
	'email':function(){
		perfil=Perfiles.findOne({_id:idOtro});
		return perfil.email;
	},
	'nombre':function(){
		perfil=Perfiles.findOne({_id:idOtro});
		return perfil.nombre;
	},
	'nacionalidad':function(){
		perfil=Perfiles.findOne({_id:idOtro});
		return perfil.nacionalidad;
	},
	'genero':function(){
		perfil=Perfiles.findOne({_id:idOtro});
		return perfil.genero;
	}


});
Template.perfiles.events({
	'click button.inc':function(){
		console.log("AÑADIR AMIGO");
		perfil_username=Perfiles.findOne({_id:idOtro}).nick;
		id_usuario=Meteor.user()._id;
		Amigos.update({
			_id:id_usuario},{$push:{usernames:perfil_username}});
	}
});