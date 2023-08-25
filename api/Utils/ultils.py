def check_data(*args):
    for data in args:
        if not data:
            return False
    return True
