const { response, request } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get('/file', verifyToken, (require, response) => {
    jwt.verify(require.token, 'secretKey', (err, authData) => {
        if(err){
            response.sendStatus(403)
        }else{
            response.json({
                msj: "no-so-secret",
                authData
            })
        }
    });
});

app.post('/file/secret', (require, response) => {
    const user = {id: 1}
    const token = jwt.sign({user}, 'secretKey')
        response.json({
            token
        })
});

//Authorization: Bearer <token>
function verifyToken(require, response, next){
    const bearerHeader = require.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        require.token = bearerToken;
        next();
    }else{
        response.sendStatus(403)
    }
}

app.listen(3000, function(){
    console.log("node.js app running..."); 
});