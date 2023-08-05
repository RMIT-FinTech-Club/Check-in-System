import secrets


def generate_key(nbytes: int = 16):
    return secrets.token_urlsafe(nbytes)
