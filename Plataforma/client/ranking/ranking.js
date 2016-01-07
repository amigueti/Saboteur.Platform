Template.ranking.events({
  'click a[target=_blank]': function (event) {
    event.preventDefault();
    window.open(event.target.href, '_blank');
  }
});

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



	Template.ranking.rankSelected = function (){
			if (Session.get("rankSelected") == "allien") {
				return Session.get("rankSelected");
			} else if (Session.get("rankSelected") == "saboteur") {
				return Session.get("rankSelected");
			} else {
				return Session.get("rankSelected");
			} 
	};

