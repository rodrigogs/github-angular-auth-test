angular.module('app.controllers').controller('TokenCtrl', TokenController);

TokenController.$inject = [
  '$cookies',
  '$stateParams',
  '$location',
  '$state',
  '$rootScope',
];
function TokenController($cookies, $stateParams, $location, $state, $rootScope) {
  var token = $stateParams.token;

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  $cookies.put('token', token, { expires: tomorrow });

  $state.go('home');
}
