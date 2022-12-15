from flask import Blueprint, request, jsonify
from data.models.owners import Owners

owners = Blueprint('owners', __name__)


@owners.get('/owners')
def get_owners():
    all_owners = Owners.query.all()
    return jsonify(all_owners), 200


@owners.post('/owners')
def register_owner():
    id = None
    type_doc = None
    doc = None
    name = None
    address = None
    phone = None
    mail = None
    return 'Creating Owner', 200
