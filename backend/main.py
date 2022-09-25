#!/usr/bin/env python3
from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, migrate

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Association table -> (M-M) Project & Donation
donation_project = db.Table('donation_project', db.Column('donation_id', db.Integer, db.ForeignKey('donation.donation_id')), db.Column('prId', db.Integer, db.ForeignKey('project.project_id')))


class Donor(db.Model):
    __tablename__ = 'donor'
    # Donor ID -> Primary Key
    donor_id = db.Column('donor_id', db.Integer, primary_key=True)
    first_name = db.Column('first_name', db.String(255), nullable=False)
    last_name = db.Column('last_name', db.String(255), nullable=False)
    email = db.Column('email', db.String(255), nullable=False, unique=True)
    # backref relationship -> Donation
    donations = db.relationship('Donor', backref='donor')


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


class Project(db.Model):
    __tablename__ = 'project'
    # Project ID -> primary key
    project_id = db.Column('project_id', db.Integer, primary_key=True)
    project_name = db.Column('project_name', db.String(255))
    project_location = db.Column('project_location', db.String(255))
    # backref relationship -> Task
    tasks = db.relationship('Task', backref='task')


class Task(db.Model):
    __tablename__ = 'task'
    # Task ID -> primary key
    task_id = db.Column('task_id', db.Integer, primary_key=True)
    task_name = db.Column('task_name', db.String(255), nullable=False)
    cost = db.Column('cost', db.Integer, nullable=False)
    total_paid = db.Column('paid', db.Integer)
    # Project ID -> foreign key (1-M)
    project_id = db.Column(db.Integer, db.ForeignKey('project.project_id'))


@app.route('/')
def index():
    return 'Hello World!'


@app.route('/getData', methods=['GET'])
def getData():
    return dbExample


@app.route('/postData', methods=['POST'])
def postData():
    data = request.json()
    print(data)
    # DO SOMETHING HERE
    return data, 200


@app.route('/logevent')
def logcreate():
    return render_template("logevent.html")


if __name__ == '__main__':
    app.run(port=8000)
