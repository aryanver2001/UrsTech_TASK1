const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/UrsTech");

const userSchema = mongoose.Schema({
    contact_id: String,
    first_name: String,
    last_name: String,
    email: String,
    mobile_number: String,
    data_store: String
})

module.exports = mongoose.model('user',userSchema);