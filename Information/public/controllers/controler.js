var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl', ['$scope','$http',function($scope, $http){
    console.log('Hello world from controller');
    var refresh = function() {
        $http({
            method: 'GET',
            url: '/informationlist'
        }).then(function successCallback(response) {
            console.log("I got the data I requested");
            $scope.info = response.data;

        });
    };
    refresh();
    $scope.addInfo=function(){
        console.log($scope.information);
        $http({
            method: 'POST',
            url: '/informationlist',
            data: $scope.information
        }).then(function(response) {
                console.log('POST Response: '+ response.statusText);
                refresh();
                $scope.information = "";

            });


    };

    $scope.remove=function(id){
        $http({
            method: 'DELETE',
            url: '/informationlist/'+id,
            data: $scope.information
        }).then(function(response) {
            refresh();
        });
    };

    $scope.edit=function(id){
        $http({
            method: 'GET',
            url: '/informationlist/'+id,
            data: $scope.information
        }).then(function(response) {
            $scope.information = response.data;
        });
    };

  $scope.update=function(){
      $http({
          method:'PUT',
          url:'/informationlist/'+$scope.information._id,
          data:$scope.information
      }).then(function(response) {
          $scope.information = "";
          refresh();
      });
  };

}])﻿;
