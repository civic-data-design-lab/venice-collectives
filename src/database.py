import json
import settings
import app
import os

CURRENT_FILE = os.path.abspath(__file__)
CURRENT_DIR = os.path.dirname(CURRENT_FILE)
db = app.db


class Collective(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(), nullable=True)
    longDescription = db.Column(db.String(), nullable=True)
    link = db.Column(db.String(), nullable=True)
    image = db.Column(db.String(), nullable=False, unique=True)
    value_porosity = db.Column(db.Integer, nullable=False)
    value_economics = db.Column(db.Integer, nullable=False)
    value_size = db.Column(db.Integer, nullable=False)
    value_platform = db.Column(db.Integer, nullable=False)
    value_governance = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Collective %r>' % self.title


def make_api_from_data():
    f = open(CURRENT_DIR+"/data/4_14_extract.json", encoding="utf8")
    data = json.load(f)
    f.close()
    return {"data": data}


def make_api_from_db():
    data = Collective.query.all()
    collectives = []
    for collective in data:
        jsn = vars(collective)  # The returned object is of class Collective
        # This is added by database and we won't need it
        del jsn['_sa_instance_state']
        jsn['values'] = {}  # we are taking it back to our original format
        # Creating a copy of the json so that we don't mutate the dictionary we are iterating upon
        jsn_cpy = dict(jsn)
        for k in jsn_cpy:
            if 'value_' in k:
                jsn['values'][k.replace('value_', '')] = jsn[k]
                del jsn[k]
        collectives.append(jsn)
    # Since flask view can't return list, we convert it to dictionary
    return {"data": collectives}


def upload_json_to_db():
    f = open(CURRENT_DIR+"/data/4_14_extract.json", encoding="utf8")
    data = json.load(f)
    db.create_all()
    # Since sql tables cannot store nested objects, we are converting all the value inside values to the first level of the object
    for item in data:
        for key in item['values']:
            item['value_'+key] = item['values'][key]
        # Now we don't need values as we added all values to main dictionary itself
        item.pop('values', None)
        item.pop('id', None)  # We don't need background, SQL provides that
        item.pop('backgroundImage', None)  # We don't need background
        it = Collective(**item)
        db.session.add(it)
    db.session.commit()
    f.close()
    return data
