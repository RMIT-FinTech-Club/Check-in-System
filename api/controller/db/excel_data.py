import redis
import json
import uuid
from flask import Blueprint, request, jsonify
from pymongo.mongo_client import MongoClient
from urllib.parse import quote_plus, unquote, quote
from bson import ObjectId

excel_data_bp = Blueprint("excel_data", __name__)

r = redis.Redis(
    host="localhost",
    port=6379,
)

username = quote_plus("fintech")
password = quote_plus("poiuytrewq")

uri = f"mongodb+srv://{username}:{password}@checker-cluster.ptsb8e0.mongodb.net/?retryWrites=true&w=majority&appName=Checker-Cluster"

# Create a new client and connect to the server
client = MongoClient(uri)

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(f"An error occurred while connecting to the server: {e}")

db = client["checker"]
excel_data_col = db["excel_data"]
# id = excel_data_col.find_one({'url': "https://rmiteduau.sharepoint.com/:x:/r/sites/RMITFinTechClub2023/Shared%20Documents/2023%20FinTech%20Club%20Master%20Folder/Sem%20B/Departments/Technology/Computer%20Vision%20Project/Book.xlsx?d=wc133eaeca703446686947dd77f977172&csf=1&web=1&e=Tl81AC"})
# print(id)

@excel_data_bp.route('/')
def index():
    return "Excel database api index page"

@excel_data_bp.route('/db', methods=['POST'])
def set_question():
    # return "Why are setting questions?"

    data = request.get_json()
    if data is None:
        return jsonify({'message': 'no data provided'}), 400
    if data.get('url') is None:
        return jsonify({'message': 'no url provided'}), 400
    
    # Store excel item in Database
    excel_data_col.insert_one({
        'url': data.get('url'),
        'questions': data.get('questions')
    })

    # print("Question set successfully in Redis.")
    return jsonify({'message': 'Question set successfully in Database.'}), 200


@excel_data_bp.route('/db/<id>', methods=['PUT'])
def update_question(id: str):
    exist_data = excel_data_col.find_one({'_id': ObjectId(id)})
    questions = request.get_json().get('questions', None)

    if exist_data is None:
        return jsonify({'message': 'no data exist'}), 400

    if questions is None:
        return jsonify({'message': 'no data provided'}), 400

    # Store excel item in MongoDB
    excel_data_col.update_one({'_id': ObjectId(id)}, {'$set': {'questions': questions}})

    # print("Question set successfully in Redis.")
    return jsonify({'message': 'Question updated successfully in Redis.'}), 200


@excel_data_bp.route('/db/id', methods=['GET'])
def get_id():
    url = request.args.get('url')
    # questions = request.get_json().get('url', None)
    # url = quote(url, safe='')

    # print(url)
    # print("https://rmiteduau.sharepoint.com/:x:/r/sites/RMITFinTechClub2023/_layouts/15/Doc.aspx?sourcedoc%3D%257BE0A89205-2787-4181-BEF8-6535DB1A06D0%257D%26file%3Dtest.xlsx%26action%3Ddefault%26mobileredirect%3Dtrue")

    if url is None:
        return jsonify({'message': 'no url provided'}), 400

    id = excel_data_col.find_one({'url': url})
    # print(id)
    if id:
        return jsonify({'message': 'Id retrived', 'id': str(id.get('_id')) }), 200
    else:
        return jsonify({'message': 'No id found'}), 404


@excel_data_bp.route('/db/<id>', methods=['GET'])
def get_question(id: str):
    # return "Why am i here?"
    if id is None:
        return jsonify({'message': 'no id provided'}), 400

    question_json = excel_data_col.find_one({'_id': ObjectId(id)})
    print(question_json)

    if question_json:
        questions = question_json.get('questions')
        print("Question retrieved successfully from MongoDB.")
        return jsonify({'questions': questions}), 200
    else:
        print("No question found in Redis.")
        return jsonify({'message': 'no data found'}), 404

if __name__ == "__main__":
    # question = {
    #         "url": "https://www.google.com",
    #         "questions": [
    #             {
    #                 "id": 0,
    #                 "title": "Your name (from dummy data)",
    #                 "type": "Name"
    #             },
    #             {
    #                 "id": 1,
    #                 "title": "Your sID (from dummy data)",
    #                 "type": "sID"
    #             },
    #         ]
    #     }
    # question_json = json.dumps(question)
    pass
