from flask import Flask
# from flask_cors import CORS
# Importing blueprints
from controller.excel.pyxcel import pyxcel_bp
from controller.objectDetection.object_detection import objectDetection_bp
from controller.db.excel_data import excel_data_bp
# Import socket intialize object
from controller.socket.socketio import socketio

app = Flask(__name__)
# CORS(app)

app.register_blueprint(pyxcel_bp, url_prefix='/api/excel')
app.register_blueprint(objectDetection_bp, url_prefix='/api/objectDetection')
app.register_blueprint(excel_data_bp, url_prefix='/api/excelData')

# Initialize socket io
socketio.init_app(app)

# Routes
@app.route("/api/python")
def use_hello_world():
    return "<div>Hello World!</div>"
