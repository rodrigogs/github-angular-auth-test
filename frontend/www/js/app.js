angular.module('app.controllers', []);
angular.module('app.services', []);
angular.module('app.directives', []);
angular.module('app.filters', []);

angular.module('app', [
  'app.controllers',
  'app.services',
  'app.directives',
  'app.filters',
  'ui.router',
  'ngCookies',
])
  .run(Run);

Run.$inject = [
  '$rootScope',
  '$http',
  '$cookies',
  '$window',
];
function Run($rootScope, $http, $cookies, $window) {
  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    var token = $cookies.get('token');
    var hasToken = (token !== null && token !== undefined && token !== '');
    if (next.startsWith('http://localhost:3000/#!/token') || hasToken) {
      return;
    }
    event.preventDefault();
    $window.location.href = 'http://localhost:9000/v1/auth/login';
//    $http({
//      method: 'POST',
//      url: 'http://localhost:9000/v1/auth/check',
//      headers: {
//        token: $cookies.get('token'),
//      }
//   })
//    .then(function () {
//      $window.location.href = next;
//    })
//    .catch(function (err) {
//      $cookies.remove('token');
//      $rootScope.__checked__ = false;
//     $window.location.href = 'http://localhost:9000/v1/auth/login';
//    });
  });
}
