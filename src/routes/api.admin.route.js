const express = require('express');
const router = express.Router();
const Admin = require("../dataaccess/model/Admin");

router.get("/", (req, res) => {
    Admin.find(function (err, docs) {
        if (err) {
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
    var username = req.body.username
    var password = req.body.password

    //Verificamos existan
    if (username === undefined || password === undefined) {
        res.status(400).json({
            "message": "Invalid body params"
        })
        return;
    }

    //Creamos un objeto estudiante
    var admin = new Admin({
        username: username,
        password: password
    });

    //Ejecutamos la funcion guardar y verificamos el resultado
    admin.save(function (err, doc) {
        if (err) {
            res.status(500).json({
                message: "Error al ejecutar save"
            })
            console.error(err);
            return;
        }
        res.json(doc);
    });
});

module.exports = router;