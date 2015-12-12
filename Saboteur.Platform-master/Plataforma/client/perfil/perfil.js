

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


Template.perfil_usuario.events({
	'change .myFileInput': function(event, template) {
	      	FS.Utility.eachFile(event, function(file) {
        		Images.insert(file, function (err, fileObj) {
        			if (err){
		             		// handle error
					console.log("error:");
					//console.log(error);
        		  	} else {
					console.log("das good");
            			 	// handle success depending what you need to do
            				var userId = Meteor.userId();
		            		var imagesURL = {
        		   	   		"profile.foto": "/cfs/files/images/" + fileObj._id
            				};
            				Meteor.users.update(userId, {$set: imagesURL});
				}
	        	});
		});
	}
});


Template.jugadores.helpers({
	'jugadores': function(){
		return Meteor.users.find().fetch()
	}
});

