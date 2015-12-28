Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});
Template.navigation.events({
	'submit form': function(event) {
            event.preventDefault();
            var buscado = $(event.target).find('[name=busqueda]').val();
            console.log(buscado);
            console.log(Meteor.users.findOne({username: buscado}));
            if(Meteor.users.findOne({username: buscado})){
            	console.log("encontado");
            }else{
            	console.log("no encontrado");
            }
     }       
});