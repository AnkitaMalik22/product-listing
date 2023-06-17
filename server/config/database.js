const mongoose = require('mongoose');

const database = () => {   
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Database connected!'))
    .catch(err => console.log(err));

 
}

module.exports = database;