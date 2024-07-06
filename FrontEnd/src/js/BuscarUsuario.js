

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id_user = urlParams.get('id'); 

    if (id_user) {
        fetch(`http://localhost:5000/usuario/${id_user}`) 
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                const usuarioContainer = document.getElementById('usuario-container');

                const usuario = data.Usuario;

                if (usuario) {
                    const card = document.createElement('div');
                    card.className = 'col';
                    card.innerHTML = `
                        <div class="card">
                            <div class="card-body m-4">
                                <h5 class="card-title"> Nombre: ${usuario.nombre} (@${usuario.nombre_usuario})</h5>
                                <p class="card-text">Apellido: ${usuario.apellido}</p>
                                <p class="card-text">Email: ${usuario.email}</p>
                                <p class="card-text">Dinero: ${usuario.dinero}</p>
                            </div>
                        </div>
                    `;

                    
                    const Clase = document.createElement('div');
                    if (usuario.dinero < 100) {
                        Clase.innerHTML = `
                            <h4>CLASS: <small>"Starter Miner"</small></h4>
                        `;
                    } else if (usuario.dinero >= 100 && usuario.dinero < 300) {
                        Clase.innerHTML = `
                            <h4>CLASS: <small>"Crypto Bro"</small></h4>
                        `;
                    } else if (usuario.dinero >= 300) {
                        Clase.innerHTML = `
                            <h4>CLASS: <small>"Elon Partner"</small></h4>
                        `;
                    }

                    
                    card.appendChild(Clase);

                   
                    usuarioContainer.appendChild(card);                    
                    
                } else {
                    console.error('Usuario no encontrado en la respuesta.');
                }
            })
            .catch(error => {
                console.error('Error al cargar datos:', error);
            });
    } else {
        console.error('ID de usuario no especificado en la URL');
    }
});
