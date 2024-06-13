#from sqlalchemy import create_engine, Column, Integer, String
#from sqlalchemy.ext.declarative import declarative_base
#from sqlalchemy.orm import sessionmaker
#puse miles de import que me encontre, despues los podemos ir sacando

from flask import Flask, request, jsonify
from flask import request
import datetime
from Modelos import Tabla,Mineros, Minas, Minas_historial

#aca pondriamos los endpoints

app= Flask(__name__)
port = 5000



#aca hay que cambiar la url
app.config['SQLALCHEMY_DATABASE_URI']= 'jdbc:postgresql://localhost:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False


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
    
@app.route('/minero/${Id}',methods=['GET'])
def One_minero(id_minero):
    try:  
        # Tengo que ver como hacer la query de un minero especifico
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
    

if __name__== '__main__':
    Tabla.init_app(app)
    with app.app_context(app):
        Tabla.create_all()
    app.run(host='0.0.0.0',debug=True,port=port)