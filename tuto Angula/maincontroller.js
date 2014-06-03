app.controller("MainController", function($scope,$http){

 $scope.blocks = [];
  $scope.addBlock = function(){
    if($scope.parentblock == null)
    {
      var div = document.createElement("div");
      div.setAttribute('id',$scope.blocktitle);
      div.setAttribute('lvl',0);
      var path = '/'+$scope.selectedtype.tagname;
      div.setAttribute('path',path);

      div.innerHTML = '<h1>' + $scope.blocktitle + '</h1><p> path : '+ path + '</p>';
      if($scope.blockvalue)
      {
        div.innerHTML = div.innerHTML + '<p>' + $scope.blockvalue + '</p>';
      }

      document.getElementById('blocks').appendChild(div);
      $scope.blocks.push([$scope.blocktitle,$scope.selectedtype.tagname,$scope.parentblock,path]);

    }
    else
    {
      var div = document.createElement("div");
      div.setAttribute('id',$scope.blocktitle);
      var lvl = Number(document.getElementById($scope.parentblock[0]).getAttribute('lvl'))+1;
      div.setAttribute('lvl',lvl);
      var path = ($scope.parentblock[3]+'/'+$scope.selectedtype.tagname);

      div.innerHTML = '<h2>' + (new Array(lvl + 1).join("&nbsp")) + $scope.blocktitle +
       '</h2><p>' +  (new Array(lvl + 5).join("&nbsp")) + ' path : '+ path + '</p>';

       if($scope.blockvalue)
      {
        div.innerHTML = div.innerHTML +  '<p>' + (new Array(lvl + 5).join("&nbsp")) + 
        $scope.blockvalue + '</p>';
      }

      document.getElementById($scope.parentblock[0]).appendChild(div);
      $scope.blocks.push([$scope.blocktitle,$scope.selectedtype.tagname,$scope.parentblock,path]);

    }
      
    }

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

    $scope.primitives = ["gco:CharacterString","Real","Integer","Decimal","Url","gco:Date","gco:DateTime","gco:Measure"];

    
});