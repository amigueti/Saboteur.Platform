//***********************************
//Publish Collections
Meteor.publish("all_games", function () {
<<<<<<< HEAD
    // publish every field of every game

    return Games.find();
=======
    return Games.find(); // publish every field of every game
>>>>>>> fa4b149b9b7f0da482e86c70429239cb5599afb6
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
<<<<<<< HEAD
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
=======

>>>>>>> fa4b149b9b7f0da482e86c70429239cb5599afb6

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

<<<<<<< HEAD
Meteor.startup(function() {
    // At startup, fill collection of games if it's empty
    Messages.remove({});
    
    if (Games.find().count() == 0) {
        console.log("hola premo2");
    Games.insert({name: "AlienInvasion"});
    };

});
=======


/****************************************************************************/

var comprobarCredenciales = function(partidaId,jugadorId,carta){
    var p = Partidas.findOne({_id: partidaId});
    var c = Caracteristicas.findOne({partidaId: partidaId, jugadorId: jugadorId});

    if (p.jugadorActivo != jugadorId){
        return false;
    }

    if(carta != null && c.mano.indexOf(carta) == -1){
        return false;
    }

    return true;
};

var descartarCarta = function(jugadorId, partidaId, carta){
    mano = Caracteristicas.findOne({jugadorId: jugadorId, partidaId: partidaId}).mano;
    posicionCarta = mano.indexOf(carta);
    mano.splice(posicionCarta,1);
    Caracteristicas.update({jugadorId: jugadorId, partidaId: partidaId},{$set:{mano: mano}});
}

var robarCarta = function(partidaId){
    partida = Partidas.findOne({_id: partidaId});
    mazo = partida.mazoGeneral;
    carta = mazo[mazo.length -1];
    mazo.pop();
    Partidas.update({_id: partidaId},{$set:{mazoGeneral: mazo}});
    return carta;
};

var actualizarTurno = function(partidaId){
    var p = Partidas.findOne({_id: partidaId});
    jugadorId = p.jugadorActivo;
    var index = (p.listaJugadores.indexOf(Meteor.users.findOne({_id: jugadorId}).username) + 1) % p.numJugadores;
    var turno = Meteor.users.findOne({username: p.listaJugadores[index]})._id;
    Partidas.update({_id: partidaId}, {$set:{jugadorActivo: turno}});

}


/****************************************************************************/


Meteor.startup(function() {
    // At startup, fill collection of games if it's empty
    Messages.remove({});
    if (Games.find().count() == 0) {
    	Games.insert({name: "AlienInvasion"});
    };
    if (Games.find().count() == 0) {
        Games.insert({name: "Saboteur"});
    };

	Meteor.publish("partidas", function () {
        return Partidas.find();
    });

    Meteor.publish("caracteristicas", function () {
        return Caracteristicas.find();
    });
});

    Meteor.methods({
        removeAll: function(){
            Partidas.remove({});
            Caracteristicas.remove({});
        },

	addMessage : function (post) {
        	var timestamp = Math.round(new Date().getTime() / 1000);
        	Messages.insert({
            		nick : post.nick,
            		message : post.message,
            		time : timestamp
        	});
    	},

        nuevaPartida: function(username,titulo,numJugadores){
		console.log(Partidas.findOne({titulo: titulo}));
            if (! Partidas.findOne({titulo: titulo})) {
		console.log("pasando el if");
                Partidas.insert({
                  titulo: titulo,
                  numJugadores: numJugadores,
                  listaJugadores: [username],
                  empezada: false
                });
                
            }
        },

        unirsePartida: function(partidaId,username){
            var p = Partidas.findOne({_id: partidaId});
            if (p.listaJugadores.length < p.numJugadores){
                Partidas.update({_id: partidaId}, {$push: {listaJugadores: username}});
            }
        },

        empezarPartida: function(partidaId){
            //Comienzo de Partida, Crear Mazo, Crear Tablero, Poner Turno y Propiedades de Jugadores
            
            configurarPartida(partidaId);
        },

        ponerCarta: function(partidaId,jugadorId,carta,row,col,nameObjetivo,objeto){
            //Comprobamos credenciales: es el turno de JugadorId y tiene la carta en la Mano.
            if (!comprobarCredenciales(partidaId,jugadorId,carta)){
             
              return false;
            }

            //
            var r;
            switch(tiposCartas[carta].Type) {
              case "excavacion":
		console.log("A");
                r = ponerCamino(partidaId,jugadorId,carta,row,col);
                break;
              case "accionT":
		console.log("B");
                r = tiposCartas[carta].Funcion(partidaId,row,col);
                break;
              case "accionP":
		console.log("C");
                r = tiposCartas[carta].Funcion(partidaId,tiposCartas[carta],nameObjetivo,objeto);
                break;
            }

		console.log("3");
            if(r != false){

                descartarCarta(jugadorId, partidaId,carta);
                nuevaCarta = robarCarta(partidaId);
                Caracteristicas.update({partidaId: partidaId,jugadorId: jugadorId},{$push: {mano: nuevaCarta}});
                actualizarTurno(partidaId);

            }
		console.log("4");
            return r;
        },

        pasarTurno: function(partidaId,jugadorId,carta){//!!!!!!!!!!!!!!CAMBIAR NOMBRE pasarTurno!!!!!!!!!!!!!!!!!!!!
            if (!comprobarCredenciales(partidaId,jugadorId,carta)){
              return false;
            }
            descartarCarta(jugadorId, partidaId,carta);
            nuevaCarta = robarCarta(partidaId);
            Caracteristicas.update({partidaId: partidaId,jugadorId: jugadorId},{$push: {mano: nuevaCarta}});
            actualizarTurno(partidaId);

            return true;
        },
    });

>>>>>>> fa4b149b9b7f0da482e86c70429239cb5599afb6
