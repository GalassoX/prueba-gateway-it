from flask import Flask
from flask_cors import CORS
from utils.database import db
from routes.owners import owners

app = Flask(__name__)

# -> Managing middlewares
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/prueba-gateway'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

CORS(app)

# -> Routes
app.register_blueprint(owners)

if __name__ == "__main__":
    app.run(debug=True)
