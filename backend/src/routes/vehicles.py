from flask import Blueprint, request, jsonify
from utils.database import db
from data.models.vehicle import Vehicle
from data.errors import ERRORS

vehicles = Blueprint('vehicles', __name__)


@vehicles.get('/vehicles')
def get_vehicles():
    return 'Returning all vehicles', 200


@vehicles.post('/vehicles')
def register_vehicle():
    plate = None
    brand = None
    model = None
    year = None
    color = None
    owner = None

    data = request.json
    errors = []
    if data:
        if 'plate' in data:
            plate = data['plate']
            if len(plate) < 6:
                errors.append(ERRORS.get("model"))
        else:
            errors.append(ERRORS.get("plate"))

        if 'brand' in data:
            brand = data['brand']
            if len(brand) < 2:
                errors.append(ERRORS.get("brand"))
        else:
            errors.append(ERRORS.get("brand"))

        if 'model' in data:
            model = data['model']
            if len(model) < 2:
                errors.append(ERRORS.get("model"))
        else:
            errors.append(ERRORS.get("model"))

        if 'year' in data:
            year = data['year']
            if year < 1800:
                errors.append(ERRORS.get("year"))
        else:
            errors.append(ERRORS.get("year"))

        if 'color' in data:
            color = data['color']
        else:
            errors.append(ERRORS.get("color"))

        if 'owner' in data:
            owner: str = data['owner']
            if not owner.isnumeric():
                errors.append(ERRORS.get("year"))
        else:
            errors.append(ERRORS.get("year"))

    if len(errors):
        return jsonify({"error": errors}), 400

    new_vehicle = Vehicle(plate, brand, model, year, color, owner)
    db.session.add(new_vehicle)
    db.session.commit()
    return jsonify(new_vehicle.toJSON()), 201
