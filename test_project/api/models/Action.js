/**
 * Action.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    autoCreatedAt: false,
    autoUpdatedAt: false,
    connection: 'mysql_db',
    tableName : 'actions',
    attributes: {

    action_id:{
      type: 'INTEGER',
      primaryKey: true,
      unique: true
    },
    title: 'STRING',
    due_date: 'DATE',
    description: 'STRING',
    user_id: {
      model: 'User'
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  }

};
