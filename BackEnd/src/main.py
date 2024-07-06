from flask import Flask
from .config import Config
from .modelos import db, bcrypt
from .rutas import init_routes
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
    app.config.from_object(Config)
    db.init_app(app)
    bcrypt.init_app(app)

    with app.app_context():
        db.create_all()

    init_routes(app)

    return app


app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)
