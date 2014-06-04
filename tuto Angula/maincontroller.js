app.controller("MainController", function($scope,$http){

 $scope.blocks = [];
 var doc = document.createElement("gmi:MI_Metadata");
 doc.setAttribute('xmlns:gmi','http://www.isotc211.org/2005/gmi');
 doc.setAttribute('xmlns:gco','http://www.isotc211.org/2005/gco');
 doc.setAttribute('xmlns:gmd','http://www.isotc211.org/2005/gmd');
 doc.setAttribute('xmlns:srv','http://www.isotc211.org/2005/srv');
 doc.setAttribute('xmlns:gts','http://www.isotc211.org/2005/gts');
 doc.setAttribute('xmlns:gml','http://www.opengis.net/gml/3.2');
 doc.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink');
 doc.setAttribute('xmlns:xsi','http://www.w3.org/2001/XMLSchema-instance');

 $scope.addBlock = function(){
    if($scope.parentblock == null)//creation of a lvl1 element
    {
      var div = document.createElement("div");

      //xml creation
      var elmt = document.createElement($scope.selectedtype.tagname);
      //

      div.setAttribute('id',$scope.blocktitle);
      div.setAttribute('lvl',0);
      var path = '/'+$scope.selectedtype.tagname;
      div.setAttribute('path',path);

      div.innerHTML = '<h1>' + $scope.blocktitle + '</h1><p> path : '+ path + '</p>';
      if($scope.blockvalue)
      {
        div.innerHTML = div.innerHTML + '<p>' + $scope.blockvalue + '</p>';

        //adding value to xml tag
        elmt.innerHTML = $scope.blockvalue;
        //

      }

      document.getElementById('blocks').appendChild(div);

      //xml adding
      doc.appendChild(elmt);
      console.log(doc);
      //

      $scope.blocks.push([$scope.blocktitle,$scope.selectedtype.tagname,$scope.parentblock,path]);

    }
    else //creation of a lvl n element
    {
      var div = document.createElement("div");

      //xml creation
      var elmt = document.createElement($scope.selectedtype.tagname);
      //

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

        //adding value to xml tag
        elmt.innerHTML = $scope.blockvalue;
        //

      }

      document.getElementById($scope.parentblock[0]).appendChild(div);

      //xml adding
      doc.getElementsByTagName($scope.parentblock[1].toLowerCase())[0].appendChild(elmt);
      //

      $scope.blocks.push([$scope.blocktitle,$scope.selectedtype.tagname,$scope.parentblock,path]);

    }
    //console.log(doc);

  }
  $scope.sendDocument = function(){
    alert('sending ' + doc.outerHTML);
    $http({
      method: 'POST',
      url: 'save.php',
      data:  { 'doc' : doc.outerHTML },
      headers: {'Content-Type': 'text/xml'}
    })
    .success(function(data){
      alert(data);
    })
    .error(function(){
      alert('fail');
    });
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