/**
 * ActionController
 *
 * @description :: Server-side logic for managing Actions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  // localhost:1337/Action/add will add the var to the db
  add: function(req, res) {
      // check if first name or last name is valid
      var title = req.body.action_title;
      var date = req.body.due_date;
      var fn = req.body.first_name;
      var ln = req.body.last_name;

      if (title === "" || date === "") {
        console.log("Title field or due date is not valid");
        res.status(400).send({
          error: 'Must include a valid title and due date'
        });
      } else if (fn === "" || ln === "") {
        console.log("First name or last name not valid");
        res.status(400).send({
          error: 'Must include a valid first name and last name'
        });
      } else {
        async.waterfall([
          function(callback) {
            // find user by first name
            User.findOne({
              where: {
                first_name: fn
              }
            }).then(function(user) {
              callback(null, user);
            }).catch(function(err) {
              callback(err);
            });
          },
          function(user, callback) {
            if (user) {
              console.log("Got user id: " + user.id);
              var actionObjToCreate = new Object();
              actionObjToCreate.title = req.body.action_title;
              actionObjToCreate.due_date = req.body.due_date;
              actionObjToCreate.description = req.body.description;
              actionObjToCreate.user_id = user.id;

              var res_json = "Successfully added: " + actionObjToCreate.title + " action for " + user.first_name + " to the database";
              //console.log(res_json);
              console.log("title: " + actionObjToCreate.title);
              console.log("due date: " + actionObjToCreate.due_date);
              console.log("description: " + actionObjToCreate.description);

              Action.create(actionObjToCreate).exec(function(err, result) {
                if (err) {
                  sails.log.debug('Some error occured ' + err);
                  return res.json(500, {
                    error: 'Some error occured'
                  });
                }
                sails.log.debug('Success, result: ', JSON.stringify(result));
                return res.json(200, {
                  success: res_json
                });
              });
            } else {
              callback(err);
            }
          }
        ], function(err) {
          if (err) {
            //req.flash('error', 'Failed to login: server error. Please contact the admin.');
            //res.redirect('/console/login');
            console.log("error: failed to find user");
          }
        });
      }
    }, //end of add

		// localhost:1337/Action/remove will delete the action from the db
    remove: function(req, res) {
    var title = req.body.title;
    sails.log("Try to destroy action named " + title);
    var query = new Object();
    query.title = title;
    Action.destroy(query).then(function(action) {
      if (action.length > 0) {
        console.log('Successfully removed the action.');
        //req.flash('success', 'Successfully removed the User.');
        //res.redirect('/console/teacher');
				sails.log.debug('Success, ');
				return res.json(200, {
					success: 'Success'
				});
      } else {
        console.log('Could not find the action.');
        //req.flash('error', 'Could not remove the user.');
        //res.redirect('/console/teacher');
				sails.log.debug('Some error occured, could not find action');
				return res.json(500, { error: 'Some error occured, could not find action' });
      }
    }).catch(function(err) {
      console.log('Could not remove the action.');
			sails.log.debug('Some error occured ' + err);
			return res.json(500, { error: 'Some error occured' });
      //req.flash('error', 'Could not remove the user.');
      //res.redirect('/console/teacher');
    });

  }
};
