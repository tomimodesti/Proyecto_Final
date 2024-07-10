document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id_minero = urlParams.get('id');
    const form = document.querySelector('#formMinero');
    const cartasTiposMinas = document.getElementById('CartasTiposMinas');

    document.getElementById('ModificarMinero').addEventListener('click', function(event) {
        event.preventDefault();
        const tipoMinador = document.querySelector('input[name="tipoMina"]:checked');
        const dataMinero = {
            nombre: form.inputName.value,
            tipo_minador: tipoMinador.value,
        };

        fetch(`http://localhost:5000/minero/${id_minero}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataMinero)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert('Minero modificado exitosamente');
            window.location.href = `..?id=${id_minero}`;
        })
        .catch(error => {
            console.error('Error al modificar Minero:', error);
            alert('Hubo un error al modificar el Minero. Por favor, inténtalo nuevamente.');
        });
    });

    const renderTiposMinas = (tiposMinas) => {
        tiposMinas.forEach(tipoMina => {
            const carta = document.createElement('div');
            carta.classList.add('col-md-4', 'mb-4');
            carta.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${tipoMina.nombre}</h5>
                        <p class="card-text">Coste: ${tipoMina.coste}</p>
                        <p class="card-text">Dinero que genera: ${tipoMina.dinero_generado}</p>
                        <p class="card-text">Tiempo demora: ${tipoMina.tiempo_mineria}</p>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="tipoMina" id="tipoMina${tipoMina.id}" value="${tipoMina.id}">
                            <label class="form-check-label" for="tipoMina${tipoMina.id}">
                                Seleccionar
                            </label>
                        </div>
                    </div>
                </div>
            `;
            cartasTiposMinas.appendChild(carta);
        });
    };

    fetch('http://localhost:5000/tipos_minas')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            renderTiposMinas(data.tiposMinas);
        })
        .catch(error => console.error('Error al obtener tipos de minas:', error));

    fetch(`http://localhost:5000/minero/${id_minero}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.minero) {
                form.inputName.value = data.minero.nombre;
                document.getElementById(`tipoMina${data.minero.tipo_minador}`).checked = true;
            }
        })
        .catch(error => {
            console.error('Error al acceder al minero:', error);
            alert('Error al acceder al minero, reintente');
        });

       
    document.getElementById('EliminarMinero').addEventListener('click',function(event){
        event.preventDefault();
        if(id_minero){
        const confirmacion= window.confirm('Seguro que quieres borrar los datos de tu minero?');
        if(confirmacion){
            fetch(`http://localhost:5000/minero/${id_minero}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                if(!response.ok){
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            })
            .then(data =>{
                alert('Minero eliminado exitosamente');
                window.location.href = "../../";
            })
            .catch(error =>{
                console.error('Error al eliminar Minero:', error);
                alert('Hubo un error al eliminar el Minero. Por favor, inténtalo nuevamente.');
            })
        }else{
            window.location.reload();
        }
}
    
})

});