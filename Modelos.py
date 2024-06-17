import datetime
from flask_sqlalchemy import SQLAlchemy 
from sqlalchemy.orm import Mapped, mapped_column

Tabla=SQLAlchemy()

#Tabla de los Mineros
class Mineros(Tabla.Model):
    __tablename__='Mineros'
    id_minero: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(unique=True)
    dinero: Mapped[int] = mapped_column(default: 0,)
    creacion: Mapped[datetime] = mapped_column(default=lambda: datetime.now(timezone.utc))

#tabla de la minas en si
class tipos_minas(Tabla.model):
    __tablename__='tipos_minas'
    id_tipo_mina: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(unique=True)
    dinero_generado: Mapped[int] = mapped_column(default=0 ,nullable=False)
    tiempo_mineria: Mapped[int] = mapped_column(,nullable=False)
    

class Minas(Tabla.model):
    __tablename__='Minas'
    id_mina: Mapped[int] = mapped_column(primary_key=True)   
    user_id: Mapped[intpk] = mapped_column(ForeignKey("Mineros.id_minero"))
    tipo_minador_id: Mapped[intpk] = mapped_column(ForeignKey("Minas.id_tipo_mina"))
    fecha_creacion: Mapped[datetime] = mapped_column(default=lambda: datetime.now(timezone.utc)
    terminada: Mapped[bool] = mapped_column(default=False)
        
#( encontre este ejemplo espero que sea valido: id: Mapped[intpk] = mapped_column(ForeignKey("parent.id"))  )

with Tabla.app_context():
    Tabla.create_all()
