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

      Template.hello.events({
         'submit form': function(event) {
            event.preventDefault();
            var post = {
                nick : $(event.target).find('[name=nick]').val(),
                message : $(event.target).find('[name=message]').val()
            }
            if ( (post.message != "") && (post.nick != "") ) {
                Meteor.call("addMessage", post);
            }
        }
      });

       Template.hello.helpers({       
           latestMessages : function() {
                 if (Session.get("active")) {
                     return Messages.find({}, {sort : {time : -1}, limit : 500});
                 } else {
                     return [];
                 }
            }
       });
    }
