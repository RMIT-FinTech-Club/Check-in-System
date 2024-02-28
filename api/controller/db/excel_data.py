import redis
import json
import uuid
from flask import Blueprint, request, jsonify

excel_data_bp = Blueprint("excel_data", __name__)

# r = redis.StrictRedis(
#     host="redis-13371.c1.ap-southeast-1-1.ec2.cloud.redislabs.com",
#     port=13371,
#     password="egfwA1Xhkr9S736RuT3hmbUv4CQAk1ER",
# )

r = redis.Redis(
    host="localhost",
    port=6379,
)

@excel_data_bp.route('/')
def index():
    return "Excel database api index page"

# @excel_data_bp.route('/', methods=['GET'])
# def get_excel_data():
#     dummy_data = {
#         "thisDataIsDummy": {
#             "url": "https://www.google.com",
#             "questions": [
#                 {
#                     "id": 0,
#                     "title": "Your name (from dummy data)",
#                     "type": "Name"
#                 },
#                 {
#                     "id": 1,
#                     "title": "Your sID (from dummy data)",
#                     "type": "sID"
#                 },
#             ]
#         }
#     }
    
#     id = request.args.get('id')
#     url = request.args.get('url')

#     # If no id or url is provided, return error code
#     if id is None or url is None:
#         return jsonify({'message': 'no id or url provided'}), 400
    
    

#     # Get data, if not found return error code
#     response = dummy_data.get(id, None)
#     if response is None:
#         return jsonify({'message': 'no data found'}), 404

#     return jsonify(response)


@excel_data_bp.route('/r', methods=['POST'])
def set_question():
    # return "Why are setting questions?"

    question = request.get_json()
    if question is None:
        return jsonify({'message': 'no data provided'}), 400
    if question.get('url') is None:
        return jsonify({'message': 'no url provided'}), 400
    
    # Store excel item in Redis
    question_json = json.dumps(question)
    id = str(uuid.uuid4())

    r.set(id, question_json)

    # Store id to url
    r.set(question['url'], id)

    # print("Question set successfully in Redis.")
    return jsonify({'message': 'Question set successfully in Redis.'}), 200


@excel_data_bp.route('/r/<id>', methods=['PUT'])
def update_question(id: str):
    exist_data = r.get(id)
    questions = request.get_json().get('questions', None)

    if exist_data is None:
        return jsonify({'message': 'no data exist'}), 400
    
    # url = json.loads(exist_data).get('url')

    if questions is None:
        return jsonify({'message': 'no data provided'}), 400

    # Store excel item in Redis
    new_data = json.loads(exist_data)
    new_data['questions'] = questions

    question_json = json.dumps(new_data)
    r.set(id, question_json)

    # print("Question set successfully in Redis.")
    return jsonify({'message': 'Question updated successfully in Redis.'}), 200


@excel_data_bp.route('/r/id', methods=['GET'])
def get_id():
    url = request.args.get('url')
    
    if url is None:
        return jsonify({'message': 'no url provided'}), 400
    
    id = r.get(url)
    if id:
        return jsonify({'message': 'Id retrived', 'id': id.decode() }), 200
    else:
        return jsonify({'message': 'No id found'}), 404


@excel_data_bp.route('/r/<id>', methods=['GET'])
def get_question(id: str):
    # return "Why am i here?"
    if id is None:
        return jsonify({'message': 'no id provided'}), 400

    question_json = r.get(id)

    if question_json:
        question = json.loads(question_json)
        print("Question retrieved successfully from Redis.")
        return question, 200
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
    # id = uuid.uuid4()

    # # r.set(id, question_json)
    # r.set("WHAT", "WHY?")
    # print("Question set successfully in Redis.")
    # id = r.get("https://www.google.com")
    all = r.keys()
    # id = uuid.uuid4()
    print(all)
