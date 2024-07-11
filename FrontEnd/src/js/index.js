document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/mineros')
        .then(response => response.json())
        .then(data => {
            const minerosContainer = document.getElementById('mineros-container');
            data.mineros.forEach(minero => {
                const card = document.createElement('div');
                card.className = 'col';
                card.innerHTML = `
                    <div class="card mb-3 border-card" style="cursor: pointer">
                        <div class="card-body">
                            <h5 class="card-title">${minero.nombre}</h5>
                            <p class="card-text">Dinero: ${minero.dinero}</p>
                        </div>
                    </div>
                `;
                card.addEventListener('click', () => {
                    window.location.href = `/minero?id=${minero.id}`;
                });
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
                    <div class="card mb-3 border-card">
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
            data.usuarios.forEach(usuario => {
                const card = document.createElement('div');
                card.className = 'col';
                card.innerHTML = `
                    <div class="card mb-3 border-card" style="cursor: pointer">
                        <div class="card-body">
                            <h5 class="card-title">Nombre: ${usuario.nombre} (@${usuario.nombre_usuario})</h5>
                            <p class="card-text">Apellido: ${usuario.apellido}</p>
                            <p class="card-text">Email: ${usuario.email}</p>
                            <p class="card-text">Dinero: ${usuario.dinero}</p>
                        </div>
                    </div>
                `;
                card.addEventListener('click', () => {
                    window.location.href = `/usuario?id=${usuario.id}`;
                });
                usuariosContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    document.querySelectorAll('.toggle-section').forEach(header => {
        header.addEventListener('click', function() {
            const target = document.querySelector(this.getAttribute('data-target'));
            if (target.style.display === 'none' || target.style.display === '') {
                target.style.display = 'flex';
                header.classList.remove('collapsed');
            } else {
                target.style.display = 'none';
                header.classList.add('collapsed');
            }
        });
    });
});
