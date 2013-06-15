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

  app = angular.module("mentorSignUp", ["ui.bootstrap", "mongolab"]);

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

  app.controller("FormController", [
    "$rootScope", "$scope", "$location", "Signup", "$http", function($rootScope, $scope, $location, Signup, $http) {
      $scope.form = {
        email: '',
        firstName: '',
        lastName: '',
        company: '',
        title: '',
        zip: '',
        expertise: '',
        otherSkills: '',
        kidExperience: false,
        backgroundCheck: false
      };
      $scope.mentorSkills = checklist(['Arduino / Raspberry Pi / Hardware hacking', 'CSS', 'HTML5', 'JavaScript', 'Node.js', 'Scratch', 'Python', 'Ruby', 'PHP', 'Java', 'C#', 'Robotics']);
      $scope.volunteerOffers = checklist(['Mentoring kids on technology', 'Supporting the event as a volunteer', 'Leading a 4-week exploration on a topic', 'Donating or reimaging computers']);
      return $scope.submit = function() {
        var html,
          _this = this;

        $scope.form.mentorSkills = selectedItems($scope.mentorSkills);
        $scope.form.volunteerOffers = selectedItems($scope.volunteerOffers);
        html = document.getElementById('message').innerHTML;
        signup.html = html;
        return Signup.save($scope.form, function(signup) {
          $rootScope.signup = signup;
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

  app.controller("ThankyouController", [
    '$rootScope', '$scope', function($rootScope, $scope) {
      return $scope.message = "Thank you " + ($rootScope.signup.firstName + ' ' + $rootScope.signup.lastName) + " for submitting the volunteer signup form. We will contact you soon!";
    }
  ]);

}).call(this);
