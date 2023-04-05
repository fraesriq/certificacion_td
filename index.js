import app from './app.js'
import {sequelize} from './db/db.js'

// --------------------------------------------------
// -------------- IMPORTAR MODELOS ------------------
// --------------------------------------------------

import './models/Users.model.js'
import './models/Posts.model.js'
import './models/Categories.model.js'
import './models/Relations.model.js'

import { chargeSeeds } from './seeds.js';

const forceMetod = false // Si fuerzo la sincronizacion borra los datos y carga las semillas

const main = async () => {
  try {
    await sequelize.authenticate()
  
    await sequelize.sync({
      force: forceMetod,
      alter: true,
      logging: false
    })

    if (forceMetod) {
      chargeSeeds();  
    }

    app.listen(process.env.PORT_BACKEND, () => { console.log('Servidor escuchando en http://localhost:'+process.env.PORT_BACKEND);})
  } catch (error) {
    console.log('Ha ocurrido un error',error);
  }
}

main();