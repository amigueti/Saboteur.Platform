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
	},
	'imagenAmigo':function(usernames){
		usernames = Amigos.findOne({_id:idOtro}).usernames;
		usernames.forEach(function(item){
			ImagenAmigo = Meteor.users.findOne({username:item}).profile.image;
		});
		return ImagenAmigo;

	},
	'rutaAmigos':function(usernames){
		usernames = Amigos.findOne({_id:idOtro}).usernames;
		usernames.forEach(function(item){
			IdAmigo = Meteor.users.findOne({username:item})._id;
		});
			return IdAmigo;
		
	}


});
Template.perfiles.events({
	'click button.inc':function(){
		console.log("AÑADIR AMIGO");
		perfil_username=Perfiles.findOne({_id:idOtro}).nick;
		id_usuario=Meteor.user()._id;
		if(existeListaAmigos){
			Amigos.update({_id:id_usuario},{$push:{usernames:perfil_username}});
		}else{
			Amigos.insert({_id:id_usuario,usernames:[perfil_username]});
			existeListaAmigos = true;
		}	
	},
	'click .list-group-item':function(){
		console.log("He pulsado");
	}
});