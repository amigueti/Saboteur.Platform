
Meteor.subscribe('toplist');
Meteor.subscribe('perfiles');





	Template.tablaglobal.helpers({
	  "position2": function() {

				return Toplist.find({}, {sort : {puntos : -1}, limit : 10}).map(function(document, index){
           document.index = index +1;
			return document;});
	  },

	'imagen':function(){
		var imagen =Perfiles.findOne({name:this.name}).profile.image;
		return imagen;
	},

	"jugadorSelected2": function() {
			var playerID = this.name;
			return Perfiles.findOne({nick: playerID });
	  }
	});



