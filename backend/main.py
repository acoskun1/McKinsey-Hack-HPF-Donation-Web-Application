from flask import Flask, jsonify, request, render_template
import os
workdir = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, template_folder="templates")

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
