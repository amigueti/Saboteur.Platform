
Meteor.startup(function () {

if (Games.find().count() == 0) {
        Games.insert({name: "AlienInvasion"});
        Games.insert({name: "Saboteur"});
    };

    Meteor.publish("all_games", function () {
        return Games.find();
    });

});