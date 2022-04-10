// const path = require("path");

// const dbPath = path.join(__dirname, "data", "JCLQDB.db");

// const sqlite3 = require("sqlite3").verbose();
// const db = new sqlite3.Database(dbPath, err => {
//     if(err) {
//         console.error(err.message);
//         process.exit();
//     }
//     console.log("Successful connection to the database '" + path.basename(dbPath) + "'");
// });



// module.exports = db;

const fs = require("fs");
const path = require("path");

const mariadb = require("mariadb");

dbConfig = JSON.parse(fs.readFileSync(path.join(__dirname, "dbconfig.json")), "utf8");

const jclqDbPool = mariadb.createPool({
    host: dbConfig.DBHost,
    port: dbConfig.DBPort,
    user: dbConfig.DBUser,
    password: dbConfig.DBPass,
    database: dbConfig.DBDatabase,
    connectionLimit: dbConfig.connectionLimit
});

const jclqDbController = {
    selectUser: async function(username){
        const queryString = fs.readFileSync(path.join(__dirname, "queries", "select_users.sql"), "utf8");
        let conn, rows;
        try{
            conn = await jclqDbPool.getConnection();
            rows = await conn.query(queryString, [username]);
            return rows[0];
        }
        catch(err){
            throw err;
        }
        finally{
            if (conn) conn.end();
        }
    },

    selectTokenByUsername: async function(username){
        const queryString = fs.readFileSync(path.join(__dirname, "queries", "select_token_by_username.sql"), "utf8");
        let conn, rows;
        try{
            conn = await jclqDbPool.getConnection();
            rows = await conn.query(queryString, [username]);
        }
        catch(err){
            throw err;
        }
        finally{
            if (conn) conn.end();
            return rows;
        }
    },

    selectTodoList: async function(uid){
        const queryString = fs.readFileSync(path.join(__dirname, "queries", "select_todo_list.sql"), "utf8");
        let conn, rows;
        try{
            conn = await jclqDbPool.getConnection();
            rows = await conn.query(queryString, [uid]);
        }
        catch(err){
            throw err;
        }
        finally{
            if (conn) conn.end();
            return rows;
        }
    },

    insertUser: async function(username, password){
        const queryString = fs.readFileSync(path.join(__dirname, "queries", "insert_users.sql"), "utf8");
        let conn;
        let res;
        try{
            conn = await jclqDbPool.getConnection();
            await conn.beginTransaction();
            res = await conn.query(queryString, [username, password]);
            await conn.commit();
            console.log(res)
        }
        catch(err){
            throw err;
        }
        finally{
            if (conn) conn.end();
            return res;
        }
    },

    insertToken: async function(token, uid){
        const queryString = fs.readFileSync(path.join(__dirname, "queries", "insert_tokens.sql"), "utf8");
        let conn;
        let res;
        try{
            conn = await jclqDbPool.getConnection();
            await conn.beginTransaction();
            res = await conn.query(queryString, [token, uid]);
            await conn.commit();
            console.log(res)
        }
        catch(err){
            throw err;
        }
        finally{
            if (conn) conn.end();
            return res;
        }
    },

    insertTodo: async function(name, uid){
        const queryString = fs.readFileSync(path.join(__dirname, "queries", "insert_todo.sql"), "utf8");
        let conn;
        let res;
        try{
            conn = await jclqDbPool.getConnection();
            await conn.beginTransaction();
            res = await conn.query(queryString, [name, uid]);
            await conn.commit();
            console.log(res)
        }
        catch(err){
            throw err;
        }
        finally{
            if (conn) conn.end();
            return res;
        }
    },

    updateTodo: async function(success, todoId){
        const queryString = fs.readFileSync(path.join(__dirname, "queries", "update_todo.sql"), "utf8");
        let conn;
        let res;
        try{
            conn = await jclqDbPool.getConnection();
            await conn.beginTransaction();
            res = await conn.query(queryString, [success, todoId]);
            await conn.commit();
            console.log(res)
        }
        catch(err){
            throw err;
        }
        finally{
            if (conn) conn.end();
            return res;
        }
    },

    deleteTodo: async function(todoId){
        const queryString = fs.readFileSync(path.join(__dirname, "queries", "delete_todo.sql"), "utf8");
        let conn;
        let res;
        try{
            conn = await jclqDbPool.getConnection();
            await conn.beginTransaction();
            res = await conn.query(queryString, [todoId]);
            await conn.commit();
        }
        catch(err){
            throw err;
        }
        finally{
            if (conn) conn.end();
            return res;
        }
    }
}


module.exports = jclqDbController

