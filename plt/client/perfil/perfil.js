Template.perfil.events({
	'click button.inc':function(){
		$('#editYourAvatarModal').modal();
	}
});
Template.perfil.helpers({
	'imagen':function(){
		return Meteor.user().profile.image;
	}

});