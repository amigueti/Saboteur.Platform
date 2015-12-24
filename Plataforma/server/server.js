//***********************************
//Publish Collections
Meteor.publish("all_games", function () {
    // publish every field of every game
    return Games.find();
});

Meteor.publish('messages', function(salon) {
   return Messages.find( {}, {sort : {time : -1}, limit : 500} );
});

Meteor.publish("usuarios", function () {
    return Meteor.users.find({}, {fields: {username: 1, 'profile.foto': 1}});
});

/*Meteor.publish("partidas", function () {
    return Meteor.Partidas.find(*titulo de partida* *max jugadores*);
});*/

//**************************************
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

//Si no hay juegos, lo introducimos
//Borramos los mensajes antiguos
Meteor.startup(function() {
    // At startup, fill collection of games if it's empty
    Messages.remove({});
    if (Games.find().count() == 0) {
    Games.insert({name: "AlienInvasion"});
    };
    if (Games.find().count() == 0) {
        Games.insert({name: "Saboteur"});
        };
    });


Images = new FS.Collection("images", {
	stores: [new FS.Store.FileSystem("images")]
});

Images.allow({
	'insert': function () {
    		// add custom authentication code here
    		return true;
 	}
});
