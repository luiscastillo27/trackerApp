(function(){
//MODULO DE AGUSTES
var app = angular.module('LoginCtrl', []);
 
    app.controller('LoginCtrl', ['$scope', 'restApi', 'locStr', '$state', 'auth', '$ionicLoading', function ($scope, restApi, locStr, $state, auth, $ionicLoading) {
        


          if(!auth.hasToken()){
              $state.go('tab.rutas');
          } else {
          
                    $scope.show = function() {
                        $ionicLoading.show({
                            template: 'Cargando...'
                        }).then(function(){

                        });
                    }

                    $scope.hide = function(){
                        $ionicLoading.hide().then(function(){
                           
                        });
                    };

                    $scope.verifi = {
                        email: undefined,
                        password: undefined
                    };
                    
                                    
                    $scope.btnVerificar = function(){

                        $scope.show();

                        var data = {
                            email:    $scope.verifi.email,
                            password: $scope.verifi.password
                        }

           
                        restApi.call({
                            method: 'post',
                            url: 'usuarios/autenticar',
                            data: data,
                            response: function (resp) {

                                
                                if(resp.mensage = 'Haz ingresado correctamente'){
                                    $scope.hide();
                                    auth.setToken(resp.token);
                                    $state.go('tab.rutas');
                                } 
                                if(resp.mensage = 'Credenciales no validas'){
                                    $scope.hide();
                                    $scope.verifi = {
                                        email: undefined,
                                        password: undefined
                                    };
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
              
          }

    }]);
    
}());