from flask import Flask
# from flask_cors import CORS
from socketManager import socketio
# Importing blueprints
from controller.excel.pyxcel import pyxcel_bp
from controller.test import hello_world
from controller.objectDetection.objectDetection import objectDetection_bp

app = Flask(__name__)
socketio.init_app(app)
# CORS(app)

app.register_blueprint(pyxcel_bp, url_prefix='/api/excel')
app.register_blueprint(objectDetection_bp, url_prefix='/api/objectDetection')

# Routes
@app.route("/api/python")
def use_hello_world():
    return hello_world()

if __name__ == '__main__':
    socketio.run(app, debug=True)