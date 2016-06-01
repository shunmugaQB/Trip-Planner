'use strict';

/**
 * @ngdoc function
 * @name TripPlanner.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the TripPlanner
 */
angular.module('TripPlanner')
  .controller('MainCtrl', function ($scope, $timeout, $q, $log, $http) {
    var $scope = this;
    $scope.simulateQuery = false;
    $scope.isDisabled    = false;
    // list of `state` value/display objects
    $scope.states        = loadAll();
    $scope.querySearch   = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    $scope.searchTextChange   = searchTextChange;
    $scope.createFilterFor  = createFilterFor;
    $scope.submit = submit;
    $scope.startDate = new Date();
    $scope.EndDate;
    $scope.stop = ""
    $scope.addTable = addTable;
    $scope.delTable = delTable;
    $scope.checInputFields = checInputFields;
    $scope.tablesData = [];
    $scope.stops = {};
    // $scope.originStopUpdate = originStopUpdate;
    // $scope.destStopUpdate = destStopUpdate;


     function addTable (index) {

    }


    function checInputFields () {
     var endDate = Date.parse($scope.EndDate);
       if($scope.destinationText != null && $scope.originText != null && $scope.stop >0 && !isNaN(endDate))
        {
        if($scope.tablesData.length === 0){
         return false;
         }
       return true;
       }

      return true;
    }

    function delTable (index) {
    }

    function submit () {
       var endDate = Date.parse($scope.EndDate)
       if($scope.destinationText != null && $scope.originText != null && $scope.stop >0 && !isNaN(endDate))
       {
        var startYear = $scope.startDate.getFullYear();
        var startMonth = $scope.startDate.getMonth() + 1;
        var startDay = $scope.startDate.getDate();
        var startCalendar = startMonth+'/'+startDay+'/'+startYear;
        var endYear = $scope.EndDate.getFullYear();
        var endMonth = $scope.EndDate.getMonth() + 1;
        var endDay = $scope.EndDate.getDate();
        var endCalendar = endMonth+'/'+endDay+'/'+endYear;

         var startTableData = {"origin":$scope.originText,
          "destination":"",
          "startDate": startCalendar,
          "stopPlace": false,
          "originPlace": true,
          "endDate": ""};

          var endTableData = {"origin":"",
          "destination":$scope.destinationText,
          "startDate": "",
          "stopPlace": false,
          "destPlace": true,
          "endDate": endCalendar}
          console.log("$scope.stop....",$scope.stop)
           if($scope.stop > 1){
          for (var i = 0; i < $scope.stop; i++) {
             var stopsTableData = {
          "destination":"",
          "startDate": "",
          "stopPlace": true,
          "endDate": ""};

           if(i==0){
          $scope.tablesData.push(startTableData);
           }else
           {
          if(i=== ($scope.stop-1)){
          $scope.tablesData.push(endTableData);
           }else {
           $scope.tablesData.push(stopsTableData);
           }
         }
        }
      }

    }
  }

    function querySearch (query) {
      var results = query ? $scope.states.filter( $scope.createFilterFor(query) ) : $scope.states,
          deferred;
      if ($scope.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }
  })