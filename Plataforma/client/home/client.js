
//*********************************
//Subscription a Las bases de Datos
  //Messages = new Meteor.Collection('messages');
  Meteor.subscribe("messages");
  Meteor.subscribe("usuarios");


//*********************************

Meteor.startup(function(){
    Session.set("current_game", "none");
    $('#gamecontainer').hide();
    $('#container').hide();
    $('#container_sab').hide();
    $('.juegos').hide();
    $('.perfil_template').hide();
    $('.ranking_template').hide();

    $(document).on("click", ".alert .close", function(e) {
        $(this).parent().hide();
    });
});

//*********
  Deps.autorun(function() {
    Meteor.subscribe('messages', { 
          onReady : function() {
              Session.set("active", true); 
          }
    });
  });



      Template.chat.events({
         'submit form': function(event) {
            event.preventDefault();
            var currentUser = Meteor.user().username;
            var post = {
                nick : currentUser,
                message : $(event.target).find('[name=message]').val()
            }
            if ( (post.message != "") && (post.nick != "") ) {
                Meteor.call("addMessage", post);
            }
            $('[name="message"]').val('');

        }
      });

       Template.chat.helpers({
           latestMessages : function() {
                 if (Session.get("active")) {
                    var UltimosMensajes = Messages.find({}, {sort : {time : -1}, limit : 10}).fetch().reverse();
                     return UltimosMensajes;
                 } else {
                     return [];
                 }
            }
       });

	Images = new FS.Collection("images", {
  		stores: [new FS.Store.FileSystem("images")]
	});

Template.choose_game.helpers({
  'encontrado': function(){
    return Games.find().fetch();
  }
    
});
/*Template.choose_game.games = function (){
    return Games.find();
}*/
Template.choose_game.events({
    'click #AlienInvasion': function () {
        $('#gamecontainer').hide();
        $('#container').show();
        var game = Games.findOne({name:"AlienInvasion"});
        Session.set("current_game", game._id);
    },
    'click #Saboteur': function () {
        $('#gamecontainer').hide();
        $('#container').hide();
        $('#container_sab').show();
        $('#partidas_a_unirse').show();
        $('#div_crear').hide();
        //var game = Games.findOne({name:"Saboteur"});
        //Session.set("current_game", game._id);
    },
    'click #none': function () {
        $('#container').hide();
        $('#gamecontainer').hide();
        Session.set("current_game", "none");
    }
});

Template.menu.events({
  'click #Boton_Juegos': function(){
      $('.juegos').show();
      $('.perfil_template').hide();
      $('.ranking_template').hide();
  },
  'click #Boton_Perfil': function(){
      $('.juegos').hide();
      $('.perfil_template').show();
      $('.ranking_template').hide();
  },
  'click #Boton_Ranking': function(){
      $('.juegos').hide();
      $('.perfil_template').hide();
      $('.ranking_template').show();
  }
})