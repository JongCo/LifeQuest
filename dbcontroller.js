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
            return rows;
        }
        catch(err){
            throw err;
        }
        finally{
            if (conn) conn.end();
        }
    },

    selectTodoList: async function(uid){
        const queryString = fs.readFileSync(path.join(__dirname, "queries", "select_todo_list.sql"), "utf8");
        let conn, rows;
        try{
            conn = await jclqDbPool.getConnection();
            rows = await conn.query(queryString, [uid]);
            return rows;
        }
        catch(err){
            throw err;
        }
        finally{
            if (conn) conn.end();
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
            return res;
        }
        catch(err){
            throw err;
        }
        finally{
            if (conn) conn.end();
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
            return res;
        }
        catch(err){
            throw err;
        }
        finally{
            if (conn) conn.end();
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
            return res;
        }
        catch(err){
            throw err;
        }
        finally{
            if (conn) conn.end();
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
            return res;
        }
        catch(err){
            throw err;
        }
        finally{
            if (conn) conn.end();
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
            return res;
        }
        catch(err){
            throw err;
        }
        finally{
            if (conn) conn.end();
        }
    }
}


module.exports = jclqDbController

