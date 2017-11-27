(function(){

var app = angular.module('RutasDetallesCtrl', []);

    app.controller('RutasDetallesCtrl', ['$scope', 'restApi', 'locStr', '$state', 'auth', '$ionicPopup', '$cordovaGeolocation', '$stateParams', function ($scope, restApi, locStr, $state, auth, $ionicPopup, $cordovaGeolocation, $stateParams) {
        
        auth.redirectIfNotExists();
        var id = $stateParams.id;
        var options = {timeout: 10000, enableHighAccuracy: true};

        

            restApi.call({
                method: 'get',
                url: 'rutas/obtener/' + id,
                response: function (resp) {
                   
                    if(resp.mensage == "Peticion hecha correctamente"){
                        $scope.latitud = resp.data[0]["latitud"];
                        $scope.logitud = resp.data[0]["logitud"];
                        $scope.titulo = resp.data[0]["articulo"];
                        $scope.destino = { lat: $scope.latitud, lng: $scope.logitud }


                        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
                        var icons = {
                          parking: {
                            icon: iconBase + 'parking_lot_maps.png'
                          },
                          library: {
                            icon: iconBase + 'library_maps.png'
                          },
                          info: {
                            icon: iconBase + 'info-i_maps.png'
                          }
                        };

                        $cordovaGeolocation.getCurrentPosition(options).then(function(position){

                            $scope.coordenas = { lat: position.coords.latitude, lng: position.coords.longitude }
                            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                            var mapOptions = {
                              center: latLng,
                              mapTypeId: google.maps.MapTypeId.ROADMAP
                            }            

                            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

                            // var marker = new google.maps.Marker({
                            //     position: latLng,
                            //     map: $scope.map,
                            //     zoom: 4,
                            //     icon: icons.parking.icon,
                            //     animation: google.maps.Animation.DROP
                            // });

                            //OBJETO  DE CONFIGURACION DR
                            var configDr = {
                                animation: google.maps.Animation.DROP,
                                map: $scope.map,
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