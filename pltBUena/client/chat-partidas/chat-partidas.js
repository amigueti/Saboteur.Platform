
Template.chatpartidas.events({
  'submit form': function(event) {
            event.preventDefault();
            var currentUser = Meteor.user().username;
            var post = {
                nick : currentUser,
    session : Session.get("juego"),
                message : $(event.target).find('[name=message]').val()
            }
            if ( (post.message != "") && (post.nick != "") ) {
                Meteor.call("addMessage", post);
            }
            $('[name="message"]').val('');
        },
    'click #botonPrueba1':function(){
      if($("#chat_gral2").show());

    },
    'click #botonPrueba2':function(){
      $("#chat_gral2").hide();
    }    
});

Template.chatpartidas.helpers({
           MensajesJuego : function() {
                 if (Session.get("active")) {
                    var MensajesJuego = Messages.find({session : Session.get("juego")}, {sort : {time : -1}, limit : 10}).fetch().reverse();
      console.log(MensajesJuego);
                     return MensajesJuego;
                 } else {
                     return [];
                 }
            }
       });
