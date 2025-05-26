# Proyecto MI APP
En este proyecto veremos como esta estructurada la parte del frontend y el backend, asi mismo las diferentes librerias, herramientas
y lenguajes utilizados en el proceso de desarrollo de dicho proyecto.

## Frontend
Para el desarrollo del frontend se utilizó React con el framework next.js.
Para el desarrollo del mismo y poder hacerlo mas dinamico, se utilizó:
  * Tailwind para el manejo de tamaños, efectos, bordes, sombras, animación, entre otros.
  * Tambien se utilizó SweetAlert2 para poder darle dinamismo a los mensajes de feedback para los usuarios.
  * Efecto de carga(loading), para que los usuarios tengan una mejor interacción.
  * FontAwesomeIcon la cual es una libreria de iconos, en donde en el programa hace que los usuarios puedan identificar mejor cada opcion por medio de iconos.
  * Se establecio el navbar sticky para que el usuario tenga siempre las opciones cerca y no tenga que scrollear hasta arriba.
  * Feedback por cada accion que el usuario hace, para que el sepa si todo esta correcto o si hubo algun error en alguna consulta o ejecución.
cabe mencionar que este corre en el puerto 3000, o 3001 si el puerto 3000 esta ocupado, para poder ejecutar el frontend se necesita
ingresar el siguiente comando estando en la carpeta de miapp: npm run dev, este comando levantará un localhost:3000 o 3001.

## Backend
Para el desarrollo del backend se utilizó Express con Typescript.
  * Se estructuro de una forma ordenada y por carpetas las consultas de los productos y de los usuarios, para poder tener un codigo mas limpio y legible.
  * Se utilizó una base de datos en la nube, especificamente en Clever Cloud.

Se desarrollarón metodos GET y POST, claro en un futuro se podria establecer el metodo PUT para poder actualizar datos tanto de productos como de usuarios. 
para poder ejecutar el backend debemos ubicarnos en la carpeta de src y ejecutar el comando: npm run dev, este comando levantará un localhost:5000.

## AWS
En AWS se creó un bucket S3 en donde se tienen almacenadas una serie de imagenes las cuales se usan en el frontend para la visualizacion de los productos.
Asi mismo se tiene otro bucket S3 en donde esta toda la parte del frontend de este proyecto, el siguiente Link es dondes esta desplegado 
el frontend del proyecto: http://miapp-app-esdras.s3-website-us-east-1.amazonaws.com
para iniciar sesion y probar la interfaz y de mas, se puede loggear con el siguiente email: admin@admin.com y password: 123,
la Ip que se debe de poner en el navbar es:  (se recomienda poner la Ip y luego recargar la pagina).
Tambien se creó una instancia EC2 para poder conectarse desde SSH al backend y poder levantarlo desde una terminal de linux en Ubuntu,
para que nuestro frontend pueda hacer las peticiones al backend adecuadamente.
