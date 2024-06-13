import datetime
from flask_sqlalchemy import SQLAlchemy 

Tabla=SQLAlchemy()

#Tabla de los Mineros
class Mineros(Tabla.Model):
    __tablename__='Mineros'
    id_minero: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(unique=True)
    dinero: Mapped[int] = mapped_column(default: 0,)
    creacion: Mapped[datetime] = mapped_column(default=lambda: datetime.now(timezone.utc))

#tabla de la minas en si
class Minas(Tabla.model):
    __tablename__='tipos_minas'
    id_tipo_mina: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(unique=True)
    dinero_generado: Mapped[int] = mapped_column(default=0 ,nullable=False)
    tiempo_mineria: Mapped[int] = mapped_column(,nullable=False)
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


