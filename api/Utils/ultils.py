from flask import jsonify


def check_data(*args):
    for data in args:
        if not data:
            return False
    return True


# Make a decorator function that catch error and return json response
def catch_error(func):
    # @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as error:
            print(error)
            return jsonify({'error': str(error)}), 500
    return wrapper
