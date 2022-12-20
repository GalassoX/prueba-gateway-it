from flask import Blueprint, request, jsonify
from utils.database import db
from utils.jwt import encode_token
from utils.bcrypt import decode_hash, verify_password
from data.models.owner import Owner
from data.errors import ERRORS

auth = Blueprint('auth', __name__)


@auth.post('/signup')
def register():
    type_doc = None
    document = None
    name = None
    address = None
    phone = None
    mail = None
    password = None

    data = request.json
    errors = []
    # Verificamos si la información enviada por la Request es la deseada
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

        if 'password' in data:
            password = data['password']

        else:
            errors.append(ERRORS.get('password'))

    exists = db.session.execute(
        db.select(Owner).where(Owner.document == document)
    ).scalars().all()

    if len(exists):
        errors.append(ERRORS.get("user_exists"))

    if len(errors):
        return jsonify({"error": errors}), 400

    new_owner = Owner(type_doc, document, name, address, phone, mail, password)
    db.session.add(new_owner)
    db.session.commit()
    token = encode_token(new_owner.id)
    return jsonify({"token": token}), 201


@auth.post('/login')
def login():
    email = None
    password = None

    data = request.json
    errors = []
    if data:
        if 'email' in data:
            email = data['email']
        else:
            errors.append(ERRORS.get("mail"))

        if 'password' in data:
            password = data['password']
        else:
            errors.append(ERRORS.get("password"))

    owner = db.session.execute(
        db.select(Owner).where(Owner.mail == email)
    ).fetchone()

    owner = owner[0]

    if owner == None:
        errors.append(ERRORS.get('user_not_exist'))

    if not verify_password(password, owner.password):
        errors.append(ERRORS.get('password'))

    if len(errors):
        return jsonify({"error": errors}), 400

    token = encode_token(owner.id, owner.role)

    return jsonify({"token": token}), 200
