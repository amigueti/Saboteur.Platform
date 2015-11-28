 if (Meteor.isServer) {
        
        Messages = new Meteor.Collection('messages');
        
        Meteor.methods ({
            addMessage : function (post) {
                var timestamp = Math.round(new Date().getTime() / 1000);
                Messages.insert({
                    nick : post.nick,
                    message : post.message,
                    time : timestamp
                });
            }
        });

        Meteor.publish('messages', function(salon) {
           return Messages.find( {}, {sort : {time : -1}, limit : 500} );
        });

	Meteor.publish("usuarios", function () {
		return Meteor.users.find({}, {fields: {username: 1, 'profile.foto': 1}});
	});

        Meteor.startup(function () {
          // code to run on server at startup
        });
    }
