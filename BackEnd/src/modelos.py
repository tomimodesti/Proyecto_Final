from datetime import datetime, timezone
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


# Tabla de los Mineros
class Mineros(db.Model):
    __tablename__ = 'mineros'
    minero_id: Mapped[int] = mapped_column(primary_key=True)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuario.usuario_id"))
    tipo_minador_id: Mapped[int] = mapped_column(ForeignKey("tipos_minas.tipo_id"))
    nombre: Mapped[str] = mapped_column(unique=True)
    dinero: Mapped[int] = mapped_column(default=0)
    terminada: Mapped[bool] = mapped_column(default=False)
    fecha_creacion: Mapped[datetime] = mapped_column(default=lambda: datetime.now(timezone.utc))


# Tabla de las minas en sí
class TiposMinas(db.Model):
    __tablename__ = 'tipos_minas'
    tipo_id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(unique=True)
    coste: Mapped[int] = mapped_column(nullable=False)
    dinero_generado: Mapped[int] = mapped_column(default=0, nullable=False)
    tiempo_mineria: Mapped[int] = mapped_column(nullable=False)


# Tabla de usuario
class Usuario(db.Model):
    __tablename__ = 'usuario'
    usuario_id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(unique=True)
    apellido: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    nombre_usuario: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str] = mapped_column(nullable=False)
    dinero: Mapped[int] = mapped_column(default=0)
    fecha_creacion: Mapped[datetime] = mapped_column(default=lambda: datetime.now(timezone.utc))
