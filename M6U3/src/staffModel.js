const pool = require('./DBPool');
const md5 = require('md5');

function get(id=undefined) {
    try {
        return new Promise(async (resolve, reject) => {
            const query = !id || id == '' ? 'select * from staff' : 'select * from staff where id=? limit 1';
            const response = !id || id == '' ? await pool.query(query) : await pool.query(query, [id]);
            return resolve(Array.isArray(response) && response.length == 1 && id ? response[0] : response);
        });
    } catch (error) {
        console.error(error);
        reject({message: "Error al obtener staff."})
    }
}

function del(id) {
    return new Promise(async (resolve, reject) => {
        try {            
            if (!id || id == '') return reject({message: "Invalid request."});
            const query = 'delete from staff where id=?';
            resolve(pool.query(query, [id]));
        } catch (error) {
            console.error(error);
            return reject({message: "Error al borrar staff."})
        }
    });
}

function insert(obj) {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !obj?.name || obj?.name == '' ||
                !obj?.lastname || obj?.lastname == '' ||
                !obj?.email || obj?.email == '' ||
                !obj?.role || obj?.role == ''
            ) return reject({message: "Error, el staff necesita un nombre, apellido, email y rol."});
            const query = 'insert into staff set ?';
            resolve(pool.query(query, [obj]));
        } catch (error) {
            console.error(error);
            return reject({message: "Error al crear staff."})
        }
    });
}

function update(id, obj) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || id == '') return reject({message: "Invalid request."});
            let query = 'select * from staff where id=? limit 1';
            const oldStaff = await get(id);
            if (!oldStaff) return reject({message: "El staff que intenta actualizar no existe."});
            const newStaff = {
                name: obj.name ? obj.name : oldStaff.name,
                lastname: obj.lastname ? obj.lastname : oldStaff.lastname,
                email: obj.email ? obj.email : oldStaff.email,
                description: obj.description ? obj.description : oldStaff.description,
                image: obj.image ? obj.image : oldStaff.image,
                role: obj.role ? obj.role : oldStaff.role,
            }
            query = 'update staff set ? where id=?';
            resolve(pool.query(query, [newStaff, id]));
        } catch (error) {
            console.error(error);
            return reject({message: "Error al actualizar staff."})
        }
    });
}

module.exports = {
    get,
    del,
    insert,
    update,
}