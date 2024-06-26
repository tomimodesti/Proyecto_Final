from datetime import datetime, timezone
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


# Tabla de los Mineros
class Mineros(db.Model):
    __tablename__ = 'Mineros'
    id_minero: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(unique=True)
    dinero: Mapped[int] = mapped_column(default=0)
    creacion: Mapped[datetime] = mapped_column(default=lambda: datetime.now(timezone.utc))


# Tabla de las minas en sí
class TiposMinas(db.Model):
    __tablename__ = 'tipos_minas'
    id_tipo: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(unique=True)
    dinero_generado: Mapped[int] = mapped_column(default=0, nullable=False)
    tiempo_mineria: Mapped[int] = mapped_column(nullable=False)


# Tabla de Minas
class Minas(db.Model):
    __tablename__ = 'Minas'
    id_mina: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("Mineros.id_minero"))
    tipo_minador_id: Mapped[int] = mapped_column(ForeignKey("tipos_minas.id_tipo"))
    fecha_creacion: Mapped[datetime] = mapped_column(default=lambda: datetime.now(timezone.utc))
    terminada: Mapped[bool] = mapped_column(default=False)


# Tabla de Usuarios
class Usuario(db.Model):
    __tablename__ = 'Usuario'
    usuario_id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(unique=True)
    dinero: Mapped[int] = mapped_column(default=0)
    fecha_creacion: Mapped[datetime] = mapped_column(default=lambda: datetime.now(timezone.utc))
