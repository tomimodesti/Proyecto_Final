document.addEventListener('DOMContentLoaded', function() {
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
    })