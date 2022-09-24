from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

#Association table -> (M-M) Project & Donation
donation_project = db.Table('donation_project', db.Column('trId', db.Integer, db.ForeignKey('donation.trId')), db.Column('prId', db.Integer, db.ForeignKey('project.projectId')))

class Donor(db.Model):
    __tablename__ = 'donor'
    #Donor ID -> Primary Key
    donorId = db.Column('donor_id', db.Integer, primary_key=True)
    fname = db.Column('first_name', db.String(255), nullable=False)
    lname = db.Column('last_name', db.String(255), nullable=False)
    email = db.Column('email', db.String(255), nullable=False)
    #backref relationship -> Donation
    donations = db.relationship('Donor', backref='donor')

class Donation(db.Model):
    __tablename__ = 'donation'
    #Transaction ID -> primary key
    trId = db.Column('transaction_id', db.Integer, primary_key=True)
    #Donor ID -> foreign key (1-M)
    donor_id = db.Column(db.Integer, db.ForeignKey('donor.donorId'))
    amount = db.Column('amount', db.Integer, nullable=False)
    currency = db.Column('currency', db.String(3), nullable=False)
    #backref relationship -> Project
    projects = db.relationship('Project', secondary=donation_project, backref='project')
    

class Project(db.Model):
    __tablename__ = 'project'
    #Project ID -> primary key
    projectId = db.Column('project_id', db.Integer, primary_key=True)
    projectName = db.Column('project_name', db.String(255))
    projectLocation = db.Column('project_location', db.String(255))
    #backref relationship -> Task
    tasks = db.relationship('Task', backref='task')

class Task(db.Model):
    __tablename__ = 'task'
    #Task ID -> primary key
    taskId = db.Column('task_id', db.Integer, primary_key=True )
    taskName = db.Column('task_name', db.String(255), nullable=False)
    cost = db.Column('cost', db.Integer, nullable=False)
    totalPaid = db.Column('paid', db.Integer)
    #Project ID -> foreign key (1-M)
    project_id = db.Column(db.Integer, db.ForeignKey('project.projectId'))


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


app.run(port=8000)
