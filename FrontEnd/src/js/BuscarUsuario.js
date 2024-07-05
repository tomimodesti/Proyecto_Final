
document.addEventListener('DOMContentLoaded', function() {
    const urlparam = new URLSearchParams(window.location.search);
    const id_user = urlparam.get(id);
    if(id_user){

    fetch(`http://localhost:5000/usuario/$(id_user)`)

        .then(response => response.json())

        .then(data => {

            const usuariosContainer = document.getElementById('usuario-container');

            const usuario = data.Usuario;

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
                usuariosContainer.appendChild(card);
            })

        .catch(error => {
            console.error('Error al cargar datos:', error);
            });
    }

    else {
        console.error('ID de usuario no especificado en la URL');
    }

})