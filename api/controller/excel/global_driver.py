from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.common.exceptions import NoSuchWindowException
from selenium.webdriver.chrome.service import Service
import chromedriver_autoinstaller
# from webdriver_manager.chrome import ChromeDriverManager

class Web_Driver_Singleton():
    __instance: WebDriver = None
    __options: Options = None

    def __init__(self, options: Options) -> None:
        if Web_Driver_Singleton.__instance is not None:
            raise Exception("This class is a singleton!")
        else:
            # service = Service(ChromeDriverManager().install())
            chromedriver_autoinstaller.install() # Check if the current version of chromedriver exists
                                                 # and if it doesn't exist, download it automatically,
                                                 # then add chromedriver to path
            if options is None:
                Web_Driver_Singleton.__options = options
            Web_Driver_Singleton.__instance = webdriver.Chrome(options)
            print("Driver created")

    # def __new__(cls, *args, **kwargs):
    #     if cls.__instance is None:
    #         cls.__instance = super().__new__(cls)
    #         # cls.__instance.__init__(*args, **kwargs)
    #     return cls.__instance
    
    @staticmethod
    def connect_url(url: str, *args, **kwargs):
        """Same as webdriver.get(url) but with exception handling. 
        This method will try to connect to url 3 times before raising an exception.

        Args:
            url (str): url to connect to

        Raises:
            Exception: Raised when can't connect to url after 3 tries
        """
        try:
            Web_Driver_Singleton.__instance.get(url)
        except NoSuchWindowException:
            # kwargs['try'] = kwargs['try'] + 1 if 'try' in kwargs else 1
            # if kwargs['try'] > 3:
            #     raise Exception("Can't connect to url")
            Web_Driver_Singleton.close_driver()
            Web_Driver_Singleton(Web_Driver_Singleton.__options)
            # Web_Driver_Singleton.connect_url(url, *args, **kwargs)
            Web_Driver_Singleton.__instance.get(url)

    @staticmethod
    def create_driver(options: Options):
        """Creates a new driver if there is no driver instance

        Args:
            options (Options): Options for the driver

        Returns:
            WebDriver: The driver instance
        """
        if Web_Driver_Singleton.__instance is None:
            Web_Driver_Singleton(options=options)
        return Web_Driver_Singleton.__instance

    @staticmethod
    def close_driver():
        """Closes the driver instance
        """
        try:
            Web_Driver_Singleton.__instance.quit()
        except Exception:
            pass
        Web_Driver_Singleton.__instance = None

    @staticmethod
    def get_driver():
        """Returns the driver instance

        Returns:
            WebDriver: The driver instance
        """
        if not Web_Driver_Singleton.__instance or not Web_Driver_Singleton.__instance.window_handles:
            return None
        return Web_Driver_Singleton.__instance
