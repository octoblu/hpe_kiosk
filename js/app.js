
var app = angular.module('MyApp');

app.controller('AppCtrl', function($scope) {

  $scope.borderColor = "01a982";
  $scope.availText = "Available for Collaboration"
  $scope.names = "";

  $scope.payload = function(data){
    $scope.availText = data.payload.text;
    $scope.borderColor = data.payload.color;
    $scope.names = data.payload.names;
    $scope.$apply()
  }


  var GET = {};
  var query = window.location.search.substring(1).split("&");
  for (var i = 0, max = query.length; i < max; i++)
  {
    if (query[i] === "") 
    continue;
    var param = query[i].split("=");
    GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
  }

  var conn = meshblu.createConnection({
    "uuid": GET.uuid,
    "token": GET.token
  });

  var MESSAGE_SCHEMA = {
    "type": 'object',
    "properties": {
      "text": {
        "type": "string",
        "enum": ["Available for Collaboration", "Collaboration in Progress"]
      },
      "color": {
        "type": "string",
        "enum": ["01a982", "FF8D6D"]
      },
      "names": {
        "type": "string"
      }
    }
  };

  conn.on('ready', function(data){
    console.log('UUID AUTHENTICATED!');
    console.log(data);
    conn.update({
      "uuid": GET.uuid,
      "messageSchema": MESSAGE_SCHEMA
    });

    conn.on('message', function(data){
      $scope.payload(data);
    });

  });

});
