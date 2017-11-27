(function(){

var app = angular.module('ManteCtrl', []);

    app.controller('ManteCtrl', ['$scope', 'restApi', 'locStr', '$state', 'auth', '$ionicPopup', function ($scope, restApi, locStr, $state, auth, $ionicPopup) {

        auth.redirectIfNotExists();
        var id = auth.getUserData().idUsuario;
        $scope.mantes = [];

        $scope.mostrar = function(){

            restApi.call({
                method: 'get',
                url: 'mantenimiento/listar/' + id,
                response: function (resp) {
      
                    if(resp.mensage == "Listando los mantenimientos del vehiculo"){
                        $scope.mantes = resp.data;
                    }   

                },
                error: function (resp) {
                    navigator.notification.confirm(resp, function(){
                    }, "Error", ["Aceptar"]);
                },
                validationError: function (resp) {
                    navigator.notification.confirm(resp, function(){
                    }, "Accesso", ["Aceptar"]);
                }
            });

        }

        $scope.mostrar();
        
        $scope.cargar = function(){
        	$scope.mostrar();
        	$scope.$broadcast('scroll.refreshComplete'); 
        }

    }]);

}());

   