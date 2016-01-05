var idOtro=document.URL.slice(31,100);
var existeListaAmigos =false;
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
	},
	'amigos':function(){
		
		return Amigos.findOne({_id:idOtro}).usernames;
	}


});
Template.perfiles.events({
	'click button.inc':function(){
		idOtro=document.URL.slice(31,100);
		console.log("AÑADIR AMIGO");
		perfil_username=Perfiles.findOne({_id:idOtro}).nick;
		id_usuario=Meteor.user()._id;
		fotoAmigo=Meteor.users.findOne({_id:idOtro}).profile.image;
		if(existeListaAmigos){
			Amigos.update({_id:id_usuario},{$push:{usernames:{idAmigo:idOtro,username:perfil_username,foto:fotoAmigo}}});
		}else{
			Amigos.insert({_id:id_usuario,usernames:[{idAmigo:idOtro,username:perfil_username,foto:fotoAmigo}]});
			existeListaAmigos = true;
		}	
	},
	'click .list-group-item':function(){
		console.log("He pulsado");
	}
});