from flask import request, jsonify
from .modelos import Mineros, Usuario, db, TiposMinas


def init_routes(app):
    @app.route('/', methods=['GET'])
    def index():
        return """
            <html>
            <body>
            <h1>Bienvenido a la API de Mineros</h1>
            <a href="/mineros">Mineros</a>
            <a href="/tipos_minas">Tipo de minas</a>
            <a href="/usuarios">usuario</a>
            </body>
            </html>
            """

    @app.route('/mineros', methods=['GET'])
    def mineros():
        try:
            mineros = Mineros.query.all()
            mineros_data = []
            for minero in mineros:
                minero_data = {
                    'id': minero.minero_id,
                    'nombre': minero.nombre,
                    'dinero': minero.dinero,
                }
                mineros_data.append(minero_data)
            return jsonify({'mineros': mineros_data})
        except Exception as error:
            print('Error al cargar datos', error)
            return jsonify({'error al cargar datos de Mineros'}), 500

    @app.route('/minero', methods=['POST'])
    def crear_minero():
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

    @app.route('/minero/<int:id_minero>', methods=['GET', 'PUT', 'DELETE'])
    def minero(id_minero):
        try:
            minero = Mineros.query.get_or_404(id_minero)
            minero_data = {
                'id': minero.minero_id,
                'nombre': minero.nombre,
                'dinero': minero.dinero
            }
            return jsonify({'minero': minero_data})
        except Exception as error:
            print('Error al cargar datos', error)
            return jsonify({'Error al cargar datos de minero ID: ', id_minero}), 500

    @app.route('/usuarios', methods=['GET'])
    def usuarios():
        try:
            usuarios = Usuario.query.all()
            usuarios_data = []
            for usuario in usuarios:
                usuario_data = {
                    'id': usuario.usuario_id,
                    'nombre': usuario.nombre,
                    'apellido': usuario.apellido,
                    'email': usuario.email,
                    'nombre_usuario': usuario.nombre_usuario,
                    'dinero': usuario.dinero
                }
                usuarios_data.append(usuario_data)
            return jsonify({'usuarios': usuarios_data})
        except Exception as error:
            print('Error al cargar datos', error)
            return jsonify({'Error al cargar datos de usuario'}), 500

    @app.route('/usuario', methods=['POST'])
    def crear_usuario():
        try:
            data = request.get_json()
            nombre = data.get("nombre")
            apellido = data.get("apellido")
            email = data.get("email")
            nombre_usuario = data.get("nombre_usuario")
            password = data.get("password")
            nuevo_usuario = Usuario(nombre=nombre, apellido=apellido, email=email, nombre_usuario=nombre_usuario, password=password)
            db.session.add(nuevo_usuario)
            db.session.commit()
            return jsonify('Usuario creado exitosamente'), 201
        except Exception as error:
            print('Error al crear usuario', error)
            return jsonify('Error al crear usuario'), 500

    @app.route('/usuario/<int:id_usuario>', methods=['GET', 'PUT', 'DELETE'])
    def usuario(id_usuario):
        try:
            usuario = Usuario.query.get_or_404(id_usuario)
            if request.method == 'GET':
                usuario_data = {
                    'id': usuario.usuario_id,
                    'nombre': usuario.nombre,
                    'dinero': usuario.dinero
                }
                return jsonify({'Usuario': usuario_data})
            elif request.method == 'PUT':
                data = request.get_json()
                usuario.nombre = data.get("nombre")
                db.session.commit()
                return jsonify({'Usuario id:', id_usuario, ' actualizado exitosamente'})
            elif request.method == 'DELETE':
                db.session.delete(usuario)
                db.session.commit()
                return jsonify({'Usuario id:', id_usuario, ' eliminado exitosamente'})
        except Exception as error:
            print('Error al cargar datos', error)
            return jsonify({'Error al cargar datos de usuario ID: ', id_usuario}), 500

    @app.route('/tipos_minas', methods=['GET'])
    def tipos_minas():
        try:
            tipos_minas = TiposMinas.query.all()
            tipos_minas_data = []
            for tipo_mina in tipos_minas:
                tipo_mina_data = {
                    'id': tipo_mina.tipo_id,
                    'nombre': tipo_mina.nombre,
                    'coste': tipo_mina.coste,
                    'dinero_generado': tipo_mina.dinero_generado,
                    'tiempo_mineria': tipo_mina.tiempo_mineria
                }
                tipos_minas_data.append(tipo_mina_data)
            return jsonify({'tiposMinas': tipos_minas_data})
        except Exception as error:
            print('Error al cargar datos', error)
            return jsonify({'Error al cargar datos de Tipos Minas'}), 500

    @app.route('/tipo_mina', methods=['POST'])
    def crear_tipo_mina():
        try:
            data = request.get_json()
            nombre = data.get("nombre")
            coste = data.get("coste")
            dinero_generado = data.get("dinero_generado")
            tiempo_mineria = data.get("tiempo_mineria")
            nuevo_tipo_mina = TiposMinas(nombre=nombre, coste=coste, dinero_generado=dinero_generado, tiempo_mineria=tiempo_mineria)
            db.session.add(nuevo_tipo_mina)
            db.session.commit()
            return jsonify('Tipo Mina creado exitosamente'), 201
        except Exception as error:
            print('Error al crear tipo mina', error)
            return jsonify('Error al crear tipo mina'), 500

    @app.route('/tipo_mina/<int:id_tipo_mina>', methods=['GET', 'PUT', 'DELETE'])
    def tipo_mina(id_tipo_mina):
        try:
            tipo_mina = TiposMinas.query.get_or_404(id_tipo_mina)
            if request.method == 'GET':
                tipo_mina_data = {
                    'id': tipo_mina.tipo_id,
                    'nombre': tipo_mina.nombre,
                    'coste': tipo_mina.coste,
                    'dinero_generado': tipo_mina.dinero_generado,
                    'tiempo_mineria': tipo_mina.tiempo_mineria
                }
                return jsonify({'Tipo Mina': tipo_mina_data})
            elif request.method == 'PUT':
                data = request.get_json()
                tipo_mina.nombre = data.get("nombre")
                tipo_mina.coste = data.get("coste")
                tipo_mina.dinero_generado = data.get("dinero_generado")
                tipo_mina.tiempo_mineria = data.get("tiempo_mineria")
                db.session.commit()
                return jsonify({'Tipo Mina id:', id_tipo_mina, ' actualizado exitosamente'})
            elif request.method == 'DELETE':
                db.session.delete(tipo_mina)
                db.session.commit()
                return jsonify({'Tipo Mina id:', id_tipo_mina, ' eliminado exitosamente'})
        except Exception as error:
            print('Error al cargar datos', error)
            return jsonify({'Error al cargar datos de tipo mina ID: ', id_tipo_mina}), 500
