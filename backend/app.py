import requests
from flask import request, Flask
from model import launch_and_rocket_payload
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})


@app.route("/v1/launches/next", methods=["GET"])
def next_launch():
    launch_response = requests.get("https://api.spacexdata.com/v4/launches/next").json()
    rocket_id = launch_response.get("rocket", None)
    rocket_response = requests.get(f"https://api.spacexdata.com/v4/rockets/{rocket_id}").json()

    return launch_and_rocket_payload(launch_response, rocket_response), 200


@app.route("/v1/launches/latest", methods=["GET"])
def latest_launch():
    launch_response = requests.get("https://api.spacexdata.com/v4/launches/latest").json()
    rocket_id = launch_response.get("rocket", None)
    rocket_response = requests.get(f"https://api.spacexdata.com/v4/rockets/{rocket_id}").json()

    return launch_and_rocket_payload(launch_response, rocket_response), 200


@app.route("/v1/launches/upcoming", methods=["GET"])
def upcoming_launches():
    offset = request.args.get('offset', None)
    limit = request.args.get('limit', None)
    if offset == None or limit == None:
        return 'Limit and offset are required', 400
    
    offset = int(offset)
    limit = int(limit)

    launches = requests.get("https://api.spacexdata.com/v4/launches/upcoming").json()

    launches_to_response = []
    print(launches_to_response)

    for launch in launches[offset:offset+limit]:
        rocket_id = launch.get("rocket", None)
        rocket_response = requests.get(f"https://api.spacexdata.com/v4/rockets/{rocket_id}").json()
        launches_to_response.append(launch_and_rocket_payload(launch, rocket_response))

    return {
        "launches": launches_to_response
    }, 200


@app.route("/v1/launches/past", methods=["GET"])
def past_launches():
    offset = request.args.get('offset', None)
    limit = request.args.get('limit', None)
    if offset == None or limit == None:
        return 'Limit and offset are required', 400
    
    offset = int(offset)
    limit = int(limit)

    launches = requests.get("https://api.spacexdata.com/v4/launches/past").json()

    launches_to_response = []
    print(launches_to_response)

    for launch in launches[offset:offset+limit]:
        rocket_id = launch.get("rocket", None)
        rocket_response = requests.get(f"https://api.spacexdata.com/v4/rockets/{rocket_id}").json()
        launches_to_response.append(launch_and_rocket_payload(launch, rocket_response))

    return {
        "launches": launches_to_response
    }, 200
