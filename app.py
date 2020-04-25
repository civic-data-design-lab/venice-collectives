from flask import Flask, render_template
import app
import db

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/data")
def data():
    return db.make_api_from_data()


if __name__ == "__main__":
    app.run(debug=True)
