
# from database import make_api_from_db, post_collective
from flask import Flask, render_template, request, redirect, flash, url_for
import app
from flask_sqlalchemy import SQLAlchemy
import settings as ss
import os

CURRENT_FILE = os.path.abspath(__file__)
CURRENT_DIR = os.path.dirname(CURRENT_FILE)
UPLOAD_FOLDER = CURRENT_DIR + '/static/image/'
DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}:{port}/{db}'.format(
    user=ss.DATABASE_ADMIN, pw=ss.DATABASE_PWD, url=ss.DATABASE_ADDRESS, port=ss.DATABASE_PORT, db=ss.DATABASE_NAME)
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
# silence the deprecation warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route("/", methods =['GET','POST'])
def home():
    what = request.args.get('q', default='home')
    if what=='api':
        return database.make_api_from_db()
    # if request.method == 'POST': 
    #     flash ("Collective to be added!")
    #     return database.post_collective()
        # Create an alert later, but hopefully this will load it?
        # Do we need to call "Upload_json_to_db?"
    return render_template("index.html")

@app.route("/post_collective", methods =['POST'])
#Function to post form input to the postgres database
def post_collective():
    database.post_collective()
    #Redirects back to the home page (Have it redirect to a confirmation popup in future)
    return redirect(url_for('home'))
    # return a

import database
@app.route("/data")
def data():
    # database.upload_json_to_db()  # Only call this once to upload the data to database
    # return database.make_api_from_data()
    return database.make_api_from_data()


if __name__ == "__main__":
    app.run(debug=True)
