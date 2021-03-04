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


//pag inicial
app.get("/", function (req, res) {
    connection.query("select * from visitantes", function (err, results) {
        if (err) {
            console.log("erro select visitantes " + err);
        } else {
            connection.query("select * from avisos_gerais", function (err1, results1) {
                if (err1) {
                    console.log("erro select avisos_gerais " + err1);
                } else {
                    connection.query("select * from carta_mudanca", function (err2, results2) {
                        if (err2) {
                            console.log("erro select from carta_mudanca"+ err2);
                        } else {
                            connection.query("select * from pedido_oracao", function (err3, results3) {
                                if (err3) {
                                    console.log("erro select from pedido_oracao"+ err3);
                                } else {
                                    connection.query("select * from aniversariantes", function (err4, results4) {
                                        if (err4) {
                                            console.log("erro select from aniversariantes"+ err4);
                                        } else {
                                            connection.query("select * from pedido_oportunidade", function (err5, results5) {
                                                if (err4) {
                                                    console.log("erro select from pedido_oportunidade"+ err5);
                                                } else {
                                                    connection.query("select * from carta_recomendacao", function (err6, results6) {
                                                        if (err4) {
                                                            console.log("erro select from carta_recomendacao"+ err6);
                                                        } else {
                                                            connection.query("select * from comunicado_especial", function (err7, results7) {
                                                                if (err4) {
                                                                    console.log("erro select from comunicado_especial"+ err7);
                                                                } else {
                                                                    res.render("home", { 
                                                                        visitantes:     results,
                                                                        avisoGeral:     results1,
                                                                        mudanca:        results2,
                                                                        oracao:         results3,
                                                                        aniversariante: results4,
                                                                        oportunidade:   results5,
                                                                        recomendacao:   results6,
                                                                        comunicado:     results7
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});


//adicionar Carta de Recomendação
app.post('/uploadCartaRecomendacao', upload.single('cartaRecomendacao'), function (req, res) {
    if (!req.file) {
        console.log("Carta de Recomendação nao recebida");
        res.redirect("/");
    } else {
        console.log('Carta de Recomendação recebida');
        connection.query("insert into carta_recomendacao (nome, procedencia, nomearquivo, tipoarquivo, tamanhoarquivo) values(?,?,?,?,?)", [req.body.nomeRecomendacao, req.body.procedenciaRecomendacao, req.file.filename, req.file.mimetype, req.file.size], function (err, result) {
            if (err) {
                console.log("Erro ao inserir carta de Recomendação " + err)
                res.redirect("/");
            }else{
                console.log('Carta Recomendação adicionada ao BD');
            }
            
        });
        res.redirect("/");
    }
});
//adicionar Carta de Mudanca
app.post('/uploadCartaMudanca', upload.single('cartaMudanca'), function (req, res) {
    if (!req.file) {
        console.log("Carta de Mudanca nao recebida");
        res.redirect("/");
    } else {
        console.log('Carta de Mudanca recebida');
        connection.query("insert into carta_mudanca (nome, procedencia, nomearquivo, tipoarquivo, tamanhoarquivo) values(?,?,?,?,?)", [req.body.nomeMudanca, req.body.procedenciaMudanca, req.file.filename, req.file.mimetype, req.file.size], function (err, result) {
            if (err) {
                console.log("Erro ao inserir carta de Mudanca " + err)
                res.redirect("/");
            }else{
                console.log('Carta Mudanca adicionada ao BD');
            }
        });
        res.redirect("/");
        console.log("Adicionado Carta de Mudanca")
    }
});
//adicionar visitante
app.post("/add-visitante", function (req, res) {
    connection.query("insert into visitantes (nome, procedencia, convidante) values (?,?,?)", [req.body.nome, req.body.procedencia, req.body.convidante], function (err) {
        if (err) {
            console.log("Erro ao inserir" + err.stack);
            res.redirect("/");
        } else {
            console.log("Adicionado visitante")
            res.redirect("/");
        }
    });
});
//adicionar Aniversariante
app.post("/add-aniversariante", function (req, res) {
    connection.query("insert into aniversariantes (nomeAniversariante, dataAniversario, felicitador, observacao) values (?,?,?,?)", [req.body.nomeAniversariante, req.body.dataAniversario, req.body.felicitador, req.body.observacao], function (err) {
        if (err) {
            console.log("Erro ao inserir" + err.stack);
            res.redirect("/");
        } else {
            console.log("Adicionado Aniversariante")
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
            console.log("Adicionado aviso geral")
            res.redirect("/");
        }
    });
});
//Adicionar Pedido De Oração
app.post("/add-PedidoOracao", function (req, res) {
    connection.query("SET @count = 0; UPDATE `pedido_oracao` SET `pedido_oracao`.`id` = @count:= @count + 1; insert into pedido_oracao (nomePedinte, nomeFavorecido, observacoes) values (?,?,?)", [req.body.nomePedinte, req.body.nomeFavorecido, req.body.observacoes], function (err) {
        if (err) {
            console.log("Erro ao inserir" + err.stack);
            res.redirect("/");
        } else {
            console.log("Adicionado Pedido De Oração")
            res.redirect("/");
        }
    });
});
//Adicionar Pedido de Oportunidade
app.post("/add-PedidoOportunidade", function (req, res) {
    connection.query("SET @count = 0; UPDATE `pedido_oportunidade` SET `pedido_oportunidade`.`id` = @count:= @count + 1; insert into pedido_oportunidade (nomePedinte, oportunidade, observacoes) values (?,?,?)", [req.body.nomePedinte, req.body.oportunidade, req.body.observacoes], function (err) {
        if (err) {
            console.log("Erro ao inserir Pedido de Oportunidade " + err.stack);
            res.redirect("/");
        } else {
            console.log("Adicionado Pedido de Oportunidade")
            res.redirect("/");
        }
    });
});
//adicionar Comunicado Especial
app.post("/add-comunicado", function (req, res) {
    connection.query("insert into comunicado_especial (comunicado, remetente, destinatario) values (?,?,?)", [req.body.comunicado, req.body.remetente, req.body.destinatario], function (err) {
        if (err) {
            console.log("Erro ao inserir Comunicado Especial " + err.stack);
            res.redirect("/");
        } else {
            console.log("Adicionado Comunicado Especial ")
            res.redirect("/");
        }
    });
});

//deletar Comunicado Especial
app.get("/del-comunicado/:id", function (req, res) {
    connection.query("delete from comunicado_especial where id=?; SET @count = 0; UPDATE `comunicado_especial` SET `comunicado_especial`.`id` = @count:= @count + 1;", [req.params.id]);
    res.redirect("/");
    console.log("Deletado Comunicado Especial id: " + req.params.id)
});

//deletar Pedido de Oportunidade
app.get("/del-PedidoOportunidade/:id", function (req, res) {
    connection.query("delete from pedido_oportunidade where id=?; SET @count = 0; UPDATE `pedido_oportunidade` SET `pedido_oportunidade`.`id` = @count:= @count + 1;", [req.params.id]);
    res.redirect("/");
    console.log("Deletado Pedido de Oportunidade id: " + req.params.id)
});
//deletar Aniversariante
app.get("/del-aniversariante/:id", function (req, res) {
    connection.query("delete from aniversariantes where id=?; SET @count = 0; UPDATE `aniversariantes` SET `aniversariantes`.`id` = @count:= @count + 1;", [req.params.id]);
    res.redirect("/");
    console.log("Deletado Aniversariante id: " + req.params.id)
});
//deletar Pedido De Oração
app.get("/del-pedidoOracao/:id", function (req, res) {
    connection.query("delete from pedido_oracao where id=?; SET @count = 0; UPDATE `pedido_oracao` SET `pedido_oracao`.`id` = @count:= @count + 1;", [req.params.id]);
    res.redirect("/");
    console.log("Deletado Pedido De Oração id: " + req.params.id)
});
//deletar visitante
app.get("/del-visitante/:id", function (req, res) {
    connection.query("delete from visitantes where id=?; SET @count = 0; UPDATE `visitantes` SET `visitantes`.`id` = @count:= @count + 1;", [req.params.id]);
    res.redirect("/");
    console.log("Deletado visitante id: " + req.params.id)
});
//deletar aviso geral
app.get("/del-avisoGeral/:id", function (req, res) {
    connection.query("delete from avisos_gerais where id=?; SET @count = 0; UPDATE `avisos_gerais` SET `avisos_gerais`.`id` = @count:= @count + 1;", [req.params.id]);
    res.redirect("/");
    console.log("Deletado aviso geral id: " + req.params.id)
});
//deletar Carta de Mudanca
app.get("/del-mudanca/:id", function (req, res) {
    connection.query("select * from carta_mudanca where id=?", [req.params.id], function (err, result) {
        if (err) {
            console.log('erro select from carta_mudanca no delete');
        } else {
            fs.unlink(__dirname + "/uploads/" + result[0].nomearquivo, function (err) {
                if (err) {
                    console.log("Erro ao deletar carta de mudança" + err)
                    res.redirect("/");
                }
            }); 
        }
    });
    connection.query("delete from carta_mudanca where id=?; SET @count = 0; UPDATE `carta_mudanca` SET `carta_mudanca`.`id` = @count:= @count + 1;", [req.params.id], function (err) {
        if (err) {
            console.log('erro delete from carta_mudanca');
            res.redirect("/");
        }
    });
    console.log("Deletada Carta de Mudanca id: " + req.params.id)
    res.redirect("/");
});
//deletar Carta de Recomendação
app.get("/del-recomendacao/:id", function (req, res) {
    connection.query("select * from carta_recomendacao where id=?", [req.params.id], function (err, result) {
        if (err) {
            console.log('erro select from carta_recomendacao no delete' + err);
            res.redirect("/");
        } else {
            fs.unlink(__dirname + "/uploads/" + result[0].nomearquivo, function (err) {
                if (err) {
                    console.log("Erro ao deletar carta de mudança" + err)
                    res.redirect("/");
                }
            }); 
        }
    });
    connection.query("delete from carta_recomendacao where id=?; SET @count = 0; UPDATE `carta_recomendacao` SET `carta_recomendacao`.`id` = @count:= @count + 1;", [req.params.id], function (err) {
        if (err) {
            console.log('erro delete from carta_recomendacao'+ err);
            res.redirect("/");
        }
    });
    console.log("Deletada Carta de Recomendação id: " + req.params.id)
    res.redirect("/");
});


//visualizar Carta de Mudanca
app.get("/view-mudanca/:id", function (req, res) {
    connection.query("select * from carta_mudanca where id=?", [req.params.id], function (err, result) {
        if (err) {
            console.log('erro select from carta_mudanca');
            res.redirect("/");
        } else {
            console.log("Visualizar Carta de Mudanca id: " + req.params.id)
            res.sendFile(__dirname + "/uploads/" + result[0].nomearquivo);
        }
    });
});
//visualizar Carta de Recomendação
app.get("/view-recomendacao/:id", function (req, res) {
    connection.query("select * from carta_recomendacao where id=?", [req.params.id], function (err, result) {
        if (err) {
            console.log('erro select from carta_recomendacao ' + err);
            res.redirect("/");
        } else {
            console.log("Visualizar Carta de Recomendação id: " + req.params.id)
            res.sendFile(__dirname + "/uploads/" + result[0].nomearquivo);
        }
    });
});

//Marcar como Apresentado Comunicado Especial
app.get("/up-comunicado/:id", function (req, res) {
    connection.query("update comunicado_especial set apresentado = ? where id= ?", [1, req.params.id], function (err, results) {
        if (err) {
            console.log("erro update Comunicado Especial " + err.stack)
            res.redirect("/");
        } else {
            console.log("Apresentado Comunicado Especial id: " + req.params.id)
            res.redirect("/");
        };
    });
});
//Marcar como Apresentado Pedido de Oportunidade
app.get("/up-PedidoOportunidade/:id", function (req, res) {
    connection.query("update pedido_oportunidade set apresentado = ? where id= ?", [1, req.params.id], function (err, results) {
        if (err) {
            console.log("erro update Pedido de Oportunidade " + err.stack)
            res.redirect("/");
        } else {
            console.log("Apresentado Pedido de Oportunidade id: " + req.params.id)
            res.redirect("/");
        };
    });
});
//Marcar como Apresentada Carta de Mudanca
app.get("/up-mudanca/:id", function (req, res) {

    connection.query("update carta_mudanca set apresentado = ? where id= ?", [1, req.params.id], function (err, results) {
        if (err) {
            console.log("erro update mudanca " + err.stack)
            res.redirect("/");
        } else {
            console.log("Apresentada Carta de Mudanca id: " + req.params.id)
            res.redirect("/");
        };
    });
});
//Marcar como Apresentada Carta de Recomendação
app.get("/up-recomendacao/:id", function (req, res) {

    connection.query("update carta_recomendacao set apresentado = ? where id= ?", [1, req.params.id], function (err, results) {
        if (err) {
            console.log("erro update Recomendação " + err.stack)
            res.redirect("/");
        } else {
            console.log("Apresentada Carta de Recomendação id: " + req.params.id)
            res.redirect("/");
        };
    });
});
//Marcar como Apresentado Visitante
app.get("/up-visitante/:id", function (req, res) {

    connection.query("update visitantes set apresentado = ? where id= ?", [1, req.params.id], function (err, results) {
        if (err) {
            console.log("erro update visitantes " + err.stack)
            res.redirect("/");
        } else {
            console.log("Apresentado Visitante id: " + req.params.id)
            res.redirect("/");
        };
    });
});
//Marcar como Apresentado Aniversariante
app.get("/up-aniversariante/:id", function (req, res) {

    connection.query("update aniversariantes set apresentado = ? where id= ?", [1, req.params.id], function (err, results) {
        if (err) {
            console.log("erro update Aniversariante " + err.stack)
            res.redirect("/");
        } else {
            console.log("Apresentado Aniversariante id: " + req.params.id)
            res.redirect("/");
        };
    });
});
//Marcar como Apresentado Aviso geral
app.get("/up-avisoGeral/:id", function (req, res) {

    connection.query("update avisos_gerais set apresentado = ? where id= ?", [1, req.params.id], function (err, results) {
        if (err) {
            console.log("erro update avisos_gerais " + err.stack)
            res.redirect("/");
        } else {
            console.log("Apresentado Aviso geral id: " + req.params.id)
            res.redirect("/");
        };
    });
});
//Marcar como Apresentado pedido de Oração
app.get("/up-pedidoOracao/:id", function (req, res) {

    connection.query("update pedido_oracao set apresentado = ? where id= ?", [1, req.params.id], function (err, results) {
        if (err) {
            console.log("erro update pedidoOracao " + err.stack)
            res.redirect("/");
        } else {
            console.log("Apresentado pedido de Oração id: " + req.params.id)
            res.redirect("/");
        };
    });
});

//background tela
app.get("/bgGT", function (rec, res) {
    res.sendFile(__dirname + "/views/Style/bg.png");
});



app.listen(8080, () => {
    console.log("http://localhost:8080");
});