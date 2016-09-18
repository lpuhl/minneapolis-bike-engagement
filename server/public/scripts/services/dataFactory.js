myApp.factory('DataFactory', ['$http', function($http) {
  console.log("data factory running");

  var newFeature;
  var dbFeatures = {};


  var intakeDrawnItem = function(item) {
    console.log('intakeDrawnItem function running');
    newFeature = item;
    console.log('new feature in factory: ', newFeature);
  };

  var saveNewRecord = function(newComment) {
    console.log('newComment in saveNewRecord function: ', newComment);
    console.log('newFeature in saveNewRecord function :', newFeature);
    var record = newComment;
    record.geometry = newFeature;
    console.log('record before http req: ', record);

    $http.post('/newcomment', record)
      .then(
        function(response) {
        console.log("post response: ", response);
        if(response.status == 201) {
          console.log("saveNewRecord successful");
        } else {
          console.log("error posting new comment");
        }
      });

  };

  var baseURL = 'https://lizzz.carto.com/api/v2/sql?format=GeoJSON&q=';
  // var baseURL = 'https://lizzz.carto.com/api/v2/sql?q=';
  var sql = 'SELECT * FROM mpls_bikeways';

  var getFeaturesFromDB = function() {
    var query = baseURL + sql + '&callback=JSON_CALLBACK';
    console.log('query: ', query);
    // var request = encodeURI(query);
    // console.log('request: ', request)
    var promise = $http.jsonp(query).then(function(data) {
      console.log("full data from db: ", data);
      console.log("data from db: ", data.data.features);
      dbFeatures = data.data.features;
      // return dbFeatures;
    });
    return promise;
    console.log(dbFeatures);
  };

  var sendDBFeatures = function() {
    return dbFeatures;
  };


  // newFeatures.eachLayer(function (layer) {
  //   //Convert the drawing to a GeoJSON to pass to the CartoDB sql database
  //   var drawing = "'"+JSON.stringify(layer.toGeoJSON().geometry)+"'";
  //   console.log(drawing);
  //   // Construct the SQL query to insert data from the parameters: the drawing & user inputs
  // });



  return {

    saveDrawnItem: function(drawing) {
      // console.log('saveDrawnItem running from factory:');
      return intakeDrawnItem(drawing);
    },
    saveNewComment: function(newComment) {
      return saveNewRecord(newComment);
      // console.log('newComment from factory: ', newComment);
    },
    getFeaturesFromDB: function() {
      return getFeaturesFromDB();
    },
    getDataFromDB: function() {
      return sendDBFeatures();
    }
  }

}]);
