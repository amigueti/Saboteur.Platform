
Meteor.publish('messages', function(salon) {
   return Messages.find( {}, {sort : {time : -1}, limit : 500} );
});
Meteor.publish('perfiles',function(){
	return Perfiles.find({});

});
Meteor.publish('amigos',function(){
	return Amigos.find({});
	
});
Meteor.publish('users',function(){
	return Meteor.users.find({});
});

Meteor.methods ({
    addMessage : function (post) {
        var timestamp = Math.round(new Date().getTime() / 1000);
        Messages.insert({
            nick : post.nick,
            message : post.message,
            time : timestamp
        });
    },
    addPerfil : function (post) {
        Perfiles.insert({
            _id:post._id,
            nick : post.nick,
            email : post.email,
            nombre : post.nombre,
            nacionalidad:post.nacionalidad,
            genero:post.genero
        });
    }
});