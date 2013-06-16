// Generated by CoffeeScript 1.6.2
(function() {
  var app, checklist, selectedItems;

  checklist = function(items) {
    var id, item, skills;

    id = 0;
    skills = (function() {
      var _i, _len, _results;

      _results = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        _results.push({
          name: item,
          id: id++,
          checked: false
        });
      }
      return _results;
    })();
    return skills;
  };

  selectedItems = function(items) {
    var item, selected, _i, _len;

    selected = [];
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      if (item.checked) {
        selected.push({
          name: item.name,
          id: item.id
        });
      }
    }
    return selected;
  };

  app = angular.module('mentorSignUp', ['ui.bootstrap', 'mongolab']);

  app.config([
    '$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'partials/form.html',
        controller: 'FormController'
      });
      $routeProvider.when('/thankyou', {
        templateUrl: 'partials/thankyou.html',
        controller: 'ThankyouController'
      });
      return $routeProvider.otherwise({
        redirectTo: '/'
      });
    }
  ]);

  app.controller('FormController', [
    '$rootScope', '$scope', '$location', 'Signup', '$http', function($rootScope, $scope, $location, Signup, $http) {
      $scope.form = {
        email: '',
        firstName: '',
        lastName: '',
        company: '',
        title: '',
        zip: '',
        expertise: '',
        other: '',
        kidExperience: false,
        tshirtSize: 'Medium',
        backgroundCheck: false
      };
      $scope.mentorSkills = checklist(['Arduino / Raspberry Pi / Hardware hacking', 'CSS', 'HTML5', 'JavaScript', 'Node.js', 'Scratch', 'Python', 'Ruby', 'PHP', 'Java', 'C#', 'Robotics']);
      $scope.form.additionalSkill = '';
      $scope.additionalSkills = [];
      $scope.additionalSkillAdd = function() {
        console.log($scope.form.additionalSkill);
        return $scope.additionalSkills.push({
          name: $scope.form.additionalSkill,
          checked: true
        });
      };
      $scope.additionalSkillRemove = function(index) {
        return $scope.additionalSkills.splice(index, 1);
      };
      $scope.volunteerOffers = checklist(['Mentoring kids on technology', 'Leading a 4-week exploration on a topic', 'Donating or reimaging computers', 'Reaching out to local schools to tell them about CoderDojo Ponce Springs', 'Supporting events as a volunteer']);
      $scope.availability = checklist(['Sat June 29, 2 - 5 PM', 'Sat July 13, 2 - 5 PM', 'Sat July 27, 2 - 5 PM', 'Sat August 10, 2 - 5 PM', 'Sat August 24, 2 - 5 PM']);
      $scope.tshirtSizes = ['Small', 'Medium', 'Large', 'X-Large', 'XX-Large'];
      $scope.tshirtSizeSelect = function(tshirtSize) {
        return $scope.form.tshirtSize = tshirtSize;
      };
      return $scope.submit = function() {
        var html,
          _this = this;

        $scope.form.mentorSkills = selectedItems($scope.mentorSkills);
        $scope.form.volunteerOffers = selectedItems($scope.volunteerOffers);
        $scope.form.submitDate = new Date();
        delete $scope.form.additionalSkill;
        $scope.form.additionalSkills = $scope.additionalSkills;
        html = document.getElementById('message').innerHTML;
        return Signup.save($scope.form, function(signup) {
          $rootScope.signup = signup;
          signup.html = html;
          $http({
            url: '/submit',
            method: 'POST',
            data: signup
          });
          return $location.path('/thankyou');
        });
      };
    }
  ]);

  app.controller('ThankyouController', [
    '$rootScope', '$scope', function($rootScope, $scope) {
      return $scope.name = "" + $rootScope.signup.firstName;
    }
  ]);

}).call(this);
