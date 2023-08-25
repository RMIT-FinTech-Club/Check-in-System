from flask import Flask
from controller.test import hello_world
from controller.objectDetection import objectDetection_blueprint
app = Flask(__name__)
app.register_blueprint(objectDetection_blueprint, url_prefix="/api/id-detection")


@app.route("/api/python")
def use_hello_world():
    return hello_world()


