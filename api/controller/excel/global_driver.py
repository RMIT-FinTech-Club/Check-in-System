from selenium.webdriver.chrome.options import Options
from selenium import webdriver


class Web_Driver_Singleton():
    __instance = None

    def __init__(self, options: Options) -> None:
        if Web_Driver_Singleton.__instance is not None:
            raise Exception("This class is a singleton!")
        else:
            Web_Driver_Singleton.__instance = webdriver.Chrome(options)

    # def __new__(cls, *args, **kwargs):
    #     if cls.__instance is None:
    #         cls.__instance = super().__new__(cls)
    #         # cls.__instance.__init__(*args, **kwargs)
    #     return cls.__instance

    @staticmethod
    def create_driver(options: Options):
        if Web_Driver_Singleton.__instance is None:
            Web_Driver_Singleton(options=options)
        return Web_Driver_Singleton.__instance

    @staticmethod
    def close_driver():
        try:
            Web_Driver_Singleton.__instance.quit()
        except Exception:
            pass
        Web_Driver_Singleton.__instance = None

    @staticmethod
    def get_driver():
        if not Web_Driver_Singleton.__instance:
            return None
        return Web_Driver_Singleton.__instance
