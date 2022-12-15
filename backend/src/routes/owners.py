from flask import Blueprint, request, jsonify
from utils.database import db
from data.models.owner import Owner
from data.errors import ERRORS

owners = Blueprint('owners', __name__)


@owners.get('/owners')
def get_owners():
    result = db.session.execute(db.select(Owner))
    owners = []
    for owner in result.scalars():
        owners.append(owner.toJSON())

    return jsonify(owners), 200


@owners.post('/owners')
def register_owner():
    type_doc = None
    document = None
    name = None
    address = None
    phone = None
    mail = None

    data = request.json
    errors = []
    if data:
        if 'type_doc' in data:
            type_doc = data['type_doc']
        else:
            errors.append(ERRORS.get("type_doc"))

        if 'document' in data:
            document = data['document']
        else:
            errors.append(ERRORS.get("document"))

        if 'name' in data:
            name = data['name']
        else:
            errors.append(ERRORS.get("name"))

        if 'address' in data:
            address = data['address']
        else:
            errors.append(ERRORS.get("address"))

        if 'phone' in data:
            phone = data['phone']
        else:
            errors.append(ERRORS.get("phone"))

        if 'mail' in data:
            mail: str = data['mail']
            if mail.find("@") == -1:
                errors.append(ERRORS.get("mail"))

        else:
            errors.append(ERRORS.get("mail"))

    if len(errors):
        return jsonify({"error": errors}), 400

    new_owner = Owner(type_doc, document, name, address, phone, mail)
    db.session.add(new_owner)
    db.session.commit()
    return jsonify(new_owner.toJSON()), 201


@owners.get('/owners/<id>')
def get_owner_by_id(id: str):
    if not id.isnumeric():
        return jsonify({'error': ERRORS.get('url_invalid_id')}), 400

    owner = db.session.execute(
        db.select(Owner).where(Owner.id == int(id))
    ).fetchone()

    if owner == None:
        return jsonify({'error': ERRORS.get('user_not_exist')}), 400

    return jsonify(owner[0].toJSON()), 200
