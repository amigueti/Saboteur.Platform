Template.addPerfil.events({
    'submit form': function(event){
      event.preventDefault();
      var coment = $('[name=coment]').val();
      Users.insert({
          name: coment
      });
      $('[name=coment]').val('');
    }
});

Template.players.helpers({
    'player': function(){
        return Users.find({}, {sort: {name: 1}});
    }
});
