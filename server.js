var http = require("http");
var fs = require("fs");
var queryString = require("querystring");
var url = require("url");
var mysql = require("mysql");

var con;


var httpServer = http.createServer(function(req,res){
    switch (url.parse(req.url).pathname){
        case "/" :
            writeDataToDatabase({
               nama : "arief1",
               alamat : "alamat1"
            });
            res.end();
            break;
        case "/delete" :
            deleteDataToDatabase("arief1");
            res.end();
            break;
        case "/update":
            updateDataToDatabase("arief1","Kota Sumsel");
            res.end();
            break;
        case "/select" :
            con.query("select * from node_js",function(err,results,fields){
               if(err) throw err;
               results.forEach(function(val){
                  console.log(val.nama + "||" + val.alamat);
               });
               res.end();
            });
            break;
    }
});

function deleteDataToDatabase(key){
    con.query("delete from node_js where nama = ?",[key],function(err,results){
       if(err) throw err;
       console.log("query delete executed");
    });
}
function updateDataToDatabase(key,newAlamat){
    con.query("update node_js set alamat = ? where nama = ? ",[newAlamat,key],function(err,results){
        if(err)throw err;
        console.log("query update executed");
    });
}
function writeDataToDatabase(data){
    con.query("insert into node_js values (?,?)",[data.nama,data.alamat],function(err,result){
        if(err)throw err;
        console.log("query insert executed");
    });
}



httpServer.listen(9600,"localhost",function(){
    con=mysql.createConnection({
       host : "localhost",
       user :"user",
       password : "password",
       database : "node_db"
    });
    con.connect(function(err){
       if(err) throw err;
       console.log("Connected to mysql database");
    });
});