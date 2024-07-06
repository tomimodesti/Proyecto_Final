function EliminarUsuario() {

    const urlParams = new URLSearchParams(window.location.search);
    const id_user = urlParams.get('id');

    if(id_user){

    const confirmacion=window.confirm("Seguro que quieres borrar todos los datos de tu usuario?");
        
        if(confirmacion){
            fetch(`http://localhost:5000/usuario/${id_user}` ,{
                method : 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
            }
                return response.txt();
            })
            .then(data => {
                alert(`Usuario eliminado correctamente`);
                window.location.href = '/'; 
        })
        .catch(error => {
            console.error('Error al eliminar el usuario:', error);
            alert('Hubo un error al eliminar el usuario');
        });
        }else{
        alert("Cancelando eliminacion de usuario");
        }
    }
    else{
        alert("Errores al borrar los datos del usuario");
    }
}
  