const express = require('express');
const router = express.Router();
const OnlyAdminMW = require("../middleware/OnlyAdminMW");
const Estudiante = require("../dataaccess/model/Estudiante");

router.use(OnlyAdminMW)

router.get("/", (req, res) => {
    Estudiante.find(function(err, docs){
        if(err){
            res.status(500).json({
                "message": "Hubo un error al ejecutar la consulta"
            })
            console.error(err);
            return;
        }

        res.json(docs);
    });
});

router.post("/", (req, res) => {
    //recuperamos las variables de cuerpo de la peticion
    var matricula = req.body.matricula
    var nombre = req.body.nombre
    var apellidos = req.body.apellidos


    //Verificamos existan
    if (matricula === undefined || nombre === undefined || apellidos === undefined){
        res.status(400).json({
            "message": "Invalid body params"
        })
        return;
    }

    //Creamos un objeto estudiante
    var estudiante  = new Estudiante({
        matricula: matricula,
        nombre: nombre,
        apellidos: apellidos
    });

    //Ejecutamos la funcion guardar y verificamos el resultado
    estudiante.save(function (err, doc) {
        if(err){
            res.status(500).json({
                message: "Error al ejecutar save"
            })
            console.error(err);
            return;
        }
        res.json(doc);
    });
});

router.put("/:id", (req, res) => {
    //Recuperamos el ID de la URL
    var jsonId = req.params.id;
    //recuperamos las variables de cuerpo de la peticion
    var username = req.body.username
    var password = req.body.password

    //Verificamos existan
    if (username === undefined || password === undefined) {
        res.status(400).json({
            "message": "Invalid body params"
        })
        return;
    }

    Estudiante.findOneAndUpdate({
        _id: jsonId
    }, {
        username : username,
        password : password
    }, function(err, doc){
        if (err) {
            res.status(500).json({
                message: "Error al ejecutar update"
            })
            console.error(err);
            return;
        }
        res.json(doc);
    });
});

router.delete("/:id", (req, res) => {
    //Recuperamos el ID de la URL
    var jsonId = req.params.id;

    Estudiante.findOneAndDelete({
        _id: jsonId
    }, function (err, doc){
        if (err) {
            res.status(500).json({
                message: "Error al ejecutar delete"
            })
            console.error(err);
            return;
        }
        res.json(doc);
    });
});

module.exports = router;