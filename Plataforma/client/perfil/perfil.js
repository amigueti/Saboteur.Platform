

Template.perfil.helpers({
	'conectado': function(){
		return Meteor.userId();
	}
});


Template.perfil_usuario.helpers({
	'perfil': function(){
		console.log("helper-perfil:");
		console.log(Meteor.users.findOne({_id: this._id}).profile);
		return Meteor.users.findOne({_id: this._id}).profile;
	},
	'upload': function(){
		console.log("UPLOAD:");
		console.log(this._id);
		console.log(Meteor.userId());
		if (Meteor.userId() == this._id){
			console.log("mismo user");
			return true;
		} else {
			console.log("distino user");
			return false;
		}
	}
});


Template.jugadores.helpers({
	'jugadores': function(){
		return Meteor.users.find().fetch()
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

