const express = require('express');
const router = express.Router();
const estudianteRouter = require("./api.estudiante.route");
const adminRouter = require("./api.admin.route");
const Admin = require("../dataaccess/model/Admin");
const jwt = require("jsonwebtoken");
const config = require("../config");

router.use("/Estudiante", estudianteRouter);
router.use("/Admin", adminRouter);

router.get("/ping", (req, res) => {
    res.json({
        message: "pong"
    });
})

router.post("/login", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
        res.status(400).json({
            message: "Invalid body params"
        })
        return
    }

    Admin.findOne({
        username: username,
        password: password
    }, function (err, doc) {
        if (err) {
            res.status(500).json({
                message: "Error en la BD"
            })
            console.error(err)
            return
        }
        if (doc) {
            var tokenPayload = {
                _id: doc._id,
                username: doc.username
            }

            var token = jwt.sign(tokenPayload, config.TOKEN_SECRET, {
                expiresIn: 60 * 60 * 24 * 7 // Expira en una semana
            })

            res.json({
                token: token
            })

        } else {
            res.status(401).json({
                message: "Username not found"
            });
        }
    })

});

module.exports = router;