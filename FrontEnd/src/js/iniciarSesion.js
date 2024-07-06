document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('loginForm');

            form.addEventListener('submit', function(event) {
                event.preventDefault();
                fetch('http://localhost:5000/iniciar_sesion', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombre_usuario: document.getElementById('inputNombreUsuario').value,
                        password: document.getElementById('inputPassword3').value
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Usuario logueado exitosamente:', data);
                    alert('Usuario logueado exitosamente');
                    window.location.href = 'index.html';
                })
                .catch(error => {
                    console.error('Error al loguear usuario:', error);
                    alert('Hubo un error al loguear el usuario. Por favor, inténtalo nuevamente.');
                });
            });
});
