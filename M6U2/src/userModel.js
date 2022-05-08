const pool = require('./DBPool');
const md5 = require('md5');

function login(username, password) {
    return new Promise(async (resolve, reject) => {
        if (!username || username == '' || !password || password == '') return reject({message: 'Invaalid request.'});
        const query = 'select * from user where username=? and password=? limit 1';
        const users = await pool.query(query, [username, md5(password)]);
        if (!Array.isArray(users) && users.length == 0) return reject({mesage: 'Error al iniciar sesion.'});
        resolve(users[0]);
    });
}

module.exports = {
    login
}