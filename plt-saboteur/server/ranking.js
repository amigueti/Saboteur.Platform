Meteor.methods ({
    insertRanking : function (name, points) {
        Ranking.insert({
            user_id:Perfiles.findOne({nick: name}),
				juego: "Saboteur",
				puntos: points,
				ultPartida: Date.now(),
        });

   },

    updateRanking : function (name, points) {
        Ranking.update({
            user_id: Perfiles.findOne({nick: name}),
				puntos: points, 
				ultPartida: Date.now(),
        });

   }
});
