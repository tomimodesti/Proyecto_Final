document.addEventListener('DOMContentLoaded', function() {

    const urlParams = new URLSearchParams(window.location.search);
    const id_user = urlParams.get('id'); 

    if(id_user){

    fetch(`http://localhost:5000/mineros/${id_user}`)
        .then(response => response.json())
        .then(data => {

            const minerosContainer = document.getElementById('mineros-container');
            data.mineros.forEach(minero => {
                const card = document.createElement('div');
                card.className = 'col';
                card.innerHTML = `
                <div>
                    <div class="card-body">
                        <h5 class="card-title">${minero.nombre}</h5>
                        <p class="card-text">Dinero: ${minero.dinero}</p>
                        <p class="card-text">Tipo Mina: ${minero.tipo_minador_id}</p>
                    </div>
                </div>
                `;
                minerosContainer.appendChild(card);
            });
        });
    }
;})