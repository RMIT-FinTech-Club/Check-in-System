from flask import Flask
from controller.test import hello_world
app = Flask(__name__)


@app.route("/api/python")
def use_hello_world():
    return hello_world()
