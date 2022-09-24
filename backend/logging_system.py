from flask import Flask

app = Flask(__name__)


@app.route('/logevent')
def hello():
    return 'Hello, World!'