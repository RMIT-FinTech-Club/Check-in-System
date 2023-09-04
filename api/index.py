from flask import Flask
from controller.excel.pyxcel import pyxcel_bp
from controller.test import hello_world
from controller.objectDetection import objectDetection_blueprint
app = Flask(__name__)
app.register_blueprint(objectDetection_blueprint, url_prefix="/api/id-detection")
app.register_blueprint(pyxcel_bp, url_prefix='/api/excel')


# Routes
@app.route("/api/python")
def use_hello_world():
    return hello_world()


