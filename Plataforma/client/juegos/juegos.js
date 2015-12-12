Games = new Meteor.Collection('games');
Meteor.subscribe("all_games");

Tracker.autorun(function(){
    var current_game = Session.get("current_game");

    // The server will publish a different Messages collection to the
    // client, including only messages of current_game
    Meteor.subscribe("messages_current_game", current_game);

    // The server will publish a different Matches collection to the
    // client, including only matches of current_game
    Meteor.subscribe("matches_current_game", current_game);
});

Template.choose_game.helpers = function (){
	Games.insert({name: "AlienInvasion"});
    return Games.find();
}

Template.choose_game.events = {
    'click #AlienInvasion': function () {
        $('#gamecontainer').hide();
        $('#container').show();
        var game = Games.findOne({name:"AlienInvasion"});
        Session.set("current_game", game._id);
    },
    'click #FrootWars': function () {
        $('#container').hide();
        $('#gamecontainer').show();
        var game = Games.findOne({name:"FrootWars"});
        Session.set("current_game", game._id);
    },
    'click #none': function () {
        $('#container').hide();
        $('#gamecontainer').hide();
        Session.set("current_game", "none");
    }
}