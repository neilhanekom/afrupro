// 'use strict';

// module.exports = {
// 	client: {
// 		lib: {
// 			css: [
// 				'public/lib/bootstrap/dist/css/bootstrap.min.css',
// 				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
// 				'public/lib/angular-material/angular-material.min.css',
// 				'public/lib/font-awesome/css/font-awesome.min.css',
// 				'public/lib/font-awesome/fonts/fontawesome-webfont.svg',
// 				'public/lib/v-accordion/dist/v-accordion.min.css',
// 				'public/lib/animate.css/animate.min.css'
// 			],
// 			js: [
// 				'public/lib/angular/angular.min.js',
// 				'public/lib/angular-resource/angular-resource.min.js',
// 				'public/lib/angular-aria/angular-aria.min.js',
// 				'public/lib/angular-animate/angular-animate.min.js',
// 				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
// 				'public/lib/angular-ui-utils/ui-utils.min.js',
// 				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
// 				'public/lib/angular-file-upload/angular-file-upload.min.js',
// 				'public/lib/angular-material/angular-material.min.js',
// 				'public/lib/angular-svg-round-progressbar/build/roundProgress.min.js',
// 				'public/lib/v-accordion/dist/v-accordion.min.js',
// 				'public/lib/lodash/dist/lodash.min.js',
// 				'public/lib/angular-google-maps/dist/angular-google-maps.min.js',
// 				'public/lib/angular-material-icons/angular-material-icons.min.js',
// 				'public/lib/angular-messages/angular-messages.min.js'
// 			]
// 		},
// 		css: 'public/dist/application.min.css',
// 		js: 'public/dist/application.min.js'
// 	}
// };


// =================================================
'use strict';

module.exports = {
	client: {
		lib: {
			css: [
				// 'public/lib/bootstrap/dist/css/bootstrap.css',
				// 'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/angular-material/angular-material.css',
				'public/lib/font-awesome/css/font-awesome.css',
				'public/lib/font-awesome/fonts/fontawesome-webfont.svg',
				'public/lib/v-accordion/dist/v-accordion.css',
				'public/lib/animate.css/animate.css'

			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-aria/angular-aria.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-file-upload/angular-file-upload.js',
				'public/lib/angular-material/angular-material.js',
				'public/lib/angular-svg-round-progressbar/build/roundProgress.min.js',
				'public/lib/v-accordion/dist/v-accordion.js',
				'public/lib/lodash/dist/lodash.js',
				'public/lib/angular-google-maps/dist/angular-google-maps.js',
				'public/lib/angular-material-icons/angular-material-icons.js',
				'public/lib/angular-messages/angular-messages.js',
				'public/lib/ng-file-upload/angular-file-upload.min.js',
				'public/lib/ng-file-upload-shim/angular-file-upload-shim.min.js'
			],
			tests: ['public/lib/angular-mocks/angular-mocks.js']
		},
		css: [
			'modules/*/client/css/*.css'
		],
		less: [
			'modules/*/client/less/*.less'
		],
		sass: [
			'modules/*/client/scss/*.scss'
		],
		js: [
			'modules/core/client/app/config.js',
			'modules/core/client/app/init.js',
			'modules/*/client/*.js',
			'modules/*/client/**/*.js'
		],
		views: ['modules/*/client/views/**/*.html']
	},
	server: {
		allJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
		models: 'modules/*/server/models/**/*.js',
		routes: ['modules/*[!core]/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
		sockets: 'modules/*/server/sockets/**/*.js',
		config: 'modules/*/server/config/*.js',
		policies: 'modules/*/server/policies/*.js',
		views: 'modules/*/server/views/*.html'
	}
};
