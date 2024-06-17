from flask import Flask, request, jsonify
from Modelos import Tabla, Mineros, Minas, TiposMinas, Usuario

app = Flask(__name__)
port = 5000

#aca hay que cambiar la url
app.config['SQLALCHEMY_DATABASE_URI']= 'jdbc:postgresql://localhost:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

Tabla.init_app(app)


# Endpoint para obtener todos los datos de todos los usuarios
@app.route('/', methods=['GET'])
def mineros():
    try:
        mineros = Mineros.query.all()
        mineros_data = []
        for minero in mineros:
            minero_data = {
                'Id': minero.id_minero,
                'Nombre': minero.nombre,
                'Dinero': minero.dinero,
            }
            mineros_data.append(minero_data)
        return jsonify({'Mineros': mineros_data})
    except Exception as error:
        print('Error al cargar datos', error)
        return jsonify({'Mensaje Error al cargar datos'})


#endpoint para obtener losd datos de solo un usuario
@app.route('/minero/<int:id_minero>', methods=['GET'])
def minero(id_minero):
    try:
        minero = Mineros.query.get_or_404(id_minero)
        minero_data = {
            'Id': minero.id_minero,
            'Nombre': minero.nombre,
            'Dinero': minero.dinero,
        }
        return jsonify({'Minero': minero_data})
    except Exception as error:
        print('Error al cargar datos', error)
        return jsonify({'Mensaje: Error al cargar datos'})


# Endpoint para crear un nuevo minero (usuario)
@app.route('/crear/minero', methods=['POST'])
def create_minero():
    try:  
       #le pasariamos el nombre de usuario a traves de la request, como tanto dinero y fecha de creacion son dados por default
        data = request.get_json()
        nombre = data.get("nombre")
        nuevo_minero = Mineros(nombre=nombre)

        Tabla.session.add(nuevo_minero)
        Tabla.session.commit()

        return jsonify({'Mensaje': 'Minero creado exitosamente'})
    except Exception as error:
        print('Error al crear minero', error)
        return jsonify({'Mensaje: Error al crear minero'})


# Endpoint para crear un nuevo usuario
@app.route('/crear/usuario', methods=['POST'])
def create_usuario():
    try:
        data = request.get_json()
        nombre = data.get("nombre")
        nuevo_usuario = Usuario(nombre=nombre)

        Tabla.session.add(nuevo_usuario)
        Tabla.session.commit()

        return jsonify({'Mensaje': 'Usuario creado exitosamente'})
    except Exception as error:
        print('Error al crear usuario', error)
        return jsonify({'Mensaje': 'Error al crear usuario'})


if __name__ == '__main__':
    with app.app_context():
        Tabla.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)
