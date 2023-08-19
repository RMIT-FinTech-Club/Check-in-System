import cv2
import pytesseract
import PIL.Image
import time

# Tesseract OCR config
myconfig = r"--psm 6 --oem 3"

# Load images as grayscale
template = cv2.imread("assets\images/template.jpg", 0)

# Get template's dimensions
h, w = template.shape

# All the methods to template match
methods = [cv2.TM_CCOEFF, cv2.TM_CCOEFF_NORMED, cv2.TM_CCORR,
           cv2.TM_CCOEFF_NORMED, cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]

# Timer variables
start_time = None
duration_threshold = 2.0 # 1 second

# Initialize camera
cap = cv2.VideoCapture(0)

print("Capturing camera, awaiting screenshot!")

while True:
    # Get frame from camera
    ret, frame = cap.read()

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
    if (frame_middleX - spacing) < center_x < (frame_middleX + spacing) and (frame_middleY - spacing) < center_y < (frame_middleY + spacing):
        # Center of matching shape is inside the frame, draw green rectangle
        cv2.rectangle(img2, (frame_middleX - (w // 2) - spacing, frame_middleY - (h // 2) - spacing), (frame_middleX + (w // 2) + spacing, frame_middleY + (h // 2) + spacing), (0, 255, 0), 2)

        # Start the timer if it's not running
        if start_time is None:
            start_time = time.time()
        else:
            # Check green box displayed for more than 1 second
            elapsed_time = time.time() - start_time
            if elapsed_time > duration_threshold:
                # Capture the ID
                screenshot = frame[(frame_middleY):(frame_middleY + (h // 2) + spacing), (frame_middleX - (w // 2) - spacing):(frame_middleX -(w // 2) + (w//3) * 2)]
                # Save the screenshot
                cv2.imwrite("screenshot.png", screenshot)
                # Reset the timer
                start_time = None
                print("Screenshot took!")
                break

    else:
        # Center of matching shape is outside the frame, draw red rectangle
        cv2.rectangle(img2, (frame_middleX - (w // 2) - spacing, frame_middleY - (h // 2) - spacing), (frame_middleX + (w // 2) + spacing, frame_middleY + (h // 2) + spacing), (0, 0, 255), 2)
        # Reset timer since box is red
        start_time = None

    img2 = cv2.flip(img2, 1)
    # showing the image with rectangle drawn
    cv2.imshow("Match template", img2)

    # Check if the 's' key is pressed
    if cv2.waitKey(1) & 0xFF == ord("s"):
        # Capture the region inside the rectangle
        screenshot = frame[(frame_middleY):(frame_middleY + (h // 2) + spacing), (frame_middleX - (w // 2) - spacing):(frame_middleX)]
        # Save the screenshot
        cv2.imwrite("screenshot.png", screenshot)
        print("Screenshot took!")
        break

    # Exit loop
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

# Close the camera
cap.release()
cv2.destroyAllWindows()


text = pytesseract.image_to_string(PIL.Image.open("screenshot.png"), config=myconfig)
print("Your ID information: ")
print(text)