Meteor.publish('messages', function(salon) {
   return Messages.find( {}, {sort : {time : -1}, limit : 500} );
});

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