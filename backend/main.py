from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, migrate
import os
workdir = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, template_folder="templates", static_folder="statics")

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Association table -> (M-M) Project & Donation
donation_project = db.Table('donation_project', db.Column('donation_id', db.Integer, db.ForeignKey('donation.donation_id')), db.Column('project_id', db.Integer, db.ForeignKey('project.project_id')))


class Donor(db.Model):
    __tablename__ = 'donor'
    # Donor ID -> Primary Key
    donor_id = db.Column('donor_id', db.Integer, primary_key=True)
    first_name = db.Column('first_name', db.String(255), nullable=False)
    last_name = db.Column('last_name', db.String(255), nullable=False)
    email = db.Column('email', db.String(255), nullable=False)
    # backref relationship -> Donation
    donations = db.relationship('Donation',backref='donor')

    def __init__(self, first_name, last_name, email):
        self.email = email
        self.first_name = first_name
        self. last_name = last_name


class Donation(db.Model):
    __tablename__ = 'donation'
    # Transaction ID -> primary key
    donation_id = db.Column('donation_id', db.Integer, primary_key=True)
    # Donor ID -> foreign key (1-M)
    donor_id = db.Column(db.Integer, db.ForeignKey('donor.donor_id'))
    amount = db.Column('amount', db.Integer, nullable=False)
    currency = db.Column('currency', db.String(3), nullable=False)
    # backref relationship -> Project
    projects = db.relationship('Project', secondary=donation_project, backref='project')

    def __init__(self, amount, currency):
        self.amount = amount
        self.currency = currency



class Project(db.Model):
    __tablename__ = 'project'
    # Project ID -> primary key
    project_id = db.Column('project_id', db.Integer, primary_key=True)
    project_name = db.Column('project_name', db.String(255))
    project_location = db.Column('project_location', db.String(255))
    project_event = db.Column('project_event', db.String(255))
    # backref relationship -> Task
    tasks = db.relationship('Task', backref='task')

    def __init__(self, project_name, project_location, project_event):
        self.project_name = project_name
        self.project_location = project_location
        self.project_event = project_event


class Task(db.Model):
    __tablename__ = 'task'
    # Task ID -> primary key
    task_id = db.Column('task_id', db.Integer, primary_key=True)
    task_name = db.Column('task_name', db.String(255), nullable=False)
    # Project ID -> foreign key (1-M)
    project_id = db.Column(db.Integer, db.ForeignKey('project.project_id'))

    def __init__(self, task_name):
        self.task_name = task_name

@app.route('/')
def index():
    return render_template()


@app.route('/getData', methods=['GET'])
def getData():
    return dbExample


@app.route('/postData', methods=['POST'])
def postData():
    data = request.json
    #parse json
    email = data['email']
    first_name = data['firstName']
    last_name = data['lastName']
    currency = data['currency']
    task = data['cart'][0]['title']
    amount = 0
    for item in data['cart']:
        amount += int(item['amount'])
    project_title = data['projectTitle']
    project_location = data['projectLocation']
    project_event = data['projectEvent']

    
    donor = Donor(first_name, last_name, email)
    proj = Project(project_title, project_event, project_location)
    tn = Task(task)
    dnt = Donation(amount, currency)
    db.session.add_all([donor, proj, tn, dnt])
    db.session.commit()
    # DO SOMETHING HERE
    return data


@app.route('/logevent')
def logcreate():
    return render_template("logevent.html")


if __name__ == '__main__':
    app.run(port=8000)
