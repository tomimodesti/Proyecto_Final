document.addEventListener('DOMContentLoaded', function() {

    fetch('http://localhost:5000/sesion', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje === "Sesion inactiva") {
            window.location.href = '../login.html';
        }
    })
    .catch(error => {
        console.error('Error al verificar usuario, vuelva a iniciar sesion:', error);
        alert('Error al verificar usuario, vuelva a iniciar sesion.');
    });

    const form = document.querySelector('form');
    const cartasTiposMinas = document.getElementById('cartasTiposMinas');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const tipoMinador = document.querySelector('input[name="tipoMina"]:checked');
        const dataMinero = {
            nombre: form.inputName.value,
            tipo_minador: tipoMinador.value,
        };

        const url = 'http://localhost:5000/minero';
        const config = {
            method: 'POST',
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
        .then(data => {
            data.tiposMinas.forEach(tipoMina => {
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
});
