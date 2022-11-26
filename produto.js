const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: 'loja',
});

function list(res) {
    //buscar os dados do banco de dados
    connection.connect(function (err) {
        if (err) throw err;
        connection.query("SELECT id, name, price FROM product", function (err, result) {
            if (err) throw err;
            res.end(JSON.stringify(result));
        });
    });
}

function show(res, req) {
    const id = req.url.split('?id=')[1]

    connection.connect(function (err) {
        if (err) throw err;
        connection.query("SELECT * FROM product where id = " + id, function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result[0]));
            connection.end();
        });
    });
}

function add(res, req) {
    console.log(req.body)
    connection.connect(function (err) {
        if (err) throw err;
        connection.query(`
            INSERT INTO product (name, price, description)
            VALUES ('Chuteira', 140.99, 'ksadklasjj salkdjaskl djaslkdja slkdjas ldj lk')
        `, function (err, result, fields) {
            if (err) throw err;
            connection.end();
            res.end(JSON.stringify(result[0]));
        });
    });
}

module.exports = {
    add,
    list,
    show,
};
