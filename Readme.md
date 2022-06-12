This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7 and NodeJs

## BackEnd Development server

Go to /backend and install dependencies with `npm install`

Run `npm start` for a dev server. It should be available on `http://localhost:3000/`.

The Mock Server add each 5 seconds a 5min data log on Site A and Site B, simulated from the provided json data. You will also see when the frontend send requests.
The Mock Server simulate datas as much in the past as we need, and will simulate three server errors, two of which are testable. The third one is called when anything beside Site A and B is requested (not in scope).

## FrontEnd Development server

Go to /frontend and install dependencies with `npm install`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Everything should run as it should be. I'm looking forward for your review. ^^
