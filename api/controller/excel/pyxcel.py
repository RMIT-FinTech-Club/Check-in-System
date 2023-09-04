from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
# from dotenv import load_dotenv
from .excelActions import ExcelActions, ActionTypes
from .global_driver import Web_Driver_Singleton as WDS
from flask import Blueprint, request, jsonify
import threading
# import time
import sys
from Utils.ultils import check_data, catch_error
sys.path.append('../../Ultils')

pyxcel_bp = Blueprint("pyxcel", __name__)
pyxcel_thread = threading.local()

# load_dotenv("../../.env.local")
iframe_switchable = True


def create_driver_options() -> Options:
    driver_option = Options()
    driver_option.add_experimental_option("detach", True)
    driver_option.page_load_strategy = 'eager'
    return driver_option


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

    # Create driver
    driver = WDS.create_driver(options=create_driver_options())
    driver.get(excel_url)

    # Change iframe state
    global iframe_switchable
    iframe_switchable = True

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

    try:
        next_btn = WebDriverWait(driver, 60).until(EC.element_to_be_clickable((By.ID, 'idSIButton9')))
        next_btn.send_keys(Keys.ENTER)
    except TimeoutException:
        return jsonify({'message': 'Could not continue'}), 500

    return jsonify({'message': 'Request processed successfully'})


@pyxcel_bp.route('/disconnect', methods=['POST'])
def disconnect():
    WDS.close_driver()
    return jsonify({'message': 'Successfully disconnected excel'})


@catch_error
@pyxcel_bp.route('/test-selenium', methods=['POST'])
def test_selenium():
    driver = WDS.get_driver()
    if not driver:
        return jsonify({'message': 'request failed'})

    # Initialize an action chain object
    action = ActionChains(driver)

    # Simulate Ctrl + Home keypress
    action.key_down(Keys.CONTROL).send_keys(Keys.HOME).key_up(Keys.CONTROL).perform()

    # Switch to iframe if possible
    global iframe_switchable
    if iframe_switchable:
        iframe_element = driver.find_element(By.CSS_SELECTOR, '#WebApplicationFrame')
        driver.switch_to.frame(iframe_element)
        iframe_switchable = False

    try:
        ExcelActions.column_right(driver, to_column='E')
        ExcelActions.cell_down(driver, until=ActionTypes.NTH_CELL, nth_row=20)
    except Exception:
        return jsonify({'message': 'request failed'}), 500

    # if not ExcelActions.cell_down(driver, until=ActionTypes.EMPTY_CELL):
    #     return jsonify({'message': 'request failed'}), 500
    # if not ExcelActions.cell_down(driver, until=ActionTypes.SPECIFIC_ROW, specific_row=5):
    #     return jsonify({'message': 'request failed'}), 500

    return jsonify({'page_url': 'Nothing to see here, just saying that this has executed successfully'}), 200
