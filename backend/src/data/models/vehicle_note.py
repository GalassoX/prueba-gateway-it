from utils.database import db


class VehicleNote(db.Model):
    __tablename__ = "vehicle_notes"

    id = db.Column(db.Integer, primary_key=True)
    vehicle = db.Column(db.Integer)
    note = db.Column(db.String)

    def __init__(self, vehicle, note):
        self.vehicle = vehicle
        self.note = note

    def toJSON(self) -> dict:
        return {
            "vehicleId": self.vehicle,
            "text": self.note,
        }
