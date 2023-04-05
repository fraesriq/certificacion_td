import express from 'express'
import cors from 'cors'
import { create } from 'express-handlebars'
import fileUpload from 'express-fileupload';
import 'dotenv/config';

import * as path from 'path'
import { fileURLToPath } from 'url'

// -------------------------------------------------
// ------------------- RUTAS -----------------------
// -------------------------------------------------
import viewsRoutes from './routes/views.routes.js'
import usersRoutes from './routes/users.routes.js';
import postsRoutes from './routes/posts.routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express();

// -------------------------------------------------
// ------------------- MIDLEWARE -------------------
// -------------------------------------------------
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())

let limiteMb = 2;
app.use(fileUpload({
  limits: { fileSize: limiteMb* 1024 * 1024 },
  abortOnLimit: true,
  responseOnLimit: `Usted ha superado el límite permitido (${limiteMb})`
}));

app.use(viewsRoutes)
app.use('/api', usersRoutes);
app.use('/api', postsRoutes);

app.listen(process.env.PORT_FRONTEND || 3000, () => console.log("http://localhost:"+process.env.PORT_FRONTEND))

// CARPETA DE IMAGENES FRONTEND
app.use('/img', express.static(__dirname + '/assets/img'))
// CARPETA DE IMAGENES PUBLIC
app.use('/imagen', express.static(__dirname + '/public/img'))
// CARPETA DE ESTILOS
app.use('/css', express.static(__dirname + '/assets/css'))
// CARPETA DE FUENTES
app.use('/fonts', express.static(__dirname + '/assets/fonts'))
// CARPETA DE SCRIPTS
app.use('/js', express.static(__dirname + '/assets/js'))

// -------------------------------------------------
// ------------------- HANDLEBARS-------------------
// -------------------------------------------------

const hbs = create({
  partialsDir: [
    "views/partials/"
  ]
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'))

export default app