app.controller("MainController", function($scope,$http){
  $scope.contents = null;
  $http.get('test.json')
      .success(function(data) {
          $scope.contents=data;
      })
      .error(function(data,status,error,config){
          $scope.contents = [{heading:"Error",description:status}];
      });

  $scope.types=null;
  $http.get('types.json')
  	.success(function(data) {
  		$scope.types=data;
  	})
  	.error(function(data,status,error,config){
          $scope.contents = [{heading:"Error",description:status}];
      });
  	
    $scope.dis = function(){
    	alert($scope.contents[2].path);
    }
});