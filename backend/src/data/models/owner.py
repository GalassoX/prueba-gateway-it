from utils.database import db
from utils.bcrypt import hash_password, decode_hash


class Owner(db.Model):
    __tablename__ = 'owners'

    id = db.Column(db.Integer, primary_key=True)
    type_doc = db.Column(db.Integer)
    document = db.Column(db.Integer)
    name = db.Column(db.String(64))
    address = db.Column(db.String)
    phone = db.Column(db.Integer)
    mail = db.Column(db.String(200))
    password = db.Column(db.String)
    role = db.Column(db.Integer)

    def __init__(self, type_doc, num_doc, name, address, phone, mail, password):
        self.type_doc = type_doc
        self.document = num_doc
        self.name = name
        self.address = address
        self.phone = phone
        self.mail = mail
        self.role = 0

        hash = hash_password(password)
        self.password = decode_hash(hash)

    def toJSON(self) -> dict:
        return {
            "id": self.id,
            "type_doc": self.type_doc,
            "document": self.document,
            "name": self.name,
            "address": self.address,
            "phone": self.phone,
            "mail": self.mail,
            "role": self.role,
        }
