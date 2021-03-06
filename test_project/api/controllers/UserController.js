/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// localhost:1337/User/add
	add: function(req, res){
	//var new_user = {first_name: 'Derek',last_name : 'Jeter',org : 'NYY'};
	// User.create(new_user).exec(function(err, result){
	// 	if (err) {
	// 		sails.log.debug('Some error occured ' + err);
	// 		return res.json(500, { error: 'Some error occured' });
	// 	}
	// 	sails.log.debug('Success', JSON.stringify(result));
	// 	return res.json(200, { success: 'Success' });
	// });

	// check if first name or last name is valid
		if (req.body.first_name === "" || req.body.last_name === ""){
			console.log("First name or last name not valid");
			res.status(400).send({error: 'Must include a valid first name and last name'});
		}
		else{
			var userObjToCreate = new Object();
			userObjToCreate.first_name = req.body.first_name;
			userObjToCreate.last_name = req.body.last_name;
			userObjToCreate.org = req.body.org;

			console.log("req.body.first_name: " + userObjToCreate.first_name);
			console.log("req.body.last_name: " + userObjToCreate.last_name);
			console.log("req.body.org: " + userObjToCreate.org);

			var res_json = "Successfully added: "+userObjToCreate.first_name+" "+userObjToCreate.last_name +" to the database";
			console.log(res_json);

			User.create(userObjToCreate).exec(function(err, result){
				if (err) {
					sails.log.debug('Some error occured ' + err);
					return res.json(500, { error: 'Some error occured' });
				}
				sails.log.debug('Success, result: ', JSON.stringify(result));
				return res.json(200, { success: res_json });
			});
		}
	},

	// localhost:1337/User/remove will delete the user from the db
	remove: function(req, res){
		var first_name = req.body.first_name;
		sails.log("Try to remove user named " + first_name);
		var query = new Object();
		query.first_name = first_name;
		User.destroy(query).then(function(user) {
			if(user.length > 0) {
				console.log('Successfully removed the User.');
				//req.flash('success', 'Successfully removed the User.');
				//res.redirect('/console/teacher');
			} else {
				console.log('Could not remove the user.');
				//req.flash('error', 'Could not remove the user.');
				//res.redirect('/console/teacher');
			}
		}).catch(function (err) {
			console.log('Could not remove the user.');
			//req.flash('error', 'Could not remove the user.');
			//res.redirect('/console/teacher');
		});

	}

};
