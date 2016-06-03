'use strict';
/**
 * @ngdoc overview
 * @name TripPlanner
 * @description
 * # TripPlanner
 *
 * Main module of the application.
 */


angular
  .module('TripPlanner', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).config(['$translateProvider',function($translateProvider) {

    $translateProvider.translations('en_EN', {
        'NOPLACES':'No Places matching',
        'HEADLINE': 'Introducing ngTranslate',
        'STOP':'No.of.Stop',
        'GOTRIP': 'GoTrip',
        'NEWTRIP': 'new Trip',
        'ADD_DEL': 'Add/Del',
        'STOPNO': 'Stop No.',
        'ORIGIN':'Origin',
        'DEST': 'Destination',
        'START_DATE': 'Start Date',
        'STOP_DATE': 'Stop Date',
        'MIN_ERROR': 'Please do not give zero or negative integers.',
        'MAX_ERROR': 'Maximum stop is up to 99',
        'ENG_LANG': 'Eng',
        'GER_LANG': 'Ger'
    })


    $translateProvider.translations('de_DE', {
        'NOPLACES':'Keine Orte passend',
        'STOP':'Anzahl der Stopp',
        'GOTRIP': 'gehen Reise',
        'NEWTRIP': 'neue Reise',
        'ADD_DEL': 'hinzufügen/löschen',
        'STOPNO': 'Stopp- Nummer',
        'ORIGIN':'Herkunft',
        'DEST': 'Reiseziel',
        'START_DATE': 'Anfangsdatum',
        'STOP_DATE': 'Stoppdatum',
        'MIN_ERROR': 'Bitte geben Sie nicht Null oder negative ganze Zahlen.',
        'MAX_ERROR': 'Maximaler Halt ist bis zu 99',
        'ENG_LANG': 'Eng',
        'GER_LANG': 'Ger'
    })

$translateProvider.preferredLanguage('en_EN');

  }]);
