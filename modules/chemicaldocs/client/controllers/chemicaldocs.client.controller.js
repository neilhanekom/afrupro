'use strict';

// Chemicaldocs controller
angular.module('chemicaldocs').controller('ChemicaldocsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Chemicaldocs', '$timeout', '$window', '$upload',
	function($scope, $stateParams, $location, Authentication, Chemicaldocs, $timeout, $window, $upload) {

		$scope.authentication = Authentication;
		$scope.user = Authentication.user;

		// $scope.$watch('file', function () {
		//       $scope.upload($scope.file);
		//  });


        $scope.uploadFile = function() {
        	
        		var file = $scope.file;

        		var newfilename = $scope.doc.no + '_' + $scope.doc.name + '_' + $scope.doc.type;
        		var uploaddir = './uploads/' + $scope.user._id;
        		console.log(uploaddir);
        		$upload.upload({
					url: 'api/chemicaldoc/upload',
					method: 'POST',
					
					
					fields: {
						type: 	$scope.doc.type,
						name: 	$scope.doc.name,
						no: 	$scope.doc.no,
						filename: newfilename,
						dir:    uploaddir 
					},
					file: file

				}).progress(function(evt){
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					console.log(progressPercentage);
					// console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :'+ evt.file.name);
				}).success(function(data, status, headers, config){
					console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
				});
        	
        };


		

		// var promise = $scope.upload.then(success, error, progress);



		// Create new Chemicaldoc
		$scope.create = function() {
			// var fileExt = /\.[a-z]{0,6}/.exec($scope.fileName);
			// var newURL = 'modules/chemicaldocs/docs/' + $scope.user._id + '/' + this.no + '_' + this.name + fileExt[0]; 

			// console.log(newURL);

			var chemicaldoc = new Chemicaldocs({
				name: 		this.name,
				type: 		this.type,
				no: 		this.no,
				docURL: 	this.docURL
			});

			// Redirect after save
			chemicaldoc.$save(function(response) {
				// $location.path('chemicaldocs/' + response._id);


				// $scope.uploadDocument();
				// $scope.cancelUpload();

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Chemicaldoc
		$scope.remove = function( chemicaldoc ) {
			if ( chemicaldoc ) { chemicaldoc.$remove();

				for (var i in $scope.chemicaldocs ) {
					if ($scope.chemicaldocs [i] === chemicaldoc ) {
						$scope.chemicaldocs.splice(i, 1);
					}
				}
			} else {
				$scope.chemicaldoc.$remove(function() {
					$location.path('chemicaldocs');
				});
			}
		};

		// Update existing Chemicaldoc
		$scope.update = function() {
			var chemicaldoc = $scope.chemicaldoc ;

			chemicaldoc.$update(function() {
				$location.path('chemicaldocs/' + chemicaldoc._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Chemicaldocs
		$scope.find = function() {
			$scope.chemicaldocs = Chemicaldocs.query();
		};

		// Find existing Chemicaldoc
		$scope.findOne = function() {
			$scope.chemicaldoc = Chemicaldocs.get({ 
				chemicaldocId: $stateParams.chemicaldocId
			});
		};
	}
]);