from flask import Flask, jsonify, request

app = Flask(__name__)

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


if __name__ == "__main__":
    app.run(port=8000)
