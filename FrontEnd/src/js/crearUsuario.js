document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const dataUsuario = {
            nombre: document.getElementById('inputName').value,
            apellido: document.getElementById('inputLastName').value,
            email: document.getElementById('inputEmail3').value,
            nombre_usuario: document.getElementById('inputUserName').value,
            password: document.getElementById('inputPassword3').value
        };

        const url = 'http://localhost:5000/usuario';
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUsuario)
        };

        fetch(url, config)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert('Usuario creado exitosamente');
                window.location.href = '../index.html';
            })
            .catch(error => {
                console.error('Error al crear usuario:', error);
                alert('Hubo un error al crear el usuario. Por favor, inténtalo nuevamente.');//TODO: mostrar mensaje de error en el formulario
            });
    });
});
