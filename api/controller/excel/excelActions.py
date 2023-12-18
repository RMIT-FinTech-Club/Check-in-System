from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.support import expected_conditions as EC
# from selenium.common.exceptions import TimeoutException

# import sys

from enum import Enum


class Direction(Enum):
    UP = 'up'
    DOWN = 'down'
    LEFT = 'left'
    RIGHT = 'right'


class ActionTypes(Enum):
    EMPTY_CELL = 'Empty_cell'
    NTH_CELL = 'Nth_cell'


class ExcelActions:

    # Turn character into number, string may contain multiple characters
    @staticmethod
    def __char_to_num(string: str) -> int:
        """Convert character to number, even if the string contains multiple characters

        Args:
            string (str): string to be converted

        Returns:
            int: converted number
        """
        return sum([(ord(char.upper()) - 64) * (26 ** (len(string) - idx - 1)) for idx, char in enumerate(string)])

    # Extract character from string
    @staticmethod
    def __extract_char(string: str) -> str:
        """Extract character from string

        Args:
            string (str): string to be extracted

        Returns:
            str: extracted string with only characters
        """
        return ''.join([char for char in string if char.isalpha()])

    # Extract number from string
    @staticmethod
    def __extract_num(string: str) -> int:
        """Extract number from string

        Args:
            string (str): string to be extracted

        Returns:
            str: extracted string with only numbers
        """
        return int(''.join([char for char in string if char.isnumeric()]))

    # Send ctrl + home
    @staticmethod
    def ctrl_home(driver: WebDriver) -> None:
        """Send ctrl + home to excel

        Args:
            driver (WebDriver): webdriver object
        """
        action = ActionChains(driver)
        action.key_down(Keys.CONTROL).send_keys(Keys.HOME).key_up(Keys.CONTROL).perform()

    # Send ctrl + end
    @staticmethod
    def ctrl_end(driver: WebDriver) -> None:
        """Send ctrl + end to excel (go to the last cell)

        Args:
            driver (WebDriver): webdriver object
        """
        action = ActionChains(driver)
        action.key_down(Keys.CONTROL).send_keys(Keys.END).key_up(Keys.CONTROL).perform()

    # Send arrow key until specific condition is met
    @staticmethod
    def shift_row(driver: WebDriver, direction: Direction, until: ActionTypes = ActionTypes.EMPTY_CELL, **kwargs) -> bool:
        """Shift row in excel, until target row is reached

        Args:
            driver (WebDriver): webdriver object
            direction (Direction): direction to shift, only up or down
            until (ActionTypes, optional): condition of shifting. Defaults to ActionTypes.EMPTY_CELL.

        Raises:
            Exception: Invalid direction, TimeoutException

        Returns:
            bool: true if success, else raise exception
        """

        # Initialize an action chain object
        action = ActionChains(driver)

        # Initialize variables
        match until:
            case ActionTypes.NTH_CELL:
                nth_row = 0

        match direction:
            case Direction.DOWN:
                def move_down():
                    action.send_keys(Keys.ARROW_DOWN).perform()
                key_perform = move_down

            case Direction.UP:
                def move_up():
                    action.send_keys(Keys.ARROW_UP).perform()
                key_perform = move_up

            case _:
                raise Exception('Invalid direction')

        # Simulate arrow key until text in element is empty
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

            key_perform()

    # Send arrow key until specific column is met
    @staticmethod
    def shift_column(driver: WebDriver, direction: Direction, **kwargs) -> bool:
        """Shift column in excel, until target column is reached

        Args:
            driver (WebDriver): webdriver object
            direction (Direction): direction to shift, only left or right

        Raises:
            Exception: Invalid direction, TimeoutException

        Returns:
            bool: true if success, else raise exception
        """
        # Initialize an action chain object
        action = ActionChains(driver)

        # Initialize variables
        match direction:
            case Direction.LEFT:
                def move_left():
                    action.send_keys(Keys.ARROW_LEFT).perform()
                key_perform = move_left

            case Direction.RIGHT:
                def move_right():
                    action.send_keys(Keys.ARROW_RIGHT).perform()
                key_perform = move_right

            case _:
                raise Exception('Invalid direction')

        # Check if the kwarg is "to_column" or "by_column"
        if 'to_column' in kwargs:
            # Convert column to number
            target_location = ExcelActions.__char_to_num(kwargs['to_column']) - 1

            # Get current column location
            cell_location = WebDriverWait(driver, 5).until(EC.visibility_of_element_located((By.CSS_SELECTOR, '#FormulaBar-NameBox-input'))).get_attribute('value')
            nth_column = ExcelActions.__char_to_num(ExcelActions.__extract_char(cell_location)) - 1

        elif 'by_column' in kwargs:
            target_location = kwargs['by_column']
            nth_column = 0

        # Simulate arrow key until specific column
        while True:
            if nth_column >= target_location:
                return True
            nth_column += 1

            key_perform()

    # Go to specific cell
    @staticmethod
    def go_to_cell(driver: WebDriver, cell: str):
        """Go to specific cell by shifting row and column until target cell is reached

        Args:
            driver (WebDriver): webdriver object
            cell (str): cell to go to

        Raises:
            Exception: TimeoutException
        """

        # Initialize an action chain object
        action = ActionChains(driver)

        # Get target column and row location
        col_target_location = ExcelActions.__char_to_num(ExcelActions.__extract_char(cell))
        row_target_location = ExcelActions.__extract_num(cell)

        # Get current column location
        cell_location = WebDriverWait(driver, 6).until(EC.visibility_of_element_located((By.CSS_SELECTOR, '#FormulaBar-NameBox-input'))).get_attribute('value')
        curent_column = ExcelActions.__char_to_num(ExcelActions.__extract_char(cell_location))
        curretn_row = ExcelActions.__extract_num(cell_location)

        # Calculate how many times to press arrow key
        horizontal_move_times = col_target_location - curent_column
        vertical_move_times = row_target_location - curretn_row

        # Asign arrow key function
        if horizontal_move_times > 0:
            def move_right():
                action.send_keys(Keys.ARROW_RIGHT).perform()
            horizontal_key_perform = move_right

        else:
            def move_left():
                action.send_keys(Keys.ARROW_LEFT).perform()
            horizontal_key_perform = move_left

        if vertical_move_times > 0:
            def move_down():
                action.send_keys(Keys.ARROW_DOWN).perform()
            vertical_key_perform = move_down

        else:
            def move_up():
                action.send_keys(Keys.ARROW_UP).perform()
            vertical_key_perform = move_up

        # Simulate arrow key until specific cell
        for _ in range(abs(horizontal_move_times)):
            horizontal_key_perform()

        for _ in range(abs(vertical_move_times)):
            vertical_key_perform()

    @staticmethod
    def get_cell_data(driver: WebDriver) -> str:
        cell_text = WebDriverWait(driver, 5).until(EC.visibility_of_element_located((By.CSS_SELECTOR, '#formulaBarTextDivId_textElement > div'))).get_attribute('textContent')

        return cell_text

    @staticmethod
    def tp_to_cell(driver: WebDriver, cell: str):
        """teleport to specific cell, perform faster than go_to_cell. Error prone, use with caution

        Args:
            driver (WebDriver): webdriver object
            cell (str): cell to go to

        Raises:
            Exception: TimeoutException
        """

        # Find the input box
        cell_location = WebDriverWait(driver, 5).until(EC.visibility_of_element_located((By.CSS_SELECTOR, '#FormulaBar-NameBox-input')))

        # Input cell location data to the input box
        cell_location.clear()
        cell_location.send_keys(cell)
        cell_location.send_keys(Keys.ENTER)
