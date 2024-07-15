# TP1 - Minero de Criptomonedas
### Descripción
Este proyecto es una página web simple desarrollada como parte del trabajo práctico para la materia Introducción al Desarrollo de Software. La aplicación permite a los usuarios registrarse y crear minadores de Bitcoin, acumulando dinero con el tiempo.

## Base de Datos
La base de datos consta de tres tablas:

### Usuarios
user_id: Identificador único del usuario.
nombre: Nombre del usuario.
dinero: Cantidad de dinero acumulado por el usuario.
fecha_alta: Fecha de registro del usuario.

### Tipo de Minador
minador_id: Identificador único del tipo de minador.
tipo: Tipo de minador.
dinero_generado: Dinero generado por el tipo de minador.
fecha_alta: Fecha de creación del tipo de minador.
tiempo_tarda: Tiempo que tarda en generar dinero.

### Minero
minero_id: Identificador único del minero.
user_id: Identificador del usuario propietario del minero.
tipo_minador_id: Identificador del tipo de minador.
fecha_creacion: Fecha de creación del minero.

## Backend
El backend está desarrollado con Flask y se encarga de manejar la lógica de negocio y las interacciones con la base de datos.

## Frontend
El frontend incluye las siguientes páginas:

- Página Principal: Listado de minadores, tipo de minas y usuarios.
- Página de creación de Usuario: Formulario para crear un nuevo usuario.
- Página de creación de Msuario: Formulario para crear un nuevo minero.
- Página de Usuario: Muestra la información del usuario y sus mineros.
- Página de Minador: Muestra la informacion de un minero y permite recolectar lo minado.


## Requisitos
- Configurar variables de base de datos agregando .env, siguiendo el modelo de .env.template.
- Revisar requirements.txt para ver las dependencias necesarias.

## Instalar
```bash
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r BackEnd/requirements.txt
```

## Correr
```bash
source venv/bin/activate
cd BackEnd/src
export FLASK_APP=main.py
export FLASK_ENV=development
flask run --debug
```

## Agregar datos
Para agregar tipo de minas a la base de datos se puede usar las siguientes querys:
- INSERT INTO tipos_minas (nombre, coste, dinero_generado, tiempo_mineria) VALUES ('Bitcoin', 50, 10,60);
- INSERT INTO tipos_minas (nombre, coste, dinero_generado, tiempo_mineria) VALUES ('Ethereum', 100, 20,120);
- INSERT INTO tipos_minas (nombre, coste, dinero_generado, tiempo_mineria) VALUES ('Litecoin', 150, 30,180);