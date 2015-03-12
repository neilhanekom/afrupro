'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	fs = require('fs-extra'),
	path = require('path'),
	mongoose = require('mongoose'),
	Chemicaldoc = mongoose.model('Chemicaldoc'),

	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/**
 * Create a Chemicaldoc
 */
exports.create = function(req, res) {

	
	
	// var chemicaldoc = new Chemicaldoc(req.body);
	// 	chemicaldoc.user = req.user;


	// chemicaldoc.save(function(err) {
	// 	if (err) {
	// 		return res.status(400).send({
	// 			message: errorHandler.getErrorMessage(err)
	// 		});
	// 	} else {
	// 		res.jsonp();
	// 	}
	// });
};


exports.uploadDoc = function(req, res) {

	    var user = req.user;
	   	var userDir = './uploads/' + user._id;
	   	var docsDir = userDir + '/docs';
	   	
		fs.stat(userDir, function(err, stats) {
			if (err) {
				createIdDir(userDir);

			} else {
				setTimeout(function() {  
				fs.writeFile(userDir + '/docs' + '/' + req.body.filename + '.' + req.files.file.extension, req.files.file.buffer, function (err) {
								if (err) {
					 				console.log(err);
								} else {
									req.body.dir = './uploads/' + user._id + '/docs';
									var chemicaldoc = new Chemicaldoc(req.body);

									chemicaldoc.save(function(err) {
										if (err) {
											return res.status(400).send({
												message: errorHandler.getErrorMessage(err)
											});
										} else {
											res.jsonp(chemicaldoc);
										}
									});
								}
				});
				}, 2000);
			}
		});
			
		

		var createIdDir = function(path) {
			fs.mkdir(path, function(err) {
				if (err) {
					console.log(err);
				} else {
					createSubDir('docs');
					createSubDir('images'); 
				}
			});
		};

		var createSubDir = function(name) {
			var subpath = userDir + '/' + name;
			fs.mkdir(subpath, function(err) {
				if (err) {
					console.log(err);
				} else {
					console.log('sub directory created : ' + name);
				}
			});
		};


	

	

	// var chemicaldoc = new Chemicaldoc(req.body);
	// 	chemicaldoc.user = req.user;


	// chemicaldoc.save(function(err) {
	// 	if (err) {
	// 		return res.status(400).send({
	// 			message: errorHandler.getErrorMessage(err)
	// 		});
	// 	} else {
	// 		res.jsonp();
	// 	}
	// });


	// fs.readdir('./modules/chemicaldocs/client/docs' + '/' + user._id, function(err, files) {
	// 	if (err) {
	// 		fs.mkdir('./modules/chemicaldocs/client/docs' + '/' + user._id, function() {
	// 		 makeFile()
	// 		});
	// 	} else {

	// 	}
	// });

	// var makeFile = function() {

	
	// if (user) {
	// 	fs.writeFile('./modules/chemicaldocs/client/docs/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
	// 		if (uploadError) {
	// 			return res.status(400).send({
	// 				message: 'Error occurred while uploading profile picture'
	// 			});
	// 		} else {
	// 			user.profileImageURL = 'modules/users/img/profile/uploads/' + req.files.file.name;

	// 			user.save(function (saveError) {
	// 				if (saveError) {
	// 					return res.status(400).send({
	// 						message: errorHandler.getErrorMessage(saveError)
	// 					});
	// 				} else {
	// 					req.login(user, function (err) {
	// 						if (err) {
	// 							res.status(400).send(err);
	// 						} else {
	// 							res.json(user);
	// 						}
	// 					});
	// 				}
	// 			});
	// 		}
	// 	});
	// } else {
	// 	res.status(400).send({
	// 		message: 'User is not signed in'
	// 	});
	// }
};

/**
 * Show the current Chemicaldoc
 */
exports.read = function(req, res) {
	res.jsonp(req.chemicaldoc);
};

/**
 * Update a Chemicaldoc
 */
exports.update = function(req, res) {
	var chemicaldoc = req.chemicaldoc ;

	chemicaldoc = _.extend(chemicaldoc , req.body);

	chemicaldoc.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(chemicaldoc);
		}
	});
};

/**
 * Delete an Chemicaldoc
 */
exports.delete = function(req, res) {
	var chemicaldoc = req.chemicaldoc ;

	chemicaldoc.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(chemicaldoc);
		}
	});
};

/**
 * List of Chemicaldocs
 */
exports.list = function(req, res) { Chemicaldoc.find().sort('-created').populate('user', 'displayName').exec(function(err, chemicaldocs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(chemicaldocs);
		}
	});
};

/**
 * Chemicaldoc middleware
 */
exports.chemicaldocByID = function(req, res, next, id) { Chemicaldoc.findById(id).populate('user', 'displayName').exec(function(err, chemicaldoc) {
		if (err) return next(err);
		if (! chemicaldoc) return next(new Error('Failed to load Chemicaldoc ' + id));
		req.chemicaldoc = chemicaldoc ;
		next();
	});
};