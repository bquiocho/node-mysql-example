/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    autoCreatedAt: false,
    autoUpdatedAt: false,
    connection: 'mysql_db',
    tableName : 'users',
    attributes: {
    id: {
      type: 'INTEGER',
      columnName: 'user_id',
      primaryKey: true,
      autoIncrement: true
    },
    first_name: 'STRING',
    last_name: 'STRING',
    org: 'STRING',
  }

}
};
