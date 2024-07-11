document.addEventListener('DOMContentLoaded', function() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const user_id = urlParams.get('id');

    const minerosDetalles = document.getElementById('mineros-container');

    fetch(`http://localhost:5000/mineros/${user_id}` , {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        })

    .then(response => {
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })

    .then(data => {
        console.log(data);
        if (data.Mensaje && data.Mensaje === 'No se encontraron mineros para el usuario') {
            minerosDetalles.innerHTML = `<div>
                <p>Aún no tienes mineros creados, crea el primero para empezar a recolectar tus ganancias!!!</p>
                </div>
            `;
        }else{  
            data.mineros.forEach(minero => {
                fetch(`http://localhost:5000/minero/${minero.id}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {'Content-Type': 'application/json'},
                })
                .then(response => {
                    if(!response.ok){
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })//
                    .then(mineroData => {
                        console.log(mineroData);
                        const dataMinero = document.createElement('div');
                        
                        const ultimaRecoleccion = mineroData.minero.fecha_ultima_recoleccion ? new Date(mineroData.minero.fecha_ultima_recoleccion).toLocaleString() : 'Nunca';
                        dataMinero.innerHTML=`
                        <div class="m-3">
                            <p>Nombre: ${mineroData.minero.nombre}</p>
                            <p>Coste: ${mineroData.minero.coste}</p>
                            <p>Dinero que genera: ${mineroData.minero.dinero_generado}</p>
                            <p>Tiempo que demora: ${mineroData.minero.tiempo_mineria}</p>
                            <p>Fecha de creación: ${new Date(mineroData.minero.fecha_creacion).toLocaleString()}</p>
                            <p>Fecha de última recolección: ${ultimaRecoleccion}</p>
                            <p>Tiempo restante para recolectar: <span id="tiempoRestante${minero.id}">${mineroData.minero.tiempo_restante}</span></p>
                            <button id="botonRecolectar${minero.id}" class="btn btn-primary">Recolectar</button>
                            <a class="btn btn-secondary" href="../minero?id=${minero.id}">Ver detalles</a>
                        </div>
                        `;

                        minerosDetalles.appendChild(dataMinero);

                        const tiempoRestanteElem = document.getElementById(`tiempoRestante${minero.id}`);
                        let tiempoRestante = mineroData.minero.tiempo_restante;
        
                        const intervalo = setInterval(() => {
                            if (tiempoRestante <= 0) {
                                clearInterval(intervalo);
                                tiempoRestanteElem.textContent = 'Disponible para recolectar';
                            } else {
                                tiempoRestante -= 1;
                                tiempoRestanteElem.textContent = `${tiempoRestante} segundos`;
                            }
                        }, 1000);


                document.getElementById(`botonRecolectar${minero.id}`).addEventListener('click', function () {
                     fetch(`http://localhost:5000/recolectar`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                     body: JSON.stringify({minero_id: minero.id})
                        })
                        .then(response => {
                            console.log(response)
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

    
                })
                .catch(error => console.error('Error al cargar datos de uno de los mineros del usuario'));
            })}
           })
        .catch(error => {console.error('Error al cargar los mineros del usuario')
            minerosDetalles.innerHTML=`
            <p>Error al cargar tus mineros, reintente</p>
            `
        });
})