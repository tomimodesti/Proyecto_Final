from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#puse miles de import que me encontre, despues los podemos ir sacando
from flask import Flask, request, jsonify
from flask import request
import datetime
from flask_sqlalchemy import SQLAlchemy 

app= Flask(__name__)
port = 5000

#aca hay que cambiar la url
app.config['SQLALCHEMY_DATABASE_URI']= 'jdbc:postgresql://localhost:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

Tabla=SQLAlchemy()

if __name__ == "__main__":
    app.run(host="0.0.0.0" , debug=True, port=port)

#Tabla de los usuarios
class Mineros (Tabla.model):
    __tablename__='Mineros'
    id_minero=Tabla.column(Tabla.Integrer,primary_key=True)
    nombre=Tabla.column(Tabla.String(255),Nullable=False)
    dinero=Tabla.column(Tabla.Integrer,Nullable=False)
    Creacion=Tabla.column(Tabla.DateTime,default=datetime.datetime.now())

#tabla de la minas en si
class Minas (Tabla.model):
    __tablename__='Tipos_minas'
    id_tipo_mina=Tabla.column(Tabla.Integrer,primary_key=True)
    nombre=Tabla.column(Tabla.Integrer,Nullable=False)
    dinero_generado=Tabla.column(Tabla.Integrer,Nullable=False)
    #aca iria cuanto tiempo tarda (tengo que buscar como hacerlo :)  )

#aca se deberian poner todas las minas, activas e inactivas (osea que ya fueron "minadas")
class Minas_historial(Tabla.model):
    __tablename__='Minas'
    id_mina=Tabla.column(Tabla.Integrer,primay_key=True)
    #esta es la foreing key que te lleva a quien la mino
    id_minero=Tabla.column(Tabla.Integrer,Tabla.ForeignKey('mineros.id'))
    #y esta la que te lleva a que tipo de mina minó
    id_mina=Tabla.column(Tabla.Integrer,Tabla.Foreignkey('Minas.id'))
    #esto es opcional si lo quisieramos poner
    fecha_comienzo=Tabla.column(Tabla.DateTime,default=datetime.datetime.now())
    #esto representa si ya tomo el dinero que genero la mina
    minada=Tabla.column(Tabla.bolean,default=False)
    #esto es el tiempo en el que se puede tomar
    feacha_final=Tabla.column(Tabla.DateTime,nullable=False)


