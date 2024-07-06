document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/mineros')
        .then(response => response.json())
        .then(data => {
            const minerosContainer = document.getElementById('mineros-container');
            data.mineros.forEach(minero => {
                const card = document.createElement('div');
                card.className = 'col';
                card.innerHTML = `
                <div>
                    <div class="card-body">
                        <h5 class="card-title">${minero.nombre}</h5>
                        <p class="card-text">Dinero: ${minero.dinero}</p>
                    </div>
                </div>
                `;
                minerosContainer.appendChild(card);
            });
        });

    fetch('http://localhost:5000/tipos_minas')
        .then(response => response.json())
        .then(data => {
            const tiposMinasContainer = document.getElementById('tipos-minas-container');
            data.tiposMinas.forEach(tipo => {
                const card = document.createElement('div');
                card.className = 'col';
                card.innerHTML = `
                <div>
                    <div class="card-body">
                        <h5 class="card-title">${tipo.nombre}</h5>
                    </div>
                </div>
                `;
                tiposMinasContainer.appendChild(card);
            });
        });

    fetch('http://localhost:5000/usuarios')
        .then(response => response.json())
        .then(data => {
            const usuariosContainer = document.getElementById('usuarios-container');
            data.usuarios.forEach(usuario => {
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
            });
        });

    fetch('http://localhost:5000/sesion', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        const authButtons = document.getElementById('botonesSesion');
        authButtons.innerHTML = '';

        if (data.usuario_id) {
            authButtons.innerHTML = `
                <a href="usuario/index.html?${data.usuario_id}" class="btn btn-primary">Mi perfil</a>
                <button id="cerrarSesion" class="btn btn-primary">Cerrar Sesión</button>
            `;

            const cerrarSesion = document.getElementById('cerrarSesion');

            cerrarSesion.addEventListener('click', function() {
                fetch('http://localhost:5000/cerrar_sesion', {
                    method: 'GET',
                    credentials: 'include'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Sesión cerrada exitosamente:', data);
                    alert('Sesión cerrada exitosamente');
                    window.location.href = '../index.html';
                })
                .catch(error => {
                    console.error('Error al cerrar sesión:', error);
                    alert('Hubo un error al cerrar la sesión. Por favor, inténtalo nuevamente.');
                });
            });
        } else {
            authButtons.innerHTML = `
                <a href="../login.html" class="btn btn-primary">Iniciar sesión</a>
            `;
        }
    })
    .catch(error => {
        console.error('Error al verificar sesión:', error);
    });

});
