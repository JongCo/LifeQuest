const path = require("path");

const dbPath = path.join(__dirname, "data", "JCLQDB.db");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbPath, err => {
    if(err) {
        console.error(err.message);
        process.exit();
    }
    console.log("Successful connection to the database '" + path.basename(dbPath) + "'");
});

module.exports = db;