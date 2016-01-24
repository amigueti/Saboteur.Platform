Meteor.subscribe('partidas');
Meteor.subscribe('caracteristicas');
Meteor.subscribe('acciones');
Meteor.subscribe('toplist');
Meteor.subscribe("messages");

Template.saboteur_temp.helpers({
	match: function() {
	    return Partidas.find({});
	},
	mymatch: function() {
	    return Partidas.find({listaJugadores: Meteor.user().username,empezada: false}); 
    },
	mystartedMatch: function() {
	    return Partidas.find({listaJugadores: Meteor.user().username,empezada: true}); 
	},
	startMatch: function() {
	    if (this.listaJugadores[0] == Meteor.user().username && this.numJugadores == this.listaJugadores.length) {
	        return true;
		}
		return false;
	},
	userInMatch: function() {
	    if (this.listaJugadores.indexOf(Meteor.user().username) == -1 && this.empezada == false){
	      return true;
	    }
	    return false;
	},
	measure: function() {
	    return this.listaJugadores.length.toString() + "/" + this.numJugadores.toString();
	}

});


Template.saboteur_temp.events({
	'submit #crear_partida': function(event) {
		event.preventDefault();

	    var titulo = $('[name=titulo]').val();
	    var numJugadores = $('[name=numJugadores]').val();
	    Meteor.call("nuevaPartida",titulo, numJugadores);
	    //$(".tabs li:first-child a").click();

	},
	'click #unirse-partida': function(event){
	    event.preventDefault();
	    Meteor.call("unirsePartida", this._id);
	},
	'click #empezar-partida': function(event){
	    event.preventDefault();
	    Meteor.call("empezarPartida", this._id);
	},

	'click #entrar-partida': function(event){
	    event.preventDefault();
	    loadCanvas(this._id);
	    Session.set("juego", this._id);
	    $('#chat_juego').show();
	}

});

Template.chat.events({
	'click #boton_juego': function(event){
	    event.preventDefault();
	    $('#mensajes_juego').show();
	    $('#mensajes_generales').hide();
	},
	'click #boton_general': function(event){
	    event.preventDefault();
	    $('#mensajes_juego').hide();
	    $('#mensajes_generales').show();
	},
      });

Template.mensajes_juego.events({
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
        }
});

Template.mensajes_juego.helpers({
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

