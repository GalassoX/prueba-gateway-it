import jwt

secret_token = "qwerty"


def encode_token(id: int, role: int = 0):
    return jwt.encode({"id": id, "role": role}, secret_token, algorithm='HS256')


def decode_token(jwt: str):
    return jwt.decode(jwt, secret_token, ['HS256'])
