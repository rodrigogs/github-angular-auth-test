angular.module('app.controllers').controller('HomeCtrl', TokenController);

TokenController.$inject = [
  '$scope',
];
function TokenController($scope) {
  $scope.user = { name: 'teta' };
}
