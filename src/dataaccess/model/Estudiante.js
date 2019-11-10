const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var EstudianteSchema = new Schema({
    matricula : {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellidos: {
        type: String,
        required: true,
        trim: true
    }
});

var Estudiante = mongoose.model('Estudiante', EstudianteSchema);
module.exports = Estudiante;