# TP1

## Minero de criptomonedas
### Base de datos
3 tablas -> 
- usuarios:
  user_id
  nombre
  dinero   
  //fecha_alta

- tipo minador:
  minador_id
  tipo
  dinero generado
  fecha_alta
  tiempo que tarda
  
- minero:
  minero_id
  user_id
  tipo_minador_id
  fecha_creacion
### Bakckend
  

### Frontend
- Pagina principal con listado de usuarios y un boton para agregar nuevo usuario
- Pagina de creacion de usuario
- Pagina para ver cada usuario.
  * Dentro mostraria info de usario y mineros que tenga
  * Opcion para crear usuario
- Pagina tipo de minador


## Requisitos
- Configurar paramentros de base de datos en BackEnd/src/config.py

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