const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/desarrolloapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

module.exports = mongoose;