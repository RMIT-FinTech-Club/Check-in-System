from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
# from dotenv import load_dotenv
from .excelActions import ExcelActions, ActionTypes, Direction
from .global_driver import Web_Driver_Singleton as WDS
from flask import Blueprint, request, jsonify
import threading
import time
import sys
from Utils.ultils import check_data, catch_error
sys.path.append('../../Ultils')

pyxcel_bp = Blueprint("pyxcel", __name__)
pyxcel_thread = threading.local()

# load_dotenv("../../.env.local")
iframe_switchable = True


def switch_to_iframe(driver):
    global iframe_switchable
    if iframe_switchable:
        iframe_element = driver.find_element(By.CSS_SELECTOR, '#WebApplicationFrame')
        driver.switch_to.frame(iframe_element)
        iframe_switchable = False


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

    # driver wait for miliseconds
    time.sleep(0.08)

    # Switch to iframe if possible
    switch_to_iframe(driver)

    try:
        ExcelActions.shift_column(driver, direction=Direction.RIGHT, by_column=10)
        ExcelActions.shift_row(driver, direction=Direction.DOWN, until=ActionTypes.NTH_CELL, nth_row=23 - 1)
    except Exception:
        return jsonify({'message': 'request failed'}), 500

    return jsonify({'page_url': 'Nothing to see here, just saying that this has executed successfully'}), 200


@pyxcel_bp.route('/go-to-cell', methods=['POST'])
def go_to_cell():
    driver = WDS.get_driver()
    if not driver:
        return jsonify({'message': 'driver request failed'}), 500

    json_data = request.json

    cell_position = json_data.get('cell_position')

    # If no cell_position is provided, return error
    if not cell_position:
        return jsonify({'message': 'cell position not provided'}), 500

    # Switch to iframe if possible
    switch_to_iframe(driver)

    try:
        ExcelActions.go_to_cell(driver, cell_position)
        # ExcelActions.tp_to_cell(driver, cell_position)
    except Exception:
        return jsonify({'message': 'request failed'}), 500

    return jsonify({'page_url': 'Nothing to see here, just saying that this has executed successfully'}), 200


@pyxcel_bp.route('/add-data', methods=['POST'])
def add_data():
    driver = WDS.get_driver()
    if not driver:
        return jsonify({'message': 'driver request failed'}), 500

    json_data = request.json

    # Initialize an action chain object
    action = ActionChains(driver)

    data = json_data.get('data')

    # If no cell_position is provided, return error
    if not data:
        return jsonify({'message': 'cell position not provided'}), 500

    # Switch to iframe if possible
    switch_to_iframe(driver)

    try:
        action.send_keys(data).send_keys(Keys.ENTER).perform()
    except Exception:
        return jsonify({'message': 'request failed'}), 500

    return jsonify({'page_url': 'Nothing to see here, just saying that this has executed successfully'}), 200
