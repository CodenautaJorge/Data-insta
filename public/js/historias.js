//Obtenemos todos los datos de la BDD con una consulta:

		async function getData(){

			const response = await fetch('/api');
			const data = await response.json();
			console.log(data);

			//Mostramos los datos recibidos y los imprimimos en el documento:

			for(item of data){

				const root = document.createElement('div');
				const usuario = document.createElement('div');
				const descripcion = document.createElement('div');
				const fecha = document.createElement('div');
				const imagen = document.createElement('img');

				const separacion = document.createElement('br');

				//`` string literal
				usuario.textContent = `Usuario: ${item.usuario}`;
				descripcion.textContent = `Descripción: ${item.descripcion}`;
				const dateString = new Date(item.timestamp).toLocaleString();
				fecha.textContent = dateString;
				imagen.src = item.image64;

				root.append(imagen, usuario, descripcion, fecha);
				document.getElementById('historias').append(root);
				document.getElementById('historias').append(separacion);

			}
		}
		
		getData();