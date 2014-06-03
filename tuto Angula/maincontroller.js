app.controller("MainController", function($scope,$http){

 $scope.blocks = [];
  $scope.addBlock = function(){
    if($scope.parentblock == null)
    {
      var div = document.createElement("div");
      div.setAttribute('id',$scope.blocktitle);
      div.setAttribute('lvl',0);
      div.innerHTML = $scope.blocktitle;
      document.getElementById('blocks').appendChild(div);
      $scope.blocks.push([$scope.blocktitle,$scope.selectedtype.tagname,$scope.parentblock]);

    }
    else
    {
      var div = document.createElement("div");
      div.setAttribute('id',$scope.blocktitle);
      var lvl = Number(document.getElementById($scope.parentblock[0]).getAttribute('lvl'))+1;
      div.setAttribute('lvl',lvl);
      div.innerHTML = (new Array(lvl + 1).join("&nbsp")) + $scope.blocktitle;
      document.getElementById($scope.parentblock[0]).appendChild(div);
      $scope.blocks.push([$scope.blocktitle,$scope.selectedtype.tagname,$scope.parentblock]);

    }
      
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