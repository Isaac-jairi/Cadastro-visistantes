const bodyparser = require("body-parser");

const express = require("express");
const app = express();

var inverte;

const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
app.use(bodyparser.urlencoded({ extended: false }));
app.set("view engine", "handlebars")
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "isaac",
    password: "isaac18024089",
    database: "controle_avisos"
});
connection.connect(function (err) {
    if (err) {
        console.error("Erro ao conectar ao DB: ", err.stack);
    } else {
        console.error("Conectado ao db");
    }
});

app.post("/add-visitante", function (req, res) {
    connection.query("insert into visitantes (nome, procedencia) values (?,?)", [req.body.nome, req.body.procedencia], function (err) {
        if (err) {
            console.log("Erro nao inserir" + err.stack);
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    });

});


app.get("/del-visitante/:id", function (req, res) {
    connection.query("delete from visitantes where id=?", [req.params.id]);
    res.redirect("/");
});

app.get("/", function (req, res) {
    connection.query("select * from visitantes", function (err, results) {
        if (err) {
            console.log("erro select visitantes " + err)
        } else {
            res.render("home", { visitantes: results });
        }

    });
});

app.get("/up-visitante/:id", function (req, res) {
    
    connection.query("update visitantes set apresentado = ? where id= ?", [1, req.params.id], function (err, results) {
        if (err) {
            console.log("erro update visitantes " + err.stack)
        } else {
            console.log('changed ' + results.changedRows + ' rows');
            res.redirect("/");
        };
    });
});

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000: http://localhost:3000");
});