Meteor.subscribe("partidas");
Meteor.subscribe("caracteristicas");
Meteor.subscribe("mov_card");



// TOTAL PARTIDAS
Template.totalPartidas.helpers({
	listTotal: function () {
      		return Partidas.find();
    	},

    	auxTotal: function () {
      		if (this.listaJugadores.indexOf(Meteor.user().username) == -1){
        		return true;
      		}
      			return false;
    	},
});

Template.totalPartidas.events({
	'submit form': function(event){
		event.preventDefault();
		var titulo = event.target.titulo.value;
    		var numJugadores = event.target.numJugadores.value;
	    	Meteor.call("nuevaPartida", Meteor.user().username, titulo, numJugadores);
	},

	'click .unirsePartida': function(event){
		event.preventDefault();
		console.log("llamando a unirse");
		Meteor.call("unirsePartida", this._id, Meteor.user().username);
	},

});

// MIS PARTIDAS

Template.misPartidas.helpers({
    listMias: function (bool) {
      return Partidas.find({listaJugadores: Meteor.user().username, empezada: bool});
    },

    auxMias: function () {
      return this.listaJugadores[0] == Meteor.user().username && this.numJugadores == this.listaJugadores.length && !this.empezada
    },
    selectedPartida: function () {
      var partidaId = this._id;
      var selectedPartida = Session.get("selectedPartida");
      if(partidaId == selectedPartida){
        return "selected"
      }
    },

});


Template.misPartidas.events({
  'click .empezarPartida': function(event){
    event.preventDefault();
    Meteor.call("empezarPartida", this._id);
    //render();
  },

  'click .miPartida': function(){
    if(Partidas.findOne({_id: this._id}).empezada){
      Session.set("selectedPartida",this._id);
      render();
    }
  },

});

// PARTIDA SELECCIONADA
rendThis = function() {
  if(Partidas.find().count() > 0 && Session.get("selectedPartida")){
    return true;
  }
  return false;
}

myTurno = function(){
  var turno = Partidas.findOne({_id: Session.get("selectedPartida")}).jugadorActivo;
  if(turno == Meteor.userId()){
    return true;
  }
  return false;

}
partd = function(){
  return Partidas.findOne({_id: Session.get("selectedPartida")});
}

mazLength = function(){
  return Partidas.findOne({_id: Session.get("selectedPartida")}).mazoGeneral.length;
}

caracteristicas = function(){
    return Caracteristicas.findOne({partidaId: Session.get("selectedPartida"),jugadorId: Meteor.userId()});
}

Template.actualPartida.helpers({
    /*renderThis: function () {
      if(Partidas.find().count() > 0 && Session.get("selectedPartida")){
        return true;
      }
      return false;
    },*/
    renderThis: function() {
      return rendThis();
    },

    /*miTurno: function () {
      var turno = Partidas.findOne({_id: Session.get("selectedPartida")}).jugadorActivo;
      if(turno == Meteor.userId()){
        return true;
      }
      return false;
    },*/
    miTurno: function(){
        return myTurno();
    },

    /*partida: function () {
      return Partidas.findOne({_id: Session.get("selectedPartida")});
    },*/
    partida: function(){
        return partd();
    },

    /*mazoLength: function () {
      return Partidas.findOne({_id: Session.get("selectedPartida")}).mazoGeneral.length;
    },*/
    mazoLength: function(){
        return mazLength();
    },

    /*carac: function () {
      return Caracteristicas.findOne({partidaId: Session.get("selectedPartida"),jugadorId: Meteor.userId()});
    },*/
    carac: function(){
      return caracteristicas();
    },
});

Template.actualPartida.events({
  'submit form': function(event){
    event.preventDefault();
/*
    var partidaId = Session.get("selectedPartida");
    var carta = $('#Mano option:selected').val();
    var tipo = $('#Tipo option:selected').val();
    var objetivo = $('#Objetivo option:selected').val();
    var objeto = $('#Objeto option:selected').val();
    var fila = $('[name=fila]').val();
    var columna = $('[name=columna]').val();
*/
	var form = event.target;
	var partidaId = Session.get("selectedPartida");
    	var carta = event.target.Mano.value;
    	var tipo = event.target.Tipo.value;
   	var objetivo = event.target.Objetivo.value;
    	var objeto = event.target.Objeto.value;
    	var fila = event.target.fila.value;
    	var columna = event.target.columna.value;

	console.log(form);
	console.log(partidaId);
	console.log(carta);
	console.log(tipo);
	console.log(objetivo);
	console.log(objeto);
	console.log(fila);
	console.log(columna);
	

    if(tipo == "Poner"){
      Meteor.call("ponerCarta", partidaId, Meteor.userId(),carta,parseInt(fila),parseInt(columna),objetivo,objeto);
    }else{
      Meteor.call("pasarTurno", partidaId, Meteor.userId(),carta);
    }

  },
});
