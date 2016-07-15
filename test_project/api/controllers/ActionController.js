/**
 * ActionController
 *
 * @description :: Server-side logic for managing Actions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// localhost:1337/Action/add will add the var to the db
	add: function(req, res){
	//var new_action = {title: 'New Temp Action',due_date : '1994-07-22',description : 'This is a ' +
	//'temporary action that was added...', user_id:3};

	Action.create(new_action).exec(function(err, result){
		if (err) {
			sails.log.debug('Some error occured ' + err);
			return res.json(500, { error: 'Some error occured' });
		}
		sails.log.debug('Success', JSON.stringify(result));
		return res.json(200, { success: 'Success' });
	});
}
};
