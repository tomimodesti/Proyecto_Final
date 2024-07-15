document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const minero_id = urlParams.get('id');
    const minerosDetalles = document.getElementById('mineros-container');

    fetch(`http://localhost:5000/minero/${minero_id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(data => {
            if (data.minero) {
                const ultimaRecoleccion = data.minero.fecha_ultima_recoleccion ? new Date(data.minero.fecha_ultima_recoleccion).toLocaleString() : 'Nunca';

                minerosDetalles.innerHTML = `
                <div>
                    <p>Nombre: ${data.minero.nombre}</p>
                    <p>Coste: ${data.minero.coste}</p>
                    <p>Dinero que genera: ${data.minero.dinero_generado}</p>
                    <p>Tiempo que demora: ${data.minero.tiempo_mineria}</p>
                    <p>Fecha de creación: ${new Date(data.minero.fecha_creacion).toLocaleString()}</p>
                `;
                if (!data.minero?.fecha_ultima_recoleccion) {
                    minerosDetalles.innerHTML += `
                    </div>
                    `;
                } else {
                    minerosDetalles.innerHTML += `
                        <p>Fecha de última recolección: ${ultimaRecoleccion}</p>
                        <p>Tiempo restante para recolectar: <span id="tiempoRestante">${data.minero.tiempo_restante}</span></p>
                        <button style="margin: 0 auto; max-width: 250px" id="botonRecolectar" class="btn btn-primary">Recolectar</button>
                    </div>
                    `;
                    const modificarMinero = document.getElementById('modificarMinero');
                    modificarMinero.innerHTML = `
                        <button class="btn btn-secondary btn-lg" onclick="redirigirMinero()"> Modificar Minero</button>
                    `;

                    const tiempoRestanteElem = document.getElementById('tiempoRestante');
                    let tiempoRestante = data.minero.tiempo_restante;

                    const intervalo = setInterval(() => {
                        if (tiempoRestante <= 0) {
                            clearInterval(intervalo);
                            tiempoRestanteElem.textContent = 'Disponible para recolectar';
                        } else {
                            tiempoRestante -= 1;
                            tiempoRestanteElem.textContent = Math.round(tiempoRestante) + ' segundos';
                        }
                    }, 1000);

                    document.getElementById('botonRecolectar').addEventListener('click', function () {
                        fetch(`http://localhost:5000/recolectar`, {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({minero_id: minero_id})
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! Status: ${response.status}`);
                                }
                                return response.json();
                            })
                            .then(data => {
                                alert('Recolección exitosa');
                                window.location.reload();
                            })
                            .catch(error => {
                                console.error('Error al recolectar:', error);
                                alert('Hubo un error al recolectar. Por favor, inténtalo nuevamente.');
                            });
                    });
                }
            }
        })
        .catch(error => console.error('Error al obtener detalles del minero:', error));        
});
