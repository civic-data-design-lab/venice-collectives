
from flask import Flask, render_template, request
import app
from flask_sqlalchemy import SQLAlchemy
import settings as ss

DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}:{port}/{db}'.format(
    user=ss.DATABASE_ADMIN, pw=ss.DATABASE_PWD, url=ss.DATABASE_ADDRESS, port=ss.DATABASE_PORT, db=ss.DATABASE_NAME)
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
# silence the deprecation warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


@app.route("/")
def home():
    what = request.args.get('q', default='home')
    if what=='api':
        return database.make_api_from_db()
    else:
        return render_template("index.html")

import database
@app.route("/data")
def data():
    # database.upload_json_to_db()  # Only call this once to upload the data to database
    # return database.make_api_from_data()
    return database.make_api_from_data()


if __name__ == "__main__":
    app.run(debug=True)
