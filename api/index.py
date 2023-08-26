from flask import Flask
from controller.excel.pyxcel import pyxcel_bp
from controller.test import hello_world

app = Flask(__name__)
app.register_blueprint(pyxcel_bp, url_prefix='/api/excel')


# Routes
@app.route("/api/python")
def use_hello_world():
    return hello_world()
