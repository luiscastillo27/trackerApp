(function(){
    
    var app = angular.module('AjustesCtrl', []);

    app.controller('AjustesCtrl', ['$scope', 'restApi', 'locStr', '$state', 'auth', '$ionicPopup' ,function ($scope, restApi, locStr, $state, auth, $ionicPopup) {
        
        auth.redirectIfNotExists();
        $scope.btnSalir = function(){
            //auth.logout();
            navigator.notification.confirm("¿Quieres cerrar la sesión?", function(buttonIndex){
                switch(buttonIndex){
                    case 1:
                        // navigator.notification.confirm("Aceptar", function(){
                        // }, "Error", ["Aceptar"]);
                        //auth.logout();
                    break;
                    case 2:
                        // navigator.notification.confirm("No cerrar", function(){
                        // }, "Error", ["Aceptar"]);
                        console.log("No cerrar sesión!")
                    break;
                }
            }, "¿Seguro?", ["Aceptar", "Cancelar"]);

        }


    }]);

}());  