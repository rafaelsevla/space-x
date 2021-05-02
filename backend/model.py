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