#puse miles de import que me encontre, despues los podemos ir sacand
#from sqlalchemy import create_engine, Column, Integer, String
#from sqlalchemy.ext.declarative import declarative_base
#from sqlalchemy.orm import sessionmaker

from flask import Flask, request, jsonify
import datetime
from Modelos import Tabla, Mineros, Minas, tipos_minas

#aca pondriamos los endpoints

app= Flask(__name__)
port = 5000

#aca hay que cambiar la url
app.config['SQLALCHEMY_DATABASE_URI']= 'jdbc:postgresql://localhost:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

#endpoint para obtener todos los datos de todos los usuarios
@app.route('/',methods=['GET'])
def All_mineros():
    try:
        minero=Mineros.Query.all()
        minero_data=[]
        for Minero in minero:
            Minero_data={
                'Id':Minero.id,
                'Nombre':Minero.nombre,
                'Dinero':Minero.dinero,
            }
            minero_data.append(Minero_data)
        return jsonify({'Mineros':minero_data})
    except Exception as error:
        print('Error al cargar datos',error)
        return jsonify({'Mensaje: Error al cargar datos'})

#endpoint para obtener los datos de solo un usuario
@app.route('/minero/${Id}',methods=['GET'])
def One_minero(id_minero):
    try:  
        # Tengo que ver como hacer la query de un minero especifico
        minero=Mineros.SQLAlchemy.get_or_404(id_minero)
        #supuestamente cambio la forma de hacer query
        #minero=Tabla.session.execute(Tabla.select(Mineros).oreder_by(Mineros.id_minero)).scalars()
        minero_data=[]
        
        Minero_data={
            'Id':minero.id,
            'Nombre':minero.nombre,
            'Dinero':minero.dinero,
        }
        minero_data.append(Minero_data)
        return jsonify({'Mineros':minero_data})
    except Exception as error:
        print('Error al cargar datos',error)
        return jsonify({'Mensaje: Error al cargar datos'})

#endpoint para crear un nuevo minero (usuario)
@app.route('/crear/minero',methods=['POST'])
def create_minero():
    try:  
       #le pasariamos el nombre de usuario a traves de la request, como tanto dinero y fecha de creacion son dados por default
        data = request.get_json()
        #nuevo_minero=Minero(
        #nombre=request.form["nombre"]
        #)
        nombre=data.get("nombre")
        nuevo_minero=Mineros(nombre=nombre)
       
        Tabla.session.add(nuevo_minero)
        Tabla.session.commit()
       
        return jsonify({'Minero creado exitosamente'})
    except Exception as error:
        print('Error al cargar datos',error)
        return jsonify({'Mensaje: Error al cargar datos'})
    

if __name__== '__main__':
    Tabla.init_app(app)
    with app.app_context(app):
        Tabla.create_all()
    app.run(host='0.0.0.0',debug=True,port=port)
