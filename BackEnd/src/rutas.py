from flask import request, jsonify
from .modelos import Mineros, Usuario, db


def init_routes(app):
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
            return jsonify({'error al cargar datos de Mineros'}), 500

    @app.route('/minero/<int:id_minero>', methods=['GET'])
    def minero(id_minero):
        try:
            minero = Mineros.query.get_or_404(id_minero)
            minero_data = {
                'Id': minero.id_minero,
                'Nombre': minero.nombre,
                'Dinero': minero.dinero
            }
            return jsonify({'Minero': minero_data})
        except Exception as error:
            print('Error al cargar datos', error)
            return jsonify({'Error al cargar datos de minero ID: ', id_minero}), 500

    @app.route('/crear/minero', methods=['POST'])
    def create_minero():
        try:
            data = request.get_json()
            nombre = data.get("nombre")
            tipo_minador = data.get("tipo_minador")
            usario_id = data.get("usuario_id")
            nuevo_minero = Mineros(nombre=nombre, tipo_minador_id=tipo_minador, id_usuario=usario_id)
            db.session.add(nuevo_minero)
            db.session.commit()
            return jsonify({'Mensaje': 'Minero creado exitosamente'}), 201
        except Exception as error:
            print('Error al crear minero', error)
            return jsonify({'Error al crear minero'}), 500

    @app.route('/crear/usuario', methods=['POST'])
    def create_usuario():
        try:
            data = request.get_json()
            nombre = data.get("nombre")
            nuevo_usuario = Usuario(nombre=nombre)
            db.session.add(nuevo_usuario)
            db.session.commit()
            return jsonify('Usuario creado exitosamente'), 201
        except Exception as error:
            print('Error al crear usuario', error)
            return jsonify('Error al crear usuario'), 500
