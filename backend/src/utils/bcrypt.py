from bcrypt import gensalt, hashpw, checkpw


def hash_password(password: str):
    return hashpw(bytes(password, 'UTF-8'), gensalt())


def verify_password(password: str, hash: str):
    return checkpw(bytes(password, 'UTF-8'), bytes(hash, 'UTF-8'))


def decode_hash(hash: bytes):
    return hash.decode('UTF-8')
