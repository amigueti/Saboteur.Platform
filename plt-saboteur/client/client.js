

Meteor.subscribe("all_games");

Meteor.startup(function(){
    Session.set("current_game", "none");
    $('#gamecontainer').hide();
    $('#container').hide();

    $(document).on("click", ".alert .close", function(e) {
        $(this).parent().hide();
    });
});







Template.choose_game.helpers({
  'encontrado': function(){
    return Games.find().fetch();
  }
    
});



Template.choose_game.events({
    'click #AlienInvasion': function () {
        $('#gamecontainer').hide();
        $('#container').show();
        var game = Games.findOne({name:"AlienInvasion"});
        Session.set("current_game", game._id);
    },
    'click #Saboteur': function () {
        $('#container').show();
        $('#gamecontainer').hide();
        var game = Games.findOne({name:"Saboteur"});
        Session.set("current_game", game._id);
    },
    'click #none': function () {
        $('#container').hide();
        $('#gamecontainer').hide();
        Session.set("current_game", "none");
    }
});
