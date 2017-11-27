(function(){

var app = angular.module('RutasCtrl', []);

    app.controller('RutasCtrl', ['$scope', 'restApi', 'locStr', '$state', 'auth', '$ionicPopup',function ($scope, restApi, locStr, $state, auth, $ionicPopup) {
        
        auth.redirectIfNotExists();
        $scope.rutas = [];
        var id = auth.getUserData().idUsuario;

        $scope.mostrar = function(){

            restApi.call({
                method: 'get',
                url: 'rutas/listar/' + id,
                response: function (resp) {
      
                    if(resp.mensage == "Listando las rutas del empleado"){
                        $scope.rutas = resp.data;
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


   