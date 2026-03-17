const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/cmsdb.sqlite');

let sql = `SELECT * FROM user WHERE username=? and password=?`;

function getRow(sql, values) {
    return new Promise((resolve, reject) => {
        db.get(sql, values, (err, row) => {
            if(err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    })
}

async function getRowTest() {
    let row = await getRow(sql, ['cody', '1234']);
    console.log(row);
    
}

getRowTest().then(()=>console.log('query completed'));

module.exports = { getRow };