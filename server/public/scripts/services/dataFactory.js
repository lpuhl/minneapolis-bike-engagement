myApp.factory('DataFactory', ['$http', function($http) {
  console.log("data factory running");

  var newFeature;

  var intakeDrawnItem = function(item) {
    console.log('intakeDrawnItem function running');
    newFeature = item;
    console.log('new feature in factory: ', newFeature);
  };

  var saveNewRecord = function(newComment) {
    console.log('newComment in saveNewRecord function: ', newComment);
    console.log('newFeature in saveNewRecord function :', newFeature);
    // console.log('newFeature.features.geometry in saveNewRecord function :', newFeature.features.geometry);

    // var sql = "SELECT "+ 'insert_crowd_mapping_data' +"(";
    // sql += newFeature;
    // sql += ","+enteredDescription;
    // sql += ","+enteredUsername;
    // sql += ","+zip+");";

    // $http ({
    //   method: 'POST',
    //   url: 'https://lizzz.cartodb.com/api/v2/sql',
    //   crossDomain: true,
    //   data: {"q":sql},
    //   dataType: 'json'}).then(function() {
    //       console.log("new feature saved");
    //   }, function() {
    //       console.log("Ugh, this sucks.");
    //   });
  };
// from https://bl.ocks.org/crstn/5ca52b2c577724db0e51
  function persistOnCartoDB(action, layers) {
    var cartodb_ids = [];
    var geojsons = [];

    switch (action) {
      // case "UPDATE":
      //   if (layers.getLayers().length < 1) return;
      //
      //   layers.eachLayer(function(layer) {
      //     cartodb_ids.push(layer.cartodb_id);
      //     geojsons.push("'" + JSON.stringify(layer.toGeoJSON()) + "'");
      //   });
      //   break;

      case "INSERT":
        cartodb_ids.push(-1);
        geojsons.push("'" + JSON.stringify(layers.toGeoJSON()) + "'");
        break;

      // case "DELETE":
      //   layers.eachLayer(function(layer) {
      //     cartodb_ids.push(layer.cartodb_id);
      //     geojsons.push("''");
      //   });
      //   break;
    }

    var sql = "SELECT insert_crowd_mapping_data(ARRAY[";
    sql += cartodb_ids.join(",");
    sql += "],ARRAY[";
    sql += geojsons.join(",");
    sql += "]);";

    console.log("persisting... https://lizzz.cartodb.com/api/v2/sql?q=" + sql);
    $http({
      method: 'POST',
      url: 'https://lizzz.cartodb.com/api/v2/sql',
      crossDomain: true,
      data: {
        "q": sql
      },
      dataType: 'json'
    }).then(function successCallback(responseData, textStatus, jqXHR) {
        console.log("Data saved");
        if (action == "INSERT")
          layers.cartodb_id = responseData.rows[0].cartodb_id;
      }, function errorCallback (responseData, textStatus, errorThrown) {
        console.log("Problem saving the data");
        console.log(responseData);
        console.log(textStatus);
        console.log(errorThrown);
      });

  }

  // newFeatures.eachLayer(function (layer) {
  //   //Convert the drawing to a GeoJSON to pass to the CartoDB sql database
  //   var drawing = "'"+JSON.stringify(layer.toGeoJSON().geometry)+"'";
  //   console.log(drawing);
  //   // Construct the SQL query to insert data from the parameters: the drawing & user inputs
  // });

  return {

    saveDrawnItem: function(drawing) {
      // console.log('saveDrawnItem running from factory:');
      return persistOnCartoDB(action, layers);
    },
    saveNewComment: function(newComment) {
      return saveNewRecord(newComment);
      // console.log('newComment from factory: ', newComment);
    },
    getDrawnItem: function() {
      return newFeature;
    }


  }

}]);
