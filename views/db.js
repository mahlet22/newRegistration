const express = require("express");
const app = express();
const { client } = require("./dbConfig");
const bcrypt = require("bcrypt");
// creating opration 
async function create(key, value, tableName) {
    let res = await client.query(
        `INSERT INTO food."${tableName}" ${key}
             VALUES ($1, $2, $3, $4 $5, $6, $7)`, value,
        (err, res) => {
            if (res) {
                client.end;
            } else {
                client.end;
            }
        })

    console.log(res)
}


//  read opration 



// update opration



//  delete opration
const deleteUser = async (userName) => {
    try {
        await client.connect();  // gets connection
        await client.query('DELETE FROM "users" WHERE "name" = $1', [userName]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();  // closes connection
    }
};

deleteUser('Denis').then((result) => {
    if (result) {
        console.log('User deleted');
    }
});
// delete
async function Delete(id) {
    let k = await client.query(
        `DELETE FROM food."${tableName}" ${key}
             VALUES ($1)`, value,
        (err, res) => {
            if (res) {
                client.end;
            } else {
                client.end;
            }
        })

    console.log(res)
}

module.exports = { create };

// module.exports = { Delete };


    // const deleteUser = async (email) => {
    //     try {
    //         await client.connect();  // gets connection
    //         await client.query('DELETE FROM "users" WHERE "name" = $1', [email]); // sends queries
    //         return true;
    //     } catch (error) {
    //         console.error(error.stack);
    //         return false;
    //     } finally {
    //         await client.end();  // closes connection
    //     }
    // };
    
    // deleteUser('Denis').then((result) => {
    //     if (result) {
    //         console.log('User deleted');
    //     }
    // });
    // const deleteitem = req.body.id;
    // con.connect(function(err) {
    //     if (err) throw err;
    //     var sql = ` DELETE FROM customers WHERE address = ${deleteitem}`;
    //     con.query(sql, function(err, result) {
    //         if (err) throw err;
    //         console.log("Number of records deleted: " + result.affectedRows);
    //     });
    // });