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
    $scope.tableGenerate = tableGenerate;
    $scope.destChange  = destChange;
    $scope.originChange  = originChange;
    $scope.startChange = startChange;
    $scope.endChange = endChange;
    $scope.startDate = new Date();
    $scope.EndDate;
    $scope.stop = "";
    $scope.startCalendar;
    $scope.addTable = addTable;
    $scope.delTable = delTable;
    $scope.checInputFields = checInputFields;
    $scope.tablesData = [];
    $scope.stops = {};

/* To add the trip stop in  in the table */
    function addTable (index) {
     var pos = index + 1;
     var stopsTableData = {
          "destination":"",
          "startDate": "",
          "origin":"",
          "dest": "",
          "stopPlace": true,
          "endDate": ""};
     $scope.tablesData.splice(pos,0,stopsTableData);
     originChange(index,true);
     $scope.stop = $scope.tablesData.length;
    }

/* To delete the trip stop in  in the table */
     function delTable (index) {
      var deleteTable =  $scope.tablesData[index]
      $scope.tablesData.splice(index,1);
      destChange(index, deleteTable);
      $scope.stop = $scope.tablesData.length;
      }          
          /* To change the departure place in form  */
    function startChange () {
     $scope.originText = document.getElementById("startPlace").value;
      }

/* To change the destination place in form  */
    function endChange (event) {
           $scope.destinationText = event.target.value;
      }

     /* To change the destination inside the table column  */
     function destChange (index, deleteElement) {
      if(angular.isObject(deleteElement)) {
            if(index == 0) {
              if($scope.tablesData[0].origin != ''){
              $scope.originText = $scope.tablesData[0].origin;
                }
              else {
               $scope.originText = deleteElement.dest;
                }
              $scope.tablesData[0].origin = $scope.originText;
              $scope.tablesData[0].startDate = $scope.startCalendar;
              } else {
                var lastStop = $scope.tablesData.length-1
                if(index == lastStop){
                  if($scope.tablesData[index-1].dest == ''){
                  $scope.tablesData[index].dest = $scope.tablesData[index - 1].origin;
                  } else {
                  $scope.tablesData[index].dest = $scope.tablesData[index - 1].dest;
                  }
                }
                else {
                 $scope.tablesData[index].origin = deleteElement.origin;
                }
              }
      }
      else {
            var isLast = index + 1;
            var last = $scope.tablesData.length - 1;
            var len = $scope.tablesData.length;
            if(last === isLast) {
            $scope.tablesData[last].dest  = $scope.tablesData[index].dest;
            } else {
            if(last == index) {
             $scope.tablesData[index-1].dest = $scope.tablesData[last].dest;
            } else {
              $scope.tablesData[index+1].origin  = $scope.tablesData[index].dest;
               }
             }
     }
  }


/* To change the origin inside the table column  */
     function originChange (index,insert) {
      if(insert == true) {
         $scope.tablesData[index+1].origin  = $scope.tablesData[index+2].origin;
         $scope.tablesData[index+2].origin = '';

      } else {
        if(index === 0) {
          $scope.tablesData[index+1].origin  = $scope.tablesData[index].origin;
           }
           else {
            if(index == 1) {
              $scope.tablesData[0].origin  = $scope.tablesData[index].origin;
            } else {
              $scope.tablesData[index-1].dest  = $scope.tablesData[index].origin;
            }
       }
     }
   }

/* To validate the form  */
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

   /* To generate the table rows  */

    function tableGenerate () {
       var endDate = Date.parse($scope.EndDate)
       if($scope.destinationText != null && $scope.originText != null && $scope.stop >0 && !isNaN(endDate))
       {
        var startYear = $scope.startDate.getFullYear();
        var startMonth = $scope.startDate.getMonth() + 1;
        var startDay = $scope.startDate.getDate();
        $scope.startCalendar = startMonth+'/'+startDay+'/'+startYear;
        var endYear = $scope.EndDate.getFullYear();
        var endMonth = $scope.EndDate.getMonth() + 1;
        var endDay = $scope.EndDate.getDate();
        var endCalendar = endMonth+'/'+endDay+'/'+endYear;  
         var startTableData = {"start":$scope.originText,
          "destination":"",
          "startDate": $scope.startCalendar,
          "origin":"",
          "dest": "",
          "stopPlace": false,
          "originPlace": true,
          "endDate": ""};

          var endTableData = {"origin":"",
          "destination":$scope.destinationText,
          "startDate": "",
          "origin":"",
          "dest": "",
          "stopPlace": false,
          "destPlace": true,
          "endDate": endCalendar}

           if($scope.stop > 1){
          for (var i = 0; i < $scope.stop; i++) {
             var stopsTableData = {
          "destination":"",
          "startDate": "",
          "origin":"",
          "dest": "",
          "stopPlace": true,
          "endDate": ""};
           if(i==0){
          $scope.tablesData.push(startTableData);
           }else
           {
          if(i=== ($scope.stop-1)){
          $scope.tablesData.push(endTableData);
           } else {
           $scope.tablesData.push(stopsTableData);
           }
         }
       }
     }

   }
}

/* To search the place in auto complete  */


    function querySearch (query) {
      var len = $scope.tablesData.length;
      if(len > 0)
      {
      $scope.tablesData[len-1].destination = query;
       document.getElementById('end').value = query
  }
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

    /* To get the log info when the text is changed in autocomplete  */


    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
      if(document.getElementById("startPlace"))
       document.getElementById("startPlace").value = text;
    }
    function searchTextChangeEnd(text) {
      $log.info('Text changed to 1' + text);
//      document.getElementById("endPlace").value = text;
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