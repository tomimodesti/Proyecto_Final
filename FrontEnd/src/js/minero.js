document.addEventListener('DOMContentLoaded', function() {
            const minerosDetalles = document.getElementById('minerosDetalles');

            // Obtener detalles de los mineros
            fetch('/minero/1')  // Supongamos que el ID del minero es 1
                .then(response => response.json())
                .then(data => {
                    const ultimaRecoleccion = data.fecha_ultima_recoleccion ? new Date(data.fecha_ultima_recoleccion).toLocaleString() : 'Nunca';

                    minerosDetalles.innerHTML = `
                        <div>
                            <p>Nombre: ${data.nombre}</p>
                            <p>Coste: ${data.coste}</p>
                            <p>Dinero que genera: ${data.dineroGenera}</p>
                            <p>Tiempo que demora: ${data.tiempoDemora}</p>
                            <p>Fecha de creación: ${new Date(data.fecha_creacion).toLocaleString()}</p>
                            <p>Fecha de última recolección: ${ultimaRecoleccion}</p>
                            <p>Tiempo restante para recolectar: <span id="tiempoRestante">${data.tiempo_restante}</span> segundos</p>
                        </div>
                    `;

                    // Iniciar la cuenta regresiva
                    const tiempoRestanteElem = document.getElementById('tiempoRestante');
                    let tiempoRestante = data.tiempo_restante;

                    const intervalo = setInterval(() => {
                        if (tiempoRestante <= 0) {
                            clearInterval(intervalo);
                            tiempoRestanteElem.textContent = 'Disponible para recolectar';
                        } else {
                            tiempoRestante -= 1;
                            tiempoRestanteElem.textContent = tiempoRestante;
                        }
                    }, 1000);
                })
                .catch(error => console.error('Error al obtener detalles del minero:', error));
        });