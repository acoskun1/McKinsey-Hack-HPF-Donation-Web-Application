from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Donor(db.Model):
    __tablename__ = 'donor'
    donorId = db.Column('id', db.Integer, primary_key=True)
    fname = db.Column('first_name', db.String(100))
    lname = db.Column('last_name', db.String(100))
    email = db.Column('email', db.String(100))

class Donation(db.Model):
    __tablename__ = 'donation'
    #Transaction ID -> primary key
    trId = db.Column('transaction_id', db.Integer, primary_key=True)
    #Donor ID -> foreign key
    donor_id = db.Column(db.Integer, db.ForeignKey('donation.donorId'))
    amount = db.Column('', db.Numeric)
    currency = db.Column('currency', db.String(3))



class Project(db.Model):
    __tablename__ = 'Project'
    projectId = db.Column('id',db.Integer, primary_key=True)
    projectName = db.Column('project_name', db.String(100))
    projectLocation = db.Column('project_location', db.String(100))


dbExample = [
    {
        'charityId': 1,
        'firstName': 'Jhon',
        'lastName': 'Doe'
    }
]


@app.route('/')
def index():
    return 'Hello World!'
    


@app.route('/getData', methods=['GET'])
def getData():
    return dbExample


@app.route('/postData', methods=['POST'])
def postData():
    data = request.get_json()
    return data, 200

@app.route('/logevent')
def logcreate():
    return render_template("logevent.html")

app.run(port=8000)
