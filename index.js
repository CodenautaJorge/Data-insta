//------------------------------------------------------------------------

//Lanzamos el servidor local
const express = require('express');

//Módulo nedb para la base de datos
const Datastore = require('nedb');

//instancia de express
const app = express();

//Puerto donde se ejecutará la app:
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server port at ${port}`));

//lanzamos el archivo index.html de la carpeta public
app.use(express.static('public'));

//Permitimos obtener los datos en formato json con un límite de 2mb:
app.use(express.json({ limit: '2mb' }));

//------------------------------------------------------------------------


//Creamos la base de datos con el nombre indicado:
const database = new Datastore('datainsta.db');

//Cargamos la base de datos. Si no existe se crea en este momento:
database.loadDatabase();

//------------------------------------------------------------------------


//PASO 2 POST method route -----------------------------------------------
//Especificamos la dirección par recibir los datos del cliente ('/api')
//request: datos recibidos del cliente
//response: respuesta que enviamos al cliente

app.post('/api', (request, response) =>{

	console.log('respuesta recibida');
	const datos = request.body;

	//console.log(datos);

	//Obtenemos la fecha de los datos recibidos:
	const timestamp = Date.now();

	//Lo añadimos a datos para almacenarlo en la BDD:
	datos.timestamp = timestamp;

	//----------------------------------------------

	//Insertamos los datos recibidos
	database.insert(datos);
	//console.log(database);

	//----------------------------------------------

	//Respuesta para el cliente (index.html):
	response.json({

		status: 'success',
		timestamp: timestamp,
		user: datos.usuario,
		desc: datos.descripcion,
		img: datos.image64

	});

});

//-------------------------------------------------------------------------

//// -----CONSULTA A LA BDD------------------------------------------------

//GET method route
//recibimos la consulta desde el cliente y devolvemos los datos:
app.get('/api', (request, response) =>{

	//response.json({ test: 'hello!' });
	//Referencia para find: https://github.com/louischatriot/nedb

	//Ordenado de fecha más actual a más antigua:
	database.find({}).sort({timestamp: -1}).exec(function(err, data) {

		if(err){
			response.end();
			return;
		}
		response.json(data);

	});


});

