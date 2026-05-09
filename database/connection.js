import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database/parking.db", (err) => {

    if(err){
        console.log("Erro ao conectar no banco");
        return;
    }

    console.log("SQLite conectado!");

});

export default db;