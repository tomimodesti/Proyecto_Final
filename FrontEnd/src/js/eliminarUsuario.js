const urlParams = new URLSearchParams(window.location.search);
const id_user = urlParams.get('id');
function eliminarUsuario() {
    if(id_user){
        const confirmacion=window.confirm("Seguro que quieres borrar todos los datos de tu usuario?");
        
        if(confirmacion){
            fetch(`http://localhost:5000/usuario/${id_user}` ,{
                method : 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
            }
                return response.JSON();
            })
            .then(data => {
                alert(`Usuario eliminado correctamente`);
                window.location.href = '/'; 
            })
            .catch(error => {
                console.error('Error al eliminar el usuario:', error);
                alert('Hubo un error al eliminar el usuario');
            });
        }
    }
    else{
        alert("Errores al borrar los datos del usuario");
    }
}

function editarUsuario() {
   document.preventDefault();

    if(id_user){
        fetch(`http://localhost:5000/usuario/${id_user}` ,{
            method : 'PUT',
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
            alert(`Usuario actualizado correctamente`);
            window.location.href = `/usuario?id=${id_user}`;
            return data.json();
    })
    .catch(error => {
        console.error('Error con modificar datos 1:', error);
        alert('Hubo un error al actualizar el usuario');
    });
    }
    else{
        alert("Error al actualizar usuario 2");
    }
}

  