const mongoose = require('mongoose');

module.exports = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to Mongo!');
        })
        .catch((err) => {
            console.error('Error connecting to Mongo', err);
        });
}

