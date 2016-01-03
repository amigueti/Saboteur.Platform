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
//*********************************************************



//**************************************
Meteor.methods ({

    addMessage : function (post) {
        var timestamp = Math.round(new Date().getTime() / 1000);
        Messages.insert({
            nick : post.nick,
            message : post.message,
            time : timestamp
        });
    },
    matchFinish: function (game, points) {
    // Don't insert in the Matches collection a match if the user
    // has not signed in
    if (this.userId)
        Matches.insert ({user_id: this.userId, 
                 time_end: Date.now(),
                 points: points,
                 game_id: game
                });
    }
});

//Si no hay juegos, lo introducimos
//Borramos los mensajes antiguos


Images = new FS.Collection("images", {
	stores: [new FS.Store.FileSystem("images")]
});

Images.allow({
	'insert': function () {
    		// add custom authentication code here
    		return true;
 	}
});

Meteor.startup(function() {
    // At startup, fill collection of games if it's empty
    Messages.remove({});
    
    if (Games.find().count() == 0) {
        console.log("hola premo2");
    Games.insert({name: "AlienInvasion"});
    };

});