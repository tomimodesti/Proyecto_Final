document.addEventListener('DOMContentLoaded', function() {

    const urlParams = new URLSearchParams(window.location.search);
    const id_minero = urlParams.get('id_minero');

    const form = document.querySelector('#formMinero');
    const cartasTiposMinas = document.getElementById('CartasTiposMinas');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const tipoMinador = document.querySelector('input[name="tipoMina"]:checked');
        const dataMinero = {
            nombre: form.inputName.value,
            tipo_minador: tipoMinador.value,
        };

        const url = `http://localhost:5000/minero/${id_minero}`;
        const config = {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataMinero)
        };

        fetch(url, config)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Minero creado exitosamente:', data);
                alert('Minero creado exitosamente');
                window.location.href = '../index.html';
            })
            .catch(error => {
                console.error('Error al crear Minero:', error);
                alert('Hubo un error al crear el Minero. Por favor, inténtalo nuevamente.');//TODO: mostrar mensaje de error en el formulario
            });
    });


    fetch('http://localhost:5000/tipos_minas')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(Data => {
            Data.tiposMinas.forEach(tipoMina => {
                        const carta = document.createElement('div');
                        carta.classList.add('col-md-4', 'mb-4');

                        carta.innerHTML = `
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${tipoMina.nombre}</h5>
                                    <p class="card-text">Coste: ${tipoMina.coste}</p>
                                    <p class="card-text">Dinero que genera: ${tipoMina.dinero_generado}</p>
                                    <p class="card-text">Tiempo demora: ${tipoMina.tiempo_mineria}</p>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="tipoMina" id="tipoMina${tipoMina.id}" value="${tipoMina.id}">
                                        <label class="form-check-label" for="tipoMina${tipoMina.id}">
                                            Seleccionar
                                        </label>
                                    </div>
                                </div>
                            </div>
                        `;

                        cartasTiposMinas.appendChild(carta);
                    });
                })
        .catch(error => console.error('Error al obtener tipos de minas:', error));


        fetch(`http://localhost:5000/minero/${id_minero}`)
        .then(response => {
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data=>{
            console.log('Hola tus datos:',data);
            form.inputName.value = data.nombre; 
            document.querySelector(`input[name="tipoMina"][value="${data.tipo_minador}"]`).checked = true; 
        })
        .catch(error => {
            console.error('Error al acceder al minero:',error);
            alert('Error al acceder al minero, reintente');
        })

});
