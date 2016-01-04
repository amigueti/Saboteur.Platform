Meteor.subscribe('ranking');
Meteor.subscribe('toplist');
Meteor.subscribe('perfiles');

Template.table-bordered.helpers({
  position: function() {
	var select = Ranking.find({}, {sort : {puntos : -1}, limit : 10});
	var post = Perfiles.findOne({_id: select.user_id});
	var imagen = post.imagen;
	var nick = post.nick;
	var puntos = select.puntos;
	var juego = select.juego;
	var ultpartida = select.ultPartida;
	var pais = Perfiles.post.nacionalidad;
    return select;
  }

  });
