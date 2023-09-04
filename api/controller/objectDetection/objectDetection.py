import cv2
from flask import Blueprint, Response, send_file, jsonify
import os
import time
import requests
import json
# import pytesseract
# import PIL.Image


# Use the client to make requests to the Vision API

objectDetection_bp = Blueprint("object-detection", __name__)

# Tesseract OCR config
myconfig = r"--psm 6 --oem 3"

# Load images as grayscale
template = cv2.imread("./api\controller\objectDetection/template.jpg", 0)

# Get template's dimensions
h, w = template.shape
    

# All the methods to template match
methods = [cv2.TM_CCOEFF, cv2.TM_CCOEFF_NORMED, cv2.TM_CCORR,
           cv2.TM_CCOEFF_NORMED, cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]
        
def generate_frames():
    camera = cv2.VideoCapture(0)  # Access the camera (0 for default camera)

    # Timer variables
    start_time = None
    duration_threshold = 2.0 # 2 seconds

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
                    screenshot = frame[(frame_middleY):(frame_middleY + (h // 2) + spacing), (frame_middleX - (w // 2) - spacing):(frame_middleX + (w // 6))]
                    screenshot = frame[(frame_middleY + spacing - 5):(frame_middleY + (h // 2) + spacing), (frame_middleX - (w // 2) - spacing):(frame_middleX + (w // 6))]


                    cv2.imwrite("./api/assets/images/screenshot.jpg", screenshot)
                    # Reset timer
                    start_time = None
                    # break
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

# @objectDetection_blueprint.route('/get_text')
# def get_text():
#     # Read image

#     #Pyteseract OCR 
#     # img = PIL.Image.open("./api/assets/images/screenshot.jpg")
#     # # Convert image to string
#     # text = pytesseract.image_to_string(img, config=myconfig)
#     # # Print text
#     # print(text)

#     # Space OCR
#     """ OCR.space API request with local file.
#         Python3.5 - not tested on 2.7
#     :param filename: Your file path & name.
#     :param overlay: Is OCR.space overlay required in your response.
#                     Defaults to False.
#     :param api_key: OCR.space API key.
#                     Defaults to 'helloworld'.
#     :param language: Language code to be used in OCR.
#                     List of available language codes can be found on https://ocr.space/OCRAPI
#                     Defaults to 'en'.
#     :return: Result in JSON format.
#     """
#     filename = "./api/assets/images/screenshot.jpg"
#     payload = {'isOverlayRequired': False,
#                'apikey': "K83478507788957",
#                'language': "eng",
#                }
#     with open(filename, 'rb') as f:
#         r = requests.post('https://api.ocr.space/parse/image',
#                           files={filename: f},
#                           data=payload,
#                           )
    
#     response_data = r.json()
#     results = response_data["ParsedResults"][0]["ParsedText"]
#     # print(results)
#     f.close()

#     results = results.replace("\r", "").split("\n")
#     results = results [:2]
    

#     # Current Space OCR (Uncomment below for current OCR return)
#     return jsonify({"Name" : results[0], "ID" : results[1]})

#     # Pytesseract (Uncomment below for pytesseract return)
#     # return jsonify({"text": text})


# Imports the Google Cloud client library
from google.cloud import vision


@objectDetection_bp.route('/get_text')
def get_text():
    from google.cloud import vision

    # Set the path to your service account key JSON file
    key_path = 'api/assets/api_keys/oval-relic-397016-46a089001c8b.json'

    # Initialize the Vision API client with the key
    client = vision.ImageAnnotatorClient.from_service_account_file(key_path)

    """Detects text in the file."""
    # from google.cloud import vision

    # client = vision.ImageAnnotatorClient()

    path = "./api/assets/images/screenshot.jpg"  # Use forward slashes for path

    with open(path, "rb") as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    # Set the language hint to English
    language_hints = ["en"]  # "en" represents English

    response = client.text_detection(image=image, image_context={"language_hints": language_hints})
    texts = response.text_annotations

    results = []  # To store the extracted data as dictionaries

    for text in texts:
        description = text.description.strip()  # Remove leading/trailing whitespaces

        # Use regular expressions to extract ID and name
        import re
        match = re.match(r'([A-Za-z\s]+)(\d+)', description)
        if match:
            name = match.group(1).strip()
            id = int(match.group(2))
            results.append({"id": id, "name": name})

    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(response.error.message)
        )
    
    # Return the results as JSON
    return jsonify(results)


# get_text()
