document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/sesion', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        const urlParams = new URLSearchParams(window.location.search);
        const id_user = urlParams.get('id');
        const authButtons = document.getElementById('botonesSesion');
        authButtons.innerHTML = '';

        if (data.usuario_id) {
            if (window.location.pathname === '/usuario/' && id_user == data.usuario_id) {
                authButtons.innerHTML = `<a onclick="window.location.href=\`../usuario/edit/index.html?id=${id_user}\`" class="btn btn-secondary" >Modificar usuario </a>`;
            }

            authButtons.innerHTML += `
                <div style="margin: 0 15px">
                    <a href="/usuario?id=${data.usuario_id}" class="btn btn-primary">Mi perfil</a>
                    <button id="cerrarSesion" class="btn btn-primary">Cerrar Sesión</button>
                </div>
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
                    alert('Sesión cerrada exitosamente');
                    window.location.href = '/';
                })
                .catch(error => {
                    console.error('Error al cerrar sesión:', error);
                    alert('Hubo un error al cerrar la sesión. Por favor, inténtalo nuevamente.');
                });
            });
        } else {
            authButtons.innerHTML = `
                <a href="../login.html" class="btn btn-primary">Iniciar sesión</a>
                <a href="../crear/usuario.html" class="btn btn-primary">Registrarse</a>
            `;
        }
    })
    .catch(error => {
        console.error('Error al verificar sesión:', error);
    });
    })