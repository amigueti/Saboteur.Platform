//var idOtro=document.URL.slice(31,100);
var existeListaAmigos =false;
Template.perfiles.helpers({

	'imagen':function(){
		idOtro=document.URL.slice(31,100);
		 imagenOtro =Meteor.users.findOne({_id:idOtro});
		return imagenOtro.profile.image;
	},
	'nicky':function(){
		idOtro=document.URL.slice(31,100);
		perfil=Perfiles.findOne({_id:idOtro});

		return perfil.nick;
	},
	'email':function(){
		idOtro=document.URL.slice(31,100);
		perfil=Perfiles.findOne({_id:idOtro});
		return perfil.email;
	},
	'nombre':function(){
		idOtro=document.URL.slice(31,100);
		perfil=Perfiles.findOne({_id:idOtro});
		return perfil.nombre;
	},
	'nacionalidad':function(){
		idOtro=document.URL.slice(31,100);
		perfil=Perfiles.findOne({_id:idOtro});
		return perfil.nacionalidad;
	},
	'genero':function(){
		idOtro=document.URL.slice(31,100);
		perfil=Perfiles.findOne({_id:idOtro});
		return perfil.genero;
	},
	'amigos':function(){
		idOtro=document.URL.slice(31,100);
		return Amigos.findOne({_id:idOtro}).usernames;
	},
	'esAmigo':function(){
		idOtro=document.URL.slice(31,100);
		encontrado=false;
		maximo=Amigos.find({_id:Meteor.userId()}).fetch()[0].usernames.length;
		for(i=0;i<maximo;i++){
			if(Amigos.find({_id:Meteor.userId()}).fetch()[0].usernames[i].idAmigo == idOtro)
				encontrado=true;
		}
		return encontrado;

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
	'bdlclick .list-group-item':function(){
		console.log("He pulsado");
		location.reload();
	}
	
});