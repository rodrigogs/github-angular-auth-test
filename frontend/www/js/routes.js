angular.module('app').config(Routes);

Routes.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
];
function Routes($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl',
    })

    .state('token', {
      url: '/token/:token',
      controller: 'TokenCtrl',
    });

  $urlRouterProvider.otherwise('/');
}
