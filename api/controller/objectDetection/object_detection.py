import uuid
import cv2
from flask import Blueprint, Response, send_file, jsonify, request, redirect
from socketManager import socketio
from flask_socketio import emit
import os
import time
# import requests
import json
import pytesseract
import PIL.Image
## Import socket io publish message function
from controller.socket.publishMessage import publishMess
from queue import Queue

# Use the client to make requests to the Vision API

objectDetection_bp = Blueprint("object-detection", __name__)

# Tesseract OCR config
myconfig = r"--psm 6 --oem 3"

# Load images as grayscale
template_path = os.path.join(os.path.dirname(__file__), "template.jpg")
template = cv2.imread(template_path, 0)


# Get template's dimensions
h, w = template.shape
    

# All the methods to template match
methods = [cv2.TM_CCOEFF, cv2.TM_CCOEFF_NORMED, cv2.TM_CCORR,
           cv2.TM_CCOEFF_NORMED, cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]
        
# Create a message queue
messages = Queue(maxsize=1)

def generate_frames():
    camera = cv2.VideoCapture(0)  # Access the camera (0 for default camera)

    # Timer variables
    start_time = None
    duration_threshold = 0.8 # Time in seconds to capture image

    while True:
        success, frame = camera.read()

        # Convert the frame to grayscale
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        img2 = frame.copy()

        # method results in a 2d array of all the possible matches (0 - 1)
        result = cv2.matchTemplate(gray_frame, template, methods[0])

        # this method gives the location and value of the minimum and maximum values
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

        location = max_loc

        # determining bottom right of the match by adding w and h
        bottom_right = (location[0] + w, location[1] + h)

        # Draw rectangle around matching shape
        # cv2.rectangle(img2, location, bottom_right, (0, 255, 0), 3)

        # getting middle values and spacing for screenshot (For not missing any text)
        frame_middleX = frame.shape[1] // 2
        frame_middleY = frame.shape[0] // 2
        spacing = 30

        # Getting center of matching shape
        center_x = location[0] + w // 2
        center_y = location[1] + h // 2

        # If center of shape is withing center of frame + spacing
        if (frame_middleX - spacing <= center_x <= frame_middleX + spacing) and (frame_middleY - spacing <= center_y <= frame_middleY + spacing):
            # Center of shape is within center of frame + spacing, draw green rectangle
            cv2.rectangle(img2, (frame_middleX - (w // 2) - spacing, frame_middleY - (h // 2) - spacing), (frame_middleX + (w // 2) + spacing, frame_middleY + (h // 2) + spacing), (0, 255, 0), 2)
            
            # If timer is not running, start it
            if start_time is None:
                start_time = time.time()
            else:
                # Check if timer has reached threshold
                elapsed_time = time.time() - start_time
                if elapsed_time >= duration_threshold:
                    # Save image
                    # UUID for unique file name
                    file_name = str(uuid.uuid4()) + ".jpg"
                    cv2.imwrite(f"./api/assets/data/{file_name}", frame)
                    screenshot = frame[(frame_middleY + spacing - 5):(frame_middleY + (h // 2) + spacing), (frame_middleX - (w // 2) - spacing):(frame_middleX + (w // 6))]


                    cv2.imwrite("./api/assets/images/screenshot.jpg", screenshot)

                    # Emit message to client with message only
                    # socketio.emit("screenshot_saved", {"message": "Screenshot taken."}, namespace='/objectDetection')
                    
                    # Redirect user to /get_text


                    # Reset timer
                    start_time = None
                    # break
                    # return (redirect("/test-api"))
                    ## Test socket io publish message
                    publishMess()
                    ## Test sse (if the messages queue is empty, then put a new message to the queue)
                    if (messages.empty()): messages.put("1")
                    
        else:
            # Center of shape is not within center of frame + spacing, draw red rectangle, reset timer
            cv2.rectangle(img2, (frame_middleX - (w // 2) - spacing, frame_middleY - (h // 2) - spacing), (frame_middleX + (w // 2) + spacing, frame_middleY + (h // 2) + spacing), (0, 0, 255), 2)
            # Reset timer
            start_time = None

        img2 = cv2.flip(img2, 1)
        # showing the image with rectangle drawn

        if not success:
            break
        _, buffer = cv2.imencode('.jpg', img2)
        frame_data = buffer.tobytes()
        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame_data + b'\r\n')
    # return send_file("./api/assets/images/screenshot.jpg", mimetype='image/jpg')

@objectDetection_bp.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@objectDetection_bp.route('/get_textTesseract')
def get_textTesseract():
    # read the image
    # img = PIL.Image.open("./api/assets/images/screenshot.jpg")

    # Testing with Phuc's image
    from PIL import Image

    # Read the image with OpenCV
    path = os.path.join(".", "api", "assets", "images", "screenshot.jpg")
    try:
        img = cv2.imread(path)
    except FileNotFoundError:
        print(f"File '{path}' not found.")
        return jsonify({"error": "File not found."})

    # Convert the image from BGR to RGB
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Convert the OpenCV image to a PIL Image object
    img_pil = Image.fromarray(img)

    # Now you can use pytesseract
    text = pytesseract.image_to_string(img_pil, config=myconfig)

    # format text to (ID, Name)
    name = ""
    id = 0
    print("Printing get_textTesseract")
    print(text)
    # Use regular expressions to extract ID and name
    import re
    lines: list = text.split("\n")
    if len(lines) < 2:
        return jsonify({"error": "Not enough data captured, something might have been wrong with the image."}), 400

    name_pattern = r'([^\d\n]+)'
    id_pattern = r'(\d+)'

    if lines:
        name_match = re.search(name_pattern, lines[0])
        if name_match:
            name = name_match.group(1).strip()

        id_match = re.search(id_pattern, lines[1])
        if id_match:
            id = int(id_match.group(1))


    return jsonify({"Name" : name, "ID" : id}), 200

@objectDetection_bp.route('/get_text')
def get_text():
    """Detects text in the file."""
    from google.cloud import vision

    # Set the path to your service account key JSON file
    key_path = 'api/assets/api-keys/euphoric-coral-406216-e28e7a467072.json'

    # Initialize the Vision API client with the key
    client = vision.ImageAnnotatorClient.from_service_account_file(key_path)

    path = "./api/assets/images/screenshot.jpg"

    try:
        with open(path, "rb") as image_file:
            content = image_file.read()
    except FileNotFoundError:
        print(f"File '{path}' not found.")
        return jsonify({"error": "File not found."})
    
    image = vision.Image(content=content)

    # Set the language hint to English
    language_hints = ["en"]  # "en" represents English

    response = client.text_detection(image=image, image_context={"language_hints": language_hints})
    texts = response.text_annotations
    print('Texts:')
    print(texts)

    # results = []  # To store the extracted data as dictionaries
    name = ""
    id = 0

    for text in texts:
        description = text.description.strip()  # Remove leading/trailing whitespaces

        # Use regular expressions to extract ID and name
        import re
        match = re.match(r'([A-Za-z\s]+)(\d+)', description)
        if match:
            name = match.group(1).strip()
            id = int(match.group(2))

    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(response.error.message)
        )

    try:
    # Attempt to delete the file
        os.remove(path)
        print(f"File '{path}' has been deleted successfully.")
    except FileNotFoundError:
        print(f"File '{path}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")
    
    # Return the results as JSON
    return jsonify({"Name" : name, "ID" : id})

    # return jsonify({"text": response.text_annotations[0].description})

@socketio.on('connect', namespace='/objectDetection')
def handle_connect():
    print('A client connected to the objectDetection namespace')


# @objectDetection_bp.route('/queue')
# def queue():
#     def getQueue():
#         # If message queue is not empty, than send an signal to the front end that screenshot has taken
#         if (messages.empty() is False):
#             mid = messages.get()
#             return "data: 'taken'\n\n"
#         return "data: 'waiting'"
#     return Response(getQueue(), mimetype='text/event-stream')
