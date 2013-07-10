// Generated by CoffeeScript 1.6.2
(function() {
  var app, checklist, selectedItems;

  checklist = function(items) {
    var id, item, skills, _i, _len;

    id = 0;
    skills = [];
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      skills.push({
        name: item,
        id: id++,
        checked: false
      });
    }
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

  app.directive('match', function($parse) {
    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {
        return scope.$watch(function() {
          return $parse(attrs.match)(scope) === ctrl.$modelValue;
        }, function(currentValue) {
          return ctrl.$setValidity('mismatch', currentValue);
        });
      }
    };
  });

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
      $routeProvider.when('/signups', {
        templateUrl: 'partials/signups.html',
        controller: 'SignupsController'
      });
      $routeProvider.when('/verified', {
        templateUrl: 'partials/verified.html',
        controller: 'VerifiedController'
      });
      $routeProvider.when('/skillsInventory', {
        templateUrl: 'partials/skillsInventory.html',
        controller: 'SkillsInventoryController'
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
        emailConfirm: '',
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
      $scope.additionalSkill = {
        value: ''
      };
      $scope.additionalSkills = [];
      $scope.additionalSkillAdd = function() {
        if ($scope.additionalSkill.value === '') {
          return;
        }
        $scope.additionalSkills.push({
          name: $scope.additionalSkill.value,
          checked: true
        });
        return $scope.additionalSkill.value = '';
      };
      $scope.additionalSkillRemove = function(index) {
        return $scope.additionalSkills.splice(index, 1);
      };
      $scope.additionalSkillAddDisabled = function() {
        return $scope.additionalSkill.value === '';
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

  app.controller('SkillsInventoryController', [
    '$rootScope', '$scope', 'Signup', function($rootScope, $scope, Signup) {
      'signups = [ \n  name: \'Joe Koberg\'\n  mentorSkills: [\'Python\', \'C#\', \'Ruby\', \'CoffeeScript\', \'JavaScript\', \'PHP\', \'Node\', \'Android\']\n  additionalSkills: [\'F#\', \'Django\', \'BitCoin\']\n,\n  name: \'Erin Stanfil\'\n  mentorSkills: [\'JavaScript\', \'Java\', \'Groovy\', \'CSS\', \'HTML\', \'C++\']\n  additionalSkills: [\'Grails\']\n,\n  name: \'Josh Gough\'\n  mentorSkills: [\'C#\', \'Python\', \'CoffeeScript\', \'JavaScript\', \'CSS\', \'HTML\',  \'PhoneGap\']\n  additionalSkills: [\'AngularJS\', \'Backbone\', \'Underscore\']\n]';
      var findMentorsForSkill, quantifySkills;

      Signup.query(function(signups) {
        return $scope.skillCounts = quantifySkills(signups);
      });
      quantifySkills = function(signups) {
        var index, mentors, signup, skillCounts, skillList, value, _i, _j, _len, _len1;

        skillList = [];
        for (_i = 0, _len = signups.length; _i < _len; _i++) {
          signup = signups[_i];
          if ((signup.mentorSkills != null) && _.isArray(signup.mentorSkills)) {
            skillList.push.apply(skillList, _.pluck(signup.mentorSkills, 'name'));
          }
          if ((signup.additionalSkills != null) && _.isArray(signup.additionalSkills)) {
            skillList.push.apply(skillList, _.pluck(signup.additionalSkills, 'name'));
          }
        }
        skillCounts = _.reduce(skillList.sort(), function(counts, skill) {
          if (counts[skill] == null) {
            counts[skill] = 0;
          }
          counts[skill]++;
          return counts;
        }, {});
        skillCounts = _.chain(skillCounts).pairs().sortBy(function(skillCount) {
          return -skillCount[1];
        }).value();
        for (index = _j = 0, _len1 = skillCounts.length; _j < _len1; index = ++_j) {
          value = skillCounts[index];
          mentors = findMentorsForSkill(value[0], signups);
          value[2] = mentors;
        }
        return skillCounts;
      };
      return findMentorsForSkill = function(skill, signups) {
        var allSkills, mentor, mentors, skillExists, _i, _len;

        mentors = [];
        for (_i = 0, _len = signups.length; _i < _len; _i++) {
          mentor = signups[_i];
          allSkills = [];
          allSkills.push.apply(allSkills, _.pluck(mentor.mentorSkills, 'name'));
          allSkills.push.apply(allSkills, _.pluck(mentor.additionalSkills, 'name'));
          skillExists = _.find(allSkills, function(item) {
            return item === skill;
          });
          if (skillExists != null) {
            mentors.push(mentor.firstName + ' ' + mentor.lastName);
          }
        }
        return mentors;
      };
    }
  ]);

  app.queryAll = {
    f: JSON.stringify({
      id: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
      backgroundCheckAuthorizationReceivedDate: 1,
      backgroundCheckPassedDate: 1,
      volunteerOffers: 1
    }),
    s: JSON.stringify({
      backgroundCheckAuthorizationReceivedDate: 1,
      backgroundCheckPassedDate: 1,
      firstName: 1
    })
  };

  app.queryMissingSomething = angular.copy(app.queryAll);

  app.queryMissingSomething.q = JSON.stringify({
    $or: [
      {
        backgroundCheckAuthorizationReceivedDate: null
      }, {
        backgroundCheckPassedDate: null
      }
    ]
  });

  app.queryVerified = angular.copy(app.queryAll);

  app.queryVerified.q = JSON.stringify({
    $and: [
      {
        backgroundCheckAuthorizationReceivedDate: {
          $ne: null
        }
      }, {
        backgroundCheckPassedDate: {
          $ne: null
        }
      }
    ]
  });

  app.controller('SignupsController', [
    '$rootScope', '$scope', 'Signup', function($rootScope, $scope, Signup) {
      var clearSearch, refreshList, show;

      clearSearch = function() {
        return $scope.searchTerm = '';
      };
      show = function(query) {
        clearSearch();
        return $scope.signups = Signup.query(query);
      };
      $scope.showAll = function() {
        return show(app.queryAll);
      };
      $scope.showMissingSomething = function() {
        return show(app.queryMissingSomething);
      };
      $scope.showVerified = function() {
        return show(app.queryVerified);
      };
      $scope.showMissingSomething();
      refreshList = function(updatedItem) {
        var index, item, _i, _len, _ref, _results;

        _ref = $scope.signups;
        _results = [];
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          item = _ref[index];
          if (item._id.$oid === updatedItem._id.$oid) {
            _results.push($scope.signups[index] = updatedItem);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      $scope.isBackgroundCheckAuthorizationReceived = function(signup) {
        return signup.backgroundCheckAuthorizationReceivedDate != null;
      };
      $scope.backgroundCheckAuthorizationReceived = function(signup) {
        return signup.updateSafe({
          backgroundCheckAuthorizationReceivedDate: new Date()
        }, refreshList);
      };
      $scope.backgroundCheckAuthorizationReset = function(signup) {
        return signup.updateSafe({
          backgroundCheckAuthorizationReceivedDate: null
        }, refreshList);
      };
      $scope.isBackgroundCheckPassed = function(signup) {
        return signup.backgroundCheckPassedDate != null;
      };
      $scope.backgroundCheckPassed = function(signup) {
        return signup.updateSafe({
          backgroundCheckPassedDate: new Date()
        }, refreshList);
      };
      $scope.backgroundCheckReset = function(signup) {
        return signup.updateSafe({
          backgroundCheckPassedDate: null
        }, refreshList);
      };
      return $scope.searchByName = function(name) {
        var queryByName;

        if (name === '') {
          return;
        }
        queryByName = angular.copy(app.queryAll);
        queryByName.q = JSON.stringify({
          $or: [
            {
              firstName: {
                $regex: name,
                $options: 'i'
              }
            }, {
              lastName: {
                $regex: name,
                $options: 'i'
              }
            }
          ]
        });
        return $scope.signups = Signup.query(queryByName);
      };
    }
  ]);

  app.controller('VerifiedController', [
    '$scope', 'Signup', function($scope, Signup) {
      $scope.members = Signup.query(app.queryVerified);
      return $scope.filterByName = function() {
        return function(item) {
          if ($scope.filterTerm == null) {
            return true;
          }
          if (item.firstName.toLowerCase().indexOf($scope.filterTerm.toLowerCase()) > -1 || item.lastName.toLowerCase().indexOf($scope.filterTerm.toLowerCase()) > -1) {
            return true;
          }
          if ((item.firstName + ' ' + item.lastName).toLowerCase().indexOf($scope.filterTerm.toLowerCase()) === 0) {
            return true;
          }
          return false;
        };
      };
    }
  ]);

}).call(this);
