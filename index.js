const bodyparser = require("body-parser");

const express = require("express");
const app = express();

const fs = require("fs");

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
    database: "controle_avisos",
    multipleStatements: true
});
connection.connect(function (err) {
    if (err) {
        console.error("Erro ao conectar ao DB: ", err.stack);
    } else {
        console.error("Conectado ao db");
    }
});

path = require('path')
multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({ storage: storage });


//adicionar mudanca
app.post('/uploadCartaMudanca', upload.single('cartaMudanca'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        res.redirect("/");
    } else {
        console.log('file received');
        connection.query("insert into carta_mudanca (nome, procedencia, nomearquivo, tipoarquivo, tamanhoarquivo) values(?,?,?,?,?)", [req.body.nomeMudanca, req.body.procedenciaMudanca, req.file.filename, req.file.mimetype, req.file.size], function (err, result) {
            console.log('inserted data');
        });
        res.redirect("/");

    }
});
//adicionar visitante
app.post("/add-visitante", function (req, res) {
    connection.query("insert into visitantes (nome, procedencia, convidante) values (?,?,?)", [req.body.nome, req.body.procedencia, req.body.convidante], function (err) {
        if (err) {
            console.log("Erro ao inserir" + err.stack);
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    });
});
//adicionar aviso geral
app.post("/add-avisoGeral", function (req, res) {
    connection.query("insert into avisos_gerais (aviso, avisador) values (?,?)", [req.body.avisoGeral, req.body.avisanteGeral], function (err) {
        if (err) {
            console.log("Erro nao inserir" + err.stack);
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    });
});


//deletar visitante
app.get("/del-visitante/:id", function (req, res) {
    connection.query("delete from visitantes where id=?; SET @count = 0; UPDATE `visitantes` SET `visitantes`.`id` = @count:= @count + 1", [req.params.id]);
    res.redirect("/");
});
//deletar aviso geral
app.get("/del-avisoGeral/:id", function (req, res) {
    connection.query("delete from avisos_gerais where id=?; SET @count = 0; UPDATE `avisos_gerais` SET `avisos_gerais`.`id` = @count:= @count + 1", [req.params.id]);
    res.redirect("/");
});
//deletar mudanca
app.get("/del-mudanca/:id", function (req, res) {
    connection.query("select * from carta_mudanca where id=?", [req.params.id], function (err, result) {
        if (err) {
            console.log('erro select from carta_mudanca no delete');
        } else {
            fs.unlink(__dirname + "/uploads/" + result[0].nomearquivo, function (err) {
                if (err) {
                    console.log("Erro ao deletar carta de mudança" + err)
                }
            }); 
        }
    });
    connection.query("delete from carta_mudanca where id=?; SET @count = 0; UPDATE `carta_mudanca` SET `carta_mudanca`.`id` = @count:= @count + 1", [req.params.id], function (err) {
        if (err) {
            console.log('erro delete from carta_mudanca');
        }
    });
    res.redirect("/");
});


//visualizar mudanca
app.get("/viewmudanca/:id", function (req, res) {
    connection.query("select * from carta_mudanca where id=?", [req.params.id], function (err, result) {
        if (err) {
            console.log('erro select from carta_mudanca');
        } else {
            res.sendFile(__dirname + "/uploads/" + result[0].nomearquivo);
        }
    });
});


//marcar como apresentado mudanca
app.get("/up-mudanca/:id", function (req, res) {

    connection.query("update carta_mudanca set apresentado = ? where id= ?", [1, req.params.id], function (err, results) {
        if (err) {
            console.log("erro update mudanca " + err.stack)
        } else {
            console.log('changed ' + results.changedRows + ' rows');
            res.redirect("/");
        };
    });
});
//Marcar como Apresentado Visitante
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
//Marcar como Apresentado Aviso geral
app.get("/up-avisoGeral/:id", function (req, res) {

    connection.query("update avisos_gerais set apresentado = ? where id= ?", [1, req.params.id], function (err, results) {
        if (err) {
            console.log("erro update avisos_gerais " + err.stack)
        } else {
            console.log('changed ' + results.changedRows + ' rows');
            res.redirect("/");
        };
    });
});


//background tela
app.get("/bgGT", function (rec, res) {
    res.sendFile(__dirname + "/views/Style/bg.png");
});


//pag inicial
app.get("/", function (req, res) {
    connection.query("select * from visitantes", function (err, results) {
        if (err) {
            console.log("erro select visitantes " + err);
        } else {
            connection.query("select * from avisos_gerais", function (err, results1) {
                if (err) {
                    console.log("erro select avisos_gerais " + err);
                } else {
                    connection.query("select * from carta_mudanca", function (err, results2) {
                        if (err) {
                            console.log("erro select from carta_mudanca");
                        } else {
                            res.render("home", { visitantes: results, avisoGeral: results1, mudanca: results2 });
                        }
                    });
                }
            });
        }
    });
});


app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});