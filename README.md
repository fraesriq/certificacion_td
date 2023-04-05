Repositorio Prueba de Certificación TALENTO DIGITAL (ECMAScript 6):

Tecnologias utilizadas:

HTML
CSS, Bootstrap
JavaScript
Node.js
PG (PostgreSQL)
Sequelize (ORM)
Paquetes y librerías de usuario

Repositorio GitHub: https://github.com/fraesriq/certificacion_td.git

Instrucciones para iniciar el proyecto

- Descarga el código desde el enlace de GitHub proporcionado.
- Crear base de datos con nombre "certificacion"
- Instalar dependencias con npm i
- En el archivo index.js definir la variable forceMetod en "true" la cual cargara las semillas para crear tablas y poblar con datos iniciales, luego volver a false para realizar las pruebas
- npm run dev
- Ingresar al navegador a la ruta http://localhost:3001/

Caso de uso.

- En la barra de navegacion principal se encuentran los link para registrarse como usuario o logear.
- procesa a registrar un usuario y luego logearse.
- al loguearse como usuario pobra realizar una publicacion en el sitio en el menu Publicar
- Luego de publicar puede realizar un comentario al ver el detalle de la publicacion.
- ademas puede dar like o dislike a cada publicacion.
- En el detalle de la publicacion se encuentra un link a los usuarios que han realizado un like en la publicacion
- Los link de Publicacion y comentarios solo aparecen a los usuarios registrados
- Los like y dislike aparecen no importando ellogin pero si quieres hacer una calificacion solicita estar logeado.
