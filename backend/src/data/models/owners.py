from utils.database import db


class Owners(db.Model):
    __tablename__ = 'owners'

    id = db.Column(db.Integer, primary_key=True)
    type_doc = db.Column(db.Integer)
    document = db.Column(db.Integer)
    name = db.Column(db.String(64))
    address = db.Column(db.String)
    phone = db.Column(db.Integer)
    mail = db.Column(db.String(200))

    def __init__(self, type_doc, num_doc, name, address, phone, mail):
        self.type_doc = type_doc
        self.doc = num_doc
        self.name = name
        self.address = address
        self.phone = phone
        self.mail = mail
