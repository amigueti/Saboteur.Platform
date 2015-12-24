//acceso a partidas

	Meteor.subscribe("partidas");

//funcion al empezar
Meteor.startup(function(){
    Session.set("current_game", "none");
    $('#partidas_a_unirse').show();
	$('#div_crear').hide();
	$('#mi_partida').hide();

    $(document).on("click", ".alert .close", function(e) {
        $(this).parent().hide();
    });
});
//	Cliente

Template.crear_partida.events({
	'click #crear': function () {
        $('#partidas_a_unirse').hide();
        $('#div_crear').show();
    },
    'submit form': function(event){
          event.preventDefault();
          var Titulo = $('[name=titulo]').val();
          var Num_jug = $('[name=num_jugadores]').val();
          var Empezado = false;
          var currentUser = Meteor.userId();
          //si meto algun dato en el form, inserto los datos en el form
          if (Titulo){
          	Partidas.insert({
	          	titulo: Titulo,
	          	num_jug: Num_jug,
	          	creador: currentUser,
	          	empezado: Empezado
	        });
	        $('[name=titulo]').val('');
          	$('[name=num_jugadores]').val('');
	        $('#div_crear').hide();
	        $('#crear_partida').hide();
	        $('#mi_partida').show();
          }
    
    }

});

Template.mi_partida.helpers({
	'mi_gente': function(){
		var currentUser = Meteor.userId();
		var misPartidas = Partidas.find({"creador": currentUser}).fetch().reverse();
		return misPartidas[0];
	}
})

Template.mi_partida.events({
	'click #boton_eliminar': function(event){
    	var currentUser = Meteor.userId();
    	event.preventDefault();
    	var misPartidas = Partidas.find({"creador": currentUser}).fetch().reverse();
    	var idPartida = misPartidas[0]._id;
    	var confirm = window.confirm("¿Eliminar esta sala?");
    	if(confirm){
            Partidas.remove({ _id: idPartida });
        }
        $('#mi_partida').hide();
	    $('#crear_partida').show();
	    $('#partidas_a_unirse').show();
    }
})