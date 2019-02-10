const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//set port no
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//mysql connect
//mysql://b707a0f5755ac2:0fee9df8@us-cdbr-iron-east-03.cleardb.net/heroku_a00ac536a4451ad?reconnect=true
const mysql = require('mysql');
var db = mysql.createConnection({
    host : "us-cdbr-iron-east-03.cleardb.net",
    user : "b707a0f5755ac2",
    password : "0fee9df8",
    database : "heroku_a00ac536a4451ad"
})
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log("MY SQL connected..");
});
//cal routes
require('./app/routes') (app, db);
app.listen(port, () => {
    console.log("We are live on " + port);
})

