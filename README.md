## Up and running

- Clone this repository: `git clone git@github.com:rafaelsevla/space-x.git`;
- Open a terminal tab
- Enter backend directory `cd backend`
- Create virtualenv: `python -m venv .venv`
- Active virtualenv: `source .venv/bin/activate`
- Install dependencies: `pip install -r requirements.txt`
- Run `flask run` to develop on `http://localhost:5000`

- Enter frontend directory `cd frontend`
- Add `.env.local` with `REACT_APP_API_URL=http://localhost:5000`
- Install dependencies: `npm install`
- Run `npm start` to develop on `http://localhost:3000`
