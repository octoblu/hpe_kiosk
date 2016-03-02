
var app = angular.module('MyApp', ['AutoFontSize']);

app.controller('AppCtrl', function($scope) {
  $scope.names = "";

  $scope.clearNames = function(){
    $scope.names = [""];
    $scope.$apply();
  }

  $scope.payload = function(data){

  var names = [];
    data.payload.names.forEach(function(entry) {

        var now = new Date();
        var thehour = now.getHours(); // the local browser time
        
        var greet = "Good ";

        if (thehour > 18) { greet += "evening"; }
        else if (thehour > 12) { greet += "afternoon"; }
        else { greet += "morning"; }

        var text = greet + " " + entry.name;

        names.push(text);

    });

    $scope.names = names;
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
      "names": {
        "type": "array",
        "maxItems": 3,
        "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" }
        }
      }
    },
    "utcoffset":{
      "type":"integer",
      "default": -8  
    },
      "clear": {
        "type": "boolean",
        "default": false
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
      if(data.payload.clear == false){
        $scope.payload(data);
      }else{
        $scope.clearNames();
      }

    });

  });

});
