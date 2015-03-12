'use strict';

// Core module config
angular.module('core').config(['$mdThemingProvider',
	function ($mdThemingProvider) {
		// Set the httpProvider "not authorized" interceptor
		$mdThemingProvider.definePalette('afruPrimary', {
			'50': 'FFF3E0',
		    '100': 'FFE0B2',
		    '200': 'FFCC80',
		    '300': 'FFB74D',
		    '400': 'FFA726',
		    '500': 'FF9800',
		    '600': 'FB8C00',
		    '700': 'F57C00',
		    '800': 'EF6C00',
		    '900': 'E65100',
		    'A100': 'FFD180',
		    'A200': 'FFAB40',
		    'A400': 'FF9100',
		    'A700': 'FF6D00',
		    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
		                                        // on this palette should be dark or light
		    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
		     '200', '300', '400', 'A100'],
		    'contrastLightColors': undefined    // could also specify this if default was 'dark'
		});

		$mdThemingProvider.definePalette('afruAccent', {
			'50': 'E8EAF6',
		    '100': 'C5CAE9',
		    '200': '9FA8DA',
		    '300': '7986CB',
		    '400': '5C6BC0',
		    '500': '3F51B5',
		    '600': '3949AB',
		    '700': 'F57C00',
		    '800': 'EF6C00',
		    '900': 'E65100',
		    'A100': 'FFD180',
		    'A200': 'FFAB40',
		    'A400': 'FF9100',
		    'A700': 'FF6D00',
		    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
		                                        // on this palette should be dark or light
		    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
		     '200', '300', '400', 'A100'],
		    'contrastLightColors': undefined    // could also specify this if default was 'dark'
		});

	    $mdThemingProvider.theme('default')
	    .primaryPalette('afruPrimary')
	    .accentPalette('indigo');
	}
]);