from utils.database import db
from datetime import datetime


class Vehicle(db.Model):
    __tablename__ = 'vehicles'

    id = db.Column(db.Integer, primary_key=True)
    plate = db.Column(db.String(10))
    brand = db.Column(db.String(32))
    model = db.Column(db.Text)
    year = db.Column(db.Integer)
    color = db.Column(db.Text)
    owner = db.Column(db.Integer)
    notes = db.Column(db.String)
    register_date = db.Column(db.Time)

    def __init__(self, plate, brand, model, year, color, owner):
        self.plate = plate
        self.brand = brand
        self.model = model
        self.year = year
        self.color = color
        self.owner = owner
        self.notes = ''
        self.register_date = datetime.now()
