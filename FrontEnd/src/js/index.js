document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/mineros')
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
                    </div>
                </div>
                `;
                minerosContainer.appendChild(card);
            });
        });

    fetch('http://localhost:5000/tipos_minas')
        .then(response => response.json())
        .then(data => {
            const tiposMinasContainer = document.getElementById('tipos-minas-container');
            data.tiposMinas.forEach(tipo => {
                const card = document.createElement('div');
                card.className = 'col';
                card.innerHTML = `
                <div>
                    <div class="card-body">
                        <h5 class="card-title">${tipo.nombre}</h5>
                    </div>
                </div>
                `;
                tiposMinasContainer.appendChild(card);
            });
        });

    fetch('http://localhost:5000/usuarios')
        .then(response => response.json())
        .then(data => {
            const usuariosContainer = document.getElementById('usuarios-container');
            console.log(data)
            data.usuarios.forEach(usuario => {
                const card = document.createElement('div');
                card.className = 'col';
                card.innerHTML = `
                <div class="card">
                    <div class="card-body m-4">
                        <h5 class="card-title"> Nombre: ${usuario.nombre} (@${usuario.nombre_usuario})</h5>
                        <p class="card-text">Apellido: ${usuario.apellido}</p>
                        <p class="card-text">Email: ${usuario.email}</p>
                        <p class="card-text">Dinero: ${usuario.dinero}</p>
                    </div>
                </div>
                `;
                usuariosContainer.appendChild(card);
            });
        });
});
