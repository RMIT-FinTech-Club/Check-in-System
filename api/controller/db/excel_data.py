from flask import Blueprint, request, jsonify

excel_data_bp = Blueprint("excel_data", __name__)

@excel_data_bp.route('/')
def index():
    return "Excel database api index page"

@excel_data_bp.route('/<id>', methods=['GET'])
def get_excel_data(id: str):
    dummy_data = {
        "thisDataIsDummy": {
            "questions": [
                "1",
                "2"
            ]
        }
    }
    
    return jsonify(dummy_data.get(id, "Data not found"))
