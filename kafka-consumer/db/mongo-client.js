const MongoClient = require('mongodb').MongoClient;
const url = process.env.NODE_ENV === 'production' ?
    'mongodb://192.168.99.100:27018/todos' :
    'mongodb://192.168.99.100:27018/todos';

module.exports = (cb) => MongoClient.connect(url, (err, db) => {
    if (err) {
        console.log(err);
    } else {
        cb(db);
    }
});
