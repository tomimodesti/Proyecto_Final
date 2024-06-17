import datetime
from datetime import timezone
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey

app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///minas.db'
Tabla = SQLAlchemy(app)


# Tabla de los Mineros
class Mineros(Tabla.Model):
    __tablename__ = 'Mineros'
    id_minero: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(unique=True)
    dinero: Mapped[int] = mapped_column(default=0)
    creacion: Mapped[datetime.datetime] = mapped_column(default=lambda: datetime.datetime.now(timezone.utc))


# Tabla de las minas en sí
class TiposMinas(Tabla.Model):
    __tablename__ = 'tipos_minas'
    id_tipo: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(unique=True)
    dinero_generado: Mapped[int] = mapped_column(default=0, nullable=False)
    tiempo_mineria: Mapped[int] = mapped_column(nullable=False)


# Tabla de Minas
class Minas(Tabla.Model):
    __tablename__ = 'Minas'
    id_mina: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("Mineros.id_minero"))
    tipo_minador_id: Mapped[int] = mapped_column(ForeignKey("tipos_minas.id_tipo_mina"))
    fecha_creacion: Mapped[datetime.datetime] = mapped_column(default=lambda: datetime.datetime.now(timezone.utc))
    terminada: Mapped[bool] = mapped_column(default=False)


# Tabla de Usuarios
class Usuario(Tabla.Model):
    __tablename__ = 'Usuario'
    usuario_id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(unique=True)
    dinero: Mapped[int] = mapped_column(default=0)
    fecha_creacion: Mapped[datetime.datetime] = mapped_column(default=lambda: datetime.datetime.now(timezone.utc))


# Crear todas las tablas
with app.app_context():
    Tabla.create_all()
