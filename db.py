import json


def make_api_from_data():
    f = open("data/4_14_extract.json", encoding="utf8")
    data = json.load(f)
    f.close()
    return {"data": data}
