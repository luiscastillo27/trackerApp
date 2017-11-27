(function(){

    var app = angular.module('tracker.rutas', [])

    app.factory('Rutas', function() {

      var rutas = [{
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
      }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
      }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }];

      return {
        all: function() {
          return rutas;
        },
        remove: function(ruta) {
          rutas.splice(rutas.indexOf(ruta), 1);
        },
        get: function(id) {
          for (var i = 0; i < rutas.length; i++) {
            if (rutas[i].id === parseInt(id)) {
              return rutas[i];
            }
          }
          return null;
        }
      };

    });

}());