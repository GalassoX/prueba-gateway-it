from utils.database import db


class Vehicle(db.Model):
    __tablename__ = 'vehicles'

    id = db.Column(db.Integer, primary_key=True)
    plate = db.Column(db.String(10))
    brand = db.Column(db.String(32))
    model = db.Column(db.Text)
    year = db.Column(db.Integer)
    color = db.Column(db.Text)
    owner = db.Column(db.Integer)
    register_date = db.Column(db.TIMESTAMP, server_default="CURRENT_TIMESTAMP")

    def __init__(self, plate, brand, model, year, color, owner):
        self.plate = plate
        self.brand = brand
        self.model = model
        self.year = year
        self.color = color
        self.owner = owner

    def toJSON(self) -> dict:
        return {
            "id": self.id,
            "plate": self.plate,
            "brand": self.brand,
            "model": self.model,
            "year": self.year,
            "color": self.color,
            "owner": self.owner,
            "register_date": self.register_date
        }
