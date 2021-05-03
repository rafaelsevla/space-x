import requests


def launch_and_rocket_payload (launch, rocket):
    return {
      "date_utc": launch.get("date_utc", None),
      "details": launch.get("details", None),
      "flight_number": launch.get("flight_number", None),
      "rocket": {
        "name": rocket.get('name'),
        "country": rocket.get('country'),
        "description": rocket.get('description'),
        "flickr_images": rocket.get('flickr_images')
      }
    }


def launch_limited_list (offset, limit, launch_list):
    offset = int(offset)
    limit = int(limit)

    launches_to_return = []

    for launch in launch_list[offset:offset+limit]:
        rocket_id = launch.get("rocket", None)
        rocket_response = requests.get(f"https://api.spacexdata.com/v4/rockets/{rocket_id}").json()
        launches_to_return.append(launch_and_rocket_payload(launch, rocket_response))
    
    return launches_to_return

