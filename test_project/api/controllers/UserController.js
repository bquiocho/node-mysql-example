/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// User/add will add the var to the db
	add: function(req, res){
	var new_user = {first_name: 'Cookie',last_name : 'monster',org : 'YUM'};

	User.create(new_user).exec(function(err, result){
		if (err) {
			sails.log.debug('Some error occured ' + err);
			return res.json(500, { error: 'Some error occured' });
		}
		sails.log.debug('Success', JSON.stringify(result));
		return res.json(200, { success: 'Success' });
	});
}

};
