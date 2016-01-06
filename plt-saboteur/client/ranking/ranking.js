Meteor.subscribe('ranking');
Meteor.subscribe('toplist');
Meteor.subscribe('perfiles');



  	Template.ranking.events({

    "click #Boton_global": function () {
			Session.set("rankSelected","global");
		},

    "click #Boton_allien": function () {
			Session.set("rankSelected", "allien");
		},

    "click #Boton_saboteur": function () {
			Session.set("rankSelected", "saboteur");
		}
  	});

	Template.ranking.helpers({ 
		rankSelected: function (){
			if (Session.get("rankSelected") == "allien") {
				return Session.get("rankSelected");
			} else if (Session.get("rankSelected") == "saboteur") {
				return Session.get("rankSelected");
			} else {
				return Session.get("rankSelected");
			} 
	},

		allien: function (){
			if (Session.get("rankSelected") == "allien") {
				return true;
			}
	},

		saboteur: function (){
			if (Session.get("rankSelected") == "saboteur") {
				return true;
			}
	},
	
		global: function (){
			if (Session.get("rankSelected") == "global") {
				return true;
			}
	},

	});

	Template.tablaespecif.helpers({
	  position: function() {

		var game = Session.get("rankSelected");
		var select = Ranking.find({juego: game}, {sort : {puntos : -1}, limit : 10});
		var post2 = Perfiles.findOne({_id: select.user_id});
		var imagen = post2.imagen;
		var nick = post2.nick;
		var puntos = select.puntos;
		var juego = select.juego;
		var ultpartida = select.ultPartida;
		var pais = Perfiles.post2.nacionalidad;
			 return select;
	  },
		nombrejuego: function() {
					 return Session.get("rankSelected");
	  }
	});


	Template.tablaglobal.helpers({
	  position2: function() {
		var selectglobal = Ranking.find({}, {sort : {puntos : -1}, limit : 10});
		var post = Perfiles.findOne({_id: select.user_id});
		var imageng = post.imagen;
		var nickg = post.nick;
		var puntosg = selectglobal.puntos;
		var juegog = selectglobal.juego;
		var ultpartidag = selectglobal.ultPartida;
		var paisg = Perfiles.post.nacionalidad;
			 return selectglobal;
	  },
	});




