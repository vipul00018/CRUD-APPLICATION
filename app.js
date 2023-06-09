const express = require("express");
const app = express();
const mysql = require("mysql");
const port = 3000

// configure
app.set("view engine","ejs");
app.set("views","./views")

// routing
 app.get("/",(req,res)=>{
    res.render("insert");

});
const con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password:"admin",
    database: "node",
    port:"3000",
});

con.connect((err)=>{
    if (err) throw err;
    console.log("connection is established")
}) 

app.post('/insert',function(req,res){
var TASK_NAME = req.body.TASK_NAME;
var DESCRIPTION =req.body.DESCRIPTION;
var TASK_PRIORITY = req.body.TASK_PRIORITY;
var  TASK_STATUS = req.body.TASK_STATUS;

var sql = `insert into user(TASK_NAME,DESCRIPTION,TASK_PRIORITY,) values('${TASK_NAME}','${DESCRIPTION}','${TASK_PRIORITY}','${TASK_STATUS}') `;
con.query(sql,function(err,results){
    if(err) throw err;
    res.send("data is sent")
})
})

/// create server
app.listen(port,(err)=>{
    if(err)
    throw err
    else
    console.log("server is running",port);
});