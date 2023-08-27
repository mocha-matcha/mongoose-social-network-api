const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/user_db');

module.exports = connection;
