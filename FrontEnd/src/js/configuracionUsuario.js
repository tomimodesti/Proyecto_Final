document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id_user = urlParams.get('id');

    if (id_user) {
        fetch(`http://localhost:5000/usuario/${id_user}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const usuario = data.Usuario;

            if (usuario && usuario.mi_perfil) {
                document.getElementById('inputName').value = usuario.nombre;
                document.getElementById('inputLastName').value = usuario.apellido;
                document.getElementById('inputEmail3').value = usuario.email;
                document.getElementById('inputUserName').value = usuario.nombre_usuario;
            } else {
                window.location.href = '/';
            }
        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
            alert('Hubo un error al cargar los datos del usuario.');
            window.location.href = '/';
        });
    } else {
        alert("Error al cargar datos del usuario");
        window.location.href = '/';
    }

    document.getElementById('formUsuario').addEventListener('submit', function(event) {
        event.preventDefault();
        editarUsuario();
    });

    document.getElementById('botonEliminarUsuario').addEventListener('click', function() {
        eliminarUsuario();
    });
});

function eliminarUsuario() {
    const urlParams = new URLSearchParams(window.location.search);
    const id_user = urlParams.get('id');

    if (id_user) {
        const confirmacion = window.confirm("¿Seguro que quieres borrar todos los datos de tu usuario?");

        if (confirmacion) {
            fetch(`http://localhost:5000/usuario/${id_user}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.Mensaje === "Usuario eliminado exitosamente") {
                    alert(data.Mensaje);
                    window.location.href = '../../index.html';
                } else {
                    alert('Error al eliminar usuario')
                    window.location.href = '../index.html';
                }
            })
            .catch(error => {
                console.error('Error al eliminar el usuario:', error);
                alert('Hubo un error al eliminar el usuario');
            });
        }
    } else {
        alert("Error al borrar los datos del usuario");
    }
}

function editarUsuario() {
    const urlParams = new URLSearchParams(window.location.search);
    const id_user = urlParams.get('id');

    if (id_user) {
        fetch(`http://localhost:5000/usuario/${id_user}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: document.getElementById('inputName').value,
                apellido: document.getElementById('inputLastName').value,
                email: document.getElementById('inputEmail3').value,
                nombre_usuario: document.getElementById('inputUserName').value,
                password: document.getElementById('inputPassword3').value
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.Mensaje === "Usuario actualizado exitosamente") {
                alert('Usuario actualizado correctamente');
                window.location.href = `../index.html?id=${id_user}`;
            } else {
                alert('Error al actualizar usuario');
            }
        })
        .catch(error => {
            console.error('Error con modificar datos:', error);
            alert('Hubo un error al actualizar el usuario.');
        });
    } else {
        alert("Error al actualizar usuario.");
    }
}