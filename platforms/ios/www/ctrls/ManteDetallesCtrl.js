(function(){

var app = angular.module('ManteDetallesCtrl', []);

    app.controller('ManteDetallesCtrl', ['$scope', 'restApi', 'locStr', '$state', 'auth', '$ionicPopup', '$cordovaGeolocation', '$stateParams', function ($scope, restApi, locStr, $state, auth, $ionicPopup, $cordovaGeolocation, $stateParams) {
        
        auth.redirectIfNotExists();
        var id = $stateParams.id;
        var options = {timeout: 10000, enableHighAccuracy: true};

        

            restApi.call({
                method: 'get',
                url: 'mantenimiento/obtener/' + id,
                response: function (resp) {
                   
                    if(resp.mensage == "Peticion hecha correctamente"){
                        console.log(resp);
                        $scope.latitud = resp.data[0]["latitud"];
                        $scope.logitud = resp.data[0]["logitud"];
                        $scope.titulo = resp.data[0]["modelo"];
                        $scope.destino = { lat: $scope.latitud, lng: $scope.logitud }

                        $cordovaGeolocation.getCurrentPosition(options).then(function(position){

                            $scope.coordenas = { lat: position.coords.latitude, lng: position.coords.longitude }
                            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                            var mapOptions = {
                              center: latLng,
                              mapTypeId: google.maps.MapTypeId.ROADMAP
                            }            

                            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

                            var marker = new google.maps.Marker({
                                position: latLng,
                                map: $scope.map,
                                zoom: 4
                            });

                            //OBJETO  DE CONFIGURACION DR
                            var configDr = {
                                map: $scope.map
                            }

                            //OBJETO  DE CONFIGURACION DS
                            var configDs = {
                                origin: $scope.coordenas,
                                destination: $scope.destino,
                                travelMode: google.maps.TravelMode.DRIVING
                            }
                            //OBTENER LAS COORDENADAS
                            var ds = new google.maps.DirectionsService();

                            //TRADUCE LAS COORDENADAS A LAS LINAS DEL MAPA
                            var dr = new google.maps.DirectionsRenderer( configDr );

                            //TRASAR LA RUTA
                            function rutear(result, status){
                                
                                if(status == "OK"){
                                    dr.setDirections(result);
                                }
                            }

                            ds.route( configDs, rutear );

                        }, function(error){
                            console.log("Could not get location");
                        });

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

        
        
    }]);

}());