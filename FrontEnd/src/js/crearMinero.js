document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const dataMinero = {
        };

        const url = 'http://localhost:5000/minero';
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataMinero)
        };

        fetch(url, config)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Minero creado exitosamente:', data);
                alert('Minero creado exitosamente');
                window.location.href = '../index.html';
            })
            .catch(error => {
                console.error('Error al crear Minero:', error);
                alert('Hubo un error al crear el Minero. Por favor, inténtalo nuevamente.');//TODO: mostrar mensaje de error en el formulario
            });
    });
});
