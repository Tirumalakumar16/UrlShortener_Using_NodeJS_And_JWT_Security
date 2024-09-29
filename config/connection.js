const mongoDB = require('mongoose');


async function connectMongoDb() {
    return mongoDB.connect('mongodb://127.0.0.1:27017/URL')
}


module.exports = {
    connectMongoDb,
}