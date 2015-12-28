Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});
Template.navigation.events({
	'submit form': function(event) {
            event.preventDefault();
            var buscado = $(event.target).find('[name=busqueda]').val();
            if(Meteor.users.username = buscado)
            
})