document.addEventListener('DOMContentLoaded', function() {

const urlParams = new URLSearchParams(window.location.search);
const id_user = urlParams.get('id');

if(id_user){
    alert("en proceso..")
    fetch(`http://localhost:5000/usuario/${id_user}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        const usuario = data.Usuario;

        if (usuario) {
            const nombre=document.getElementById('inputName')
            nombre.value=usuario.nombre
            const apellido=document.getElementById('inputLastName')
            apellido.value=usuario.apellido
            const email=document.getElementById('inputEmail3')
            email.value=usuario.email
            const username=document.getElementById('inputUserName')
            username.value=usuario.nombre_usuario
            const password=document.getElementById('inputPassword3')
            password.value=usuario.password
        } else {
            console.error('Usuario no encontrado en la respuesta.');
        }
    })
    .catch(error => {
        console.error('Error al cargar datos:', error);
    });
}else{
    alert("error al cargar datos del usuario 1")
}

})