const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//set port no
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//mysql connect
const mysql = require('mysql');
var db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "userstories"
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

