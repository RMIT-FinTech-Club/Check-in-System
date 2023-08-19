import cv2
import PIL.Image
import pytesseract
from flask import Blueprint, Response, send_file, jsonify
import os
import time

objectDetection_blueprint = Blueprint("object-detection", __name__)

# Tesseract OCR config
myconfig = r"--psm 6 --oem 3"

# Load images as grayscale
template = cv2.imread("E:\Check-in-management-board\Check-in-System/api\controller/template.jpg", 0)

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
                    screenshot = frame[(frame_middleY):(frame_middleY + (h // 2) + spacing), (frame_middleX - (w // 2) - spacing):(frame_middleX)]

                    cv2.imwrite("./api/assets/images/screenshot.jpg", screenshot)
                    # Reset timer
                    start_time = None
                    break
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
    return send_file("./api/assets/images/screenshot.jpg", mimetype='image/jpg')

@objectDetection_blueprint.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@objectDetection_blueprint.route('/get_text')
def get_text():
    # Read image
    img = PIL.Image.open("./api/assets/images/screenshot.jpg")
    # Convert image to string
    text = pytesseract.image_to_string(img, config=myconfig)
    # Print text
    print(text)
    return jsonify({ "text": text })