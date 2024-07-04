document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/mineros')
        .then(response => response.json())
        .then(data => {
            const minerosContainer = document.getElementById('mineros-container');
            data.mineros.forEach(minero => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${minero.nombre}</h5>
                        <p class="card-text">Dinero: ${minero.dinero}</p>
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
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${tipo.nombre}</h5>
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
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${usuario.nombre}(${usuario.nombre_usuario})</h5>
                        <p class="card-text">Apellido: ${usuario.apellido}</p>
                        <p class="card-text">Email: ${usuario.email}</p>
                        <p class="card-text">Dinero: ${usuario.dinero}</p>
                    </div>
                `;
                usuariosContainer.appendChild(card);
            });
        });
});
