app.controller("MainController", function($scope,$http){

 $scope.blocks = [];
  $scope.addBlock = function(){
      $scope.blocks.push([$scope.blocktitle,$scope.selectedtype.tagname,$scope.parentblock]);
    }

  $scope.test = "";
  $scope.contents = null;
 
  $scope.selectedtype = null;
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
          $scope.types = [{heading:"Error",description:status}];
      });
  	
    
});