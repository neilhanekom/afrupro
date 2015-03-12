'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'avuxeni';

	var applicationModuleVendorDependencies = ['ngResource', 'ui.router', 'ngAnimate', 'ui.utils', 'angularFileUpload', 'ngMaterial', 'angular-svg-round-progress', 'vAccordion', 'uiGmapgoogle-maps', 'ngMdIcons', 'ngMessages', 'angularFileUpload'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
