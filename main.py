from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
#puse miles de import que me encontre, despues los podemos ir sacando
from flask import Flask, request, jsonify
from flask import flask,request
import datetime
from flask_sqlalchemy import SQLAlchemy 

#aca pondriamos los endpoints

app= flask(__name__)
port = 5000

@app.route('/')
def home():
    return "hello world"