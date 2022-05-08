const pool = require('./DBPool');
const md5 = require('md5');

function get(id=undefined) {
    try {
        return new Promise(async (resolve, reject) => {
            const query = !id || id == '' ? 'select * from novedad' : 'select * from novedad where id=? limit 1';
            const response = !id || id == '' ? await pool.query(query) : await pool.query(query, [id]);
            return resolve(Array.isArray(response) && response.length == 1 ? response[0] : response);
        });
    } catch (error) {
        console.error(error);
        reject({message: "Error al obtener novedades."})
    }
}

function del(id) {
    return new Promise(async (resolve, reject) => {
        try {            
            if (!id || id == '') return reject({message: "Invalid request."});
            const query = 'delete from novedad where id=?';
            resolve(pool.query(query, [id]));
        } catch (error) {
            console.error(error);
            return reject({message: "Error al borrar novedad."})
        }
    });
}

function insert(obj) {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !obj?.title || obj?.title == '' ||
                !obj?.subtitle || obj?.subtitle == '' ||
                !obj?.body || obj?.body == ''
            ) return reject({message: "Error, la novedad necesita tener un título, subtítulo y cuerpo."});
            const query = 'insert into novedad set ?';
            resolve(pool.query(query, [obj]));
        } catch (error) {
            console.error(error);
            return reject({message: "Error al crear una novedad."})
        }
    });
}

function update(id, obj) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || id == '') return reject({message: "Invalid request."});
            let query = 'select * from novedad where id=? limit 1';
            const oldNovedad = await get(id);
            if (!oldNovedad) return reject({message: "La novedad que intenta actualizar no existe."});
            const newNovedad = {
                title: obj.title ? obj.title : oldNovedad.title,
                subtitle: obj.subtitle ? obj.subtitle : oldNovedad.subtitle,
                body: obj.body ? obj.body : oldNovedad.body,
            }
            query = 'update novedad set ? where id=?';
            resolve(pool.query(query, [newNovedad, id]));
        } catch (error) {
            console.error(error);
            return reject({message: "Error al actualizar las novedades."})
        }
    });
}

module.exports = {
    get,
    del,
    insert,
    update,
}