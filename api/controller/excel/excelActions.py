from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# from selenium.common.exceptions import TimeoutException

from enum import Enum


class ActionTypes(Enum):
    EMPTY_CELL = 'Empty_cell'
    NTH_CELL = 'Nth_cell'


class ExcelActions:

    # Function that send arrow key down until text in element is empty
    @staticmethod
    def cell_down(driver, until: ActionTypes = ActionTypes.EMPTY_CELL, **kwargs) -> bool:
        # Initialize an action chain object
        action = ActionChains(driver)

        # Initialize variables
        match until:
            case ActionTypes.NTH_CELL:
                # global nth_row
                nth_row = 0

        # Simulate arrow key down until text in element #formulaBarTextDivId_textElement > div is empty
        while True:
            # Wait until element is visible
            formula_bar_text = WebDriverWait(driver, 5).until(EC.visibility_of_element_located((By.CSS_SELECTOR, '#formulaBarTextDivId_textElement > div'))).get_attribute('textContent')

            match until:
                case ActionTypes.EMPTY_CELL:
                    if not formula_bar_text:
                        return True

                case ActionTypes.NTH_CELL:
                    if nth_row >= kwargs['nth_row']:
                        return True
                    nth_row += 1

            action.send_keys(Keys.ARROW_DOWN).perform()

    # Function that turn character into number
    @staticmethod
    def __char_to_num(char: str) -> int:
        return ord(char.upper()) - 64

    # Extract character from string
    @staticmethod
    def __extract_char(string: str) -> str:
        return ''.join([char for char in string if char.isalpha()])

    # Function that send arrow key right until specific column
    @staticmethod
    def column_right(driver, **kwargs) -> bool:
        # Initialize an action chain object
        action = ActionChains(driver)

        # Initialize variables
        # Check if the kwarg is "to_column" or "by_column"
        if 'to_column' in kwargs:
            # Convert column to number
            target_location = ExcelActions.__char_to_num(ExcelActions.__extract_char(kwargs['to_column'])) - 1
        elif 'by_column' in kwargs:
            target_location = kwargs['by_column']

        nth_row = 0

        # Simulate arrow key down until specific column
        while True:
            # Wait until element is visible
            # cell_location = WebDriverWait(driver, 5).until(EC.visibility_of_element_located((By.CSS_SELECTOR, '#FormulaBar-NameBox-input'))).get_attribute('value')

            if nth_row >= target_location:
                return True
            nth_row += 1

            action.send_keys(Keys.ARROW_RIGHT).perform()
