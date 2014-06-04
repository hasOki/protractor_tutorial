'use strict';

angular.module('protractorTutorialApp')
  .controller('MainCtrl', function ($scope) {
      $scope.mockItems = [
          { id: 1, name: 'Dexter', profilePic: 'http://placekitten.com/50/50', message: 'MEOWW!!!' },
          { id: 2, name: 'Hannibal', profilePic: 'http://placekitten.com/51/50', message: 'PURRRR!!!' },
          { id: 3, name: 'Joe', profilePic: 'http://placekitten.com/52/50', message: 'GROWLL!!!' },
          { id: 4, name: 'Norman', profilePic: 'http://placekitten.com/53/50', message: 'EEEKKKKK!!!' }
        ];
    });
