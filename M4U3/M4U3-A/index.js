var moment = require('moment');
moment.locale('es');

console.log('nací ' + moment('22/01/1985', 'DD/MM/YYYY').fromNow());
