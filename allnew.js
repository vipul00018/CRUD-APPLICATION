const express = require("express");
const app = express();
const mysql = require("mysql");
const port = 3000;

// configure
app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware
app.use(express.urlencoded({ extended: true }));

// routing
app.get("/", (req, res) => {
  res.render("insert");
});


// connection with sql
const con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "node",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connection is established");
});

app.post("/insert", function (req, res) {
  var TASK_NAME = req.body.TASK_NAME;
  var DESCRIPTION = req.body.DESCRIPTION;
  var TASK_PRIORITY = req.body.TASK_PRIORITY;
  var TASK_STATUS = req.body.TASK_STATUS;

  var sql = `INSERT INTO user (TASK_NAME, DESCRIPTION, TASK_PRIORITY, TASK_STATUS) VALUES ('${TASK_NAME}', '${DESCRIPTION}', '${TASK_PRIORITY}', '${TASK_STATUS}')`;
  con.query(sql, function (err, results) {
    if (err) throw err;
    res.send("Data is sent");
  });
});

app.get('/show',function(req,res){
   var sql = "select * from user" ;
   con.query(sql,function(err,result){
    if (err) throw err;
    res.render('show',{users:result});
   });
});

app.get('/delete/:TASK_NAME',function(req,res){

    var TASK_NAME = req.params.TASK_NAME;
    var sql =`delete from user where TASK_NAME='${TASK_NAME}'`;

    con.query(sql,function(err,result){
        if(err) throw err;
        res.redirect('/show');
    })

})



// create server
app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server is running on port", port);
});
