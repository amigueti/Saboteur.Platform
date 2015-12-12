if (Meteor.isClient) {
        Messages = new Meteor.Collection('messages');

        Deps.autorun(function() {
          Meteor.subscribe('messages', { 
                onReady : function() {
                    Session.set("active", true); 
                }
          });
        });

	Meteor.subscribe("usuarios");

      Template.chat.events({
         'submit form': function(event) {
            event.preventDefault();
            var currentUser = Meteor.user().username;
            var post = {
                nick : currentUser,
                message : $(event.target).find('[name=message]').val()
            }
            if ( (post.message != "") && (post.nick != "") ) {
                Meteor.call("addMessage", post);
            }
            $('[name="message"]').val('');

        }
      });

       Template.chat.helpers({
          nick: function() {
            return Meteor.user().username;
          },
           latestMessages : function() {
                 if (Session.get("active")) {
                     return Messages.find({}, {sort : {time : -1}, limit : 10});
                 } else {
                     return [];
                 }
            }
       });
    }
