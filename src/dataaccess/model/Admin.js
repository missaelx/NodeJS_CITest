const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var AdminSchema = new Schema({
    username: {
        required: true,
        type: String,
        trim: true,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
})

var Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;