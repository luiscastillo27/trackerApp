(function(){

    var app = angular.module('tracker.mantes', [])

    app.factory('Mantes', function() {

      var mantes = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
      }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
      }];

      return {
        all: function() {
          return mantes;
        },
        remove: function(mante) {
          mantes.splice(mantes.indexOf(mante), 1);
        },
        get: function(id) {
          for (var i = 0; i < mantes.length; i++) {
            if (mantes[i].id === parseInt(id)) {
              return mantes[i];
            }
          }
          return null;
        }
      };

    });

}());