Meteor.subscribe("messages");

Deps.autorun(function() {
    Meteor.subscribe('messages', { 
          onReady : function() {
              Session.set("active", true); 
          }
    });
  });

Template.mensajes_generales.events({
         'submit form': function(event) {
            event.preventDefault();
            var currentUser = Meteor.user().username;
            var post = {
                nick : currentUser,
		session : "home",
                message : $(event.target).find('[name=message]').val()
            }
            if ( (post.message != "") && (post.nick != "") ) {
                Meteor.call("addMessage", post);
            }
            $('[name="message"]').val('');

        }
      });

Template.mensajes_generales.helpers({
           latestMessages : function() {
                 if (Session.get("active")) {
                    var UltimosMensajes = Messages.find({session: "home"}, {sort : {time : -1}, limit : 10}).fetch().reverse();
                     return UltimosMensajes;
                 } else {
                     return [];
                 }
            }
       });
