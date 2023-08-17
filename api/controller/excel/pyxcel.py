from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from dotenv import load_dotenv
from flask import Blueprint, request, jsonify
import threading
# import time
import sys
from Utils.ultils import check_data
sys.path.append('../../Ultils')

pyxcel_bp = Blueprint("pyxcel", __name__)
pyxcel_thread = threading.local()

load_dotenv("../../.env.local")

# excel_url = 'https://rmiteduau.sharepoint.com/:x:/r/sites/RMITFinTechClub2023/Shared%20Documents/2023%20FinTech%20Club%20Master%20Folder/Sem%20B/Departments/Technology/Computer%20Vision%20Project/Book.xlsx?d=wc133eaeca703446686947dd77f977172&csf=1&web=1&e=Tl81AC'


global_driver_instance = None


def create_driver_options() -> Options:
    driver_option = Options()
    driver_option.add_experimental_option("detach", True)
    driver_option.page_load_strategy = 'eager'
    return driver_option


def get_webdriver():
    # Create or reuse the WebDriver instance for the current thread
    global global_driver_instance
    if not global_driver_instance:
        global_driver_instance = webdriver.Chrome(options=create_driver_options())
    return global_driver_instance


def close_webdriver():
    # Close and clean up the WebDriver instance when the request is done
    global global_driver_instance
    if global_driver_instance:
        global_driver_instance.quit()
        global_driver_instance = None


# Routes
@pyxcel_bp.route('/')
def index():
    return "Excel api index page"


@pyxcel_bp.route('/access', methods=['POST'])
def access_excel():
    json_data = request.json

    # Url
    excel_url = json_data.get('url')

    # Account information
    EMAIL = json_data.get('email')
    PASSWORD = json_data.get('password')

    if not check_data(excel_url, EMAIL, PASSWORD):
        return 'Not enough data input'

    close_webdriver()
    driver = get_webdriver()
    driver.get(excel_url)

    # email input
    try:
        email_field = WebDriverWait(driver, 5).until(EC.visibility_of_element_located((By.ID, 'i0116')))
        email_field.send_keys(EMAIL)

        next_btn = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.ID, 'idSIButton9')))
        next_btn.send_keys(Keys.ENTER)
    except TimeoutException:
        return jsonify({'message': 'Somthing was wrong with the email'}), 500

    # password input
    try:
        email_field = WebDriverWait(driver, 5).until(EC.visibility_of_element_located((By.ID, 'i0118')))
        email_field.send_keys(PASSWORD)

        next_btn = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.ID, 'idSIButton9')))
        next_btn.send_keys(Keys.ENTER)
    except TimeoutException:
        return jsonify({'message': 'Somthing was wrong with the password'}), 500

    # auth_number = driver.find_element(By.ID, 'idRichContext_DisplaySign').get_attribute('textContent')
    # print(f'Your Authentication number is: {auth_number}')

    try:
        next_btn = WebDriverWait(driver, 60).until(EC.element_to_be_clickable((By.ID, 'idSIButton9')))
        next_btn.send_keys(Keys.ENTER)
    except TimeoutException:
        return jsonify({'message': 'Could not continue'}), 500

    return jsonify({'message': 'Request processed successfully'})


@pyxcel_bp.route('/disconnect', methods=['POST'])
def disconnect():
    close_webdriver()
    return jsonify({'message': 'Successfully disconnected excel'})


@pyxcel_bp.route('/test-selenium', methods=['POST'])
def test_selenium():
    global global_driver_instance
    if not global_driver_instance:
        return jsonify({'message': 'request failed'})
    test_text = global_driver_instance.current_url
    return jsonify({'page_url': test_text})
