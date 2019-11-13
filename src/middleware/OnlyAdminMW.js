var jwt = require("jsonwebtoken")
var config = require("../config");
const token_secret = config.TOKEN_SECRET;

function OnlyAdminMW(req, res, next){
    //var token = req.headers["authorization"]
    var token = req.headers.authorization
    if(!token){
        res.status(401).json({
            "message": "Token is needed"
        })
    }
    token = token.replace("Bearer ", "");

    jwt.verify(token, token_secret, function(err, payload){
        if(err){
            console.error(err)
            res.status(500).json({
                "message": "Error al decodificar token"
            });
        } else {
            req.user = payload
            next()
        }
    });
}

module.exports = OnlyAdminMW