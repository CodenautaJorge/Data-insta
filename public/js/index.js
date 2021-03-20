
		const publicar = document.getElementById('publicar');
		let image64;

		// visualización de la imagen seleccionada ------------------------------------------

		function leerArchivo(input) {
	        if (input.files) {
	            const reader = new FileReader();
	 
	            reader.onload = function (e) {
	                const filePreview = document.createElement('img');
	                filePreview.id = 'file-preview';
	                //e.target.result contiene los datos en base64 de la imagen subida
	                filePreview.src = e.target.result;
	                image64 = e.target.result;
	                console.log(image64);
	 
	                const previewZone = document.getElementById('preview');
	                previewZone.appendChild(filePreview);
	            }
	 
	            reader.readAsDataURL(input.files[0]);
	        }
	    }
 
	    const fileUpload = document.getElementById('file-upload');

	    fileUpload.onchange = function(e) {
	        leerArchivo(e.srcElement);
	    }

    	//------------------------------------------------------------------------------------

    	//Envio de los datos al servidor -----------------------------------------------------

		publicar.onclick = async function(){

			const usuario = document.getElementById('usuario').value;
			const descripcion = document.getElementById('descripcion').value;

			//Datos para enviar al servidor (index.js) 

			const data = { usuario, descripcion, image64 };

			//stringify obtiene el objeto javascript y lo convierte a un string json
			//headers contiene meta información del envío

			const datos = {

				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)

			}

			//Enviamos los datos:
			const response = await fetch('/api', datos);

			//Esperamos a recibir la respuesta del servidor:
			const json = await response.json();
			console.log(json);

			//Limpiamos la interfaz ------------------------------------
			
			document.getElementById('usuario').value = '';
			document.getElementById('descripcion').value = '';

			const imagen = document.getElementById('file-preview');
			const div = document.getElementById('preview');
			
			div.removeChild(imagen);
			
			//----------------------------------------------------------


		}
