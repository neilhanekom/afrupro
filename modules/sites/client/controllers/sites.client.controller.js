'use strict';

angular.module('sites').controller('SitesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Sites',
	function($scope, $stateParams, $location, Authentication, Sites) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var site = new Sites({
				title: this.title,
				content: this.content
			});
			site.$save(function(response) {
				$location.path('sites/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(site) {
			if (site) {
				site.$remove();

				for (var i in $scope.sites) {
					if ($scope.sites[i] === site) {
						$scope.sites.splice(i, 1);
					}
				}
			} else {
				$scope.site.$remove(function() {
					$location.path('sites');
				});
			}
		};

		$scope.update = function() {
			var site = $scope.site;

			site.$update(function() {
				$location.path('sites/' + site._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.sites = Sites.query();
		};

		$scope.findOne = function() {
			$scope.site = Sites.get({
				siteId: $stateParams.siteId
			});
		};
	}
]);