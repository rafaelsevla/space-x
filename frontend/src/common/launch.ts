interface Rocket {
  country: string;
  description: string;
  flickr_images: string[];
  name: string;
}

export interface Launch {
  title: string;
  date_utc: string;
  details: string;
  flight_number: number;
  rocket: Rocket;
}