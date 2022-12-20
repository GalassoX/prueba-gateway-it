from flask import Blueprint, request, jsonify
from utils.database import db
from data.models.owner import Owner
from data.models.vehicle import Vehicle
from data.models.vehicle_note import VehicleNote
from data.errors import ERRORS

vehicles = Blueprint('vehicles', __name__)


@vehicles.get('/vehicles')
def get_vehicles():
    vehicles = Vehicle.query.all()
    vehicles = map(lambda o: o.toJSON(), vehicles)
    return jsonify(list(vehicles)), 200


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
            if int(year) < 1800:
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
                errors.append(ERRORS.get("document"))
        else:
            errors.append(ERRORS.get("document"))

    exists = db.session.execute(
        db.select(Owner).where(Owner.document == owner)
    ).fetchone()

    if len(exists) <= 0:
        errors.append(ERRORS.get('user_not_exist'))

    if len(errors):
        return jsonify({"error": errors}), 400

    new_vehicle = Vehicle(plate, brand, model, year, color, exists[0].id)
    db.session.add(new_vehicle)
    db.session.commit()
    return jsonify(new_vehicle.toJSON()), 201


@vehicles.get('/vehicles/<id>')
def get_vehicle_by_id(id: str):
    if not id.isnumeric():
        return jsonify({'error': ERRORS.get('url_invalid_id')}), 400

    vehicle = Vehicle.query.get(id)

    if vehicle == None:
        return jsonify({'error': ERRORS.get('vehicle_not_exists')}), 400

    owner = Owner.query.get(vehicle.owner)

    notes = db.session.execute(
        db.select(VehicleNote).where(VehicleNote.vehicle == id)
    ).scalars().all()

    obj = vehicle.toJSON()
    obj['owner'] = owner.toJSON()
    obj['notes'] = list(map(lambda o: o.toJSON(), notes))

    return jsonify(obj), 200


@vehicles.post('/vehicles/<id>/notes')
def add_vehicle_note(id: str):
    if not id.isnumeric():
        return jsonify({'error': ERRORS.get('url_invalid_id')}), 400

    note = None

    data = request.json
    errors = []
    if data:
        if 'note' in data:
            note = data['note']
            if len(note) < 4:
                errors.append(ERRORS.get('note_short'))
        else:
            errors.append(ERRORS.get('invalid_note'))

    if len(errors):
        return jsonify({"error": errors}), 400

    vehicle = Vehicle.query.get(id)
    if vehicle == None:
        return jsonify({'error': ERRORS.get('vehicle_not_exists')}), 400

    new_note = VehicleNote(vehicle.id, note)
    db.session.add(new_note)
    db.session.commit()

    return jsonify(new_note.toJSON()), 201
